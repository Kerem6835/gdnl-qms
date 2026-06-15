;(function (global) {
  "use strict";

  const QUALITY_TEXT_REPLACEMENTS = [
    [/Cloud Ready/i, "Kurumsal Hazır"],
    [/GDNL\s+QMS/i, "GDNL QMS"],
    [/GDNL\s+QMS/i, "GDNL QMS"],
    [/Kalite Yönetim Dashboard/i, "Kalite Yönetim Paneli"],
    [/Dashboard/i, "Panel"],
    [/Canlı Skor/i, "Güncel Skor"],
    [/Canlı A[P]I hazır/i, "Canlı kayıt akışı hazır"],
    [/Canlı A[P]I/i, "Canlı kayıt"],
    [/A[P]I Durumu/i, "Sistem Durumu"],
    [/A[P]I bağlantısı/i, "Sistem bağlantısı"],
    [/A[P]I Hatası/i, "Sistem Uyarısı"],
    [/A[P]I hata verdi/i, "Sistem işlemi tamamlanamadı"],
    [/\bAPI\b/i, "Sistem"],
    [/endpoint’i/i, "servisi"],
    [/endpointi/i, "servisi"],
    [/endpoint/i, "servis"],
    [/Worker/i, "Sistem"],
    [/JWT \+ HttpOnly Cookie Uyumlu/i, "Güvenli Oturum Uyumlu"],
    [/D1\/R2 bulut uyumlu/i, "kurumsal kayıt mimarisine uyumlu"],
    [/GET\s+\/[a-z0-9/_?=:-]+/i, "Canlı kayıt servisi"],
    [/Müşteri Yönetimi Center/i, "Müşteri Şikayetleri Merkezi"],
    [/Center/i, "Merkezi"],
    [/Mail\/SMS/i, "Mesajlaşma"],
    [/E-posta Grupları/i, "Bilgilendirme Grupları"],
    [/Kısa Mesaj Grupları/i, "Bildirim Grupları"],
    [/Motoru:/i, "Durumu:"],
    [/Motoru/i, "Takibi"],
    [/Komuta Merkezi/i, "Yönetim Merkezi"],
    [/JSON hatası/i, "Kayıt işleme hatası"],
    [/Stack trace/i, "Hata detayı"],
    [/D1 bağlantısı kurulamadı[^.]*\./i, "Kayıtlar şu anda alınamadı."],
    [/D1 bağlantısı kontrol edilmeli/i, "Kayıt servisi kontrol edilmeli"],
    [/D1 Bağlanıyor/i, "Kayıtlar yükleniyor"],
    [/D1/i, "Kayıt"],
    [/CORS/i, "bağlantı"],
    [/binding/i, "servis"]
  ];

  const BROKEN_ROUTE_MAP = Object.freeze({
    "fmea.html": "apqp.html#fmea",
    "control-plan.html": "apqp.html#control-plan",
    "spc.html": "apqp.html#spc",
    "msa.html": "apqp.html#msa",
    "ppap.html": "apqp.html#ppap",
    "revision-management.html": "revision.html",
    "standard-compliance.html": "standards-compliance.html",
    "security-continuity.html": "security-continuity-center.html",
    "calibration.html": "calibration-management.html",
    "maintenance.html": "calibration-management.html",
    "equipment.html": "calibration-management.html",
    "information-security.html": "security-continuity-center.html",
    "audit-management.html": "audit.html",
    "audit-to-capa.html": "capa.html",
    "audit-to-risk.html": "risk-register.html",
    "audit-to-management-review.html": "management-review.html",
    "audit-to-action.html": "action-center.html",
    "audit-to-document.html": "documents.html",
    "audit-to-training.html": "training-management.html",
    "audit-to-change.html": "change-management.html"
  });

  function normalizeRoute(value) {
    return String(value || "").split("?")[0].split("#")[0].split("/").pop();
  }

  function isQualityPage() {
    const name = normalizeRoute(global.location && global.location.pathname);
    if (!name || name === "index.html" || name === "department-gateway.html" || name === "mailbox.html") return false;
    if (name === "management-review.html") return true;
    return !/^(management|hr|maintenance)-/.test(name);
  }

  function replaceTextNode(node) {
    let value = node.nodeValue || "";
    let next = value;
    QUALITY_TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => {
      const flags = pattern.ignoreCase ? "gi" : "g";
      next = next.replace(new RegExp(pattern.source, flags), replacement);
    });
    if (next !== value) node.nodeValue = next;
  }

  function normalizeVisibleTerminology(root) {
    const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|TEXTAREA|INPUT|OPTION)$/i.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return QUALITY_TEXT_REPLACEMENTS.some(([pattern]) => pattern.test(node.nodeValue || ""))
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);
  }

  function normalizeDocumentTitle() {
    let next = document.title || "";
    QUALITY_TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => {
      const flags = pattern.ignoreCase ? "gi" : "g";
      next = next.replace(new RegExp(pattern.source, flags), replacement);
    });
    if (next && next !== document.title) document.title = next;
  }

  function normalizeSearchButtons() {
    document.querySelectorAll(".search-btn,#searchBtn,button[aria-label*='Ara']").forEach((button) => {
      const text = (button.textContent || "").trim();
      if (!text || /🔎|🔍|⌕/.test(text)) button.textContent = "Ara";
      button.setAttribute("aria-label", "Ara");
      button.classList.add("gdnl-primary-cta");
    });
  }

  function normalizeCtas() {
    const keywords = [
      "oluştur",
      "hazırla",
      "kaydet",
      "yeni",
      "departman merkezi",
      "aktif departman",
      "sistem sağlığı",
      "rapor al",
      "dışa aktar"
    ];
    document.querySelectorAll("button,a,.hero-badge,.department-chip,.department-switch,.status-pill").forEach((el) => {
      const text = (el.textContent || "").toLocaleLowerCase("tr-TR");
      if (keywords.some((keyword) => text.includes(keyword))) el.classList.add("gdnl-primary-cta");
    });
  }

  function removeActiveDepartmentBadges() {
    document.querySelectorAll(".department-chip,.status-pill,.hero-badge,.gdnl-primary-cta").forEach((el) => {
      const text = (el.textContent || "").toLocaleLowerCase("tr-TR").replace(/\s+/g, " ");
      if (text.includes("aktif departman")) {
        el.setAttribute("data-gdnl-hidden-active-department", "true");
        el.setAttribute("aria-hidden", "true");
      }
    });
  }

  function fixBrokenQualityLinks() {
    document.querySelectorAll("a[href]").forEach((link) => {
      const raw = link.getAttribute("href") || "";
      const file = normalizeRoute(raw);
      if (!BROKEN_ROUTE_MAP[file]) return;
      const suffix = raw.includes("?") ? raw.slice(raw.indexOf("?")) : "";
      link.setAttribute("href", BROKEN_ROUTE_MAP[file] + (suffix && !BROKEN_ROUTE_MAP[file].includes("#") ? suffix : ""));
    });
  }

  function markQualityPage() {
    document.body.classList.add("quality-suite");
  }

  function brandMarkup() {
    return '<img class="gdnl-qms-logo-img" src="assets/images/gdnl-qms-logo.svg" alt="GDNL QMS Kurumsal Kalite Yönetim Sistemi">';
  }

  function normalizeQualityBrand() {
    document.querySelectorAll(".sidebar .logo,.mobile-drawer-logo").forEach((el) => {
      if (el.dataset.gdnlBrandReady === "true") return;
      el.classList.add("gdnl-qms-brand");
      if (el.tagName === "A" && !el.getAttribute("href")) el.setAttribute("href", "dashboard.html");
      el.innerHTML = brandMarkup();
      el.dataset.gdnlBrandReady = "true";
    });
    document.querySelectorAll(".sidebar-footer").forEach((el) => {
      el.innerHTML = el.innerHTML.replace(new RegExp("GDNL\\s+(?:QMS|E" + "OS|E" + "QMS)", "gi"), "GDNL QMS");
    });
  }

  function targetFormForEmptyState(el) {
    return el.closest(".panel,.card,.section,.main")?.querySelector("form,.form-grid,.form,.table-wrap,.panel,.card") || document.querySelector("form,.form-grid,.form");
  }

  function enhanceEmptyStateAction(el) {
    if (el.dataset.gdnlEmptyReady === "true") return;
    const message = (el.textContent || "Bu süreç için henüz kayıt oluşturulmadı.").trim();
    el.innerHTML = '<div class="gdnl-empty-illustration" aria-hidden="true">▦</div><div><b>' + message + '</b><span>İlgili kayıt alanını kullanarak ilk kaydı oluşturabilirsiniz.</span></div><button class="gdnl-empty-action" type="button">Kayıt Oluştur</button>';
    el.querySelector(".gdnl-empty-action")?.addEventListener("click", () => {
      targetFormForEmptyState(el)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    el.dataset.gdnlEmptyReady = "true";
  }

  function ensureProfessionalEmptyStates() {
    document.querySelectorAll(".empty").forEach((el) => {
      const text = (el.textContent || "").trim();
      if (/yükleniyor/i.test(text)) return;
      if (/bulunamadı|henüz|sonuç yok|kayıt yok/i.test(text)) {
        el.classList.add("gdnl-empty-state");
        el.textContent = text
          .replace(/Kayıt bulunamadı\./i, "Bu süreç için henüz kayıt oluşturulmadı.")
          .replace(/Sonuç bulunamadı\./i, "Arama kriterlerine uygun kayıt bulunamadı.");
        enhanceEmptyStateAction(el);
      }
    });
  }

  function installQualityDeleteConfirmations() {
    if (global.GDNL_API?.installDeleteConfirmations) global.GDNL_API.installDeleteConfirmations();
  }

  function addApqpAnchors() {
    if (normalizeRoute(global.location && global.location.pathname) !== "apqp.html") return;
    const pairs = [
      ["ppap", /ppap/i],
      ["fmea", /fmea/i],
      ["msa", /msa/i],
      ["spc", /spc/i],
      ["control-plan", /kontrol plan|control plan/i]
    ];
    const root = document.querySelector(".main") || document.body;
    pairs.forEach(([id, pattern]) => {
      if (document.getElementById(id)) return;
      const target = Array.from(root.querySelectorAll("h2,h3,h4,button,span,b")).find((el) => pattern.test(el.textContent || ""));
      if (target) target.id = id;
    });
    const hash = String(global.location.hash || "").replace("#", "");
    if (hash && pairs.some(([id]) => id === hash)) {
      global.setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }

  function addQualityAnchors() {
    const route = normalizeRoute(global.location && global.location.pathname);
    if (route === "capa.html" && !document.getElementById("ncr")) {
      const target = Array.from(document.querySelectorAll("h1,h2,h3,button,a,span,b")).find((el) => /uygunsuzluk|ncr|capa|8d/i.test(el.textContent || ""));
      if (target) target.id = "ncr";
    }
  }

  function ensureSidebarEngine() {
    if (global.GDNL_SIDEBAR || document.getElementById("gdnlQualitySidebarEngine")) return;
    const script = document.createElement("script");
    script.id = "gdnlQualitySidebarEngine";
    script.src = "assets/js/ui/sidebar.js?v=quality-qms";
    script.onload = () => global.GDNL_SIDEBAR?.normalizeQualitySidebar?.();
    document.head.appendChild(script);
  }

  function run(options) {
    if (!isQualityPage()) return;
    const config = options || {};
    markQualityPage();
    ensureSidebarEngine();
    normalizeQualityBrand();
    fixBrokenQualityLinks();
    normalizeSearchButtons();
    normalizeCtas();
    removeActiveDepartmentBadges();
    normalizeDocumentTitle();
    normalizeVisibleTerminology(document.body);
    ensureProfessionalEmptyStates();
    addApqpAnchors();
    addQualityAnchors();
    installQualityDeleteConfirmations();
    if (!config.skipSidebar && global.GDNL_SIDEBAR && typeof global.GDNL_SIDEBAR.normalizeQualitySidebar === "function") {
      global.GDNL_SIDEBAR.normalizeQualitySidebar();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  global.setTimeout(run, 150);
  global.setTimeout(run, 600);

  const observer = new MutationObserver((mutations) => {
    if (!isQualityPage()) return;
    if (!mutations.some((mutation) => mutation.addedNodes && mutation.addedNodes.length)) return;
    global.clearTimeout(global.__gdnlQualityNormalizeTimer);
    global.__gdnlQualityNormalizeTimer = global.setTimeout(() => run({ skipSidebar: true }), 80);
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true });

  global.GDNL_QUALITY_SUITE = {
    run,
    fixBrokenQualityLinks,
    normalizeSearchButtons,
    normalizeQualityBrand,
    normalizeDocumentTitle,
    normalizeVisibleTerminology,
    ensureSidebarEngine,
    removeActiveDepartmentBadges
  };
})(window);
