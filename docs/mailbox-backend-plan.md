# GDNL QMS Mesaj Merkezi Backend Hazirlik Plani

Bu dokuman canli Worker yerine gecmez. `api/worker.js`, `api/schema.sql`, `api/seed.sql` ve `api/README.md` dosyalari degistirilmeden, canli `gdnl-eos-api` uzerinde uygulanacak D1/R2 sozlesmesini tarif eder.

## D1 Tablo Taslagi

```sql
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  body TEXT,
  sender_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'sent',
  priority TEXT NOT NULL DEFAULT 'normal',
  related_module TEXT DEFAULT 'General',
  related_record_id TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS message_recipients (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  read_at TEXT,
  is_read INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS message_attachments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  file_id TEXT NOT NULL,
  r2_key TEXT NOT NULL,
  filename TEXT NOT NULL,
  mime_type TEXT,
  size INTEGER,
  created_at TEXT NOT NULL
);
```

Mevcut `notifications`, `activity_logs` ve `audit_logs` tablolari varsa ayni tablolar kullanilir. Yoksa canli migration sirasinda mevcut standart kolonlarla eklenir; var olan kolonlar silinmez.

## Endpoint Sozlesmesi

- `GET /messages`: gelen, giden, taslak ve cop kutusu filtreleriyle mesaj listesi.
- `GET /messages/:id`: mesaj detay, alicilar ve R2 ek metadata.
- `POST /messages`: yeni mesaj veya taslak olusturma.
- `PUT /messages/:id`: konu, icerik, oncelik, iliskili kayit ve taslak guncelleme.
- `PUT /messages/:id/read`: alici bazli okundu bilgisi.
- `PUT /messages/:id/trash`: mesajı cop kutusuna tasima.
- `PUT /messages/:id/restore`: cop kutusundan geri yukleme.
- `DELETE /messages/:id`: yetkili kalici silme.
- `GET /message-recipients`: operasyonel alici kayitlari.
- `GET /message-attachments`: mesaj ek metadata kayitlari.
- `GET /notifications`, `POST /notifications`, `PUT /notifications/:id/read`: mesaj bildirimi uyumu.
- `GET /activity-feed`, `GET /audit-logs`: mesaj olay gecmisi.

## Payload Standardi

```json
{
  "subject": "...",
  "body": "...",
  "recipients": [
    {
      "user_id": "1",
      "fullname": "...",
      "username": "...",
      "email": "...",
      "role": "...",
      "department": "..."
    }
  ],
  "attachments": [
    {
      "file_id": "...",
      "r2_key": "...",
      "filename": "...",
      "mime_type": "...",
      "size": 12345
    }
  ],
  "related_module": "CAPA",
  "related_record_id": "...",
  "status": "sent",
  "priority": "normal"
}
```

## R2 ve Log Kurallari

- Dosyanin kendisi `EQMS_FILES` R2 bucket icinde kalir.
- Mesaj tablosunda yalnizca `file_id`, `r2_key` ve metadata tutulur.
- Mesaj gonderme, okuma, taslak kaydetme, cope tasima, geri yukleme ve ek dosya olaylari `activity_logs` / `audit_logs` uyumlu kayit uretir.
- Mesaj gonderimi `notifications` icin `type: message`, `related_module: mailbox`, `is_read: false` mantigini kullanir.
