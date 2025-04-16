
import React, { useEffect } from 'react';
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

      <Footer />
    </div>
  );
};

export default HomePage;
