
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PhooeyGame from '@/components/PhooeyGame';
import GameLeaderboard from '@/components/GameLeaderboard';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const handleStartGame = () => {
    setGameStarted(true);
    setGameEnded(false);
    setFinalScore(0);
  };
  
  const handleGameEnd = (score: number) => {
    setGameEnded(true);
    setGameStarted(false);
    setFinalScore(score);
    setIsFullscreen(false);
    toast.info(`Game Over! You scored ${score} points!`);
  };
  
  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telegramUsername) {
      toast.error("Please enter your Telegram username");
      return;
    }
    
    // Here we would normally submit the score to a backend
    toast.success(`Score submitted! ${telegramUsername} scored ${finalScore} points!`);
    setTelegramUsername('');
    // Since we don't have a backend, we're just showing a success message
  };

  const handleFullscreenToggle = (enterFullscreen: boolean) => {
    setIsFullscreen(enterFullscreen);
  };
  
  return (
    <div className={`${isFullscreen ? 'fullscreen-game' : 'min-h-screen space-bg flex flex-col'}`}>
      {!isFullscreen && <Navbar />}
      
      <main className={`${isFullscreen ? 'fullscreen-container' : 'flex-grow container mx-auto px-4 py-24'}`}>
        {!isFullscreen && (
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">PHOOEY to the Mars</h1>
            <p className="text-xl text-gray-300">Help PHOOEY fly through space, collect cheese, and reach Mars!</p>
          </div>
        )}
        
        <div className={`${isFullscreen ? 'fullscreen-game-container' : 'glass-card p-6 md:p-8 rounded-xl max-w-4xl mx-auto'}`}>
          {!gameStarted && !gameEnded && !isFullscreen && (
            <div className="text-center py-8">
              <div className="mb-8">
                <img 
                  src="/lovable-uploads/phooey.webp" 
                  alt="PHOOEY" 
                  className="h-32 w-32 mx-auto animate-float" 
                />
                <p className="text-xl mt-4 text-space-accent">Ready for liftoff?</p>
              </div>
              <button 
                onClick={handleStartGame}
                className="btn-glow bg-gradient-to-r from-space-blue to-space-accent hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300 text-lg"
              >
                Start Game
              </button>
            </div>
          )}
          
          {gameStarted && (
            <PhooeyGame 
              onGameEnd={handleGameEnd} 
              isFullscreen={isFullscreen}
              onFullscreenToggle={handleFullscreenToggle}
            />
          )}
          
          {gameEnded && (
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <div className="mb-6">
                <p className="text-xl">Your Score: <span className="text-space-accent font-bold">{finalScore}</span></p>
                <img src="/lovable-uploads/flag.webp" alt="PHOOEY with flag" className="h-32 w-32 mx-auto my-4" />
              </div>
              
              <form onSubmit={handleSubmitScore} className="max-w-sm mx-auto">
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Your Telegram Username"
                    className="w-full px-4 py-3 rounded-lg bg-space-dark border border-space-blue focus:border-space-accent focus:ring-1 focus:ring-space-accent"
                    value={telegramUsername}
                    onChange={(e) => setTelegramUsername(e.target.value)}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-space-blue hover:bg-space-accent text-white font-bold py-3 px-6 rounded-lg transition duration-200"
                >
                  Submit Score
                </button>
              </form>
              
              <div className="mt-8">
                <button 
                  onClick={handleStartGame}
                  className="btn-outline border-2 border-space-accent hover:bg-space-accent/20 text-white font-bold py-2 px-6 rounded-full transition-all"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && (
          <div className="mt-12">
            <GameLeaderboard />
          </div>
        )}
      </main>
      
      {!isFullscreen && <Footer />}
    </div>
  );
};

export default Game;
