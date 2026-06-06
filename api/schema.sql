CREATE TABLE IF NOT EXISTS departments (
  id TEXT PRIMARY KEY,
  department_name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT,
  fullname TEXT NOT NULL,
  email TEXT,
  role TEXT,
  department TEXT,
  department_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  token TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS roles (
  id TEXT PRIMARY KEY,
  role_name TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS permissions (
  id TEXT PRIMARY KEY,
  permission_key TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS user_roles (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  role_id TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  document_code TEXT,
  document_name TEXT,
  document_type TEXT,
  department_id TEXT,
  owner_id TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS document_revisions (
  id TEXT PRIMARY KEY,
  document_id TEXT,
  revision_no TEXT,
  reason TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS document_approvals (
  id TEXT PRIMARY KEY,
  document_id TEXT,
  approver_id TEXT,
  decision TEXT,
  note TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS files (
  id TEXT PRIMARY KEY,
  file_name TEXT,
  mime_type TEXT,
  file_size INTEGER,
  r2_key TEXT NOT NULL,
  module TEXT,
  record_no TEXT,
  status TEXT DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT,
  created_by TEXT,
  updated_by TEXT
);

CREATE TABLE IF NOT EXISTS capa (id TEXT PRIMARY KEY, title TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS risks (id TEXT PRIMARY KEY, title TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS actions (id TEXT PRIMARY KEY, title TEXT, owner_id TEXT, due_date TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS notifications (id TEXT PRIMARY KEY, title TEXT, message TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS standards (id TEXT PRIMARY KEY, standard_name TEXT, clause_no TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS audits (id TEXT PRIMARY KEY, audit_no TEXT, title TEXT, lead_auditor_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS trainings (id TEXT PRIMARY KEY, training_no TEXT, title TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS suppliers (id TEXT PRIMARY KEY, supplier_name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS management_reviews (id TEXT PRIMARY KEY, review_no TEXT, title TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS activity_logs (id TEXT PRIMARY KEY, module TEXT, action TEXT, record_no TEXT, user_id TEXT, user_name TEXT, detail TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS role_permissions (id TEXT PRIMARY KEY, role_id TEXT, permission_id TEXT, permission TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS comments (id TEXT PRIMARY KEY, module TEXT, related_id TEXT, comment TEXT, user_id TEXT, user_name TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS assignments (id TEXT PRIMARY KEY, module TEXT, record_no TEXT, title TEXT, assigned_to_id TEXT, assigned_to_name TEXT, assigned_department TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS approval_history (id TEXT PRIMARY KEY, approval_id TEXT, action TEXT, user_id TEXT, note TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS workflow_history (id TEXT PRIMARY KEY, workflow_id TEXT, step_name TEXT, action TEXT, user_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS archive (id TEXT PRIMARY KEY, module TEXT, record_id TEXT, reason TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS customers (id TEXT PRIMARY KEY, customer_name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS calibrations (id TEXT PRIMARY KEY, device_name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS kpi_results (id TEXT PRIMARY KEY, module TEXT, name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS legal_compliance (id TEXT PRIMARY KEY, legal_name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS apqp_projects (id TEXT PRIMARY KEY, project_name TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
CREATE TABLE IF NOT EXISTS projects (id TEXT PRIMARY KEY, project_name TEXT, module TEXT, owner_id TEXT, status TEXT DEFAULT 'active', created_at TEXT DEFAULT CURRENT_TIMESTAMP, updated_at TEXT, created_by TEXT, updated_by TEXT);
