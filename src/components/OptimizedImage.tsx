
import React from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onClick?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
  onClick,
}: OptimizedImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('transition-opacity duration-300', className)}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onClick={onClick}
    />
  );
};

export default OptimizedImage;
