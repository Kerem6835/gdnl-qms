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
  const pageConfigs = {
  "hr-dashboard.html": {
    "pageTitle": "İK Genel Durum Ekranı",
    "pageDescription": "Personel, işe alım, oryantasyon, devamsızlık, mesai, izin ve bordro hazırlık durumunu tek ekranda gösteren İK merkezi.",
    "heroKicker": "",
    "metricCards": [
      "Toplam personel",
      "Yeni başlayan",
      "İzinli personel",
      "Geç kalan",
      "Bordro bekleyen",
      "Açık pozisyon"
    ],
    "summaryTitle": "Bugün İK’nın Dikkat Etmesi Gerekenler",
    "summaryDescription": "İK ekibi için günlük kritik personel, puantaj ve süreç başlıkları özetlenir.",
    "summaryItems": [
      "Yeni başlayan ve oryantasyondaki personeli kontrol et",
      "İzinli, geç kalan ve eksik puantaj kayıtlarını izle",
      "Açık pozisyon ve işe alım taleplerini takip et",
      "Bordro hazırlık bekleyen kayıtları gözden geçir"
    ],
    "formTitle": "İK Günlük Notu",
    "formDescription": "İK ekibi için hızlı not, sorumlu ve termin bilgisi hazırlayın.",
    "formFields": [
      "İK notu",
      "İlgili departman",
      "Sorumlu kişi",
      "Öncelik",
      "Termin",
      "Durum",
      "Açıklama"
    ],
    "fileTitle": "İK Genel Durum Ekranı Ek Dosyaları",
    "fileDescription": "İK Genel Durum Ekranı ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "İK raporu",
      "Personel listesi",
      "Puantaj çıktısı",
      "Bordro hazırlık eki"
    ],
    "recordTitle": "İK Günlük Takip Panosu",
    "recordDescription": "İK notları, kritik personel süreçleri ve bekleyen aksiyonlar izlenir.",
    "emptyState": "Henüz İK günlük takip kaydı bulunmuyor.",
    "auditTitle": "İK İşlem Geçmişi",
    "auditDescription": "İK notu, sorumluluk, dosya ve durum işlemleri izlenir.",
    "primaryActionLabel": "İK Genel Durum Ekranı Hazırla",
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
  "hr-employees.html": {
    "pageTitle": "Personel Kartları",
    "pageDescription": "Personel kimlik, iletişim, pozisyon, departman, evrak ve çalışma durumu bilgilerinin yönetildiği personel kart ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Aktif personel",
      "Pasif personel",
      "Eksik evrak",
      "Yaklaşan sözleşme"
    ],
    "summaryTitle": "Personel Kartı Kontrolü",
    "summaryDescription": "Personel bilgileri, evrakları ve çalışma durumu tek kayıt üzerinden takip edilir.",
    "summaryItems": [
      "Personel temel bilgilerini güncelle",
      "Departman, pozisyon ve yönetici bilgisini eşleştir",
      "Eksik evrak ve sertifika durumunu izle",
      "Personel evraklarını R2 standardıyla ilişkilendir"
    ],
    "formTitle": "Personel Kartı",
    "formDescription": "Personel no, ad soyad, departman, pozisyon ve iletişim bilgilerini girin.",
    "formFields": [
      "Personel no",
      "Ad soyad",
      "Departman",
      "Pozisyon",
      "İşe giriş tarihi",
      "Çalışma tipi",
      "Yönetici",
      "Durum",
      "Telefon",
      "Acil kişi"
    ],
    "fileTitle": "Personel Kartları Ek Dosyaları",
    "fileDescription": "Personel Kartları ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Sağlık raporu",
      "Sözleşme",
      "Kimlik evrakı",
      "Sertifika",
      "Zimmet formu",
      "İzin evrakı",
      "Performans belgesi"
    ],
    "recordTitle": "Personel Kartları Panosu",
    "recordDescription": "Personel kayıtları departman, pozisyon, durum ve evrak bilgisiyle izlenir.",
    "emptyState": "Henüz personel kartı bulunmuyor.",
    "auditTitle": "Personel Kartı Geçmişi",
    "auditDescription": "Personel bilgisi, evrak, durum ve yönetici değişiklikleri izlenir.",
    "primaryActionLabel": "Personel Kartları Hazırla",
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
  "hr-recruitment.html": {
    "pageTitle": "İşe Alım Süreci",
    "pageDescription": "Pozisyon talebinden aday havuzu, mülakat, teklif, evrak ve işe başlatma adımlarına kadar işe alım sürecinin yönetildiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Açık pozisyon",
      "Mülakat bekleyen",
      "Teklif aşaması",
      "Evrak bekleyen"
    ],
    "summaryTitle": "İşe Alım Akışı",
    "summaryDescription": "Talep, aday, mülakat, teklif ve işe başlatma adımları birlikte izlenir.",
    "summaryItems": [
      "Pozisyon talebini ve departmanı belirle",
      "Aday ve mülakat tarihini kaydet",
      "Değerlendirici ve teklif durumunu takip et",
      "Başlangıç tarihi ve evrak durumunu tamamla"
    ],
    "formTitle": "İşe Alım Kaydı",
    "formDescription": "Pozisyon, aday, mülakat ve teklif bilgilerini girin.",
    "formFields": [
      "Pozisyon",
      "Talep eden departman",
      "Aday adı",
      "Mülakat tarihi",
      "Değerlendirici",
      "Teklif durumu",
      "Başlangıç tarihi",
      "Evrak durumu"
    ],
    "fileTitle": "İşe Alım Süreci Ek Dosyaları",
    "fileDescription": "İşe Alım Süreci ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Aday CV",
      "Mülakat formu",
      "Teklif dosyası",
      "Evrak listesi"
    ],
    "recordTitle": "İşe Alım Takip Panosu",
    "recordDescription": "Açık pozisyonlar aday, mülakat ve teklif durumuna göre izlenir.",
    "emptyState": "Henüz işe alım kaydı bulunmuyor.",
    "auditTitle": "İşe Alım İşlem Geçmişi",
    "auditDescription": "Talep, mülakat, teklif ve evrak işlemleri izlenir.",
    "primaryActionLabel": "İşe Alım Süreci Hazırla",
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
  "hr-internship.html": {
    "pageTitle": "Stajyer Yönetimi",
    "pageDescription": "Stajyer başvurusu, okul/bölüm bilgisi, staj dönemi, mentor, evrak, devam ve değerlendirme bilgilerinin takip edildiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Aktif stajyer",
      "Başlayan staj",
      "Biten staj",
      "Evrak bekleyen"
    ],
    "summaryTitle": "Stajyer Takip Akışı",
    "summaryDescription": "Staj kabul, mentor atama, devam ve değerlendirme adımları izlenir.",
    "summaryItems": [
      "Stajyer okul ve bölüm bilgisini kaydet",
      "Staj dönemini ve departmanı belirle",
      "Mentor ve devam durumunu takip et",
      "Bitiş değerlendirmesini ve evrakları tamamla"
    ],
    "formTitle": "Stajyer Kaydı",
    "formDescription": "Stajyer, okul, bölüm, dönem, mentor ve değerlendirme bilgilerini girin.",
    "formFields": [
      "Stajyer adı",
      "Okul",
      "Bölüm",
      "Staj tipi",
      "Başlangıç",
      "Bitiş",
      "Departman",
      "Mentor",
      "Devam durumu",
      "Değerlendirme"
    ],
    "fileTitle": "Stajyer Yönetimi Ek Dosyaları",
    "fileDescription": "Stajyer Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Staj başvuru evrakı",
      "Okul yazısı",
      "Devam formu",
      "Değerlendirme formu"
    ],
    "recordTitle": "Stajyer Takip Panosu",
    "recordDescription": "Stajyerler dönem, mentor, devam ve değerlendirme durumuyla izlenir.",
    "emptyState": "Henüz stajyer kaydı bulunmuyor.",
    "auditTitle": "Stajyer İşlem Geçmişi",
    "auditDescription": "Staj kabul, mentor, evrak ve değerlendirme işlemleri izlenir.",
    "primaryActionLabel": "Stajyer Yönetimi Hazırla",
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
  "hr-onboarding.html": {
    "pageTitle": "Oryantasyon Süreci",
    "pageDescription": "Yeni çalışanın ilk gün hazırlığı, eğitimleri, evrak teslimi, departman tanıtımı, görev tanımı ve zimmet adımlarının izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Oryantasyondaki personel",
      "Eksik eğitim",
      "Eksik evrak",
      "Tamamlanan oryantasyon"
    ],
    "summaryTitle": "Oryantasyon Kontrol Akışı",
    "summaryDescription": "Yeni çalışan için ilk gün, eğitim, evrak ve zimmet adımları takip edilir.",
    "summaryItems": [
      "Yeni çalışan ve İK sorumlusunu ata",
      "İSG ve kalite eğitimlerini kontrol et",
      "Görev tanımı ve departman tanıtımını tamamla",
      "Zimmet ve evrak teslimini kapat"
    ],
    "formTitle": "Oryantasyon Planı",
    "formDescription": "Yeni çalışan, İK sorumlusu, mentor, eğitim ve tamamlanma bilgilerini girin.",
    "formFields": [
      "Yeni çalışan",
      "İK sorumlusu",
      "Departman mentoru",
      "İSG eğitimi",
      "Kalite eğitimi",
      "Görev tanımı",
      "Zimmet",
      "Tamamlanma oranı",
      "Durum"
    ],
    "fileTitle": "Oryantasyon Süreci Ek Dosyaları",
    "fileDescription": "Oryantasyon Süreci ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Oryantasyon checklist",
      "Eğitim katılım formu",
      "Görev tanımı",
      "Zimmet formu"
    ],
    "recordTitle": "Oryantasyon Takip Panosu",
    "recordDescription": "Oryantasyon kayıtları eğitim, evrak, zimmet ve tamamlanma durumuyla izlenir.",
    "emptyState": "Henüz oryantasyon kaydı bulunmuyor.",
    "auditTitle": "Oryantasyon İşlem Geçmişi",
    "auditDescription": "Oryantasyon adımı, eğitim, evrak ve zimmet işlemleri izlenir.",
    "primaryActionLabel": "Oryantasyon Süreci Hazırla",
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
  "hr-attendance.html": {
    "pageTitle": "Puantaj ve Devam Takibi",
    "pageDescription": "Giriş/çıkış, geç kalma, erken çıkış, tolerans, devamsızlık ve aylık toplam saat izlenir. Günlük tolerans ve aylık eksik/fazla süre hesapları kurum içi hesaplama parametreleriyle yapılır.",
    "heroKicker": "",
    "metricCards": [
      "Eksik puantaj",
      "Geç kalan",
      "Devamsızlık",
      "Onay bekleyen"
    ],
    "summaryTitle": "Puantaj Kontrol Akışı",
    "summaryDescription": "Günlük giriş/çıkış ve tolerans durumları aylık toplamlarla birlikte izlenir.",
    "summaryItems": [
      "Planlanan ve gerçek giriş/çıkış saatlerini karşılaştır",
      "Geç kalma ve erken çıkış süresini hesapla",
      "Devamsızlık ve onay durumunu takip et",
      "Aylık eksik/fazla süre özetini hazırla"
    ],
    "formTitle": "Puantaj Kaydı",
    "formDescription": "Personel tarih ve giriş/çıkış bilgilerini girin.",
    "formFields": [
      "Personel",
      "Tarih",
      "Planlanan giriş",
      "Gerçek giriş",
      "Planlanan çıkış",
      "Gerçek çıkış",
      "Geç kalma",
      "Erken çıkış",
      "Devamsızlık",
      "Onay durumu"
    ],
    "fileTitle": "Puantaj ve Devam Takibi Ek Dosyaları",
    "fileDescription": "Puantaj ve Devam Takibi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Puantaj çıktısı",
      "Devam formu",
      "Onay belgesi",
      "Açıklama eki"
    ],
    "recordTitle": "Puantaj Takip Panosu",
    "recordDescription": "Personel devam kayıtları gecikme, devamsızlık ve onay durumuyla izlenir.",
    "emptyState": "Henüz puantaj kaydı bulunmuyor.",
    "auditTitle": "Puantaj İşlem Geçmişi",
    "auditDescription": "Giriş/çıkış, tolerans, onay ve açıklama değişiklikleri izlenir.",
    "primaryActionLabel": "Puantaj ve Devam Takibi Hazırla",
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
  "hr-shift-planning.html": {
    "pageTitle": "Vardiya Planlama",
    "pageDescription": "Günlük ve haftalık vardiya planı, çalışan atama, mola, gece vardiyası ve çakışma kontrolünün yapıldığı ekran.",
    "heroKicker": "",
    "metricCards": [
      "Aktif vardiya",
      "Atanmamış personel",
      "Çakışma uyarısı",
      "Gece vardiyası"
    ],
    "summaryTitle": "Vardiya Planlama Akışı",
    "summaryDescription": "Vardiya saatleri, personel atamaları ve çakışma uyarıları birlikte izlenir.",
    "summaryItems": [
      "Vardiya adı, başlangıç ve bitiş saatini belirle",
      "Departman ve personel atamalarını yap",
      "Mola ve gece vardiyası bilgisini gir",
      "Haftalık çalışma günleri ve çakışmaları kontrol et"
    ],
    "formTitle": "Vardiya Kaydı",
    "formDescription": "Vardiya saati, mola, departman ve personel atamasını hazırlayın.",
    "formFields": [
      "Vardiya adı",
      "Başlangıç",
      "Bitiş",
      "Mola",
      "Departman",
      "Personeller",
      "Haftalık çalışma günleri",
      "Gece vardiyası",
      "Durum"
    ],
    "fileTitle": "Vardiya Planlama Ek Dosyaları",
    "fileDescription": "Vardiya Planlama ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Vardiya planı",
      "Haftalık çizelge",
      "Çakışma raporu"
    ],
    "recordTitle": "Vardiya Planları Panosu",
    "recordDescription": "Vardiyalar departman, personel, saat ve çakışma durumuyla izlenir.",
    "emptyState": "Henüz vardiya planı bulunmuyor.",
    "auditTitle": "Vardiya İşlem Geçmişi",
    "auditDescription": "Vardiya saatleri, personel ataması ve çakışma işlemleri izlenir.",
    "primaryActionLabel": "Vardiya Planlama Hazırla",
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
  "hr-overtime.html": {
    "pageTitle": "Mesai Yönetimi",
    "pageDescription": "Fazla mesai talebi, planlanan/gerçek mesai, kota, tolerans, onay ve aylık toplamların izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Mesai talebi",
      "Onay bekleyen",
      "Fazla mesai",
      "Eksik mesai"
    ],
    "summaryTitle": "Mesai Kontrol Akışı",
    "summaryDescription": "Mesai talepleri planlanan/gerçek süre ve onay durumuyla takip edilir.",
    "summaryItems": [
      "Personel ve mesai tarihini belirle",
      "Planlanan ve gerçek mesai süresini karşılaştır",
      "Onaylayan yönetici ve durum bilgisini izle",
      "Aylık toplam ve kota etkisini kontrol et"
    ],
    "formTitle": "Mesai Kaydı",
    "formDescription": "Personel, tarih, mesai tipi ve onay bilgilerini girin.",
    "formFields": [
      "Personel",
      "Tarih",
      "Mesai tipi",
      "Planlanan mesai",
      "Gerçek mesai",
      "Fazla mesai",
      "Eksik mesai",
      "Onaylayan",
      "Durum"
    ],
    "fileTitle": "Mesai Yönetimi Ek Dosyaları",
    "fileDescription": "Mesai Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Mesai formu",
      "Onay belgesi",
      "Aylık mesai raporu"
    ],
    "recordTitle": "Mesai Takip Panosu",
    "recordDescription": "Mesai kayıtları personel, süre, onay ve durum bilgisiyle izlenir.",
    "emptyState": "Henüz mesai kaydı bulunmuyor.",
    "auditTitle": "Mesai İşlem Geçmişi",
    "auditDescription": "Mesai talebi, onay, süre ve durum değişiklikleri izlenir.",
    "primaryActionLabel": "Mesai Yönetimi Hazırla",
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
  "hr-payroll.html": {
    "pageTitle": "Bordro Hazırlığı",
    "pageDescription": "Resmi bordro yerine geçmeyen; muhasebe/finans bordrosu için İK hazırlık verisi üreten çalışma saati, mesai, izin ve kesinti özet ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Hazırlık bekleyen",
      "Onay bekleyen",
      "Eksik veri",
      "Tamamlanan hazırlık"
    ],
    "summaryTitle": "Bordro Hazırlık Akışı",
    "summaryDescription": "Aylık çalışma, mesai, eksik süre, izin ve kesinti verileri hazırlanır.",
    "summaryItems": [
      "Personel ve ay bilgisini seç",
      "Normal çalışma ve fazla mesai sürelerini hesapla",
      "İzin, devamsızlık ve kesinti etkisini kontrol et",
      "Hazırlık özetini onay durumuna bağla"
    ],
    "formTitle": "Bordro Hazırlık Kaydı",
    "formDescription": "Aylık çalışma saati, mesai, izin ve hazırlık özetini girin.",
    "formFields": [
      "Personel",
      "Ay",
      "Normal çalışma saati",
      "Fazla mesai",
      "Eksik çalışma",
      "Geç kalma",
      "İzin",
      "Devamsızlık",
      "Ek ödeme",
      "Kesinti",
      "Hazırlık özeti"
    ],
    "fileTitle": "Bordro Hazırlığı Ek Dosyaları",
    "fileDescription": "Bordro Hazırlığı ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Bordro hazırlık çıktısı",
      "Mesai raporu",
      "Puantaj raporu",
      "Kesinti eki"
    ],
    "recordTitle": "Bordro Hazırlık Panosu",
    "recordDescription": "Bordro hazırlık kayıtları ay, personel, eksik veri ve onay durumuyla izlenir.",
    "emptyState": "Henüz bordro hazırlık kaydı bulunmuyor.",
    "auditTitle": "Bordro Hazırlık Geçmişi",
    "auditDescription": "Çalışma saati, mesai, izin ve hazırlık özeti değişiklikleri izlenir.",
    "primaryActionLabel": "Bordro Hazırlığı Hazırla",
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
  "hr-leave.html": {
    "pageTitle": "İzin Yönetimi",
    "pageDescription": "İzin taleplerinin izin türü, tarih aralığı, gün hesabı, onaylayan ve durum bilgisiyle izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Açık izin talebi",
      "Onay bekleyen",
      "Bu ay izinli",
      "Kapanan izin"
    ],
    "summaryTitle": "İzin Onay Akışı",
    "summaryDescription": "İzin talebi, tarih aralığı, gün hesabı ve onay durumu birlikte izlenir.",
    "summaryItems": [
      "Personel ve izin türünü seç",
      "Başlangıç/bitiş tarihleriyle gün sayısını hesapla",
      "Onaylayan ve durum bilgisini takip et",
      "Personel izin geçmişini kayıt altına al"
    ],
    "formTitle": "İzin Talebi",
    "formDescription": "Personel, izin türü, tarih aralığı ve onay bilgilerini girin.",
    "formFields": [
      "Personel",
      "İzin türü",
      "Başlangıç",
      "Bitiş",
      "Gün sayısı",
      "Onaylayan",
      "Durum",
      "Açıklama"
    ],
    "fileTitle": "İzin Yönetimi Ek Dosyaları",
    "fileDescription": "İzin Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "İzin formu",
      "Rapor belgesi",
      "Onay yazısı"
    ],
    "recordTitle": "İzin Talepleri Panosu",
    "recordDescription": "İzin talepleri personel, tür, tarih ve onay durumuyla izlenir.",
    "emptyState": "Henüz izin talebi bulunmuyor.",
    "auditTitle": "İzin İşlem Geçmişi",
    "auditDescription": "İzin talebi, onay, tarih ve açıklama değişiklikleri izlenir.",
    "primaryActionLabel": "İzin Yönetimi Hazırla",
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
  "hr-performance.html": {
    "pageTitle": "Performans Değerlendirme",
    "pageDescription": "Personel hedefleri, yetkinlikleri, yönetici notu, puan ve gelişim planının takip edildiği performans ekranı.",
    "heroKicker": "",
    "metricCards": [
      "Açık değerlendirme",
      "Tamamlanan değerlendirme",
      "Gelişim planı",
      "Düşük performans uyarısı"
    ],
    "summaryTitle": "Performans Değerlendirme Akışı",
    "summaryDescription": "Değerlendirme dönemi, hedefler, yetkinlikler ve gelişim planları izlenir.",
    "summaryItems": [
      "Personel ve değerlendirme dönemini seç",
      "Hedef ve yetkinlik başlıklarını gir",
      "Puan ve yönetici notunu tamamla",
      "Gelişim aksiyonunu takip et"
    ],
    "formTitle": "Performans Kaydı",
    "formDescription": "Personel, dönem, değerlendirici, puan ve gelişim planını girin.",
    "formFields": [
      "Personel",
      "Dönem",
      "Değerlendiren",
      "Hedefler",
      "Yetkinlikler",
      "Puan",
      "Gelişim planı",
      "Durum"
    ],
    "fileTitle": "Performans Değerlendirme Ek Dosyaları",
    "fileDescription": "Performans Değerlendirme ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Performans formu",
      "Gelişim planı",
      "Değerlendirme eki"
    ],
    "recordTitle": "Performans Panosu",
    "recordDescription": "Performans kayıtları dönem, puan, değerlendirici ve durum bilgisiyle izlenir.",
    "emptyState": "Henüz performans değerlendirme kaydı bulunmuyor.",
    "auditTitle": "Performans İşlem Geçmişi",
    "auditDescription": "Puan, hedef, yetkinlik ve gelişim planı değişiklikleri izlenir.",
    "primaryActionLabel": "Performans Değerlendirme Hazırla",
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
  "hr-competency.html": {
    "pageTitle": "Yetkinlik Yönetimi",
    "pageDescription": "Rol bazlı yetkinlik, mevcut seviye, hedef seviye, eğitim ihtiyacı ve değerlendiren bilgisinin izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Eksik yetkinlik",
      "Kritik rol",
      "Eğitim ihtiyacı",
      "Tamamlanan yetkinlik"
    ],
    "summaryTitle": "Yetkinlik Matrisi Akışı",
    "summaryDescription": "Pozisyonlara göre gerekli yetkinlikler, seviye farkı ve eğitim ihtiyacı takip edilir.",
    "summaryItems": [
      "Personel ve pozisyon bilgisini seç",
      "Gerekli ve mevcut yetkinlik seviyesini karşılaştır",
      "Eğitim ihtiyacını belirle",
      "Değerlendiren ve tarih bilgisini kaydet"
    ],
    "formTitle": "Yetkinlik Kaydı",
    "formDescription": "Personel, pozisyon, yetkinlik seviyesi ve eğitim ihtiyacını girin.",
    "formFields": [
      "Personel",
      "Pozisyon",
      "Gerekli yetkinlik",
      "Mevcut seviye",
      "Hedef seviye",
      "Eğitim ihtiyacı",
      "Değerlendiren"
    ],
    "fileTitle": "Yetkinlik Yönetimi Ek Dosyaları",
    "fileDescription": "Yetkinlik Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Yetkinlik matrisi",
      "Eğitim ihtiyacı raporu",
      "Değerlendirme formu"
    ],
    "recordTitle": "Yetkinlik Panosu",
    "recordDescription": "Yetkinlik kayıtları pozisyon, seviye farkı ve eğitim ihtiyacıyla izlenir.",
    "emptyState": "Henüz yetkinlik kaydı bulunmuyor.",
    "auditTitle": "Yetkinlik İşlem Geçmişi",
    "auditDescription": "Yetkinlik seviyesi, eğitim ihtiyacı ve değerlendirme değişiklikleri izlenir.",
    "primaryActionLabel": "Yetkinlik Yönetimi Hazırla",
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
  "hr-training.html": {
    "pageTitle": "İK Eğitim Takibi",
    "pageDescription": "Eğitim planı, eğitmen, katılımcılar, tarih, sınav puanı, sertifika ve geçerlilik tarihinin izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Planlı eğitim",
      "Katılımcı",
      "Sertifika bekleyen",
      "Geçerlilik yaklaşan"
    ],
    "summaryTitle": "Eğitim Takip Akışı",
    "summaryDescription": "Eğitim katılımı, sertifika ve geçerlilik tarihleri İK bakış açısıyla izlenir.",
    "summaryItems": [
      "Eğitim adı ve eğitmeni belirle",
      "Katılımcıları /users üzerinden seç",
      "Sınav puanı ve sertifika durumunu kaydet",
      "Geçerlilik tarihini takip et"
    ],
    "formTitle": "Eğitim Kaydı",
    "formDescription": "Eğitim, eğitmen, katılımcılar ve sertifika bilgilerini girin.",
    "formFields": [
      "Eğitim adı",
      "Eğitmen",
      "Katılımcılar",
      "Tarih",
      "Süre",
      "Sınav puanı",
      "Sertifika",
      "Geçerlilik tarihi",
      "Durum"
    ],
    "fileTitle": "İK Eğitim Takibi Ek Dosyaları",
    "fileDescription": "İK Eğitim Takibi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Eğitim sunumu",
      "Katılım formu",
      "Sertifika",
      "Sınav sonucu"
    ],
    "recordTitle": "İK Eğitim Panosu",
    "recordDescription": "Eğitim kayıtları katılımcı, sertifika ve geçerlilik durumuyla izlenir.",
    "emptyState": "Henüz İK eğitim kaydı bulunmuyor.",
    "auditTitle": "Eğitim İşlem Geçmişi",
    "auditDescription": "Eğitim, katılımcı, sertifika ve geçerlilik işlemleri izlenir.",
    "primaryActionLabel": "İK Eğitim Takibi Hazırla",
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
  "hr-assets.html": {
    "pageTitle": "Zimmet Yönetimi",
    "pageDescription": "Personel zimmetleri, verilen cihaz/ekipman, teslim/iade tarihi, hasar/kayıp ve durum bilgilerinin yönetildiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Aktif zimmet",
      "İade bekleyen",
      "Hasar bildirimi",
      "Kayıp ekipman"
    ],
    "summaryTitle": "Zimmet Takip Akışı",
    "summaryDescription": "Zimmet teslimi, iadesi, hasar/kayıp durumu ve dosyaları takip edilir.",
    "summaryItems": [
      "Personel ve zimmet tipini seç",
      "Cihaz/ekipman ve seri no bilgisini gir",
      "Teslim ve iade tarihini takip et",
      "Hasar/kayıp durumunu kayıt altına al"
    ],
    "formTitle": "Zimmet Kaydı",
    "formDescription": "Personel, ekipman, seri no ve teslim/iade bilgilerini girin.",
    "formFields": [
      "Personel",
      "Zimmet tipi",
      "Cihaz/ekipman",
      "Seri no",
      "Teslim tarihi",
      "İade tarihi",
      "Durum"
    ],
    "fileTitle": "Zimmet Yönetimi Ek Dosyaları",
    "fileDescription": "Zimmet Yönetimi ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Zimmet formu",
      "Cihaz fotoğrafı",
      "İade tutanağı",
      "Hasar raporu"
    ],
    "recordTitle": "Zimmet Panosu",
    "recordDescription": "Zimmet kayıtları personel, ekipman, iade ve durum bilgisiyle izlenir.",
    "emptyState": "Henüz zimmet kaydı bulunmuyor.",
    "auditTitle": "Zimmet İşlem Geçmişi",
    "auditDescription": "Zimmet teslim, iade, hasar ve dosya işlemleri izlenir.",
    "primaryActionLabel": "Zimmet Yönetimi Hazırla",
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
  "hr-exit.html": {
    "pageTitle": "İşten Ayrılış Süreci",
    "pageDescription": "Çıkış checklist, zimmet iade, evrak, BT hesap kapatma bildirimi, çıkış görüşmesi ve kapanış durumunun izlendiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Açık çıkış süreci",
      "Zimmet bekleyen",
      "BT bildirim bekleyen",
      "Kapanan çıkış"
    ],
    "summaryTitle": "Çıkış Süreci Akışı",
    "summaryDescription": "Ayrılış bildirimi, zimmet iade, evrak ve kapanış adımları birlikte takip edilir.",
    "summaryItems": [
      "Personel ve çıkış tarihini belirle",
      "Çıkış nedeni ve görüşme notunu kaydet",
      "Zimmet ve evrak iade durumunu takip et",
      "BT hesap kapatma bildirimini hazırla"
    ],
    "formTitle": "İşten Ayrılış Kaydı",
    "formDescription": "Çıkış tarihi, neden, zimmet ve kapanış bilgilerini girin.",
    "formFields": [
      "Personel",
      "Çıkış tarihi",
      "Çıkış nedeni",
      "Zimmet durumu",
      "BT hesap kapatma durumu",
      "Çıkış görüşmesi",
      "Kapanış durumu"
    ],
    "fileTitle": "İşten Ayrılış Süreci Ek Dosyaları",
    "fileDescription": "İşten Ayrılış Süreci ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Çıkış formu",
      "Zimmet iade tutanağı",
      "Görüşme notu",
      "Evrak teslim formu"
    ],
    "recordTitle": "İşten Ayrılış Panosu",
    "recordDescription": "Çıkış süreçleri personel, zimmet, BT bildirimi ve kapanış durumuyla izlenir.",
    "emptyState": "Henüz işten ayrılış kaydı bulunmuyor.",
    "auditTitle": "İşten Ayrılış İşlem Geçmişi",
    "auditDescription": "Çıkış bildirimi, zimmet, BT ve kapanış işlemleri izlenir.",
    "primaryActionLabel": "İşten Ayrılış Süreci Hazırla",
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
  "hr-reports.html": {
    "pageTitle": "İK Raporları",
    "pageDescription": "Personel, işe alım, stajyer, oryantasyon, puantaj, mesai, bordro hazırlık, izin, performans, yetkinlik, eğitim, zimmet ve çıkış raporlarının hazırlandığı ekran.",
    "heroKicker": "",
    "metricCards": [
      "Hazır rapor",
      "Bekleyen rapor",
      "Kritik rapor",
      "Dışa aktarım hazırlığı"
    ],
    "summaryTitle": "İK Rapor Hazırlığı",
    "summaryDescription": "İK raporları rapor tipi, dönem, departman ve hazırlayan kişiyle takip edilir.",
    "summaryItems": [
      "Rapor tipini ve dönem aralığını seç",
      "Departman filtresini belirle",
      "Hazırlayan kişi ve açıklamayı gir",
      "PDF/Excel hazırlık dosyalarını ilişkilendir"
    ],
    "formTitle": "İK Rapor Kaydı",
    "formDescription": "Rapor adı, tipi, dönem ve hazırlayan kişi bilgilerini girin.",
    "formFields": [
      "Rapor adı",
      "Rapor tipi",
      "Dönem",
      "Departman filtresi",
      "Hazırlayan kişi",
      "Açıklama",
      "Durum"
    ],
    "fileTitle": "İK Raporları Ek Dosyaları",
    "fileDescription": "İK Raporları ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "Personel raporu",
      "Puantaj raporu",
      "Mesai raporu",
      "İzin raporu",
      "Eğitim raporu"
    ],
    "recordTitle": "İK Rapor Panosu",
    "recordDescription": "İK raporları tip, dönem, hazırlayan ve durum bilgisiyle izlenir.",
    "emptyState": "Henüz İK raporu bulunmuyor.",
    "auditTitle": "İK Rapor Geçmişi",
    "auditDescription": "Rapor hazırlama, dosya ekleme ve dışa aktarım hazırlığı işlemleri izlenir.",
    "primaryActionLabel": "İK Raporları Hazırla",
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
  "hr-policies.html": {
    "pageTitle": "İK Politikaları",
    "pageDescription": "İşe alım, oryantasyon, mesai, izin, performans, zimmet, disiplin ve stajyer politikalarının takip edildiği ekran.",
    "heroKicker": "",
    "metricCards": [
      "Aktif politika",
      "Revizyon bekleyen",
      "Okundu bekleyen",
      "Onaylı politika"
    ],
    "summaryTitle": "İK Politika Akışı",
    "summaryDescription": "İK politikaları revizyon, dağıtım, okundu bilgisi ve onay durumuyla izlenir.",
    "summaryItems": [
      "Politika türünü ve sorumlusunu belirle",
      "Revizyon ve yayın tarihini takip et",
      "Dağıtım ve okundu durumunu kontrol et",
      "Doküman Yönetimi bağlantısını hazırla"
    ],
    "formTitle": "İK Politika Kaydı",
    "formDescription": "Politika adı, türü, revizyon ve sorumlu bilgilerini girin.",
    "formFields": [
      "Politika adı",
      "Politika türü",
      "Revizyon no",
      "Sorumlu kişi",
      "Yayın tarihi",
      "Okundu bilgisi",
      "Durum"
    ],
    "fileTitle": "İK Politikaları Ek Dosyaları",
    "fileDescription": "İK Politikaları ile ilgili formları, raporları, kanıtları ve destekleyici evrakları R2 standardıyla yükleyin.",
    "fileCategories": [
      "İşe alım politikası",
      "Oryantasyon politikası",
      "Mesai politikası",
      "İzin politikası",
      "Performans politikası",
      "Zimmet politikası",
      "Disiplin politikası",
      "Stajyer politikası"
    ],
    "recordTitle": "İK Politikaları Panosu",
    "recordDescription": "İK politikaları tür, revizyon, dağıtım ve okundu durumuyla izlenir.",
    "emptyState": "Henüz İK politikası bulunmuyor.",
    "auditTitle": "İK Politika Geçmişi",
    "auditDescription": "Politika revizyonu, dağıtım ve okundu işlemleri izlenir.",
    "primaryActionLabel": "İK Politikaları Hazırla",
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
