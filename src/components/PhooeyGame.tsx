import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'player' | 'cheese' | 'obstacle';
  image: HTMLImageElement;
}

interface PhooeyGameProps {
  onGameEnd: (score: number) => void;
}

const GAME_WIDTH = 360;
const GAME_HEIGHT = 640;
const GRAVITY = 0.2;
const BOOST_POWER = -5;
const CHEESE_POINTS = 10;

const PhooeyGame: React.FC<PhooeyGameProps> = ({ onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameLoop, setGameLoop] = useState<number | null>(null);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [playerVelocity, setPlayerVelocity] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [boostMode, setBoostMode] = useState(false);
  const isMobile = useIsMobile();
  
  // Asset references
  const playerImageRef = useRef<HTMLImageElement | null>(null);
  const playerJetImageRef = useRef<HTMLImageElement | null>(null);
  const playerJetSpeedImageRef = useRef<HTMLImageElement | null>(null);
  const cheeseImageRef = useRef<HTMLImageElement | null>(null);
  const satelliteImageRef = useRef<HTMLImageElement | null>(null);
  const dogeImageRef = useRef<HTMLImageElement | null>(null);
  const pizzaImageRef = useRef<HTMLImageElement | null>(null);
  const marsImageRef = useRef<HTMLImageElement | null>(null);
  const solanaImageRef = useRef<HTMLImageElement | null>(null);
  const assetsLoaded = useRef(false);
  
  // Sound references
  const boostSoundRef = useRef<HTMLAudioElement | null>(null);
  const cheeseCollectSoundRef = useRef<HTMLAudioElement | null>(null);
  const crashSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Load game assets
  useEffect(() => {
    const loadAssets = async () => {
      // Load images
      const loadImage = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve(img);
          img.src = src;
        });
      };

      try {
        // Load player images
        playerImageRef.current = await loadImage('/lovable-uploads/idle.webp');
        playerJetImageRef.current = await loadImage('/lovable-uploads/jet.webp');
        playerJetSpeedImageRef.current = await loadImage('/lovable-uploads/jetsp.webp');
        
        // Load obstacle and item images
        cheeseImageRef.current = await loadImage('/lovable-uploads/cheese.webp');
        satelliteImageRef.current = await loadImage('/lovable-uploads/satellite.webp');
        dogeImageRef.current = await loadImage('/lovable-uploads/doge.webp');
        pizzaImageRef.current = await loadImage('/lovable-uploads/pizza.webp');
        marsImageRef.current = await loadImage('/lovable-uploads/mars.webp');
        solanaImageRef.current = await loadImage('/lovable-uploads/solana.webp');

        // Create player object
        const playerObject: GameObject = {
          x: GAME_WIDTH / 2 - 25,
          y: GAME_HEIGHT - 100,
          width: 50,
          height: 50,
          speed: 0,
          type: 'player',
          image: playerImageRef.current
        };

        setGameObjects([playerObject]);
        assetsLoaded.current = true;
        
        // Create audio elements
        boostSoundRef.current = new Audio('/lovable-uploads/boost.mp3');
        cheeseCollectSoundRef.current = new Audio('/lovable-uploads/collect.mp3');
        crashSoundRef.current = new Audio('/lovable-uploads/crash.mp3');
        bgMusicRef.current = new Audio('/lovable-uploads/background.mp3');
        
        if (bgMusicRef.current) {
          bgMusicRef.current.loop = true;
          bgMusicRef.current.volume = 0.3;
        }

        // Start game once assets are loaded
        setGameStartTime(Date.now());
        startGameLoop();
      } catch (error) {
        console.error('Failed to load game assets:', error);
      }
    };

    loadAssets();

    return () => {
      if (gameLoop !== null) {
        cancelAnimationFrame(gameLoop);
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Play background music
  useEffect(() => {
    if (assetsLoaded.current && bgMusicRef.current) {
      bgMusicRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
    }
    
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [assetsLoaded.current]);

  const startGameLoop = () => {
    if (gameLoop !== null) {
      cancelAnimationFrame(gameLoop);
    }
    
    const loop = requestAnimationFrame(gameUpdate);
    setGameLoop(loop);
  };

  const spawnGameObject = () => {
    if (!assetsLoaded.current) return;
    
    // Randomly determine what type of object to spawn
    const rand = Math.random();
    let newObject: GameObject;
    
    if (rand < 0.6) {
      // Spawn cheese (60% chance)
      newObject = {
        x: Math.random() * (GAME_WIDTH - 30),
        y: -50,
        width: 30,
        height: 30,
        speed: 2 + Math.random() * 2,
        type: 'cheese',
        image: cheeseImageRef.current!
      };
    } else {
      // Spawn obstacle (40% chance)
      const obstacleTypes = [satelliteImageRef.current, dogeImageRef.current, pizzaImageRef.current];
      const obstacleImage = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]!;
      
      newObject = {
        x: Math.random() * (GAME_WIDTH - 40),
        y: -50,
        width: 40,
        height: 40,
        speed: 3 + Math.random() * 3,
        type: 'obstacle',
        image: obstacleImage
      };
    }
    
    setGameObjects(prev => [...prev, newObject]);
  };

  const checkCollisions = (player: GameObject, objects: GameObject[]) => {
    for (let i = 1; i < objects.length; i++) { // Start from 1 to skip player
      const obj = objects[i];
      
      // Basic rectangle collision detection
      if (
        player.x < obj.x + obj.width &&
        player.x + player.width > obj.x &&
        player.y < obj.y + obj.height &&
        player.y + player.height > obj.y
      ) {
        // Handle collision based on object type
        if (obj.type === 'cheese') {
          // Collect cheese
          setScore(prev => prev + CHEESE_POINTS);
          if (cheeseCollectSoundRef.current) {
            cheeseCollectSoundRef.current.currentTime = 0;
            cheeseCollectSoundRef.current.play().catch(e => console.log(e));
          }
          
          // Remove the cheese
          setGameObjects(prev => prev.filter(o => o !== obj));
        } else if (obj.type === 'obstacle') {
          // Crash into obstacle
          if (crashSoundRef.current) {
            crashSoundRef.current.play().catch(e => console.log(e));
          }
          
          // End the game
          endGame();
        }
      }
    }
  };

  const gameUpdate = () => {
    if (!canvasRef.current || !assetsLoaded.current) {
      const nextLoop = requestAnimationFrame(gameUpdate);
      setGameLoop(nextLoop);
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Draw background (starry background)
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Add some stars
    for (let i = 0; i < 100; i++) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.fillRect(
        Math.sin(i * 100 + gameTime / 1000) * GAME_WIDTH + GAME_WIDTH/2, 
        Math.cos(i * 100 + gameTime / 1000) * GAME_HEIGHT/2 + GAME_HEIGHT/2, 
        1, 
        1
      );
    }
    
    // Maybe draw Solana logo in the background
    if (solanaImageRef.current) {
      ctx.globalAlpha = 0.1;
      ctx.drawImage(
        solanaImageRef.current,
        GAME_WIDTH/2 - 100,
        GAME_HEIGHT/2 - 100,
        200,
        200
      );
      ctx.globalAlpha = 1.0;
    }
    
    // Update game time
    setGameTime(Date.now() - gameStartTime);
    
    // Spawn new objects occasionally
    if (Math.random() < 0.03) {
      spawnGameObject();
    }
    
    // Update player position with physics
    const updatedObjects = [...gameObjects];
    
    // Find player
    const playerIndex = updatedObjects.findIndex(o => o.type === 'player');
    if (playerIndex !== -1) {
      const player = updatedObjects[playerIndex];
      
      // Apply gravity
      setPlayerVelocity(prev => prev + GRAVITY);
      
      // Update player position
      player.y += playerVelocity;
      
      // Keep player in bounds
      if (player.y < 0) {
        player.y = 0;
        setPlayerVelocity(1);
      }
      if (player.y > GAME_HEIGHT - player.height) {
        player.y = GAME_HEIGHT - player.height;
        setPlayerVelocity(0);
      }
      
      // Update player image based on state
      if (boostMode) {
        player.image = playerJetSpeedImageRef.current!;
      } else if (playerVelocity < 0) {
        player.image = playerJetImageRef.current!;
      } else {
        player.image = playerImageRef.current!;
      }
      
      // Check for collisions
      checkCollisions(player, updatedObjects);
    }
    
    // Update all other objects
    for (let i = 1; i < updatedObjects.length; i++) {
      const obj = updatedObjects[i];
      obj.y += obj.speed;
      
      // Remove objects that go off screen
      if (obj.y > GAME_HEIGHT) {
        updatedObjects.splice(i, 1);
        i--;
      }
    }
    
    // Update game state
    setGameObjects(updatedObjects);
    
    // Draw all objects
    updatedObjects.forEach(obj => {
      ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
    });
    
    // Draw score
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '20px "Space Mono", monospace';
    ctx.fillText(`Score: ${score}`, 10, 30);
    
    // Draw time
    const seconds = Math.floor(gameTime / 1000);
    ctx.fillText(`Time: ${seconds}s`, 10, 60);
    
    // Check if player has reached Mars (end condition)
    if (seconds >= 60) {
      // Draw Mars at the top
      if (marsImageRef.current) {
        ctx.drawImage(
          marsImageRef.current,
          GAME_WIDTH/2 - 100,
          -50,
          200,
          200
        );
      }
      
      // End game with success if player is at top
      const player = updatedObjects.find(o => o.type === 'player');
      if (player && player.y < 100) {
        endGame(true);
      }
    }
    
    // Continue game loop
    const nextLoop = requestAnimationFrame(gameUpdate);
    setGameLoop(nextLoop);
  };

  const handleBoost = () => {
    setBoostMode(true);
    setPlayerVelocity(BOOST_POWER);
    
    if (boostSoundRef.current) {
      boostSoundRef.current.currentTime = 0;
      boostSoundRef.current.play().catch(e => console.log(e));
    }
    
    // Turn off boost mode after a short time
    setTimeout(() => {
      setBoostMode(false);
    }, 200);
  };

  const endGame = (success = false) => {
    if (gameLoop !== null) {
      cancelAnimationFrame(gameLoop);
      setGameLoop(null);
    }
    
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
    
    // Add bonus for successful landing
    const finalScore = success ? score + 100 : score;
    
    // Call the onGameEnd callback with the final score
    onGameEnd(finalScore);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
      handleBoost();
    }
  };

  return (
    <div 
      className="game-container relative w-full max-w-sm mx-auto"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <canvas
        ref={canvasRef}
        width={GAME_WIDTH}
        height={GAME_HEIGHT}
        className="bg-space-dark border-2 border-space-blue rounded-lg mx-auto"
        onClick={handleBoost}
        onTouchStart={handleBoost}
      />
      {isMobile && (
        <div className="mt-4 text-center text-gray-300 text-sm">
          Tap screen to boost PHOOEY's jetpack! 🚀
        </div>
      )}
      <div className="game-controls mt-4 flex justify-center">
        <button
          className="btn-outline px-4 py-2 text-white rounded-lg border border-space-accent"
          onClick={handleBoost}
        >
          Boost! 🚀
        </button>
      </div>
    </div>
  );
};

export default PhooeyGame;
