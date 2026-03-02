import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

export const useUTM = () => {
  const [utmData, setUtmData] = useState<UTMData>({});
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newUtm: UTMData = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(key => {
      const value = params.get(key);
      if (value) {
        newUtm[key as keyof UTMData] = value;
        // Persist in session storage so it's available even if they navigate away
        sessionStorage.setItem(key, value);
      } else {
        // Try to recover from session storage
        const stored = sessionStorage.getItem(key);
        if (stored) newUtm[key as keyof UTMData] = stored;
      }
    });

    setUtmData(newUtm);
  }, [location]);

  return utmData;
};