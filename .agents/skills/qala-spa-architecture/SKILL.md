---
name: qala-spa-architecture
description: Architectural patterns and design standards for the Qala Labs website SPA, including data-driven dynamic routes, 3D Canvas chunking, and interconnected proof systems.
---

# Qala Labs SPA Architecture Guide

This skill documents the structural conventions developed across the Qala Labs codebase for high-performance marketing web applications.

## 1. Data-Driven Dynamic Routing
All services, agents, products, and case studies are decoupled from presentation components:
- Source data lives under `src/data/` (`services.ts`, `caseStudies.ts`, `agents.ts`, `products.ts`).
- Detail pages (`/services/:slug`, `/case-studies/:slug`, `/agents/:slug`) query the data module by URL slug parameter.
- Missing slugs must trigger `<NotFoundPage />` or an explicit redirect rather than breaking layout.

## 2. 3D Scene Isolation & Chunking
To maintain sub-200ms initial load times:
- Heavy Three.js Canvas components (`CreativeDataDualCore`, `ScaleHorizonTerrain`) must be loaded asynchronously or isolated via `vite.config.ts` manual chunks:
  ```ts
  manualChunks: {
    three: ['three', '@react-three/fiber', '@react-three/drei'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'lucide-react']
  }
  ```

## 3. "Proof It Works" Interconnection Pattern
Every commercial capability page must feature a proof anchor:
- `ServiceDetailPage` references corresponding `caseStudies` or `agents` that demonstrate the capability in production.
- Case studies must provide clear before/after metrics (e.g. Trotr 28x ROAS, Capital Keys 64.7% conversion).
- Agent pages must detail both "What it does" and technical "How it's built" (FastAPI microservice, Cloud Run, third-party connectors).

## 4. SPA Analytics & Navigation Restoration
- When integrating tracking scripts (Meta Pixel, Google Tag Manager):
  - Add `<RouteTracker />` as a child of `<BrowserRouter>` to trigger virtual pageview calls on each route transition (`useLocation().pathname`).
  - Add `<ScrollToTop />` to reset window scroll position cleanly on navigation.
