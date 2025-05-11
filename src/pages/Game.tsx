
import React, { useState, useEffect, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import GameLeaderboard from '@/components/GameLeaderboard';
import { toast } from 'sonner';
import { ArrowUpRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

// Dynamically import the game component to isolate potential issues
const PhooeyGame = React.lazy(() => import('@/components/PhooeyGame'));

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [telegramUsername, setTelegramUsername] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [gameKey, setGameKey] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  
  useEffect(() => {
    // Set loading state with timeout to ensure it gets reset
    const timer = setTimeout(() => {
      console.log("Game component initialized");
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleStartGame = () => {
    console.log("Starting game...");
    
    // Reset game state and generate a new key to force component remount
    setGameKey(Date.now());
    setGameStarted(true);
    setGameEnded(false);
    setFinalScore(0);
    setLoadError(false);
  };
  
  const handleGameEnd = (score: number) => {
    console.log(`Game ended with score: ${score}`);
    
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
  };

  const handleFullscreenToggle = (enterFullscreen: boolean) => {
    console.log('Fullscreen toggle called:', enterFullscreen);
    setIsFullscreen(enterFullscreen);
  };

  const handleGameError = () => {
    console.log("Game error detected");
    setLoadError(true);
    setGameStarted(false);
    toast.error("There was a problem loading the game. Please try again.");
  };
  
  return (
    <div className={`${isFullscreen ? 'fullscreen-game fixed inset-0 z-50 bg-space-dark' : 'min-h-screen space-bg flex flex-col'}`}>
      {!isFullscreen && <Navbar />}
      
      <main className={`${isFullscreen ? 'fullscreen-container h-full w-full flex items-center justify-center' : 'flex-grow container mx-auto px-4 py-8 md:py-24'}`}>
        {!isFullscreen && (
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-4">PHOOEY to the Mars</h1>
            <p className="text-xl text-gray-300">Help PHOOEY fly through space, collect cheese, and reach Mars!</p>
          </div>
        )}
        
        <div className={`${isFullscreen ? 'fullscreen-game-container h-full w-full' : 'glass-card p-4 md:p-8 rounded-xl mx-auto max-w-lg'}`}>
          {/* Game start screen */}
          {!gameStarted && !gameEnded && !isFullscreen && (
            <div className="text-center py-8">
              <div className="mb-8">
                <OptimizedImage 
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
          
          {/* Game play area */}
          {gameStarted && (
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center p-8 h-64">
                <OptimizedImage 
                  src="/lovable-uploads/phooey.webp" 
                  alt="PHOOEY" 
                  className="h-16 w-16 mx-auto animate-bounce" 
                />
                <p className="mt-4 text-lg text-space-accent">Preparing for liftoff...</p>
              </div>
            }>
              <PhooeyGame 
                key={gameKey} // Add a key to force re-render when game starts
                onGameEnd={handleGameEnd} 
                isFullscreen={isFullscreen}
                onFullscreenToggle={handleFullscreenToggle}
                onError={handleGameError}
              />
            </Suspense>
          )}
          
          {/* Error state */}
          {loadError && (
            <div className="text-center py-8">
              <div className="mb-6">
                <OptimizedImage 
                  src="/lovable-uploads/phooey.webp" 
                  alt="PHOOEY" 
                  className="h-24 w-24 mx-auto opacity-60" 
                />
                <p className="text-xl mt-4 text-red-400">Houston, we have a problem!</p>
                <p className="mt-2 text-gray-400">The game failed to load properly.</p>
              </div>
              <button 
                onClick={handleStartGame}
                className="btn-glow bg-gradient-to-r from-space-blue to-space-accent hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 duration-300 text-lg mt-4"
              >
                Try Again
              </button>
            </div>
          )}
          
          {/* Game end screen */}
          {gameEnded && (
            <div className="text-center py-6">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <div className="mb-6">
                <p className="text-xl">Your Score: <span className="text-space-accent font-bold">{finalScore}</span></p>
                <OptimizedImage src="/lovable-uploads/flag.webp" alt="PHOOEY with flag" className="h-32 w-32 mx-auto my-4" />
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
