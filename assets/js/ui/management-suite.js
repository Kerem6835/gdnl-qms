;(function(){
  "use strict";
  const api = window.GDNL_API;
  const suite = {
  "name": "Yönetim Suite",
  "prefix": "management",
  "home": "management-dashboard.html",
  "navId": "managementNav",
  "formId": "managementForm",
  "fileId": "managementFile",
  "endpoints": [
    "/actions",
    "/risks",
    "/capa",
    "/notifications"
  ],
  "fileCategories": [
    "Yönetim Raporu",
    "Toplantı Dosyası",
    "Karar Eki",
    "Bütçe Eki",
    "Politika",
    "Sunum",
    "Diğer"
  ],
  "nav": [
    [
      "management-dashboard.html",
      "Yönetim Dashboard"
    ],
    [
      "management-board.html",
      "Yönetim Kurulu"
    ],
    [
      "management-decisions.html",
      "Kararlar"
    ],
    [
      "management-kpi.html",
      "Stratejik KPI"
    ],
    [
      "management-goals.html",
      "Hedefler"
    ],
    [
      "management-budget.html",
      "Bütçe & Yatırım"
    ],
    [
      "management-workforce.html",
      "İnsan Kaynağı Özeti"
    ],
    [
      "management-projects.html",
      "Stratejik Projeler"
    ],
    [
      "management-reports.html",
      "Rapor Merkezi"
    ],
    [
      "management-calendar.html",
      "Yönetim Takvimi"
    ],
    [
      "management-organization.html",
      "Organizasyon"
    ],
    [
      "management-policies.html",
      "Politikalar"
    ],
    [
      "mailbox.html",
      "📨 Mesaj Merkezi"
    ],
    [
      "department-gateway.html",
      "Departman Merkezi"
    ]
  ],
  "configs": {
    "management-dashboard.html": {
      "title": "Yönetim Ana Paneli",
      "desc": "Stratejik hedefler, KPI, kararlar, riskler ve yönetim aksiyonları tek ekranda izlenir.",
      "metrics": [
        "Stratejik hedef",
        "KPI sapması",
        "Bekleyen karar",
        "Açık yönetim aksiyonu",
        "Kritik risk",
        "YGG başlığı",
        "Son faaliyet",
        "Hızlı geçiş"
      ],
      "summaryTitle": "Bugün yönetimin dikkat etmesi gerekenler",
      "process": [
        "Stratejik hedef özetini gözden geçir",
        "Bekleyen kararları ve onayları takip et",
        "Risk / uygunsuzluk / YGG özetlerini izle",
        "Son faaliyet ve mesaj bildirimlerini kontrol et"
      ],
      "formTitle": "Yönetim aksiyonu hazırlığı",
      "fields": [
        "Başlık",
        "Sorumlu Kişi",
        "İlgili Departman",
        "Öncelik",
        "Durum",
        "Termin",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Yönetim aksiyonu bekliyor",
          "description": "Onay bekleyen üst yönetim kararı",
          "status": "Bekliyor",
          "priority": "Yüksek"
        }
      ]
    },
    "management-board.html": {
      "title": "Yönetim Kurulu Toplantıları",
      "desc": "Gündem, katılımcı, karar, aksiyon ve toplantı dosyaları yönetilir.",
      "metrics": [
        "Planlanan toplantı",
        "Açık gündem",
        "Karar kaydı",
        "Aksiyon atama",
        "Dosya eki"
      ],
      "summaryTitle": "Toplantı akışı",
      "process": [
        "Toplantı no ve adı oluştur",
        "Katılımcıları /users üzerinden seç",
        "Gündem maddelerini ve kararları kaydet",
        "Aksiyonları sorumlu ve termin ile bağla",
        "Toplantı dosyalarını R2 standardıyla ekle"
      ],
      "formTitle": "Yeni toplantı kaydı",
      "fields": [
        "Toplantı No",
        "Toplantı Adı",
        "Tarih",
        "Saat",
        "Katılımcılar",
        "Gündem Maddeleri",
        "Kararlar",
        "Aksiyonlar",
        "Sorumlu Kişi",
        "Termin",
        "Durum",
        "Ek Dosya",
        "Toplantı Notları"
      ]
    },
    "management-decisions.html": {
      "title": "Karar Takip Sistemi",
      "desc": "Yönetim kararları gecikme, etki alanı, sorumlu ve kapanış geçmişiyle takip edilir.",
      "metrics": [
        "Taslak",
        "Onaylandı",
        "Uygulamada",
        "Gecikti",
        "Kapatıldı"
      ],
      "summaryTitle": "Karar yaşam döngüsü",
      "process": [
        "Karar no ve konu oluştur",
        "Sorumlu ve etki alanını belirle",
        "Termin ve gecikme göstergesini izle",
        "Karar geçmişini ve kapanışı kaydet"
      ],
      "formTitle": "Karar kaydı",
      "fields": [
        "Karar No",
        "Konu",
        "Karar Açıklaması",
        "Sorumlu Kişi",
        "İlgili Departman",
        "Etki Alanı",
        "Termin",
        "Öncelik",
        "Durum",
        "Gecikme Göstergesi",
        "Karar Geçmişi",
        "Ek Dosya"
      ]
    },
    "management-kpi.html": {
      "title": "Stratejik KPI Yönetimi",
      "desc": "Hedef / gerçekleşen, sapma, trend, sorumlu departman ve aksiyon bağlantısı izlenir.",
      "metrics": [
        "OTD",
        "PPM",
        "Hurda oranı",
        "Açık CAPA",
        "Geciken aksiyon",
        "Trend"
      ],
      "summaryTitle": "KPI takip modeli",
      "process": [
        "KPI tanımını ve periyodu belirle",
        "Hedef ve gerçekleşen değerleri gir",
        "Sapma ve trendi değerlendir",
        "Sorumlu departman ve aksiyon bağlantısını oluştur"
      ],
      "formTitle": "KPI tanımı",
      "fields": [
        "KPI Adı",
        "Hedef Değer",
        "Gerçekleşen Değer",
        "Sapma",
        "Trend",
        "Sorumlu Departman",
        "Sorumlu Kişi",
        "Periyot",
        "Bağlı Aksiyon",
        "Durum",
        "Açıklama"
      ]
    },
    "management-goals.html": {
      "title": "Şirket Hedefleri",
      "desc": "SMART hedef yapısı, hedef sahibi, tarih aralığı, KPI ve aksiyon planı yönetilir.",
      "metrics": [
        "Yıllık hedef",
        "Aylık hedef",
        "Gerçekleşme",
        "Geciken hedef",
        "Bağlı KPI"
      ],
      "summaryTitle": "SMART hedef yapısı",
      "process": [
        "Hedefin ölçülebilir tanımını yaz",
        "Hedef sahibi ve departmanı ata",
        "Başlangıç / bitiş tarihini belirle",
        "KPI bağlantısı ve aksiyon planı oluştur"
      ],
      "formTitle": "Hedef kaydı",
      "fields": [
        "Hedef Adı",
        "SMART Açıklama",
        "Hedef Sahibi",
        "Sorumlu Departman",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Durum",
        "Bağlı KPI",
        "Aksiyon Planı",
        "Öncelik",
        "Ek Dosya"
      ]
    },
    "management-budget.html": {
      "title": "Bütçe ve Yatırım Talepleri",
      "desc": "Yatırım konusu, tahmini maliyet, ROI, onay durumu ve ek dosyalar yönetilir.",
      "metrics": [
        "Talep",
        "Onay bekleyen",
        "Tahmini maliyet",
        "ROI takibi",
        "Dosya eki"
      ],
      "summaryTitle": "Bütçe karar akışı",
      "process": [
        "Yatırım konusunu ve gerekçesini yaz",
        "Tahmini maliyet ve geri dönüşü belirle",
        "Onay durumunu takip et",
        "Destek dosyalarını ekle"
      ],
      "formTitle": "Bütçe / yatırım talebi",
      "fields": [
        "Yatırım Konusu",
        "Tahmini Maliyet",
        "Geri Dönüş / ROI",
        "Sorumlu Kişi",
        "Sorumlu Departman",
        "Onay Durumu",
        "Öncelik",
        "Açıklama",
        "Ek Dosya"
      ]
    },
    "management-workforce.html": {
      "title": "İnsan Kaynağı Üst Yönetim Özeti",
      "desc": "Kadro ihtiyacı, kritik pozisyonlar, devamsızlık, eğitim ve performans özetleri izlenir.",
      "metrics": [
        "Toplam kadro",
        "Kritik pozisyon",
        "Kadro ihtiyacı",
        "Devamsızlık",
        "Eğitim oranı",
        "Performans özeti"
      ],
      "summaryTitle": "İnsan kaynağı yönetim görünümü",
      "process": [
        "Kadro ihtiyacını analiz et",
        "Kritik pozisyonları belirle",
        "Devamsızlık ve izin özetini izle",
        "Eğitim / performans bağlantısını kur"
      ],
      "formTitle": "İnsan kaynağı yönetim notu",
      "fields": [
        "Başlık",
        "Kritik Pozisyon",
        "Sorumlu Kişi",
        "Sorumlu Departman",
        "Durum",
        "Termin",
        "Açıklama",
        "Ek Dosya"
      ]
    },
    "management-projects.html": {
      "title": "Stratejik Projeler",
      "desc": "Proje fazları, sorumlular, bütçe, risk, termin ve ilerleme oranı takip edilir.",
      "metrics": [
        "Açık proje",
        "Geciken proje",
        "Bütçe riski",
        "Kritik risk",
        "İlerleme"
      ],
      "summaryTitle": "Proje portföy akışı",
      "process": [
        "Proje türünü ve fazını seç",
        "Sorumluları ve terminleri ata",
        "Bütçe ve risk durumunu izle",
        "İlerleme oranı ve bağlı aksiyonları güncelle"
      ],
      "formTitle": "Stratejik proje kaydı",
      "fields": [
        "Proje Adı",
        "Proje Fazı",
        "Sorumlu Kişiler",
        "Sorumlu Departman",
        "Bütçe",
        "Risk",
        "Termin",
        "İlerleme Oranı",
        "Durum",
        "Aksiyon Planı",
        "Ek Dosya"
      ]
    },
    "management-reports.html": {
      "title": "Yönetim Rapor Merkezi",
      "desc": "Haftalık/aylık rapor, rapor sahibi, dağıtım ve arşiv hazırlığı yönetilir.",
      "metrics": [
        "Aylık rapor",
        "Haftalık rapor",
        "Dağıtım",
        "Arşiv",
        "PDF/Excel"
      ],
      "summaryTitle": "Rapor hazırlık akışı",
      "process": [
        "Rapor türü ve tarih aralığını seç",
        "Rapor sahibini ve dağıtım listesini belirle",
        "PDF/Excel hazırlık alanını doldur",
        "Raporu arşiv ve dosya ekiyle bağla"
      ],
      "formTitle": "Rapor kaydı",
      "fields": [
        "Rapor Türü",
        "Rapor Sahibi",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Dağıtım",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ]
    },
    "management-calendar.html": {
      "title": "Yönetim Takvimi",
      "desc": "Toplantı, denetim, YGG, proje milestone ve hatırlatmalar merkezi izlenir.",
      "metrics": [
        "Toplantı",
        "Denetim",
        "YGG",
        "Milestone",
        "Hatırlatma"
      ],
      "summaryTitle": "Takvim başlıkları",
      "process": [
        "Etkinlik tipini seç",
        "Tarih / saat ve sorumlu belirle",
        "Hatırlatma ve mesaj hazırlığı oluştur",
        "Kritik terminleri görünür tut"
      ],
      "formTitle": "Takvim kaydı",
      "fields": [
        "Etkinlik Adı",
        "Etkinlik Tipi",
        "Tarih",
        "Saat",
        "Sorumlu Kişi",
        "Sorumlu Departman",
        "Öncelik",
        "Durum",
        "Açıklama"
      ]
    },
    "management-organization.html": {
      "title": "Organizasyon Yapısı",
      "desc": "Rol, sorumluluk, bağlı yönetici, yetki seviyesi ve vekalet bilgileri yönetilir.",
      "metrics": [
        "Rol",
        "Yönetici bağlantısı",
        "Yetki seviyesi",
        "Vekalet",
        "Departman"
      ],
      "summaryTitle": "Organizasyon yönetimi",
      "process": [
        "Rol ve sorumluluğu tanımla",
        "Bağlı olduğu yöneticiyi seç",
        "Yetki seviyesi ve vekalet bilgisini gir",
        "Departman merkezi bağlantısını koru"
      ],
      "formTitle": "Organizasyon kaydı",
      "fields": [
        "Rol / Ünvan",
        "Sorumlu Kişi",
        "Bağlı Olduğu Yönetici",
        "Sorumlu Departman",
        "Yetki Seviyesi",
        "Vekalet",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ]
    },
    "management-policies.html": {
      "title": "Politikalar",
      "desc": "Politika sahibi, revizyon, yayın tarihi, onay durumu ve dağıtım kayıtları yönetilir.",
      "metrics": [
        "Politika",
        "Revizyon",
        "Onay",
        "Dağıtım",
        "Okundu bilgisi"
      ],
      "summaryTitle": "Politika yayın akışı",
      "process": [
        "Politika türünü ve sahibini belirle",
        "Revizyon / yayın tarihini takip et",
        "Onay durumunu görünür tut",
        "Dağıtım ve okundu bilgisi hazırlığını bağla"
      ],
      "formTitle": "Politika kaydı",
      "fields": [
        "Politika Adı",
        "Politika Sahibi",
        "Revizyon",
        "Yayın Tarihi",
        "Onay Durumu",
        "Dağıtım Kayıtları",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ]
    }
  }
};
  const page = (location.pathname.split('/').pop() || suite.home);
  const config = suite.configs[page] || suite.configs[suite.home];
  const state = { users: [], departments: [], records: [], attachments: [], lastPayload: null };
  const safeApi = { redirectOnUnauthorized: false };

  function esc(value){return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
  function text(id,value){const el=document.getElementById(id);if(el)el.textContent=value}
  function currentUser(){return window.GDNL_CURRENT_USER || {}}
  function userName(user=currentUser()){return user.fullname || user.name || user.username || user.email || 'Oturum Sahibi'}
  function normalizeDepartment(dep){return dep?.department_name || dep?.name || dep?.department || ''}
  function optionList(items,type){return items.map(item=>{const u=type==='user'?api.normalizeUser(item):item;const label=type==='user'?userName(u):normalizeDepartment(item);const value=type==='user'?(u.id||u.username||u.email||label):(item.id||label);return label?'<option value="'+esc(value)+'" data-label="'+esc(label)+'">'+esc(label)+'</option>':''}).join('')}
  function fieldType(name){const key=name.toLocaleLowerCase('tr-TR');if(key.includes('açıklama')||key.includes('not')||key.includes('gerekçe')||key.includes('plan')||key.includes('checklist')||key.includes('gündem')||key.includes('geçmiş')||key.includes('kök neden')||key.includes('aksiyon'))return 'textarea';if(key.includes('tarih')||key.includes('termin')||key.includes('başlangıç')||key.includes('bitiş')||key.includes('yayın'))return 'date';if(key.includes('saat'))return 'time';if(key.includes('maliyet')||key.includes('bütçe')||key.includes('oran')||key.includes('saat')||key.includes('süre')||key.includes('rpn')||key.includes('stok')||key.includes('seviye')||key.includes('sapma')||key.includes('değer')||key.includes('miktar')||key.includes('roi')||key.includes('ilerleme'))return 'number';return 'text'}
  function inputFor(name){const key=name.toLocaleLowerCase('tr-TR');const full=key.includes('açıklama')||key.includes('not')||key.includes('plan')||key.includes('checklist')||key.includes('gündem')||key.includes('geçmiş')||key.includes('kök neden')||key.includes('aksiyon');if(key.includes('kişi')||key.includes('katılımcı')||key.includes('sorumlu')||key.includes('teknisyen')||key.includes('personel')||key.includes('sahibi')||key.includes('yönetici')||key.includes('değerlendiren')||key.includes('mentor')||key.includes('eğitmen'))return '<div class="field '+(full?'full':'')+'"><label>'+esc(name)+'</label><select '+(key.includes('katılımcı')||key.includes('sorumlular')||key.includes('personeller')?'multiple':'')+' data-field="'+esc(name)+'"><option value="">Kişi seç</option>'+optionList(state.users,'user')+'</select></div>';if(key.includes('departman'))return '<div class="field"><label>'+esc(name)+'</label><select data-field="'+esc(name)+'"><option value="">Departman seç</option>'+optionList(state.departments,'department')+'</select></div>';if(key.includes('durum'))return '<div class="field"><label>'+esc(name)+'</label><select data-field="'+esc(name)+'"><option>Açık</option><option>Bekliyor</option><option>Onayda</option><option>Gecikti</option><option>Tamamlandı</option><option>Arşivlendi</option></select></div>';if(key.includes('öncelik')||key.includes('aciliyet'))return '<div class="field"><label>'+esc(name)+'</label><select data-field="'+esc(name)+'"><option>Normal</option><option>Yüksek</option><option>Kritik</option></select></div>';if(key.includes('ek dosya')||key.includes('dosya eki'))return '';const type=fieldType(name);if(type==='textarea')return '<div class="field full"><label>'+esc(name)+'</label><textarea data-field="'+esc(name)+'"></textarea></div>';return '<div class="field"><label>'+esc(name)+'</label><input type="'+type+'" data-field="'+esc(name)+'"></div>'}
  function renderNav(){const nav=document.getElementById(suite.navId);if(!nav)return;nav.innerHTML=suite.nav.map(([href,label])=>'<a class="'+(href===page?'active ':'')+(href==='mailbox.html'||href==='department-gateway.html'?'external':'')+'" href="'+href+'">'+esc(label)+'</a>').join('')}
  function renderCards(){const box=document.getElementById('metricCards');if(!box)return;box.innerHTML=config.metrics.map((m,i)=>'<article class="card"><small>'+esc(m.label||m)+'</small><h2 data-metric="'+i+'">'+esc(m.value ?? '0')+'</h2><span class="badge '+(m.level||(['','warn','danger','blue'][i%4]))+'">'+esc(m.status||'Hazır')+'</span></article>').join('')}
  function renderSummary(){text('summaryTitle',config.summaryTitle||config.title+' Öncelikleri');text('summaryDesc',config.summaryDesc||config.title+' için sorumluluk, termin ve kapanış adımları izlenir.');text('statusPill',config.statusPill||config.title+' aktif takip');const box=document.getElementById('summaryList');if(box)box.innerHTML=(config.process||[]).map((row,i)=>'<div class="row"><div>'+esc(row)+'</div><span>'+esc(config.processStatus?.[i]||'Takipte')+'</span></div>').join('') || '<div class="empty">'+esc(config.title)+' için henüz öncelik başlığı tanımlanmadı.</div>'}
  function renderForm(){text('formTitle',config.formTitle||config.title+' Kaydı');text('formDesc',config.formDesc||config.title+' için sorumlu, departman, durum, öncelik ve ek dosyayı hazırlayın.');const form=document.getElementById(suite.formId);if(!form)return;form.innerHTML=(config.fields||[]).map(inputFor).join('') || '<div class="empty">'+esc(config.title)+' için form alanları hazırlanıyor.</div>';text('fileTitle',config.fileTitle||config.title+' Ek Dosyaları');text('fileDesc',config.fileDesc||config.title+' ile ilgili dış formları, raporları ve destekleyici evrakları yükleyin.');const cat=document.getElementById('fileCategory');if(cat)cat.innerHTML=(config.fileCategories||suite.fileCategories).map(c=>'<option>'+esc(c)+'</option>').join('')}
  function badge(value){const lower=String(value||'').toLocaleLowerCase('tr-TR');const cls=lower.includes('gec')||lower.includes('kritik')?'danger':lower.includes('bek')||lower.includes('risk')?'warn':'blue';return '<span class="badge '+cls+'">'+esc(value||'Açık')+'</span>'}
  function recordRows(){const q=(document.getElementById('suiteSearch')?.value||'').toLocaleLowerCase('tr-TR');const sf=document.getElementById('statusFilter')?.value||'';const pf=document.getElementById('priorityFilter')?.value||'';return state.records.filter(r=>{const hay=JSON.stringify(r).toLocaleLowerCase('tr-TR');return (!q||hay.includes(q))&&(!sf||String(r.status||'').includes(sf))&&(!pf||String(r.priority||'').includes(pf))})}
  function renderRecords(){text('recordsTitle',config.recordsTitle||config.title+' Listesi');text('recordsDesc',config.recordsDesc||config.title+' kayıtları durum, öncelik, sorumlu ve departman bilgisine göre izlenir.');text('auditTitle',config.auditTitle||config.title+' İşlem Geçmişi');text('auditDesc',config.auditDesc||config.title+' üzerinde yapılan mesaj, dosya ve durum işlemleri denetim izine hazırlanır.');const box=document.getElementById('recordList');if(!box)return;const rows=recordRows();if(!rows.length){box.innerHTML='<div class="empty">'+esc(config.emptyText||config.title+' için henüz canlı kayıt bulunmuyor. Yeni kayıt hazırlayabilir veya filtreleri temizleyebilirsiniz.')+'</div>';return}box.innerHTML=rows.slice(0,30).map(r=>'<article class="record-card"><div><h3>'+esc(r.title||r.subject||r.name||r.code||config.title)+'</h3><p>'+esc(r.description||r.detail||r.note||r.owner||config.desc)+'</p><div class="meta">'+badge(r.status||'Açık')+badge(r.priority||'Normal')+'<span class="badge">'+esc(r.department||r.related_module||suite.name)+'</span></div></div><button class="btn" type="button" onclick="'+suite.prefix+'MessagePrep()">Mesaj</button></article>').join('')}
  function collectForm(){const payload={id:suite.prefix.toUpperCase()+'-'+Date.now(),module:suite.name,page,related_module:suite.prefix,fields:{},status:'Açık',priority:'Normal',created_at:new Date().toISOString(),created_by:userName()};document.querySelectorAll('[data-field]').forEach(el=>{const value=el.multiple?Array.from(el.selectedOptions).map(o=>({id:o.value,fullname:o.dataset.label||o.textContent})):el.value;payload.fields[el.dataset.field]=value;if(/durum/i.test(el.dataset.field))payload.status=el.value;if(/öncelik|aciliyet/i.test(el.dataset.field))payload.priority=el.value});return payload}
  async function uploadIfNeeded(recordId){const input=document.getElementById(suite.fileId);const file=input?.files?.[0];if(!file)return null;return api.uploadToR2(file,{module:suite.name,record_id:recordId,related_module:page,category:document.getElementById('fileCategory')?.value||'Diğer',description:document.getElementById('fileDescription')?.value||'',uploaded_by:userName()})}
  async function log(action,payload){const body={module:suite.name,related_module:page,related_record_id:payload?.id||'',action,description:config.title,user_id:currentUser().id||'',user_name:userName(),payload,created_at:new Date().toISOString()};api.post('/activity-feed',body,safeApi).catch(()=>{});api.post('/audit-logs',body,safeApi).catch(()=>{});const preview=document.getElementById('auditPreview');if(preview){preview.classList.remove('empty');preview.textContent=JSON.stringify(body,null,2)}}
  async function saveDraft(){const payload=collectForm();try{payload.attachment=await uploadIfNeeded(payload.id)}catch(e){api.showToast('R2 dosya yükleme endpointi bekleniyor')}state.records.unshift({title:config.title+' kaydı',description:Object.values(payload.fields).flat().filter(Boolean).slice(0,3).join(' / ')||config.desc,status:payload.status,priority:payload.priority,department:payload.fields['Departman']||payload.fields['İlgili Departman']||suite.name});state.lastPayload=payload;await log(config.formTitle||'Kayıt hazırlandı',payload);renderRecords();api.showToast('Kayıt hazırlandı')}
  function clearForm(){document.querySelectorAll('[data-field]').forEach(el=>{if(el.multiple)Array.from(el.options).forEach(o=>o.selected=false);else el.value=''});const file=document.getElementById(suite.fileId);if(file)file.value='';const desc=document.getElementById('fileDescription');if(desc)desc.value=''}
  function messagePrep(){const payload=state.lastPayload||collectForm();api.post('/notifications',{type:'message',related_module:suite.prefix,related_record_id:payload.id,title:config.title,message:config.title+' için bilgilendirme hazırlığı',is_read:false,created_at:new Date().toISOString()},safeApi).catch(()=>{});api.showToast('Mesaj Merkezi hazırlığı tamam')}
  function runSearch(){renderRecords();const box=document.getElementById('recordList');if(box)box.scrollIntoView({behavior:'smooth',block:'start'})}
  function focusForm(){document.getElementById(suite.formId)?.scrollIntoView({behavior:'smooth',block:'start'})}
  async function loadData(){renderNav();renderCards();renderSummary();renderForm();state.records=config.sampleRecords||[];renderRecords();try{state.users=await api.loadUsers(safeApi)}catch(e){state.users=[]}try{state.departments=await api.loadDepartments(safeApi)}catch(e){state.departments=[]}renderForm();try{const endpoints=config.endpoints||suite.endpoints||[];const loaded=await Promise.allSettled(endpoints.map(x=>api.get(x,safeApi)));state.records=loaded.flatMap(x=>x.status==='fulfilled'?api.asArray(x.value):[]).map((r,i)=>({title:r.title||r.name||r.subject||r.code||r.documentName||config.sampleRecords?.[i%config.sampleRecords.length]?.title,description:r.description||r.detail||r.note||r.status||config.sampleRecords?.[i%config.sampleRecords.length]?.description,status:r.status||config.sampleRecords?.[i%config.sampleRecords.length]?.status,priority:r.priority||config.sampleRecords?.[i%config.sampleRecords.length]?.priority,department:r.department||r.related_module||suite.name})).filter(r=>r.title||r.description);if(!state.records.length)state.records=config.sampleRecords||[]}catch(e){state.records=config.sampleRecords||[]}renderRecords();}
  window[suite.prefix+'SaveDraft']=saveDraft;window[suite.prefix+'MessagePrep']=messagePrep;window[suite.prefix+'ClearForm']=clearForm;window[suite.prefix+'RunSearch']=runSearch;window[suite.prefix+'FocusForm']=focusForm;window[suite.prefix+'Logout']=function(){api?.logout?api.logout():window.location.href='index.html?logout=1'};
  document.getElementById('suiteSearch')?.addEventListener('input',renderRecords);document.getElementById('statusFilter')?.addEventListener('change',renderRecords);document.getElementById('priorityFilter')?.addEventListener('change',renderRecords);
  loadData();
})();
