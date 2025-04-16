
import React from 'react';
import { Rocket, BadgeCheck } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const MissionSection = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Our Mission</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            PHOOEY is more than just a memecoin — it's a tribute to scientific adventure and space exploration, 
            bringing together crypto enthusiasts and space lovers in a community that values both fun and history.
          </p>
          <div className="space-divider mt-6 max-w-xs mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">Launch to New Heights</h3>
            <p className="text-gray-300 text-center">
              Just like our mouse heroes, PHOOEY is set for an ambitious journey across the crypto universe.
            </p>
          </div>
          
          <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-space-accent rounded-full flex items-center justify-center mb-6">
              <BadgeCheck className="h-8 w-8 text-space-dark" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">Community-Driven</h3>
            <p className="text-gray-300 text-center">
              Our community of holders shares the adventurous spirit of the Apollo mice, brave and forward-thinking.
            </p>
          </div>
          
          <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-space-blue to-space-accent rounded-full flex items-center justify-center mb-6">
              <OptimizedImage 
                src="/lovable-uploads/phooey.webp" 
                alt="PHOOEY" 
                className="h-8 w-8" 
              />
            </div>
            <h3 className="text-xl font-bold text-white mb-4 text-center">Meme with Meaning</h3>
            <p className="text-gray-300 text-center">
              Behind the fun is real history — honoring the unsung rodent heroes who paved the way for space exploration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
