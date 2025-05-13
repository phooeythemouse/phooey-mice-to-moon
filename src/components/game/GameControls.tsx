
import React from 'react';
import { Gamepad2, Maximize } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameControlsProps {
  isFullscreen: boolean;
  onBoost: () => void;
  onEnterFullscreen: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  isFullscreen, 
  onBoost, 
  onEnterFullscreen 
}) => {
  const isMobile = useIsMobile();

  return (
    <div className={`game-controls mt-4 flex justify-center ${isFullscreen ? 'fullscreen-controls' : ''}`}>
      {!isFullscreen && isMobile && (
        <div className="text-center text-gray-300 text-sm mb-2 w-full">
          Tap screen to boost PHOOEY's jetpack! 🚀
        </div>
      )}
      
      {!isFullscreen && (
        <div className="flex gap-2">
          <button
            className="btn-outline px-4 py-2 text-white rounded-lg border border-space-accent flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onBoost();
            }}
          >
            <Gamepad2 className="w-4 h-4" />
            Boost!
          </button>
          <button
            className="btn-outline px-4 py-2 text-white rounded-lg border border-space-accent flex items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              onEnterFullscreen();
            }}
          >
            <Maximize className="w-4 h-4" />
            Fullscreen
          </button>
        </div>
      )}
      
      {isFullscreen && (
        <div className="fullscreen-boost-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <div className="text-white text-lg bg-black/50 px-4 py-2 rounded-full animate-pulse">
            Tap anywhere to boost! 🚀
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
