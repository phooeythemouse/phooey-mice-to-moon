import React from 'react';
import { Twitter, MessageCircle, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="glass-card mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/857b6350-e6b9-4a05-918e-c9e653305ab2.png" 
                alt="PHOOEY" 
                className="h-10 w-10" 
              />
              <span className="text-2xl font-bold text-gradient">PHOOEY</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Celebrating the adventurous spirit of Fe, Fi, Fo, Fum, and Phooey — the first mice to orbit the Moon.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-space-blue transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-blue transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-space-blue transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-space-blue transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-space-blue transition-colors">About</Link></li>
              <li><Link to="/token" className="text-gray-400 hover:text-space-blue transition-colors">Token</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-space-blue transition-colors">Community</Link></li>
              <li><Link to="/fun" className="text-gray-400 hover:text-space-blue transition-colors">Fun Zone</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-space-blue transition-colors">White Paper</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-blue transition-colors">Contract Address</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-blue transition-colors">Solana Explorer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-space-blue transition-colors">DEX Listings</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">Stay updated with the latest PHOOEY news</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-space-purple text-white px-4 py-2 rounded-l-lg border-y border-l border-gray-600 focus:outline-none focus:border-space-blue"
              />
              <button className="bg-space-blue text-white px-4 py-2 rounded-r-lg hover:bg-opacity-80 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-divider my-8"></div>
        
        <div className="text-center text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PHOOEY. All rights reserved.</p>
          <p className="mt-1">PHOOEY is not affiliated with NASA or the Apollo program.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
