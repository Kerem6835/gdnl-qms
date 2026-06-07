const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8"
};

function corsHeaders(env) {
  return {
    ...JSON_HEADERS,
    "Access-Control-Allow-Origin": env.CORS_ORIGIN || "https://gdnldigital.com",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS"
  };
}

function json(env, data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: corsHeaders(env) });
}

function ok(env, data = {}, message = "İşlem başarılı", status = 200) {
  return json(env, { success: true, data, message }, status);
}

function fail(env, status, code, message) {
  return json(env, { success: false, error: { code, message } }, status);
}

async function bodyJson(request) {
  const text = await request.text();
  return text ? JSON.parse(text) : {};
}

async function hashPassword(password) {
  const bytes = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function currentUser(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const cookieToken = (request.headers.get("Cookie") || "").split(";").map((part) => part.trim()).find((part) => /^(gdnl_eos_token|gdnl_api_token|token)=/.test(part));
  const token = auth.replace(/^Bearer\s+/i, "") || request.headers.get("X-Session-Token") || (cookieToken ? decodeURIComponent(cookieToken.split("=").slice(1).join("=")) : "") || "";
  if (!token) return null;
  const row = await env.DB.prepare(
    "SELECT u.* FROM users u JOIN sessions s ON s.user_id = u.id WHERE s.token = ? AND s.status = 'active'"
  ).bind(token).first();
  return row || null;
}

function requirePermission(permission) {
  return async (request, env) => {
    const user = await currentUser(request, env);
    if (!user) return { error: fail(env, 401, "UNAUTHORIZED", "Oturum bulunamadı") };
    return { user, permission };
  };
}

async function listTable(env, table) {
  const result = await env.DB.prepare(`SELECT * FROM ${table} WHERE COALESCE(status,'active') != 'deleted' ORDER BY created_at DESC`).all();
  return result.results || [];
}

function userDisplayName(user) {
  return user?.fullname || user?.username || user?.email || "Kullanıcı";
}

function normalizeMessageStatus(status) {
  const value = String(status || "sent").toLowerCase();
  if (value === "drafts") return "draft";
  if (value === "trash") return "trash";
  return value === "draft" ? "draft" : "sent";
}

function normalizeFolder(folder) {
  const value = String(folder || "inbox").toLowerCase();
  if (value === "draft") return "drafts";
  if (["inbox", "sent", "drafts", "trash"].includes(value)) return value;
  return "inbox";
}

function escapeLike(value) {
  return String(value || "").replace(/[\\%_]/g, (match) => "\\" + match);
}

async function tableColumns(env, table) {
  try {
    const result = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
    return new Set((result.results || []).map((row) => row.name));
  } catch (error) {
    return new Set();
  }
}

async function insertFlexible(env, table, values) {
  const columns = await tableColumns(env, table);
  const entries = Object.entries(values).filter(([key, value]) => columns.has(key) && value !== undefined);
  if (!entries.length) return;
  const names = entries.map(([key]) => key);
  const placeholders = names.map(() => "?").join(",");
  await env.DB.prepare(`INSERT INTO ${table} (${names.join(",")}) VALUES (${placeholders})`).bind(...entries.map(([, value]) => value)).run();
}

async function writeMailboxLog(env, user, action, messageId, detail) {
  const values = {
    id: crypto.randomUUID(),
    module: "mailbox",
    action,
    record_no: messageId,
    user_id: user?.id || "",
    user_name: userDisplayName(user),
    detail: detail || "",
    status: "active",
    created_at: new Date().toISOString(),
    created_by: user?.id || ""
  };
  await insertFlexible(env, "activity_logs", values).catch(() => {});
  await insertFlexible(env, "audit_logs", { ...values, id: crypto.randomUUID() }).catch(() => {});
}

async function createMessageNotifications(env, user, messageId, subject, recipients) {
  await Promise.all((recipients || []).map((recipient) => insertFlexible(env, "notifications", {
    id: crypto.randomUUID(),
    title: "Yeni mesaj",
    message: subject || "Yeni mesaj",
    type: "message",
    recipient_id: recipient.recipient_id,
    related_module: "mailbox",
    related_record_id: messageId,
    is_read: 0,
    status: "active",
    created_at: new Date().toISOString(),
    created_by: user?.id || ""
  }).catch(() => {})));
}

async function messageRecipients(env, messageId) {
  const result = await env.DB.prepare(
    "SELECT id, message_id, recipient_id AS user_id, recipient_name AS fullname, recipient_email AS email, is_read, read_at, created_at FROM message_recipients WHERE message_id=? ORDER BY created_at ASC"
  ).bind(messageId).all();
  return result.results || [];
}

async function messageAttachments(env, messageId) {
  const result = await env.DB.prepare(
    "SELECT id AS file_id, message_id, file_name AS filename, file_type AS mime_type, file_size AS size, r2_key, url, uploaded_by, created_at FROM message_attachments WHERE message_id=? ORDER BY created_at ASC"
  ).bind(messageId).all();
  return result.results || [];
}

async function hydrateMessage(env, row, user) {
  if (!row) return null;
  const recipients = await messageRecipients(env, row.id);
  const attachments = await messageAttachments(env, row.id);
  const folder = row.folder || (row.sender_id === user?.id ? "sent" : "inbox");
  return {
    ...row,
    folder,
    from: row.sender_name || row.created_by || "",
    recipients,
    attachments,
    is_read: Boolean(row.is_read),
    read_at: row.read_at || null
  };
}

async function assertMessageAccess(env, user, messageId) {
  const message = await env.DB.prepare("SELECT * FROM messages WHERE id=?").bind(messageId).first();
  if (!message) return { error: "not_found" };
  if (message.sender_id === user.id) return { message, asSender: true };
  const recipient = await env.DB.prepare("SELECT * FROM message_recipients WHERE message_id=? AND recipient_id=?").bind(messageId, user.id).first();
  if (recipient) return { message, recipient, asSender: false };
  return { error: "forbidden" };
}

function recipientFromPayload(recipient) {
  return {
    recipient_id: recipient.user_id || recipient.id || recipient.recipient_id || "",
    recipient_name: recipient.fullname || recipient.name || recipient.username || recipient.recipient_name || "",
    recipient_email: recipient.email || recipient.recipient_email || ""
  };
}

function attachmentFromPayload(attachment) {
  return {
    file_name: attachment.file_name || attachment.filename || attachment.fileName || "",
    file_type: attachment.file_type || attachment.mime_type || attachment.type || "",
    file_size: Number(attachment.file_size || attachment.size || 0),
    r2_key: attachment.r2_key || attachment.key || "",
    url: attachment.url || "",
    uploaded_by: attachment.uploaded_by || attachment.uploadedBy || ""
  };
}

async function replaceMessageRecipients(env, messageId, recipients) {
  await env.DB.prepare("DELETE FROM message_recipients WHERE message_id=?").bind(messageId).run();
  const normalized = (Array.isArray(recipients) ? recipients : []).map(recipientFromPayload).filter((recipient) => recipient.recipient_id || recipient.recipient_email || recipient.recipient_name);
  for (const recipient of normalized) {
    await env.DB.prepare(
      "INSERT INTO message_recipients (id,message_id,recipient_id,recipient_name,recipient_email,is_read,created_at) VALUES (?,?,?,?,?,0,datetime('now'))"
    ).bind(crypto.randomUUID(), messageId, recipient.recipient_id, recipient.recipient_name, recipient.recipient_email).run();
  }
  return normalized;
}

async function replaceMessageAttachments(env, messageId, attachments, user) {
  await env.DB.prepare("DELETE FROM message_attachments WHERE message_id=?").bind(messageId).run();
  const normalized = (Array.isArray(attachments) ? attachments : []).map(attachmentFromPayload).filter((attachment) => attachment.r2_key || attachment.file_name);
  for (const attachment of normalized) {
    await env.DB.prepare(
      "INSERT INTO message_attachments (id,message_id,file_name,file_type,file_size,r2_key,url,uploaded_by,created_at) VALUES (?,?,?,?,?,?,?,?,datetime('now'))"
    ).bind(crypto.randomUUID(), messageId, attachment.file_name, attachment.file_type, attachment.file_size, attachment.r2_key, attachment.url, attachment.uploaded_by || user?.id || "").run();
  }
  return normalized;
}

async function handleMessages(request, env, pathParts) {
  const guard = await requirePermission("read")(request, env);
  if (guard.error) return guard.error;
  const user = guard.user;
  const messageId = pathParts[1] ? decodeURIComponent(pathParts[1]) : "";
  const action = pathParts[2] || "";
  const url = new URL(request.url);

  if (pathParts[0] === "message-recipients" && request.method === "GET") {
    const result = await env.DB.prepare("SELECT * FROM message_recipients ORDER BY created_at DESC LIMIT 500").all();
    return ok(env, result.results || []);
  }

  if (pathParts[0] === "message-attachments" && request.method === "GET") {
    const result = await env.DB.prepare("SELECT * FROM message_attachments ORDER BY created_at DESC LIMIT 500").all();
    return ok(env, result.results || []);
  }

  if (pathParts[0] !== "messages") return null;

  if (!messageId && request.method === "GET") {
    const folder = normalizeFolder(url.searchParams.get("folder"));
    const search = escapeLike(url.searchParams.get("search") || url.searchParams.get("q") || "");
    const status = url.searchParams.get("status") || "";
    const priority = url.searchParams.get("priority") || "";
    const where = [];
    const binds = [];

    if (folder === "inbox") {
      where.push("r.recipient_id = ?");
      binds.push(user.id);
      where.push("COALESCE(m.status,'sent') != 'draft'");
      where.push("COALESCE(m.folder_status,'inbox') != 'trash'");
      where.push("m.deleted_at IS NULL");
    } else if (folder === "sent") {
      where.push("m.sender_id = ?");
      binds.push(user.id);
      where.push("COALESCE(m.status,'sent') = 'sent'");
      where.push("COALESCE(m.folder_status,'sent') != 'trash'");
      where.push("m.deleted_at IS NULL");
    } else if (folder === "drafts") {
      where.push("m.sender_id = ?");
      binds.push(user.id);
      where.push("COALESCE(m.status,'sent') = 'draft'");
      where.push("m.deleted_at IS NULL");
    } else if (folder === "trash") {
      where.push("(m.sender_id = ? OR r.recipient_id = ?)");
      binds.push(user.id, user.id);
      where.push("COALESCE(m.folder_status,'') = 'trash'");
    }

    if (status) {
      where.push("m.status = ?");
      binds.push(normalizeMessageStatus(status));
    }
    if (priority) {
      where.push("m.priority = ?");
      binds.push(priority);
    }
    if (search) {
      where.push("(m.subject LIKE ? ESCAPE '\\' OR m.body LIKE ? ESCAPE '\\' OR m.sender_name LIKE ? ESCAPE '\\')");
      binds.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const sql = `SELECT DISTINCT m.*, CASE WHEN COALESCE(m.folder_status,'') = 'trash' THEN 'trash' WHEN COALESCE(m.status,'sent') = 'draft' THEN 'draft' WHEN m.sender_id = ? THEN 'sent' ELSE 'inbox' END AS folder, COALESCE(r.is_read,0) AS is_read, r.read_at FROM messages m LEFT JOIN message_recipients r ON r.message_id = m.id ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY COALESCE(m.updated_at,m.created_at) DESC LIMIT 200`;
    const result = await env.DB.prepare(sql).bind(user.id, ...binds).all();
    const rows = await Promise.all((result.results || []).map((row) => hydrateMessage(env, row, user)));
    return ok(env, rows);
  }

  if (!messageId && request.method === "POST") {
    const writeGuard = await requirePermission("write")(request, env);
    if (writeGuard.error) return writeGuard.error;
    const input = await bodyJson(request);
    const id = input.id || crypto.randomUUID();
    const status = normalizeMessageStatus(input.status);
    if (status === "sent" && (!Array.isArray(input.recipients) || !input.recipients.length)) {
      return fail(env, 400, "RECIPIENT_REQUIRED", "Gönderilecek mesaj için alıcı seçilmelidir");
    }
    const sentAt = status === "sent" ? new Date().toISOString() : null;
    await env.DB.prepare(
      "INSERT INTO messages (id,subject,body,sender_id,sender_name,priority,status,folder_status,related_module,related_record_id,created_at,updated_at,sent_at) VALUES (?,?,?,?,?,?,?,?,?,?,datetime('now'),datetime('now'),?)"
    ).bind(id, input.subject || "", input.body || "", writeGuard.user.id, userDisplayName(writeGuard.user), input.priority || "normal", status, status === "draft" ? "draft" : "sent", input.related_module || "General", input.related_record_id || "", sentAt).run();
    const recipients = await replaceMessageRecipients(env, id, input.recipients || []);
    const attachments = await replaceMessageAttachments(env, id, input.attachments || [], writeGuard.user);
    if (status === "sent") await createMessageNotifications(env, writeGuard.user, id, input.subject || "Yeni mesaj", recipients);
    await writeMailboxLog(env, writeGuard.user, status === "draft" ? "Taslak kaydedildi" : "Mesaj gönderildi", id, input.subject || "");
    if (attachments.length) await writeMailboxLog(env, writeGuard.user, "Ek dosya yüklendi", id, `${attachments.length} ek`);
    const row = await env.DB.prepare("SELECT * FROM messages WHERE id=?").bind(id).first();
    return ok(env, await hydrateMessage(env, row, writeGuard.user), status === "draft" ? "Taslak kaydedildi" : "Mesaj gönderildi", 201);
  }

  if (messageId && !action && request.method === "GET") {
    const access = await assertMessageAccess(env, user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error) return fail(env, 403, "FORBIDDEN", "Mesaja erişim yetkiniz yok");
    const row = {
      ...access.message,
      folder: access.asSender ? (access.message.status === "draft" ? "draft" : "sent") : "inbox",
      is_read: access.recipient?.is_read || 0,
      read_at: access.recipient?.read_at || null
    };
    return ok(env, await hydrateMessage(env, row, user));
  }

  if (messageId && !action && request.method === "PUT") {
    const writeGuard = await requirePermission("write")(request, env);
    if (writeGuard.error) return writeGuard.error;
    const access = await assertMessageAccess(env, writeGuard.user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error || !access.asSender) return fail(env, 403, "FORBIDDEN", "Sadece gönderen mesajı güncelleyebilir");
    const input = await bodyJson(request);
    const status = input.status ? normalizeMessageStatus(input.status) : access.message.status;
    await env.DB.prepare(
      "UPDATE messages SET subject=?, body=?, priority=?, status=?, folder_status=?, related_module=?, related_record_id=?, updated_at=datetime('now'), sent_at=COALESCE(sent_at, ?) WHERE id=?"
    ).bind(input.subject ?? access.message.subject, input.body ?? access.message.body, input.priority || access.message.priority || "normal", status, status === "draft" ? "draft" : "sent", input.related_module || access.message.related_module || "General", input.related_record_id || access.message.related_record_id || "", status === "sent" ? new Date().toISOString() : null, messageId).run();
    if (Array.isArray(input.recipients)) await replaceMessageRecipients(env, messageId, input.recipients);
    if (Array.isArray(input.attachments)) await replaceMessageAttachments(env, messageId, input.attachments, writeGuard.user);
    await writeMailboxLog(env, writeGuard.user, status === "draft" ? "Taslak güncellendi" : "Mesaj güncellendi", messageId, input.subject || access.message.subject || "");
    const row = await env.DB.prepare("SELECT * FROM messages WHERE id=?").bind(messageId).first();
    return ok(env, await hydrateMessage(env, row, writeGuard.user), "Mesaj güncellendi");
  }

  if (messageId && action === "read" && request.method === "PUT") {
    const access = await assertMessageAccess(env, user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error) return fail(env, 403, "FORBIDDEN", "Mesaja erişim yetkiniz yok");
    await env.DB.prepare("UPDATE message_recipients SET is_read=1, read_at=datetime('now') WHERE message_id=? AND recipient_id=?").bind(messageId, user.id).run();
    await writeMailboxLog(env, user, "Mesaj okundu", messageId, "");
    return ok(env, { id: messageId, is_read: true }, "Mesaj okundu");
  }

  if (messageId && action === "trash" && request.method === "PUT") {
    const access = await assertMessageAccess(env, user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error) return fail(env, 403, "FORBIDDEN", "Mesaja erişim yetkiniz yok");
    await env.DB.prepare("UPDATE messages SET folder_status='trash', deleted_at=datetime('now'), updated_at=datetime('now') WHERE id=?").bind(messageId).run();
    await writeMailboxLog(env, user, "Mesaj çöpe taşındı", messageId, "");
    return ok(env, { id: messageId, folder: "trash" }, "Mesaj çöpe taşındı");
  }

  if (messageId && action === "restore" && request.method === "PUT") {
    const access = await assertMessageAccess(env, user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error) return fail(env, 403, "FORBIDDEN", "Mesaja erişim yetkiniz yok");
    await env.DB.prepare("UPDATE messages SET folder_status=?, deleted_at=NULL, updated_at=datetime('now') WHERE id=?")
      .bind(access.asSender ? "sent" : "inbox", messageId).run();
    await writeMailboxLog(env, user, "Mesaj geri yüklendi", messageId, "");
    return ok(env, { id: messageId, folder: access.asSender ? "sent" : "inbox" }, "Mesaj geri yüklendi");
  }

  if (messageId && request.method === "DELETE") {
    const access = await assertMessageAccess(env, user, messageId);
    if (access.error === "not_found") return fail(env, 404, "NOT_FOUND", "Mesaj bulunamadı");
    if (access.error) return fail(env, 403, "FORBIDDEN", "Mesaja erişim yetkiniz yok");
    await env.DB.prepare("UPDATE messages SET status='deleted', folder_status='trash', deleted_at=datetime('now'), updated_at=datetime('now') WHERE id=?").bind(messageId).run();
    await writeMailboxLog(env, user, "Mesaj soft delete", messageId, "");
    return ok(env, { id: messageId, status: "deleted" }, "Mesaj arşivlendi");
  }

  return null;
}

async function route(request, env) {
  const url = new URL(request.url);
  let path = url.pathname.replace(/\/+$/, "") || "/";
  if (path.startsWith("/api/")) path = path.slice(4) || "/";

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(env) });

  if (path === "/me" || path === "/auth/me") {
    const user = await currentUser(request, env);
    return user ? ok(env, user) : fail(env, 401, "UNAUTHORIZED", "Oturum bulunamadı");
  }

  if (path === "/login" || path === "/auth/login") {
    const input = await bodyJson(request);
    const passwordHash = await hashPassword(input.password || "");
    const user = await env.DB.prepare(
      "SELECT * FROM users WHERE username = ? AND password_hash = ? AND COALESCE(status,'active') = 'active'"
    ).bind(input.username || "", passwordHash).first();
    if (!user) return fail(env, 401, "INVALID_LOGIN", "Kullanıcı adı veya şifre hatalı");
    const token = crypto.randomUUID();
    await env.DB.prepare("INSERT INTO sessions (id,user_id,token,status,created_at) VALUES (?,?,?,?,datetime('now'))")
      .bind(crypto.randomUUID(), user.id, token, "active").run();
    return ok(env, { user, token });
  }

  if (path === "/logout" || path === "/auth/logout") {
    const auth = request.headers.get("Authorization") || "";
    const token = auth.replace(/^Bearer\s+/i, "");
    if (token) await env.DB.prepare("UPDATE sessions SET status='closed', updated_at=datetime('now') WHERE token=?").bind(token).run();
    return ok(env, {});
  }

  const tableRoutes = {
    "/users": "users",
    "/departments": "departments",
    "/roles": "roles",
    "/permissions": "permissions",
    "/role-permissions": "role_permissions",
    "/role_permissions": "role_permissions",
    "/documents": "documents",
    "/capa": "capa",
    "/capas": "capa",
    "/risks": "risks",
    "/actions": "actions",
    "/distribution": "assignments",
    "/notifications": "notifications",
    "/standards": "standards",
    "/audits": "audits",
    "/trainings": "trainings",
    "/suppliers": "suppliers",
    "/management-reviews": "management_reviews",
    "/activity-feed": "activity_logs",
    "/audit-logs": "audit_logs",
    "/comments": "comments",
    "/assignments": "assignments",
    "/approvals": "document_approvals",
    "/approval-history": "approval_history",
    "/workflow-history": "workflow_history",
    "/archive": "archive",
    "/customers": "customers",
    "/calibrations": "calibrations",
    "/kpi-results": "kpi_results",
    "/legal-compliance": "legal_compliance",
    "/apqp-projects": "apqp_projects",
    "/projects": "projects",
    "/meetings": "management_reviews",
    "/restore": "archive",
    "/files": "files"
  };

  const pathParts = path.split("/").filter(Boolean);
  const collectionPath = "/" + (pathParts[0] || "");
  const collectionTable = tableRoutes[collectionPath];
  const recordId = pathParts[1] ? decodeURIComponent(pathParts[1]) : "";

  if (["messages", "message-recipients", "message-attachments"].includes(pathParts[0] || "")) {
    const response = await handleMessages(request, env, pathParts);
    if (response) return response;
  }

  if (path === "/dashboard/summary") return ok(env, {});
  if (path === "/dashboard/kpi") return ok(env, []);
  if (path === "/dashboard/recent-activity") return ok(env, await listTable(env, "activity_logs"));
  if (path === "/search" && request.method === "GET") return ok(env, []);

  if (pathParts[0] === "documents" && recordId && ["submit", "approve", "reject"].includes(pathParts[2] || "") && request.method === "POST") {
    const guard = await requirePermission("documents:workflow")(request, env);
    if (guard.error) return guard.error;
    const action = pathParts[2];
    const nextStatus = action === "submit" ? "submitted" : action === "approve" ? "approved" : "rejected";
    await env.DB.prepare("UPDATE documents SET status=?, updated_by=?, updated_at=datetime('now') WHERE id=?")
      .bind(nextStatus, guard.user.id, recordId).run();
    await env.DB.prepare(
      "INSERT INTO document_approvals (id,document_id,approver_id,decision,status,created_by,created_at) VALUES (?,?,?,?,?,?,datetime('now'))"
    ).bind(crypto.randomUUID(), recordId, guard.user.id, action, nextStatus, guard.user.id).run();
    return ok(env, { id: recordId, status: nextStatus }, "Doküman iş akışı güncellendi");
  }

  if (pathParts[0] === "notifications" && recordId && pathParts[2] === "read" && request.method === "PUT") {
    const guard = await requirePermission("notifications:read")(request, env);
    if (guard.error) return guard.error;
    await env.DB.prepare("UPDATE notifications SET status='read', updated_by=?, updated_at=datetime('now') WHERE id=?")
      .bind(guard.user.id, recordId).run();
    return ok(env, { id: recordId, status: "read" }, "Bildirim okundu");
  }

  if (collectionTable && request.method === "GET" && recordId) {
    const guard = await requirePermission("read")(request, env);
    if (guard.error) return guard.error;
    const row = await env.DB.prepare(`SELECT * FROM ${collectionTable} WHERE id = ?`).bind(recordId).first();
    return row ? ok(env, row) : fail(env, 404, "NOT_FOUND", "Kayıt bulunamadı");
  }

  if (tableRoutes[path] && request.method === "GET") {
    const guard = await requirePermission("read")(request, env);
    if (guard.error) return guard.error;
    return ok(env, await listTable(env, tableRoutes[path]));
  }

  if (collectionTable && request.method === "POST") {
    const guard = await requirePermission("write")(request, env);
    if (guard.error) return guard.error;
    const payload = await bodyJson(request);
    const id = payload.id || crypto.randomUUID();
    await env.DB.prepare(`INSERT INTO ${collectionTable} (id,status,created_by,created_at) VALUES (?,'active',?,datetime('now'))`)
      .bind(id, guard.user.id).run();
    return ok(env, { id, ...payload }, "Kayıt oluşturuldu", 201);
  }

  if (collectionTable && recordId && request.method === "PUT") {
    const guard = await requirePermission("write")(request, env);
    if (guard.error) return guard.error;
    await env.DB.prepare(`UPDATE ${collectionTable} SET updated_by=?, updated_at=datetime('now') WHERE id=?`)
      .bind(guard.user.id, recordId).run();
    return ok(env, { id: recordId }, "Kayıt güncellendi");
  }

  if (collectionTable && recordId && request.method === "DELETE") {
    const guard = await requirePermission("delete")(request, env);
    if (guard.error) return guard.error;
    await env.DB.prepare(`UPDATE ${collectionTable} SET status='deleted', updated_by=?, updated_at=datetime('now') WHERE id=?`)
      .bind(guard.user.id, recordId).run();
    return ok(env, { id: recordId }, "Kayıt arşivlendi");
  }

  if ((path === "/files/upload" || path === "/upload") && request.method === "POST") {
    const guard = await requirePermission("files:write")(request, env);
    if (guard.error) return guard.error;
    const form = await request.formData();
    const file = form.get("file");
    if (!file) return fail(env, 400, "FILE_REQUIRED", "Dosya bulunamadı");
    const id = crypto.randomUUID();
    const key = `${new Date().toISOString().slice(0, 10)}/${id}-${file.name}`;
    await env.EQMS_FILES.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
    await env.DB.prepare(
      "INSERT INTO files (id,file_name,mime_type,file_size,r2_key,status,created_by,created_at) VALUES (?,?,?,?,?,'active',?,datetime('now'))"
    ).bind(id, file.name, file.type, file.size, key, guard.user.id).run();
    return ok(env, { id, r2_key: key, file_name: file.name });
  }

  if ((pathParts[0] === "files" || pathParts[0] === "file") && recordId && request.method === "GET") {
    const guard = await requirePermission("files:read")(request, env);
    if (guard.error) return guard.error;
    const key = pathParts[0] === "file" ? recordId : (await env.DB.prepare("SELECT r2_key FROM files WHERE id=?").bind(recordId).first())?.r2_key;
    if (!key) return fail(env, 404, "FILE_NOT_FOUND", "Dosya bulunamadı");
    const object = await env.EQMS_FILES.get(key);
    if (!object) return fail(env, 404, "FILE_NOT_FOUND", "Dosya bulunamadı");
    return new Response(object.body, { headers: { ...corsHeaders(env), "Content-Type": object.httpMetadata?.contentType || "application/octet-stream" } });
  }

  if (pathParts[0] === "files" && recordId && request.method === "DELETE") {
    const guard = await requirePermission("files:delete")(request, env);
    if (guard.error) return guard.error;
    const row = await env.DB.prepare("SELECT r2_key FROM files WHERE id=?").bind(recordId).first();
    if (row?.r2_key) await env.EQMS_FILES.delete(row.r2_key);
    await env.DB.prepare("UPDATE files SET status='deleted', updated_by=?, updated_at=datetime('now') WHERE id=?").bind(guard.user.id, recordId).run();
    return ok(env, { id: recordId }, "Dosya silindi");
  }

  return fail(env, 404, "NOT_FOUND", "Endpoint bulunamadı");
}

export default {
  async fetch(request, env) {
    try {
      return await route(request, env);
    } catch (error) {
      return fail(env, 500, "SERVER_ERROR", error.message || "Sunucu hatası");
    }
  }
};
