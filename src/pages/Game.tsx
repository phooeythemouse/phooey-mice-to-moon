
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import PhooeyGame from '@/components/PhooeyGame';

const GamePage = () => {
  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">PHOOEY's <span className="text-gradient">Mars Mission</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Help PHOOEY reach Mars! Tap to use the jetpack, collect cheese and avoid obstacles.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Game Section */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PhooeyGame />
        </div>
      </section>
      
      {/* How to Play Section */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gradient mb-4">How to Play</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Tap to Boost</h3>
              <p className="text-gray-300 text-center">
                Tap or click on the game area to activate PHOOEY's jetpack and boost upward.
              </p>
            </div>
            
            <div className="glass-card p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-space-accent rounded-full flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-space-dark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Collect Cheese</h3>
              <p className="text-gray-300 text-center">
                Guide PHOOEY to collect chunks of cheese floating in space for extra points!
              </p>
            </div>
            
            <div className="glass-card p-6 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-space-blue to-space-accent rounded-full flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 13V5M12 13L5 9M12 13L19 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5 19L12 15L19 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Avoid Satellites</h3>
              <p className="text-gray-300 text-center">
                Watch out for satellites that will try to block your path to Mars!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default GamePage;
