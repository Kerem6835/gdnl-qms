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
  const token = auth.replace(/^Bearer\s+/i, "") || request.headers.get("X-Session-Token") || "";
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

async function route(request, env) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/+$/, "") || "/";

  if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(env) });

  if (path === "/me" || path === "/api/auth/me") {
    const user = await currentUser(request, env);
    return user ? ok(env, user) : fail(env, 401, "UNAUTHORIZED", "Oturum bulunamadı");
  }

  if (path === "/login" || path === "/api/auth/login") {
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

  if (path === "/logout" || path === "/api/auth/logout") {
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
    "/audit-logs": "activity_logs",
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
