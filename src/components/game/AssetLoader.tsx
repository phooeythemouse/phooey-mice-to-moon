
import React from 'react';

interface AssetLoaderProps {
  isLoading: boolean;
  progress: number;
}

const AssetLoader: React.FC<AssetLoaderProps> = ({ isLoading, progress }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-space-dark/80 z-10 rounded-lg">
      <div className="text-center p-4">
        <img 
          src="/lovable-uploads/phooey.webp" 
          alt="PHOOEY" 
          className="h-16 w-16 mx-auto animate-bounce" 
        />
        <p className="text-white mt-4 text-xl">Loading game...</p>
        
        {isLoading && (
          <div className="mt-4 w-48 mx-auto">
            <div className="h-2 w-full bg-gray-700 rounded-full">
              <div 
                className="h-full bg-space-accent rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-1">{Math.floor(progress)}%</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetLoader;
