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
        { label: "8D / CAPA", route: "capa.html" },
        { label: "Risk Yönetimi", route: "risk-register.html" },
        { label: "İç Denetim", route: "audit.html" },
        { label: "Değişiklik Yönetimi", route: "change-management.html" },
        { label: "Süreç Yönetimi", route: "process-management.html" },
        { label: "Sürekli İyileştirme", route: "continuous-improvement.html" }
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
        { label: "Bildirim Merkezi", route: "notification-center.html" }
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
        { label: "APQP", route: "apqp.html" }
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

  global.GDNL_SIDEBAR = {
    menu,
    getMenu,
    getCurrentRoute,
    resolveMenuRoute
  };
})(window);
