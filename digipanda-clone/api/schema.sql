-- Schema: leads table for the Qala Labs contact form (Hostinger MySQL)
-- Mirrors the production Supabase `leads` table shape, translated to plain MySQL.

CREATE TABLE IF NOT EXISTS leads (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  email VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  source VARCHAR(64) NOT NULL DEFAULT 'contact_section',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_leads_created_at ON leads (created_at DESC);
CREATE INDEX idx_leads_email ON leads (email);
