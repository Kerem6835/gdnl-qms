;(function (global) {
  "use strict";

  const menu = Object.freeze([
    {
      id: "home",
      label: "Dashboard",
      icon: "🏠",
      route: "dashboard.html",
      type: "single"
    },
    {
      id: "documents",
      label: "Doküman Yönetimi",
      icon: "📚",
      items: [
        { label: "Firma Belgeleri", route: "company-assets-documents.html" },
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
      label: "Kalite Yönetimi",
      icon: "⚙️",
      items: [
        { label: "Uygunsuzluk Yönetimi", route: "capa.html#ncr" },
        { label: "8D / CAPA", route: "capa.html" },
        { label: "Risk Yönetimi", route: "risk-register.html" },
        { label: "Değişiklik Yönetimi", route: "change-management.html" },
        { label: "Süreç Yönetimi", route: "process-management.html" },
        { label: "Sürekli İyileştirme", route: "continuous-improvement.html" },
        { label: "İç Denetim", route: "audit.html" }
      ]
    },
    {
      id: "organization",
      label: "Organizasyon Yönetimi",
      icon: "👥",
      items: [
        { label: "Eğitim Yönetimi", route: "training-management.html" },
        { label: "Yetkinlik Matrisi", route: "competency-matrix.html" },
        { label: "Kullanıcılar", route: "users.html" }
      ]
    },
    {
      id: "stakeholders",
      label: "Paydaş Yönetimi",
      icon: "🏭",
      items: [
        { label: "Tedarikçi Yönetimi", route: "supplier-management.html" },
        { label: "Müşteri Yönetimi", route: "customer-management.html" }
      ]
    },
    {
      id: "performance",
      label: "Performans Yönetimi",
      icon: "📊",
      items: [
        { label: "KPI ve Raporlar", route: "kpi-reports.html" },
        { label: "YGG Yönetimi", route: "management-review.html" },
        { label: "Aksiyon Merkezi", route: "action-center.html" },
        { label: "Aktivite Merkezi", route: "activity-center.html" },
        { label: "Bildirim Merkezi", route: "notification-center.html" },
        { label: "Dosya Merkezi", route: "file-center.html" },
        { label: "Global Arama", route: "search.html" },
        { label: "Mesaj Merkezi", route: "mailbox.html" }
      ]
    },
    {
      id: "technical",
      label: "Teknik Yönetim",
      icon: "🔬",
      items: [
        { label: "Kalibrasyon Yönetimi", route: "calibration-management.html" }
      ]
    },
    {
      id: "compliance",
      label: "Uyum ve Güvenlik",
      icon: "🔒",
      items: [
        { label: "BGYS & İş Sürekliliği", route: "security-continuity-center.html" },
        { label: "Standart Uygunluk", route: "standards-compliance.html" },
        { label: "Yasal Uyum", route: "legal-compliance.html" }
      ]
    },
    {
      id: "iatf",
      label: "IATF 16949",
      icon: "🚗",
      items: [
        { label: "APQP", route: "apqp.html" },
        { label: "PPAP", route: "apqp.html#ppap" },
        { label: "FMEA", route: "apqp.html#fmea" },
        { label: "MSA", route: "apqp.html#msa" },
        { label: "SPC", route: "apqp.html#spc" },
        { label: "Kontrol Planı", route: "apqp.html#control-plan" }
      ]
    }
  ]);

  function getCurrentRoute() {
    return window.location.pathname.split("/").pop() || "index.html";
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

  function normalizeRoute(route) {
    return String(route || "").split("?")[0].split("#")[0].split("/").pop();
  }

  function isQualityRoute(route) {
    const name = normalizeRoute(route || getCurrentRoute());
    if (!name || name === "index.html" || name === "department-gateway.html" || name === "mailbox.html") return false;
    if (name === "management-review.html") return true;
    return !/^(management|hr|maintenance)-/.test(name);
  }

  function currentRouteInGroup(group, currentRoute) {
    if (group.type === "single") return normalizeRoute(group.route) === currentRoute;
    return (group.items || []).some((item) => normalizeRoute(item.route) === currentRoute);
  }

  function renderMenuHtml() {
    const currentRoute = normalizeRoute(getCurrentRoute());
    return menu.map((group) => {
      if (group.type === "single") {
        const active = normalizeRoute(group.route) === currentRoute ? ' class="active"' : "";
        return `<a${active} href="${escapeHtml(group.route)}">${escapeHtml(group.icon)} ${escapeHtml(group.label)}</a>`;
      }

      const activeGroup = currentRouteInGroup(group, currentRoute);
      const groupClass = activeGroup ? "menu-group active-group open" : "menu-group";
      const submenuClass = activeGroup ? "submenu open" : "submenu";
      const links = (group.items || []).map((item) => {
        const active = normalizeRoute(item.route) === currentRoute ? ' class="active"' : "";
        const label = group.id === "performance" && item.route === "mailbox.html" ? "📨 Mesaj Merkezi" : item.label;
        return `<a${active} href="${escapeHtml(item.route)}">${escapeHtml(label)}</a>`;
      }).join("\n");
      return `<button class="${groupClass}" type="button" onclick="window.GDNL_SIDEBAR.toggleMenuGroup(this)">${escapeHtml(group.icon)} ${escapeHtml(group.label)} <span>⌄</span></button>\n<div class="${submenuClass}">\n${links}\n</div>`;
    }).join("\n\n");
  }

  function installSidebarStyle() {
    if (document.getElementById("gdnl-quality-sidebar-standard-style")) return;
    const style = document.createElement("style");
    style.id = "gdnl-quality-sidebar-standard-style";
    style.textContent = `
.sidebar nav .submenu,.mobile-drawer nav .submenu{display:none;flex-direction:column;gap:6px}
.sidebar nav .submenu.open,.mobile-drawer nav .submenu.open{display:flex}
.sidebar nav .menu-group.open span,.mobile-drawer nav .menu-group.open span{transform:rotate(180deg)}
`;
    document.head.appendChild(style);
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
    installSidebarStyle();
    const html = renderMenuHtml();
    document.querySelectorAll(".sidebar nav, .mobile-drawer nav").forEach((nav) => {
      nav.innerHTML = html;
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
