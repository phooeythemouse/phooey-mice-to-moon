
import React from 'react';
import { Trophy, Star, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for the leaderboard
const MOCK_LEADERBOARD = [
  { username: '@PhooeyFan', score: 570, date: '2023-05-10' },
  { username: '@MoonCheese', score: 480, date: '2023-05-09' },
  { username: '@SolanaRocket', score: 450, date: '2023-05-08' },
  { username: '@MarsMission', score: 380, date: '2023-05-07' },
  { username: '@CryptoAstronaut', score: 320, date: '2023-05-06' },
  { username: '@CheeseCollector', score: 290, date: '2023-05-05' },
  { username: '@SpaceMouse', score: 230, date: '2023-05-04' },
];

const GameLeaderboard = () => {
  return (
    <Card className="glass-card bg-space-dark/70">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-2xl flex items-center justify-center">
          <Trophy className="mr-2 text-yellow-400" size={24} />
          Top Space Explorers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Username</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_LEADERBOARD.map((entry, index) => (
                <tr 
                  key={index} 
                  className={`
                    ${index % 2 === 0 ? 'bg-white/5' : ''}
                    ${index === 0 ? 'bg-yellow-900/20' : ''}
                    ${index === 1 ? 'bg-gray-500/20' : ''}
                    ${index === 2 ? 'bg-amber-800/20' : ''}
                  `}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {index === 0 && <Star className="text-yellow-400 mr-1" size={16} />}
                      {index === 1 && <Star className="text-gray-300 mr-1" size={16} />}
                      {index === 2 && <Star className="text-amber-700 mr-1" size={16} />}
                      {index > 2 && <span className="w-5 inline-block text-center">{index + 1}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Rocket className="mr-2 text-space-accent" size={16} />
                      <span>{entry.username}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-mono font-bold text-space-accent">{entry.score}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-400">
          <p>Play more to get on the leaderboard!</p>
          <p className="mt-2">
            Scores are saved with your Telegram username.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GameLeaderboard;
