-- GDNL EOS Mailbox live fix
-- Safe baseline for internal messaging. This migration only creates missing
-- mailbox tables and does not drop, truncate, or rewrite existing data.

CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  subject TEXT,
  body TEXT,
  sender_id TEXT,
  sender_name TEXT,
  priority TEXT DEFAULT 'normal',
  status TEXT DEFAULT 'sent',
  folder_status TEXT DEFAULT 'sent',
  related_module TEXT DEFAULT 'General',
  related_record_id TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  sent_at TEXT,
  deleted_at TEXT
);

CREATE TABLE IF NOT EXISTS message_recipients (
  id TEXT PRIMARY KEY,
  message_id TEXT NOT NULL,
  recipient_id TEXT,
  recipient_name TEXT,
  recipient_email TEXT,
  is_read INTEGER DEFAULT 0,
  read_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

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

CREATE TABLE IF NOT EXISTS activity_feed (
  id TEXT PRIMARY KEY,
  module TEXT,
  action TEXT,
  record_no TEXT,
  user_id TEXT,
  user_name TEXT,
  detail TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

-- Live D1 mailbox column fix.
-- Apply only to databases where PRAGMA table_info shows these columns missing.
-- The Worker also performs the same checks at runtime and adds only missing columns.

ALTER TABLE messages ADD COLUMN sender_name TEXT;
ALTER TABLE messages ADD COLUMN priority TEXT DEFAULT 'normal';
ALTER TABLE messages ADD COLUMN folder_status TEXT DEFAULT 'sent';
ALTER TABLE messages ADD COLUMN related_module TEXT DEFAULT 'General';
ALTER TABLE messages ADD COLUMN related_record_id TEXT;
ALTER TABLE messages ADD COLUMN updated_at TEXT;
ALTER TABLE messages ADD COLUMN sent_at TEXT;
ALTER TABLE messages ADD COLUMN deleted_at TEXT;

ALTER TABLE message_recipients ADD COLUMN recipient_name TEXT;
ALTER TABLE message_recipients ADD COLUMN recipient_email TEXT;
ALTER TABLE message_recipients ADD COLUMN is_read INTEGER DEFAULT 0;
ALTER TABLE message_recipients ADD COLUMN read_at TEXT;
ALTER TABLE message_recipients ADD COLUMN created_at TEXT;

ALTER TABLE message_attachments ADD COLUMN file_type TEXT;
ALTER TABLE message_attachments ADD COLUMN file_size INTEGER;
ALTER TABLE message_attachments ADD COLUMN url TEXT;
ALTER TABLE message_attachments ADD COLUMN uploaded_by TEXT;
ALTER TABLE message_attachments ADD COLUMN created_at TEXT;
