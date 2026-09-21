---
name: dual-target-deployment
description: Patterns for deploying React/Vite SPAs with lead APIs to both Serverless (Vercel/Netlify) and Shared PHP/MySQL (Hostinger/cPanel). Use when deploying websites, configuring lead forms, setting up .htaccess, or configuring Hostinger MySQL.
---

# Dual-Target SPA & Lead Pipeline Deployment

This skill outlines how to maintain and deploy high-converting React + Vite websites that work seamlessly across both serverless architectures (Vercel, Netlify, Cloudflare Pages) and shared cPanel/Apache hosting (Hostinger, Bluehost, Namecheap).

## 1. Dual API Architecture
Maintain parallel lead endpoints so the codebase is zero-config across hosting targets:
- **Serverless Endpoint (`/api/lead.ts`)**:
  - TypeScript serverless handler with RFC email regex validation and honeypot bot trap (`b_url`).
  - Optional dispatching to Webhooks, Slack, or Discord alerts.
- **PHP Endpoint (`/api/lead.php`)**:
  - Plain PHP PDO handler using prepared statements for MySQL databases.
- **Cross-Platform Build Script (`package.json`)**:
  - Automatically copy `api/` into `dist/api/` during `npm run build`:
    ```json
    "build": "tsc && vite build && node -e \"const fs=require('fs'); if(fs.existsSync('api')) fs.cpSync('api', 'dist/api', {recursive:true});\""
    ```

## 2. SPA Rewrite Configurations
- **Apache / cPanel (`public/.htaccess`)**:
  ```apache
  RewriteEngine On
  RewriteRule ^api/lead$ /api/lead.php [L,QSA]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
  ```
- **Vercel (`vercel.json`)**:
  ```json
  {
    "rewrites": [
      { "source": "/api/lead.php", "destination": "/api/lead" },
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```

## 3. Hostinger Database Setup & Security
- **Out-of-Root Credentials**: Keep database credentials in `db-credentials.php` located **one level above** `public_html` (e.g. `/home/uXXXX/db-credentials.php`) so credentials are never web-accessible.
- **Schema**:
  Execute `api/schema.sql` via Hostinger phpMyAdmin to generate the indexed `leads` table.
- **Deployment**:
  Upload the entire contents of `dist/` directly into `public_html/`.
