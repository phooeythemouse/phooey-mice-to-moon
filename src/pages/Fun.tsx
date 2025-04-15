
import React, { useState, useEffect } from 'react';
import { Timer, Award, Zap } from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import RocketGame from '@/components/RocketGame';
import { useWallet } from '@/providers/WalletProvider';

const FunPage = () => {
  const { connected, walletAddress } = useWallet();

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">PHOOEY <span className="text-gradient">Fun Zone</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Launch your rocket to the moon and win PHOOEY token airdrops!
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Game Section */}
      <section className="py-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gradient mb-4">Launch Your Rocket</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Click to launch the rocket and test your luck. The higher your rocket flies, the bigger your potential PHOOEY airdrop!
            </p>
          </div>
          
          {/* Wallet info if connected */}
          {connected && (
            <div className="glass-card inline-flex items-center px-4 py-2 mx-auto mb-8 rounded-full">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-gray-300">Connected: {walletAddress?.substring(0, 4)}...{walletAddress?.substring(walletAddress.length - 4)}</span>
            </div>
          )}
          
          {/* Game Component */}
          <div className="glass-card p-6 max-w-4xl mx-auto hover:shadow-glow transition-all duration-300">
            <RocketGame walletConnected={connected} />
          </div>
        </div>
      </section>
      
      {/* Leaderboard Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Lunar Leaderboard</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The top rocket launchers of the week. Will you join them?
            </p>
          </div>
          
          <div className="glass-card p-6 max-w-3xl mx-auto hover:shadow-glow transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 px-4 text-left text-space-accent">Rank</th>
                    <th className="py-3 px-4 text-left text-space-accent">Wallet</th>
                    <th className="py-3 px-4 text-right text-space-accent">Max Height</th>
                    <th className="py-3 px-4 text-right text-space-accent">PHOOEY Won</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank: 1, wallet: "Sol384921...8293", height: "42,500 km", reward: "5,000" },
                    { rank: 2, wallet: "Sol129384...3982", height: "38,200 km", reward: "3,500" },
                    { rank: 3, wallet: "Sol573829...1093", height: "36,800 km", reward: "2,000" },
                    { rank: 4, wallet: "Sol827361...3721", height: "29,500 km", reward: "1,000" },
                    { rank: 5, wallet: "Sol294587...2948", height: "27,300 km", reward: "500" },
                  ].map((entry, index) => (
                    <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4 text-left">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
                          entry.rank === 1 ? 'bg-yellow-500' : 
                          entry.rank === 2 ? 'bg-gray-400' : 
                          entry.rank === 3 ? 'bg-amber-700' : 'bg-space-blue/50'
                        } text-white font-bold text-xs`}>
                          {entry.rank}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-left text-gray-300">{entry.wallet}</td>
                      <td className="py-3 px-4 text-right text-gray-300">{entry.height}</td>
                      <td className="py-3 px-4 text-right text-space-accent">{entry.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* How to Play Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">How to Play</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Simple rules, big rewards! Learn how to play and win PHOOEY tokens.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C12 16 16 14 16 10V4L12 2L8 4V10C8 14 12 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 17V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">1. Launch Your Rocket</h3>
              <p className="text-gray-300 text-center">
                Connect your wallet and press the launch button to start your rocket journey.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-space-accent rounded-full flex items-center justify-center mb-6">
                <Timer className="h-8 w-8 text-space-dark" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">2. Watch It Fly</h3>
              <p className="text-gray-300 text-center">
                Your rocket will fly to a random height. The luckier you are, the higher it goes!
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-space-blue to-space-accent rounded-full flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">3. Claim Your Reward</h3>
              <p className="text-gray-300 text-center">
                If your rocket reaches the Moon, you win a PHOOEY token airdrop sent directly to your wallet!
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default FunPage;
