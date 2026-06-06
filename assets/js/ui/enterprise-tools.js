;(function (global) {
  "use strict";

  if (global.__GDNL_ENTERPRISE_TOOLS__) return;
  global.__GDNL_ENTERPRISE_TOOLS__ = true;

  const api = global.GDNL_API;
  const page = (location.pathname.split("/").pop() || "dashboard.html").toLowerCase();
  const cache = new Map();
  const modules = {
    "documents.html": { name: "Documents", endpoint: "/documents", pdf: true, excel: true },
    "capa.html": { name: "CAPA", endpoint: "/capas", pdf: true, excel: true },
    "risk-register.html": { name: "Risks", endpoint: "/risks", pdf: true, excel: true },
    "audit.html": { name: "Audits", endpoint: "/audits", pdf: true, excel: true },
    "training-management.html": { name: "Trainings", endpoint: "/trainings", pdf: true, excel: true },
    "management-review.html": { name: "YGG", endpoint: "/management-review", pdf: true, excel: false },
    "supplier-management.html": { name: "Suppliers", endpoint: "/suppliers", pdf: false, excel: true },
    "action-center.html": { name: "Actions", endpoint: "/actions", pdf: false, excel: true }
  };

  const esc = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const asArray = (payload) => api?.asArray ? api.asArray(payload) : (Array.isArray(payload) ? payload : []);
  const lower = (value) => String(value || "").toLocaleLowerCase("tr-TR");
  const root = () => document.querySelector("main") || document.querySelector(".main") || document.body;

  async function get(path) {
    if (!api?.get) return [];
    if (!cache.has(path)) cache.set(path, api.get(path).then(asArray).catch(() => []));
    return cache.get(path);
  }

  function ensureStyles() {
    if (document.getElementById("gdnlEnterpriseStyles")) return;
    const style = document.createElement("style");
    style.id = "gdnlEnterpriseStyles";
    style.textContent = `
      .gdnl-enterprise-panel{background:rgba(255,255,255,.94);border:1px solid #e0e8f0;border-radius:22px;padding:18px;box-shadow:0 14px 38px rgba(7,27,52,.055);margin:0 0 22px;overflow:auto}
      .gdnl-enterprise-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .gdnl-enterprise-head h3{font-size:20px;font-weight:950;color:#071b34}
      .gdnl-tool-row{display:flex;gap:10px;flex-wrap:wrap}.gdnl-tool-btn{height:38px;border:none;border-radius:12px;padding:0 13px;background:linear-gradient(135deg,#1f8f43,#35a852,#62d46f);color:#fff;font-weight:950;cursor:pointer}
      .gdnl-tool-btn.secondary{background:#dcfce7;color:#15803d}.gdnl-tool-btn.dark{background:#071b34;color:#fff}
      .gdnl-tool-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}.gdnl-tool-card{border:1px solid #e5edf6;background:linear-gradient(135deg,#f8fbff,#fff);border-radius:16px;padding:14px}.gdnl-tool-card small{display:block;color:#617086;font-weight:950;margin-bottom:6px}.gdnl-tool-card b{font-size:28px;color:#1f7d3d;font-weight:950}
      .gdnl-role-table{width:100%;border-collapse:collapse}.gdnl-role-table th,.gdnl-role-table td{padding:10px;border-bottom:1px solid #edf2f7;text-align:left;font-size:12px}.gdnl-role-table th{color:#617086;background:#f8fbff}
      .gdnl-check{display:inline-flex;border-radius:999px;padding:5px 9px;background:#e8f7ee;color:#1f7d3d;font-size:11px;font-weight:950}.gdnl-warn{background:#ffedd5;color:#c2410c}.gdnl-red{background:#fee2e2;color:#991b1b}
      .gdnl-chart{display:grid;gap:10px}.gdnl-chart-row{display:grid;grid-template-columns:120px minmax(0,1fr) 46px;gap:10px;align-items:center;font-size:12px;font-weight:900;color:#536176}.gdnl-chart-row span:nth-child(2){height:12px;background:#edf2f7;border-radius:999px;overflow:hidden}.gdnl-chart-row i{display:block;height:100%;border-radius:999px;background:linear-gradient(135deg,#1f8f43,#35a852,#62d46f)}
      @media(max-width:720px){.gdnl-chart-row{grid-template-columns:92px minmax(0,1fr) 38px}.gdnl-enterprise-panel{padding:14px;border-radius:18px}}
    `;
    document.head.appendChild(style);
  }

  function panel(title, html) {
    ensureStyles();
    const node = document.createElement("section");
    node.className = "gdnl-enterprise-panel";
    node.innerHTML = `<div class="gdnl-enterprise-head"><h3>${esc(title)}</h3><span class="gdnl-check">Premium Hazırlık</span></div>${html}`;
    root().appendChild(node);
  }

  function cards(rows) {
    return `<div class="gdnl-tool-grid">${rows.map(([label, value]) => `<div class="gdnl-tool-card"><small>${esc(label)}</small><b>${esc(value)}</b></div>`).join("")}</div>`;
  }

  function table(headers, rows) {
    return `<table class="gdnl-role-table"><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function saveBlob(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toRows(records) {
    return records.map((item) => ({
      id: item.id || item.record_no || item.no || item.code || item.documentCode || item.capaNo || item.riskNo || item.auditNo || item.trainingNo || "",
      title: item.title || item.name || item.documentName || item.document_name || item.problemTitle || item.riskTitle || item.processName || item.trainingTitle || item.supplierName || "",
      status: item.status || item.documentStatus || item.capaStatus || item.riskStatus || item.auditStatus || item.trainingStatus || item.approvalStatus || "",
      owner: item.owner || item.owner_name || item.assigned_to || item.responsiblePerson || item.leader || item.trainer || item.created_by || "",
      department: item.department || item.department_name || ""
    }));
  }

  function exportExcel(name, records) {
    const rows = toRows(records);
    const html = `<table><thead><tr><th>ID</th><th>Başlık</th><th>Durum</th><th>Sorumlu</th><th>Departman</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.id)}</td><td>${esc(r.title)}</td><td>${esc(r.status)}</td><td>${esc(r.owner)}</td><td>${esc(r.department)}</td></tr>`).join("")}</tbody></table>`;
    saveBlob(`gdnl-${name.toLowerCase()}-export.xls`, html, "application/vnd.ms-excel;charset=utf-8");
  }

  function exportPdf(name, records) {
    const rows = toRows(records);
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(name)} PDF</title><style>body{font-family:Arial;padding:24px;color:#172033}h1{color:#071b34}table{width:100%;border-collapse:collapse}th,td{border:1px solid #dfe9f5;padding:8px;font-size:12px}th{background:#f4f9ff}</style></head><body><h1>GDNL EQMS ${esc(name)} Raporu</h1><table><thead><tr><th>ID</th><th>Başlık</th><th>Durum</th><th>Sorumlu</th><th>Departman</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${esc(r.id)}</td><td>${esc(r.title)}</td><td>${esc(r.status)}</td><td>${esc(r.owner)}</td><td>${esc(r.department)}</td></tr>`).join("")}</tbody></table></body></html>`;
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    setTimeout(() => win.print(), 250);
  }

  async function exportPanel() {
    const config = modules[page];
    if (!config) return;
    const records = await get(config.endpoint);
    const buttons = [
      config.pdf ? `<button class="gdnl-tool-btn" id="gdnlPdfExport">PDF Çıktı</button>` : "",
      config.excel ? `<button class="gdnl-tool-btn secondary" id="gdnlExcelExport">Excel Çıktı</button>` : ""
    ].join("");
    panel("Rapor Çıktıları", `<div class="gdnl-tool-row">${buttons}<button class="gdnl-tool-btn dark" id="gdnlEmailRules">E-posta Kural Hazırlığı</button></div>`);
    document.getElementById("gdnlPdfExport")?.addEventListener("click", () => exportPdf(config.name, records));
    document.getElementById("gdnlExcelExport")?.addEventListener("click", () => exportExcel(config.name, records));
    document.getElementById("gdnlEmailRules")?.addEventListener("click", () => {
      const rules = [
        "Eğitim süresi doluyor",
        "Kalibrasyon yaklaşıyor",
        "CAPA gecikti",
        "Denetim tarihi geldi",
        "Aksiyon gecikti"
      ];
      api?.showToast ? api.showToast("E-posta motoru hazırlığı: " + rules.join(", ")) : alert(rules.join("\n"));
    });
  }

  async function rbacPanel() {
    if (!["users.html", "departments.html"].includes(page)) return;
    const [users, departments] = await Promise.all([get("/users"), get("/departments")]);
    const roles = [...new Set(users.flatMap((u) => Array.isArray(u.roles) ? u.roles : String(u.role || "").split(",")).map((x) => x.trim()).filter(Boolean))];
    panel("RBAC Yetki Matrisi", cards([["Kullanıcı", users.length], ["Departman", departments.length], ["Rol", roles.length], ["Çoklu Rol", users.filter((u) => Array.isArray(u.roles) ? u.roles.length > 1 : String(u.role || "").includes(",")).length]]) +
      table(["Rol", "Görüntüle", "Oluştur", "Düzenle", "Sil", "Onayla", "Arşivle"], roles.slice(0, 12).map((role) => {
        const power = /admin|yönetici|müdür|lider|kalite/i.test(role);
        return [esc(role), "<span class='gdnl-check'>Hazır</span>", power ? "<span class='gdnl-check'>Hazır</span>" : "<span class='gdnl-check gdnl-warn'>Kısıtlı</span>", power ? "<span class='gdnl-check'>Hazır</span>" : "<span class='gdnl-check gdnl-warn'>Kısıtlı</span>", /admin|yönetici/i.test(role) ? "<span class='gdnl-check'>Hazır</span>" : "<span class='gdnl-check gdnl-red'>Kapalı</span>", power ? "<span class='gdnl-check'>Hazır</span>" : "<span class='gdnl-check gdnl-warn'>Kısıtlı</span>", power ? "<span class='gdnl-check'>Hazır</span>" : "<span class='gdnl-check gdnl-warn'>Kısıtlı</span>"];
      })));
  }

  async function dashboardCharts() {
    if (page !== "dashboard.html") return;
    const entries = await Promise.all([
      ["Doküman", get("/documents")],
      ["CAPA", get("/capas")],
      ["Risk", get("/risks")],
      ["Aksiyon", get("/actions")],
      ["Denetim", get("/audits")],
      ["Eğitim", get("/trainings")]
    ].map(async ([label, promise]) => [label, (await promise).length]));
    const max = Math.max(1, ...entries.map((x) => x[1]));
    panel("Dashboard Grafik Hazırlığı", cards([["Aylık Trend", entries.reduce((s, x) => s + x[1], 0)], ["Yıllık Trend", entries.reduce((s, x) => s + x[1], 0)], ["Modül Dağılımı", entries.length], ["Geciken İşler", (await get("/actions")).filter((a) => {
      const d = new Date(a.due_date || a.dueDate || "");
      return !Number.isNaN(d.getTime()) && d < new Date() && !/kapalı|tamamlandı/i.test(String(a.status || ""));
    }).length]]) + `<div class="gdnl-chart">${entries.map(([label, value]) => `<div class="gdnl-chart-row"><span>${esc(label)}</span><span><i style="width:${Math.max(4, value / max * 100)}%"></i></span><b>${value}</b></div>`).join("")}</div>`);
  }

  async function fileFilters() {
    if (page !== "file-center.html") return;
    const files = await get("/files");
    const counts = {
      PDF: files.filter((f) => /pdf/i.test(f.file_type || f.fileName || f.name || "")).length,
      Excel: files.filter((f) => /xls|excel|spreadsheet/i.test(f.file_type || f.fileName || f.name || "")).length,
      Word: files.filter((f) => /doc|word/i.test(f.file_type || f.fileName || f.name || "")).length,
      Resim: files.filter((f) => /png|jpg|jpeg|webp|image/i.test(f.file_type || f.fileName || f.name || "")).length
    };
    panel("Dosya Filtreleri ve Kategori", cards(Object.entries(counts)) + table(["Kategori", "Dosya Tipi", "İkon"], Object.keys(counts).map((k) => [k, k, k])));
  }

  async function searchCoverage() {
    if (page !== "search.html") return;
    const endpoints = [["Kullanıcı", "/users"], ["Departman", "/departments"], ["Doküman", "/documents"], ["CAPA", "/capas"], ["Risk", "/risks"], ["Aksiyon", "/actions"], ["Denetim", "/audits"], ["Eğitim", "/trainings"]];
    const rows = await Promise.all(endpoints.map(async ([label, path]) => [label, (await get(path)).length]));
    panel("Tek Arama Kapsamı", cards(rows));
  }

  async function activityCoverage() {
    if (page !== "activity-center.html") return;
    const [activity, logs] = await Promise.all([get("/activity-feed"), get("/audit-logs")]);
    panel("Activity Center Beslemesi", cards([["Activity Feed", activity.length], ["Audit Logs", logs.length], ["Kullanıcı Geçmişi", new Set([...activity, ...logs].map((x) => x.user_name || x.user || x.created_by).filter(Boolean)).size]]));
  }

  async function managementReviewAgenda() {
    if (page !== "management-review.html") return;
    panel("ISO 9001 + IATF 16949 YGG Gündem Yapısı", table(["Gündem", "Standart Bağlantısı", "Durum"], [
      ["Kalite hedefleri ve KPI", "ISO 9001 9.3", "<span class='gdnl-check'>Hazır</span>"],
      ["Müşteri memnuniyeti ve CSR", "IATF 16949", "<span class='gdnl-check'>Hazır</span>"],
      ["Proses performansı ve ürün uygunluğu", "ISO 9001 / IATF", "<span class='gdnl-check'>Hazır</span>"],
      ["Risk, CAPA, denetim ve tedarikçi performansı", "ISO 9001 6.1 / 10.2", "<span class='gdnl-check'>Hazır</span>"]
    ]));
  }

  async function boot() {
    await Promise.allSettled([exportPanel(), rbacPanel(), dashboardCharts(), fileFilters(), searchCoverage(), activityCoverage(), managementReviewAgenda()]);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})(window);
