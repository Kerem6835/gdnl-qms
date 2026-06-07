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
  const pageConfigs = {
  "management-dashboard.html": {
    "pageTitle": "Yönetim Merkezi",
    "pageDescription": "CEO, Genel Müdür ve üst yönetim için şirketin kritik süreçlerini tek ekranda gösteren yönetim merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Açık yönetim kararı",
      "Geciken aksiyon",
      "Kritik risk",
      "Açık CAPA",
      "Yaklaşan toplantı",
      "KPI sapması"
    ],
    "summaryTitle": "Bugün Yönetimin Dikkat Etmesi Gerekenler",
    "summaryDescription": "Stratejik öncelikler, kritik riskler ve bekleyen yönetim aksiyonları tek bakışta izlenir.",
    "summaryItems": [
      "Kritik risk ve geciken aksiyonları gözden geçir",
      "Yaklaşan toplantı ve YGG başlıklarını kontrol et",
      "KPI sapmalarını ve açık CAPA özetini değerlendir",
      "Mesaj Merkezi bildirimlerini takip et"
    ],
    "formTitle": "Yönetim Notu Hazırlığı",
    "formDescription": "Hızlı yönetim notu veya gündem maddesi hazırlayın.",
    "formFields": [
      "Yönetim notu",
      "Gündem konusu",
      "Sorumlu kişi",
      "İlgili departman",
      "Öncelik",
      "Termin",
      "Açıklama"
    ],
    "fileTitle": "Yönetim Merkezi Ek Dosyaları",
    "fileDescription": "Yönetim Merkezi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Yönetim sunumu",
      "KPI raporu",
      "Toplantı eki",
      "Strateji belgesi"
    ],
    "recordTitle": "Yönetim Notları",
    "recordDescription": "Üst yönetim notları, gündem maddeleri ve takip aksiyonları burada izlenir.",
    "emptyState": "Henüz yönetim notu veya gündem maddesi bulunmuyor.",
    "auditTitle": "Yönetim Merkezi İşlem Geçmişi",
    "auditDescription": "Yönetim notu, gündem ve takip işlemlerinin denetim izi burada hazırlanır.",
    "primaryActionLabel": "Yönetim Merkezi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-board.html": {
    "pageTitle": "Yönetim Kurulu Toplantıları",
    "pageDescription": "Yönetim kurulu ve üst yönetim toplantılarının gündem, karar, aksiyon ve ek dosyalarla takip edildiği toplantı merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Planlı toplantı",
      "Tamamlanan toplantı",
      "Açık gündem",
      "Açık aksiyon"
    ],
    "summaryTitle": "Toplantı Yönetimi Akışı",
    "summaryDescription": "Toplantı hazırlığı, gündem, karar ve aksiyon atama adımları birlikte yönetilir.",
    "summaryItems": [
      "Toplantı no ve tarih bilgisini oluştur",
      "Katılımcıları /users üzerinden seç",
      "Gündem ve karar maddelerini kaydet",
      "Aksiyonları sorumlu ve termin ile bağla"
    ],
    "formTitle": "Toplantı Kaydı",
    "formDescription": "Yönetim kurulu toplantısı için gündem, katılımcı ve karar bilgilerini girin.",
    "formFields": [
      "Toplantı no",
      "Toplantı adı",
      "Tarih",
      "Saat",
      "Katılımcılar",
      "Gündem maddeleri",
      "Kararlar",
      "Sorumlular",
      "Termin",
      "Durum"
    ],
    "fileTitle": "Yönetim Kurulu Toplantıları Ek Dosyaları",
    "fileDescription": "Yönetim Kurulu Toplantıları ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Toplantı tutanağı",
      "Sunum",
      "Gündem dosyası",
      "Karar eki"
    ],
    "recordTitle": "Toplantı Takip Panosu",
    "recordDescription": "Planlı ve tamamlanan yönetim toplantıları gündem ve aksiyon durumuyla izlenir.",
    "emptyState": "Henüz yönetim kurulu toplantısı kaydı yok.",
    "auditTitle": "Toplantı İşlem Geçmişi",
    "auditDescription": "Toplantı gündemi, kararları, aksiyonları ve ek dosyaları için işlem geçmişi hazırlanır.",
    "primaryActionLabel": "Yönetim Kurulu Toplantıları Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-decisions.html": {
    "pageTitle": "Yönetim Kararları",
    "pageDescription": "Yönetim Kurulu, CEO ve Genel Müdür kararlarının sorumlu, termin, öncelik ve kapanış durumuyla takip edildiği karar merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Açık karar",
      "Geciken karar",
      "Kritik karar",
      "Kapanan karar"
    ],
    "summaryTitle": "Karar Yaşam Döngüsü",
    "summaryDescription": "Kararlar alınma, uygulama, gecikme ve kapanış aşamalarına göre yönetilir.",
    "summaryItems": [
      "Karar no ve karar tarihini kaydet",
      "Sorumlu kişi ve ilgili departmanı ata",
      "Termin ve öncelik seviyesini belirle",
      "Kapanış açıklaması ve bağlı aksiyonu takip et"
    ],
    "formTitle": "Yönetim Kararı Kaydı",
    "formDescription": "Kararı alan kurul/kişi, sorumlu, termin ve bağlı aksiyon bilgilerini girin.",
    "formFields": [
      "Karar no",
      "Karar konusu",
      "Karar açıklaması",
      "Karar tarihi",
      "Kararı alan kurul/kişi",
      "Sorumlu kişi",
      "İlgili departman",
      "Termin",
      "Öncelik",
      "Durum",
      "Bağlı aksiyon"
    ],
    "fileTitle": "Yönetim Kararları Ek Dosyaları",
    "fileDescription": "Yönetim Kararları ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Karar eki",
      "Onay yazısı",
      "Toplantı tutanağı",
      "Destekleyici rapor"
    ],
    "recordTitle": "Yönetim Karar Takibi",
    "recordDescription": "Yönetim kararları sorumlu, termin, öncelik ve kapanış durumuyla izlenir.",
    "emptyState": "Henüz yönetim kararı kaydı bulunmuyor.",
    "auditTitle": "Karar İşlem Geçmişi",
    "auditDescription": "Karar oluşturma, durum değişikliği, dosya ve kapanış işlemleri burada izlenir.",
    "primaryActionLabel": "Yönetim Kararları Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-kpi.html": {
    "pageTitle": "Stratejik KPI Takibi",
    "pageDescription": "Şirket hedeflerine bağlı stratejik KPI’ların hedef, gerçekleşen, sapma ve sorumlu bazında izlendiği performans ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Hedefte KPI",
      "Sapmalı KPI",
      "Kritik KPI",
      "İyileşen KPI"
    ],
    "summaryTitle": "KPI Performans Okuması",
    "summaryDescription": "Hedef, gerçekleşen, sapma ve trend bilgileri yönetim seviyesinde sadeleştirilir.",
    "summaryItems": [
      "KPI dönemini ve hedef değerini belirle",
      "Gerçekleşen değeri ve sapmayı izle",
      "Trend yönünü ve kritik KPI durumunu değerlendir",
      "Sorumlu departman ve kişiyle aksiyonu bağla"
    ],
    "formTitle": "KPI Güncelleme Kaydı",
    "formDescription": "KPI hedef, gerçekleşen, sapma ve sorumlu bilgilerini güncelleyin.",
    "formFields": [
      "KPI adı",
      "Dönem",
      "Hedef",
      "Gerçekleşen",
      "Sapma",
      "Trend",
      "Sorumlu departman",
      "Sorumlu kişi",
      "Açıklama"
    ],
    "fileTitle": "Stratejik KPI Takibi Ek Dosyaları",
    "fileDescription": "Stratejik KPI Takibi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "KPI raporu",
      "Grafik çıktısı",
      "Analiz dosyası",
      "Sunum"
    ],
    "recordTitle": "Stratejik KPI Panosu",
    "recordDescription": "KPI’lar hedef, gerçekleşen, sapma ve trend durumuna göre listelenir.",
    "emptyState": "Henüz stratejik KPI kaydı bulunmuyor.",
    "auditTitle": "KPI Güncelleme Geçmişi",
    "auditDescription": "KPI hedef, gerçekleşen, sapma ve açıklama değişiklikleri izlenir.",
    "primaryActionLabel": "Stratejik KPI Takibi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-goals.html": {
    "pageTitle": "Hedef Yönetimi",
    "pageDescription": "Yıllık, aylık ve departman bazlı şirket hedeflerinin sorumlu, KPI bağlantısı ve gerçekleşme oranıyla takip edildiği hedef merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Açık hedef",
      "Tamamlanan hedef",
      "Geciken hedef",
      "Kritik sapma"
    ],
    "summaryTitle": "Hedef Takip Akışı",
    "summaryDescription": "Şirket hedefleri KPI bağlantısı, termin ve gerçekleşme oranıyla takip edilir.",
    "summaryItems": [
      "Yıllık ve aylık hedefleri tanımla",
      "Gerçekleşme oranını ve sapmayı izle",
      "Sorumlu departman ve kişiyi ata",
      "Bağlı KPI ve aksiyon planını güncelle"
    ],
    "formTitle": "Hedef Kaydı",
    "formDescription": "Yıllık/aylık hedef, gerçekleşme oranı ve bağlı KPI bilgisini girin.",
    "formFields": [
      "Hedef adı",
      "Hedef tipi",
      "Yıllık hedef",
      "Aylık hedef",
      "Gerçekleşme oranı",
      "Sorumlu departman",
      "Sorumlu kişi",
      "Termin",
      "Bağlı KPI",
      "Durum"
    ],
    "fileTitle": "Hedef Yönetimi Ek Dosyaları",
    "fileDescription": "Hedef Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Hedef kartı",
      "Aksiyon planı",
      "Performans raporu"
    ],
    "recordTitle": "Şirket Hedefleri Panosu",
    "recordDescription": "Hedefler sorumlu, KPI bağlantısı, termin ve gerçekleşme oranıyla izlenir.",
    "emptyState": "Henüz hedef kaydı bulunmuyor.",
    "auditTitle": "Hedef Değişiklik Geçmişi",
    "auditDescription": "Hedef değeri, sorumluluk, termin ve gerçekleşme değişiklikleri izlenir.",
    "primaryActionLabel": "Hedef Yönetimi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-budget.html": {
    "pageTitle": "Bütçe ve Yatırım Özeti",
    "pageDescription": "Üst yönetim için bütçe, yatırım ve harcama sapmalarının özet olarak izlendiği finansal yönetim ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Planlanan bütçe",
      "Gerçekleşen harcama",
      "Bütçe sapması",
      "Açık yatırım"
    ],
    "summaryTitle": "Bütçe İzleme Akışı",
    "summaryDescription": "Yatırım ve bütçe kalemleri plan, gerçekleşme ve sapma odaklı izlenir.",
    "summaryItems": [
      "Planlanan bütçeyi ve yatırım projesini gir",
      "Gerçekleşen harcamayı takip et",
      "Sapma oranını ve kritik yatırım durumunu değerlendir",
      "Sorumlu departman ve kişiyi ata"
    ],
    "formTitle": "Bütçe / Yatırım Kaydı",
    "formDescription": "Bütçe kalemi, yatırım projesi, harcama ve sapma bilgisini hazırlayın.",
    "formFields": [
      "Bütçe kalemi",
      "Yatırım projesi",
      "Planlanan bütçe",
      "Gerçekleşen harcama",
      "Sapma",
      "Sorumlu departman",
      "Sorumlu kişi",
      "Durum",
      "Açıklama"
    ],
    "fileTitle": "Bütçe ve Yatırım Özeti Ek Dosyaları",
    "fileDescription": "Bütçe ve Yatırım Özeti ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Teklif",
      "Yatırım dosyası",
      "Bütçe raporu",
      "Maliyet analizi"
    ],
    "recordTitle": "Bütçe ve Yatırım Panosu",
    "recordDescription": "Bütçe kalemleri ve yatırım talepleri harcama sapmasıyla izlenir.",
    "emptyState": "Henüz bütçe veya yatırım kaydı bulunmuyor.",
    "auditTitle": "Bütçe İşlem Geçmişi",
    "auditDescription": "Bütçe kalemi, yatırım dosyası, harcama ve sapma işlemleri izlenir.",
    "primaryActionLabel": "Bütçe ve Yatırım Özeti Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-workforce.html": {
    "pageTitle": "İnsan Kaynağı Yönetim Özeti",
    "pageDescription": "Üst yönetim için personel sayısı, açık pozisyon, eğitim, oryantasyon ve yetkinlik durumunun özetlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Toplam çalışan",
      "Açık pozisyon",
      "Oryantasyondaki personel",
      "Kritik yetkinlik eksiği"
    ],
    "summaryTitle": "İnsan Kaynağı Yönetim Gündemi",
    "summaryDescription": "Kadro ihtiyacı, yetkinlik eksiği ve eğitim durumu yönetim özeti olarak izlenir.",
    "summaryItems": [
      "Açık pozisyon ve kritik kadro ihtiyacını kontrol et",
      "Oryantasyon ve eğitim durumunu izle",
      "Yetkinlik eksiklerini departman bazında değerlendir",
      "İK aksiyonlarını yönetim gündemine al"
    ],
    "formTitle": "İnsan Kaynağı Notu",
    "formDescription": "Yönetim için İK notu, konu ve sorumlu bilgilerini hazırlayın.",
    "formFields": [
      "İnsan kaynağı notu",
      "İlgili departman",
      "Konu",
      "Sorumlu kişi",
      "Termin",
      "Durum"
    ],
    "fileTitle": "İnsan Kaynağı Yönetim Özeti Ek Dosyaları",
    "fileDescription": "İnsan Kaynağı Yönetim Özeti ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "İK raporu",
      "Organizasyon çıktısı",
      "Eğitim raporu"
    ],
    "recordTitle": "İnsan Kaynağı Özetleri",
    "recordDescription": "İK yönetim notları, kadro ihtiyaçları ve kritik yetkinlik başlıkları izlenir.",
    "emptyState": "Henüz insan kaynağı yönetim notu bulunmuyor.",
    "auditTitle": "İnsan Kaynağı Özet Geçmişi",
    "auditDescription": "İnsan kaynağı notları, sorumlular ve durum değişiklikleri izlenir.",
    "primaryActionLabel": "İnsan Kaynağı Yönetim Özeti Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-projects.html": {
    "pageTitle": "Stratejik Proje Takibi",
    "pageDescription": "Stratejik projeler, APQP özetleri, yatırım projeleri ve dijital dönüşüm çalışmalarının yönetim seviyesinde takip edildiği proje ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Açık proje",
      "Geciken proje",
      "Kritik proje",
      "Tamamlanan proje"
    ],
    "summaryTitle": "Proje Yönetim Takibi",
    "summaryDescription": "Projeler tür, sorumlu, risk, termin ve ilerleme durumuna göre izlenir.",
    "summaryItems": [
      "Proje türünü ve kapsamını belirle",
      "Sorumlu kişi ve departmanı ata",
      "Risk seviyesi ve termin durumunu izle",
      "Bağlı aksiyon ve APQP özetlerini takip et"
    ],
    "formTitle": "Stratejik Proje Kaydı",
    "formDescription": "Proje türü, sorumlu, risk seviyesi ve bağlı aksiyon bilgisini girin.",
    "formFields": [
      "Proje adı",
      "Proje türü",
      "Sorumlu kişi",
      "İlgili departman",
      "Başlangıç",
      "Termin",
      "Risk seviyesi",
      "Durum",
      "Bağlı aksiyon"
    ],
    "fileTitle": "Stratejik Proje Takibi Ek Dosyaları",
    "fileDescription": "Stratejik Proje Takibi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Proje planı",
      "APQP özeti",
      "Yatırım dosyası",
      "Proje sunumu"
    ],
    "recordTitle": "Stratejik Projeler Panosu",
    "recordDescription": "Stratejik, APQP, yatırım ve dijital dönüşüm projeleri yönetim seviyesinde izlenir.",
    "emptyState": "Henüz stratejik proje kaydı bulunmuyor.",
    "auditTitle": "Proje Durum Geçmişi",
    "auditDescription": "Proje fazı, risk, termin ve durum değişiklikleri izlenir.",
    "primaryActionLabel": "Stratejik Proje Takibi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-reports.html": {
    "pageTitle": "Yönetim Rapor Merkezi",
    "pageDescription": "KPI, CAPA, risk, denetim, eğitim, tedarikçi ve müşteri şikayeti raporlarının yönetim için toplandığı rapor merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Hazır rapor",
      "Bekleyen rapor",
      "Kritik rapor",
      "Dışa aktarım hazırlığı"
    ],
    "summaryTitle": "Rapor Hazırlama Akışı",
    "summaryDescription": "Yönetim raporları dönem, departman, rapor tipi ve hazırlayan kişiyle takip edilir.",
    "summaryItems": [
      "Rapor tipini ve dönem aralığını seç",
      "Departman filtresi ve açıklamayı gir",
      "Hazırlayan kişiyi ve durumu takip et",
      "PDF/Excel dışa aktarım hazırlığını kontrol et"
    ],
    "formTitle": "Yönetim Raporu Kaydı",
    "formDescription": "Rapor adı, tipi, dönem ve hazırlayan kişi bilgilerini girin.",
    "formFields": [
      "Rapor adı",
      "Rapor tipi",
      "Dönem",
      "Departman filtresi",
      "Açıklama",
      "Hazırlayan kişi",
      "Durum"
    ],
    "fileTitle": "Yönetim Rapor Merkezi Ek Dosyaları",
    "fileDescription": "Yönetim Rapor Merkezi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "PDF rapor",
      "Excel rapor",
      "Sunum",
      "Analiz dosyası"
    ],
    "recordTitle": "Yönetim Raporları Panosu",
    "recordDescription": "Yönetim raporları tip, dönem, hazırlayan ve durum bilgisine göre izlenir.",
    "emptyState": "Henüz yönetim raporu kaydı bulunmuyor.",
    "auditTitle": "Rapor Hazırlama Geçmişi",
    "auditDescription": "Rapor hazırlama, dosya ekleme ve dışa aktarım hazırlığı işlemleri izlenir.",
    "primaryActionLabel": "Yönetim Rapor Merkezi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-calendar.html": {
    "pageTitle": "Yönetim Takvimi",
    "pageDescription": "Toplantılar, YGG, denetimler, kritik aksiyonlar, CAPA terminleri ve proje kilometre taşlarının takip edildiği yönetim takvimi.",
    "heroKicker": "",
    "metricCards": [
      "Bugünkü etkinlik",
      "Bu hafta etkinlik",
      "Geciken termin",
      "Kritik hatırlatma"
    ],
    "summaryTitle": "Takvim Öncelikleri",
    "summaryDescription": "Kritik tarih, toplantı, YGG ve termin hatırlatmaları yönetim takviminde izlenir.",
    "summaryItems": [
      "Bugünkü ve haftalık etkinlikleri kontrol et",
      "Geciken terminleri önceliklendir",
      "Kritik CAPA ve aksiyon tarihlerini izle",
      "Proje kilometre taşlarını yönetime bildir"
    ],
    "formTitle": "Takvim Etkinliği",
    "formDescription": "Etkinlik adı, tipi, tarih ve sorumlu bilgisini girin.",
    "formFields": [
      "Etkinlik adı",
      "Etkinlik tipi",
      "Tarih",
      "Saat",
      "Sorumlu kişi",
      "İlgili departman",
      "Açıklama",
      "Durum"
    ],
    "fileTitle": "Yönetim Takvimi Ek Dosyaları",
    "fileDescription": "Yönetim Takvimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Toplantı eki",
      "Takvim çıktısı",
      "Hatırlatma notu"
    ],
    "recordTitle": "Yönetim Takvimi Panosu",
    "recordDescription": "Toplantı, YGG, denetim, CAPA ve proje tarihleri birlikte izlenir.",
    "emptyState": "Henüz yönetim takvimi etkinliği bulunmuyor.",
    "auditTitle": "Takvim İşlem Geçmişi",
    "auditDescription": "Takvim etkinliği, hatırlatma ve termin değişiklikleri izlenir.",
    "primaryActionLabel": "Yönetim Takvimi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-organization.html": {
    "pageTitle": "Organizasyon Şeması",
    "pageDescription": "Yönetim Kurulu, CEO, Genel Müdür, direktörler, müdürler ve süreç liderlerinin organizasyon yapısını gösteren yönetim ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Aktif departman",
      "Yönetici sayısı",
      "Süreç lideri",
      "Boş pozisyon"
    ],
    "summaryTitle": "Organizasyon İzleme Akışı",
    "summaryDescription": "Pozisyon, bağlı yönetici, rol ve vekalet bilgileri yönetim seviyesinde izlenir.",
    "summaryItems": [
      "Pozisyon ve bağlı olduğu rolü belirle",
      "Kişi ve departman bilgisini /users ile eşleştir",
      "Yetki seviyesi ve görev tanımı bağlantısını takip et",
      "Boş pozisyon ve vekalet durumunu güncelle"
    ],
    "formTitle": "Organizasyon Kaydı",
    "formDescription": "Pozisyon, bağlı olduğu pozisyon, kişi ve görev tanımı bağlantısını girin.",
    "formFields": [
      "Pozisyon adı",
      "Bağlı olduğu pozisyon",
      "Kişi",
      "Departman",
      "Rol",
      "Görev tanımı bağlantısı",
      "Durum"
    ],
    "fileTitle": "Organizasyon Şeması Ek Dosyaları",
    "fileDescription": "Organizasyon Şeması ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Organizasyon şeması",
      "Görev tanımı",
      "Yetki matrisi"
    ],
    "recordTitle": "Organizasyon Yapısı Panosu",
    "recordDescription": "Pozisyonlar, yöneticiler, süreç liderleri ve boş pozisyonlar izlenir.",
    "emptyState": "Henüz organizasyon kaydı bulunmuyor.",
    "auditTitle": "Organizasyon Değişiklik Geçmişi",
    "auditDescription": "Pozisyon, bağlı yönetici, rol ve vekalet değişiklikleri izlenir.",
    "primaryActionLabel": "Organizasyon Şeması Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  },
  "management-policies.html": {
    "pageTitle": "Kurumsal Politika Merkezi",
    "pageDescription": "Kalite, çevre, İSG, enerji, bilgi güvenliği, müşteri memnuniyeti ve etik politikalarının yönetim seviyesinde takip edildiği politika merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Aktif politika",
      "Revizyon bekleyen politika",
      "Onaylı politika",
      "Gözden geçirme tarihi yaklaşan politika"
    ],
    "summaryTitle": "Politika Yönetim Akışı",
    "summaryDescription": "Politikalar revizyon, onay, dağıtım ve gözden geçirme tarihleriyle takip edilir.",
    "summaryItems": [
      "Politika türünü ve sorumlusunu belirle",
      "Revizyon no ve gözden geçirme tarihini takip et",
      "Onay durumunu ve dağıtım hazırlığını kontrol et",
      "Doküman bağlantısı ve onay geçmişini izleme al"
    ],
    "formTitle": "Politika Kaydı",
    "formDescription": "Politika türü, revizyon no, sorumlu ve gözden geçirme tarihini girin.",
    "formFields": [
      "Politika adı",
      "Politika türü",
      "Revizyon no",
      "Sorumlu kişi",
      "Gözden geçirme tarihi",
      "Durum",
      "Açıklama"
    ],
    "fileTitle": "Kurumsal Politika Merkezi Ek Dosyaları",
    "fileDescription": "Kurumsal Politika Merkezi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Politika dokümanı",
      "Revizyon dosyası",
      "Onay kaydı"
    ],
    "recordTitle": "Kurumsal Politikalar Panosu",
    "recordDescription": "Politikalar tür, revizyon, onay ve gözden geçirme tarihine göre izlenir.",
    "emptyState": "Henüz kurumsal politika kaydı bulunmuyor.",
    "auditTitle": "Politika Revizyon Geçmişi",
    "auditDescription": "Politika revizyonu, onay durumu ve dağıtım işlemleri izlenir.",
    "primaryActionLabel": "Kurumsal Politika Merkezi Hazırla",
    "secondaryActionLabel": "Mesaj Hazırla",
    "statusOptions": [
      "Açık",
      "Bekliyor",
      "Gecikti",
      "Tamamlandı",
      "Arşivlendi"
    ],
    "priorityOptions": [
      "Normal",
      "Yüksek",
      "Kritik"
    ]
  }
};
  suite.configs = Object.fromEntries(Object.entries(pageConfigs).map(([page, c]) => [page, {
    pageTitle: c.pageTitle, pageDescription: c.pageDescription, heroKicker: c.heroKicker, metricCards: c.metricCards, summaryItems: c.summaryItems, formFields: c.formFields,
    title: c.pageTitle, desc: c.pageDescription, metrics: c.metricCards, summaryTitle: c.summaryTitle, summaryDesc: c.summaryDescription, process: c.summaryItems,
    formTitle: c.formTitle, formDesc: c.formDescription, fields: c.formFields, fileTitle: c.fileTitle, fileDesc: c.fileDescription, fileCategories: c.fileCategories,
    recordsTitle: c.recordTitle, recordsDesc: c.recordDescription, emptyText: c.emptyState, auditTitle: c.auditTitle, auditDesc: c.auditDescription,
    primaryActionLabel: c.primaryActionLabel, secondaryActionLabel: c.secondaryActionLabel, statusOptions: c.statusOptions, priorityOptions: c.priorityOptions
  }]));
  const page = (location.pathname.split('/').pop() || suite.home);
  const config = suite.configs[page] || suite.configs[suite.home];
  const state = { users: [], departments: [], records: [], attachments: [], lastPayload: null };
  const safeApi = { redirectOnUnauthorized: false };

  function esc(value){return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;')}
  function text(id,value){const el=document.getElementById(id);if(el)el.textContent=value}
  function currentUser(){return window.GDNL_CURRENT_USER || {}}
  function userName(user=currentUser()){return user.fullname || user.name || user.username || user.email || 'Kullanıcı'}
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
