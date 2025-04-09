
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface AspectRatioContainerProps {
  ratio: number; // Instead of string, we'll use a number representing the aspect ratio
  children: React.ReactNode;
  className?: string;
}

const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({ 
  ratio, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <AspectRatio ratio={ratio} className="w-full">
        {children}
      </AspectRatio>
    </div>
  );
};

export default AspectRatioContainer;
