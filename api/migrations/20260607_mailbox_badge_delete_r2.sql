-- GDNL QMS Mailbox unread badge + permanent delete/R2 cleanup support.
-- No DROP TABLE, no data deletion. Existing data is preserved.

CREATE TABLE IF NOT EXISTS message_attachments (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  file_name TEXT,
  file_type TEXT,
  file_size INTEGER,
  r2_key TEXT,
  url TEXT,
  uploaded_by TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS message_recipients (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  recipient_id TEXT,
  user_id TEXT,
  recipient_name TEXT,
  recipient_email TEXT,
  is_read INTEGER DEFAULT 0,
  status TEXT,
  read_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Apply the following ALTER statements only if PRAGMA table_info shows the
-- column is missing. The Worker performs this check at runtime automatically.

ALTER TABLE message_recipients ADD COLUMN user_id TEXT;
ALTER TABLE message_recipients ADD COLUMN status TEXT;
ALTER TABLE message_recipients ADD COLUMN recipient_name TEXT;
ALTER TABLE message_recipients ADD COLUMN recipient_email TEXT;
ALTER TABLE message_recipients ADD COLUMN is_read INTEGER DEFAULT 0;
ALTER TABLE message_recipients ADD COLUMN read_at TEXT;
ALTER TABLE message_recipients ADD COLUMN created_at TEXT;

ALTER TABLE message_attachments ADD COLUMN file_name TEXT;
ALTER TABLE message_attachments ADD COLUMN file_type TEXT;
ALTER TABLE message_attachments ADD COLUMN file_size INTEGER;
ALTER TABLE message_attachments ADD COLUMN r2_key TEXT;
ALTER TABLE message_attachments ADD COLUMN url TEXT;
ALTER TABLE message_attachments ADD COLUMN uploaded_by TEXT;
ALTER TABLE message_attachments ADD COLUMN created_at TEXT;

