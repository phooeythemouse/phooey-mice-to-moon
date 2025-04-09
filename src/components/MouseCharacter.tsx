
import React, { useState } from 'react';

interface MouseCharacterProps {
  name: string;
  id: string;
  animationClass?: string;
  style?: React.CSSProperties;
  imageUrl: string;
  description?: string;
}

const MouseCharacter: React.FC<MouseCharacterProps> = ({
  name,
  id,
  animationClass = '',
  style,
  imageUrl,
  description
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Match up the correct file by name
  let imagePath = imageUrl;
  
  return (
    <div
      className={`glass-card p-6 flex flex-col items-center text-center ${animationClass} transition-all duration-300 ${isHovered ? 'transform scale-105 shadow-glow' : ''}`}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-28 h-28 rounded-full overflow-hidden bg-space-purple/30 mouse-shadow flex items-center justify-center mb-4">
        <img
          src={imagePath}
          alt={name}
          className="w-full h-full object-contain"
          loading="lazy"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-sm text-space-accent">ID: {id}</p>
      {description && (
        <p className="text-xs text-gray-300 mt-2 line-clamp-2">{description}</p>
      )}
    </div>
  );
};

export default MouseCharacter;
