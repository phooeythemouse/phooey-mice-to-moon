
import React from 'react';

const AboutContent = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">The Real Lunar Mice Heroes</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            In December 1972, aboard the Apollo 17 mission, five small pocket mice made history as they orbited the Moon.
          </p>
          <div className="space-divider mt-6 max-w-xs mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">The Apollo 17 Story</h3>
            <div className="space-y-4">
              <p className="text-gray-300">
                Apollo 17 was the final mission of NASA's Apollo program and remains the most recent time humans traveled beyond low Earth orbit. Launched on December 7, 1972, the mission broke several records, including the longest moon landing, longest total moonwalks, and the largest lunar sample return.
              </p>
              <p className="text-gray-300">
                While astronauts Eugene Cernan and Harrison Schmitt explored the lunar surface, five tiny passengers - Fe, Fi, Fo, Fum, and Phooey - orbited in the command module, becoming the first mice to travel around the Moon.
              </p>
              <p className="text-gray-300">
                These mice were part of a biological experiment to study the effects of cosmic radiation. Their journey paved the way for our understanding of how living organisms respond to deep space travel.
              </p>
            </div>
            
            <div className="mt-6 p-4 bg-space-purple/20 border-l-4 border-space-accent rounded">
              <p className="text-sm italic text-gray-300">
                "We went to the Moon as explorers, and left as believers. Those tiny mice that joined us reminded us that curiosity and adventure know no size or species."
              </p>
              <p className="text-right text-xs text-gray-400 mt-1">- Apollo mission scientist</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">PHOOEY's Mission to the Crypto Moon</h3>
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h4 className="text-lg font-bold text-white mb-2">Honoring Space Pioneers</h4>
                <p className="text-gray-300">
                  PHOOEY Memecoin celebrates these unsung heroes of space exploration. Just as these mice ventured into the unknown, our project aims to push the boundaries in crypto.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h4 className="text-lg font-bold text-white mb-2">Why Space Matters to Memecoins</h4>
                <p className="text-gray-300">
                  Space exploration represents humanity's curiosity, innovation, and ambition. Similarly, cryptocurrencies push financial boundaries and represent a new frontier. PHOOEY combines these pioneering spirits.
                </p>
              </div>
              
              <div className="glass-card p-6">
                <h4 className="text-lg font-bold text-white mb-2">Building a New Community</h4>
                <p className="text-gray-300">
                  Beyond just a token, PHOOEY is building a community of space enthusiasts and crypto innovators who share a passion for exploration and discovery.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <a href="https://en.wikipedia.org/wiki/Apollo_17" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-space-blue hover:text-space-accent transition-colors">
            <span>Learn more about Apollo 17</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;
