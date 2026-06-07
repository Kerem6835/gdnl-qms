;(function (global) {
  "use strict";

  const api = global.GDNL_API || {};
  const MIN_QUERY_LENGTH = 2;
  const SCAN_DELAYS = [0, 250, 900, 1800];
  const FIELD_KEYWORDS = [
    "sorumlu", "responsible", "owner", "assignee", "atanan", "lider", "leader",
    "onaylayan", "approver", "onayci", "onaycı", "approving", "hazirlayan",
    "hazırlayan", "prepared", "kontrol eden", "reviewer", "denetci", "denetçi",
    "auditor", "personel", "employee", "kullanici", "kullanıcı", "user", "ekip",
    "team", "uye", "üye", "member", "gorevli", "görevli", "accountable",
    "document owner", "dokuman sahibi", "doküman sahibi", "capa sorumlusu",
    "risk sorumlusu", "aksiyon sorumlusu", "egitim sorumlusu", "eğitim sorumlusu",
    "katilimci", "katılımcı", "participant", "dağıtım kişisi", "dagitim kisisi",
    "kisi", "kişi", "egitmen", "eğitmen", "trainer"
  ];
  const MULTI_KEYWORDS = [
    "ekip", "team", "üye", "uye", "member", "katılımcı", "katilimci",
    "participant", "participants", "dağıtım listesi", "dagitim listesi",
    "distribution", "onaycılar", "onaycilar", "approvers", "sorumlular",
    "responsibles", "aksiyon sorumluları", "denetim ekibi", "apqp ekibi",
    "ppap ekibi", "eğitim katılımcıları", "egitim katilimcilari"
  ];
  const EXCLUDED_IDS = [
    "globalSearch", "suiteSearch", "searchBox", "q", "quickSearch", "moduleSearch"
  ];

  let styleReady = false;
  let observerReady = false;
  let userCache = [];
  const queryCache = new Map();

  function normalizeText(value) {
    return String(value || "")
      .toLocaleLowerCase("tr-TR")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function normalizeUser(user) {
    if (api.normalizeUser) return api.normalizeUser(user || {});
    const source = user || {};
    return {
      id: source.id || source.user_id || source.uid || "",
      fullname: source.fullname || source.fullName || source.name || source.username || "",
      username: source.username || "",
      email: source.email || source.mail || "",
      role: source.role || source.role_name || source.title || "",
      department: source.department || source.department_name || source.departmentName || "",
      status: source.status || ""
    };
  }

  function isActiveUser(user) {
    const status = normalizeText(user.status || "Aktif");
    return !/(pasif|passive|inactive|disabled|archived|deleted|silindi|arsiv|arşiv)/.test(status);
  }

  function asArray(payload) {
    if (api.asArray) return api.asArray(payload);
    const data = api.responseData ? api.responseData(payload) : payload;
    if (Array.isArray(data)) return data;
    return data?.users || data?.data || data?.records || data?.results || [];
  }

  function apiBaseUrl() {
    return String(global.GDNL_API_BASE || global.API_BASE_URL || "https://api.gdnldigital.com").replace(/\/+$/, "");
  }

  async function requestUsers(endpoint) {
    if (api.get) {
      return api.get(endpoint, { redirectOnUnauthorized: false, fallbackOnNotFound: false });
    }
    const response = await fetch(apiBaseUrl() + endpoint, {
      credentials: "include",
      headers: { "Accept": "application/json" }
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error?.message || payload?.message || `HTTP ${response.status}`);
    return payload;
  }

  async function fetchUsers(query) {
    const q = String(query || "").trim();
    const key = q.toLocaleLowerCase("tr-TR");
    if (queryCache.has(key)) return queryCache.get(key);
    try {
      const endpoint = "/users" + (q ? "?q=" + encodeURIComponent(q) : "");
      const payload = await requestUsers(endpoint);
      const users = asArray(payload).map(normalizeUser).filter((user) => (user.id || user.fullname || user.username) && isActiveUser(user));
      if (!q) userCache = users;
      queryCache.set(key, users);
      return users;
    } catch (error) {
      return q ? userCache.filter((user) => userSearchText(user).includes(normalizeText(q))).slice(0, 12) : userCache;
    }
  }

  function userSearchText(user) {
    return normalizeText([user.fullname, user.username, user.email, user.role, user.department].join(" "));
  }

  function installStyle() {
    if (styleReady || document.getElementById("gdnl-user-autocomplete-style")) return;
    styleReady = true;
    const style = document.createElement("style");
    style.id = "gdnl-user-autocomplete-style";
    style.textContent = `
.gdnl-user-autocomplete-wrap{position:relative;width:100%}
.gdnl-user-autocomplete-list{display:none;position:absolute;left:0;right:0;top:calc(100% + 7px);z-index:9998;background:rgba(255,255,255,.98);border:1px solid #d8e4ef;border-radius:14px;box-shadow:0 18px 45px rgba(7,27,52,.16);max-height:260px;overflow:auto;padding:5px}
.gdnl-user-autocomplete-list.is-open{display:block}
.gdnl-user-autocomplete-item{width:100%;border:none;background:#fff;text-align:left;padding:10px 12px;border-radius:11px;cursor:pointer;color:#0f1b2f;font:850 12px/1.35 Inter,Arial,sans-serif}
.gdnl-user-autocomplete-item:hover,.gdnl-user-autocomplete-item:focus{outline:none;background:#eefaf2;color:#1f7d3d}
.gdnl-user-autocomplete-item small{display:block;margin-top:3px;color:#64748b;font-weight:800}
.gdnl-user-autocomplete-empty{padding:10px 12px;color:#64748b;font:850 12px Inter,Arial,sans-serif}
.gdnl-user-chip-list{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px}
.gdnl-user-chip{display:inline-flex;align-items:center;gap:7px;border-radius:999px;background:#e8f7ee;color:#1f7d3d;border:1px solid #bfe7ca;padding:6px 9px;font:950 12px Inter,Arial,sans-serif}
.gdnl-user-chip button{border:none;background:transparent;color:#991b1b;font-weight:950;cursor:pointer;padding:0;line-height:1}
@media(max-width:640px){.gdnl-user-autocomplete-list{max-height:220px}.gdnl-user-chip{font-size:11px}}
`;
    document.head.appendChild(style);
  }

  function fieldText(input) {
    const label = input.id ? document.querySelector(`label[for="${CSS.escape(input.id)}"]`) : null;
    const closestLabel = input.closest("label");
    const fieldLabel = input.closest(".field,.form-group,.input-group,.cloud-autocomplete,.autocomplete-box")?.querySelector("label");
    return normalizeText([
      label?.textContent,
      closestLabel?.textContent,
      fieldLabel?.textContent,
      input.placeholder,
      input.name,
      input.id,
      input.className,
      input.dataset.userAutocomplete
    ].join(" "));
  }

  function isCandidate(input) {
    if (!input || input.dataset.gdnlUserAutocomplete === "1") return false;
    if (input.closest(".topbar,.sidebar,.mobile-drawer,.search-results,.gdnl-user-autocomplete-list")) return false;
    if (EXCLUDED_IDS.includes(input.id) || EXCLUDED_IDS.includes(input.name)) return false;
    if (input.tagName === "INPUT" && input.type && !["text", "search", "email", ""].includes(input.type)) return false;
    if (input.readOnly || input.disabled) return false;
    const text = fieldText(input);
    if (!text || /global search|genel arama|ara\\.\\.\\.|arama|searchbox|suite search/.test(text)) return false;
    return FIELD_KEYWORDS.some((keyword) => text.includes(normalizeText(keyword)));
  }

  function isMultiField(input) {
    if (input.dataset.userAutocompleteMulti === "true" || input.multiple) return true;
    const text = fieldText(input);
    return MULTI_KEYWORDS.some((keyword) => text.includes(normalizeText(keyword)));
  }

  function userToPayload(user) {
    const normalized = normalizeUser(user);
    return {
      id: normalized.id || "",
      fullname: normalized.fullname || normalized.username || "Kullanıcı",
      username: normalized.username || "",
      email: normalized.email || "",
      role: normalized.role || "",
      department: normalized.department || "",
      status: normalized.status || ""
    };
  }

  function ensureWrap(input) {
    let wrap = input.closest(".gdnl-user-autocomplete-wrap");
    if (wrap) return wrap;
    wrap = document.createElement("div");
    wrap.className = "gdnl-user-autocomplete-wrap";
    input.parentNode.insertBefore(wrap, input);
    wrap.appendChild(input);
    return wrap;
  }

  function ensureHidden(input) {
    const id = (input.id || input.name || "user") + "_selected_users";
    let hidden = document.getElementById(id);
    if (!hidden) {
      hidden = document.createElement("input");
      hidden.type = "hidden";
      hidden.id = id;
      hidden.name = id;
      input.insertAdjacentElement("afterend", hidden);
    }
    return hidden;
  }

  function setKnownHiddenFields(input, user) {
    const base = input.id || input.name || "";
    if (!base) return;
    const bases = Array.from(new Set([
      base,
      base.replace(/(Search|Input|Picker|Name)$/i, "")
    ].filter(Boolean)));
    bases.forEach((candidate) => {
      const direct = document.getElementById(candidate);
      if (direct && direct !== input && "value" in direct && (direct.type === "hidden" || direct.dataset.userAutocompleteTarget === "fullname")) {
        direct.value = user.fullname || "";
      }
    });
    const pairs = [
      ["id", user.id],
      ["user_id", user.id],
      ["email", user.email],
      ["department", user.department],
      ["role", user.role]
    ];
    pairs.forEach(([suffix, value]) => {
      const ids = bases.flatMap((candidate) => {
        const camel = `${candidate}${suffix.charAt(0).toUpperCase()}${suffix.slice(1)}`;
        return suffix === "id"
          ? [`${candidate}_id`, camel, `${candidate}Id`]
          : [`${candidate}_${suffix}`, camel];
      });
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el !== input && "value" in el) el.value = value || "";
      });
    });
  }

  function fillNearbyDepartment(input, user) {
    if (!user.department) return;
    const scope = input.closest("form,.panel,.card,.section,.grid,.form") || document;
    const candidates = Array.from(scope.querySelectorAll("input,select")).filter((el) => {
      if (el === input) return false;
      const text = normalizeText([el.id, el.name, el.placeholder, el.closest(".field")?.querySelector("label")?.textContent].join(" "));
      return text.includes("departman") || text.includes("department");
    });
    const target = candidates[0];
    if (!target) return;
    if (target.tagName === "SELECT") {
      const option = Array.from(target.options || []).find((item) => normalizeText(item.textContent) === normalizeText(user.department) || normalizeText(item.value) === normalizeText(user.department));
      if (option) target.value = option.value;
    } else {
      target.value = user.department;
    }
    target.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setInputUser(input, users, multi) {
    const selected = users.map(userToPayload);
    input.dataset.selectedUsers = JSON.stringify(selected);
    input.dataset.users = JSON.stringify(selected);
    if (selected[0]) {
      input.dataset.userId = selected[0].id;
      input.dataset.userEmail = selected[0].email;
      input.dataset.userDepartment = selected[0].department;
      input.dataset.userRole = selected[0].role;
      input.dataset.fullname = selected[0].fullname;
      input.dataset.email = selected[0].email;
      input.dataset.department = selected[0].department;
      input.dataset.role = selected[0].role;
    }
    const hidden = ensureHidden(input);
    hidden.value = JSON.stringify(multi ? selected : (selected[0] || null));
    setKnownHiddenFields(input, selected[0] || {});
    if (selected[0]) fillNearbyDepartment(input, selected[0]);
    input.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function renderChips(input, chipBox, selected) {
    chipBox.innerHTML = selected.map((user, index) => (
      `<span class="gdnl-user-chip" data-user-id="${escapeHtml(user.id)}" data-fullname="${escapeHtml(user.fullname)}" data-email="${escapeHtml(user.email)}" data-role="${escapeHtml(user.role)}" data-department="${escapeHtml(user.department)}">${escapeHtml(user.fullname)}<button type="button" aria-label="Kaldır" data-remove-index="${index}">×</button></span>`
    )).join("");
    chipBox.querySelectorAll("[data-remove-index]").forEach((button) => {
      button.addEventListener("click", () => {
        selected.splice(Number(button.dataset.removeIndex), 1);
        setInputUser(input, selected, true);
        renderChips(input, chipBox, selected);
      });
    });
  }

  function attach(input, options) {
    if (!input || input.dataset.gdnlUserAutocomplete === "1") return;
    installStyle();
    input.dataset.gdnlUserAutocomplete = "1";
    input.setAttribute("autocomplete", "off");
    const multi = options?.multi ?? isMultiField(input);
    input.dataset.userAutocompleteMulti = multi ? "true" : "false";
    const wrap = ensureWrap(input);
    const list = document.createElement("div");
    list.className = "gdnl-user-autocomplete-list";
    wrap.appendChild(list);
    const chips = document.createElement("div");
    chips.className = "gdnl-user-chip-list";
    if (multi) wrap.appendChild(chips);
    const selected = [];
    let timer = 0;

    function closeList() {
      list.classList.remove("is-open");
    }

    function renderList(users, query) {
      if (!query || query.length < MIN_QUERY_LENGTH) {
        list.innerHTML = "";
        closeList();
        return;
      }
      if (!users.length) {
        list.innerHTML = '<div class="gdnl-user-autocomplete-empty">Kullanıcı bulunamadı.</div>';
        list.classList.add("is-open");
        return;
      }
      list.innerHTML = users.slice(0, 12).map((user, index) => {
        const name = user.fullname || user.username || "Kullanıcı";
        const detail = [user.department, user.role].filter(Boolean).join(" — ");
        return `<button class="gdnl-user-autocomplete-item" type="button" data-index="${index}">${escapeHtml(name)}<small>${escapeHtml(detail || user.email || "-")}</small></button>`;
      }).join("");
      list.classList.add("is-open");
      list.querySelectorAll("[data-index]").forEach((button) => {
        button.addEventListener("click", () => {
          const user = userToPayload(users[Number(button.dataset.index)]);
          if (multi) {
            if (!selected.some((item) => String(item.id || item.fullname) === String(user.id || user.fullname))) selected.push(user);
            input.value = selected.map((item) => item.fullname).join(", ");
            setInputUser(input, selected, true);
            renderChips(input, chips, selected);
          } else {
            selected.splice(0, selected.length, user);
            input.value = user.fullname;
            setInputUser(input, selected, false);
          }
          closeList();
        });
      });
    }

    input.addEventListener("input", () => {
      clearTimeout(timer);
      const query = input.value.trim();
      timer = setTimeout(async () => {
        if (query.length < MIN_QUERY_LENGTH) {
          renderList([], query);
          return;
        }
        const users = await fetchUsers(query);
        renderList(users.filter((user) => userSearchText(user).includes(normalizeText(query))), query);
      }, 220);
    });

    input.addEventListener("focus", () => {
      const query = input.value.trim();
      if (query.length >= MIN_QUERY_LENGTH) input.dispatchEvent(new Event("input", { bubbles: true }));
    });

    document.addEventListener("click", (event) => {
      if (!wrap.contains(event.target)) closeList();
    });
  }

  function scan(root) {
    const scope = root && root.querySelectorAll ? root : document;
    scope.querySelectorAll("input,textarea").forEach((input) => {
      if (isCandidate(input)) attach(input);
    });
  }

  function collectSelectedUsers(container) {
    const root = typeof container === "string" ? document.querySelector(container) : (container || document);
    return Array.from(root.querySelectorAll("[data-selected-users],[data-user-id]")).flatMap((el) => {
      if (el.dataset.selectedUsers) {
        try {
          const parsed = JSON.parse(el.dataset.selectedUsers);
          return Array.isArray(parsed) ? parsed : (parsed ? [parsed] : []);
        } catch (error) {
          return [];
        }
      }
      return [userToPayload(el.dataset)];
    }).filter((user) => user.id || user.fullname);
  }

  function init() {
    scan(document);
    SCAN_DELAYS.forEach((delay) => global.setTimeout(() => scan(document), delay));
    if (!observerReady && "MutationObserver" in global) {
      observerReady = true;
      new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) scan(node);
          });
        });
      }).observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  global.GDNLUserAutocomplete = {
    init,
    scan,
    attach,
    fetchUsers,
    collectSelectedUsers
  };
  global.GDNLCollectSelectedUsers = collectSelectedUsers;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window);
