import React from 'react';

export interface OptimizedImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  /** Mark as LCP / above-the-fold hero image */
  priority?: boolean;
  /** Explicit dimensions to reserve layout space (preferred over CSS-only sizing) */
  width?: number | string;
  height?: number | string;
}

/**
 * Shared image primitive: always reserves space via width/height or aspect-ratio,
 * lazy-loads below-the-fold images, and uses async decoding.
 */
export function OptimizedImage({
  priority = false,
  loading,
  decoding = 'async',
  fetchPriority,
  width,
  height,
  style,
  alt = '',
  className,
  ...rest
}: OptimizedImageProps) {
  const resolvedLoading = loading ?? (priority ? 'eager' : 'lazy');
  const resolvedFetchPriority = fetchPriority ?? (priority ? 'high' : undefined);
  const imgProps: React.ImgHTMLAttributes<HTMLImageElement> & { fetchPriority?: string } = {
    ...rest,
    alt,
    className,
    width,
    height,
    loading: resolvedLoading,
    decoding,
    style,
  };

  if (resolvedFetchPriority) {
    imgProps.fetchPriority = resolvedFetchPriority;
  }

  return <img {...imgProps} />;
}

export default OptimizedImage;
