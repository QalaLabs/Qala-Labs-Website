# Qala Labs Website (`qala-labs-website`)

> **Creative × Data × Impact** • Official digital presence for **Qala Labs**, an AI & Growth Engineering Studio blending art and autonomous systems.

---

## 🌐 Overview

**Qala Labs** designs and builds autonomous growth architectures, proprietary AI creative engines, and high-converting digital products. This repository powers the high-performance, responsive, and SEO-optimized web application for [qalalabs.com](https://qalalabs.com).

---

## ⚡ Tech Stack & Architecture

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tooling & Bundler**: [Vite](https://vitejs.dev/) with optimized code-splitting and asset pipeline
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom design tokens, neon accents (`#3FE0E0`, `#4F46E5`), and deep dark theme (`#06070D`)
- **Routing**: [React Router v7](https://reactrouter.com/) with lazy-loaded route chunks and scroll-to-top restoration
- **Interactive 3D & Visuals**: [Three.js](https://threejs.org/) for real-time volumetric horizon canvas and dual-core particle visualizations
- **Icons**: [Lucide React](https://lucide.dev/)

---

## ✨ Features & Highlights

1. **Interactive Navigation & Mega Menu**:
   - Translucent glassmorphic sticky header with backdrop blur.
   - Comprehensive mega-menu dropdowns for **Services**, **AI Agents**, and **Products**.
   - Responsive mobile navigation drawer with touch gestures.
2. **Hero & Interactive Dashboard**:
   - macOS terminal-inspired widget with live visual indicators.
   - Dynamic tab switchers (`Upranke`, `Svaarico`, `AI Automation`) with animated metrics.
   - Rotating animated value propositions.
3. **Core Section Ecosystem**:
   - **Infinite Marquee Ticker**: Continuous horizontal ticker for brand capabilities.
   - **Video Showcase Banner**: "We Don't Just Use AI Tools, We Build Them".
   - **Philosophy & About Us**: The union of creative instinct and algorithmic precision.
   - **Dual Core 3D Interactive**: Real-time rendering illustrating data & creative convergence.
   - **Client Grid & Case Studies Carousel**: Deep dives into Nutrivend UK, Trotr Travel, WWF India, playR, and more.
   - **Scale Architecture // Volumetric Horizon**: Interactive 3D particle landscape.
   - **Verified Founder Praise & Testimonials**: Slider highlighting client partnerships.
   - **FAQ Accordion & Project Inquiry Form**: Interactive contact submission.
4. **Global Footprint & Live Office Clocks**:
   - Real-time time synchronization across international offices:
     - 🇮🇳 **India (Delhi NCR)** (`Asia/Kolkata`)
     - 🇬🇧 **United Kingdom (London)** (`Europe/London`)
     - 🇦🇪 **UAE (Dubai)** (`Asia/Dubai`)
     - 🇳🇱 **Netherlands (Amsterdam)** (`Europe/Amsterdam`)
5. **SEO & Social Sharing Ready**:
   - OpenGraph metadata (`og:title`, `og:description`, `og:image`, `og:url`, `og:site_name`).
   - Twitter Summary Cards with large image preview.
   - Canonical URL tagging (`https://qalalabs.com/`).
   - Machine-readable `public/sitemap.xml` and `public/robots.txt`.
6. **Complete Legal & Compliance Coverage**:
   - Dedicated `/privacy-policy` and `/terms` pages accessible across the footer.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0 or higher recommended)
- npm or pnpm

### Installation
```bash
# Clone or open the repository
cd "e:\Qala Labs\Website\digipanda-clone"

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Runs the development server with Hot Module Replacement (HMR) at `http://localhost:5173`.

### Production Build
```bash
npm run build
```
Typechecks the project with TypeScript and compiles production assets into `dist/`.

### Preview Build
```bash
npm run preview
```
Locally previews the production build.

---

## 🌐 Deployment & Routing Configuration

Because this application uses client-side routing via React Router, hosting environments must rewrite non-static file requests to `index.html`.

### 1. Vercel
The root [`vercel.json`](./vercel.json) contains the single-page application (SPA) rewrite rule:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Apache / cPanel / Shared Hosting
The [`public/.htaccess`](./public/.htaccess) file is automatically bundled into `dist/` upon build:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 3. Nginx Configuration
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## 📄 License & Attribution

Copyright © 2026 Qala Labs. All Rights Reserved.  
*Art Meets Engineering.*
