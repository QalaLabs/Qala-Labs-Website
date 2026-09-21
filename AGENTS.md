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
