;(function(){
  "use strict";
  const api = window.GDNL_API;
  const page = location.pathname.split("/").pop() || "management-dashboard.html";
  const nav = [
    ["management-dashboard.html","Yönetim Dashboard"],
    ["management-board.html","Yönetim Kurulu"],
    ["management-decisions.html","Kararlar"],
    ["management-kpi.html","Stratejik KPI"],
    ["management-goals.html","Hedefler"],
    ["management-budget.html","Bütçe & Yatırım"],
    ["management-workforce.html","İnsan Kaynağı Özeti"],
    ["management-projects.html","Stratejik Projeler"],
    ["management-reports.html","Rapor Merkezi"],
    ["management-calendar.html","Yönetim Takvimi"],
    ["management-organization.html","Organizasyon"],
    ["management-policies.html","Politikalar"],
    ["mailbox.html","📨 Mesaj Merkezi"],
    ["department-gateway.html","Departman Merkezi"]
  ];
  const configs = {
    "management-dashboard.html": {
      title:"Yönetim Dashboard",
      desc:"CEO / Genel Müdür için şirketin genel durum ekranı.",
      metrics:["Açık aksiyonlar","Geciken aksiyonlar","Kritik riskler","Açık CAPA","Açık müşteri şikayetleri","Yaklaşan denetimler","Yaklaşan kalibrasyonlar","Eğitim tamamlama oranı","Tedarikçi performansı"],
      summary:"Bugün dikkat edilmesi gerekenler",
      rows:["Departman bazlı genel durum","Son yönetim kararları","Yaklaşan toplantılar","Mesaj Merkezi son bildirimleri"],
      formTitle:"Yönetim notu hazırlığı",
      fields:["Başlık","Açıklama","Sorumlu Kişi","İlgili Departman","Öncelik","Ek Dosya"]
    },
    "management-board.html": {
      title:"Yönetim Kurulu Toplantıları",
      desc:"Yönetim Kurulu / Üst Yönetim toplantılarını yönetmek.",
      metrics:["Planlanan toplantı","Açık gündem","Alınan karar","Bekleyen aksiyon"],
      summary:"Toplantı gündemi",
      rows:["Toplantı no","Toplantı adı","Tarih / saat","Katılımcılar","Gündem maddeleri","Kararlar","Aksiyonlar","Sorumlular","Termin","Toplantı durumu","Approval History"],
      formTitle:"Yeni toplantı oluştur",
      fields:["Toplantı No","Toplantı Adı","Tarih","Saat","Katılımcılar","Gündem Maddeleri","Kararlar","Aksiyonlar","Sorumlular","Termin","Toplantı Durumu","Ek Dosya","Toplantı Notları"]
    },
    "management-decisions.html": {
      title:"Karar Takip Sistemi",
      desc:"Yönetim kararlarını kayıt altına almak ve takip etmek.",
      metrics:["Taslak","Onaylandı","Uygulamada","Gecikti","Kapatıldı"],
      summary:"Karar takip görünümü",
      rows:["Karar no","Karar konusu","Karar açıklaması","Karar tarihi","Kararı alan kurul/kişi","Sorumlu kişi","İlgili departman","Termin","Durum","Öncelik","Bağlı aksiyon","Kapanış açıklaması","Approval History"],
      formTitle:"Karar kaydı hazırlığı",
      fields:["Karar No","Karar Konusu","Karar Açıklaması","Karar Tarihi","Kararı Alan Kurul/Kişi","Sorumlu Kişi","İlgili Departman","Termin","Durum","Öncelik","Bağlı Aksiyon","Ek Dosya","Kapanış Açıklaması"]
    },
    "management-kpi.html": {
      title:"Stratejik KPI",
      desc:"Üst yönetim KPI takibini yapmak.",
      metrics:["OTD","PPM","Hurda oranı","Açık CAPA","Geciken aksiyon","Müşteri şikayeti","Eğitim tamamlama oranı","Tedarikçi performansı","Risk seviyesi","Denetim bulguları"],
      summary:"Hedef / gerçekleşen karşılaştırması",
      rows:["KPI adı","Hedef","Gerçekleşen","Sapma","Trend","Sorumlu departman","Sorumlu kişi","Açıklama"],
      formTitle:"KPI güncelleme hazırlığı",
      fields:["KPI Adı","Hedef","Gerçekleşen","Sapma","Trend","Sorumlu Departman","Sorumlu Kişi","Açıklama"]
    },
    "management-goals.html": {
      title:"Hedef Yönetimi",
      desc:"Yıllık ve aylık şirket hedeflerini yönetmek.",
      metrics:["Yıllık hedef","Aylık hedef","Gerçekleşme","Geciken hedef"],
      summary:"Hedef takip görünümü",
      rows:["Hedef adı","Hedef tipi","Yıllık hedef","Aylık hedef","Gerçekleşme","Sorumlu departman","Sorumlu kişi","Termin","Durum","Bağlı KPI","Bağlı aksiyon"],
      formTitle:"Hedef kaydı hazırlığı",
      fields:["Hedef Adı","Hedef Tipi","Yıllık Hedef","Aylık Hedef","Gerçekleşme","Sorumlu Departman","Sorumlu Kişi","Termin","Durum","Bağlı KPI","Bağlı Aksiyon"]
    },
    "management-budget.html": {
      title:"Bütçe ve Yatırım Özeti",
      desc:"Yönetim seviyesinde bütçe ve yatırım takibi.",
      metrics:["Toplam bütçe","Harcanan","Kalan","Sapma","Kritik yatırım"],
      summary:"Bütçe özeti",
      rows:["Bütçe kalemi","Yatırım projesi","Planlanan bütçe","Gerçekleşen harcama","Sapma","Sorumlu departman","Sorumlu kişi","Durum","Açıklama"],
      formTitle:"Bütçe kalemi hazırlığı",
      fields:["Bütçe Kalemi","Yatırım Projesi","Planlanan Bütçe","Gerçekleşen Harcama","Sapma","Sorumlu Departman","Sorumlu Kişi","Durum","Açıklama","Ek Dosya"]
    },
    "management-workforce.html": {
      title:"İnsan Kaynağı Özeti",
      desc:"CEO / Yönetim için insan kaynağı genel durumu.",
      metrics:["Toplam çalışan","Departman dağılımı","Açık pozisyonlar","Oryantasyon durumu","Eğitim tamamlama oranı","Kritik yetkinlik eksikleri","Ayrılış trendi","Devamsızlık/izin özeti"],
      summary:"İnsan kaynağı yönetim özeti",
      rows:["Departman dağılımı","Kritik yetkinlik eksikleri","Oryantasyon durumu","Eğitim tamamlanma oranı"],
      formTitle:"İnsan kaynağı aksiyon hazırlığı",
      fields:["Başlık","Sorumlu Departman","Sorumlu Kişi","Termin","Durum","Açıklama"]
    },
    "management-projects.html": {
      title:"Stratejik Proje Takibi",
      desc:"Yönetim seviyesinde stratejik proje ve APQP özetlerini takip etmek.",
      metrics:["Açık stratejik proje","Geciken proje","APQP proje özeti","Yatırım projesi","Risk seviyesi"],
      summary:"Proje portföyü",
      rows:["Proje türü","Sorumlu kişiler","Durum","Termin","Risk seviyesi","Bağlı aksiyonlar"],
      formTitle:"Proje özeti hazırlığı",
      fields:["Proje Adı","Proje Türü","Sorumlu Kişiler","Durum","Termin","Risk Seviyesi","Bağlı Aksiyonlar","Açıklama"]
    },
    "management-reports.html": {
      title:"Yönetim Rapor Merkezi",
      desc:"Yönetim için rapor merkezi.",
      metrics:["Yönetim özeti","KPI raporu","CAPA raporu","Risk raporu","Audit raporu","Eğitim raporu","Tedarikçi raporu","Müşteri şikayeti raporu","YGG raporu"],
      summary:"Rapor hazırlığı",
      rows:["PDF export hazırlığı","Excel export hazırlığı","Tarih aralığı filtresi","Departman filtresi","Rapor açıklaması"],
      formTitle:"Rapor talebi hazırlığı",
      fields:["Rapor Türü","Başlangıç Tarihi","Bitiş Tarihi","Departman","Rapor Açıklaması"]
    },
    "management-calendar.html": {
      title:"Yönetim Takvimi",
      desc:"Yönetim takvimini merkezi göstermek.",
      metrics:["Yönetim toplantıları","YGG","Denetimler","Kritik aksiyon terminleri","CAPA terminleri","Eğitim tarihleri","Kalibrasyon uyarıları","Proje kilometre taşları"],
      summary:"Yaklaşan tarihler",
      rows:["Günlük görünüm hazırlığı","Haftalık görünüm hazırlığı","Aylık görünüm hazırlığı","Termin yaklaşma uyarısı","Mesaj Merkezi hatırlatma hazırlığı"],
      formTitle:"Takvim kaydı hazırlığı",
      fields:["Etkinlik Adı","Etkinlik Tipi","Tarih","Saat","Sorumlu Kişi","İlgili Departman","Açıklama"]
    },
    "management-organization.html": {
      title:"Organizasyon Şeması",
      desc:"Şirket organizasyon yapısını yönetim seviyesinde göstermek.",
      metrics:["Yönetim Kurulu Başkanı","CEO / Genel Müdür","Fabrika Müdürü","Direktörler","Departman Müdürleri","Süreç Liderleri"],
      summary:"Organizasyon görünümü",
      rows:["users ve departments verisinden beslenir","Görev tanımı bağlantısı hazırlığı","Departman merkezine bağlantı","Boş veride nötr durum"],
      formTitle:"Organizasyon bağlantısı hazırlığı",
      fields:["Rol / Ünvan","Kullanıcı","Departman","Görev Tanımı Bağlantısı","Açıklama"]
    },
    "management-policies.html": {
      title:"Kurumsal Politika Merkezi",
      desc:"Üst yönetim politikalarını tek merkezde göstermek.",
      metrics:["Kalite Politikası","Çevre Politikası","İSG Politikası","Enerji Politikası","Bilgi Güvenliği Politikası","Müşteri Memnuniyeti Politikası","Etik ve Uyum Politikası"],
      summary:"Politika görünümü",
      rows:["Doküman yönetimi bağlantı hazırlığı","Onay geçmişi","Revizyon bilgisi","R2 dosya görüntüleme hazırlığı"],
      formTitle:"Politika görünümü hazırlığı",
      fields:["Politika Adı","Revizyon","Onay Durumu","İlgili Doküman","Sorumlu Kişi","Açıklama","Ek Dosya"]
    }
  };
  const config = configs[page] || configs["management-dashboard.html"];
  let users = [];
  let departments = [];
  function esc(value){return String(value||"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
  function optionList(items,type){return items.map(item=>{const u=type==="user"?api.normalizeUser(item):item;const label=type==="user"?(u.fullname||u.username||"Kullanıcı"):(item.department_name||item.name||item.department||"");const value=type==="user"?(u.id||u.username||label):(item.id||label);return label?`<option value="${esc(value)}">${esc(label)}</option>`:""}).join("")}
  function inputFor(name){const key=name.toLocaleLowerCase("tr-TR");if(key.includes("kişi")||key.includes("katılımcı")||key.includes("sorumlu")||key.includes("kurul"))return `<select multiple data-field="${esc(name)}">${optionList(users,"user")}</select>`;if(key.includes("departman"))return `<select data-field="${esc(name)}"><option value="">Departman seç</option>${optionList(departments,"department")}</select>`;if(key.includes("tarih")||key.includes("termin")||key.includes("başlangıç")||key.includes("bitiş"))return `<input type="date" data-field="${esc(name)}">`;if(key.includes("saat"))return `<input type="time" data-field="${esc(name)}">`;if(key.includes("ek dosya"))return `<input type="file" id="managementFile">`;if(key.includes("açıklama")||key.includes("not")||key.includes("gündem")||key.includes("karar")||key.includes("aksiyon"))return `<textarea data-field="${esc(name)}"></textarea>`;return `<input data-field="${esc(name)}">`}
  function renderShell(){document.title="GDNL EOS | "+config.title;document.getElementById("managementNav").innerHTML=nav.map(([href,label])=>`<a class="${href===page?"active":""}" href="${href}">${esc(label)}</a>`).join("");document.getElementById("pageTitle").textContent=config.title;document.getElementById("pageDesc").textContent=config.desc;document.getElementById("metricCards").innerHTML=config.metrics.map((m,i)=>`<article class="card"><small>${esc(m)}</small><h2 data-metric="${i}">0</h2><span class="badge ${i%5===1?"warn":i%5===2?"danger":""}">Hazır</span></article>`).join("");document.getElementById("summaryTitle").textContent=config.summary;document.getElementById("summaryList").innerHTML=config.rows.map(row=>`<div class="row">${esc(row)}</div>`).join("");document.getElementById("formTitle").textContent=config.formTitle;document.getElementById("managementForm").innerHTML=config.fields.map(f=>`<div class="field ${f.includes("Açıklama")||f.includes("Not")||f.includes("Gündem")?"full":""}"><label>${esc(f)}</label>${inputFor(f)}</div>`).join("")}
  function setMetric(index,value){const el=document.querySelector(`[data-metric="${index}"]`);if(el)el.textContent=String(value)}
  async function loadData(){const safeApi={redirectOnUnauthorized:false};try{users=await api.loadUsers(safeApi)}catch(e){users=[]}try{departments=await api.loadDepartments(safeApi)}catch(e){departments=[]}renderShell();try{const [actions,risks,capa,notifications]=await Promise.allSettled([api.get("/actions",safeApi),api.get("/risks",safeApi),api.get("/capa",safeApi),api.get("/notifications",safeApi)]);const actionRows=actions.status==="fulfilled"?api.asArray(actions.value):[];const riskRows=risks.status==="fulfilled"?api.asArray(risks.value):[];const capaRows=capa.status==="fulfilled"?api.asArray(capa.value):[];const notificationRows=notifications.status==="fulfilled"?api.asArray(notifications.value):[];setMetric(0,actionRows.length);setMetric(1,actionRows.filter(x=>String(x.status||"").toLocaleLowerCase("tr-TR").includes("gec")).length);setMetric(2,riskRows.filter(x=>Number(x.rpn||x.risk_score||0)>=200).length);setMetric(3,capaRows.length);if(page==="management-dashboard.html"){document.getElementById("summaryList").innerHTML=(notificationRows.slice(0,4).map(n=>`<div class="row">${esc(n.title||n.message||"Mesaj Merkezi bildirimi")}</div>`).join("")||'<div class="empty">Sistemde henüz yönetim verisi bulunmuyor.</div>')}}catch(e){document.getElementById("summaryList").innerHTML+='<div class="empty">Sistemde henüz yönetim verisi bulunmuyor.</div>'}}
  async function uploadIfNeeded(){const file=document.getElementById("managementFile")?.files?.[0];if(!file)return null;return api.uploadToR2(file,{module:"YONETIM_SUITE",related_module:page,uploaded_by:window.GDNL_CURRENT_USER?.fullname||window.GDNL_CURRENT_USER?.username||"Kullanıcı"})}
  async function log(action,payload){const body={module:"Yönetim Suite",related_module:page,action,description:config.title,user_id:window.GDNL_CURRENT_USER?.id||"",user_name:window.GDNL_CURRENT_USER?.fullname||window.GDNL_CURRENT_USER?.username||"Kullanıcı",payload,created_at:new Date().toISOString()};api.post("/activity-feed",body).catch(()=>{});api.post("/audit-logs",body).catch(()=>{})}
  async function saveDraft(){const payload={page,title:config.title,fields:{},created_at:new Date().toISOString()};document.querySelectorAll("[data-field]").forEach(el=>{payload.fields[el.dataset.field]=el.multiple?Array.from(el.selectedOptions).map(o=>o.value):el.value});try{payload.attachment=await uploadIfNeeded()}catch(e){}await log(config.formTitle,payload);api.showToast("Yönetim kaydı hazırlandı")}
  function messagePrep(){api.showToast("Mesaj Merkezi bilgilendirme hazırlığı tamam");api.post("/notifications",{type:"message",related_module:"management",related_record_id:page,title:config.title,message:"Yönetim bilgilendirme hazırlığı",is_read:false,created_at:new Date().toISOString()}).catch(()=>{})}
  window.managementSaveDraft=saveDraft;window.managementMessagePrep=messagePrep;window.managementLogout=function(){api?.logout?api.logout():window.location.href="index.html"};
  loadData();
})();
