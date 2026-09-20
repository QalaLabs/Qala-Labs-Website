/// <reference types="vite/client" />
/// <reference types="vite-imagetools/client" />

interface Window {
  gtag?: (...args: any[]) => void;
  fbq?: (...args: any[]) => void;
  dataLayer?: any[];
  _loadMetaPixel?: () => void;
  _metaLoaded?: boolean;
}

declare module '*.jpg?*' {
  const src: string;
  export default src;
}
declare module '*.jpeg?*' {
  const src: string;
  export default src;
}
declare module '*.png?*' {
  const src: string;
  export default src;
}
declare module '*.webp?*' {
  const src: string;
  export default src;
}

declare module '@/assets/*?*' {
  const src: string;
  export default src;
}
