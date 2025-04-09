
import React from 'react';

interface SectionHeadingProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  children, 
  title,
  subtitle,
  centered = true,
  className = ''
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
        {title || children}
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="space-divider mt-6 max-w-xs mx-auto"></div>
    </div>
  );
};

export default SectionHeading;
