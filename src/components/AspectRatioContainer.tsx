
import React from 'react';

interface AspectRatioContainerProps {
  ratio: string; // Format: 'w-h', e.g. '16-9'
  children: React.ReactNode;
  className?: string;
}

const AspectRatioContainer: React.FC<AspectRatioContainerProps> = ({ 
  ratio, 
  children, 
  className = '' 
}) => {
  const [width, height] = ratio.split('-').map(Number);
  const paddingTop = `${(height / width) * 100}%`;
  
  return (
    <div className={`relative ${className}`} style={{ paddingTop }}>
      <div className="absolute inset-0">
        {children}
      </div>
    </div>
  );
};

export default AspectRatioContainer;
