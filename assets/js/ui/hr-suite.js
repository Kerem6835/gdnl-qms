;(function(){
  "use strict";
  const api = window.GDNL_API;
  const suite = {
  "name": "İnsan Kaynakları Suite",
  "prefix": "hr",
  "home": "hr-dashboard.html",
  "navId": "hrNav",
  "formId": "hrForm",
  "fileId": "hrFile",
  "endpoints": [
    "/users",
    "/trainings",
    "/actions"
  ],
  "fileCategories": [
    "Sağlık Raporu",
    "Kimlik Evrakı",
    "Sözleşme",
    "Sertifika",
    "Zimmet Formu",
    "Bordro Eki",
    "İzin Evrakı",
    "Performans Dosyası",
    "İşten Ayrılış Evrakı",
    "Diğer"
  ],
  "nav": [
    [
      "hr-dashboard.html",
      "İK Dashboard"
    ],
    [
      "hr-employees.html",
      "Personel Listesi"
    ],
    [
      "hr-recruitment.html",
      "İşe Alım"
    ],
    [
      "hr-internship.html",
      "Stajyer Yönetimi"
    ],
    [
      "hr-onboarding.html",
      "Oryantasyon"
    ],
    [
      "hr-attendance.html",
      "Puantaj & Devam"
    ],
    [
      "hr-shift-planning.html",
      "Vardiya Planlama"
    ],
    [
      "hr-overtime.html",
      "Mesai Yönetimi"
    ],
    [
      "hr-payroll.html",
      "Bordro Hazırlığı"
    ],
    [
      "hr-leave.html",
      "İzin Yönetimi"
    ],
    [
      "hr-performance.html",
      "Performans"
    ],
    [
      "hr-competency.html",
      "Yetkinlik"
    ],
    [
      "hr-training.html",
      "Eğitim"
    ],
    [
      "hr-assets.html",
      "Zimmet"
    ],
    [
      "hr-exit.html",
      "İşten Ayrılış"
    ],
    [
      "hr-reports.html",
      "İK Raporları"
    ],
    [
      "hr-policies.html",
      "İK Politikaları"
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
    "hr-dashboard.html": {
      "title": "İK Ana Paneli",
      "desc": "Personel, işe alım, oryantasyon, devam, mesai, izin ve bordro hazırlığı tek ekranda izlenir.",
      "metrics": [
        "Personel sayısı",
        "Yeni işe alım",
        "Oryantasyon",
        "Devamsızlık",
        "Fazla mesai",
        "İzin",
        "Bordro hazırlığı"
      ],
      "process": [
        "Personel sayısı ve aktif kadro durumunu izle",
        "Oryantasyon ve yeni işe alım hazırlıklarını kontrol et",
        "Devamsızlık, izin ve mesai özetini takip et",
        "Bordro hazırlık durumunu görünür tut"
      ],
      "formTitle": "İK Ana Paneli kaydı",
      "fields": [
        "Başlık",
        "Sorumlu Kişi",
        "Sorumlu Departman",
        "Öncelik",
        "Durum",
        "Termin",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İK Ana Paneli hazırlığı",
          "description": "Personel, işe alım, oryantasyon, devam, mesai, izin ve bordro hazırlığı tek ekranda izlenir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-employees.html": {
      "title": "Personel Kartları",
      "desc": "Kimlik, iletişim, pozisyon, departman, işe giriş ve personel evrakları yönetilir.",
      "metrics": [
        "Aktif personel",
        "Eksik evrak",
        "Sağlık raporu",
        "Sertifika",
        "Zimmet"
      ],
      "process": [
        "Personel no ve iletişim bilgilerini kaydet",
        "Departman / pozisyon / yönetici bağlantısını kur",
        "Personel evraklarını R2 ile ilişkilendir",
        "Sağlık raporu, sertifika ve zimmet alanlarını takip et"
      ],
      "formTitle": "Personel Kartları kaydı",
      "fields": [
        "Personel No",
        "Ad Soyad",
        "Departman",
        "Pozisyon",
        "Rol",
        "İşe Giriş Tarihi",
        "Yönetici",
        "Durum",
        "E-posta",
        "Telefon",
        "Acil Durum Kişisi",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Personel Kartları hazırlığı",
          "description": "Kimlik, iletişim, pozisyon, departman, işe giriş ve personel evrakları yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-recruitment.html": {
      "title": "İşe Alım Süreci",
      "desc": "Pozisyon talebi, aday havuzu, görüşme aşamaları, teklif, onay ve işe başlatma yönetilir.",
      "metrics": [
        "Açık pozisyon",
        "Aday havuzu",
        "Görüşme",
        "Teklif",
        "Onay"
      ],
      "process": [
        "Talep ve pozisyon onayını oluştur",
        "Aday havuzunu ve görüşme aşamasını takip et",
        "Teklif ve evrak hazırlığını kaydet",
        "İşe başlatma planını sorumluya bağla"
      ],
      "formTitle": "İşe Alım Süreci kaydı",
      "fields": [
        "Pozisyon",
        "Talep Eden Departman",
        "Talep Gerekçesi",
        "Aday Adı",
        "Görüşme Tarihi",
        "Değerlendirenler",
        "Sonuç",
        "Teklif Durumu",
        "Başlangıç Tarihi",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İşe Alım Süreci hazırlığı",
          "description": "Pozisyon talebi, aday havuzu, görüşme aşamaları, teklif, onay ve işe başlatma yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-internship.html": {
      "title": "Stajyer Yönetimi",
      "desc": "Okul, bölüm, staj dönemi, sorumlu, evrak ve değerlendirme kayıtları yönetilir.",
      "metrics": [
        "Aktif stajyer",
        "Mentor",
        "Evrak",
        "Değerlendirme"
      ],
      "process": [
        "Stajyer başvurusunu kaydet",
        "Okul / bölüm / dönem bilgisini gir",
        "Mentor ve departman sorumlusunu seç",
        "Bitiş değerlendirmesini ve evrakları bağla"
      ],
      "formTitle": "Stajyer Yönetimi kaydı",
      "fields": [
        "Stajyer Adı",
        "Okul",
        "Bölüm",
        "Staj Dönemi",
        "Sorumlu Kişi",
        "Sorumlu Departman",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Değerlendirme",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Stajyer Yönetimi hazırlığı",
          "description": "Okul, bölüm, staj dönemi, sorumlu, evrak ve değerlendirme kayıtları yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-onboarding.html": {
      "title": "Oryantasyon Planı",
      "desc": "İlk gün görevleri, eğitimler, evrak teslimi, departman tanıtımı ve onay takibi yapılır.",
      "metrics": [
        "Yeni çalışan",
        "Eğitim",
        "Evrak",
        "Onay",
        "Tamamlama"
      ],
      "process": [
        "İlk gün görevlerini kontrol et",
        "İSG / kalite / departman eğitimlerini takip et",
        "Evrak teslimi ve zimmet bağlantısını kur",
        "Oryantasyon tamamlandı onayını hazırla"
      ],
      "formTitle": "Oryantasyon Planı kaydı",
      "fields": [
        "Yeni Çalışan",
        "Sorumlu Kişi",
        "Departman Mentoru",
        "Sorumlu Departman",
        "İlk Gün Görevleri",
        "Eğitimler",
        "Evrak Teslim",
        "Termin",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Oryantasyon Planı hazırlığı",
          "description": "İlk gün görevleri, eğitimler, evrak teslimi, departman tanıtımı ve onay takibi yapılır.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-attendance.html": {
      "title": "Puantaj ve Devam",
      "desc": "Giriş/çıkış, geç kalma, erken çıkış, tolerans, devamsızlık ve aylık toplam saat izlenir.",
      "metrics": [
        "Eksik puantaj",
        "Geç kalma",
        "Erken çıkış",
        "Devamsızlık",
        "Toplam saat"
      ],
      "process": [
        "Planlanan ve gerçek giriş/çıkış saatlerini kaydet",
        "Günlük tolerans ve sapmaları izle",
        "Devamsızlık ve erken çıkışı görünür tut",
        "Aylık toplam çalışma saatini hazırla"
      ],
      "formTitle": "Puantaj ve Devam kaydı",
      "fields": [
        "Personel",
        "Tarih",
        "Planlanan Giriş",
        "Gerçek Giriş",
        "Planlanan Çıkış",
        "Gerçek Çıkış",
        "Günlük Tolerans",
        "Devamsızlık",
        "Aylık Toplam Saat",
        "Durum",
        "Açıklama"
      ],
      "sampleRecords": [
        {
          "title": "Puantaj ve Devam hazırlığı",
          "description": "Giriş/çıkış, geç kalma, erken çıkış, tolerans, devamsızlık ve aylık toplam saat izlenir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-shift-planning.html": {
      "title": "Vardiya Planlama",
      "desc": "Günlük/haftalık vardiya, çalışan atama, fazla mesai ihtiyacı ve çakışma kontrolü yönetilir.",
      "metrics": [
        "Aktif vardiya",
        "Atanan çalışan",
        "Çakışma",
        "Mesai ihtiyacı"
      ],
      "process": [
        "Vardiya adını ve saatlerini belirle",
        "Çalışanları /users üzerinden ata",
        "Haftalık görünümü ve çakışma kontrolünü takip et",
        "Fazla mesai ihtiyacını görünür tut"
      ],
      "formTitle": "Vardiya Planlama kaydı",
      "fields": [
        "Vardiya Adı",
        "Başlangıç Saati",
        "Bitiş Saati",
        "Mola Süresi",
        "Departman",
        "Personeller",
        "Haftalık Günler",
        "Fazla Mesai İhtiyacı",
        "Çakışma Kontrolü",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Vardiya Planlama hazırlığı",
          "description": "Günlük/haftalık vardiya, çalışan atama, fazla mesai ihtiyacı ve çakışma kontrolü yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-overtime.html": {
      "title": "Mesai Yönetimi",
      "desc": "Fazla mesai talebi, onay, saat hesaplama, kota/tolerans ve aylık toplam yönetilir.",
      "metrics": [
        "Talep",
        "Onay",
        "Saat",
        "Kota",
        "Aylık toplam"
      ],
      "process": [
        "Mesai talebini ve tarihini kaydet",
        "Planlanan / gerçekleşen saatleri karşılaştır",
        "Kota ve tolerans bilgisini hazırla",
        "Aylık toplamı rapora bağla"
      ],
      "formTitle": "Mesai Yönetimi kaydı",
      "fields": [
        "Personel",
        "Tarih",
        "Mesai Tipi",
        "Planlanan Mesai",
        "Gerçek Mesai",
        "Onaylayan Kişi",
        "Kota / Tolerans",
        "Aylık Toplam",
        "Durum",
        "Açıklama"
      ],
      "sampleRecords": [
        {
          "title": "Mesai Yönetimi hazırlığı",
          "description": "Fazla mesai talebi, onay, saat hesaplama, kota/tolerans ve aylık toplam yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-payroll.html": {
      "title": "Bordro Hazırlığı",
      "desc": "Resmi bordro değildir; iç hazırlık için çalışma saati, fazla/eksik saat ve mesai etkisi izlenir.",
      "metrics": [
        "Hazırlık",
        "Eksik veri",
        "Fazla saat",
        "Eksik saat",
        "Onay"
      ],
      "process": [
        "Aylık çalışma saatini hazırla",
        "Fazla / eksik saat etkisini görünür tut",
        "İzin ve devamsızlık bilgisini bağla",
        "Resmi bordro yerine iç hazırlık notunu koru"
      ],
      "formTitle": "Bordro Hazırlığı kaydı",
      "fields": [
        "Personel",
        "Ay",
        "Normal Çalışma Saati",
        "Fazla Mesai",
        "Eksik Çalışma",
        "İzin",
        "Devamsızlık",
        "Net Hazırlık Özeti",
        "Onay Durumu",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Bordro Hazırlığı hazırlığı",
          "description": "Resmi bordro değildir; iç hazırlık için çalışma saati, fazla/eksik saat ve mesai etkisi izlenir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-leave.html": {
      "title": "İzin Yönetimi",
      "desc": "İzin türü, tarih aralığı, gün hesabı ve onay durumu takip edilir.",
      "metrics": [
        "Talep",
        "Onay bekleyen",
        "Bu ay izin",
        "Geçmiş"
      ],
      "process": [
        "İzin türünü ve tarih aralığını seç",
        "Gün hesabını ve açıklamayı gir",
        "Onaylayan kişiyi ata",
        "İzin geçmişiyle ilişkilendir"
      ],
      "formTitle": "İzin Yönetimi kaydı",
      "fields": [
        "Personel",
        "İzin Türü",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Gün Sayısı",
        "Onaylayan Kişi",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İzin Yönetimi hazırlığı",
          "description": "İzin türü, tarih aralığı, gün hesabı ve onay durumu takip edilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-performance.html": {
      "title": "Performans Değerlendirme",
      "desc": "Hedef, yetkinlik, yönetici notu ve aksiyon planı hazırlanır.",
      "metrics": [
        "Açık değerlendirme",
        "Hedef",
        "Yetkinlik",
        "Aksiyon"
      ],
      "process": [
        "Dönem ve değerlendireni belirle",
        "Hedef ve yetkinlik alanlarını doldur",
        "Yönetici notu ve puanı kaydet",
        "Gelişim aksiyon planını oluştur"
      ],
      "formTitle": "Performans Değerlendirme kaydı",
      "fields": [
        "Personel",
        "Değerlendirme Dönemi",
        "Değerlendiren",
        "Hedefler",
        "Yetkinlikler",
        "Puan",
        "Yönetici Notu",
        "Aksiyon Planı",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Performans Değerlendirme hazırlığı",
          "description": "Hedef, yetkinlik, yönetici notu ve aksiyon planı hazırlanır.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-competency.html": {
      "title": "Yetkinlik Matrisi",
      "desc": "Rol bazlı yetkinlik, seviye ve eğitim ihtiyacı yönetilir.",
      "metrics": [
        "Rol",
        "Seviye",
        "Eksik yetkinlik",
        "Eğitim ihtiyacı"
      ],
      "process": [
        "Rol bazlı gerekli yetkinliği tanımla",
        "Mevcut ve hedef seviyeyi gir",
        "Eğitim ihtiyacını belirle",
        "Değerlendiren kişiyi ata"
      ],
      "formTitle": "Yetkinlik Matrisi kaydı",
      "fields": [
        "Personel",
        "Pozisyon",
        "Rol Bazlı Yetkinlik",
        "Mevcut Seviye",
        "Hedef Seviye",
        "Eğitim İhtiyacı",
        "Değerlendiren",
        "Tarih",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Yetkinlik Matrisi hazırlığı",
          "description": "Rol bazlı yetkinlik, seviye ve eğitim ihtiyacı yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-training.html": {
      "title": "İK Eğitim Planı",
      "desc": "Eğitim adı, katılımcı, tarih, sonuç ve sertifika yönetilir.",
      "metrics": [
        "Planlı eğitim",
        "Katılımcı",
        "Sonuç",
        "Sertifika"
      ],
      "process": [
        "Eğitim planını ve tarihini oluştur",
        "Eğitmen ve katılımcıları seç",
        "Sonuç ve sertifika bilgisini gir",
        "Sertifika dosyasını R2 ile bağla"
      ],
      "formTitle": "İK Eğitim Planı kaydı",
      "fields": [
        "Eğitim Adı",
        "Eğitmen",
        "Katılımcılar",
        "Tarih",
        "Süre",
        "Sonuç",
        "Sertifika",
        "Geçerlilik Tarihi",
        "Durum",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İK Eğitim Planı hazırlığı",
          "description": "Eğitim adı, katılımcı, tarih, sonuç ve sertifika yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-assets.html": {
      "title": "Zimmet Yönetimi",
      "desc": "Verilen ekipman, teslim tarihi, iade, hasar/kayıp ve dosya takibi yapılır.",
      "metrics": [
        "Aktif zimmet",
        "İade bekleyen",
        "Hasar/kayıp",
        "Dosya"
      ],
      "process": [
        "Zimmet tipini ve ekipmanı kaydet",
        "Teslim / iade tarihlerini takip et",
        "Hasar veya kayıp bilgisini görünür tut",
        "Zimmet formunu R2 dosyasıyla bağla"
      ],
      "formTitle": "Zimmet Yönetimi kaydı",
      "fields": [
        "Personel",
        "Zimmet Tipi",
        "Ekipman",
        "Seri No",
        "Teslim Tarihi",
        "İade Tarihi",
        "Hasar / Kayıp",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "Zimmet Yönetimi hazırlığı",
          "description": "Verilen ekipman, teslim tarihi, iade, hasar/kayıp ve dosya takibi yapılır.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-exit.html": {
      "title": "İşten Ayrılış Süreci",
      "desc": "Çıkış checklist, zimmet iade, evrak, son görüşme ve kapanış durumu yönetilir.",
      "metrics": [
        "Açık çıkış",
        "Zimmet iade",
        "Evrak",
        "Son görüşme"
      ],
      "process": [
        "Çıkış nedenini ve tarihini kaydet",
        "Zimmet iade ve evrak kontrolü yap",
        "Son görüşme notunu gir",
        "İK kapanış durumunu takip et"
      ],
      "formTitle": "İşten Ayrılış Süreci kaydı",
      "fields": [
        "Personel",
        "Çıkış Tarihi",
        "Çıkış Nedeni",
        "Sorumlu Kişi",
        "Zimmet İade",
        "Evrak Kontrol",
        "Son Görüşme",
        "Kapanış Durumu",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İşten Ayrılış Süreci hazırlığı",
          "description": "Çıkış checklist, zimmet iade, evrak, son görüşme ve kapanış durumu yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-reports.html": {
      "title": "İK Raporları",
      "desc": "Personel, devamsızlık, mesai, izin, eğitim ve PDF/Excel hazırlık alanları yönetilir.",
      "metrics": [
        "Personel raporu",
        "Devamsızlık",
        "Mesai",
        "İzin",
        "Eğitim"
      ],
      "process": [
        "Rapor türünü ve tarih aralığını seç",
        "Rapor sahibini ve dağıtımı belirle",
        "PDF/Excel hazırlık alanını doldur",
        "Rapor dosyasını R2 ile bağla"
      ],
      "formTitle": "İK Raporları kaydı",
      "fields": [
        "Rapor Türü",
        "Rapor Sahibi",
        "Başlangıç Tarihi",
        "Bitiş Tarihi",
        "Departman",
        "Dağıtım",
        "Durum",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İK Raporları hazırlığı",
          "description": "Personel, devamsızlık, mesai, izin, eğitim ve PDF/Excel hazırlık alanları yönetilir.",
          "status": "Açık",
          "priority": "Normal"
        }
      ]
    },
    "hr-policies.html": {
      "title": "İK Politikaları",
      "desc": "Yayın, revizyon, dağıtım ve okundu bilgisi takip edilir.",
      "metrics": [
        "Politika",
        "Revizyon",
        "Dağıtım",
        "Okundu"
      ],
      "process": [
        "Politika adını ve sahibini belirle",
        "Yayın / revizyon tarihini gir",
        "Dağıtım ve okundu bilgisi hazırlığı yap",
        "Doküman bağlantısı ve dosya ekini bağla"
      ],
      "formTitle": "İK Politikaları kaydı",
      "fields": [
        "Politika Adı",
        "Politika Sahibi",
        "Revizyon",
        "Yayın Tarihi",
        "Dağıtım",
        "Okundu Bilgisi",
        "Onay Durumu",
        "Açıklama",
        "Ek Dosya"
      ],
      "sampleRecords": [
        {
          "title": "İK Politikaları hazırlığı",
          "description": "Yayın, revizyon, dağıtım ve okundu bilgisi takip edilir.",
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
  function renderSummary(){text('summaryTitle',config.summaryTitle||'Süreç Özeti');text('summaryDesc',config.summaryDesc||'Takip edilmesi gereken başlıklar.');const box=document.getElementById('summaryList');if(box)box.innerHTML=(config.process||[]).map((row,i)=>'<div class="row"><div>'+esc(row)+'</div><span>'+esc(config.processStatus?.[i]||'Takipte')+'</span></div>').join('') || '<div class="empty">Bu süreç için henüz başlık tanımlı değil.</div>'}
  function renderForm(){text('formTitle',config.formTitle||'Kayıt Formu');const form=document.getElementById(suite.formId);if(!form)return;form.innerHTML=(config.fields||[]).map(inputFor).join('') || '<div class="empty">Form alanı hazırlanıyor.</div>';text('fileTitle',config.fileTitle||'Ek Dosyalar');text('fileDesc',config.fileDesc||'Bu kayda ait dış formları, raporları ve destekleyici evrakları yükleyin.');const cat=document.getElementById('fileCategory');if(cat)cat.innerHTML=(config.fileCategories||suite.fileCategories).map(c=>'<option>'+esc(c)+'</option>').join('')}
  function badge(value){const lower=String(value||'').toLocaleLowerCase('tr-TR');const cls=lower.includes('gec')||lower.includes('kritik')?'danger':lower.includes('bek')||lower.includes('risk')?'warn':'blue';return '<span class="badge '+cls+'">'+esc(value||'Açık')+'</span>'}
  function recordRows(){const q=(document.getElementById('suiteSearch')?.value||'').toLocaleLowerCase('tr-TR');const sf=document.getElementById('statusFilter')?.value||'';const pf=document.getElementById('priorityFilter')?.value||'';return state.records.filter(r=>{const hay=JSON.stringify(r).toLocaleLowerCase('tr-TR');return (!q||hay.includes(q))&&(!sf||String(r.status||'').includes(sf))&&(!pf||String(r.priority||'').includes(pf))})}
  function renderRecords(){const box=document.getElementById('recordList');if(!box)return;const rows=recordRows();if(!rows.length){box.innerHTML='<div class="empty">Canlı veri bulunamadı. Yeni kayıt hazırlayabilir veya filtreleri temizleyebilirsiniz.</div>';return}box.innerHTML=rows.slice(0,30).map(r=>'<article class="record-card"><div><h3>'+esc(r.title||r.subject||r.name||r.code||config.title)+'</h3><p>'+esc(r.description||r.detail||r.note||r.owner||config.desc)+'</p><div class="meta">'+badge(r.status||'Açık')+badge(r.priority||'Normal')+'<span class="badge">'+esc(r.department||r.related_module||suite.name)+'</span></div></div><button class="btn" type="button" onclick="'+suite.prefix+'MessagePrep()">Mesaj</button></article>').join('')}
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
