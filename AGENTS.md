# Qala Labs Web Engineering Rules

## 1. Lead Capture & Form Resilience
- **No Unconditional Success**: Never call `setSubmitted(true)` inside a `finally {}` block. Gating must strictly check `response.ok` or `data.success === true`.
- **Fail-Safe Fallbacks**: If API submissions fail (network error, 404, 500), display an inline error banner providing direct 1-click fallback actions (`mailto:hello@qalalabs.com` or direct WhatsApp link).
- **Dual Endpoint Capability**: When writing marketing forms, support dual-target endpoints (attempting `/api/lead` first, then falling back to `/api/lead.php` if 404).

## 2. Responsive Floating Element Safety
- When a page contains both a fixed bottom bar (e.g. `StickyCTA`) and a floating action button (e.g. `ChatbotToggle`), prevent mobile overlap by setting `bottom-24 sm:bottom-6` on the floating button for mobile viewports (<640px).

## 3. Performance & Asset Guardrails
- **Asset Budget**: No uncompressed raster images or GIFs exceeding 500 KB. Animated icons must use vector SVGs (with CSS/SMIL keyframes) or compressed WebP/Lottie.
- **Bundle Architecture**: Heavy 3D libraries (e.g. `three.js`) and core frameworks must be split into dedicated chunks in `vite.config.ts` via `rollupOptions.output.manualChunks`.

## 4. Visual Identity & Background Atmosphere
- **Cosmic Foundation**: The canonical dark background is `#06070D` (deep space near-black with cold indigo undertones). Never default to flat `#000000` or neutral grey.
- **Ambient Gradient Mesh**: The application root (`App.tsx` and `PageLayout.tsx`) must mount `.qala-bg-ambient` (multi-stop radial mesh featuring Electric Indigo `#4F46E5`, Neon Cyan `#3FE0E0`, and Growth Emerald `#34D399`) and `.qala-grid-pattern` (48px × 48px micro-grid at 0.025 opacity).
- **No Legacy DigiPanda Raster Banners**: Never use legacy template raster images (e.g. `top-banner-background-new.webp`) for hero backgrounds. Hero sections must use pure CSS ambient lighting (dual-core glowing orbs and radial-masked grid textures).
- **Atmospheric Continuity**: Subpages and section wrappers must use `bg-transparent` (or translucent glassmorphic blends like `bg-[#06070D]/90 backdrop-blur-md`) rather than opaque solid fills (`bg-[#06070D]`), preserving continuous gradient illumination across the site.
