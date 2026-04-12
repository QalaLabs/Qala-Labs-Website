import * as React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const appTree = (
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="light">
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If the server pre-rendered HTML into the root, hydrate to attach React to it.
// Otherwise (dev mode or SSR fallback), do a fresh client render.
if (rootElement.firstElementChild !== null) {
  hydrateRoot(rootElement, appTree);
} else {
  createRoot(rootElement).render(appTree);
}