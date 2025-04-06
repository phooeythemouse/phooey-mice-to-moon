
import React from 'react';
import { Twitter, MessageCircle, Github, Globe, ExternalLink, Shield, Zap, Award } from 'lucide-react';
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
              <li><Link to="/nft" className="text-gray-400 hover:text-space-blue transition-colors">NFT Collection</Link></li>
              <li><Link to="/community" className="text-gray-400 hover:text-space-blue transition-colors">Community</Link></li>
              <li><Link to="/fun" className="text-gray-400 hover:text-space-blue transition-colors">Fun Zone</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>White Paper</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>Contract Address</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>Solana Explorer</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>DEX Listings</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </a>
              </li>
            </ul>
            
            {/* Trust signals */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <Shield className="mr-2 h-4 w-4 text-green-400" />
                <span>Smart Contract Audited</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Globe className="mr-2 h-4 w-4 text-green-400" />
                <span>KYC Team Verified</span>
              </div>
            </div>
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
            
            {/* Partnerships */}
            <div className="mt-6">
              <h4 className="text-sm font-bold text-white mb-2">Partnerships</h4>
              <div className="flex flex-wrap gap-2">
                <div className="glass-card p-1 rounded-md">
                  <Zap className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="glass-card p-1 rounded-md">
                  <Award className="h-5 w-5 text-blue-400" />
                </div>
                <div className="glass-card p-1 rounded-md">
                  <Shield className="h-5 w-5 text-green-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-divider my-8"></div>
        
        <div className="flex flex-col md:flex-row justify-between text-gray-400 text-sm">
          <p>© {new Date().getFullYear()} PHOOEY. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-space-blue transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-space-blue transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-space-blue transition-colors">Contact</a>
          </div>
        </div>
        
        <p className="mt-4 text-center text-gray-500 text-xs">
          PHOOEY is not affiliated with NASA or the Apollo program. Cryptocurrency investments involve risk.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
