import React, { useRef, useEffect, useState } from 'react';
import { useWallet } from '@/providers/WalletProvider';
import { toast } from 'sonner';
import OptimizedImage from './OptimizedImage';

// Game assets
const PHOOEY_IDLE = '/lovable-uploads/idle.webp';
const PHOOEY_JET = '/lovable-uploads/jet.webp';
const PHOOEY_JET_SPEED = '/lovable-uploads/jetsp.webp';
const PHOOEY_FLAG = '/lovable-uploads/flag.webp';

// Game constants
const GRAVITY = 0.25;
const BOOST_POWER = -5;
const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PHOOEY_SIZE = 64;
const CHEESE_SIZE = 32;
const SATELLITE_WIDTH = 80;
const SATELLITE_HEIGHT = 40;
const MAX_BOOST_SPEED = -8;
const MIN_SCROLLING_SPEED = 1;
const MAX_SCROLLING_SPEED = 6;
const CHEESE_POINTS = 50;
const DISTANCE_POINTS = 1;

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
}

type GameState = 'ready' | 'playing' | 'gameover' | 'victory';

const PhooeyGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { connected } = useWallet();
  
  // Game state
  const [gameState, setGameState] = useState<GameState>('ready');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isBoostActive, setIsBoostActive] = useState(false);
  
  // Game objects
  const phooeyRef = useRef<GameObject>({ x: GAME_WIDTH / 2 - PHOOEY_SIZE / 2, y: GAME_HEIGHT - 150, width: PHOOEY_SIZE, height: PHOOEY_SIZE });
  const phooeyVelocityRef = useRef(0);
  const cheesesRef = useRef<GameObject[]>([]);
  const satellitesRef = useRef<GameObject[]>([]);
  const marsPositionRef = useRef(-15000); // Mars is way up in the game world
  const scrollPositionRef = useRef(0);
  const scrollSpeedRef = useRef(0);
  const gameFrameRef = useRef(0);
  
  // Images
  const [images, setImages] = useState<Record<string, HTMLImageElement>>({});
  
  // Initialize the game
  useEffect(() => {
    // Load images
    const imageUrls = {
      idle: PHOOEY_IDLE,
      jet: PHOOEY_JET,
      jetSpeed: PHOOEY_JET_SPEED,
      flag: PHOOEY_FLAG,
      cheese: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="%23FFD700" d="M2,11l4,1l-1,8l4,2v6l15,4l8-10l-3-5l-3-12L2,11z"/><circle fill="%23FFF" cx="10" cy="14" r="2"/><circle fill="%23FFF" cx="22" cy="6" r="2"/><circle fill="%23FFF" cx="16" cy="18" r="1.5"/><circle fill="%23FFF" cx="25" cy="16" r="1"/></svg>',
      satellite: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 40"><rect fill="%23888" x="10" y="15" width="60" height="10" rx="2"/><rect fill="%237299cf" x="35" y="0" width="10" height="40"/><circle fill="%23666" cx="15" cy="20" r="4"/><circle fill="%23666" cx="65" cy="20" r="4"/></svg>',
      mars: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle fill="%23D84315" cx="50" cy="50" r="50"/><circle fill="%23A63603" cx="30" cy="30" r="10"/><circle fill="%23A63603" cx="70" cy="40" r="15"/><circle fill="%23A63603" cx="40" cy="70" r="12"/></svg>',
    };
    
    const loadedImages: Record<string, HTMLImageElement> = {};
    let loadedCount = 0;
    
    Object.entries(imageUrls).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === Object.keys(imageUrls).length) {
          setImages(loadedImages);
        }
      };
      loadedImages[key] = img;
    });
    
    // Initialize game
    initGame();
    
    // Set up event listeners
    const canvas = canvasRef.current;
    if (canvas) {
      const handleTap = () => {
        if (gameState === 'ready') {
          startGame();
        } else if (gameState === 'playing') {
          boost();
        } else if (gameState === 'gameover' || gameState === 'victory') {
          resetGame();
        }
      };
      
      canvas.addEventListener('click', handleTap);
      
      // For touch screens
      canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleTap();
      });
      
      // Keyboard controls
      window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
          e.preventDefault();
          handleTap();
        }
      });
      
      return () => {
        canvas.removeEventListener('click', handleTap);
        canvas.removeEventListener('touchstart', handleTap);
        window.removeEventListener('keydown', handleTap);
      };
    }
  }, [gameState]);
  
  // Game loop
  useEffect(() => {
    let animationFrameId: number;
    
    const gameLoop = () => {
      if (gameState === 'playing') {
        updateGame();
        renderGame();
      }
      animationFrameId = requestAnimationFrame(gameLoop);
    };
    
    if (Object.keys(images).length > 0) {
      renderGame(); // Initial render
      if (gameState === 'playing') {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [gameState, images]);
  
  // Initialize game
  const initGame = () => {
    phooeyRef.current = { x: GAME_WIDTH / 2 - PHOOEY_SIZE / 2, y: GAME_HEIGHT - 150, width: PHOOEY_SIZE, height: PHOOEY_SIZE };
    phooeyVelocityRef.current = 0;
    cheesesRef.current = [];
    satellitesRef.current = [];
    scrollPositionRef.current = 0;
    scrollSpeedRef.current = MIN_SCROLLING_SPEED;
    gameFrameRef.current = 0;
    setScore(0);
    setDistance(0);
    
    // Try to load high score from local storage
    const savedHighScore = localStorage.getItem('phooeyHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
    
    setGameState('ready');
    renderGame();
  };
  
  // Start the game
  const startGame = () => {
    setGameState('playing');
    toast.info("Mission started! 🚀", { 
      description: "Help PHOOEY reach Mars!",
      duration: 3000
    });
  };
  
  // Reset the game
  const resetGame = () => {
    initGame();
  };
  
  // Boost PHOOEY upward
  const boost = () => {
    if (gameState !== 'playing') return;
    
    phooeyVelocityRef.current = Math.max(phooeyVelocityRef.current + BOOST_POWER, MAX_BOOST_SPEED);
    setIsBoostActive(true);
    
    // Reset the boost after a short delay
    setTimeout(() => {
      setIsBoostActive(false);
    }, 200);
  };
  
  // Update game state
  const updateGame = () => {
    gameFrameRef.current++;
    
    // Update PHOOEY
    phooeyVelocityRef.current += GRAVITY;
    phooeyRef.current.y += phooeyVelocityRef.current;
    
    // Keep PHOOEY on screen
    if (phooeyRef.current.y > GAME_HEIGHT - phooeyRef.current.height - 10) {
      phooeyRef.current.y = GAME_HEIGHT - phooeyRef.current.height - 10;
      phooeyVelocityRef.current = 0;
    }
    
    if (phooeyRef.current.y < 10) {
      phooeyRef.current.y = 10;
      phooeyVelocityRef.current = 0;
    }
    
    // Update scrolling position
    scrollPositionRef.current += scrollSpeedRef.current;
    
    // Gradually increase scrolling speed based on distance
    scrollSpeedRef.current = MIN_SCROLLING_SPEED + 
      (MAX_SCROLLING_SPEED - MIN_SCROLLING_SPEED) * 
      Math.min(scrollPositionRef.current / Math.abs(marsPositionRef.current), 1);
    
    // Update distance
    setDistance(Math.round(scrollPositionRef.current / 10));
    
    // Update score
    setScore(prevScore => prevScore + DISTANCE_POINTS);
    
    // Check if we've reached Mars
    if (scrollPositionRef.current >= Math.abs(marsPositionRef.current)) {
      victory();
      return;
    }
    
    // Generate cheese randomly
    if (gameFrameRef.current % 60 === 0 && Math.random() < 0.5) {
      const newCheese = {
        x: Math.random() * (GAME_WIDTH - CHEESE_SIZE),
        y: -CHEESE_SIZE,
        width: CHEESE_SIZE,
        height: CHEESE_SIZE
      };
      cheesesRef.current.push(newCheese);
    }
    
    // Generate satellites randomly
    if (gameFrameRef.current % 120 === 0 && Math.random() < 0.7) {
      const newSatellite = {
        x: Math.random() * (GAME_WIDTH - SATELLITE_WIDTH),
        y: -SATELLITE_HEIGHT,
        width: SATELLITE_WIDTH,
        height: SATELLITE_HEIGHT
      };
      satellitesRef.current.push(newSatellite);
    }
    
    // Update cheese positions
    cheesesRef.current.forEach((cheese, index) => {
      cheese.y += scrollSpeedRef.current;
      
      // Remove cheese if it's off screen
      if (cheese.y > GAME_HEIGHT) {
        cheesesRef.current.splice(index, 1);
      }
      
      // Check for collision with PHOOEY
      if (detectCollision(phooeyRef.current, cheese)) {
        // Collect cheese
        cheesesRef.current.splice(index, 1);
        setScore(prevScore => prevScore + CHEESE_POINTS);
        toast.success("Cheese collected! 🧀", { duration: 1000 });
      }
    });
    
    // Update satellite positions
    satellitesRef.current.forEach((satellite, index) => {
      satellite.y += scrollSpeedRef.current;
      
      // Remove satellite if it's off screen
      if (satellite.y > GAME_HEIGHT) {
        satellitesRef.current.splice(index, 1);
      }
      
      // Check for collision with PHOOEY
      if (detectCollision(phooeyRef.current, satellite)) {
        // Game over if PHOOEY hits a satellite
        gameOver();
      }
    });
  };
  
  // Render the game
  const renderGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw starry background
    drawStars(ctx);
    
    // Draw Mars (if close enough)
    const marsY = marsPositionRef.current + scrollPositionRef.current;
    if (marsY > -600) {
      if (images.mars) {
        ctx.drawImage(images.mars, 0, marsY, GAME_WIDTH, 300);
      } else {
        ctx.fillStyle = '#D84315';
        ctx.beginPath();
        ctx.arc(GAME_WIDTH / 2, marsY + 150, 150, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Draw cheese
    cheesesRef.current.forEach(cheese => {
      if (images.cheese) {
        ctx.drawImage(images.cheese, cheese.x, cheese.y, cheese.width, cheese.height);
      } else {
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(cheese.x, cheese.y, cheese.width, cheese.height);
      }
    });
    
    // Draw satellites
    satellitesRef.current.forEach(satellite => {
      if (images.satellite) {
        ctx.drawImage(images.satellite, satellite.x, satellite.y, satellite.width, satellite.height);
      } else {
        ctx.fillStyle = '#888888';
        ctx.fillRect(satellite.x, satellite.y, satellite.width, satellite.height);
      }
    });
    
    // Draw PHOOEY
    if (gameState === 'victory') {
      // Draw PHOOEY with flag when victorious
      if (images.flag) {
        ctx.drawImage(
          images.flag,
          phooeyRef.current.x, 
          phooeyRef.current.y, 
          phooeyRef.current.width, 
          phooeyRef.current.height
        );
      }
    } else {
      // Draw PHOOEY in different states
      let phooeyImage = images.idle;
      
      if (gameState === 'playing') {
        if (isBoostActive) {
          phooeyImage = images.jetSpeed;
        } else if (phooeyVelocityRef.current < 0) {
          phooeyImage = images.jet;
        }
      }
      
      if (phooeyImage) {
        ctx.drawImage(
          phooeyImage,
          phooeyRef.current.x, 
          phooeyRef.current.y, 
          phooeyRef.current.width, 
          phooeyRef.current.height
        );
      }
    }
    
    // Draw UI
    drawUI(ctx);
  };
  
  // Draw stars for background
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Static stars
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * GAME_WIDTH;
      const y = (Math.random() * GAME_HEIGHT + scrollPositionRef.current * 0.2) % GAME_HEIGHT;
      const size = Math.random() * 2;
      
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.5 + 0.5) + ')';
      ctx.fillRect(x, y, size, size);
    }
    
    // Larger stars
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * GAME_WIDTH;
      const y = (Math.random() * GAME_HEIGHT + scrollPositionRef.current * 0.1) % GAME_HEIGHT;
      const size = Math.random() * 3 + 1;
      
      ctx.fillStyle = 'rgba(255, 255, 255, ' + (Math.random() * 0.7 + 0.3) + ')';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  // Draw UI elements
  const drawUI = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Score: ${score}`, 10, 25);
    
    ctx.textAlign = 'right';
    ctx.fillText(`High Score: ${highScore}`, GAME_WIDTH - 10, 25);
    
    // Progress bar to Mars
    const progressPercent = Math.min(scrollPositionRef.current / Math.abs(marsPositionRef.current), 1);
    const barWidth = GAME_WIDTH - 60;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(30, 40, barWidth, 10);
    
    ctx.fillStyle = 'rgba(255, 100, 100, 0.7)';
    ctx.fillRect(30, 40, barWidth * progressPercent, 10);
    
    // Display distance
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`Distance: ${distance.toLocaleString()} km`, GAME_WIDTH / 2, 70);
    
    // Game state messages
    if (gameState === 'ready') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, GAME_HEIGHT / 2 - 50, GAME_WIDTH, 100);
      
      ctx.fillStyle = 'white';
      ctx.font = '24px sans-serif';
      ctx.fillText('Tap to Start', GAME_WIDTH / 2, GAME_HEIGHT / 2);
      ctx.font = '16px sans-serif';
      ctx.fillText('Help PHOOEY reach Mars!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 30);
    }
    
    if (gameState === 'gameover') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, GAME_HEIGHT / 2 - 70, GAME_WIDTH, 140);
      
      ctx.fillStyle = 'red';
      ctx.font = '24px sans-serif';
      ctx.fillText('Mission Failed!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
      
      ctx.fillStyle = 'white';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Score: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5);
      
      if (score > highScore) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText('New High Score!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 35);
      }
      
      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      ctx.fillText('Tap to Try Again', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 65);
    }
    
    if (gameState === 'victory') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, GAME_HEIGHT / 2 - 70, GAME_WIDTH, 140);
      
      ctx.fillStyle = '#00FF00';
      ctx.font = '24px sans-serif';
      ctx.fillText('Mission Accomplished!', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 30);
      
      ctx.fillStyle = 'white';
      ctx.font = '20px sans-serif';
      ctx.fillText(`Score: ${score}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 5);
      
      if (score > highScore) {
        ctx.fillStyle = '#FFD700';
        ctx.fillText('New High Score!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 35);
      }
      
      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      ctx.fillText('Tap to Play Again', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 65);
    }
  };
  
  // Game over
  const gameOver = () => {
    setGameState('gameover');
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('phooeyHighScore', score.toString());
    }
    
    toast.error("Mission failed! 💥", {
      description: "PHOOEY hit a satellite! Tap to try again.",
      duration: 3000
    });
  };
  
  // Victory
  const victory = () => {
    setGameState('victory');
    
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('phooeyHighScore', score.toString());
      
      // Special toast for connected wallets when breaking high score
      if (connected) {
        toast.success("New high score! 🏆", {
          description: "PHOOEY has reached Mars! 50 $PHOOEY tokens added to your wallet.",
          duration: 5000
        });
      } else {
        toast.success("New high score! 🏆", {
          description: "Connect your wallet to earn $PHOOEY tokens for your achievements!",
          duration: 5000
        });
      }
    } else {
      toast.success("Mars reached! 🚩", {
        description: "PHOOEY has completed the mission successfully!",
        duration: 3000
      });
    }
  };
  
  // Detect collision between two game objects
  const detectCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="glass-card p-4 w-full max-w-md hover:shadow-glow transition-all duration-300">
        <div className="border-2 border-space-blue/50 rounded-md overflow-hidden">
          <canvas 
            ref={canvasRef} 
            width={GAME_WIDTH} 
            height={GAME_HEIGHT}
            className="mx-auto bg-black cursor-pointer"
          />
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-gray-300">
            {gameState === 'ready' && 'Tap to start!'}
            {gameState === 'playing' && 'Tap to boost!'}
            {gameState === 'gameover' && 'Tap to try again!'}
            {gameState === 'victory' && 'Mission accomplished! Tap to play again.'}
          </p>
          
          {connected && gameState === 'victory' && (
            <p className="text-space-accent mt-2 text-sm">
              +50 $PHOOEY tokens for reaching Mars! 
            </p>
          )}
          
          {!connected && (
            <p className="text-gray-400 mt-2 text-sm">
              Connect wallet to earn $PHOOEY tokens for high scores!
            </p>
          )}
        </div>
      </div>
      
      <div className="flex gap-4 mt-6">
        <div className="glass-card p-3 text-center w-24">
          <p className="text-xs text-gray-300">Score</p>
          <p className="text-xl text-white">{score}</p>
        </div>
        <div className="glass-card p-3 text-center w-24">
          <p className="text-xs text-gray-300">Best</p>
          <p className="text-xl text-space-accent">{highScore}</p>
        </div>
        <div className="glass-card p-3 text-center w-24">
          <p className="text-xs text-gray-300">Distance</p>
          <p className="text-xl text-white">{distance} <span className="text-xs">km</span></p>
        </div>
      </div>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center">
          <OptimizedImage 
            src={PHOOEY_IDLE} 
            alt="PHOOEY idle" 
            className="w-10 h-10 mr-2" 
          />
          <span className="text-gray-300 text-sm">Floating</span>
        </div>
        <div className="flex items-center">
          <OptimizedImage 
            src={PHOOEY_JET} 
            alt="PHOOEY jetpack" 
            className="w-10 h-10 mr-2" 
          />
          <span className="text-gray-300 text-sm">Boosting</span>
        </div>
        <div className="flex items-center">
          <OptimizedImage 
            src={PHOOEY_JET_SPEED} 
            alt="PHOOEY speed boost" 
            className="w-10 h-10 mr-2" 
          />
          <span className="text-gray-300 text-sm">Power boost</span>
        </div>
        <div className="flex items-center">
          <OptimizedImage 
            src={PHOOEY_FLAG} 
            alt="PHOOEY with flag" 
            className="w-10 h-10 mr-2" 
          />
          <span className="text-gray-300 text-sm">Victory</span>
        </div>
      </div>
    </div>
  );
};

export default PhooeyGame;
