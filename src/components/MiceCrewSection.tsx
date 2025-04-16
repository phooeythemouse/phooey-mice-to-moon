
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import MouseCharacter from './MouseCharacter';

const MiceCrewSection = () => {
  const mice = [
    { 
      name: 'Fe', 
      id: 'A3305', 
      animationDelay: 0, 
      imageUrl: '/lovable-uploads/fe.webp',
      description: 'The brave leader who kept the team steady through cosmic storms.'
    },
    { 
      name: 'Fi', 
      id: 'A3326', 
      animationDelay: 1, 
      imageUrl: '/lovable-uploads/fi.webp',
      description: 'The navigator with a knack for sniffing out paths among the stars.'
    },
    { 
      name: 'Fo', 
      id: 'A3352', 
      animationDelay: 2, 
      imageUrl: '/lovable-uploads/fo.webp',
      description: 'The dreamer who gazed at distant galaxies with curious eyes.'
    },
    { 
      name: 'Fum', 
      id: 'A3356', 
      animationDelay: 3, 
      imageUrl: '/lovable-uploads/fum.webp',
      description: 'The engineer who saved the day with innovative solutions.'
    },
    { 
      name: 'Phooey', 
      id: 'A3400', 
      animationDelay: 4, 
      imageUrl: '/lovable-uploads/phooey.webp',
      description: 'The scout who was the first mouse to spot Earthrise from lunar orbit.'
    },
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Meet The Crew</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            The first mice to orbit the Moon during the Apollo 17 mission in December 1972.
          </p>
          <div className="space-divider mt-6 max-w-xs mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {mice.map((mouse, index) => (
            <MouseCharacter 
              key={index} 
              name={mouse.name} 
              id={mouse.id} 
              animationClass={`animate-float`}
              style={{ animationDelay: `${mouse.animationDelay * 0.5}s` }}
              imageUrl={mouse.imageUrl}
              description={mouse.description}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/nft" className="inline-flex items-center bg-gradient-to-r from-space-blue to-space-accent text-white py-3 px-8 rounded-full hover:shadow-glow transition-all duration-300 transform hover:scale-105">
            <span>Discover NFT Collection</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MiceCrewSection;
