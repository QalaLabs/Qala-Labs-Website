import { useEffect, useState } from 'react';

export function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(undefined);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addEventListener('change', handleChange);
    }
    
    // Set initial value
    setReducedMotion(mediaQuery.matches);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return reducedMotion;
}