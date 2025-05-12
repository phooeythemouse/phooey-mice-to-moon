
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Maximize, Minimize, Gamepad2, VolumeX, Volume2 } from 'lucide-react';
import { playSoundEffect, initializeAudio } from '@/utils/audioHelper';

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
  isFullscreen?: boolean;
  onFullscreenToggle?: (enterFullscreen: boolean) => void;
  onError?: () => void;
}

// List of game assets with their paths for more organized loading
const GAME_ASSETS = {
  images: {
    player: '/lovable-uploads/phooey.webp',
    playerJet: '/lovable-uploads/jet.webp',
    playerJetSpeed: '/lovable-uploads/jetsp.webp',
    cheese: '/lovable-uploads/cheese.webp',
    satellite: '/lovable-uploads/satellite.webp',
    doge: '/lovable-uploads/doge.webp',
    pizza: '/lovable-uploads/pizza.webp',
    mars: '/lovable-uploads/mars.webp',
    solana: '/lovable-uploads/solana.webp'
  },
  audio: {
    boost: '/boost.mp3',
    collect: '/collect.mp3',
    crash: '/crash.mp3',
    background: '/space-music.mp3'
  }
};

const PhooeyGame: React.FC<PhooeyGameProps> = ({ 
  onGameEnd, 
  isFullscreen = false,
  onFullscreenToggle,
  onError 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameLoop, setGameLoop] = useState<number | null>(null);
  const [gameObjects, setGameObjects] = useState<GameObject[]>([]);
  const [playerVelocity, setPlayerVelocity] = useState(0);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  const [boostMode, setBoostMode] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 360, height: 640 });
  const [initialized, setInitialized] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [isAssetLoading, setIsAssetLoading] = useState(true);
  const [assetLoadProgress, setAssetLoadProgress] = useState(0);
  const [assetLoadErrors, setAssetLoadErrors] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
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
  
  // Sound references
  const boostSoundRef = useRef<HTMLAudioElement | null>(null);
  const cheeseCollectSoundRef = useRef<HTMLAudioElement | null>(null);
  const crashSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize canvas size based on container
  const initializeCanvasSize = useCallback(() => {
    try {
      if (!gameContainerRef.current) {
        console.log('gameContainerRef not ready yet');
        return;
      }
      
      const containerWidth = gameContainerRef.current.clientWidth;
      console.log('Container width:', containerWidth);
      
      let newWidth, newHeight;
      
      // Keep 16:9 aspect ratio for the game
      if (isFullscreen) {
        // Use the full screen dimensions if in fullscreen
        handleResize();
      } else {
        // In normal mode, fit to container width
        newWidth = Math.min(containerWidth, 500); // Max width of 500px in normal mode
        newHeight = newWidth * (16/9);
        
        console.log('Setting canvas size to:', {width: newWidth, height: newHeight});
        setCanvasSize({
          width: Math.floor(newWidth),
          height: Math.floor(newHeight)
        });
      }
      
      setInitialized(true);
    } catch (error) {
      console.error('Error initializing canvas size:', error);
      if (onError) onError();
    }
  }, [isFullscreen, onError]);

  // Fullscreen handling
  const enterFullscreen = useCallback(() => {
    console.log('Trying to enter fullscreen mode');
    if (!gameContainerRef.current) {
      console.log('No container ref available');
      return;
    }
    
    try {
      if (gameContainerRef.current.requestFullscreen) {
        gameContainerRef.current.requestFullscreen()
          .then(() => {
            console.log('Entered fullscreen mode');
            if (onFullscreenToggle) onFullscreenToggle(true);
            
            // Resize canvas to fit screen after a short delay
            setTimeout(() => {
              handleResize();
            }, 100);
          })
          .catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
            // Fallback to "fake" fullscreen mode
            if (onFullscreenToggle) onFullscreenToggle(true);
            setTimeout(() => handleResize(), 100);
          });
      } else {
        console.log('Fullscreen API not available');
        // Fallback for browsers without fullscreen API
        if (onFullscreenToggle) onFullscreenToggle(true);
        setTimeout(() => handleResize(), 100);
      }
    } catch (e) {
      console.error('Error in fullscreen request:', e);
      // Ultimate fallback
      if (onFullscreenToggle) onFullscreenToggle(true);
      setTimeout(() => handleResize(), 100);
    }
  }, [onFullscreenToggle]);
  
  const exitFullscreen = useCallback(() => {
    console.log('Trying to exit fullscreen mode');
    try {
      if (document.fullscreenElement) {
        document.exitFullscreen()
          .then(() => {
            console.log('Exited fullscreen mode');
            if (onFullscreenToggle) onFullscreenToggle(false);
            
            // Reset canvas size
            setTimeout(() => {
              initializeCanvasSize();
            }, 100);
          })
          .catch(err => {
            console.error('Error attempting to exit fullscreen:', err);
            // Fallback
            if (onFullscreenToggle) onFullscreenToggle(false);
          });
      } else {
        console.log('Not in fullscreen mode according to API');
        if (onFullscreenToggle) onFullscreenToggle(false);
      }
    } catch (e) {
      console.error('Error in fullscreen exit:', e);
      // Fallback
      if (onFullscreenToggle) onFullscreenToggle(false);
    }
  }, [onFullscreenToggle, initializeCanvasSize]);
  
  const toggleFullscreen = useCallback(() => {
    console.log('Toggle fullscreen, current state:', !!document.fullscreenElement);
    if (document.fullscreenElement) {
      exitFullscreen();
    } else {
      enterFullscreen();
    }
  }, [enterFullscreen, exitFullscreen]);
  
  // Handle fullscreen change event
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreenActive = !!document.fullscreenElement;
      console.log('Fullscreen change detected:', isFullscreenActive);
      
      if (onFullscreenToggle) onFullscreenToggle(isFullscreenActive);
      
      if (isFullscreenActive) {
        handleResize();
      } else {
        initializeCanvasSize();
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [onFullscreenToggle, initializeCanvasSize]);
  
  // Initialize canvas size on component mount and when container size changes
  useEffect(() => {
    console.log('Initializing canvas size, fullscreen:', isFullscreen);
    
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      initializeCanvasSize();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [initializeCanvasSize, isFullscreen]);
  
  // Re-initialize on window resize when not in fullscreen
  useEffect(() => {
    if (!isFullscreen) {
      const handleWindowResize = () => {
        console.log('Window resize detected');
        initializeCanvasSize();
      };
      
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }
  }, [isFullscreen, initializeCanvasSize]);
  
  // Handle screen resize
  const handleResize = useCallback(() => {
    if (!isFullscreen) {
      console.log('Skip resize: not in fullscreen');
      return;
    }
    
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    console.log('Screen dimensions:', {width: screenWidth, height: screenHeight});
    
    // Keep aspect ratio similar to original game (16:9)
    let newWidth, newHeight;
    
    if (screenWidth / screenHeight > 9/16) {
      // Screen is wider than our target ratio
      newHeight = screenHeight;
      newWidth = newHeight * (9/16);
    } else {
      // Screen is taller than our target ratio
      newWidth = screenWidth;
      newHeight = newWidth * (16/9);
    }
    
    console.log('Setting fullscreen canvas size to:', {width: newWidth, height: newHeight});
    setCanvasSize({
      width: Math.floor(newWidth),
      height: Math.floor(newHeight)
    });
  }, [isFullscreen]);
  
  // Add window resize event listener
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  
  // Auto-resize for fullscreen
  useEffect(() => {
    if (isFullscreen) {
      console.log('Applying fullscreen resize');
      handleResize();
    } else {
      console.log('Reverting to normal size');
      initializeCanvasSize();
    }
  }, [isFullscreen, handleResize, initializeCanvasSize]);

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newState = !prev;
      
      if (newState === false) {
        // Mute all audio
        if (bgMusicRef.current) bgMusicRef.current.pause();
        if (boostSoundRef.current) boostSoundRef.current.muted = true;
        if (cheeseCollectSoundRef.current) cheeseCollectSoundRef.current.muted = true;
        if (crashSoundRef.current) crashSoundRef.current.muted = true;
      } else {
        // Unmute all audio
        if (bgMusicRef.current && gameObjects.length > 0) {
          bgMusicRef.current.play().catch(e => console.log('Audio play failed:', e));
        }
        if (boostSoundRef.current) boostSoundRef.current.muted = false;
        if (cheeseCollectSoundRef.current) cheeseCollectSoundRef.current.muted = false;
        if (crashSoundRef.current) crashSoundRef.current.muted = false;
      }
      
      return newState;
    });
  }, [gameObjects.length]);

  // Initialize audio context for iOS devices
  useEffect(() => {
    // Try to initialize audio on first user interaction
    const handleInitAudio = () => {
      initializeAudio();
      document.removeEventListener('click', handleInitAudio);
      document.removeEventListener('touchstart', handleInitAudio);
    };
    
    document.addEventListener('click', handleInitAudio);
    document.addEventListener('touchstart', handleInitAudio);
    
    return () => {
      document.removeEventListener('click', handleInitAudio);
      document.removeEventListener('touchstart', handleInitAudio);
    };
  }, []);

  // Load game assets
  useEffect(() => {
    console.log('Loading game assets...');
    setIsAssetLoading(true);
    setAssetLoadProgress(0);
    
    const loadAssets = async () => {
      // Load images
      const loadImage = (src: string, progressValue: number): Promise<HTMLImageElement> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.onload = () => {
            console.log(`Image loaded: ${src}`);
            setAssetLoadProgress(prev => prev + progressValue);
            resolve(img);
          };
          img.onerror = (err) => {
            console.error(`Failed to load image: ${src}`, err);
            setAssetLoadErrors(prev => prev + 1);
            
            // Create a placeholder image to prevent game from crashing
            const placeholderImage = new Image(50, 50);
            placeholderImage.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiM3MzczNzMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiPj88L3RleHQ+PC9zdmc+';
            setAssetLoadProgress(prev => prev + progressValue);
            resolve(placeholderImage);
          };
          img.crossOrigin = "anonymous"; // This helps with CORS issues
          img.src = src;
        });
      };

      // Load audio with proper error handling
      const loadAudio = (src: string, progressValue: number): Promise<HTMLAudioElement> => {
        return new Promise((resolve) => {
          const audio = new Audio();
          
          // Add load event handler
          audio.onloadeddata = () => {
            console.log(`Audio loaded: ${src}`);
            setAssetLoadProgress(prev => prev + progressValue);
            resolve(audio);
          };
          
          // Add error handler
          audio.onerror = (err) => {
            console.error(`Failed to load audio: ${src}`, err);
            setAssetLoadErrors(prev => prev + 1);
            
            // Create a dummy audio element that won't crash
            const dummyAudio = new Audio();
            // Set up a fake play method that won't cause errors
            const originalPlay = dummyAudio.play;
            dummyAudio.play = async () => {
              try {
                return await originalPlay.call(dummyAudio);
              } catch (e) {
                console.log('Audio play failed (using dummy):', e);
                return Promise.resolve();
              }
            };
            setAssetLoadProgress(prev => prev + progressValue);
            resolve(dummyAudio);
          };
          
          // Start loading
          audio.preload = 'auto';
          audio.src = src;
          audio.load();
        });
      };

      try {
        // Calculate progress increment per asset
        const totalAssets = Object.keys(GAME_ASSETS.images).length + Object.keys(GAME_ASSETS.audio).length;
        const progressIncrement = 100 / totalAssets;
        
        // Load player images
        playerImageRef.current = await loadImage(GAME_ASSETS.images.player, progressIncrement);
        playerJetImageRef.current = await loadImage(GAME_ASSETS.images.playerJet, progressIncrement);
        playerJetSpeedImageRef.current = await loadImage(GAME_ASSETS.images.playerJetSpeed, progressIncrement);
        
        // Load obstacle and item images
        cheeseImageRef.current = await loadImage(GAME_ASSETS.images.cheese, progressIncrement);
        satelliteImageRef.current = await loadImage(GAME_ASSETS.images.satellite, progressIncrement);
        dogeImageRef.current = await loadImage(GAME_ASSETS.images.doge, progressIncrement);
        pizzaImageRef.current = await loadImage(GAME_ASSETS.images.pizza, progressIncrement);
        marsImageRef.current = await loadImage(GAME_ASSETS.images.mars, progressIncrement);
        solanaImageRef.current = await loadImage(GAME_ASSETS.images.solana, progressIncrement);

        console.log('All images loaded successfully');
        
        // Create and load audio elements with proper error handling
        try {
          boostSoundRef.current = await loadAudio(GAME_ASSETS.audio.boost, progressIncrement);
          cheeseCollectSoundRef.current = await loadAudio(GAME_ASSETS.audio.collect, progressIncrement);
          crashSoundRef.current = await loadAudio(GAME_ASSETS.audio.crash, progressIncrement);
          bgMusicRef.current = await loadAudio(GAME_ASSETS.audio.background, progressIncrement);
          
          if (bgMusicRef.current) {
            bgMusicRef.current.loop = true;
            bgMusicRef.current.volume = 0.3;
          }
          
          console.log('All audio loaded successfully');
          
          // Trigger a user interaction simulation to enable audio on some browsers
          initializeAudio();
        } catch (audioError) {
          console.error('Failed to load audio assets:', audioError);
          // Continue the game even if audio fails to load
        }

        // Check for too many errors
        if (assetLoadErrors > 3) {
          console.error('Too many asset loading errors');
          if (onError) onError();
          return;
        }

        // Mark assets as loaded
        setAssetsLoaded(true);
        setIsAssetLoading(false);
        
        // Start game once assets are loaded
        setGameStartTime(Date.now());
        
        // Create player object now that assets are loaded
        if (canvasSize.width > 0 && canvasSize.height > 0 && playerImageRef.current) {
          console.log('Creating player object after asset load');
          createPlayerObject();
        }
        
        // Log the successful load
        console.log('Assets loaded, game ready to start');
      } catch (error) {
        console.error('Failed to load game assets:', error);
        setIsAssetLoading(false);
        if (onError) onError();
      }
    };

    // Set a timeout to make sure assets load or fail within a reasonable timeframe
    const assetTimeout = setTimeout(() => {
      if (isAssetLoading) {
        console.log('Asset loading timed out, continuing with what we have');
        setAssetsLoaded(true);
        setIsAssetLoading(false);
        
        // Try to create player if we can
        if (playerImageRef.current && canvasSize.width > 0 && canvasSize.height > 0) {
          createPlayerObject();
        }
      }
    }, 8000); // 8 second timeout

    loadAssets();

    return () => {
      clearTimeout(assetTimeout);
      if (gameLoop !== null) {
        cancelAnimationFrame(gameLoop);
      }
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  // Create player object
  const createPlayerObject = useCallback(() => {
    if (!playerImageRef.current) {
      console.error('Player image not loaded');
      return;
    }
    
    if (canvasSize.width <= 0 || canvasSize.height <= 0) {
      console.error('Invalid canvas dimensions:', canvasSize);
      return;
    }
    
    try {
      console.log('Creating player object with size:', canvasSize);
      
      const playerObject: GameObject = {
        x: canvasSize.width / 2 - 25,
        y: canvasSize.height - 100,
        width: 50,
        height: 50,
        speed: 0,
        type: 'player',
        image: playerImageRef.current
      };
      
      setGameObjects([playerObject]);
      
      // Start game loop if assets are loaded
      if (assetsLoaded && gameLoop === null) {
        console.log('Starting game loop after player creation');
        startGameLoop();
      }
    } catch (error) {
      console.error('Error creating player:', error);
      if (onError) onError();
    }
  }, [canvasSize, assetsLoaded, gameLoop, onError]);

  // Create player object when canvas size is initialized and assets are loaded
  useEffect(() => {
    if (initialized && assetsLoaded && !gameObjects.length) {
      console.log('Canvas initialized and assets loaded, creating player');
      createPlayerObject();
    }
  }, [initialized, assetsLoaded, gameObjects.length, createPlayerObject]);

  // Play background music
  useEffect(() => {
    if (assetsLoaded && bgMusicRef.current && gameObjects.length > 0 && soundEnabled) {
      // Attempt to play background music
      const playMusic = () => {
        if (bgMusicRef.current) {
          bgMusicRef.current.volume = 0.2;
          playSoundEffect(bgMusicRef.current, 0.2);
        }
      };
      
      const handleUserInteraction = () => {
        if (bgMusicRef.current && soundEnabled) {
          playSoundEffect(bgMusicRef.current, 0.2);
        }
      };
      
      playMusic();
      
      // Add listener for user interaction
      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
    }
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
      }
    };
  }, [assetsLoaded, gameObjects.length, soundEnabled]);

  const startGameLoop = useCallback(() => {
    try {
      console.log('Starting game loop');
      
      if (gameLoop !== null) {
        cancelAnimationFrame(gameLoop);
      }
      
      const loop = requestAnimationFrame(gameUpdate);
      setGameLoop(loop);
    } catch (error) {
      console.error('Error starting game loop:', error);
      if (onError) onError();
    }
  }, [onError]);

  const spawnGameObject = () => {
    if (!assetsLoaded) return;
    
    try {
      // Randomly determine what type of object to spawn
      const rand = Math.random();
      let newObject: GameObject;
      
      if (rand < 0.6) {
        // Spawn cheese (60% chance)
        newObject = {
          x: Math.random() * (canvasSize.width - 30),
          y: -50,
          width: 30,
          height: 30,
          speed: 2 + Math.random() * 2,
          type: 'cheese',
          image: cheeseImageRef.current!
        };
      } else {
        // Spawn obstacle (40% chance)
        const obstacleTypes = [
          satelliteImageRef.current, 
          dogeImageRef.current, 
          pizzaImageRef.current
        ].filter(Boolean);
        
        const obstacleImage = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)]!;
        
        newObject = {
          x: Math.random() * (canvasSize.width - 40),
          y: -50,
          width: 40,
          height: 40,
          speed: 3 + Math.random() * 3,
          type: 'obstacle',
          image: obstacleImage
        };
      }
      
      setGameObjects(prev => [...prev, newObject]);
    } catch (error) {
      console.error('Error spawning game object:', error);
    }
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
          setScore(prev => prev + 10);
          if (cheeseCollectSoundRef.current && soundEnabled) {
            playSoundEffect(cheeseCollectSoundRef.current);
          }
          
          // Remove the cheese
          setGameObjects(prev => prev.filter(o => o !== obj));
        } else if (obj.type === 'obstacle') {
          // Crash into obstacle
          if (crashSoundRef.current && soundEnabled) {
            playSoundEffect(crashSoundRef.current);
          }
          
          // End the game
          endGame();
        }
      }
    }
  };

  const gameUpdate = useCallback(() => {
    try {
      if (!canvasRef.current || !assetsLoaded || gameObjects.length === 0) {
        // If we're not ready to render yet, try again on next frame
        const nextLoop = requestAnimationFrame(gameUpdate);
        setGameLoop(nextLoop);
        return;
      }

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context');
        if (onError) onError();
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      
      // Draw background (starry background)
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      
      // Add some stars
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      for (let i = 0; i < 100; i++) {
        ctx.fillRect(
          Math.sin(i * 100 + gameTime / 1000) * canvasSize.width + canvasSize.width/2, 
          Math.cos(i * 100 + gameTime / 1000) * canvasSize.height/2 + canvasSize.height/2, 
          1, 
          1
        );
      }
      
      // Maybe draw Solana logo in the background
      if (solanaImageRef.current) {
        ctx.globalAlpha = 0.1;
        ctx.drawImage(
          solanaImageRef.current,
          canvasSize.width/2 - 100,
          canvasSize.height/2 - 100,
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
        setPlayerVelocity(prev => prev + 0.2);
        
        // Update player position
        player.y += playerVelocity;
        
        // Keep player in bounds
        if (player.y < 0) {
          player.y = 0;
          setPlayerVelocity(1);
        }
        if (player.y > canvasSize.height - player.height) {
          player.y = canvasSize.height - player.height;
          setPlayerVelocity(0);
        }
        
        // Update player image based on state
        if (boostMode && playerJetSpeedImageRef.current) {
          player.image = playerJetSpeedImageRef.current;
        } else if (playerVelocity < 0 && playerJetImageRef.current) {
          player.image = playerJetImageRef.current;
        } else if (playerImageRef.current) {
          player.image = playerImageRef.current;
        }
        
        // Check for collisions
        checkCollisions(player, updatedObjects);
      }
      
      // Update all other objects
      for (let i = 1; i < updatedObjects.length; i++) {
        const obj = updatedObjects[i];
        obj.y += obj.speed;
        
        // Remove objects that go off screen
        if (obj.y > canvasSize.height) {
          updatedObjects.splice(i, 1);
          i--;
        }
      }
      
      // Update game state
      setGameObjects(updatedObjects);
      
      // Draw all objects
      updatedObjects.forEach(obj => {
        if (obj.image) {
          ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
        }
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
            canvasSize.width/2 - 100,
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
    } catch (error) {
      console.error('Error in game update:', error);
      if (onError) onError();
    }
  }, [canvasSize.width, canvasSize.height, gameObjects, gameTime, gameStartTime, boostMode, playerVelocity, score, assetsLoaded, onError]);

  const handleBoost = useCallback(() => {
    setBoostMode(true);
    setPlayerVelocity(-5);
    
    if (boostSoundRef.current && soundEnabled) {
      playSoundEffect(boostSoundRef.current);
    }
    
    // Turn off boost mode after a short time
    setTimeout(() => {
      setBoostMode(false);
    }, 200);
  }, [soundEnabled]);

  const endGame = useCallback((success = false) => {
    if (gameLoop !== null) {
      cancelAnimationFrame(gameLoop);
      setGameLoop(null);
    }
    
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
    
    // Exit fullscreen if game ended
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.log('Error exiting fullscreen:', err);
      });
    }
    
    // Add bonus for successful landing
    const finalScore = success ? score + 100 : score;
    
    // Call the onGameEnd callback with the final score
    onGameEnd(finalScore);
  }, [gameLoop, score, onGameEnd]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.code === 'Space' || e.key === ' ' || e.code === 'ArrowUp') {
      handleBoost();
      e.preventDefault(); // Prevent page scrolling
    }
  }, [handleBoost]);

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Error handling - check for failed initialization
  useEffect(() => {
    const checkInitialization = setTimeout(() => {
      if (!initialized || !assetsLoaded) {
        console.error('Game failed to initialize properly');
        if (onError) onError();
      }
    }, 10000); // Allow 10 seconds for initialization
    
    return () => clearTimeout(checkInitialization);
  }, [initialized, assetsLoaded, onError]);

  // Handle cases where user doesn't interact and assets get stuck
  useEffect(() => {
    const forceInitTimeout = setTimeout(() => {
      if (isAssetLoading) {
        console.log('Force completing asset loading after timeout');
        setIsAssetLoading(false);
        setAssetsLoaded(true);
        
        // Try to create player if possible
        if (playerImageRef.current && canvasSize.width > 0 && canvasSize.height > 0) {
          createPlayerObject();
        }
      }
    }, 10000); // Force complete after 10 seconds
    
    return () => clearTimeout(forceInitTimeout);
  }, [isAssetLoading, canvasSize.width, canvasSize.height, createPlayerObject]);

  return (
    <div 
      ref={gameContainerRef}
      className={`game-container relative ${isFullscreen ? 'fullscreen-game-container' : 'w-full max-w-md mx-auto'}`}
      tabIndex={0}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className={`
          bg-space-dark border-2 border-space-blue rounded-lg mx-auto
          ${isFullscreen ? 'fullscreen-canvas' : 'w-full h-auto'}
        `}
        onClick={handleBoost}
        onTouchStart={handleBoost}
        style={{
          display: 'block', // Ensure canvas is visible
          margin: '0 auto'  // Center canvas horizontally
        }}
      />
      
      {/* Game control buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {/* Sound toggle button */}
        <button
          onClick={toggleSound}
          className="p-2 bg-space-dark/70 rounded-full hover:bg-space-dark transition-all"
          aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
        >
          {soundEnabled ? (
            <Volume2 className="text-white w-6 h-6" />
          ) : (
            <VolumeX className="text-white w-6 h-6" />
          )}
        </button>
        
        {/* Fullscreen toggle button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 bg-space-dark/70 rounded-full hover:bg-space-dark transition-all"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? (
            <Minimize className="text-white w-6 h-6" />
          ) : (
            <Maximize className="text-white w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Game controls */}
      <div className={`game-controls mt-4 flex justify-center ${isFullscreen ? 'fullscreen-controls' : ''}`}>
        {!isFullscreen && isMobile && (
          <div className="text-center text-gray-300 text-sm mb-2 w-full">
            Tap screen to boost PHOOEY's jetpack! 🚀
          </div>
        )}
        
        {!isFullscreen && (
          <div className="flex gap-2">
            <button
              className="btn-outline px-4 py-2 text-white rounded-lg border border-space-accent flex items-center gap-1"
              onClick={handleBoost}
            >
              <Gamepad2 className="w-4 h-4" />
              Boost!
            </button>
            <button
              className="btn-outline px-4 py-2 text-white rounded-lg border border-space-accent flex items-center gap-1"
              onClick={enterFullscreen}
            >
              <Maximize className="w-4 h-4" />
              Fullscreen
            </button>
          </div>
        )}
        
        {isFullscreen && (
          <div className="fullscreen-boost-indicator absolute bottom-10 left-1/2 transform -translate-x-1/2">
            <div className="text-white text-lg bg-black/50 px-4 py-2 rounded-full animate-pulse">
              Tap anywhere to boost! 🚀
            </div>
          </div>
        )}
      </div>
      
      {/* Loading indication - improved visibility */}
      {(isAssetLoading || !initialized || !assetsLoaded || gameObjects.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center bg-space-dark/80 z-10 rounded-lg">
          <div className="text-center p-4">
            <img 
              src="/lovable-uploads/phooey.webp" 
              alt="PHOOEY" 
              className="h-16 w-16 mx-auto animate-bounce" 
            />
            <p className="text-white mt-4 text-xl">Loading game...</p>
            
            {isAssetLoading && (
              <div className="mt-4 w-48 mx-auto">
                <div className="h-2 w-full bg-gray-700 rounded-full">
                  <div 
                    className="h-full bg-space-accent rounded-full transition-all duration-300"
                    style={{ width: `${assetLoadProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-1">{Math.floor(assetLoadProgress)}%</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhooeyGame;
