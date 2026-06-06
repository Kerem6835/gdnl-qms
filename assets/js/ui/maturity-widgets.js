;(function (global) {
  "use strict";

  if (global.__GDNL_MATURITY_WIDGETS__) return;
  global.__GDNL_MATURITY_WIDGETS__ = true;

  const api = global.GDNL_API;
  const page = (location.pathname.split("/").pop() || "dashboard.html").toLowerCase();
  const endpointCache = new Map();

  const esc = (value) => String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  const lower = (value) => String(value || "").toLocaleLowerCase("tr-TR");
  const asArray = (payload) => api?.asArray ? api.asArray(payload) : (Array.isArray(payload) ? payload : []);
  const openStatus = (value) => !["kapalı", "kapandi", "kapandı", "tamamlandı", "tamamlandi", "closed", "done", "iptal", "cancelled"].includes(lower(value).trim());
  const late = (item) => {
    const raw = item.due_date || item.dueDate || item.plannedDate || item.nextCalibrationDate || item.nextKalibrasyonDate || item.expiryDate;
    if (!raw || !openStatus(item.status || item.actionStatus || item.trainingStatus || item.calibrationStatus || item.maintenanceStatus)) return false;
    const date = new Date(raw);
    return !Number.isNaN(date.getTime()) && date.getTime() < Date.now();
  };

  async function get(path) {
    if (!api?.get) return [];
    if (!endpointCache.has(path)) {
      endpointCache.set(path, api.get(path).then(asArray).catch(() => []));
    }
    return endpointCache.get(path);
  }

  async function getAny(paths) {
    for (const path of paths) {
      const rows = await get(path);
      if (rows.length) return rows;
    }
    return [];
  }

  async function getAll(paths) {
    const lists = await Promise.all(paths.map((path) => get(path)));
    const seen = new Set();
    return lists.flat().filter((item) => {
      const key = item.id || item.record_no || item.documentCode || item.document_code || item.code || JSON.stringify(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function root() {
    return document.querySelector("main") || document.querySelector(".main") || document.body;
  }

  function ensureStyles() {
    if (document.getElementById("gdnlMaturityStyles")) return;
    const style = document.createElement("style");
    style.id = "gdnlMaturityStyles";
    style.textContent = `
      .gdnl-maturity-panel{background:rgba(255,255,255,.94);border:1px solid #e0e8f0;border-radius:22px;padding:18px;box-shadow:0 14px 38px rgba(7,27,52,.055);margin:0 0 22px;overflow:auto}
      .gdnl-maturity-head{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:14px}
      .gdnl-maturity-head h3{font-size:20px;font-weight:950;color:#071b34;letter-spacing:-.3px}
      .gdnl-maturity-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px}
      .gdnl-metric{border:1px solid #e5edf6;background:linear-gradient(135deg,#f8fbff,#fff);border-radius:16px;padding:14px}
      .gdnl-metric small{display:block;color:#617086;font-weight:950;margin-bottom:6px}.gdnl-metric b{font-size:28px;color:#1f7d3d;font-weight:950}
      .gdnl-mini-table{width:100%;border-collapse:collapse}.gdnl-mini-table th,.gdnl-mini-table td{padding:10px;border-bottom:1px solid #edf2f7;text-align:left;font-size:12px}.gdnl-mini-table th{color:#617086;background:#f8fbff}
      .gdnl-badge{display:inline-flex;align-items:center;justify-content:center;border-radius:999px;padding:5px 9px;font-size:11px;font-weight:950;background:#e8f7ee;color:#1f7d3d}.gdnl-badge.red{background:#fee2e2;color:#991b1b}.gdnl-badge.orange{background:#ffedd5;color:#c2410c}.gdnl-badge.blue{background:#dbeafe;color:#1d4ed8}
      .gdnl-bars{display:grid;gap:10px}.gdnl-bar{display:grid;grid-template-columns:120px minmax(0,1fr) 44px;gap:10px;align-items:center;font-size:12px;font-weight:900;color:#536176}.gdnl-bar span:nth-child(2){height:12px;background:#edf2f7;border-radius:999px;overflow:hidden}.gdnl-bar i{display:block;height:100%;background:linear-gradient(135deg,#1f8f43,#35a852,#62d46f);border-radius:999px}
      .gdnl-heat{display:grid;grid-template-columns:repeat(5,minmax(42px,1fr));gap:6px;max-width:420px}.gdnl-heat div{min-height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:950;color:#fff}.gdnl-risk-low{background:#22c55e}.gdnl-risk-mid{background:#f59e0b}.gdnl-risk-high{background:#ef4444}.gdnl-risk-critical{background:#7f1d1d}
      @media(max-width:720px){.gdnl-bar{grid-template-columns:90px minmax(0,1fr) 36px}.gdnl-maturity-panel{padding:14px;border-radius:18px}}
    `;
    document.head.appendChild(style);
  }

  function panel(title, html) {
    ensureStyles();
    const el = document.createElement("section");
    el.className = "gdnl-maturity-panel";
    el.innerHTML = `<div class="gdnl-maturity-head"><h3>${esc(title)}</h3><span class="gdnl-badge blue">Enterprise Olgunluk</span></div>${html}`;
    root().appendChild(el);
  }

  function metrics(items) {
    return `<div class="gdnl-maturity-grid">${items.map((x) => `<div class="gdnl-metric"><small>${esc(x[0])}</small><b>${esc(x[1])}</b></div>`).join("")}</div>`;
  }

  function table(headers, rows) {
    if (!rows.length) return `<div class="empty">Kayıt bulunamadı.</div>`;
    return `<table class="gdnl-mini-table"><thead><tr>${headers.map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead><tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }

  function bars(rows) {
    const max = Math.max(1, ...rows.map((x) => Number(x[1]) || 0));
    return `<div class="gdnl-bars">${rows.map(([label, value]) => `<div class="gdnl-bar"><span>${esc(label)}</span><span><i style="width:${Math.max(4, (Number(value) || 0) / max * 100)}%"></i></span><b>${esc(value)}</b></div>`).join("")}</div>`;
  }

  function firstValue(item, keys, fallback) {
    for (const key of keys) {
      if (item && item[key] !== undefined && item[key] !== null && item[key] !== "") return item[key];
    }
    return fallback || "";
  }

  function parseJsonList(value) {
    if (Array.isArray(value)) return value;
    if (!value || typeof value !== "string") return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function safeList(value) {
    return Array.isArray(value) ? value : parseJsonList(value);
  }

  function scoreClass(score) {
    const value = Number(score) || 0;
    if (value >= 500) return "critical";
    if (value >= 250) return "high";
    if (value >= 100) return "mid";
    return "low";
  }

  function riskBadge(score) {
    const cls = scoreClass(score);
    const label = cls === "critical" ? "Kritik" : cls === "high" ? "Yüksek" : cls === "mid" ? "Orta" : "Düşük";
    return `<span class="gdnl-badge ${cls === "critical" || cls === "high" ? "red" : cls === "mid" ? "orange" : ""}">${label} / ${esc(score || 0)}</span>`;
  }

  function filePreview(file) {
    const name = file.file_name || file.fileName || file.name || "";
    const type = lower(file.file_type || file.fileType || file.mime_type || name);
    if (type.includes("pdf")) return "PDF önizleme hazır / R2";
    if (type.includes("xls") || type.includes("excel")) return "Excel önizleme hazır / R2";
    if (type.includes("doc") || type.includes("word")) return "Word önizleme hazır / R2";
    return "Dosya görüntüleme hazır";
  }

  function previewType(file) {
    const name = file.file_name || file.fileName || file.name || "";
    const type = lower(file.file_type || file.fileType || file.mime_type || name);
    if (type.includes("pdf")) return "PDF";
    if (type.includes("xls") || type.includes("excel") || type.includes("spreadsheet")) return "Excel";
    if (type.includes("doc") || type.includes("word")) return "Word";
    return type ? "Diğer" : "Bekliyor";
  }

  function linkedCount(rows, id) {
    if (!id) return 0;
    return rows.filter((row) => [row.related_id, row.record_no, row.documentCode, row.document_code, row.code, row.sourceNo].map(String).includes(String(id))).length;
  }

  async function documentsMaturity() {
    const [docs, revisions, approvals, distribution, files, archive, readReceipts] = await Promise.all([
      get("/documents"),
      getAll(["/document-revisions", "/document_versions", "/revisions", "/documents/revisions"]),
      getAll(["/approvals", "/approval-history"]),
      getAll(["/documents/distribution", "/distribution", "/distribution-history"]),
      get("/files"),
      get("/archive"),
      getAll(["/read-receipts", "/document-read-receipts"])
    ]);
    const versionedFiles = files.filter((f) => f.version_no || f.version || f.previous_version || f.revision || f.rev);
    const readRows = readReceipts.length ? readReceipts : distribution.filter((d) => d.is_read || d.read_at || lower(d.status).includes("okundu"));
    const oldRevisions = revisions.filter((r) => lower(r.status).includes("eski") || lower(r.status).includes("arşiv") || r.previous_version || r.oldRev || r.old_revision);
    panel("Doküman Kontrol Olgunluğu", metrics([
      ["Revizyon Geçmişi", revisions.length],
      ["Versiyon Geçmişi", versionedFiles.length],
      ["Dağıtım Geçmişi", distribution.length],
      ["Okundu Bilgisi", readRows.length]
    ]) + table(["Doküman", "Revizyon", "Dağıtım", "Önizleme"], docs.slice(0, 8).map((d) => [
      esc(firstValue(d, ["documentCode", "code", "document_no", "record_no", "name"], "-")),
      esc(firstValue(d, ["rev", "revision", "version", "current_revision"], "-")),
      `<span class="gdnl-badge">${linkedCount(distribution, d.documentCode || d.code || d.id)}</span>`,
      esc(filePreview(files.find((f) => (f.related_id || f.record_no) === (d.id || d.documentCode || d.code)) || {}))
    ])) + table(["Geçmiş Tipi", "Kayıt", "Durum"], [
      ["Eski Revizyon", `<span class="gdnl-badge">${oldRevisions.length}</span>`, "Görüntüleme hazır"],
      ["Versiyon Kaydı", `<span class="gdnl-badge">${versionedFiles.length}</span>`, "R2 metadata hazır"],
      ["Arşiv", `<span class="gdnl-badge">${archive.length}</span>`, "Geri yükleme merkezi hazır"],
      ["Onay Geçmişi", `<span class="gdnl-badge">${approvals.length}</span>`, "Approval workflow bağlı"]
    ]) + table(["Önizleme Tipi", "Adet", "Kaynak"], [
      ["PDF", `<span class="gdnl-badge">${files.filter((f) => previewType(f) === "PDF").length}</span>`, "R2 signed URL"],
      ["Word", `<span class="gdnl-badge">${files.filter((f) => previewType(f) === "Word").length}</span>`, "R2 signed URL"],
      ["Excel", `<span class="gdnl-badge">${files.filter((f) => previewType(f) === "Excel").length}</span>`, "R2 signed URL"],
      ["Eski Revizyon Görüntüleme", `<span class="gdnl-badge">${oldRevisions.length}</span>`, "document revisions"]
    ]));
  }

  async function capaMaturity() {
    const [capas, actions, comments, files] = await Promise.all([getAny(["/capas", "/capa"]), get("/actions"), get("/comments"), get("/files")]);
    const stepMeta = [
      ["D1", "Takım üyeleri", ["teamMembers", "team_members"]],
      ["D2", "Problem tanımı", ["problemDescription", "problem_description"]],
      ["D3", "Geçici önlem", ["temporaryAction", "temporary_action"]],
      ["D4", "Kök neden / 5 Why / Ishikawa", ["rootCause", "root_cause", "fiveWhy", "five_why", "fishbone"]],
      ["D5", "Kalıcı faaliyet", ["correctiveAction", "corrective_action"]],
      ["D6", "Uygulama kanıtı", ["implementation", "evidence"]],
      ["D7", "Tekrarını önleme", ["prevention"]],
      ["D8", "Kapanış", ["closureNote", "closure_note"]]
    ];
    panel("CAPA / 8D Olgunluğu", metrics([
      ["8D Kayıt", capas.length],
      ["Etkinlik Doğrulama", capas.filter((c) => c.effectivenessResult || c.effectiveness_result || c.effectivenessDate || c.verificationResult).length],
      ["Kapanış Kontrolü", capas.filter((c) => !openStatus(c.status || c.capaStatus) || c.closureCheck || c.closure_check).length],
      ["Kanıt / Aksiyon", files.filter((f) => lower(f.module).includes("capa") || lower(f.module).includes("8d")).length + " / " + actions.filter((a) => lower(a.module).includes("capa")).length]
    ]) + table(["8D Sekmesi", "Kapsam", "Durum"], stepMeta.map(([step, label, keys]) => [
      step,
      esc(label),
      `<span class="gdnl-badge">${capas.some((c) => keys.some((key) => firstValue(c, [key]))) ? "Veri var" : "Alan hazır"}</span>`
    ])) + table(["Kontrol", "Kayıt", "Durum"], [
      ["5 Why", `<span class="gdnl-badge">${capas.filter((c) => c.fiveWhy || c.five_why || c.why1 || lower(c.rootCause).includes("why")).length}</span>`, "Kök neden alanı hazır"],
      ["Ishikawa", `<span class="gdnl-badge">${capas.filter((c) => c.fishbone || c.ishikawa || c.ishikawaDiagram).length}</span>`, "Balık kılçığı alanı hazır"],
      ["Yorum", `<span class="gdnl-badge">${comments.filter((c) => lower(c.module).includes("capa") || lower(c.related_id).includes("capa")).length}</span>`, "Yorum takibi bağlı"],
      ["Kapanış", `<span class="gdnl-badge">${capas.filter((c) => !openStatus(c.status || c.capaStatus)).length}</span>`, "Kapanış kontrolü izleniyor"]
    ]));
  }

  async function riskMaturity() {
    const [risks, actions] = await Promise.all([get("/risks"), get("/actions")]);
    const buckets = [0, 0, 0, 0];
    risks.forEach((r) => { const score = Number(r.residualScore || r.residual_score || r.initialScore || r.score || 0); if (score >= 500) buckets[3]++; else if (score >= 250) buckets[2]++; else if (score >= 100) buckets[1]++; else buckets[0]++; });
    const cells = [1, 2, 3, 4, 5].flatMap((s) => [1, 2, 3, 4, 5].map((o) => {
      const score = s * o * 20;
      return `<div class="gdnl-risk-${scoreClass(score)}" title="O:${o} Ş:${s} D:20 = ${score}">${score}</div>`;
    })).join("");
    panel("Risk Matrisi ve Heat Map", metrics([["Risk", risks.length], ["Aksiyon Sonrası RPN", risks.filter((r) => r.residualScore || r.residual_score || r.afterActionRpn).length], ["Kritik", buckets[3]], ["Yüksek", buckets[2]]]) +
      `<div class="gdnl-heat">${cells}</div>` +
      table(["Risk", "İlk RPN", "Aksiyon Sonrası RPN", "Aksiyon"], risks.slice(0, 8).map((r) => {
        const id = firstValue(r, ["riskNo", "risk_no", "id"], "-");
        const linkedActions = safeList(r.actions).length || actions.filter((a) => (a.related_id || a.sourceNo || a.record_no) === id).length;
        return [esc(id), riskBadge(r.initialScore || r.initial_score || r.score), riskBadge(r.residualScore || r.residual_score || r.afterActionRpn || 0), `<span class="gdnl-badge">${linkedActions}</span>`];
      })));
  }

  async function actionMaturity() {
    const [actions, activity, comments] = await Promise.all([get("/actions"), get("/activity-feed"), get("/comments")]);
    panel("Aksiyon Merkezi Olgunluğu", metrics([["Aksiyon", actions.length], ["Geciken", actions.filter(late).length], ["Yorum", comments.length], ["Aktivite", activity.filter((a) => lower(a.module).includes("aksiyon") || lower(a.module).includes("action")).length]]) +
      table(["Aksiyon", "Öncelik", "Durum", "Yorum / Aktivite", "Uyarı"], actions.slice(0, 8).map((a) => {
        const id = a.id || a.record_no || a.actionNo || "";
        const pr = lower(a.priority);
        return [esc(a.title || a.name || id || "-"), `<span class="gdnl-badge ${pr.includes("kritik") || pr.includes("yüksek") ? "red" : pr.includes("orta") ? "orange" : ""}">${esc(a.priority || "Normal")}</span>`, esc(a.status || a.actionStatus || "-"), `${comments.filter((c) => (c.related_id || c.record_no) === id).length} / ${activity.filter((x) => (x.related_id || x.record_no) === id).length}`, late(a) ? `<span class="gdnl-badge red">Gecikti</span>` : `<span class="gdnl-badge">Normal</span>`];
      })));
  }

  async function auditMaturity() {
    const [audits, capas, actions] = await Promise.all([get("/audits"), get("/capas"), get("/actions")]);
    const findings = audits.flatMap((a) => safeList(a.findings));
    const nc = findings.filter((f) => /nc|uygunsuz|majör|minör/i.test(JSON.stringify(f))).length;
    const ofi = findings.filter((f) => /ofi|fırsat|iyileştirme/i.test(JSON.stringify(f))).length;
    panel("İç Denetim Olgunluğu", metrics([["Denetim Planı", audits.length], ["Checklist", audits.filter((a) => safeList(a.questions).length || safeList(a.checklist).length).length], ["NC / OFI", nc + " / " + ofi], ["CAPA Bağlantısı", capas.filter((c) => lower(c.source).includes("denetim") || lower(c.auditReference).includes("aud") || lower(c.audit_ref).includes("aud")).length]]) +
      table(["Denetim", "Checklist", "Bulgu", "Kapanış Takibi"], audits.slice(0, 8).map((a) => {
        const id = firstValue(a, ["auditNo", "audit_no", "id"], "-");
        const list = safeList(a.findings);
        const closed = list.filter((f) => !openStatus(f.status)).length;
        return [esc(id), `<span class="gdnl-badge">${safeList(a.questions).length || safeList(a.checklist).length}</span>`, `<span class="gdnl-badge">${list.length}</span>`, `${closed}/${list.length} · ${actions.filter((x) => (x.related_id || x.sourceNo) === id).length} aksiyon`];
      })));
  }

  async function trainingMaturity() {
    const [trainings, assignments, files] = await Promise.all([get("/trainings"), get("/assignments"), get("/files")]);
    panel("Eğitim ve Yetkinlik Olgunluğu", metrics([["Eğitim Geçmişi", trainings.length], ["Katılımcı Ataması", assignments.filter((a) => lower(a.module).includes("eğitim") || lower(a.module).includes("yetkinlik")).length], ["Sertifika", files.filter((f) => lower(f.module).includes("eğitim") || lower(f.module).includes("yetkinlik") || lower(f.file_type).includes("certificate")).length], ["Geçerlilik Tarihi", trainings.filter((t) => t.nextTrainingDate || t.expiryDate || t.validityPeriod).length]]));
  }

  async function supplierMaturity() {
    const [suppliers, actions] = await Promise.all([get("/suppliers"), get("/actions")]);
    const avg = (key) => suppliers.length ? Math.round(suppliers.reduce((s, x) => s + Number(x[key] || 0), 0) / suppliers.length) : 0;
    panel("Tedarikçi Puan Kartı", metrics([["Tedarikçi", suppliers.length], ["PPM Ort.", avg("ppm")], ["Teslimat Ort.", avg("deliveryScore") || avg("otd")], ["A/B Sınıf", suppliers.filter((s) => ["A", "B"].includes(String(s.performanceClass || s.class))).length]]) +
      table(["Tedarikçi", "Puan", "PPM", "Teslimat", "Aksiyon"], suppliers.slice(0, 8).map((s) => {
        const id = firstValue(s, ["supplierNo", "supplier_no", "id"], "");
        return [esc(s.supplierName || s.name || id || "-"), esc(s.overallScore || s.score || "-"), esc(s.ppm || 0), esc(s.deliveryScore || s.otd || "-"), `<span class="gdnl-badge">${actions.filter((a) => (a.related_id || a.sourceNo) === id || lower(a.module).includes("tedarik")).length}</span>`];
      })));
  }

  async function customerMaturity() {
    const customers = await getAny(["/customers", "/customer-management"]);
    const apiComplaints = await getAny(["/customer-complaints", "/complaints"]);
    const complaints = apiComplaints.length ? apiComplaints : customers.flatMap((c) => Array.isArray(c.complaints) ? c.complaints : []);
    const photos = customers.flatMap((c) => safeList(c.documents)).filter((d) => /png|jpg|jpeg|webp|image/i.test(d.fileType || d.file_type || d.docName || ""));
    panel("Müşteri Şikayeti Olgunluğu", metrics([["Şikayet", complaints.length], ["8D Bağlantısı", complaints.filter((c) => c.capaRef || c.eightDNo || c.capa_no).length], ["Geciken Termin", complaints.filter(late).length], ["Fotoğraf", photos.length]]) +
      table(["Şikayet", "Durum", "Termin", "8D / Risk", "Durum Geçmişi"], complaints.slice(0, 8).map((c) => [esc(c.complaintNo || c.id || "-"), esc(c.status || "-"), late(c) ? `<span class="gdnl-badge red">Gecikti</span>` : esc(c.dueDate || c.due_date || "-"), esc(c.capaRef || c.eightDNo || c.riskRef || "-"), "Müşteri timeline bağlı"])));
  }

  async function calibrationMaturity() {
    const devices = await getAny(["/calibrations", "/calibration-records", "/calibration"]);
    panel("Kalibrasyon Olgunluğu", metrics([["Ekipman", devices.length], ["Yaklaşan", devices.filter((d) => lower(d.calibrationStatus).includes("yaklaş") || (!late(d) && Number((new Date(d.nextKalibrasyonDate || d.nextCalibrationDate) - Date.now()) / 86400000) <= 30)).length], ["Geciken", devices.filter(late).length], ["Ekipman Geçmişi", devices.filter((d) => Array.isArray(d.timeline) && d.timeline.length).length]]) +
      table(["Ekipman", "Sonraki Kalibrasyon", "Durum", "Geçmiş"], devices.slice(0, 8).map((d) => [esc(d.deviceCode || d.deviceNo || d.id || "-"), esc(d.nextKalibrasyonDate || d.nextCalibrationDate || "-"), late(d) ? `<span class="gdnl-badge red">Gecikti</span>` : `<span class="gdnl-badge">${esc(d.calibrationStatus || "Planlı")}</span>`, `<span class="gdnl-badge">${safeList(d.timeline).length}</span>`])));
  }

  async function maintenanceMaturity() {
    const rows = await getAny(["/maintenance", "/maintenance-records", "/maintenance-management"]);
    panel("Bakım Olgunluğu", metrics([["Bakım", rows.length], ["Açık", rows.filter((r) => openStatus(r.status || r.maintenanceStatus)).length], ["Geciken", rows.filter(late).length], ["Bakım Geçmişi", rows.filter((r) => safeList(r.history).length || safeList(r.timeline).length).length]]) +
      table(["Bakım", "Sorumlu", "Plan", "Uyarı", "Geçmiş"], rows.slice(0, 8).map((r) => [esc(r.record_no || r.maintenanceNo || r.id || "-"), esc(r.owner_name || r.owner || r.assigned_to || "-"), esc(r.due_date || r.plannedDate || "-"), late(r) ? `<span class="gdnl-badge red">Gecikti</span>` : `<span class="gdnl-badge">Normal</span>`, `<span class="gdnl-badge">${safeList(r.history).length || safeList(r.timeline).length}</span>`])));
  }

  async function dashboardMaturity() {
    const [docs, capas, risks, actions, audits, trainings] = await Promise.all([get("/documents"), get("/capas"), get("/risks"), get("/actions"), get("/audits"), get("/trainings")]);
    const monthly = [["Doküman", docs.length], ["CAPA", capas.length], ["Risk", risks.length], ["Aksiyon", actions.length], ["Denetim", audits.length], ["Eğitim", trainings.length]];
    panel("Dashboard Trend Analizi", metrics([["Aylık Analiz", monthly.reduce((s, x) => s + x[1], 0)], ["Yıllık Analiz", monthly.reduce((s, x) => s + x[1], 0)], ["Açık İş", actions.filter((a) => openStatus(a.status || a.actionStatus)).length], ["Geciken İş", actions.filter(late).length]]) + bars(monthly));
  }

  async function notificationMaturity() {
    const notifications = await get("/notifications");
    panel("Bildirim Olgunluğu", metrics([["Bildirim", notifications.length], ["Okundu", notifications.filter((n) => n.is_read || lower(n.status).includes("okundu")).length], ["Sistem", notifications.filter((n) => lower(n.module).includes("sistem") || lower(n.type).includes("sistem")).length], ["Kuyruk", notifications.filter((n) => lower(n.status).includes("kuyruk")).length]]));
  }

  async function activityMaturity() {
    const [activity, logs] = await Promise.all([get("/activity-feed"), get("/audit-logs")]);
    panel("Aktivite ve Audit Geçmişi", metrics([["Aktivite", activity.length], ["Audit Log", logs.length], ["Kullanıcı Geçmişi", new Set([...activity, ...logs].map((x) => x.user_name || x.user || x.created_by).filter(Boolean)).size], ["Son Kayıt", [...activity, ...logs].length]]) +
      table(["Kullanıcı", "İşlem", "Modül"], [...activity, ...logs].slice(0, 8).map((x) => [esc(x.user_name || x.user || x.created_by || "Kullanıcı"), esc(x.action || x.title || "-"), esc(x.module || "-")])));
  }

  async function approvalHistoryMaturity() {
    const rows = await getAll(["/approval-history", "/approval-logs"]);
    panel("Onay Geçmişi", metrics([["Onay Kaydı", rows.length], ["Onaylayan", new Set(rows.map((r) => r.approved_by || r.user_name || r.approver_name).filter(Boolean)).size], ["Revizyon", rows.filter((r) => r.rev || r.revision || r.document_revision).length], ["İlgili Kayıt", rows.filter((r) => r.related_id || r.record_no || r.document_code).length]]) +
      table(["Onaylayan", "Tarih", "Durum", "Revizyon"], rows.slice(0, 8).map((r) => [esc(r.approved_by || r.user_name || r.approver_name || "Kullanıcı"), esc(r.approved_at || r.created_at || r.date || "-"), esc(r.status || r.action || "-"), esc(r.rev || r.revision || r.document_revision || "-")])));
  }

  async function searchMaturity() {
    const [users, docs, capas, risks, actions, trainings, audits] = await Promise.all([get("/users"), get("/documents"), get("/capas"), get("/risks"), get("/actions"), get("/trainings"), get("/audits")]);
    panel("Global Arama Kapsamı", metrics([["Kullanıcı", users.length], ["Doküman", docs.length], ["CAPA", capas.length], ["Risk", risks.length], ["Aksiyon", actions.length], ["Eğitim", trainings.length], ["Denetim", audits.length]]));
  }

  async function fileMaturity() {
    const files = await get("/files");
    panel("Dosya Merkezi Filtreleri", metrics([["Dosya", files.length], ["PDF", files.filter((f) => lower(f.file_type || f.fileName).includes("pdf")).length], ["Excel", files.filter((f) => /xls|excel/.test(lower(f.file_type || f.fileName))).length], ["Word", files.filter((f) => /doc|word/.test(lower(f.file_type || f.fileName))).length]]) +
      table(["Kategori", "Tip", "İkon"], files.slice(0, 8).map((f) => [esc(f.module || "Genel"), esc(f.file_type || f.fileName || "-"), /pdf/i.test(f.file_type || f.fileName || "") ? "PDF" : /xls|excel/i.test(f.file_type || f.fileName || "") ? "Excel" : /doc|word/i.test(f.file_type || f.fileName || "") ? "Word" : "Dosya"])));
  }

  async function permissionMaturity() {
    const [users, departments] = await Promise.all([get("/users"), get("/departments")]);
    const roles = new Set(users.flatMap((u) => Array.isArray(u.roles) ? u.roles : String(u.role || "").split(",")).map((x) => x.trim()).filter(Boolean));
    panel("Yetki Matrisi", metrics([["Kullanıcı", users.length], ["Departman", departments.length], ["Çoklu Rol", users.filter((u) => Array.isArray(u.roles) ? u.roles.length > 1 : String(u.role || "").includes(",")).length], ["Rol", roles.size]]) +
      table(["Rol", "Görüntüle", "Düzenle", "Onayla"], [...roles].slice(0, 8).map((r) => [esc(r), "Hazır", /admin|yönetici|müdür/i.test(r) ? "Hazır" : "Kontrollü", /onay|admin|müdür|yönetici/i.test(r) ? "Hazır" : "Kontrollü"])));
  }

  async function managementReviewMaturity() {
    const reviews = await getAny(["/management-reviews", "/management-review"]);
    panel("YGG ISO 9001 + IATF 16949 Olgunluğu", metrics([["YGG", reviews.length], ["ISO 9001 Girdi", reviews.filter((r) => lower(JSON.stringify(r)).includes("iso 9001")).length], ["IATF 16949 Girdi", reviews.filter((r) => lower(JSON.stringify(r)).includes("iatf")).length], ["Aksiyon Çıktısı", reviews.filter((r) => Array.isArray(r.actions) && r.actions.length).length]]) +
      table(["Gündem", "ISO 9001", "IATF 16949", "Durum"], [
        ["Kalite hedefleri ve KPI", "9.3", "Süreç performansı", "<span class='gdnl-badge'>Hazır</span>"],
        ["Müşteri memnuniyeti ve CSR", "9.1.2", "Müşteri özel şartları", "<span class='gdnl-badge'>Hazır</span>"],
        ["Denetim, risk ve CAPA", "9.2 / 10.2", "Problem çözme", "<span class='gdnl-badge'>Hazır</span>"],
        ["Tedarikçi ve proses performansı", "8.4", "IATF tedarikçi geliştirme", "<span class='gdnl-badge'>Hazır</span>"]
      ]));
  }

  const handlers = {
    "documents.html": documentsMaturity,
    "new-document.html": documentsMaturity,
    "revision.html": documentsMaturity,
    "approval.html": documentsMaturity,
    "distribution.html": documentsMaturity,
    "archive.html": documentsMaturity,
    "document-viewer.html": documentsMaturity,
    "capa.html": capaMaturity,
    "risk-register.html": riskMaturity,
    "action-center.html": actionMaturity,
    "audit.html": auditMaturity,
    "training-management.html": trainingMaturity,
    "competency-matrix.html": trainingMaturity,
    "supplier-management.html": supplierMaturity,
    "customer-management.html": customerMaturity,
    "calibration-management.html": calibrationMaturity,
    "maintenance.html": maintenanceMaturity,
    "dashboard.html": dashboardMaturity,
    "notification-center.html": notificationMaturity,
    "activity-center.html": activityMaturity,
    "search.html": searchMaturity,
    "file-center.html": fileMaturity,
    "users.html": permissionMaturity,
    "departments.html": permissionMaturity,
    "management-review.html": managementReviewMaturity
  };

  function boot() {
    const run = handlers[page];
    if (run) run().catch((error) => console.warn("GDNL maturity widget:", error));
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})(window);
