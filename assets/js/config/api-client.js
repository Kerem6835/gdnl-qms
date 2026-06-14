;(function (global) {
  "use strict";

  const DEFAULT_API_BASE = "https://api.gdnldigital.com";
  const TOKEN_KEY = "gdnl_api_token";
  const USER_NAME_PENDING = "Oturum doğrulanıyor";

  const API_BASE_URL = String(global.GDNL_API_BASE || DEFAULT_API_BASE).replace(/\/+$/, "");
  global.GDNL_API_BASE = API_BASE_URL;
  global.API_BASE_URL = API_BASE_URL;

  const API_PREFIX_ALIASES = [
    ["/dashboard/summary", "/api/dashboard/summary"],
    ["/dashboard/kpi", "/api/dashboard/kpi"],
    ["/dashboard/recent-activity", "/api/dashboard/recent-activity"],
    ["/auth/login", "/api/auth/login"],
    ["/auth/logout", "/api/auth/logout"],
    ["/auth/me", "/api/auth/me"],
    ["/me", "/api/auth/me"],
    ["/logout", "/api/auth/logout"],
    ["/users", "/api/users"],
    ["/departments", "/api/departments"],
    ["/roles", "/api/roles"],
    ["/permissions", "/api/permissions"],
    ["/documents", "/api/documents"],
    ["/files/upload", "/api/files/upload"],
    ["/files", "/api/files"],
    ["/capas", "/api/capa"],
    ["/capa", "/api/capa"],
    ["/risks", "/api/risks"],
    ["/actions", "/api/actions"],
    ["/notifications", "/api/notifications"],
    ["/messages", "/api/messages"],
    ["/message-recipients", "/api/message-recipients"],
    ["/message-attachments", "/api/message-attachments"],
    ["/standards", "/api/standards"],
    ["/audits", "/api/audits"],
    ["/trainings", "/api/trainings"],
    ["/suppliers", "/api/suppliers"],
    ["/customers", "/api/customers"],
    ["/management-reviews", "/api/management-reviews"],
    ["/management-review", "/api/management-reviews"],
    ["/search", "/api/search"]
  ].sort((a, b) => b[0].length - a[0].length);

  function canonicalApiPath(path) {
    if (!path) return "/";
    const value = String(path);
    if (/^https?:\/\//i.test(value) || value.startsWith("/api/")) return value;
    if (/^\/file\/([^/?#]+)(.*)$/.test(value)) {
      return value.replace(/^\/file\/([^/?#]+)(.*)$/, "/api/files/$1/download$2");
    }
    for (const [from, to] of API_PREFIX_ALIASES) {
      if (value === from || value.startsWith(from + "/") || value.startsWith(from + "?")) {
        return to + value.slice(from.length);
      }
    }
    return value;
  }

  function normalizeEndpoint(path) {
    if (!path) return "/";
    const value = String(path);
    if (/^https?:\/\//i.test(value)) return value;
    return API_BASE_URL + (value.startsWith("/") ? value : "/" + value);
  }

  function currentPageName() {
    return (global.location?.pathname || "").split("/").pop() || "index.html";
  }

  function isLoginPage() {
    return currentPageName() === "index.html";
  }

  function resolveLocalRoute(route) {
    return global.GDNL_ROUTES?.resolveRoute?.(route) || route;
  }

  function redirectToLogin(reason) {
    if (isLoginPage()) return;
    let target = resolveLocalRoute("index.html");
    try {
      const url = new URL(target, global.location.href);
      if (reason) url.searchParams.set("auth", reason);
      target = url.pathname.split("/").pop() + url.search;
    } catch (error) {
      target = reason ? "index.html?auth=" + encodeURIComponent(reason) : "index.html";
    }
    if (global.location.href.endsWith(target)) return;
    global.location.replace(target);
  }

  function getToken() {
    try {
      return sessionStorage.getItem(TOKEN_KEY) || "";
    } catch (error) {
      return "";
    }
  }

  function setToken(token) {
    try {
      if (token) sessionStorage.setItem(TOKEN_KEY, token);
      else sessionStorage.removeItem(TOKEN_KEY);
    } catch (error) {}
  }

  const UI_STORAGE_PREFIXES = [
    "gdnl_ui_",
    "gdnl_filter_",
    "gdnl_search_",
    "gdnl_selected_",
    "gdnl_global_search",
    "gdnl_apqp_draft",
    "gdnl_apqp_approval_index",
    "gdnl_apqp_gate_status",
    "gdnl_apqp_task_status",
    "gdnl_apqp_ppap_status",
    "gdnl_apqp_leader_person",
    "gdnl_apqp_preparedBy_person",
    "gdnl_ppap_from_apqp",
    "gdnl_capa_revision_reason"
  ];

  function isUiStorageKey(key) {
    return UI_STORAGE_PREFIXES.some((prefix) => String(key || "").startsWith(prefix));
  }

  function cacheRead(key, fallback) {
    if (!isUiStorageKey(key)) return fallback;
    try {
      const raw = sessionStorage.getItem(key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (error) {
      return fallback;
    }
  }

  function cacheWrite(key, value) {
    if (!isUiStorageKey(key)) return;
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  const legacyStorage = {
    getItem(key) {
      if (!isUiStorageKey(key)) return null;
      try {
        return sessionStorage.getItem(key);
      } catch (error) {
        return null;
      }
    },
    setItem(key, value) {
      if (!isUiStorageKey(key)) return;
      try {
        sessionStorage.setItem(key, value);
      } catch (error) {}
    },
    removeItem(key) {
      try {
        sessionStorage.removeItem(key);
      } catch (error) {}
    }
  };

  function normalizeUser(user) {
    const source = user || {};
    return {
      id: source.id || source.user_id || source.uid || "",
      username: source.username || "",
      fullname: source.fullname || source.fullName || source.full_name || source.name || "",
      name: source.fullname || source.fullName || source.full_name || source.name || source.username || "",
      email: source.email || "",
      phone: source.phone || source.phone_number || source.telefon || source.mobile || source.gsm || "",
      role: source.role || source.role_name || "",
      department: source.department || source.department_name || ""
    };
  }

  function responseData(payload) {
    if (payload && typeof payload === "object" && Object.prototype.hasOwnProperty.call(payload, "data")) {
      return payload.data;
    }
    return payload;
  }

  function asArray(payload) {
    const data = responseData(payload);
    if (Array.isArray(data)) return data;
    if (!data || typeof data !== "object") return [];
    for (const key of ["items", "rows", "results", "records", "list", "data"]) {
      if (Array.isArray(data[key])) return data[key];
    }
    for (const value of Object.values(data)) {
      if (Array.isArray(value)) return value;
    }
    return [];
  }

  function cleanErrorMessage(message, fallback) {
    const safeFallback = fallback || "Sistem işlemi tamamlanamadı. Lütfen tekrar deneyin.";
    const value = String(message || "").trim();
    if (!value) return safeFallback;
    if (/sql|stack|trace|json|syntaxerror|typeerror|referenceerror|api|endpoint|worker|d1|r2|http\s*\d|cloudflare/i.test(value)) {
      return safeFallback;
    }
    return value;
  }

  function standardError(status, payload, fallback) {
    const source = payload && typeof payload === "object" ? payload : {};
    const error = source.error && typeof source.error === "object" ? source.error : {};
    const rawMessage = error.message || source.message || source.error || fallback || "Sistem işlemi tamamlanamadı";
    const message = cleanErrorMessage(rawMessage, fallback);
    const err = new Error(message);
    err.status = status;
    err.code = error.code || source.code || ("HTTP_" + status);
    err.payload = payload;
    return err;
  }

  async function request(path, options) {
    const config = options || {};
    const headers = Object.assign({ "Accept": "application/json" }, config.headers || {});
    const token = config.token || getToken();
    let body = config.body;

    if (token) headers.Authorization = "Bearer " + token;
    if (body && !(body instanceof FormData) && typeof body !== "string") {
      headers["Content-Type"] = headers["Content-Type"] || "application/json";
      body = JSON.stringify(body);
    }

    const init = Object.assign({}, config, {
      method: config.method || "GET",
      headers,
      body,
      credentials: "include",
      cache: "no-store"
    });

    delete init.token;
    delete init.raw;

    const canonicalPath = canonicalApiPath(path);
    const legacyPath = String(path || "/");
    let res;
    try {
      res = await fetch(normalizeEndpoint(canonicalPath), init);
      if (res.status === 404 && canonicalPath !== legacyPath && config.fallbackOnNotFound !== false) {
        res = await fetch(normalizeEndpoint(legacyPath), init);
      }
    } catch (error) {
      throw standardError(0, null, "Ağ bağlantısı kurulamadı");
    }

    const text = await res.text();
    let payload = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch (error) {
      payload = text ? { raw: text } : null;
    }

    if (res.status === 401 && config.redirectOnUnauthorized !== false) {
      setToken("");
      redirectToLogin("expired");
    }

    if (!res.ok || payload?.success === false) {
      throw standardError(res.status, payload, "Sistem yanıtı tamamlanamadı");
    }

    return payload;
  }

  const get = (path, options) => request(path, Object.assign({}, options, { method: "GET" }));
  const post = (path, body, options) => request(path, Object.assign({}, options, { method: "POST", body }));
  const put = (path, body, options) => request(path, Object.assign({}, options, { method: "PUT", body }));
  const del = (path, options) => request(path, Object.assign({}, options, { method: "DELETE" }));

  async function me(options) {
    try {
      return responseData(await get("/api/auth/me", options));
    } catch (error) {
      if (error.status === 404) return responseData(await get("/me", options));
      throw error;
    }
  }

  async function guard(options) {
    const user = await me(options);
    global.GDNL_CURRENT_USER = normalizeUser(user);
    applyCurrentUser(global.GDNL_CURRENT_USER);
    return global.GDNL_CURRENT_USER;
  }

  function applyCurrentUser(user) {
    const current = normalizeUser(user);
    global.GDNL_CURRENT_USER = current;
    const nameTargets = ["userName", "topUserName", "superAdminName"];
    const roleTargets = ["userRole"];
    const departmentTargets = ["activeDepartment", "currentDepartment", "userDepartment"];
    nameTargets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = current.fullname || current.name || current.username || current.email || USER_NAME_PENDING;
    });
    roleTargets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = current.role || "";
    });
    departmentTargets.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.textContent = current.department || "";
    });
  }

  function routeHref(path) {
    const target = resolveLocalRoute(path);
    if (global.location?.protocol === "file:" && String(target).startsWith("/")) {
      return String(target).slice(1);
    }
    try {
      return new URL(target, global.location.href).href;
    } catch (error) {
      return target;
    }
  }

  function injectChromeStyles() {
    if (document.getElementById("gdnlGlobalChromeStyles")) return;
    const style = document.createElement("style");
    style.id = "gdnlGlobalChromeStyles";
    style.textContent = `
.topbar{min-height:72px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;border-radius:22px!important;background:rgba(255,255,255,.94)!important;border:1px solid #dfe9f5!important;box-shadow:0 18px 46px rgba(7,27,52,.08)!important;overflow:visible!important}
.topbar-actions,.gdnl-global-actions-host{display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:12px!important;flex-wrap:wrap!important}
.topbar input[type="search"],.topbar input.search,.topbar .search,.topbar #globalSearch,.topbar #suiteSearch{height:44px!important;min-height:44px!important;width:280px!important;max-width:100%!important;border-radius:14px!important;font-size:13px!important}
.topbar button.search-btn,.topbar #searchBtn{height:44px!important;border-radius:14px!important;font-size:13px!important}
.gdnl-global-action{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;height:44px!important;min-height:44px!important;padding:0 14px!important;border:1px solid rgba(216,228,239,.95)!important;border-radius:14px!important;background:rgba(255,255,255,.94)!important;color:#0f1b2f!important;text-decoration:none!important;font-weight:900!important;font-size:13px!important;line-height:1!important;box-shadow:0 12px 28px rgba(7,27,52,.07)!important;cursor:pointer!important;white-space:nowrap!important;transition:.18s ease!important}
.gdnl-global-action:hover{transform:translateY(-1px)!important;border-color:#b9d8c5!important;box-shadow:0 16px 32px rgba(7,27,52,.11)!important}
.gdnl-global-action.primary{background:linear-gradient(135deg,#0ea5e9 0%,#22c55e 100%)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 14px 30px rgba(34,197,94,.22)!important}
.gdnl-global-icon{width:44px!important;min-width:44px!important;height:44px!important;padding:0!important;font-size:18px!important}
.gdnl-message-link{position:relative!important}
.gdnl-mail-unread-badge{position:absolute!important;right:-5px!important;top:-6px!important;min-width:18px!important;height:18px!important;padding:0 5px!important;border-radius:999px!important;background:#ef4444!important;color:#fff!important;border:2px solid #fff!important;display:none!important;align-items:center!important;justify-content:center!important;font-size:10px!important;font-weight:950!important;line-height:1!important;box-shadow:0 8px 18px rgba(239,68,68,.32)!important;pointer-events:none!important}
.gdnl-mail-unread-badge.is-visible{display:inline-flex!important}
.gdnl-global-user{display:inline-flex!important;align-items:center!important;gap:8px!important;height:44px!important;min-height:44px!important;border:1px solid #d8e4ef!important;border-radius:14px!important;background:linear-gradient(135deg,rgba(239,246,255,.96),rgba(248,251,255,.96))!important;padding:0 14px!important;font-weight:900!important;font-size:13px!important;color:#0f1b2f!important;white-space:nowrap!important;order:40!important}
.gdnl-global-logout{background:#fff5f5!important;color:#b42318!important;border-color:#ffd5d5!important;order:50!important}
.gdnl-global-search{min-width:56px!important;order:5!important}.gdnl-department-home{order:10!important}.gdnl-message-link{order:20!important}.gdnl-notification-link{order:30!important}
@media(max-width:850px){.topbar{align-items:flex-start!important;flex-wrap:wrap!important}.topbar-actions,.gdnl-global-actions-host{width:100%!important;justify-content:flex-start!important;gap:8px!important}.topbar input[type="search"],.topbar input.search,.topbar .search,.topbar #globalSearch,.topbar #suiteSearch{width:100%!important}.gdnl-global-action{height:40px!important;min-height:40px!important;padding:0 10px!important;font-size:12px!important}.gdnl-global-icon{width:40px!important;min-width:40px!important;height:40px!important}.gdnl-global-user{height:40px!important;min-height:40px!important;max-width:100%;white-space:normal!important}}`;
    document.head.appendChild(style);
  }

  function ensureAction(container, selector, html, configure) {
    const existing = container.querySelector(selector);
    if (existing) {
      configure(existing);
      return existing;
    }
    const wrapper = document.createElement("span");
    wrapper.innerHTML = html.trim();
    const node = wrapper.firstElementChild;
    container.appendChild(node);
    configure(node);
    return node;
  }

  function ensureMailUnreadBadge(link) {
    if (!link) return null;
    let badge = link.querySelector(".gdnl-mail-unread-badge");
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "gdnl-mail-unread-badge";
      badge.setAttribute("aria-hidden", "true");
      link.appendChild(badge);
    }
    return badge;
  }

  function applyMailUnreadCount(count) {
    const value = Number(count || 0);
    const links = Array.from(document.querySelectorAll('.gdnl-message-link,a[href="mailbox.html"],a[href$="/mailbox.html"]'));
    links.forEach((link) => {
      link.classList.add("gdnl-message-link");
      const badge = ensureMailUnreadBadge(link);
      if (!badge) return;
      if (value > 0) {
        badge.textContent = value > 99 ? "99+" : String(value);
        badge.classList.add("is-visible");
      } else {
        badge.textContent = "";
        badge.classList.remove("is-visible");
      }
    });
  }

  async function updateMailboxUnreadBadge() {
    if (isLoginPage()) return 0;
    try {
      const payload = await get("/messages/unread-count", { redirectOnUnauthorized: false, fallbackOnNotFound: false });
      const data = responseData(payload) || {};
      const count = Number(data.unread_count || data.count || 0);
      applyMailUnreadCount(count);
      return count;
    } catch (error) {
      applyMailUnreadCount(0);
      return 0;
    }
  }

  function startMailboxUnreadPolling() {
    if (isLoginPage() || global.__gdnlMailboxUnreadTimer) return;
    updateMailboxUnreadBadge();
    global.__gdnlMailboxUnreadTimer = global.setInterval(updateMailboxUnreadBadge, 60000);
  }

  function isRouteElement(el, filename) {
    if (!el) return false;
    const href = el.getAttribute?.("href") || "";
    const onclick = el.getAttribute?.("onclick") || "";
    return href === filename || href.endsWith("/" + filename) || onclick.includes(filename);
  }

  function firstAction(actionHost, filename, selector) {
    return actionHost.querySelector(selector) || Array.from(actionHost.querySelectorAll("a,button")).find((el) => isRouteElement(el, filename));
  }

  function removeDuplicateActions(actionHost, filename, keep) {
    Array.from(actionHost.querySelectorAll("a,button")).forEach((el) => {
      if (el !== keep && isRouteElement(el, filename)) el.remove();
    });
  }

  function removeDuplicateLogout(actionHost, keep) {
    Array.from(actionHost.querySelectorAll(".gdnl-global-logout,.logout,.logout-btn,.mobile-logout,.mobile-fixed-logout,button[onclick*='logout'],button[onclick*='Logout']")).forEach((el) => {
      if (el !== keep) el.remove();
    });
  }

  function ensureActionHost(bar) {
    let actionHost = bar.querySelector(".topbar-actions");
    if (!actionHost || actionHost.closest(".sidebar,.drawer")) {
      actionHost = document.createElement("div");
      actionHost.className = "topbar-actions";
      bar.appendChild(actionHost);
    }
    if (actionHost.querySelector(".topbar-actions")) {
      Array.from(actionHost.querySelectorAll(".topbar-actions")).forEach((nested) => {
        Array.from(nested.children).forEach((child) => actionHost.appendChild(child));
        nested.remove();
      });
    }
    return actionHost;
  }

  function orderActionHost(actionHost, items) {
    actionHost.classList.add("gdnl-global-actions-host");
    items.filter(Boolean).forEach((el) => {
      if (el.parentElement !== actionHost) actionHost.appendChild(el);
      else actionHost.appendChild(el);
    });
  }

  function enhanceTopbarLinks() {
    if (isLoginPage() || !document.body) return;
    injectChromeStyles();
    const bars = Array.from(document.querySelectorAll(".topbar, header.topbar, .header, header")).filter((bar) => !bar.closest(".sidebar,.drawer"));
    bars.forEach((bar) => {
      const actionHost = ensureActionHost(bar);
      let user = bar.querySelector("#userName, #topUserName, #superAdminName");
      let userHost = null;
      if (user) {
        const holder = user.closest(".user") || user.parentElement;
        if (holder) holder.classList.add("gdnl-global-user");
        userHost = holder || user;
      } else {
        userHost = document.createElement("div");
        userHost.className = "gdnl-global-user";
        userHost.innerHTML = '👤 <span id="userName">' + USER_NAME_PENDING + '</span>';
        actionHost.appendChild(userHost);
        user = userHost.querySelector("#userName");
      }
      const mailbox = ensureAction(actionHost, '.gdnl-message-link,a[href="mailbox.html"],a[href$="/mailbox.html"],button[aria-label*="Mesaj"],button[onclick*="mailbox.html"]', '<a class="gdnl-message-link" href="mailbox.html">📨</a>', (el) => {
        if (el.tagName === "A") el.href = routeHref("mailbox.html");
        else el.onclick = () => { global.location.href = routeHref("mailbox.html"); };
        el.classList.add("gdnl-message-link", "gdnl-global-action", "gdnl-global-icon");
        el.setAttribute("aria-label", "Mesaj Merkezi");
        el.textContent = "📨";
        ensureMailUnreadBadge(el);
      });
      const notify = ensureAction(actionHost, '.gdnl-notification-link,a[href="notification-center.html"],a[href$="/notification-center.html"],button[aria-label*="Bildirim"],button[onclick*="notification-center.html"]', '<a class="gdnl-notification-link" href="notification-center.html">🔔</a>', (el) => {
        if (el.tagName === "A") el.href = routeHref("notification-center.html");
        else el.onclick = () => { global.location.href = routeHref("notification-center.html"); };
        el.classList.add("gdnl-notification-link", "gdnl-global-action", "gdnl-global-icon");
        el.setAttribute("aria-label", "Bildirim Merkezi");
        el.textContent = "🔔";
      });
      if (!bar.querySelector('.gdnl-department-home,a[href="department-gateway.html"],a[href$="/department-gateway.html"],button[onclick*="department-gateway.html"]') && currentPageName() !== "department-gateway.html") {
        ensureAction(actionHost, ".gdnl-department-home", '<a class="gdnl-department-home" href="department-gateway.html">Departman Merkezi</a>', (el) => {
          el.href = routeHref("department-gateway.html");
          el.classList.add("gdnl-global-action", "primary");
          el.textContent = "Departman Merkezi";
        });
      } else {
        bar.querySelectorAll('.gdnl-department-home,a[href="department-gateway.html"],a[href$="/department-gateway.html"],button[onclick*="department-gateway.html"]').forEach((el) => {
          if (el.tagName === "A") el.href = routeHref("department-gateway.html");
          else el.onclick = () => { global.location.href = routeHref("department-gateway.html"); };
          el.classList.add("gdnl-department-home", "gdnl-global-action", "primary");
          el.textContent = el.textContent.includes("Dön") ? "Departman Merkezi" : "Departman Merkezi";
        });
      }
      const department = firstAction(actionHost, "department-gateway.html", ".gdnl-department-home");
      removeDuplicateActions(bar, "department-gateway.html", department);
      removeDuplicateActions(bar, "mailbox.html", mailbox);
      removeDuplicateActions(bar, "notification-center.html", notify);
      let logoutEl = actionHost.querySelector(".logout,.logout-btn,.mobile-logout,.mobile-fixed-logout,button[onclick*='logout'],button[onclick*='Logout']");
      if (!logoutEl) {
        logoutEl = document.createElement("button");
        logoutEl.type = "button";
        logoutEl.onclick = () => logout();
        actionHost.appendChild(logoutEl);
      }
      if (logoutEl) {
        logoutEl.classList.add("gdnl-global-action", "gdnl-global-logout");
        logoutEl.textContent = "Oturumu Kapat";
        removeDuplicateLogout(bar, logoutEl);
      }
      if (!bar.querySelector(".search-btn,#searchBtn,.gdnl-global-search") && currentPageName() !== "search.html") {
        ensureAction(actionHost, ".gdnl-global-search", '<a class="gdnl-global-search" href="search.html">Ara</a>', (el) => {
          el.href = routeHref("search.html");
          el.classList.add("gdnl-global-action");
        });
      }
      orderActionHost(actionHost, [department, mailbox, notify, userHost, logoutEl]);
      mailbox.title = "Mesaj Merkezi";
      notify.title = "Bildirim Merkezi";
    });
    updateMailboxUnreadBadge();
    startMailboxUnreadPolling();
  }

  async function logout() {
    try {
      await post("/api/auth/logout", {}, { redirectOnUnauthorized: false });
    } catch (error) {
      try {
        await post("/logout", {}, { redirectOnUnauthorized: false });
      } catch (inner) {}
    } finally {
      setToken("");
      const target = resolveLocalRoute("index.html");
      location.replace(target + (target.includes("?") ? "&" : "?") + "logout=1");
    }
  }

  async function upload(file, metadata) {
    const form = new FormData();
    form.append("file", file);
    Object.entries(metadata || {}).forEach(([key, value]) => form.append(key, value));
    return responseData(await request("/api/files/upload", { method: "POST", body: form }));
  }

  async function loadUsers(options) {
    const payload = await get("/users", options);
    return asArray(payload).map(normalizeUser);
  }

  async function loadDepartments(options) {
    const payload = await get("/departments", options);
    return asArray(payload).map((department) => ({
      id: department.id || department.department_id || "",
      department_name: department.department_name || department.name || department.department || "",
      status: department.status || ""
    })).filter((department) => department.department_name);
  }

  function fillUserSelect(selectElement, options) {
    const select = typeof selectElement === "string" ? document.getElementById(selectElement) : selectElement;
    if (!select) return [];
    const config = options || {};
    const users = (config.users || []).map(normalizeUser);
    const placeholder = config.placeholder || "Kişi seç";
    select.innerHTML = "";
    if (config.includeEmpty !== false) {
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = placeholder;
      select.appendChild(empty);
    }
    users.forEach((user) => {
      const option = document.createElement("option");
      option.value = user.id || user.username || user.fullname;
      option.textContent = user.fullname || user.username || "Kayıtlı kişi";
      option.dataset.userId = user.id;
      option.dataset.fullname = user.fullname;
      option.dataset.username = user.username;
      option.dataset.email = user.email;
      option.dataset.role = user.role;
      option.dataset.department = user.department;
      select.appendChild(option);
    });
    return users;
  }

  function fillDepartmentSelect(selectElement, options) {
    const select = typeof selectElement === "string" ? document.getElementById(selectElement) : selectElement;
    if (!select) return [];
    const config = options || {};
    const departments = config.departments || [];
    select.innerHTML = "";
    if (config.includeEmpty !== false) {
      const empty = document.createElement("option");
      empty.value = "";
      empty.textContent = config.placeholder || "Departman Seçiniz";
      select.appendChild(empty);
    }
    departments.forEach((department) => {
      const name = department.department_name || department.name || department.department || "";
      if (!name) return;
      const option = document.createElement("option");
      option.value = department.id || name;
      option.textContent = name;
      option.dataset.departmentId = department.id || "";
      option.dataset.departmentName = name;
      select.appendChild(option);
    });
    return departments;
  }

  function getSelectedUsers(containerOrSelect) {
    const root = typeof containerOrSelect === "string" ? document.getElementById(containerOrSelect) : containerOrSelect;
    if (!root) return [];
    if (root.tagName === "SELECT") {
      return Array.from(root.selectedOptions || []).filter((option) => option.value).map((option) => normalizeUser({
        id: option.dataset.userId || option.value,
        fullname: option.dataset.fullname || option.textContent,
        username: option.dataset.username || "",
        email: option.dataset.email || "",
        role: option.dataset.role || "",
        department: option.dataset.department || ""
      }));
    }
    const raw = root.dataset?.users || root.dataset?.selectedUsers || "";
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed.map(normalizeUser) : [];
      } catch (error) {}
    }
    return Array.from(root.querySelectorAll("[data-user-id], .user-chip, .multi-user-chip")).map((el) => normalizeUser({
      id: el.dataset.userId || "",
      fullname: el.dataset.fullname || el.textContent || "",
      username: el.dataset.username || "",
      email: el.dataset.email || "",
      role: el.dataset.role || "",
      department: el.dataset.department || ""
    })).filter((user) => user.id || user.fullname || user.username);
  }

  function renderSelectedUserChips(users) {
    return (users || []).map(normalizeUser).map((user) => (
      `<span class="user-chip" data-user-id="${String(user.id).replaceAll('"', "&quot;")}" data-fullname="${String(user.fullname).replaceAll('"', "&quot;")}" data-username="${String(user.username).replaceAll('"', "&quot;")}" data-email="${String(user.email).replaceAll('"', "&quot;")}" data-phone="${String(user.phone).replaceAll('"', "&quot;")}" data-role="${String(user.role).replaceAll('"', "&quot;")}" data-department="${String(user.department).replaceAll('"', "&quot;")}">${user.fullname || user.username || "Kayıtlı kişi"}</span>`
    )).join("");
  }

  function renderDepartmentChips(departments) {
    return (departments || []).map((department) => {
      const name = department.department_name || department.name || department.department || "";
      return name ? `<span class="department-chip" data-department-id="${String(department.id || "").replaceAll('"', "&quot;")}" data-department-name="${String(name).replaceAll('"', "&quot;")}">${name}</span>` : "";
    }).join("");
  }

  function showToast(message, options) {
    const config = options || {};
    let toast = document.getElementById(config.id || "toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = config.id || "toast";
      toast.style.cssText = "position:fixed;right:18px;bottom:18px;z-index:9999;background:#071b34;color:#fff;border-radius:14px;padding:12px 14px;font:800 13px system-ui;box-shadow:0 18px 40px rgba(7,27,52,.22);display:none";
      document.body.appendChild(toast);
    }
    toast.textContent = message || "İşlem tamamlandı";
    toast.style.display = "block";
    clearTimeout(toast.__gdnlTimer);
    toast.__gdnlTimer = setTimeout(() => {
      toast.style.display = "none";
    }, config.duration || 2600);
  }

  function showConfirm(message) {
    return Promise.resolve(global.confirm(message || "Bu işlem kayıt durumu, bağlantılı dosyalar ve denetim izini etkileyebilir. Devam edilsin mi?"));
  }

  function setLoading(target, isLoading, text) {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (!el) return;
    el.dataset.loading = isLoading ? "true" : "false";
    if (isLoading && text) el.textContent = text;
  }

  function setEmpty(target, text) {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (el) el.textContent = text || "Bu alan için henüz kayıt oluşturulmadı";
  }

  function setError(target, error) {
    const el = typeof target === "string" ? document.getElementById(target) : target;
    if (el) el.textContent = friendlyErrorMessage(error);
  }

  function friendlyErrorMessage(error) {
    if (error?.status === 401) return "Oturum süresi doldu. Lütfen tekrar giriş yapın.";
    if (error?.status === 403) return "Bu işlem için yetkiniz bulunmuyor.";
    if (error?.status === 404) return "İstenen kayıt bulunamadı.";
    if (error?.status === 0) return "Sunucuya ulaşılamıyor. Bağlantınızı kontrol edin.";
    return "İşlem tamamlanamadı. Lütfen tekrar deneyin.";
  }

  function isDeleteAction(action) {
    if (!action || action.closest("[data-gdnl-confirm-scope='off']")) return false;
    const text = (action.textContent || "").toLocaleLowerCase("tr-TR");
    const aria = (action.getAttribute("aria-label") || "").toLocaleLowerCase("tr-TR");
    const cls = String(action.className || "").toLocaleLowerCase("tr-TR");
    const dataAction = (action.dataset.action || action.dataset.operation || "").toLocaleLowerCase("tr-TR");
    const onclick = (action.getAttribute("onclick") || "").toLocaleLowerCase("tr-TR");
    const haystack = [text, aria, cls, dataAction, onclick].join(" ");
    return /\b(delete|remove|trash|sil|kaldır|arşivle|arsivle)\b/.test(haystack);
  }

  function installDeleteConfirmations() {
    if (global.__gdnlDeleteConfirmInstalled) return;
    global.__gdnlDeleteConfirmInstalled = true;
    document.addEventListener("click", (event) => {
      const action = event.target?.closest?.("button,a,[role='button']");
      if (!action || action.dataset.gdnlConfirmSkip === "true" || action.dataset.gdnlConfirmed === "true") {
        if (action) action.dataset.gdnlConfirmed = "";
        return;
      }
      if (!isDeleteAction(action)) return;
      const inline = action.getAttribute("onclick") || "";
      if (/confirm\s*\(|permanentDelete\s*\(/i.test(inline)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      showConfirm().then((approved) => {
        if (!approved) return;
        action.dataset.gdnlConfirmed = "true";
        action.click();
      });
    }, true);
  }

  global.GDNL_API = {
    baseUrl: API_BASE_URL,
    request,
    get,
    post,
    put,
    delete: del,
    del,
    me,
    guard,
    logout,
    upload,
    uploadToR2: upload,
    loadUsers,
    loadDepartments,
    fillUserSelect,
    fillDepartmentSelect,
    getSelectedUsers,
    renderSelectedUserChips,
    renderUserChips: renderSelectedUserChips,
    renderDepartmentChips,
    showToast,
    showConfirm,
    friendlyErrorMessage,
    enhanceTopbarLinks,
    updateMailboxUnreadBadge,
    asArray,
    responseData,
    getToken,
    setToken,
    normalizeUser,
    applyCurrentUser,
    cacheRead,
    cacheWrite,
    isUiStorageKey,
    canonicalApiPath,
    legacyStorage,
    installDeleteConfirmations,
    ui: { setLoading, setEmpty, setError }
  };

  global.GDNL_LEGACY_STORAGE = legacyStorage;

  if (!isLoginPage()) {
    const applyFallback = () => {
      applyCurrentUser(global.GDNL_CURRENT_USER || {});
      installDeleteConfirmations();
      enhanceTopbarLinks();
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyFallback, { once: true });
    } else {
      applyFallback();
    }
    guard({ redirectOnUnauthorized: true }).then(enhanceTopbarLinks).catch(applyFallback);
  }
})(window);
