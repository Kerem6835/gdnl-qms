# GDNL QMS Cloudflare API

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

## Mesaj Merkezi Canlı Endpointleri

GDNL QMS iç mesajlaşma sistemi dış e-posta istemcisi değildir; Gmail, Outlook, IMAP, POP3 veya Exchange bağlantısı içermez.

Yeni D1 tabloları:

- `messages`
- `message_recipients`
- `message_attachments`
- `audit_logs`

Canlı D1 migration:

```bash
wrangler d1 execute DB --remote --file api/migrations/20260607_mailbox_messages.sql
```

Worker endpointleri:

- `GET /api/messages?folder=inbox|sent|drafts|trash&search=&status=&priority=`
- `POST /api/messages`
- `GET /api/messages/:id`
- `PUT /api/messages/:id`
- `PUT /api/messages/:id/read`
- `PUT /api/messages/:id/trash`
- `PUT /api/messages/:id/restore`
- `DELETE /api/messages/:id`

Ek dosya akışı:

- Dosya içeriği `EQMS_FILES` R2 bucket içine `/api/files/upload` ile yüklenir.
- Mesaj kaydında yalnızca `r2_key`, dosya adı, mime tipi, boyut ve metadata saklanır.
- Base64, `FileReader`, `readAsDataURL` ve `fileData` kullanılmaz.
