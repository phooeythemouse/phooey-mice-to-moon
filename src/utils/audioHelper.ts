
/**
 * AudioHelper - A utility for handling audio in the game
 * This helps work around common issues with audio playback in browsers
 */

// Create dummy audio elements for browsers that need user interaction
export const initializeAudio = () => {
  try {
    console.log('Initializing audio system...');
    
    // Create temporary audio elements for each sound with correct paths
    const tempSounds = [
      new Audio('/lovable-uploads/boost.mp3'),
      new Audio('/lovable-uploads/collect.mp3'),
      new Audio('/lovable-uploads/crash.mp3'),
      new Audio('/lovable-uploads/space-music.mp3')
    ];
    
    // Set volume to 0 and try to play them
    tempSounds.forEach(sound => {
      sound.volume = 0;
      
      // Add error handling for each audio element
      sound.onerror = (e) => {
        console.error('Audio failed to load:', sound.src, e);
      };
      
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
        console.log('Successfully initialized audio:', sound.src);
      }).catch((err) => {
        // Expected to fail on some browsers without user interaction
        console.log('Audio initialization expected to fail on first load (browser security):', err.message);
      });
    });
    
    // Add a global click handler to help initialize audio on iOS/Safari
    const handleFirstInteraction = () => {
      console.log('User interaction detected, initializing audio playback');
      tempSounds.forEach(sound => {
        sound.play().catch(e => console.log('Still failed after interaction:', e.message));
        sound.pause();
      });
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
    
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });
    
    console.log('Audio initialization completed');
    return true;
  } catch (err) {
    console.error('Audio initialization failed:', err);
    return false;
  }
};

// Helper to safely play audio with fallbacks
export const playSoundEffect = (audio: HTMLAudioElement | null, volume = 1.0): void => {
  if (!audio) {
    console.log('Attempted to play null audio');
    return;
  }
  
  try {
    // Log the source to help debug
    console.log('Attempting to play:', audio.src);
    
    // Reset audio to beginning
    audio.currentTime = 0;
    audio.volume = volume;
    
    // Try to play the audio
    const playPromise = audio.play();
    
    // Handle promise rejection (happens in some browsers)
    if (playPromise !== undefined) {
      playPromise.catch((e) => {
        // Silent catch - this is expected behavior in some browsers
        console.log('Audio play promise rejected:', e);
        
        // Try again with user interaction
        const handleUserInteraction = () => {
          audio.play().catch((err) => {
            // Still failed, give up silently
            console.log('Still failed to play audio after user interaction:', err);
          });
          document.removeEventListener('click', handleUserInteraction);
          document.removeEventListener('touchstart', handleUserInteraction);
        };
        
        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });
      });
    }
  } catch (e) {
    // Silent catch - allow game to continue without sound if there's an issue
    console.log('Error playing sound:', e);
  }
};
