
import React from 'react';
import { cn } from '@/lib/utils';

interface MouseCharacterProps {
  name: string;
  id: string;
  className?: string;
  description?: string;
  animationClass?: string;
  style?: React.CSSProperties;
}

const MouseCharacter: React.FC<MouseCharacterProps> = ({ 
  name, 
  id, 
  className,
  description,
  animationClass = "animate-float",
  style
}) => {
  return (
    <div className={cn('relative flex flex-col items-center', className)} style={style}>
      <div className={cn('mouse-shadow rounded-full bg-space-purple p-4 mb-3', animationClass)}>
        <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-gradient-to-br from-space-blue to-space-accent">
          <span className="text-2xl md:text-3xl font-bold text-white">{name.charAt(0)}</span>
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-bold text-lg md:text-xl text-white">{name}</h3>
        <p className="text-xs text-gray-400">{id}</p>
        {description && (
          <p className="text-sm text-gray-300 mt-2 max-w-[200px]">{description}</p>
        )}
      </div>
    </div>
  );
};

export default MouseCharacter;
