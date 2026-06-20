# GDNL QMS / GDNL QMS Enterprise V3 Backend Roadmap

Bu dokuman, canli Worker ve D1 yapisina uygulanacak V3 backend kapsamidir. Repo icindeki `api/worker.js`, `api/schema.sql`, `api/seed.sql` ve `api/README.md` referans dosyalarina dokunulmadan hazirlanmistir.

## 1. RBAC Backend

Middleware izinleri:

- goruntule
- olustur
- duzenle
- sil
- onayla
- arsivle

Gerekli canli backend davranisi:

- Kullanici birden fazla role sahip olabilir.
- Yetkiler roller uzerinden toplanir.
- Endpoint bazinda module + action kontrolu yapilir.
- 401 oturum yok, 403 yetki yok olarak doner.
- Tum yetki redleri `audit_logs` icine yazilir.

## 2. PDF Export

Backend tarafinda PDF uretilecek moduller:

- Documents
- CAPA
- Risk
- Audit
- Training
- APQP
- YGG

Onemli not: APQP frontend yapisi korunacak; export endpoint APQP verisini okur, APQP sayfasini degistirmez.

## 3. Excel Export

Backend tarafinda XLSX uretilecek moduller:

- Documents
- CAPA
- Risks
- Audits
- Trainings
- Suppliers
- Actions

## 4. Activity Log Backend

Canli kaynaklar:

- activity_logs
- audit_logs

Activity Center bu iki kaynagi birlikte okuyacak.

## 5. Dashboard Analytics

Grafikler:

- Aylik trend
- Yillik trend
- Geciken isler
- Modul dagilimi
- KPI analizleri

## 6. Notification Scheduler

Otomatik kurallar:

- Egitim suresi doluyor
- Kalibrasyon yaklasiyor
- CAPA gecikti
- Denetim tarihi geldi
- Aksiyon gecikti

## 7. Global Search Backend

Tek endpoint:

- GET /api/search?q=

Arama kapsam:

- Kullanici
- Departman
- Dokuman
- CAPA
- Risk
- Aksiyon
- Denetim
- Egitim

## 8. File Center Backend

Filtreler:

- PDF
- Word
- Excel
- Resim

Kategori sistemi D1 metadata uzerinden calisir. Gercek dosya R2 icinde kalir.

## 9. OpenAPI / Swagger

OpenAPI taslagi `docs/openapi.yaml` icinde hazirlandi.
