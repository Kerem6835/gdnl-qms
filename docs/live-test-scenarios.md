# Canli Test Senaryolari

API: `https://api.gdnldigital.com`

## Oturum

- Login: gecerli kullanici ile giris yapilir.
- /me: kullanici `fullname`, `username`, `role`, `department` alanlariyla doner.
- Logout: cookie temizlenir ve tekrar /me 401 doner.

## Ana Veriler

- Users: `/api/users` aktif kullanicilari getirir.
- Departments: `/api/departments` aktif departmanlari getirir.
- Documents: `/api/documents` dokuman listesini getirir.
- CAPA: `/api/capa` CAPA / 8D kayitlarini getirir.
- Risk: `/api/risks` S/O/D/RPN alanlarini getirir.
- Audit: `/api/audits` checklist ve bulgu kayitlarini getirir.
- Training: `/api/trainings` egitim ve katilimci kayitlarini getirir.
- Supplier: `/api/suppliers` tedarikci skor kartlarini getirir.

## Mailbox

- `/api/messages` gelen/giden/taslak mesajlari getirir.
- Coklu alici secimi `message_recipients` icine yazilir.
- R2 ekleri `message_attachments` metadata ile baglanir.

## Search

- `/api/search?q=test` kullanici, departman, dokuman, CAPA, risk, aksiyon, denetim ve egitim alanlarinda sonuc doner.

## Notifications

- `/api/notifications` okunmamis ve okunmus bildirimleri doner.
- Scheduler kurallari gecikmis egitim, kalibrasyon, CAPA, denetim ve aksiyon kaydi uretir.

## R2 Upload / File Center

- `/api/files/upload` multipart dosya kabul eder.
- R2 key ve D1 metadata doner.
- File Center PDF, Word, Excel, Resim filtrelerini kullanir.

