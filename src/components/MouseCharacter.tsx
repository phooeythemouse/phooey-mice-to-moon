
import React from 'react';

interface MouseCharacterProps {
  name: string;
  id: string;
  animationClass?: string;
  style?: React.CSSProperties;
  imageUrl: string;
}

const MouseCharacter: React.FC<MouseCharacterProps> = ({
  name,
  id,
  animationClass = '',
  style,
  imageUrl
}) => {
  return (
    <div
      className={`glass-card p-6 flex flex-col items-center text-center ${animationClass}`}
      style={style}
    >
      <div className="w-28 h-28 rounded-full overflow-hidden bg-space-purple/30 mouse-shadow flex items-center justify-center mb-4">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
      <p className="text-sm text-space-accent">ID: {id}</p>
    </div>
  );
};

export default MouseCharacter;
