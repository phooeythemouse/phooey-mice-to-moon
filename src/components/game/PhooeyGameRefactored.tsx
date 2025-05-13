import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Maximize, Minimize, Gamepad2, VolumeX, Volume2 } from 'lucide-react';
import { playSoundEffect, initializeAudio } from '@/utils/audioHelper';
import GameEngine from './GameEngine';
import GameControls from './GameControls';
import AssetLoader from './AssetLoader';

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

const PhooeyGameRefactored: React.FC<PhooeyGameProps> = ({ 
  onGameEnd, 
  isFullscreen = false,
  onFullscreenToggle,
  onError 
}) => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
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
    
    // Asset loading implementation
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

      // Define game assets with their paths
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
          boost: '/lovable-uploads/boost.mp3',
          collect: '/lovable-uploads/collect.mp3',
          crash: '/lovable-uploads/crash.mp3',
          background: '/lovable-uploads/space-music.mp3'
        }
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
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, [onError]);

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
    } catch (error) {
      console.error('Error creating player:', error);
      if (onError) onError();
    }
  }, [canvasSize, onError]);

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
      
      // Define the handleUserInteraction function within this effect scope
      const handleUserInteraction = () => {
        if (bgMusicRef.current && soundEnabled) {
          playSoundEffect(bgMusicRef.current, 0.2);
        }
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
      };
      
      playMusic();
      
      // Add listener for user interaction
      document.addEventListener('click', handleUserInteraction);
      document.addEventListener('touchstart', handleUserInteraction);
      
      return () => {
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        if (bgMusicRef.current) {
          bgMusicRef.current.pause();
        }
      };
    }
  }, [assetsLoaded, gameObjects.length, soundEnabled]);

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
    // Exit fullscreen if game ended
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(err => {
        console.log('Error exiting fullscreen:', err);
      });
    }
    
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }
    
    // Add bonus for successful landing
    const finalScore = success ? score + 100 : score;
    
    // Call the onGameEnd callback with the final score
    onGameEnd(finalScore);
  }, [score, onGameEnd]);

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

  return (
    <div 
      ref={gameContainerRef}
      className={`game-container relative ${isFullscreen ? 'fullscreen-game-container' : 'w-full max-w-md mx-auto'}`}
      tabIndex={0}
      onClick={handleBoost}
      onTouchStart={handleBoost}
    >
      {/* Game area */}
      {assetsLoaded && gameObjects.length > 0 && !isAssetLoading && (
        <GameEngine
          canvasSize={canvasSize}
          gameObjects={gameObjects}
          setGameObjects={setGameObjects}
          playerVelocity={playerVelocity}
          setPlayerVelocity={setPlayerVelocity}
          score={score}
          setScore={setScore}
          gameStartTime={gameStartTime}
          setGameTime={setGameTime}
          boostMode={boostMode}
          endGame={endGame}
          soundEnabled={soundEnabled}
          assetRefs={{
            playerImage: playerImageRef.current,
            playerJetImage: playerJetImageRef.current,
            playerJetSpeedImage: playerJetSpeedImageRef.current,
            marsImage: marsImageRef.current,
            solanaImage: solanaImageRef.current,
            cheeseCollectSound: cheeseCollectSoundRef.current,
            crashSound: crashSoundRef.current
          }}
        />
      )}
      
      {/* Game control buttons */}
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {/* Sound toggle button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleSound(); }}
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
          onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
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
        <AssetLoader isLoading={isAssetLoading} progress={assetLoadProgress} />
      )}
    </div>
  );
};

export default PhooeyGameRefactored;
