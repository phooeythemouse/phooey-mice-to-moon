
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onClick,
  objectFit = 'cover',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Effect to reset states when src changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
    setImageSrc(src);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
    
    // For YouTube thumbnails, try alternative URL formats
    if (src.includes('youtube') && (src.includes('maxresdefault') || src.includes('vi'))) {
      const videoId = src.includes('vi') 
        ? src.split('/').pop()?.split('?')[0]
        : src.match(/\/([a-zA-Z0-9_-]{11})\//)?.[1];
        
      if (videoId) {
        // Try alternative YouTube thumbnail formats in order of quality
        const alternativeSrc = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
        console.log('Trying alternative YouTube thumbnail:', alternativeSrc);
        setImageSrc(alternativeSrc);
        return;
      }
    }
    
    setImageSrc('/placeholder.svg');
  };

  return (
    <div className={cn(
      'relative overflow-hidden', 
      !width && !height && 'w-full h-full',
      className
    )}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800/20 animate-pulse">
          <div className="w-8 h-8 border-4 border-space-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={imageSrc}
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          !isLoaded && 'opacity-0',
          isLoaded && 'opacity-100',
          objectFit === 'cover' && 'object-cover',
          objectFit === 'contain' && 'object-contain',
          objectFit === 'fill' && 'object-fill',
          objectFit === 'none' && 'object-none',
          objectFit === 'scale-down' && 'object-scale-down',
          width && 'w-auto',
          height && 'h-auto',
        )}
        width={width}
        height={height}
        style={width || height ? { width: width || 'auto', height: height || 'auto' } : undefined}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
      />
    </div>
  );
};

export default OptimizedImage;
