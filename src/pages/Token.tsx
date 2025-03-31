
import React from 'react';
import { PieChart, BarChart, ArrowRight, AlertCircle } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SectionHeading from '@/components/SectionHeading';
import TokenStats from '@/components/TokenStats';

const TokenPage = () => {
  const buySteps = [
    {
      title: "Create a Solana Wallet",
      description: "Download and set up a Solana-compatible wallet like Phantom or Solflare."
    },
    {
      title: "Add SOL to Your Wallet",
      description: "Purchase SOL from an exchange and transfer it to your wallet."
    },
    {
      title: "Connect to a DEX",
      description: "Visit a decentralized exchange like Raydium or Orca and connect your wallet."
    },
    {
      title: "Swap SOL for PHOOEY",
      description: "Enter the PHOOEY contract address and swap your SOL for PHOOEY tokens."
    }
  ];

  const tokenomicsData = [
    { category: "Liquidity Pool", percentage: 40, color: "bg-space-blue" },
    { category: "Community Rewards", percentage: 30, color: "bg-space-accent" },
    { category: "Development", percentage: 15, color: "bg-purple-500" },
    { category: "Marketing", percentage: 10, color: "bg-pink-400" },
    { category: "Team", percentage: 5, color: "bg-yellow-300" }
  ];

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-gradient">PHOOEY</span> Token
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A Solana memecoin tribute to the bravest space mice in history.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Token Info Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Key information about the PHOOEY token on the Solana blockchain.">
            Token Specifications
          </SectionHeading>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <TokenStats />
            
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold text-white mb-6">About PHOOEY Token</h3>
              <div className="space-y-4">
                <p className="text-gray-300">
                  PHOOEY is a community-driven memecoin on the Solana blockchain, inspired by the extraordinary 
                  story of the five pocket mice who journeyed to the Moon on the Apollo 17 mission.
                </p>
                <p className="text-gray-300">
                  Our goal is to create a fun, engaging community that celebrates both the history of space 
                  exploration and the innovative spirit of the Solana ecosystem.
                </p>
                <p className="text-gray-300">
                  With low transaction fees and fast processing times on Solana, PHOOEY is designed to be 
                  accessible to all, whether you're a crypto veteran or just beginning your journey.
                </p>
              </div>
              
              <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-start">
                <AlertCircle className="text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-300">
                  <span className="text-yellow-500 font-semibold">Disclaimer:</span> PHOOEY is a memecoin created for 
                  entertainment purposes. Always do your own research and invest responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tokenomics Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Understanding the distribution and allocation of PHOOEY tokens.">
            Tokenomics
          </SectionHeading>
          
          <div className="glass-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <PieChart className="mr-2 text-space-blue" />
                  Token Distribution
                </h3>
                <div className="space-y-4">
                  {tokenomicsData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${item.color} mr-3`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-white">{item.category}</span>
                          <span className="text-gray-400">{item.percentage}%</span>
                        </div>
                        <div className="w-full bg-space-purple rounded-full h-2">
                          <div 
                            className={`${item.color} h-2 rounded-full`} 
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <BarChart className="mr-2 text-space-blue" />
                  Token Utility
                </h3>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="mr-3 text-space-blue">•</div>
                    <div>
                      <h4 className="text-white font-semibold">Community Governance</h4>
                      <p className="text-gray-300 text-sm">Holders can participate in community decisions and proposals.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 text-space-blue">•</div>
                    <div>
                      <h4 className="text-white font-semibold">Exclusive Access</h4>
                      <p className="text-gray-300 text-sm">Token holders gain access to exclusive community events and NFT drops.</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 text-space-blue">•</div>
                    <div>
                      <h4 className="text-white font-semibold">Staking Rewards</h4>
                      <p className="text-gray-300 text-sm">Future staking program to reward long-term holders (coming soon).</p>
                    </div>
                  </li>
                  <li className="flex">
                    <div className="mr-3 text-space-blue">•</div>
                    <div>
                      <h4 className="text-white font-semibold">Community Fund</h4>
                      <p className="text-gray-300 text-sm">Portion of tokens allocated for community initiatives and charity donations.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Buy Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Follow these simple steps to purchase PHOOEY tokens.">
            How to Buy PHOOEY
          </SectionHeading>
          
          <div className="relative">
            {/* Steps Line */}
            <div className="absolute left-8 top-0 h-full w-1 bg-space-blue/30 md:hidden"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {buySteps.map((step, index) => (
                <div key={index} className="glass-card p-6 relative">
                  {/* Step Number (Mobile) */}
                  <div className="md:hidden absolute left-0 -translate-x-1/2 top-6 w-10 h-10 rounded-full bg-space-blue flex items-center justify-center z-10">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  
                  {/* Step Number (Desktop) */}
                  <div className="hidden md:flex mb-4 w-12 h-12 rounded-full bg-space-blue items-center justify-center">
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-300 mb-6">
                Contract address will be available soon. Stay tuned to our social media channels for the official announcement.
              </p>
              <button className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all">
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TokenPage;
