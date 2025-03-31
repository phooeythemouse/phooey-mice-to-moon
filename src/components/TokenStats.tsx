
import React from 'react';
import { cn } from '@/lib/utils';

interface TokenStatsProps {
  className?: string;
}

const TokenStats: React.FC<TokenStatsProps> = ({ className }) => {
  const stats = [
    { label: 'Name', value: 'PHOOEY' },
    { label: 'Ticker', value: 'PHOO' },
    { label: 'Network', value: 'Solana' },
    { label: 'Total Supply', value: '1,000,000,000 PHOO' },
    { label: 'Decimals', value: '9' },
    { label: 'Launch Date', value: 'TBA' },
  ];

  return (
    <div className={cn('glass-card p-6 md:p-8', className)}>
      <h3 className="text-xl font-bold text-white mb-6">Token Specifications</h3>
      <div className="space-y-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-gray-300">{stat.label}</span>
            <span className="font-semibold text-white">{stat.value}</span>
          </div>
        ))}
        
        <div className="pt-4">
          <p className="text-sm text-gray-300 mb-4">Contract Address:</p>
          <div className="bg-space-purple p-3 rounded-lg text-xs sm:text-sm text-gray-200 font-mono overflow-x-auto">
            Coming soon...
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenStats;
