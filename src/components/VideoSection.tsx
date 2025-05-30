
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import AspectRatioContainer from './AspectRatioContainer';
import OptimizedImage from './OptimizedImage';
import { useIsMobile } from '@/hooks/use-mobile';

interface VideoSectionProps {
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ className = '' }) => {
  const [isApollo17Playing, setIsApollo17Playing] = useState(false);
  const [isAnimalsPlaying, setIsAnimalsPlaying] = useState(false);
  const isMobile = useIsMobile();

  const playApollo17Video = () => {
    setIsApollo17Playing(true);
  };

  const playAnimalsVideo = () => {
    setIsAnimalsPlaying(true);
  };

  return (
    <section className={`py-20 relative ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">Historical Footage</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Learn about the Apollo 17 mission and the history of animals in space through these documentary videos.
          </p>
          <div className="space-divider mt-6 max-w-xs mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Apollo 17 Mission - TikTok style short */}
          <div className="glass-card p-6 overflow-hidden lg:col-span-5">
            <h3 className="text-xl font-bold text-white mb-4">Apollo 17 Mission</h3>
            <AspectRatioContainer ratio={9/16} className="mb-4 relative max-w-sm mx-auto">
              {!isApollo17Playing ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={playApollo17Video}
                >
                  <OptimizedImage 
                    src="https://img.youtube.com/vi/Dz7V8POeG6g/maxresdefault.jpg" 
                    alt="Apollo 17 Mission Thumbnail" 
                    className="w-full h-full object-cover rounded transition-all duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://www.youtube.com/embed/Dz7V8POeG6g?autoplay=1&controls=1&rel=0" 
                  title="Apollo 17 Mission Video"
                  className="w-full h-full rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              )}
            </AspectRatioContainer>
            <p className="text-gray-300 text-sm">
              The Apollo 17 mission was the final mission of NASA's Apollo program and marks the most recent time humans traveled beyond low Earth orbit.
            </p>
            <a 
              href="https://youtu.be/Dz7V8POeG6g" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-space-blue hover:text-space-accent mt-4 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          {/* Animals in Space - Full YouTube size */}
          <div className="glass-card p-6 overflow-hidden lg:col-span-7">
            <h3 className="text-xl font-bold text-white mb-4">Animals in Space</h3>
            <AspectRatioContainer ratio={16/9} className="mb-4 relative">
              {!isAnimalsPlaying ? (
                <div 
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                  onClick={playAnimalsVideo}
                >
                  <OptimizedImage 
                    src="https://img.youtube.com/vi/dwLSbirbrIs/hqdefault.jpg" 
                    alt="Animals in Space Thumbnail" 
                    className="w-full h-full object-cover rounded transition-all duration-300 group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe 
                  src="https://www.youtube.com/embed/dwLSbirbrIs?autoplay=1&controls=1&rel=0" 
                  title="Animals in Space Video"
                  className="w-full h-full rounded"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              )}
            </AspectRatioContainer>
            <p className="text-gray-300 text-sm">
              The United States Air Force documentary about animals in space reveals the important role these creatures played in the early days of space exploration.
            </p>
            <a 
              href="https://youtu.be/dwLSbirbrIs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-space-blue hover:text-space-accent mt-4 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
