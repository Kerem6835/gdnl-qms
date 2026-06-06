;(function(){
  "use strict";
  const api = window.GDNL_API;
  const suite = {
  "name": "Bakım Suite",
  "prefix": "maintenance",
  "home": "maintenance-dashboard.html",
  "navId": "maintenanceNav",
  "formId": "maintenanceForm",
  "fileId": "maintenanceFile",
  "endpoints": [
    "/actions",
    "/documents"
  ],
  "fileCategories": [
    "Bakım Talimatı",
    "Kullanım Kılavuzu",
    "Elektrik Şeması",
    "Servis Formu",
    "Teknik Rapor",
    "Fotoğraf",
    "Periyodik Bakım Formu",
    "Diğer"
  ],
  "nav": [
    [
      "maintenance-dashboard.html",
      "Bakım Dashboard"
    ],
    [
      "maintenance-machines.html",
      "Makine Kartları"
    ],
    [
      "maintenance-breakdowns.html",
      "Arıza Bildirimleri"
    ],
    [
      "maintenance-preventive.html",
      "Periyodik Bakım"
    ],
    [
      "maintenance-work-orders.html",
      "İş Emirleri"
    ],
    [
      "maintenance-spare-parts.html",
      "Yedek Parçalar"
    ],
    [
      "maintenance-purchase-requests.html",
      "Satınalma Talepleri"
    ],
    [
      "maintenance-calendar.html",
      "Bakım Takvimi"
    ],
    [
      "maintenance-reports.html",
      "Bakım Raporları"
    ],
    [
      "maintenance-documents.html",
      "Bakım Dokümanları"
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
    "maintenance-dashboard.html": {
      "title": "Bakım Ana Paneli",
      "desc": "Açık arızalar, planlı bakım, geciken işler, kritik makineler ve yedek parça alarmları izlenir.",
      "metrics": [
        "Açık arıza",
        "Planlı bakım",
        "Geciken iş",
        "Kritik makine",
        "Yedek parça alarmı"
      ],
      "process": [
        "Açık arızaları ve kritik işleri takip et",
        "Planlı bakım ve gecikme durumunu izle",
        "Yedek parça alarmını görünür tut",
        "Hızlı aksiyonlar için sorumlu ata"
      ],
      "formTitle": "Bakım Ana Paneli kaydı",
      "fields": [
        "Başlık",
        "Sorumlu Teknisyen",
        "Sorumlu Departman",
        "Öncelik",
        "Durum",
        "Termin",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım Ana Paneli hazırlığı",
          "description": "Açık arızalar, planlı bakım, geciken işler, kritik makineler ve yedek parça alarmları izlenir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-machines.html": {
      "title": "Makine Kartları",
      "desc": "Makine kodu, seri no, lokasyon, kritik seviye, doküman ve bakım geçmişi yönetilir.",
      "metrics": [
        "Aktif makine",
        "Kritik seviye",
        "Eksik doküman",
        "Bakım geçmişi"
      ],
      "process": [
        "Makine kodu ve seri noyu kaydet",
        "Lokasyon ve sorumlu kişiyi belirle",
        "Kritik seviye ve bakım planını gir",
        "Doküman ve bakım geçmişini bağla"
      ],
      "formTitle": "Makine Kartları kaydı",
      "fields": [
        "Makine Kodu",
        "Makine Adı",
        "Seri No",
        "Lokasyon",
        "Sorumlu Kişi",
        "Departman",
        "Kritik Seviye",
        "Bakım Planı",
        "Bakım Geçmişi",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Makine Kartları hazırlığı",
          "description": "Makine kodu, seri no, lokasyon, kritik seviye, doküman ve bakım geçmişi yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-breakdowns.html": {
      "title": "Arıza Bildirimi",
      "desc": "Makine, arıza tanımı, aciliyet, duruş süresi, kök neden ve aksiyon yönetilir.",
      "metrics": [
        "Yeni arıza",
        "Kritik",
        "Duruş",
        "Kök neden",
        "Aksiyon"
      ],
      "process": [
        "Arıza no ve makineyi seç",
        "Arıza tanımı ve aciliyet gir",
        "Duruş süresi ve kök nedeni kaydet",
        "Aksiyon ve sorumlu teknisyeni ata"
      ],
      "formTitle": "Arıza Bildirimi kaydı",
      "fields": [
        "Arıza No",
        "Makine",
        "Bildiren Kişi",
        "Arıza Tanımı",
        "Aciliyet",
        "Duruş Süresi",
        "Kök Neden",
        "Aksiyon",
        "Sorumlu Teknisyen",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Arıza Bildirimi hazırlığı",
          "description": "Makine, arıza tanımı, aciliyet, duruş süresi, kök neden ve aksiyon yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-preventive.html": {
      "title": "Periyodik Bakım Planı",
      "desc": "Frekans, sorumlu teknisyen, sonraki bakım tarihi, checklist ve gecikme takip edilir.",
      "metrics": [
        "Plan",
        "Yaklaşan",
        "Geciken",
        "Checklist"
      ],
      "process": [
        "Bakım planı ve frekansı oluştur",
        "Sorumlu teknisyeni seç",
        "Sonraki bakım tarihini belirle",
        "Checklist ve gecikme durumunu takip et"
      ],
      "formTitle": "Periyodik Bakım Planı kaydı",
      "fields": [
        "Bakım Planı",
        "Makine",
        "Frekans",
        "Sorumlu Teknisyen",
        "Son Bakım Tarihi",
        "Sonraki Bakım Tarihi",
        "Checklist",
        "Gecikme",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Periyodik Bakım Planı hazırlığı",
          "description": "Frekans, sorumlu teknisyen, sonraki bakım tarihi, checklist ve gecikme takip edilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-work-orders.html": {
      "title": "Bakım İş Emirleri",
      "desc": "İş emri no, makine, teknisyen, öncelik, durum ve kapanış notu yönetilir.",
      "metrics": [
        "Açık iş emri",
        "Onay bekleyen",
        "Geciken",
        "Kapanan"
      ],
      "process": [
        "İş emri no ve tipini oluştur",
        "Makine ve teknisyen ataması yap",
        "Öncelik ve durum bilgisini güncelle",
        "Kapanış notu ve dosya ekini bağla"
      ],
      "formTitle": "Bakım İş Emirleri kaydı",
      "fields": [
        "İş Emri No",
        "İş Emri Tipi",
        "Makine",
        "Sorumlu Teknisyen",
        "Öncelik",
        "Durum",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Kapanış Notu",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım İş Emirleri hazırlığı",
          "description": "İş emri no, makine, teknisyen, öncelik, durum ve kapanış notu yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-spare-parts.html": {
      "title": "Yedek Parça Listesi",
      "desc": "Minimum stok, kritik stok, makine bağlantısı ve tedarik durumu yönetilir.",
      "metrics": [
        "Parça",
        "Minimum stok",
        "Kritik stok",
        "Tedarik"
      ],
      "process": [
        "Parça kodu ve adını kaydet",
        "Minimum / mevcut stok değerlerini gir",
        "Makine bağlantısı ve raf lokasyonunu belirle",
        "Tedarik durumunu ve alarmı takip et"
      ],
      "formTitle": "Yedek Parça Listesi kaydı",
      "fields": [
        "Parça Kodu",
        "Parça Adı",
        "Makine Bağlantısı",
        "Minimum Stok",
        "Mevcut Stok",
        "Kritik Stok",
        "Tedarik Durumu",
        "Sorumlu Kişi",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Yedek Parça Listesi hazırlığı",
          "description": "Minimum stok, kritik stok, makine bağlantısı ve tedarik durumu yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-purchase-requests.html": {
      "title": "Bakım Satınalma Talepleri",
      "desc": "Parça/hizmet, teknik açıklama, aciliyet, ilgili makine/arıza/iş emri ve satınalma aktarım hazırlığı yapılır.",
      "metrics": [
        "Talep",
        "Aciliyet",
        "Teknik açıklama",
        "Aktarım"
      ],
      "process": [
        "Parça veya hizmet ihtiyacını yaz",
        "İlgili makine / arıza / iş emrini bağla",
        "Teknik açıklama ve aciliyet gir",
        "Satınalma modülüne aktarım hazırlığını oluştur"
      ],
      "formTitle": "Bakım Satınalma Talepleri kaydı",
      "fields": [
        "Talep No",
        "Parça / Hizmet",
        "İlgili Makine",
        "İlgili Arıza / İş Emri",
        "Talep Eden Kişi",
        "Miktar",
        "Aciliyet",
        "Teknik Açıklama",
        "Satınalma Aktarım Durumu",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım Satınalma Talepleri hazırlığı",
          "description": "Parça/hizmet, teknik açıklama, aciliyet, ilgili makine/arıza/iş emri ve satınalma aktarım hazırlığı yapılır.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-calendar.html": {
      "title": "Bakım Takvimi",
      "desc": "Planlı bakım, arıza takip, servis ziyareti ve hatırlatmalar merkezi izlenir.",
      "metrics": [
        "Planlı bakım",
        "Arıza takip",
        "Servis",
        "Hatırlatma"
      ],
      "process": [
        "Etkinlik tipini ve tarihi belirle",
        "Makine ve sorumlu teknisyeni seç",
        "Hatırlatma ve bildirim hazırlığı yap",
        "Geciken işleri görünür tut"
      ],
      "formTitle": "Bakım Takvimi kaydı",
      "fields": [
        "Etkinlik Adı",
        "Etkinlik Tipi",
        "Makine",
        "Tarih",
        "Saat",
        "Sorumlu Teknisyen",
        "Öncelik",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım Takvimi hazırlığı",
          "description": "Planlı bakım, arıza takip, servis ziyareti ve hatırlatmalar merkezi izlenir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-reports.html": {
      "title": "Bakım Raporları",
      "desc": "Arıza analizi, MTTR/MTBF hazırlık, duruş süresi, maliyet ve ek dosya yönetilir.",
      "metrics": [
        "Arıza analizi",
        "MTTR",
        "MTBF",
        "Duruş",
        "Maliyet"
      ],
      "process": [
        "Rapor türü ve tarih aralığını seç",
        "Duruş süresi ve maliyet bilgilerini hazırla",
        "MTTR / MTBF hazırlık alanlarını doldur",
        "Rapor dosyasını ekle"
      ],
      "formTitle": "Bakım Raporları kaydı",
      "fields": [
        "Rapor Türü",
        "Rapor Sahibi",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Duruş Süresi",
        "Maliyet",
        "MTTR Hazırlık",
        "MTBF Hazırlık",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım Raporları hazırlığı",
          "description": "Arıza analizi, MTTR/MTBF hazırlık, duruş süresi, maliyet ve ek dosya yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "maintenance-documents.html": {
      "title": "Bakım Dokümanları",
      "desc": "Kullanım kılavuzu, elektrik şeması, servis formu, bakım talimatı ve revizyon yönetilir.",
      "metrics": [
        "Kılavuz",
        "Şema",
        "Servis formu",
        "Talimat",
        "Revizyon"
      ],
      "process": [
        "Doküman türünü ve makineyi seç",
        "Revizyon ve yayın bilgisini gir",
        "Sorumlu kişiyi belirle",
        "R2 dosya ekini ve açıklamayı bağla"
      ],
      "formTitle": "Bakım Dokümanları kaydı",
      "fields": [
        "Doküman Adı",
        "Doküman Türü",
        "Makine",
        "Revizyon",
        "Yayın Tarihi",
        "Sorumlu Kişi",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bakım Dokümanları hazırlığı",
          "description": "Kullanım kılavuzu, elektrik şeması, servis formu, bakım talimatı ve revizyon yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
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
