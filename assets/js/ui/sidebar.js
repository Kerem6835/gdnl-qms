;(function (global) {
  "use strict";

  const menu = Object.freeze([
    {
      id: "home",
      label: "YÖNETİM PANELİ",
      icon: "📊",
      route: "dashboard.html",
      items: [
        { label: "Kalite Yönetim Paneli", route: "dashboard.html" },
        { label: "KPI ve Raporlar", route: "kpi-reports.html" },
        { label: "Aktivite Merkezi", route: "activity-center.html" },
        { label: "Bildirim Merkezi", route: "notification-center.html" }
      ]
    },
    {
      id: "documents",
      label: "DOKÜMAN KONTROLÜ",
      icon: "📚",
      items: [
        { label: "Doküman Yönetimi", route: "documents.html" },
        { label: "Yeni Doküman", route: "new-document.html" },
        { label: "Revizyon Yönetimi", route: "revision.html" },
        { label: "Onay Yönetimi", route: "approval.html" },
        { label: "Dağıtım Yönetimi", route: "distribution.html" },
        { label: "Arşiv Yönetimi", route: "archive.html" },
        { label: "Doküman Görüntüleyici", route: "document-viewer.html" }
      ]
    },
    {
      id: "quality",
      label: "KALİTE OPERASYONLARI",
      icon: "⚙️",
      items: [
        { label: "Uygunsuzluk ve CAPA", route: "capa.html" },
        { label: "Risk Yönetimi", route: "risk-register.html" },
        { label: "İç Denetim", route: "audit.html" },
        { label: "Aksiyon Merkezi", route: "action-center.html" },
        { label: "Sürekli İyileştirme", route: "continuous-improvement.html" }
      ]
    },
    {
      id: "stakeholders",
      label: "PAYDAŞ KALİTESİ",
      icon: "🏭",
      items: [
        { label: "Tedarikçi Kalite", route: "supplier-management.html" },
        { label: "Müşteri Şikayetleri", route: "customer-management.html" }
      ]
    },
    {
      id: "competence",
      label: "YETKİNLİK VE ÖLÇÜM",
      icon: "🎓",
      items: [
        { label: "Eğitim Yönetimi", route: "training-management.html" },
        { label: "Yetkinlik Matrisi", route: "competency-matrix.html" },
        { label: "Kalibrasyon Yönetimi", route: "calibration-management.html" }
      ]
    },
    {
      id: "system",
      label: "SİSTEM VE UYGUNLUK",
      icon: "🔒",
      items: [
        { label: "Süreç Yönetimi", route: "process-management.html" },
        { label: "Standart Uygunluk", route: "standards-compliance.html" },
        { label: "Yasal Uyum", route: "legal-compliance.html" },
        { label: "BGYS ve Süreklilik", route: "security-continuity-center.html" },
        { label: "YGG Yönetimi", route: "management-review.html" },
        { label: "Değişiklik Yönetimi", route: "change-management.html" }
      ]
    },
    {
      id: "iatf",
      label: "APQP / CORE TOOLS",
      icon: "🚗",
      items: [
        { label: "APQP", route: "apqp.html" },
        { label: "PPAP", route: "apqp.html#ppap" },
        { label: "FMEA", route: "apqp.html#fmea" },
        { label: "MSA", route: "apqp.html#msa" },
        { label: "SPC", route: "apqp.html#spc" },
        { label: "Kontrol Planı", route: "apqp.html#control-plan" }
      ]
    },
    {
      id: "centers",
      label: "MERKEZLER",
      icon: "⌘",
      items: [
        { label: "Global Arama", route: "search.html" },
        { label: "Dosya Merkezi", route: "file-center.html" },
        { label: "AI Asistan", route: "ai-assistant.html" },
        { label: "Kullanıcılar", route: "users.html" },
        { label: "Departmanlar", route: "departments.html" }
      ]
    }
  ]);

  function getCurrentRoute(options) {
    const name = window.location.pathname.split("/").pop() || "index.html";
    const includeHash = options && options.includeHash;
    return includeHash && window.location.hash ? `${name}${window.location.hash}` : name;
  }

  function resolveMenuRoute(route) {
    if (global.GDNL_ROUTES && typeof global.GDNL_ROUTES.resolveRoute === "function") {
      return global.GDNL_ROUTES.resolveRoute(route);
    }
    return route;
  }

  function getMenu() {
    return menu.map((group) => ({
      ...group,
      items: group.items ? group.items.map((item) => ({ ...item })) : undefined
    }));
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function normalizeRoute(route, options) {
    const source = String(route || "");
    const path = source.split("?")[0].split("#")[0].split("/").pop();
    const includeHash = options && options.includeHash;
    if (!includeHash) return path;
    const hashIndex = source.indexOf("#");
    return hashIndex >= 0 ? `${path}${source.slice(hashIndex).split("?")[0]}` : path;
  }

  function isQualityRoute(route) {
    const name = normalizeRoute(route || getCurrentRoute());
    if (!name || name === "index.html" || name === "department-gateway.html") return false;
    if (name === "management-review.html") return true;
    return !/^(management|hr|maintenance)-/.test(name);
  }

  function currentRouteInGroup(group, currentRoute) {
    if (group.type === "single") return normalizeRoute(group.route) === currentRoute;
    return (group.items || []).some((item) => normalizeRoute(item.route) === currentRoute);
  }

  function isActiveItem(route, currentRoute, currentRouteWithHash) {
    const itemRoute = normalizeRoute(route);
    const itemRouteWithHash = normalizeRoute(route, { includeHash: true });
    if (itemRouteWithHash.includes("#")) return itemRouteWithHash === currentRouteWithHash;
    return itemRoute === currentRoute && !currentRouteWithHash.includes("#");
  }

  function renderMenuHtml() {
    const currentRoute = normalizeRoute(getCurrentRoute());
    const currentRouteWithHash = normalizeRoute(getCurrentRoute({ includeHash: true }), { includeHash: true });
    const dashboardActive = currentRoute === "dashboard.html" && !currentRouteWithHash.includes("#") ? ' class="active"' : "";
    const dashboardLink = `<a${dashboardActive} href="dashboard.html">🏠 Kalite Yönetim Paneli</a>`;
    const groupsHtml = menu.map((group) => {
      if (group.type === "single") {
        const active = normalizeRoute(group.route) === currentRoute ? ' class="active"' : "";
        return `<a${active} href="${escapeHtml(group.route)}">${escapeHtml(group.icon)} ${escapeHtml(group.label)}</a>`;
      }

      const activeGroup = currentRouteInGroup(group, currentRoute);
      const groupClass = activeGroup ? "menu-group active-group open" : "menu-group";
      const submenuClass = activeGroup ? "submenu open" : "submenu";
      const links = (group.items || []).map((item) => {
        const active = isActiveItem(item.route, currentRoute, currentRouteWithHash) ? ' class="active"' : "";
        return `<a${active} href="${escapeHtml(item.route)}">${escapeHtml(item.label)}</a>`;
      }).join("\n");
      return `<button class="${groupClass}" type="button" onclick="window.GDNL_SIDEBAR.toggleMenuGroup(this)">${escapeHtml(group.icon)} ${escapeHtml(group.label)} <span>⌄</span></button>\n<div class="${submenuClass}">\n${links}\n</div>`;
    }).join("\n\n");
    return `${dashboardLink}\n\n${groupsHtml}`;
  }

  function installSidebarStyle() {
    if (document.getElementById("gdnl-quality-sidebar-standard-style")) return;
    const style = document.createElement("style");
    style.id = "gdnl-quality-sidebar-standard-style";
    style.textContent = `
body.quality-suite .app{grid-template-columns:310px minmax(0,1fr)!important}
body.quality-suite .sidebar{width:310px!important;background:radial-gradient(circle at 20% 0%,rgba(14,165,233,.22),transparent 28%),linear-gradient(180deg,#071b34 0%,#061426 100%)!important;color:#dceafe!important;border-right:1px solid rgba(255,255,255,.10)!important;box-shadow:22px 0 60px rgba(7,27,52,.20)!important;padding:24px 18px!important;max-height:100dvh!important;overflow-x:hidden!important;overflow-y:auto!important}
body.quality-suite .sidebar::-webkit-scrollbar,body.quality-suite .mobile-drawer::-webkit-scrollbar,body.quality-suite aside.drawer::-webkit-scrollbar{width:0!important}
body.quality-suite .sidebar .logo,body.quality-suite .mobile-drawer-logo,body.quality-suite .drawer-logo{display:flex!important;align-items:center!important;gap:12px!important;margin-bottom:24px!important;padding:8px 8px 20px!important;border-bottom:1px solid rgba(255,255,255,.10)!important;color:#f8fbff!important;text-decoration:none!important;letter-spacing:0!important}
body.quality-suite .gdnl-brand-mark{width:48px!important;height:48px!important;min-width:48px!important;border-radius:16px!important;background:linear-gradient(135deg,#0ea5e9 0%,#22c55e 100%)!important;color:#fff!important;display:grid!important;place-items:center!important;font-size:25px!important;font-weight:950!important;box-shadow:0 18px 38px rgba(34,197,94,.25)!important}
body.quality-suite .gdnl-logo-text{display:flex!important;flex-direction:column!important;gap:3px!important;min-width:0!important}
body.quality-suite .gdnl-logo-text strong{color:#f8fbff!important;font-size:25px!important;line-height:1!important;font-weight:950!important;letter-spacing:-.8px!important}
body.quality-suite .gdnl-logo-text em{color:#22c55e!important;font-style:normal!important}
body.quality-suite .gdnl-logo-text small{color:#9eb3cc!important;font-size:11px!important;line-height:1.2!important;font-weight:850!important}
body.quality-suite .sidebar nav,body.quality-suite .mobile-drawer nav,body.quality-suite aside.drawer nav{display:flex!important;flex-direction:column!important;gap:10px!important;padding-bottom:24px!important}
body.quality-suite .sidebar nav>a,body.quality-suite .sidebar nav .menu-group,body.quality-suite .mobile-drawer nav>a,body.quality-suite .mobile-drawer nav .menu-group,body.quality-suite aside.drawer nav>a,body.quality-suite aside.drawer nav .menu-group{min-height:48px!important;width:100%!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:10px!important;border:1px solid rgba(255,255,255,.08)!important;border-radius:16px!important;padding:13px 14px!important;background:rgba(255,255,255,.04)!important;color:#dbeafe!important;font-size:13px!important;font-weight:950!important;line-height:1.15!important;text-decoration:none!important;box-shadow:none!important;cursor:pointer!important;transition:.18s ease!important}
body.quality-suite .sidebar nav>a:hover,body.quality-suite .sidebar nav>a.active,body.quality-suite .sidebar nav .menu-group:hover,body.quality-suite .sidebar nav .menu-group.open,body.quality-suite .sidebar nav .menu-group.active-group,body.quality-suite .mobile-drawer nav>a:hover,body.quality-suite .mobile-drawer nav>a.active,body.quality-suite .mobile-drawer nav .menu-group:hover,body.quality-suite .mobile-drawer nav .menu-group.open,body.quality-suite aside.drawer nav>a:hover,body.quality-suite aside.drawer nav>a.active,body.quality-suite aside.drawer nav .menu-group:hover,body.quality-suite aside.drawer nav .menu-group.open{background:linear-gradient(135deg,rgba(14,165,233,.22),rgba(34,197,94,.18))!important;border-color:rgba(125,211,252,.28)!important;color:#f8fbff!important;box-shadow:0 14px 30px rgba(14,165,233,.10)!important}
body.quality-suite .sidebar nav>a.active,body.quality-suite .mobile-drawer nav>a.active,body.quality-suite aside.drawer nav>a.active{background:linear-gradient(135deg,#0ea5e9 0%,#22c55e 100%)!important;color:#fff!important;border-color:transparent!important;box-shadow:0 14px 30px rgba(34,197,94,.22)!important}
.sidebar nav .submenu,.mobile-drawer nav .submenu,aside.drawer nav .submenu{display:none;flex-direction:column;gap:7px;margin:8px 0 4px 18px!important;padding:8px 0 8px 12px!important;border-left:1px solid rgba(148,163,184,.30)!important}
.sidebar nav .submenu.open,.mobile-drawer nav .submenu.open,aside.drawer nav .submenu.open{display:flex!important}
body.quality-suite .sidebar nav .submenu a,body.quality-suite .mobile-drawer nav .submenu a,body.quality-suite aside.drawer nav .submenu a{min-height:37px!important;padding:10px 12px!important;border-radius:12px!important;font-size:12px!important;font-weight:850!important;color:#b6c7dc!important;background:transparent!important;border:1px solid transparent!important;text-decoration:none!important}
body.quality-suite .sidebar nav .submenu a:hover,body.quality-suite .sidebar nav .submenu a.active,body.quality-suite .mobile-drawer nav .submenu a:hover,body.quality-suite .mobile-drawer nav .submenu a.active,body.quality-suite aside.drawer nav .submenu a:hover,body.quality-suite aside.drawer nav .submenu a.active{background:rgba(255,255,255,.08)!important;color:#fff!important;border-color:rgba(255,255,255,.10)!important}
.sidebar nav .menu-group.open span,.mobile-drawer nav .menu-group.open span,aside.drawer nav .menu-group.open span{transform:rotate(180deg)}
body.quality-suite .sidebar-footer{margin-top:22px!important;padding:16px!important;border-radius:18px!important;background:rgba(255,255,255,.06)!important;border:1px solid rgba(255,255,255,.10)!important;color:#9eb3cc!important;font-size:12px!important;line-height:1.55!important;font-weight:800!important}
body.quality-suite .mobile-drawer{background:radial-gradient(circle at 20% 0%,rgba(14,165,233,.22),transparent 28%),linear-gradient(180deg,#071b34 0%,#061426 100%)!important;color:#dceafe!important;border-right:1px solid rgba(255,255,255,.10)!important}
body.quality-suite .mobile-drawer-head{background:transparent!important;border-bottom:1px solid rgba(255,255,255,.10)!important}
body.quality-suite aside.drawer{background:radial-gradient(circle at 20% 0%,rgba(14,165,233,.22),transparent 28%),linear-gradient(180deg,#071b34 0%,#061426 100%)!important;color:#dceafe!important;border-right:1px solid rgba(255,255,255,.10)!important}
body.quality-suite aside.drawer .drawer-head{background:transparent!important;border-bottom:1px solid rgba(255,255,255,.10)!important}
@media(max-width:1050px){body.quality-suite .app{grid-template-columns:1fr!important}body.quality-suite .sidebar{display:none!important}}
`;
    document.head.appendChild(style);
  }

  function ensureQualityShell() {
    if (document.body) document.body.classList.add("quality-suite");
  }

  function brandMarkup() {
    return '<span class="gdnl-brand-mark">G</span><span class="gdnl-logo-text"><strong>GDNL <em>QMS</em></strong><small>Kalite Yönetim Sistemi</small></span>';
  }

  function normalizeBrandAndFooter() {
    document.querySelectorAll(".sidebar .logo,.mobile-drawer-logo,.drawer-logo").forEach((brand) => {
      if (brand.dataset.gdnlBrandReady === "true") return;
      brand.classList.add("gdnl-qms-brand");
      if (brand.tagName === "A" && !brand.getAttribute("href")) brand.setAttribute("href", "dashboard.html");
      brand.innerHTML = brandMarkup();
      brand.dataset.gdnlBrandReady = "true";
    });

    document.querySelectorAll(".sidebar-footer").forEach((footer) => {
      footer.innerHTML = "GDNL QMS<br>Kalite Yönetim Sistemi<br>Premium kontrol paneli";
      footer.removeAttribute("style");
    });
  }

  function bindMenuEvents(root) {
    root.querySelectorAll(".menu-group").forEach((button) => {
      button.onclick = function () {
        toggleMenuGroup(button);
      };
    });
  }

  function toggleMenuGroup(button) {
    const nav = button && button.closest("nav");
    const submenu = button && button.nextElementSibling;
    if (!nav || !submenu) return;
    nav.querySelectorAll(".menu-group").forEach((item) => {
      if (item !== button) item.classList.remove("open", "active-group");
    });
    nav.querySelectorAll(".submenu").forEach((item) => {
      if (item !== submenu) item.classList.remove("open");
    });
    button.classList.toggle("open");
    button.classList.toggle("active-group", button.classList.contains("open"));
    submenu.classList.toggle("open", button.classList.contains("open"));
  }

  function normalizeQualitySidebar() {
    if (!isQualityRoute()) return;
    ensureQualityShell();
    installSidebarStyle();
    normalizeBrandAndFooter();
    const html = renderMenuHtml();
    document.querySelectorAll(".sidebar nav, .mobile-drawer nav, aside.drawer nav").forEach((nav) => {
      if (nav.dataset.gdnlQualitySidebarHtml === html && nav.classList.contains("gdnl-quality-sidebar-standard")) {
        bindMenuEvents(nav);
        return;
      }
      nav.innerHTML = html;
      nav.dataset.gdnlQualitySidebarHtml = html;
      nav.classList.add("gdnl-quality-sidebar-standard");
      bindMenuEvents(nav);
    });
  }

  function scheduleNormalizeQualitySidebar() {
    normalizeQualitySidebar();
    [0, 150, 600].forEach((delay) => global.setTimeout(normalizeQualitySidebar, delay));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleNormalizeQualitySidebar);
  } else {
    scheduleNormalizeQualitySidebar();
  }

  global.addEventListener("hashchange", scheduleNormalizeQualitySidebar);

  global.GDNL_SIDEBAR = {
    menu,
    getMenu,
    getCurrentRoute,
    resolveMenuRoute,
    normalizeQualitySidebar,
    scheduleNormalizeQualitySidebar,
    toggleMenuGroup
  };
})(window);
