
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import AboutContent from '@/components/AboutContent';
import VideoSection from '@/components/VideoSection';
import TeamSection from '@/components/TeamSection';

// Refactored sections
import HeroSection from '@/components/HeroSection';
import MissionSection from '@/components/MissionSection';
import MiceCrewSection from '@/components/MiceCrewSection';
import TokenSection from '@/components/TokenSection';
import CommunitySection from '@/components/CommunitySection';

const HomePage = () => {
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
      <HeroSection />
      
      {/* Mission Intro Section */}
      <MissionSection />

      {/* About Section */}
      <AboutContent />
      
      {/* Video Section */}
      <VideoSection />
      
      {/* Mouse Characters Section */}
      <MiceCrewSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Token Info Section */}
      <TokenSection />
      
      {/* Community Section */}
      <CommunitySection />

      {/* Game Promo Section */}
      <section className="py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">PHOOEY to the Mars</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Help PHOOEY navigate through space, collect cheese, and reach Mars in our new fullscreen mobile game!</p>
          </div>
          
          <div className="glass-card p-8 rounded-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <img 
                  src="/lovable-uploads/jet.webp" 
                  alt="PHOOEY Game" 
                  className="rounded-lg shadow-glow mx-auto max-h-64 object-contain animate-float"
                />
              </div>
              <div className="md:w-1/2 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-4">Ready for a space adventure?</h3>
                <p className="mb-6 text-gray-300">
                  Dodge obstacles, collect cheese, and help PHOOEY reach Mars while earning points for the leaderboard!
                </p>
                <Link
                  to="/game"
                  className="btn-glow bg-gradient-to-r from-space-blue to-space-accent px-8 py-3 rounded-full text-white font-bold transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto md:mx-0 max-w-xs"
                >
                  Play Fullscreen 🚀
                </Link>
                <p className="mt-4 text-sm text-gray-400">
                  Optimized for mobile devices - play in fullscreen mode!
                </p>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-space-accent font-bold">Top your friends on the leaderboard and prove your space navigation skills!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
