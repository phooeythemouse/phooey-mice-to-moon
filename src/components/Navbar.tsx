
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Token', path: '/token' },
    { name: 'NFT Collection', path: '/nft' },
    { name: 'Community', path: '/community' },
    { name: 'Fun Zone', path: '/fun' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "glass-card bg-space-dark/80 backdrop-blur-lg shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-space-blue/20 group-hover:bg-space-blue/30 transform scale-125 group-hover:scale-150 transition-all duration-300"></div>
                <img 
                  src="/lovable-uploads/857b6350-e6b9-4a05-918e-c9e653305ab2.png" 
                  alt="PHOOEY" 
                  className="h-10 w-10 relative z-10 animate-float" 
                />
              </div>
              <span className="text-2xl font-bold text-gradient group-hover:scale-105 transition-transform duration-300">PHOOEY</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1 lg:space-x-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                    location.pathname === link.path
                      ? "text-space-accent bg-white/5"
                      : "text-gray-200 hover:text-space-blue hover:bg-white/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <button className="ml-4 btn-glow bg-gradient-to-r from-space-blue to-space-accent hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full transition-all transform hover:scale-105 duration-300 flex items-center">
                <Moon className="h-4 w-4 mr-1" />
                <span>Buy PHOOEY</span>
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-space-accent transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass-card bg-space-dark/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                  location.pathname === link.path
                    ? "text-space-accent bg-white/5"
                    : "text-gray-200 hover:text-space-blue hover:bg-white/5"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="btn-glow bg-gradient-to-r from-space-blue to-space-accent hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-full mt-4 transition-all self-start mx-3 flex items-center">
              <Moon className="h-4 w-4 mr-1" />
              <span>Buy PHOOEY</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
