
/**
 * AudioHelper - A utility for handling audio in the game
 * This helps work around common issues with audio playback in browsers
 */

// Create dummy audio elements for browsers that need user interaction
export const initializeAudio = () => {
  try {
    // Create temporary audio elements for each sound
    const tempSounds = [
      new Audio('/boost.mp3'),
      new Audio('/collect.mp3'),
      new Audio('/crash.mp3'),
      new Audio('/space-music.mp3')
    ];
    
    // Set volume to 0 and try to play them
    tempSounds.forEach(sound => {
      sound.volume = 0;
      sound.play().then(() => {
        sound.pause();
        sound.currentTime = 0;
      }).catch(() => {
        // Expected to fail on some browsers without user interaction
      });
    });
    
    return true;
  } catch (err) {
    console.error('Audio initialization failed:', err);
    return false;
  }
};

// Helper to safely play audio with fallbacks
export const playSoundEffect = (audio: HTMLAudioElement | null, volume = 1.0): void => {
  if (!audio) return;
  
  try {
    // Reset audio to beginning
    audio.currentTime = 0;
    audio.volume = volume;
    
    // Try to play the audio
    const playPromise = audio.play();
    
    // Handle promise rejection (happens in some browsers)
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silent catch - this is expected behavior in some browsers
      });
    }
  } catch (e) {
    // Silent catch - allow game to continue without sound if there's an issue
  }
};
