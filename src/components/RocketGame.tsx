
import React, { useState, useRef, useEffect } from 'react';
import { Rocket, Award, ArrowUp } from 'lucide-react';
import { toast } from 'sonner';

interface RocketGameProps {
  walletConnected: boolean;
}

const RocketGame: React.FC<RocketGameProps> = ({ walletConnected }) => {
  const [isLaunching, setIsLaunching] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [rocketHeight, setRocketHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [reward, setReward] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [canPlay, setCanPlay] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const cooldownTimerRef = useRef<NodeJS.Timeout>();

  // Handle game cooldown
  useEffect(() => {
    if (cooldownTime > 0 && !canPlay) {
      cooldownTimerRef.current = setTimeout(() => {
        setCooldownTime(prev => prev - 1);
      }, 1000);
      
      return () => {
        if (cooldownTimerRef.current) clearTimeout(cooldownTimerRef.current);
      };
    } else if (cooldownTime === 0 && !canPlay) {
      setCanPlay(true);
    }
  }, [cooldownTime, canPlay]);

  const startLaunch = () => {
    if (!canPlay) return;
    
    setIsLaunching(true);
    setCountdown(3);
    setRocketHeight(0);
    setHasWon(false);
    
    // Start countdown
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          launchRocket();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const launchRocket = () => {
    setIsFlying(true);
    
    // Generate a random maximum height between 10% and 100%
    // Higher chance of lower heights, with a small chance of reaching the moon
    const randomFactor = Math.random();
    const targetHeight = randomFactor ** 2 * 100; // Square to make high values rarer
    setMaxHeight(targetHeight);
    
    // Animation loop
    let currentHeight = 0;
    let speedFactor = 0.5 + Math.random() * 0.5; // Random speed between 0.5 and 1
    
    const animate = () => {
      if (currentHeight < targetHeight) {
        // Ease-out effect as it approaches max height
        const easeFactor = 1 - currentHeight / targetHeight;
        currentHeight += speedFactor * easeFactor * 2;
        setRocketHeight(currentHeight);
        
        // Calculate reward based on current height
        const newReward = Math.floor(currentHeight * 100);
        setReward(newReward);
        
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Reached max height
        finishFlight(targetHeight);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  const finishFlight = (finalHeight: number) => {
    // Determine if player won based on height
    const hasReachedMoon = finalHeight > 95; // 95% or higher is considered "reaching the moon"
    setHasWon(hasReachedMoon);
    
    // Show result toast
    if (hasReachedMoon) {
      const finalReward = Math.floor(finalHeight * 100);
      toast.success("🚀 You reached the Moon!", {
        description: `Congratulations! ${walletConnected ? `${finalReward} PHOOEY tokens have been sent to your wallet!` : "Connect your wallet to claim rewards!"}`,
        duration: 5000,
      });
    } else {
      toast.info("Almost there!", {
        description: "Your rocket didn't quite make it to the Moon. Try again!",
        duration: 3000,
      });
    }
    
    // Reset game state with cooldown
    setTimeout(() => {
      setIsLaunching(false);
      setIsFlying(false);
      setCanPlay(false);
      setCooldownTime(10); // Reduced to 10 seconds for better UX
    }, 2000);
  };
  
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (cooldownTimerRef.current) {
        clearTimeout(cooldownTimerRef.current);
      }
    };
  }, []);
  
  // Calculate styles based on game state
  const getRocketStyle = () => {
    const gameHeight = gameAreaRef.current?.clientHeight || 500;
    const bottom = (rocketHeight / 100) * (gameHeight - 80); // 80px is rocket height
    
    return {
      bottom: `${bottom}px`,
      transition: isLaunching ? 'none' : 'transform 0.2s ease-out'
    };
  };
  
  // Get height display text
  const getHeightText = () => {
    const heightKm = Math.floor(rocketHeight * 400); // Max ~40,000 km (distance to moon is about 384,400 km)
    return `${heightKm.toLocaleString()} km`;
  };

  return (
    <div className="flex flex-col items-center">
      {/* Game interface */}
      <div className="relative bg-gradient-to-b from-space-dark to-space-purple/30 w-full h-[500px] rounded-2xl overflow-hidden mb-8 hardware-accelerated" ref={gameAreaRef}>
        {/* Stars background */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{ 
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        
        {/* Moon at the top */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-20 rounded-full bg-gray-200 shadow-lg hardware-accelerated">
          <div className="absolute top-2 left-5 w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="absolute top-10 left-12 w-3 h-3 rounded-full bg-gray-300"></div>
          <div className="absolute top-6 left-3 w-2 h-2 rounded-full bg-gray-300"></div>
        </div>
        
        {/* Rocket */}
        <div 
          ref={rocketRef}
          className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-200 hardware-accelerated ${
            isFlying ? 'animate-float' : ''
          }`}
          style={getRocketStyle()}
        >
          <div className="relative w-16 h-20">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-16 bg-space-blue rounded-t-full"></div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-4 bg-white rounded-full"></div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-4 h-8 bg-space-accent rounded-bl-full"></div>
            <div className="absolute bottom-0 right-0 w-4 h-8 bg-space-accent rounded-br-full"></div>
            
            {/* Exhaust fire */}
            {isFlying && (
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="w-4 h-10 bg-gradient-to-t from-yellow-500 via-orange-500 to-transparent rounded-b-full animate-pulse"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Countdown overlay */}
        {isLaunching && countdown > 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
            <div className="text-7xl font-bold text-white animate-pulse">{countdown}</div>
          </div>
        )}
        
        {/* Win overlay */}
        {hasWon && (
          <div className="absolute inset-0 bg-gradient-to-t from-space-blue/50 to-transparent flex items-center justify-center">
            <div className="glass-card p-8 text-center animate-scale-in">
              <Award className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">You reached the Moon!</h3>
              <p className="text-xl text-space-accent mb-4">{reward} PHOOEY</p>
              {!walletConnected && (
                <p className="text-sm text-gray-300">Connect wallet to claim rewards</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Game controls */}
      <div className="flex flex-col items-center w-full max-w-sm mx-auto">
        {/* Height meter */}
        <div className="w-full bg-space-purple/30 h-4 rounded-full mb-6">
          <div 
            className="h-full bg-gradient-to-r from-space-blue to-space-accent rounded-full transition-all duration-200"
            style={{ width: `${rocketHeight}%` }}
          ></div>
        </div>
        
        {/* Stats */}
        <div className="flex justify-between w-full mb-6">
          <div>
            <p className="text-xs text-gray-400">Height</p>
            <p className="text-lg text-white">{getHeightText()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Potential Reward</p>
            <p className="text-lg text-space-accent">{reward} PHOOEY</p>
          </div>
        </div>
        
        {/* Launch button */}
        {canPlay ? (
          <button 
            onClick={startLaunch}
            disabled={isLaunching || isFlying}
            className={`w-full flex items-center justify-center space-x-2 btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-4 px-8 rounded-full transition-all ${
              isLaunching || isFlying ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            } duration-300`}
          >
            <Rocket className="h-5 w-5" />
            <span>{isLaunching || isFlying ? 'Launching...' : 'Launch Rocket'}</span>
          </button>
        ) : (
          <div className="w-full text-center">
            <p className="text-gray-400 mb-2">Cooldown: {cooldownTime}s</p>
            <button 
              disabled
              className="w-full bg-gray-700 text-gray-400 font-bold py-4 px-8 rounded-full cursor-not-allowed"
            >
              Preparing Next Launch...
            </button>
          </div>
        )}
        
        {/* Tip */}
        <p className="text-xs text-gray-400 mt-4 text-center">
          Tip: Each launch is completely random! Will you reach the moon?
        </p>
      </div>
    </div>
  );
};

export default RocketGame;
