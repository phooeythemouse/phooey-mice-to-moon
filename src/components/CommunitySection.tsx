
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SocialIcon from './SocialIcon';

const CommunitySection = () => {
  return (
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
  );
};

export default CommunitySection;
