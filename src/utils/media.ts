import { supabase } from "@/integrations/supabase/client";

interface OptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'origin';
  resize?: 'cover' | 'contain' | 'fill';
}

/**
 * Generates an optimized image URL using Supabase Image Transformation
 * Requires a Pro plan or local development with transformation enabled.
 */
export const getOptimizedImageUrl = (
  path: string, 
  options: OptimizationOptions = {}
) => {
  const { 
    width, 
    height, 
    quality = 80, 
    format = 'webp', 
    resize = 'cover' 
  } = options;

  // If it's not an image or no options provided, return standard public URL
  if (!path.match(/\.(jpg|jpeg|png|webp|avif)$/i)) {
    return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
  }

  const params = new URLSearchParams();
  if (width) params.append('width', width.toString());
  if (height) params.append('height', height.toString());
  params.append('quality', quality.toString());
  params.append('format', format);
  params.append('resize', resize);

  // Construct the transformation URL
  // Format: [project-url]/storage/v1/render/image/public/[bucket]/[path]?[params]
  const projectUrl = "https://kyllkrozprazwdrzwugq.supabase.co";
  return `${projectUrl}/storage/v1/render/image/public/media/${path}?${params.toString()}`;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};