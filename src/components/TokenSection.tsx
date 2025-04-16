
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import TokenStats from './TokenStats';

const TokenSection = () => {
  return (
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
  );
};

export default TokenSection;
