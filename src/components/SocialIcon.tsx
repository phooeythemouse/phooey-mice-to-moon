
import React from 'react';
import { Twitter, MessageCircle } from 'lucide-react';

type SocialIconProps = {
  type: 'twitter' | 'telegram' | 'discord';
  size?: number;
  className?: string;
};

const SocialIcon: React.FC<SocialIconProps> = ({ type, size = 24, className = '' }) => {
  const getIcon = () => {
    switch (type) {
      case 'twitter':
        return (
          <Twitter size={size} className={className} />
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
      case 'discord':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="9" cy="12" r="1" />
            <circle cx="15" cy="12" r="1" />
            <path d="M7.5 7.2c3.7-1 5.3-1 8.9 0" />
            <path d="M7.5 16.8c3.7 1 5.3 1 8.9 0" />
            <path d="M9 22c1 0 1-1 2.5-1s1.5 1 2.5 1" />
            <path d="M8.5 17C5 15.5 5 11.8 5 10c0-6 4-8 7-8s7 2 7 8c0 1.8 0 5.5-3.5 7" />
          </svg>
        );
      default:
        return null;
    }
  };

  return getIcon();
};

export default SocialIcon;
