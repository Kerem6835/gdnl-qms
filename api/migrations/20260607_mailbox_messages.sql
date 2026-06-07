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

CREATE TABLE IF NOT EXISTS audit_logs (
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
