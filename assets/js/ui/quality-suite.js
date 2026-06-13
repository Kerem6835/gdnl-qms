;(function (global) {
  "use strict";

  const QUALITY_TEXT_REPLACEMENTS = [
    [/Cloud Ready/i, "Kurumsal Hazır"],
    [/Canlı API hazır/i, "Canlı kayıt akışı hazır"],
    [/Canlı API/i, "Canlı kayıt"],
    [/API Durumu/i, "Sistem Durumu"],
    [/Müşteri Yönetimi Center/i, "Müşteri Şikayetleri Merkezi"],
    [/Center/i, "Merkezi"],
    [/Mail\/SMS/i, "Mesajlaşma"],
    [/E-posta Grupları/i, "Bilgilendirme Grupları"],
    [/Kısa Mesaj Grupları/i, "Bildirim Grupları"],
    [/Motoru:/i, "Durumu:"],
    [/Motoru/i, "Takibi"],
    [/Komuta Merkezi/i, "Yönetim Merkezi"]
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

  function ensureProfessionalEmptyStates() {
    document.querySelectorAll(".empty").forEach((el) => {
      const text = (el.textContent || "").trim();
      if (/yükleniyor/i.test(text)) return;
      if (/bulunamadı|henüz|sonuç yok|kayıt yok/i.test(text)) {
        el.textContent = text
          .replace(/Kayıt bulunamadı\./i, "Bu süreç için henüz kayıt oluşturulmadı.")
          .replace(/Sonuç bulunamadı\./i, "Arama kriterlerine uygun kayıt bulunamadı.");
      }
    });
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

  function run() {
    if (!isQualityPage()) return;
    markQualityPage();
    fixBrokenQualityLinks();
    normalizeSearchButtons();
    normalizeCtas();
    normalizeVisibleTerminology(document.body);
    ensureProfessionalEmptyStates();
    addApqpAnchors();
    addQualityAnchors();
    if (global.GDNL_SIDEBAR && typeof global.GDNL_SIDEBAR.normalizeQualitySidebar === "function") {
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

  global.GDNL_QUALITY_SUITE = {
    run,
    fixBrokenQualityLinks,
    normalizeSearchButtons,
    normalizeVisibleTerminology
  };
})(window);
