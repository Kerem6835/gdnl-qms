# Kurulum Dokumani

## Mimari

Frontend:

- `https://qms.gdnldigital.com`

API:

- `https://api.gdnldigital.com`

Cloudflare:

- Worker: `gdnl-eos-api`
- D1 binding: `DB`
- R2 binding: `EQMS_FILES`
- Bucket: `gdnl-eqms-files`

## Dagitim Notlari

- `api/worker.js`, `api/schema.sql`, `api/seed.sql`, `api/README.md` referans/iskelettir.
- Canli Worker bu dosyalarla ezilmemelidir.
- Gecici Worker alt alan adi kullanilmaz.
- Auth, cookie, `/me`, `/logout` yapisi korunur.
