
import React from 'react';
import { Rocket, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import MouseCharacter from '@/components/MouseCharacter';
import TokenStats from '@/components/TokenStats';

const HomePage = () => {
  const mice = [
    { name: 'Fe', id: 'A3305', animationDelay: 0 },
    { name: 'Fi', id: 'A3326', animationDelay: 1 },
    { name: 'Fo', id: 'A3352', animationDelay: 2 },
    { name: 'Fum', id: 'A3356', animationDelay: 3 },
    { name: 'Phooey', id: 'A3400', animationDelay: 4 },
  ];

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                <span className="text-white">To The</span> <br />
                <span className="text-gradient">Moon</span> <span className="text-white">With</span> <br />
                <span className="text-gradient">PHOOEY!</span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Celebrating the adventurous spirit of Fe, Fi, Fo, Fum, and Phooey — 
                the five legendary mice who orbited the Moon on the Apollo 17 mission.
              </p>
              <div className="flex space-x-4">
                <button className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all">
                  Buy PHOOEY
                </button>
                <Link to="/about" className="flex items-center text-white hover:text-space-accent transition-colors py-3 px-4">
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute top-0 left-0 w-full h-full rounded-full bg-space-blue/20 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-space-blue to-space-accent opacity-80 animate-rotate-slow"></div>
                <Rocket className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white w-20 h-20 md:w-24 md:h-24 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mouse Characters Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
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
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center text-space-blue hover:text-space-accent">
              <span>Learn more about their incredible journey</span>
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
            <div className="glass-card p-8 flex flex-col justify-center">
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
              
              <Link to="/token" className="inline-flex items-center text-space-blue hover:text-space-accent mt-6">
                <span>View tokenomics and details</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            
            <TokenStats />
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Twitter', 'Discord', 'Telegram'].map((platform, index) => (
              <a 
                href="#" 
                key={index}
                className="glass-card p-8 text-center hover:bg-white/10 transition-colors group"
              >
                <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {platform === 'Twitter' && <ExternalLink className="h-8 w-8 text-white" />}
                  {platform === 'Discord' && <ExternalLink className="h-8 w-8 text-white" />}
                  {platform === 'Telegram' && <ExternalLink className="h-8 w-8 text-white" />}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Join us on {platform}</h3>
                <p className="text-gray-300">
                  Connect with other PHOOEY holders and stay updated on the latest news.
                </p>
              </a>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/community" className="inline-flex items-center text-space-blue hover:text-space-accent">
              <span>Explore our growing community</span>
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
