
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import OptimizedImage from './OptimizedImage';
import MoonBackground from './MoonBackground';

const HeroSection = () => {
  const handleJoinMission = () => {
    toast.info("Join the Mission", {
      description: "We're preparing for launch! Stay tuned for more details.",
      duration: 3000,
    });
  };

  return (
    <section className="pt-28 pb-20 relative overflow-hidden">
      <MoonBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="mouse-shadow rounded-full bg-space-purple/30 p-6 mb-6 animate-float">
            <OptimizedImage 
              src="/lovable-uploads/phooey.webp" 
              alt="PHOOEY" 
              className="w-28 h-28 md:w-32 md:h-32 object-contain"
              priority={true}
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="text-white">PHOOEY:</span> <br />
            <span className="text-gradient">The Moon's First Memecoin</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Celebrating the adventurous spirit of five legendary mice who orbited the Moon on the Apollo 17 mission.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={handleJoinMission}
              className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300"
            >
              Join the Mission
            </button>
            <Link to="/nft" className="btn-outline border-2 border-space-accent text-space-accent hover:bg-space-accent/20 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300">
              Explore the Mice
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
