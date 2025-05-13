import React, { useEffect, useRef, useState, useCallback } from 'react';
import { playSoundEffect } from '@/utils/audioHelper';

interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: 'player' | 'cheese' | 'obstacle';
  image: HTMLImageElement;
}

interface GameEngineProps {
  canvasSize: { width: number; height: number };
  gameObjects: GameObject[];
  setGameObjects: React.Dispatch<React.SetStateAction<GameObject[]>>;
  playerVelocity: number;
  setPlayerVelocity: React.Dispatch<React.SetStateAction<number>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  gameStartTime: number;
  setGameTime: React.Dispatch<React.SetStateAction<number>>;
  boostMode: boolean;
  endGame: (success?: boolean) => void;
  soundEnabled: boolean;
  assetRefs: {
    playerImage: HTMLImageElement | null;
    playerJetImage: HTMLImageElement | null;
    playerJetSpeedImage: HTMLImageElement | null;
    marsImage: HTMLImageElement | null;
    solanaImage: HTMLImageElement | null;
    cheeseCollectSound: HTMLAudioElement | null;
    crashSound: HTMLAudioElement | null;
  };
}

const GameEngine: React.FC<GameEngineProps> = ({
  canvasSize,
  gameObjects,
  setGameObjects,
  playerVelocity,
  setPlayerVelocity,
  score,
  setScore,
  gameStartTime,
  setGameTime,
  boostMode,
  endGame,
  soundEnabled,
  assetRefs
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  
  const checkCollisions = useCallback((player: GameObject, objects: GameObject[]) => {
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
          if (assetRefs.cheeseCollectSound && soundEnabled) {
            playSoundEffect(assetRefs.cheeseCollectSound);
          }
          
          // Remove the cheese
          setGameObjects(prev => prev.filter(o => o !== obj));
        } else if (obj.type === 'obstacle') {
          // Crash into obstacle
          if (assetRefs.crashSound && soundEnabled) {
            playSoundEffect(assetRefs.crashSound);
          }
          
          // End the game
          endGame();
        }
      }
    }
  }, [setScore, setGameObjects, assetRefs, soundEnabled, endGame]);
  
  const spawnGameObject = useCallback((objectRefs: {[key: string]: HTMLImageElement | null}) => {
    try {
      // Randomly determine what type of object to spawn
      const rand = Math.random();
      let newObject: GameObject;
      
      if (rand < 0.6 && objectRefs.cheese) {
        // Spawn cheese (60% chance)
        newObject = {
          x: Math.random() * (canvasSize.width - 30),
          y: -50,
          width: 30,
          height: 30,
          speed: 2 + Math.random() * 2,
          type: 'cheese',
          image: objectRefs.cheese
        };
      } else {
        // Spawn obstacle (40% chance)
        const obstacleTypes = [
          objectRefs.satellite, 
          objectRefs.doge, 
          objectRefs.pizza
        ].filter(Boolean);
        
        if (obstacleTypes.length === 0) return; // No obstacles available
        
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
  }, [canvasSize.width, setGameObjects]);

  const gameUpdate = useCallback(() => {
    try {
      if (!canvasRef.current || gameObjects.length === 0) {
        gameLoopRef.current = requestAnimationFrame(gameUpdate);
        return;
      }

      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) {
        console.error('Failed to get canvas context');
        return;
      }
      
      // Clear canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
      
      // Draw background (starry background)
      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);
      
      // Add some stars
      const gameTime = Date.now() - gameStartTime;
      setGameTime(gameTime);
      
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
      if (assetRefs.solanaImage) {
        ctx.globalAlpha = 0.1;
        ctx.drawImage(
          assetRefs.solanaImage,
          canvasSize.width/2 - 100,
          canvasSize.height/2 - 100,
          200,
          200
        );
        ctx.globalAlpha = 1.0;
      }
      
      // Spawn new objects occasionally
      if (Math.random() < 0.03) {
        spawnGameObject((assetRefs as any));
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
        if (boostMode && assetRefs.playerJetSpeedImage) {
          player.image = assetRefs.playerJetSpeedImage;
        } else if (playerVelocity < 0 && assetRefs.playerJetImage) {
          player.image = assetRefs.playerJetImage;
        } else if (assetRefs.playerImage) {
          player.image = assetRefs.playerImage;
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
        if (assetRefs.marsImage) {
          ctx.drawImage(
            assetRefs.marsImage,
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
      gameLoopRef.current = requestAnimationFrame(gameUpdate);
    } catch (error) {
      console.error('Error in game update:', error);
    }
  }, [canvasSize, gameObjects, gameStartTime, boostMode, playerVelocity, score, assetRefs, setGameObjects, setPlayerVelocity, setScore, setGameTime, checkCollisions, spawnGameObject, endGame]);

  // Initialize game loop
  useEffect(() => {
    console.log('Starting game engine loop');
    gameLoopRef.current = requestAnimationFrame(gameUpdate);
    
    return () => {
      if (gameLoopRef.current !== null) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameUpdate]);

  return (
    <canvas
      ref={canvasRef}
      width={canvasSize.width}
      height={canvasSize.height}
      className={`bg-space-dark border-2 border-space-blue rounded-lg mx-auto`}
      style={{
        display: 'block',
        margin: '0 auto'
      }}
    />
  );
};

export default GameEngine;
