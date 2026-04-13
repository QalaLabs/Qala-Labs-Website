import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { imagetools } from "vite-imagetools";

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  plugins: [
    ...(isSsrBuild ? [] : [dyadComponentTagger()]),
    react(),
    imagetools(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: false,
    minify: isSsrBuild ? false : 'terser',
    ...(isSsrBuild ? {} : {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    }),
    rollupOptions: isSsrBuild ? {} : {
      output: {
        manualChunks: {
          // Core framework — on every page
          'vendor-core': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          // State / data fetching
          'vendor-query': ['@tanstack/react-query'],
          // Animation — GSAP split from Framer so non-Hero pages skip the GSAP parse
          'vendor-framer': ['framer-motion'],
          'vendor-gsap': ['gsap'],
          // All Radix UI primitives in one chunk (individually small)
          'vendor-radix': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-progress',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-scroll-area',
            '@radix-ui/react-select',
            '@radix-ui/react-separator',
            '@radix-ui/react-slider',
            '@radix-ui/react-slot',
            '@radix-ui/react-switch',
            '@radix-ui/react-tabs',
            '@radix-ui/react-toast',
            '@radix-ui/react-toggle',
            '@radix-ui/react-toggle-group',
            '@radix-ui/react-tooltip',
          ],
          // Icons — large package, isolated so tree-shaking works per page
          'vendor-icons': ['lucide-react'],
          // Charts — only used on analytics/admin pages
          'vendor-charts': ['recharts'],
          // Supabase — only loaded when auth/DB needed
          'vendor-supabase': [
            '@supabase/supabase-js',
            '@supabase/auth-ui-react',
            '@supabase/auth-ui-shared',
          ],
          // Utility helpers
          'vendor-utils': ['date-fns', 'clsx', 'tailwind-merge', 'class-variance-authority', 'zod'],
        }
      }
    }
  }
}));
