import React, { useState } from 'react';
import { ExternalLink, Shield, Zap, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import SocialIcon from './SocialIcon';
import { subscribeToNewsletter } from '../services/newsletterService';

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await subscribeToNewsletter(email);
      if (success) {
        toast.success("Thanks for subscribing!", {
          description: "You'll receive PHOOEY updates soon!",
        });
        setEmail('');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResourceClick = (type: string) => {
    if (type === 'whitepaper') {
      toast.info("Whitepaper coming soon", {
        description: "Our whitepaper is being finalized and will be available soon",
      });
    } else if (type === 'contract') {
      toast.info("Contract address coming soon", {
        description: "Contract is being audited and will be published upon launch",
      });
    } else if (type === 'explorer') {
      toast.info("Explorer link coming soon", {
        description: "PHOOEY will be visible on Solana Explorer after launch",
      });
    } else if (type === 'dex') {
      toast.info("DEX listings coming soon", {
        description: "Token will be listed on DEXes after launch",
      });
    }
  };

  return (
    <footer className="glass-card mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/phooey.webp" 
                alt="PHOOEY" 
                className="h-10 w-10" 
              />
              <span className="text-2xl font-bold text-gradient">PHOOEY</span>
            </div>
            <p className="text-sm text-gray-300 max-w-xs">
              Celebrating the adventurous spirit of Fe, Fi, Fo, Fum, and Phooey — the first mice to orbit the Moon.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com/phooeythemouse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-space-blue transition-colors">
                <SocialIcon type="twitter" size={20} />
              </a>
              <a href="https://t.me/phooeythemouse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-space-blue transition-colors">
                <SocialIcon type="telegram" size={20} />
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
                <button onClick={() => handleResourceClick('whitepaper')} className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>White Paper</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleResourceClick('contract')} className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>Contract Address</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleResourceClick('explorer')} className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>Solana Explorer</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </button>
              </li>
              <li>
                <button onClick={() => handleResourceClick('dex')} className="text-gray-400 hover:text-space-blue transition-colors inline-flex items-center">
                  <span>DEX Listings</span>
                  <ExternalLink className="ml-1.5 h-3 w-3" />
                </button>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-space-blue transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-space-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-space-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center text-gray-300 text-sm">
                <Shield className="mr-2 h-4 w-4 text-green-400" />
                <span>Smart Contract Audited</span>
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <Shield className="mr-2 h-4 w-4 text-green-400" />
                <span>KYC Team Verified</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">Stay updated with the latest PHOOEY news</p>
            <form onSubmit={handleEmailSubscribe} className="flex">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email" 
                className="bg-space-purple text-white px-4 py-2 rounded-l-lg border-y border-l border-gray-600 focus:outline-none focus:border-space-blue"
                disabled={isSubmitting}
              />
              <button 
                type="submit" 
                className={`bg-space-blue text-white px-4 py-2 rounded-r-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-wait' : 'hover:bg-opacity-80'}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Joining...' : 'Join'}
              </button>
            </form>
            
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
            <Link to="/privacy" className="hover:text-space-blue transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-space-blue transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-space-blue transition-colors">Contact</Link>
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
