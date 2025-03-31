
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Token', path: '/token' },
    { name: 'Community', path: '/community' },
    { name: 'Fun Zone', path: '/fun' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img 
                src="/lovable-uploads/857b6350-e6b9-4a05-918e-c9e653305ab2.png" 
                alt="PHOOEY" 
                className="h-12 w-12 animate-float" 
              />
              <span className="text-2xl font-bold text-gradient">PHOOEY</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-200 hover:text-space-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
              <button className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-lg transition-all">
                Buy PHOOEY
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:text-space-accent">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden space-bg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-200 hover:text-space-blue px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-2 px-6 rounded-lg mt-4 transition-all self-start mx-3">
              Buy PHOOEY
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
