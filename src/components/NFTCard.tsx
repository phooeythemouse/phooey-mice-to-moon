
import React, { useState } from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { toast } from 'sonner';

interface NFTCardProps {
  name: string;
  role: string;
  story: string;
  appearance: string;
  animationDelay: number;
  imageUrl: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ 
  name, 
  role, 
  story,
  appearance,
  animationDelay,
  imageUrl
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a gradient based on the name to make each card unique
  const getGradient = () => {
    switch(name) {
      case 'Commander Squeaky':
        return 'from-blue-500 to-purple-500';
      case 'AstroChew':
        return 'from-green-500 to-yellow-500';
      case 'LunarWhiskers':
        return 'from-pink-500 to-purple-500';
      case 'NebulaNibbler':
        return 'from-orange-500 to-red-500';
      case 'StarTail':
        return 'from-blue-400 to-cyan-300';
      default:
        return 'from-space-blue to-space-accent';
    }
  };

  const handleMintClick = () => {
    toast.info("NFT Minting Coming Soon", {
      description: "The PHOOEY NFT collection will be available for minting soon!",
      duration: 3000,
    });
  };

  return (
    <div 
      className={`glass-card overflow-hidden rounded-2xl transition-all duration-500 transform ${
        isHovered ? 'scale-105 shadow-glow z-20' : ''
      }`}
      style={{ animationDelay: `${animationDelay * 0.5}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header - Image */}
      <div className={`h-64 bg-gradient-to-br ${getGradient()} p-4 flex items-center justify-center relative overflow-hidden`}>
        {/* Mouse image */}
        <div className="w-40 h-40 flex items-center justify-center animate-float bg-transparent">
          <img 
            src={imageUrl}
            alt={name} 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Animated particles */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/3 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        {/* Neon border effect */}
        <div className={`absolute inset-0 border-2 border-white/30 rounded-t-2xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-sm text-space-accent mb-4">{role}</p>
        
        <p className="text-gray-300 text-sm line-clamp-3 mb-4">
          {story}
        </p>
        
        <HoverCard>
          <HoverCardTrigger>
            <button className="text-xs text-space-blue hover:text-space-accent transition-colors">
              Read full story...
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="glass-card border-space-accent/50 w-80">
            <div>
              <h4 className="text-lg font-bold text-white mb-2">{name}</h4>
              <p className="text-sm text-space-accent mb-3">{role}</p>
              <p className="text-gray-300 text-sm mb-3">{story}</p>
              <p className="text-xs text-gray-400 italic">{appearance}</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <div className="mt-6">
          <button 
            onClick={handleMintClick}
            className="w-full bg-gradient-to-r from-space-blue to-space-accent text-white font-bold py-3 rounded-lg hover:shadow-glow transition-all duration-300"
          >
            Mint Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
