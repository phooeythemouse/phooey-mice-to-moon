
import React, { useEffect, useRef } from 'react';
import { ArrowRight, ExternalLink, BadgeCheck, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import MouseCharacter from '@/components/MouseCharacter';
import TokenStats from '@/components/TokenStats';
import MoonBackground from '@/components/MoonBackground';
import AboutContent from '@/components/AboutContent';

const HomePage = () => {
  const mice = [
    { name: 'Fe', id: 'A3305', animationDelay: 0, imageUrl: '/lovable-uploads/fe.png' },
    { name: 'Fi', id: 'A3326', animationDelay: 1, imageUrl: '/lovable-uploads/fi.png' },
    { name: 'Fo', id: 'A3352', animationDelay: 2, imageUrl: '/lovable-uploads/fo.png' },
    { name: 'Fum', id: 'A3356', animationDelay: 3, imageUrl: '/lovable-uploads/fum.png' },
    { name: 'Phooey', id: 'A3400', animationDelay: 4, imageUrl: '/lovable-uploads/phooey.png' },
  ];

  const handleJoinMission = () => {
    toast.info("Join the Mission", {
      description: "We're preparing for launch! Stay tuned for more details.",
      duration: 3000,
    });
  };

  useEffect(() => {
    // Welcome toast notification
    toast.success("Welcome space explorer!", {
      description: "Join the PHOOEY mission to the moon!",
      duration: 5000,
    });
  }, []);

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section with Moon Background */}
      <section className="pt-28 pb-20 relative overflow-hidden">
        <MoonBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="mouse-shadow rounded-full bg-space-purple/30 p-6 mb-6 animate-float">
              <img 
                src="/lovable-uploads/phooey-icon.png" 
                alt="PHOOEY" 
                className="w-28 h-28 md:w-32 md:h-32 object-contain"
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
      
      {/* Mission Intro Section */}
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
                <img 
                  src="/lovable-uploads/phooey-icon.png" 
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

      {/* About Section */}
      <AboutContent />
      
      {/* Mouse Characters Section */}
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
      
      {/* Token Info Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">PHOOEY Token</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A Solana memecoin tribute to the bravest space mice in history.
            </p>
            <div className="space-divider mt-6 max-w-xs mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="glass-card p-8 flex flex-col justify-center hover:shadow-glow transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">Why PHOOEY?</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  PHOOEY is more than just a memecoin – it's a celebration of scientific discovery and exploration.
                </p>
                <p className="text-gray-300">
                  Named after the most famous of the Apollo 17 mice, PHOOEY brings together the crypto community 
                  and space enthusiasts to honor these tiny pioneers.
                </p>
                <p className="text-gray-300">
                  Join our community as we journey together to new heights on Solana!
                </p>
              </div>
              
              <Link to="/token" className="inline-flex items-center text-space-blue hover:text-space-accent transition-all mt-6">
                <span>View tokenomics and details</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <TokenStats />
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="glass-card p-4 inline-flex items-center">
              <BadgeCheck className="h-5 w-5 text-green-400 mr-2" />
              <span className="text-gray-300">Smart Contract Verified</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Join The Community</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Become part of the PHOOEY journey as we build our community of space enthusiasts and crypto explorers.
            </p>
            <div className="space-divider mt-6 max-w-xs mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a 
              href="https://twitter.com/phooeythemouse" 
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <SocialIcon type="twitter" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join us on Twitter</h3>
              <p className="text-gray-300">
                Connect with other PHOOEY holders and stay updated on the latest news.
              </p>
            </a>

            <a 
              href="https://t.me/phooeythemouse" 
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-8 text-center hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <SocialIcon type="telegram" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Join us on Telegram</h3>
              <p className="text-gray-300">
                Connect with other PHOOEY holders and stay updated on the latest news.
              </p>
            </a>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/fun" className="inline-flex items-center bg-gradient-to-r from-space-blue to-space-accent text-white py-3 px-8 rounded-full hover:shadow-glow transition-all duration-300 transform hover:scale-105">
              <span>Try Your Luck in the Fun Zone</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
