/// <reference types="vite/client" />

interface Window {
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
  dataLayer?: any[];
}
