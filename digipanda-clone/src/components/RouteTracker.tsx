import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: any[];
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

/**
 * RouteTracker observes React Router location changes and dispatches virtual
 * pageview events to Google Tag Manager and Meta Pixel, satisfying Rule 5 of
 * Qala Labs Web Engineering Rules.
 */
export const RouteTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const pagePath = location.pathname + location.search;

    // 1. Google Tag Manager / Google Analytics virtual pageview
    if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: 'page_view',
        page_path: pagePath,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // 2. Meta Pixel Virtual Pageview
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};
