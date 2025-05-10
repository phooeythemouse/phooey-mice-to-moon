
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
      
      {/* Game Promo Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Play the PHOOEY Game!</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Help PHOOEY reach Mars in our exciting space adventure game!
            </p>
            <div className="space-divider mt-6 max-w-xs mx-auto mb-8"></div>
            
            <div className="glass-card p-6 max-w-2xl mx-auto hover:shadow-glow transition-all duration-300 mt-8 animate-float">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-24 h-24 relative">
                  <div className="absolute inset-0 bg-space-accent/20 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img src="/lovable-uploads/jet.webp" alt="PHOOEY with jetpack" className="w-20 h-20 object-contain" />
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-xl font-bold text-white mb-2">PHOOEY's Mars Mission</h3>
                  <p className="text-gray-300 mb-4">
                    Guide PHOOEY through space, collect cheese, avoid satellites, and plant the PHOOEY flag on Mars!
                  </p>
                  <Link to="/game" className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 duration-300 inline-flex items-center">
                    <span>Play Now</span>
                    <svg className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <CommunitySection />

      <Footer />
    </div>
  );
};

export default HomePage;
