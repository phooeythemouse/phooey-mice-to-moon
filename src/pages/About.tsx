
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import AboutContent from '@/components/AboutContent';

const AboutPage = () => {
  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About <span className="text-gradient">PHOOEY</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the story behind PHOOEY and the legendary mice who made space history.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* About Content - Reused from component */}
      <AboutContent />
      
      <Footer />
    </div>
  );
};

export default AboutPage;
