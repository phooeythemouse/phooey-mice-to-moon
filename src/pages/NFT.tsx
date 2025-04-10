
import React from 'react';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SectionHeading from '@/components/SectionHeading';
import NFTCard from '@/components/NFTCard';

const NFTPage = () => {
  // Updated mice NFTs with verified image paths
  const miceNFTs = [
    {
      name: 'Fe',
      role: 'The Leader',
      story: "Fe was the bravest mouse aboard the lunar orbiter. With a tiny helmet and a huge heart, he kept the team steady through meteor showers and cosmic storms. Legend says he even squeaked the first words on the far side of the Moon: 'We made it!'",
      appearance: 'Silver space suit, gold-tinted helmet, confident stance, little command badge on chest.',
      animationDelay: 0,
      imageUrl: '/lovable-uploads/fe.png'
    },
    {
      name: 'Fi',
      role: 'The Navigator',
      story: "Fi had a knack for sniffing out the right paths among the stars. His sharp sense of smell led the crew around hidden space debris. When things got tough, he simply nibbled on his favorite lunar snack bar and charted a new course!",
      appearance: 'Compact, with oversized astro-gloves, chewing a mini snack bar floating inside helmet.',
      animationDelay: 1,
      imageUrl: '/lovable-uploads/fi.png'
    },
    {
      name: 'Fo',
      role: 'The Dreamer',
      story: "Fo was the dreamer of the crew, always gazing at distant galaxies with his bright, curious eyes. He believed mice could colonize the Moon — and maybe even Mars. His dreams sparked the mission's true spirit.",
      appearance: 'Big sparkling eyes, slightly messy fur, dreamy expression, floating inside a low-gravity pod.',
      animationDelay: 2,
      imageUrl: '/lovable-uploads/fo.png'
    },
    {
      name: 'Fum',
      role: 'The Engineer',
      story: "When the ship's mini-engine broke, Fum saved the day! Using only two cheese wrappers and a tail-spin move, he patched the problem mid-flight. His technical skills were unmatched—even by NASA's top mice!",
      appearance: 'Goggles on helmet, small backpack with wires and tools, biting on a cable playfully.',
      animationDelay: 3,
      imageUrl: '/lovable-uploads/fum.png'
    },
    {
      name: 'Phooey',
      role: 'The Scout',
      story: "Phooey was the first mouse to spot Earthrise from lunar orbit. Fast, alert, and always a step ahead, he would scout dangerous sectors before the crew passed. Some say he has stardust woven into his tail.",
      appearance: 'Sleek space suit, glowing tail tip (like a comet), striking a ready-for-action pose.',
      animationDelay: 4,
      imageUrl: '/lovable-uploads/phooey.png'
    }
  ];

  const handleConnectWallet = () => {
    toast.info("Wallet Connection", {
      description: "NFT minting will be available soon after launch",
      duration: 3000,
    });
  };

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">PHOOEY <span className="text-gradient">NFT Collection</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Own a piece of space history with our exclusive collection of the five legendary mice who orbited the Moon.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* NFT Collection Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Each NFT tells the story of one of our brave space pioneers with unique traits and abilities.">
            The Lunar Heroes Collection
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {miceNFTs.map((mouse, index) => (
              <NFTCard 
                key={index}
                name={mouse.name}
                role={mouse.role}
                story={mouse.story}
                appearance={mouse.appearance}
                animationDelay={mouse.animationDelay}
                imageUrl={mouse.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* NFT Benefits Section - Updated heading for clarity */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Learn about the exclusive benefits that come with owning a PHOOEY Mouse NFT.">
            Benefits of Ownership
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <BadgeCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Exclusive Access</h3>
              <p className="text-gray-300 text-center">
                NFT holders gain access to exclusive community channels, events, and early announcements about upcoming PHOOEY projects.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-space-accent rounded-full flex items-center justify-center mb-6">
                <img 
                  src="/lovable-uploads/phooey-icon.png" 
                  alt="PHOOEY" 
                  className="h-8 w-8" 
                />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Token Airdrops</h3>
              <p className="text-gray-300 text-center">
                Regular PHOOEY token airdrops for all NFT holders, with bonus amounts based on the rarity of your mouse NFT.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-space-blue to-space-accent rounded-full flex items-center justify-center mb-6">
                <ArrowRight className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Governance Rights</h3>
              <p className="text-gray-300 text-center">
                Participate in community votes and help shape the future direction of the PHOOEY project.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mint Info Section - Updated content for better clarity */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Find out how to mint your own legendary space mouse NFT.">
            How to Mint
          </SectionHeading>
          
          <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Minting Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-space-blue mr-2">•</span>
                    <span className="text-gray-300">Total Supply: 10,000 unique space mice NFTs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-space-blue mr-2">•</span>
                    <span className="text-gray-300">Mint Price: 0.5 SOL</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-space-blue mr-2">•</span>
                    <span className="text-gray-300">Blockchain: Solana</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-space-blue mr-2">•</span>
                    <span className="text-gray-300">Mint Date: April 17th, 2025 (Apollo 17 Anniversary)</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col justify-center">
                <p className="text-gray-300 mb-6">
                  Connect your wallet and mint your own legendary space mouse. Each NFT is randomly generated with unique traits and accessories.
                </p>
                <div className="flex justify-center">
                  <button 
                    onClick={handleConnectWallet}
                    className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300"
                  >
                    Connect Wallet to Mint
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 hover:shadow-glow transition-all duration-300 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">Join the Mission</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't miss your chance to be part of crypto history. Mint your mouse NFT and join our community of space enthusiasts.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/fun" className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300">
                Visit Fun Zone
              </Link>
              <a 
                href="https://t.me/phooeythemouse" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline border-2 border-space-accent text-space-accent hover:bg-space-accent/20 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300"
              >
                Join Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default NFTPage;
