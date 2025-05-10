
import React from 'react';
import { Twitter, MessageCircle } from 'lucide-react';

type SocialIconProps = {
  type: 'twitter' | 'telegram';
  size?: number;
  className?: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ type, size = 24, className = '' }) => {
  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return (
          <Twitter width={size} height={size} className={className} />
        );
      case 'telegram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M21.5 4.5 2.5 12.5l4 2" />
            <path d="m2.5 12.5 4 7.5 3.5-7.5-3.5-2" />
            <path d="m14.5 12.5 7-8" />
            <path d="M6.5 20v-6.5l8-1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

export default SocialIcon;
