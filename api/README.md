# GDNL EQMS Cloudflare API

Frontend tek API base üzerinden konuşur:

```js
window.GDNL_API_BASE = "https://api.gdnldigital.com";
```

Mimari:

Frontend -> `https://api.gdnldigital.com` -> Cloudflare Worker `gdnl-eos-api` -> D1 `DB` / R2 `EQMS_FILES`

## Bindingler

- D1: `DB`
- R2: `EQMS_FILES`
- R2 bucket: `gdnl-eqms-files`

## Yanıt Standardı

Başarılı:

```json
{ "success": true, "data": {}, "message": "İşlem başarılı" }
```

Hatalı:

```json
{ "success": false, "error": { "code": "ERROR_CODE", "message": "Hata açıklaması" } }
```

## Notlar

- Şifreler plain text tutulmaz; Worker iskeleti hash doğrulamasına göre hazırlanmıştır.
- Dosya metadata D1 `files` tablosunda, gerçek dosya R2 üzerinde tutulur.
- RBAC ve permission middleware iskeleti `worker.js` içinde yer alır.
