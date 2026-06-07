export default {
  async fetch(request, env) {
    const REQUEST_ORIGIN = request.headers.get("Origin") || "";
    const ALLOWED_ORIGINS = [
      "https://qms.gdnldigital.com",
      "https://api.gdnldigital.com"
    ];
    const ORIGIN = ALLOWED_ORIGINS.includes(REQUEST_ORIGIN) ? REQUEST_ORIGIN : "https://qms.gdnldigital.com";

    const corsHeaders = {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Expose-Headers": "Set-Cookie",
      "Vary": "Origin",
      "Content-Type": "application/json; charset=utf-8"
    };

    const fileCorsHeaders = {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Expose-Headers": "Set-Cookie",
      "Vary": "Origin"
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

    const url = new URL(request.url);

    /*
      GDNL EOS ROUTE FIX
      qms.gdnldigital.com/api/* Cloudflare route kullanÄ±ldÄ±ÄŸÄ±nda Worker'a path /api/login, /api/me gibi gelir.
      Eski kod sadece /login, /me beklediÄŸi iÃ§in oturum doÄŸrulama kÄ±rÄ±lÄ±yordu.
      Bu normalizasyon hem /api/* hem de direkt api.gdnldigital.com Ã¼zerindeki /* Ã§aÄŸrÄ±larÄ±nÄ± uyumlu Ã§alÄ±ÅŸtÄ±rÄ±r.
    */
    const rawPath = url.pathname;
    const path = rawPath === "/api" ? "/" : (rawPath.startsWith("/api/") ? rawPath.slice(4) : rawPath);

    const json = (data, status = 200, extraHeaders = {}) =>
      new Response(JSON.stringify(data), { status, headers: { ...corsHeaders, ...extraHeaders } });

    const ok = (data = {}, message = "Ä°ÅŸlem baÅŸarÄ±lÄ±", status = 200, extraHeaders = {}) =>
      json({ success: true, data, message }, status, extraHeaders);

    const fail = (message = "Ä°ÅŸlem baÅŸarÄ±sÄ±z", status = 400, code = "ERROR") =>
      json({ success: false, error: { code, message } }, status);

    const getBody = async () => {
      try { return await request.json(); } catch (e) { return {}; }
    };

    const getClientIp = () =>
      request.headers.get("CF-Connecting-IP") ||
      request.headers.get("X-Forwarded-For") ||
      "";

    const getUserAgent = () => request.headers.get("User-Agent") || "";

    const getCookie = (name) => {
      const raw = request.headers.get("Cookie") || "";
      const parts = raw.split(";").map(x => x.trim());
      for (const p of parts) {
        if (p.startsWith(name + "=")) return decodeURIComponent(p.slice(name.length + 1));
      }
      return "";
    };

    const getBearerToken = () => {
      const auth = request.headers.get("Authorization") || "";
      if (auth.toLowerCase().startsWith("bearer ")) return auth.slice(7).trim();
      return "";
    };

    const b64url = {
      enc(input) {
        const bytes = input instanceof Uint8Array ? input : new TextEncoder().encode(input);
        let binary = "";
        bytes.forEach(b => binary += String.fromCharCode(b));
        return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
      },
      dec(input) {
        input = input.replace(/-/g, "+").replace(/_/g, "/");
        while (input.length % 4) input += "=";
        const binary = atob(input);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
        return new TextDecoder().decode(bytes);
      }
    };

    const secret = async () => {
      const raw = env.JWT_SECRET || "GDNL_EOS_DEV_SECRET_CHANGE_ME";
      return crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode(raw),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign", "verify"]
      );
    };

    const signJwt = async (payload) => {
      const header = { alg: "HS256", typ: "JWT" };
      const now = Math.floor(Date.now() / 1000);
      const body = { ...payload, iat: now, exp: now + (60 * 60 * 10) };
      const unsigned = b64url.enc(JSON.stringify(header)) + "." + b64url.enc(JSON.stringify(body));
      const sig = await crypto.subtle.sign("HMAC", await secret(), new TextEncoder().encode(unsigned));
      return unsigned + "." + b64url.enc(new Uint8Array(sig));
    };

    const verifyJwt = async (token) => {
      if (!token || token.split(".").length !== 3) return null;
      const [h, p, s] = token.split(".");
      const unsigned = h + "." + p;
      const sigBytes = Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(s.length / 4) * 4, "=")), c => c.charCodeAt(0));
      const valid = await crypto.subtle.verify("HMAC", await secret(), sigBytes, new TextEncoder().encode(unsigned));
      if (!valid) return null;
      const payload = JSON.parse(b64url.dec(p));
      if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null;
      return payload;
    };

    const sessionCookie = (token, maxAge = 36000) =>
  `gdnl_eos_token=${encodeURIComponent(token)}; Path=/; Domain=.gdnldigital.com; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;

const clearSessionCookie = () =>
  `gdnl_eos_token=; Path=/; Domain=.gdnldigital.com; Max-Age=0; HttpOnly; Secure; SameSite=Lax`;

const fixTR = (value) => {
  if (value === null || value === undefined || typeof value !== "string") return value;
  return value
    .replaceAll("ÃƒÂ¼", "Ã¼").replaceAll("ÃƒÅ“", "Ãœ")
    .replaceAll("Ã„Â±", "Ä±").replaceAll("Ã„Â°", "Ä°")
    .replaceAll("Ã…Å¸", "ÅŸ").replaceAll("Ã…Å¾", "Å")
    .replaceAll("ÃƒÂ¶", "Ã¶").replaceAll("Ãƒâ€“", "Ã–")
    .replaceAll("ÃƒÂ§", "Ã§").replaceAll("Ãƒâ€¡", "Ã‡")
    .replaceAll("Ã„Å¸", "ÄŸ").replaceAll("Ã„Å¾", "Ä")
    .replaceAll("Ã¢â‚¬â€œ", "â€“").replaceAll("Ã¢â‚¬â€", "â€”")
    .replaceAll("Ã¢â‚¬Ëœ", "'").replaceAll("Ã¢â‚¬â„¢", "'")
    .replaceAll("Ã¢â‚¬Å“", "\"").replaceAll("Ã¢â‚¬Â", "\"");
};

const fixObjectTR = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  const clean = {};
  for (const key of Object.keys(obj)) clean[key] = fixTR(obj[key]);
  return clean;
};

const normalizeStatusForDb = (status) => {
  const s = String(status || "").trim().toLowerCase();
  if (["pasif", "passive", "inactive"].includes(s)) return "passive";
  if (["archived", "arÅŸivli", "arsivli"].includes(s)) return "archived";
  return "active";
};

const normalizeUser = (u) => {
  if (!u) return null;
  const fixed = fixObjectTR(u);
  const role = String(fixed.role || "KULLANICI").trim().toUpperCase();
  return {
    ...fixed,
    id: fixed.id,
    username: String(fixed.username || "").trim().toLowerCase(),
    fullname: fixed.fullname || fixed.fullName || fixed.name || "",
    email: fixed.email || "",
    role,
    department: fixed.department || "",
    status: fixed.status || "active",
    isSuperAdmin: role === "SUPER_ADMIN",
    permissions: role === "SUPER_ADMIN" ? ["*"] : []
  };
};

const getCurrentUser = async () => {
  const token = getCookie("gdnl_eos_token") || getBearerToken() || url.searchParams.get("token") || "";
  const payload = await verifyJwt(token);
  if (!payload || !payload.user_id) return null;
  const user = await env.DB.prepare("SELECT * FROM users WHERE id=? AND status IN ('active','Aktif') LIMIT 1")
    .bind(payload.user_id).first();
  return normalizeUser(user);
};

const requireAuth = async () => {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
};

const requireSuperAdmin = async () => {
  const user = await requireAuth();
  if (String(user.role || "").toUpperCase() !== "SUPER_ADMIN") throw new Error("FORBIDDEN");
  return user;
};

const safeInsertAudit = async ({ user = null, action = "", module = "", related_id = "", old_value = "", new_value = "", detail = "" }) => {
  try {
    await env.DB.prepare(`
      INSERT INTO audit_logs
      (id, user_id, user_name, action, module, related_id, old_value, new_value, detail, ip_address, user_agent, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      user?.id ? String(user.id) : "",
      user?.fullname || user?.username || "",
      action,
      module,
      related_id,
      old_value,
      new_value,
      detail,
      getClientIp(),
      getUserAgent()
    ).run();
  } catch (e) {}
};

const safeInsertActivity = async ({ user = null, activity_type = "", module = "", related_id = "", title = "", description = "" }) => {
  try {
    await env.DB.prepare(`
      INSERT INTO activity_feed
      (id, user_id, user_name, activity_type, module, related_id, title, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      user?.id ? String(user.id) : "",
      user?.fullname || user?.username || "",
      activity_type,
      module,
      related_id,
      title,
      description
    ).run();
  } catch (e) {}
};

const fallbackRoles = [
  "SUPER_ADMIN",
  "DEPARTMAN_MUDURU",
  "KALITE_MUDURU",
  "SUREC_LIDERI",
  "DENETCI",
  "DOKUMAN_KONTROL",
  "EGITIM_SORUMLUSU",
  "CAPA_SORUMLUSU",
  "RISK_SORUMLUSU",
  "KULLANICI"
];

const fallbackDepartments = [
  "YÃ¶netim", "Kalite", "Ãœretim", "Ar-Ge", "SatÄ±nalma", "Planlama", "SatÄ±ÅŸ & Pazarlama", "Depo",
  "Ä°nsan KaynaklarÄ±", "Muhasebe", "Finans", "Bilgi Teknolojileri", "Laboratuvar", "BakÄ±m", "Teknik Servis", "Ä°dari Ä°ÅŸler"
];



/* MAILBOX HELPERS - existing Worker'a ek olarak, auth/CORS/session akışını değiştirmez. */
const mailboxUserName = (user) => fixTR(user?.fullname || user?.username || user?.email || "Kullanıcı");

const normalizeMailboxStatus = (status) => {
  const value = String(status || "sent").trim().toLowerCase();
  if (value === "draft" || value === "drafts") return "draft";
  if (value === "trash") return "trash";
  if (value === "deleted") return "deleted";
  return "sent";
};

const normalizeMailboxFolder = (folder) => {
  const value = String(folder || "inbox").trim().toLowerCase();
  if (value === "draft") return "drafts";
  if (["inbox", "sent", "drafts", "trash"].includes(value)) return value;
  return "inbox";
};

const escapeMailboxLike = (value) => String(value || "").replace(/[\\%_]/g, match => "\\" + match);

const mailboxTableColumns = async (table) => {
  const { results } = await env.DB.prepare(`PRAGMA table_info(${table})`).all();
  return new Set((results || []).map(row => row.name));
};

const ensureMailboxColumn = async (table, column, definition) => {
  const columns = await mailboxTableColumns(table);
  if (!columns.has(column)) {
    await env.DB.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run();
  }
};

const ensureMailboxSchema = async () => {
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      subject TEXT,
      body TEXT,
      sender_id TEXT,
      sender_name TEXT,
      priority TEXT DEFAULT 'normal',
      status TEXT DEFAULT 'sent',
      folder_status TEXT DEFAULT 'sent',
      related_module TEXT DEFAULT 'General',
      related_record_id TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT,
      sent_at TEXT,
      deleted_at TEXT
    )
  `).run();
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS message_recipients (
      id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      recipient_id TEXT,
      recipient_name TEXT,
      recipient_email TEXT,
      is_read INTEGER DEFAULT 0,
      read_at TEXT,
      created_at TEXT
    )
  `).run();
  await env.DB.prepare(`
    CREATE TABLE IF NOT EXISTS message_attachments (
      id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      file_name TEXT,
      file_type TEXT,
      file_size INTEGER,
      r2_key TEXT,
      url TEXT,
      uploaded_by TEXT,
      created_at TEXT
    )
  `).run();

  await ensureMailboxColumn("messages", "sender_name", "TEXT");
  await ensureMailboxColumn("messages", "priority", "TEXT DEFAULT 'normal'");
  await ensureMailboxColumn("messages", "folder_status", "TEXT DEFAULT 'sent'");
  await ensureMailboxColumn("messages", "related_module", "TEXT DEFAULT 'General'");
  await ensureMailboxColumn("messages", "related_record_id", "TEXT");
  await ensureMailboxColumn("messages", "updated_at", "TEXT");
  await ensureMailboxColumn("messages", "sent_at", "TEXT");
  await ensureMailboxColumn("messages", "deleted_at", "TEXT");

  await ensureMailboxColumn("message_recipients", "recipient_name", "TEXT");
  await ensureMailboxColumn("message_recipients", "recipient_email", "TEXT");
  await ensureMailboxColumn("message_recipients", "user_id", "TEXT");
  await ensureMailboxColumn("message_recipients", "is_read", "INTEGER DEFAULT 0");
  await ensureMailboxColumn("message_recipients", "status", "TEXT");
  await ensureMailboxColumn("message_recipients", "read_at", "TEXT");
  await ensureMailboxColumn("message_recipients", "created_at", "TEXT");

  await ensureMailboxColumn("message_attachments", "file_type", "TEXT");
  await ensureMailboxColumn("message_attachments", "file_size", "INTEGER");
  await ensureMailboxColumn("message_attachments", "url", "TEXT");
  await ensureMailboxColumn("message_attachments", "uploaded_by", "TEXT");
  await ensureMailboxColumn("message_attachments", "created_at", "TEXT");
};

const mailboxRecipientFromPayload = (recipient = {}) => ({
  recipient_id: String(recipient.recipient_id || recipient.user_id || recipient.id || "").trim(),
  recipient_name: fixTR(recipient.recipient_name || recipient.fullname || recipient.fullName || recipient.name || recipient.username || ""),
  recipient_email: String(recipient.recipient_email || recipient.email || "").trim()
});

const mailboxAttachmentFromPayload = (attachment = {}, user = null) => ({
  file_name: fixTR(attachment.file_name || attachment.filename || attachment.fileName || attachment.name || ""),
  file_type: String(attachment.file_type || attachment.mime_type || attachment.mimeType || attachment.type || "").trim(),
  file_size: Number(attachment.file_size || attachment.size || 0) || 0,
  r2_key: String(attachment.r2_key || attachment.r2Key || attachment.key || "").trim(),
  url: String(attachment.url || attachment.download_url || attachment.downloadUrl || "").trim(),
  uploaded_by: String(attachment.uploaded_by || attachment.uploadedBy || user?.id || "").trim()
});

const getMailboxRecipients = async (messageId) => {
  const { results } = await env.DB.prepare(`
    SELECT *
    FROM message_recipients
    WHERE message_id=?
    ORDER BY created_at ASC, id ASC
  `).bind(String(messageId)).all();
  return (results || []).map(fixObjectTR);
};

const getMailboxAttachments = async (messageId) => {
  const { results } = await env.DB.prepare(`
    SELECT *
    FROM message_attachments
    WHERE message_id=?
    ORDER BY created_at ASC, id ASC
  `).bind(String(messageId)).all();
  return (results || []).map(fixObjectTR);
};

const hydrateMailboxMessage = async (message, user = null) => {
  if (!message) return null;
  const fixed = fixObjectTR(message);
  const recipients = await getMailboxRecipients(fixed.id);
  const attachments = await getMailboxAttachments(fixed.id);
  const currentUserId = user?.id ? String(user.id) : "";
  const isSender = currentUserId && String(fixed.sender_id || "") === currentUserId;
  const recipientRow = recipients.find(r => currentUserId && String(r.recipient_id || "") === currentUserId) || null;
  return {
    ...fixed,
    folder: fixed.folder || (String(fixed.folder_status || "") === "trash" ? "trash" : (String(fixed.status || "") === "draft" ? "drafts" : (isSender ? "sent" : "inbox"))),
    is_sender: isSender,
    is_read: recipientRow ? Number(recipientRow.is_read || 0) === 1 : Number(fixed.is_read || 0) === 1,
    read_at: recipientRow?.read_at || fixed.read_at || null,
    recipients,
    attachments
  };
};

const assertMailboxAccess = async (messageId, user) => {
  const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1")
    .bind(String(messageId)).first();
  if (!message) return { message: null, isSender: false, isRecipient: false };
  const userId = String(user?.id || "");
  const isSender = String(message.sender_id || "") === userId;
  const recipient = await env.DB.prepare("SELECT * FROM message_recipients WHERE message_id=? AND recipient_id=? LIMIT 1")
    .bind(String(messageId), userId).first();
  return { message, isSender, isRecipient: !!recipient };
};

const replaceMailboxRecipients = async (messageId, recipients = []) => {
  await env.DB.prepare("DELETE FROM message_recipients WHERE message_id=?").bind(String(messageId)).run();
  const cleanRecipients = (Array.isArray(recipients) ? recipients : [])
    .map(mailboxRecipientFromPayload)
    .filter(recipient => recipient.recipient_id);

  for (const recipient of cleanRecipients) {
    await env.DB.prepare(`
      INSERT INTO message_recipients
      (id, message_id, recipient_id, recipient_name, recipient_email, is_read, read_at, created_at)
      VALUES (?, ?, ?, ?, ?, 0, NULL, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      String(messageId),
      recipient.recipient_id,
      recipient.recipient_name,
      recipient.recipient_email
    ).run();
  }

  return cleanRecipients;
};

const replaceMailboxAttachments = async (messageId, attachments = [], user = null) => {
  await env.DB.prepare("DELETE FROM message_attachments WHERE message_id=?").bind(String(messageId)).run();
  const cleanAttachments = (Array.isArray(attachments) ? attachments : [])
    .map(attachment => mailboxAttachmentFromPayload(attachment, user))
    .filter(attachment => attachment.r2_key || attachment.file_name);

  for (const attachment of cleanAttachments) {
    await env.DB.prepare(`
      INSERT INTO message_attachments
      (id, message_id, file_name, file_type, file_size, r2_key, url, uploaded_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(
      crypto.randomUUID(),
      String(messageId),
      attachment.file_name,
      attachment.file_type,
      attachment.file_size,
      attachment.r2_key,
      attachment.url,
      attachment.uploaded_by
    ).run();
  }

  return cleanAttachments;
};

const safeInsertMailboxNotification = async ({ user = null, messageId = "", subject = "", recipient = null }) => {
  const recipientId = String(recipient?.recipient_id || "").trim();
  if (!recipientId) return;
  const title = "Yeni mesaj";
  const message = subject ? `Yeni mesaj: ${fixTR(subject)}` : "Yeni mesajınız var";
  try {
    await env.DB.prepare(`
      INSERT INTO notifications
      (id, title, message, type, recipient_id, related_module, related_record_id, is_read, status, created_at, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'active', CURRENT_TIMESTAMP, ?)
    `).bind(
      crypto.randomUUID(),
      title,
      message,
      "message",
      recipientId,
      "mailbox",
      String(messageId),
      user?.id ? String(user.id) : ""
    ).run();
  } catch (e) {
    try {
      await env.DB.prepare(`
        INSERT INTO notifications
        (id, title, message, status, created_at, created_by)
        VALUES (?, ?, ?, 'active', CURRENT_TIMESTAMP, ?)
      `).bind(crypto.randomUUID(), title, message, user?.id ? String(user.id) : "").run();
    } catch (ignored) {}
  }
};

const safeInsertMailboxLog = async (user, action, messageId, detail) => {
  await safeInsertAudit({ user, action, module: "MAILBOX", related_id: String(messageId || ""), detail });
  await safeInsertActivity({
    user,
    activity_type: action,
    module: "MAILBOX",
    related_id: String(messageId || ""),
    title: detail,
    description: detail
  });
};

try {
  if (path === "/") {
    return ok({
      system: "GDNL EOS API",
      worker: "gdnl-eos-api",
      d1: "DB",
      r2: "EQMS_FILES",
      status: "OK"
    });
  }

  /* AUTH */

  if (path === "/login" && request.method === "GET") {
    return ok({
      endpoint: "POST /login",
      required_body: { username: "kerem.gudenli", password: "123456" },
      note: "TarayÄ±cÄ± adres Ã§ubuÄŸundan /login aÃ§mak GET isteÄŸidir. GiriÅŸ iÃ§in POST kullanÄ±lmalÄ±dÄ±r."
    }, "Login endpoint aktif");
  }

  if (path === "/login" && request.method === "POST") {
    const body = await getBody();
    const username = String(body.username || "").trim().toLowerCase();
    const password = String(body.password || "").trim();

    if (!username || !password) return fail("KullanÄ±cÄ± adÄ± ve ÅŸifre zorunlu", 400, "LOGIN_REQUIRED_FIELDS");

    const user = await env.DB.prepare(`
      SELECT *
      FROM users
      WHERE LOWER(TRIM(username)) = LOWER(TRIM(?))
        AND TRIM(password) = TRIM(?)
        AND LOWER(TRIM(status)) IN ('active','aktif')
      LIMIT 1
    `).bind(username, password).first();

    if (!user) {
      try {
        await env.DB.prepare(`
          INSERT INTO login_logs
          (id, user_id, user_name, username, status, ip_address, user_agent, login_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        `).bind(crypto.randomUUID(), "", "", username, "FAILED", getClientIp(), getUserAgent()).run();
      } catch (e) {}

      return fail("KullanÄ±cÄ± adÄ± veya ÅŸifre hatalÄ±", 401, "LOGIN_FAILED");
    }

    const normalized = normalizeUser(user);
    const sessionId = crypto.randomUUID();
    const token = await signJwt({
      user_id: normalized.id,
      username: normalized.username,
      role: normalized.role,
      session_id: sessionId
    });

    try {
      await env.DB.prepare(`
        INSERT INTO login_logs
        (id, user_id, user_name, username, status, ip_address, user_agent, login_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(
        crypto.randomUUID(),
        String(normalized.id || ""),
        normalized.fullname || normalized.username,
        normalized.username,
        "SUCCESS",
        getClientIp(),
        getUserAgent()
      ).run();
    } catch (e) {}

    try {
      await env.DB.prepare(`
        INSERT INTO sessions
        (id, user_id, token, ip_address, user_agent, login_time, last_activity, status)
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 'ACTIVE')
      `).bind(sessionId, String(normalized.id || ""), token, getClientIp(), getUserAgent()).run();
    } catch (e) {}

    await safeInsertAudit({
      user: normalized,
      action: "LOGIN",
      module: "AUTH",
      related_id: String(normalized.id || ""),
      detail: "KullanÄ±cÄ± giriÅŸ yaptÄ±"
    });

    return ok({ user: normalized, token, session_id: sessionId }, "GiriÅŸ baÅŸarÄ±lÄ±", 200, { "Set-Cookie": sessionCookie(token) });
  }

  if (path === "/logout" && request.method === "POST") {
    const user = await getCurrentUser();
    if (user) {
      await safeInsertAudit({ user, action: "LOGOUT", module: "AUTH", related_id: String(user.id || ""), detail: "KullanÄ±cÄ± Ã§Ä±kÄ±ÅŸ yaptÄ±" });
    }
    return ok({}, "Ã‡Ä±kÄ±ÅŸ baÅŸarÄ±lÄ±", 200, { "Set-Cookie": clearSessionCookie() });
  }


  if (path === "/debug-login" && request.method === "GET") {
    const username = String(url.searchParams.get("username") || "kerem.gudenli").trim().toLowerCase();
    const password = String(url.searchParams.get("password") || "123456").trim();
    const row = await env.DB.prepare(`
      SELECT id, username, password, fullname, email, role, department, status
      FROM users
      WHERE LOWER(TRIM(username)) = LOWER(TRIM(?))
      LIMIT 1
    `).bind(username).first();

    const match = row && String(row.password || "").trim() === password && ["active","aktif"].includes(String(row.status || "").trim().toLowerCase());

    return ok({
      username,
      password_sent: password,
      user_found: !!row,
      password_match: !!match,
      row: row ? normalizeUser(row) : null,
      cookie_present: !!getCookie("gdnl_eos_token")
    }, "Debug login kontrolÃ¼");
  }

  if (path === "/me" && request.method === "GET") {
    const user = await getCurrentUser();
    if (!user) return fail("Oturum bulunamadÄ±", 401, "UNAUTHORIZED");
    return ok({ user }, "Oturum aktif");
  }



  /* MAILBOX */
  if (path === "/messages" || path.startsWith("/messages/") || path === "/message-recipients" || path === "/message-attachments") {
    await ensureMailboxSchema();
  }

  if (path === "/messages/unread-count" && request.method === "GET") {
    const user = await requireAuth();
    const userId = String(user.id || "");
    const row = await env.DB.prepare(`
      SELECT COUNT(DISTINCT m.id) AS unread_count
      FROM messages m
      JOIN message_recipients r ON r.message_id = m.id
      WHERE (CAST(r.recipient_id AS TEXT)=? OR CAST(r.user_id AS TEXT)=?)
        AND (COALESCE(r.is_read, 0)=0 OR UPPER(COALESCE(r.status, ''))='UNREAD' OR r.read_at IS NULL)
        AND COALESCE(m.status, 'sent') NOT IN ('draft', 'deleted', 'permanently_deleted')
        AND COALESCE(m.folder_status, '') <> 'trash'
        AND m.deleted_at IS NULL
    `).bind(userId, userId).first();
    return ok({ unread_count: Number(row?.unread_count || 0) }, "Okunmamış mesaj sayısı");
  }

  if (path === "/message-recipients" && request.method === "GET") {
    await requireAuth();
    const messageId = String(url.searchParams.get("message_id") || "").trim();
    let sql = "SELECT * FROM message_recipients WHERE 1=1";
    const params = [];
    if (messageId) { sql += " AND message_id=?"; params.push(messageId); }
    sql += " ORDER BY created_at DESC, id DESC LIMIT 500";
    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return ok((results || []).map(fixObjectTR), "Mesaj alıcıları listelendi");
  }

  if (path === "/message-attachments" && request.method === "GET") {
    await requireAuth();
    const messageId = String(url.searchParams.get("message_id") || "").trim();
    let sql = "SELECT * FROM message_attachments WHERE 1=1";
    const params = [];
    if (messageId) { sql += " AND message_id=?"; params.push(messageId); }
    sql += " ORDER BY created_at DESC, id DESC LIMIT 500";
    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return ok((results || []).map(fixObjectTR), "Mesaj ekleri listelendi");
  }

  if (path === "/messages" && request.method === "GET") {
    const user = await requireAuth();
    const userId = String(user.id || "");
    const folder = normalizeMailboxFolder(url.searchParams.get("folder"));
    const search = String(url.searchParams.get("search") || url.searchParams.get("q") || "").trim();
    const status = String(url.searchParams.get("status") || "").trim().toLowerCase();
    const priority = String(url.searchParams.get("priority") || "").trim().toLowerCase();

    let sql = `
      SELECT DISTINCT m.*,
        CASE
          WHEN COALESCE(m.folder_status, '') = 'trash' THEN 'trash'
          WHEN COALESCE(m.status, 'sent') = 'draft' THEN 'drafts'
          WHEN CAST(m.sender_id AS TEXT) = ? THEN 'sent'
          ELSE 'inbox'
        END AS folder,
        COALESCE(r.is_read, 0) AS is_read,
        r.read_at
      FROM messages m
      LEFT JOIN message_recipients r ON r.message_id = m.id
      WHERE 1=1
    `;
    const params = [userId];

    if (folder === "inbox") {
      sql += " AND r.recipient_id=? AND COALESCE(m.status, 'sent') <> 'draft' AND COALESCE(m.folder_status, '') <> 'trash' AND m.deleted_at IS NULL";
      params.push(userId);
    } else if (folder === "sent") {
      sql += " AND CAST(m.sender_id AS TEXT)=? AND COALESCE(m.status, 'sent')='sent' AND COALESCE(m.folder_status, '') <> 'trash' AND m.deleted_at IS NULL";
      params.push(userId);
    } else if (folder === "drafts") {
      sql += " AND CAST(m.sender_id AS TEXT)=? AND COALESCE(m.status, '')='draft' AND m.deleted_at IS NULL";
      params.push(userId);
    } else if (folder === "trash") {
      sql += " AND (CAST(m.sender_id AS TEXT)=? OR r.recipient_id=?) AND COALESCE(m.folder_status, '')='trash'";
      params.push(userId, userId);
    }

    if (status) { sql += " AND LOWER(COALESCE(m.status, ''))=?"; params.push(status); }
    if (priority) { sql += " AND LOWER(COALESCE(m.priority, ''))=?"; params.push(priority); }
    if (search) {
      const like = `%${escapeMailboxLike(search.toLowerCase())}%`;
      sql += " AND (LOWER(COALESCE(m.subject, '')) LIKE ? ESCAPE '\\' OR LOWER(COALESCE(m.body, '')) LIKE ? ESCAPE '\\' OR LOWER(COALESCE(m.sender_name, '')) LIKE ? ESCAPE '\\')";
      params.push(like, like, like);
    }

    sql += " ORDER BY COALESCE(m.updated_at, m.created_at) DESC LIMIT 200";
    const { results } = await env.DB.prepare(sql).bind(...params).all();
    const messages = [];
    for (const message of (results || [])) messages.push(await hydrateMailboxMessage(message, user));
    return ok({ folder, messages }, "Mesajlar listelendi");
  }

  if (path === "/messages" && request.method === "POST") {
    const user = await requireAuth();
    const body = await getBody();
    const id = String(body.id || crypto.randomUUID());
    const status = normalizeMailboxStatus(body.status);
    const priority = String(body.priority || "normal").trim().toLowerCase() || "normal";
    const subject = fixTR(String(body.subject || "").trim());
    const content = fixTR(String(body.body || body.message || "").trim());
    const recipients = Array.isArray(body.recipients) ? body.recipients : [];
    const attachments = Array.isArray(body.attachments) ? body.attachments : [];

    if (!subject && status !== "draft") return fail("Mesaj konusu zorunlu", 400, "MESSAGE_SUBJECT_REQUIRED");
    if (!content && status !== "draft") return fail("Mesaj içeriği zorunlu", 400, "MESSAGE_BODY_REQUIRED");
    if (status === "sent" && recipients.length === 0) return fail("Gönderilecek mesaj için alıcı seçilmelidir", 400, "MESSAGE_RECIPIENT_REQUIRED");

    const sentAt = status === "sent" ? new Date().toISOString() : null;
    const folderStatus = status === "trash" ? "trash" : status;

    await env.DB.prepare(`
      INSERT INTO messages
      (id, subject, body, sender_id, sender_name, priority, status, folder_status, related_module, related_record_id, created_at, updated_at, sent_at, deleted_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ?, NULL)
    `).bind(
      id,
      subject,
      content,
      String(user.id || ""),
      mailboxUserName(user),
      priority,
      status,
      folderStatus,
      String(body.related_module || "General"),
      String(body.related_record_id || ""),
      sentAt
    ).run();

    const cleanRecipients = await replaceMailboxRecipients(id, recipients);
    await replaceMailboxAttachments(id, attachments, user);

    if (status === "sent") {
      for (const recipient of cleanRecipients) {
        await safeInsertMailboxNotification({ user, messageId: id, subject, recipient });
      }
    }

    await safeInsertMailboxLog(user, status === "draft" ? "MAIL_DRAFT_SAVED" : "MAIL_SENT", id, status === "draft" ? "Taslak mesaj kaydedildi" : "Mesaj gönderildi");

    const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1").bind(id).first();
    return ok(await hydrateMailboxMessage(message, user), status === "draft" ? "Taslak kaydedildi" : "Mesaj gönderildi", 201);
  }

  const messageReadMatch = path.match(/^\/messages\/([^/]+)\/read$/);
  if (messageReadMatch && request.method === "PUT") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageReadMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");
    await env.DB.prepare("UPDATE message_recipients SET is_read=1, read_at=CURRENT_TIMESTAMP WHERE message_id=? AND recipient_id=?")
      .bind(String(id), String(user.id || "")).run();
    await safeInsertMailboxLog(user, "MAIL_READ", id, "Mesaj okundu olarak işaretlendi");
    const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1").bind(String(id)).first();
    return ok(await hydrateMailboxMessage(message, user), "Mesaj okundu olarak işaretlendi");
  }

  const messageTrashMatch = path.match(/^\/messages\/([^/]+)\/trash$/);
  if (messageTrashMatch && request.method === "PUT") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageTrashMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");
    await env.DB.prepare("UPDATE messages SET folder_status='trash', deleted_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(String(id)).run();
    await safeInsertMailboxLog(user, "MAIL_MOVED_TO_TRASH", id, "Mesaj çöp kutusuna taşındı");
    const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1").bind(String(id)).first();
    return ok(await hydrateMailboxMessage(message, user), "Mesaj çöp kutusuna taşındı");
  }

  const messageRestoreMatch = path.match(/^\/messages\/([^/]+)\/restore$/);
  if (messageRestoreMatch && request.method === "PUT") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageRestoreMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");
    const restoredFolder = access.isSender ? (String(access.message.status || "sent") === "draft" ? "draft" : "sent") : "inbox";
    await env.DB.prepare("UPDATE messages SET folder_status=?, deleted_at=NULL, updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(restoredFolder, String(id)).run();
    await safeInsertMailboxLog(user, "MAIL_RESTORED", id, "Mesaj çöp kutusundan geri yüklendi");
    const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1").bind(String(id)).first();
    return ok(await hydrateMailboxMessage(message, user), "Mesaj geri yüklendi");
  }

  const messagePermanentDeleteMatch = path.match(/^\/messages\/([^/]+)\/permanent$/);
  if (messagePermanentDeleteMatch && request.method === "DELETE") {
    const user = await requireAuth();
    const id = decodeURIComponent(messagePermanentDeleteMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");

    const { results: attachments } = await env.DB.prepare("SELECT * FROM message_attachments WHERE message_id=?")
      .bind(String(id)).all();
    const r2Errors = [];
    for (const attachment of (attachments || [])) {
      const key = String(attachment.r2_key || "").trim();
      if (!key) continue;
      try {
        if (env.EQMS_FILES) await env.EQMS_FILES.delete(key);
      } catch (error) {
        r2Errors.push(`${key}: ${error.message || error}`);
      }
    }

    await env.DB.prepare("DELETE FROM message_attachments WHERE message_id=?").bind(String(id)).run();
    await env.DB.prepare("DELETE FROM message_recipients WHERE message_id=?").bind(String(id)).run();
    await env.DB.prepare("DELETE FROM messages WHERE id=?").bind(String(id)).run();
    const detail = `Kalıcı silme tamamlandı. R2 ek sayısı: ${(attachments || []).length}. R2 hata: ${r2Errors.length ? r2Errors.join(" | ") : "yok"}`;
    await safeInsertMailboxLog(user, "MAIL_PERMANENT_DELETE", id, detail);
    return ok({ id, deleted: true, attachments_deleted: (attachments || []).length, r2_errors: r2Errors }, "Mesaj kalıcı olarak silindi");
  }

  const messageOneMatch = path.match(/^\/messages\/([^/]+)$/);
  if (messageOneMatch && request.method === "GET") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageOneMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");
    return ok(await hydrateMailboxMessage(access.message, user), "Mesaj detayı getirildi");
  }

  if (messageOneMatch && request.method === "PUT") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageOneMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || !access.isSender) return fail("Mesaj güncellenemedi", 403, "MESSAGE_UPDATE_FORBIDDEN");
    const body = await getBody();
    const nextStatus = normalizeMailboxStatus(body.status || access.message.status || "sent");
    const priority = String(body.priority || access.message.priority || "normal").trim().toLowerCase() || "normal";
    const subject = fixTR(String(body.subject ?? access.message.subject ?? "").trim());
    const content = fixTR(String(body.body ?? access.message.body ?? "").trim());
    const sentAt = nextStatus === "sent" && !access.message.sent_at ? new Date().toISOString() : access.message.sent_at;
    const folderStatus = nextStatus === "trash" ? "trash" : nextStatus;

    await env.DB.prepare(`
      UPDATE messages
      SET subject=?, body=?, priority=?, status=?, folder_status=?, related_module=?, related_record_id=?, updated_at=CURRENT_TIMESTAMP, sent_at=?
      WHERE id=?
    `).bind(
      subject,
      content,
      priority,
      nextStatus,
      folderStatus,
      String(body.related_module ?? access.message.related_module ?? "General"),
      String(body.related_record_id ?? access.message.related_record_id ?? ""),
      sentAt,
      String(id)
    ).run();

    if (Array.isArray(body.recipients)) await replaceMailboxRecipients(id, body.recipients);
    if (Array.isArray(body.attachments)) await replaceMailboxAttachments(id, body.attachments, user);

    await safeInsertMailboxLog(user, "MAIL_UPDATED", id, "Mesaj güncellendi");
    const message = await env.DB.prepare("SELECT * FROM messages WHERE id=? LIMIT 1").bind(String(id)).first();
    return ok(await hydrateMailboxMessage(message, user), "Mesaj güncellendi");
  }

  if (messageOneMatch && request.method === "DELETE") {
    const user = await requireAuth();
    const id = decodeURIComponent(messageOneMatch[1]);
    const access = await assertMailboxAccess(id, user);
    if (!access.message || (!access.isSender && !access.isRecipient)) return fail("Mesaj bulunamadı", 404, "MESSAGE_NOT_FOUND");
    await env.DB.prepare("UPDATE messages SET status='deleted', folder_status='trash', deleted_at=CURRENT_TIMESTAMP, updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(String(id)).run();
    await safeInsertMailboxLog(user, "MAIL_DELETED", id, "Mesaj soft delete ile silindi");
    return ok({ id }, "Mesaj silindi");
  }

  /* USERS */
  if (path === "/users" && request.method === "GET") {
    await requireAuth();
    const q = String(url.searchParams.get("q") || "").trim();
    const status = String(url.searchParams.get("status") || "").trim();
    const department = String(url.searchParams.get("department") || url.searchParams.get("department_id") || "").trim();
    const role = String(url.searchParams.get("role") || url.searchParams.get("role_id") || "").trim();

    let sql = "SELECT * FROM users WHERE 1=1";
    const params = [];

    if (q) {
      sql += " AND (LOWER(fullname) LIKE ? OR LOWER(email) LIKE ? OR LOWER(department) LIKE ? OR LOWER(role) LIKE ? OR LOWER(username) LIKE ?)";
      const like = `%${q.toLowerCase()}%`;
      params.push(like, like, like, like, like);
    }
    if (status) { sql += " AND status=?"; params.push(status); }
    if (department) { sql += " AND department=?"; params.push(department); }
    if (role) { sql += " AND role=?"; params.push(role); }

    sql += " ORDER BY id ASC";

    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return ok((results || []).map(normalizeUser), "KullanÄ±cÄ±lar listelendi");
  }

  const userOneMatch = path.match(/^\/users\/(\d+)$/);

  if (userOneMatch && request.method === "GET") {
    await requireAuth();
    const user = await env.DB.prepare("SELECT * FROM users WHERE id=? LIMIT 1").bind(Number(userOneMatch[1])).first();
    if (!user) return fail("KullanÄ±cÄ± bulunamadÄ±", 404, "USER_NOT_FOUND");
    return ok(normalizeUser(user), "KullanÄ±cÄ± getirildi");
  }

  if (path === "/users" && request.method === "POST") {
    const actor = await requireSuperAdmin();
    const body = await getBody();

    const fullname = String(body.fullname || body.fullName || body.name || "").trim();
    const email = String(body.email || "").trim();
    const username = String(body.username || (email ? email.split("@")[0] : "")).trim().toLowerCase();
    const password = String(body.password || "123456").trim();
    const role = String(body.role || "KULLANICI").trim();
    const department = String(body.department || "").trim();
    const status = normalizeStatusForDb(body.status);

    if (!username || !password || !fullname) return fail("Ad soyad, kullanÄ±cÄ± adÄ± ve ÅŸifre zorunlu", 400, "USER_REQUIRED_FIELDS");

    const exists = await env.DB.prepare("SELECT id FROM users WHERE username=? LIMIT 1").bind(username).first();
    if (exists) return fail("Bu kullanÄ±cÄ± adÄ± zaten kayÄ±tlÄ±", 409, "USERNAME_EXISTS");

    await env.DB.prepare(`
      INSERT INTO users (username, password, fullname, email, role, department, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).bind(username, password, fullname, email, role, department, status).run();

    await safeInsertAudit({
      user: actor,
      action: "CREATE_USER",
      module: "USERS",
      related_id: username,
      new_value: JSON.stringify({ username, fullname, email, role, department, status }),
      detail: "KullanÄ±cÄ± oluÅŸturuldu"
    });

    return ok({}, "KullanÄ±cÄ± eklendi");
  }

  if (userOneMatch && request.method === "PUT") {
    const actor = await requireSuperAdmin();
    const id = Number(userOneMatch[1]);
    const body = await getBody();

    const oldUser = await env.DB.prepare("SELECT * FROM users WHERE id=? LIMIT 1").bind(id).first();
    if (!oldUser) return fail("KullanÄ±cÄ± bulunamadÄ±", 404, "USER_NOT_FOUND");

    const fullname = String(body.fullname || body.fullName || body.name || oldUser.fullname || "").trim();
    const email = String(body.email || oldUser.email || "").trim();
    const username = String(body.username || oldUser.username || "").trim().toLowerCase();
    const password = String(body.password || oldUser.password || "123456").trim();
    const role = String(body.role || oldUser.role || "KULLANICI").trim();
    const department = String(body.department || oldUser.department || "").trim();
    const status = normalizeStatusForDb(body.status || oldUser.status);

    await env.DB.prepare(`
      UPDATE users
      SET username=?, password=?, fullname=?, email=?, role=?, department=?, status=?
      WHERE id=?
    `).bind(username, password, fullname, email, role, department, status, id).run();

    await safeInsertAudit({
      user: actor,
      action: "UPDATE_USER",
      module: "USERS",
      related_id: String(id),
      old_value: JSON.stringify(oldUser || {}),
      new_value: JSON.stringify({ username, fullname, email, role, department, status }),
      detail: "KullanÄ±cÄ± gÃ¼ncellendi"
    });

    return ok({}, "KullanÄ±cÄ± gÃ¼ncellendi");
  }

  const archiveUserMatch = path.match(/^\/users\/(\d+)\/archive$/);
  if (archiveUserMatch && (request.method === "PATCH" || request.method === "POST")) {
    const actor = await requireSuperAdmin();
    const id = Number(archiveUserMatch[1]);
    const body = await getBody();
    const oldUser = await env.DB.prepare("SELECT * FROM users WHERE id=? LIMIT 1").bind(id).first();
    if (!oldUser) return fail("KullanÄ±cÄ± bulunamadÄ±", 404, "USER_NOT_FOUND");
    if (String(oldUser.role || "").toUpperCase() === "SUPER_ADMIN") return fail("SUPER_ADMIN pasifleÅŸtirilemez", 403, "SUPER_ADMIN_LOCKED");

    await env.DB.prepare("UPDATE users SET status='archived' WHERE id=?").bind(id).run();

    await safeInsertAudit({
      user: actor,
      action: "ARCHIVE_USER",
      module: "USERS",
      related_id: String(id),
      old_value: JSON.stringify(oldUser || {}),
      new_value: JSON.stringify({ status: "archived", archive_reason: body.archive_reason || "" }),
      detail: "KullanÄ±cÄ± arÅŸivlendi"
    });

    return ok({}, "KullanÄ±cÄ± arÅŸivlendi");
  }

  const restoreUserMatch = path.match(/^\/users\/(\d+)\/restore$/);
  if (restoreUserMatch && (request.method === "PATCH" || request.method === "POST")) {
    const actor = await requireSuperAdmin();
    const id = Number(restoreUserMatch[1]);
    const oldUser = await env.DB.prepare("SELECT * FROM users WHERE id=? LIMIT 1").bind(id).first();
    if (!oldUser) return fail("KullanÄ±cÄ± bulunamadÄ±", 404, "USER_NOT_FOUND");

    await env.DB.prepare("UPDATE users SET status='active' WHERE id=?").bind(id).run();

    await safeInsertAudit({
      user: actor,
      action: "RESTORE_USER",
      module: "USERS",
      related_id: String(id),
      old_value: JSON.stringify(oldUser || {}),
      new_value: JSON.stringify({ status: "active" }),
      detail: "KullanÄ±cÄ± restore edildi"
    });

    return ok({}, "KullanÄ±cÄ± restore edildi");
  }

  if (userOneMatch && request.method === "DELETE") {
    return fail("Fiziksel DELETE yasak. /users/{id}/archive kullan.", 405, "PHYSICAL_DELETE_FORBIDDEN");
  }

  /* ROLES - current schema compatible: id, role_name, description, created_at */
  if (path === "/roles" && request.method === "GET") {
    await requireAuth();
    let roles = [];
    try {
      const { results } = await env.DB.prepare("SELECT id, role_name AS name, role_name, description, created_at FROM roles ORDER BY id ASC").all();
      roles = results || [];
    } catch (e) {
      roles = fallbackRoles.map((r, i) => ({ id: i + 1, name: r, role_name: r, description: "" }));
    }
    return ok(roles.map(fixObjectTR), "Roller listelendi");
  }

  if (path === "/roles" && request.method === "POST") {
    const actor = await requireSuperAdmin();
    const body = await getBody();
    const roleName = String(body.name || body.role_name || "").trim();
    const description = String(body.description || "").trim();
    if (!roleName) return fail("Rol adÄ± zorunlu", 400, "ROLE_NAME_REQUIRED");

    await env.DB.prepare("INSERT INTO roles (role_name, description) VALUES (?, ?)").bind(roleName, description).run();

    await safeInsertAudit({
      user: actor,
      action: "CREATE_ROLE",
      module: "RBAC",
      related_id: roleName,
      new_value: JSON.stringify({ role_name: roleName, description }),
      detail: "Rol oluÅŸturuldu"
    });

    return ok({}, "Rol oluÅŸturuldu");
  }

  const roleMatch = path.match(/^\/roles\/(\d+)$/);
  if (roleMatch && request.method === "PUT") {
    const actor = await requireSuperAdmin();
    const id = Number(roleMatch[1]);
    const body = await getBody();
    const oldRole = await env.DB.prepare("SELECT * FROM roles WHERE id=? LIMIT 1").bind(id).first();
    if (!oldRole) return fail("Rol bulunamadÄ±", 404, "ROLE_NOT_FOUND");

    const roleName = String(body.name || body.role_name || oldRole.role_name || "").trim();
    const description = String(body.description || oldRole.description || "").trim();

    await env.DB.prepare("UPDATE roles SET role_name=?, description=? WHERE id=?").bind(roleName, description, id).run();

    await safeInsertAudit({
      user: actor,
      action: "UPDATE_ROLE",
      module: "RBAC",
      related_id: String(id),
      old_value: JSON.stringify(oldRole || {}),
      new_value: JSON.stringify({ role_name: roleName, description }),
      detail: "Rol gÃ¼ncellendi"
    });

    return ok({}, "Rol gÃ¼ncellendi");
  }

  const roleArchiveMatch = path.match(/^\/roles\/(\d+)\/archive$/);
  if (roleArchiveMatch && (request.method === "PATCH" || request.method === "POST")) {
    return fail("Mevcut roles tablosunda status kolonu yok. Rol arÅŸivleme iÃ§in Ã¶nce status kolonu eklenmeli.", 409, "ROLE_STATUS_COLUMN_MISSING");
  }

  /* DEPARTMENTS */
  if (path === "/departments" && request.method === "GET") {
    /* PUBLIC: Login ekranÄ± departman sayÄ±sÄ±nÄ± giriÅŸ Ã¶ncesi okuyabilsin. */
    let results = [];
    try {
      const q = await env.DB.prepare("SELECT * FROM departments ORDER BY name ASC").all();
      results = q.results || [];
    } catch (e1) {
      try {
        const q = await env.DB.prepare("SELECT * FROM departments ORDER BY department_name ASC").all();
        results = q.results || [];
      } catch (e2) {
        const users = await env.DB.prepare("SELECT DISTINCT department FROM users WHERE department IS NOT NULL AND department != '' ORDER BY department ASC").all();
        results = (users.results || []).map((x, i) => ({ id: i + 1, name: x.department, department_name: x.department, status: "active" }));
      }
    }
    if (!results.length) results = fallbackDepartments.map((d, i) => ({ id: i + 1, name: d, department_name: d, status: "active" }));
    return ok((results || []).map(fixObjectTR), "Departmanlar listelendi");
  }

  if (path === "/departments" && request.method === "POST") {
    const actor = await requireSuperAdmin();
    const body = await getBody();
    const name = String(body.name || body.department_name || "").trim();
    if (!name) return fail("Departman adÄ± zorunlu", 400, "DEPARTMENT_NAME_REQUIRED");
    try {
      await env.DB.prepare("INSERT INTO departments (name, status) VALUES (?, 'active')").bind(name).run();
    } catch (e) {
      await env.DB.prepare("INSERT INTO departments (department_name, status) VALUES (?, 'active')").bind(name).run();
    }
    await safeInsertAudit({ user: actor, action: "CREATE_DEPARTMENT", module: "DEPARTMENTS", related_id: name, detail: "Departman oluÅŸturuldu" });
    return ok({}, "Departman oluÅŸturuldu");
  }

  /* PERMISSIONS */
  if (path === "/permissions" && request.method === "GET") {
    await requireAuth();
    try {
      const { results } = await env.DB.prepare("SELECT * FROM permissions ORDER BY id ASC").all();
      return ok((results || []).map(fixObjectTR), "Yetkiler listelendi");
    } catch (e) {
      return ok([], "permissions tablosu okunamadÄ±");
    }
  }

  if (path === "/role_permissions" && request.method === "GET") {
    await requireAuth();
    try {
      const { results } = await env.DB.prepare("SELECT * FROM role_permissions ORDER BY role_id ASC").all();
      return ok((results || []).map(fixObjectTR), "Rol yetkileri listelendi");
    } catch (e) {
      return ok([], "role_permissions tablosu okunamadÄ±");
    }
  }

  /* SEARCH */
  if (path === "/search" && request.method === "GET") {
    await requireAuth();
    const q = String(url.searchParams.get("q") || "").trim().toLowerCase();
    if (!q) return ok([], "Arama terimi boÅŸ");

    const like = `%${q}%`;
    const items = [];

    try {
      const users = await env.DB.prepare(`
        SELECT id, fullname AS title, email, department, role, 'users' AS type
        FROM users
        WHERE status NOT IN ('archived','deleted','passive')
          AND (LOWER(fullname) LIKE ? OR LOWER(email) LIKE ? OR LOWER(department) LIKE ? OR LOWER(role) LIKE ? OR LOWER(username) LIKE ?)
        LIMIT 30
      `).bind(like, like, like, like, like).all();
      items.push(...(users.results || []));
    } catch (e) {}

    try {
      const roles = await env.DB.prepare(`
        SELECT id, role_name AS title, description, 'roles' AS type
        FROM roles
        WHERE LOWER(role_name) LIKE ? OR LOWER(description) LIKE ?
        LIMIT 20
      `).bind(like, like).all();
      items.push(...(roles.results || []));
    } catch (e) {}

    try {
      const deps = await env.DB.prepare(`
        SELECT id, name AS title, 'departments' AS type
        FROM departments
        WHERE LOWER(name) LIKE ?
        LIMIT 20
      `).bind(like).all();
      items.push(...(deps.results || []));
    } catch (e) {}

    return ok(items.map(fixObjectTR), "Arama tamamlandÄ±");
  }

  /* KPI */
  if (path === "/dashboard/kpi" && request.method === "GET") {
    /* PUBLIC: Login ekranÄ± KPI Ã¶zetini giriÅŸ Ã¶ncesi okuyabilsin. */
    const count = async (sql) => {
      try {
        const r = await env.DB.prepare(sql).first();
        return Number(r?.count || 0);
      } catch (e) { return 0; }
    };

    const data = {
      open_actions: await count("SELECT COUNT(*) AS count FROM actions WHERE status NOT IN ('Closed','Deleted','closed','deleted')"),
      open_capa: await count("SELECT COUNT(*) AS count FROM capas WHERE status NOT IN ('Closed','Deleted','closed','deleted')"),
      open_risks: await count("SELECT COUNT(*) AS count FROM risks WHERE status NOT IN ('Closed','Deleted','closed','deleted')"),
      open_audits: await count("SELECT COUNT(*) AS count FROM nonconformities WHERE status NOT IN ('Closed','Deleted','closed','deleted')"),
      open_revisions: await count("SELECT COUNT(*) AS count FROM revisions WHERE status NOT IN ('Closed','Deleted','closed','deleted')"),
      pending_approvals: await count("SELECT COUNT(*) AS count FROM approvals WHERE status NOT IN ('Approved','Rejected','Closed','approved','rejected','closed')"),
      pending_tasks: await count("SELECT COUNT(*) AS count FROM assignments WHERE status NOT IN ('Completed','Closed','completed','closed')"),
      upcoming_deadlines: await count("SELECT COUNT(*) AS count FROM assignments WHERE due_date IS NOT NULL AND due_date != '' AND status NOT IN ('Completed','Closed','completed','closed')")
    };

    return ok(data, "KPI verileri getirildi");
  }

  /* AUDIT LOGS */
  if (path === "/audit-logs" && request.method === "GET") {
    await requireAuth();
    const module = String(url.searchParams.get("module") || "").trim();

    let sql = "SELECT * FROM audit_logs WHERE 1=1";
    const params = [];
    if (module) { sql += " AND module=?"; params.push(module); }
    sql += " ORDER BY created_at DESC LIMIT 300";

    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return ok((results || []).map(fixObjectTR), "Audit log listelendi");
  }

  if (path === "/audit-logs" && request.method !== "GET") {
    return fail("Audit Log silinemez/deÄŸiÅŸtirilemez", 405, "AUDIT_LOG_IMMUTABLE");
  }

  /* ACTIVITY FEED */
  if (path === "/activity-feed" && request.method === "GET") {
    await requireAuth();
    const { results } = await env.DB.prepare("SELECT * FROM activity_feed ORDER BY created_at DESC LIMIT 100").all();
    return ok((results || []).map(fixObjectTR), "Activity feed listelendi");
  }

  /* NOTIFICATIONS */
  if (path === "/notifications" && request.method === "GET") {
    const user = await requireAuth();
    const { results } = await env.DB.prepare("SELECT * FROM notifications ORDER BY created_at DESC LIMIT 100").all();
    return ok((results || []).map(fixObjectTR), "Bildirimler listelendi");
  }

  const notificationReadMatch = path.match(/^\/notifications\/([^/]+)\/read$/);
  if (notificationReadMatch && (request.method === "PUT" || request.method === "PATCH")) {
    const user = await requireAuth();
    const id = decodeURIComponent(notificationReadMatch[1]);
    try {
      await env.DB.prepare("UPDATE notifications SET status='READ' WHERE id=?").bind(id).run();
    } catch (e) {}
    try {
      await env.DB.prepare(`
        INSERT INTO notification_reads (id, notification_id, user_id, user_name, read_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(crypto.randomUUID(), id, String(user.id || ""), user.fullname || user.username || "").run();
    } catch (e) {}
    return ok({}, "Bildirim okundu");
  }

  /* R2 UPLOAD */
  if (path === "/upload" && request.method === "POST") {
    const user = await requireAuth();

    if (!env.EQMS_FILES) return fail("R2 binding bulunamadÄ±: EQMS_FILES", 500, "R2_BINDING_MISSING");

    const formData = await request.formData();
    const file = formData.get("file");
    const module = String(formData.get("module") || "GENERAL").trim().toUpperCase();
    const relatedId = String(formData.get("related_id") || "NO-REF").trim();

    if (!file || typeof file === "string") return fail("Dosya bulunamadÄ±", 400, "FILE_NOT_FOUND");

    const id = crypto.randomUUID();
    const safeFileName = file.name.replace(/[^\w.\-ÄŸÃ¼ÅŸÃ¶Ã§Ä±Ä°ÄÃœÅÃ–Ã‡ ]/g, "_");
    const r2Key = `${module}/${relatedId}/${id}-${safeFileName}`;

    await env.EQMS_FILES.put(r2Key, file.stream(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" }
    });

    try {
      await env.DB.prepare(`
        INSERT INTO files
        (id, module, related_id, file_name, file_type, file_size, r2_key, uploaded_by, uploaded_at, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'ACTIVE')
      `).bind(id, module, relatedId, file.name, file.type || "application/octet-stream", file.size || 0, r2Key, user.fullname || user.username || "").run();
    } catch (e) {}

    try {
      await env.DB.prepare(`
        INSERT INTO file_versions
        (id, file_id, version_no, r2_key, file_name, uploaded_by, uploaded_at, status)
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'ACTIVE')
      `).bind(crypto.randomUUID(), id, 1, r2Key, file.name, user.fullname || user.username || "").run();
    } catch (e) {}

    await safeInsertAudit({
      user,
      action: "UPLOAD_FILE",
      module,
      related_id: relatedId,
      new_value: JSON.stringify({ id, file_name: file.name, file_size: file.size || 0, r2_key: r2Key }),
      detail: "Dosya R2 deposuna yÃ¼klendi"
    });

    return ok({
      file: {
        id,
        module,
        related_id: relatedId,
        file_name: file.name,
        file_type: file.type || "application/octet-stream",
        file_size: file.size || 0,
        r2_key: r2Key,
        temporary_token: id
      }
    }, "Dosya R2â€™ye yÃ¼klendi");
  }

  if (path === "/files" && request.method === "GET") {
    await requireAuth();
    const module = String(url.searchParams.get("module") || "").trim().toUpperCase();
    const relatedId = String(url.searchParams.get("related_id") || "").trim();

    let sql = "SELECT * FROM files WHERE status IN ('ACTIVE','active')";
    const params = [];
    if (module) { sql += " AND module=?"; params.push(module); }
    if (relatedId) { sql += " AND related_id=?"; params.push(relatedId); }
    sql += " ORDER BY uploaded_at DESC";

    const { results } = await env.DB.prepare(sql).bind(...params).all();
    return ok((results || []).map(fixObjectTR), "Dosyalar listelendi");
  }

  if (path.startsWith("/file/") && request.method === "GET") {
    await requireAuth();
    const key = decodeURIComponent(path.replace("/file/", ""));
    if (!key) return fail("Dosya key eksik", 400, "FILE_KEY_REQUIRED");

    const object = await env.EQMS_FILES.get(key);
    if (!object) {
      return new Response("Dosya bulunamadÄ±", { status: 404, headers: fileCorsHeaders });
    }

    return new Response(object.body, {
      headers: {
        ...fileCorsHeaders,
        "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
        "Content-Disposition": `inline; filename="${key.split("/").pop()}"`
      }
    });
  }

  return fail("Endpoint bulunamadÄ±", 404, "NOT_FOUND");

} catch (err) {
  if (err.message === "UNAUTHORIZED") return fail("Oturum geÃ§ersiz veya giriÅŸ yapÄ±lmamÄ±ÅŸ", 401, "UNAUTHORIZED");
  if (err.message === "FORBIDDEN") return fail("Bu iÅŸlem iÃ§in SUPER_ADMIN yetkisi gerekir", 403, "FORBIDDEN");
  return json({
    success: false,
    error: {
      code: "API_ERROR",
      message: "API hata verdi",
      detail: err.message
    }
  }, 500);
}
  }
};
