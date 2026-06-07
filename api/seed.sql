INSERT OR IGNORE INTO departments (id, department_name, status) VALUES
('dept-management', 'Yönetim', 'active'),
('dept-quality', 'Kalite', 'active');

INSERT OR IGNORE INTO roles (id, role_name, status) VALUES
('role-admin', 'Sistem Yöneticisi', 'active'),
('role-user', 'Kullanıcı', 'active');

INSERT OR IGNORE INTO permissions (id, permission_key, description, status) VALUES
('perm-read', 'read', 'Genel okuma yetkisi', 'active'),
('perm-files-write', 'files:write', 'R2 dosya yükleme yetkisi', 'active'),
('perm-messages-read', 'messages:read', 'Mesaj Merkezi okuma yetkisi', 'active'),
('perm-messages-write', 'messages:write', 'Mesaj Merkezi gönderme ve taslak yetkisi', 'active');
