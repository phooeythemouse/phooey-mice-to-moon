
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import WalletButton from './WalletButton';
import SocialIcon from './SocialIcon';
import OptimizedImage from './OptimizedImage';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <nav className={`fixed w-full z-30 transition-all duration-300 ${scrolled ? 'py-3 bg-space-dark/80 backdrop-blur-md' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <OptimizedImage 
              src="/lovable-uploads/phooey.webp" 
              alt="PHOOEY" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-xl font-bold text-white">PHOOEY</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`text-sm font-medium ${isActive('/') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>Home</Link>
            <Link to="/nft" className={`text-sm font-medium ${isActive('/nft') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>NFTs</Link>
            <Link to="/token" className={`text-sm font-medium ${isActive('/token') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>Token</Link>
            <Link to="/fun" className={`text-sm font-medium ${isActive('/fun') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>Fun Zone</Link>
            <Link to="/game" className={`text-sm font-medium ${isActive('/game') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>Game</Link>
            <Link to="/community" className={`text-sm font-medium ${isActive('/community') ? 'text-space-accent' : 'text-white hover:text-space-accent'}`}>Community</Link>
          </div>
          
          {/* Right side - Social + Wallet */}
          <div className="flex items-center">
            {/* Social icons - Desktop only */}
            <div className="hidden md:flex items-center space-x-3 mr-6">
              <SocialIcon type="twitter" />
              <SocialIcon type="telegram" />
            </div>
            
            {/* Wallet Button */}
            <WalletButton />
            
            {/* Mobile menu button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden flex items-center p-2 ml-3 bg-space-blue/20 rounded-md hover:bg-space-blue/30"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden absolute top-full left-0 w-full bg-space-dark/95 backdrop-blur-lg py-4 px-4 border-t border-white/10 animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className={`text-sm font-medium ${isActive('/') ? 'text-space-accent' : 'text-white'}`}>Home</Link>
            <Link to="/nft" className={`text-sm font-medium ${isActive('/nft') ? 'text-space-accent' : 'text-white'}`}>NFTs</Link>
            <Link to="/token" className={`text-sm font-medium ${isActive('/token') ? 'text-space-accent' : 'text-white'}`}>Token</Link>
            <Link to="/fun" className={`text-sm font-medium ${isActive('/fun') ? 'text-space-accent' : 'text-white'}`}>Fun Zone</Link>
            <Link to="/game" className={`text-sm font-medium ${isActive('/game') ? 'text-space-accent' : 'text-white'}`}>Game</Link>
            <Link to="/community" className={`text-sm font-medium ${isActive('/community') ? 'text-space-accent' : 'text-white'}`}>Community</Link>
            
            {/* Social icons in mobile menu */}
            <div className="flex items-center space-x-4 pt-2 border-t border-white/10">
              <SocialIcon type="twitter" />
              <SocialIcon type="telegram" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
