
import React from 'react';

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
          <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
          </svg>
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
