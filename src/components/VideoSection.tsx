
import React from 'react';
import { ExternalLink } from 'lucide-react';

interface VideoSectionProps {
  className?: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({ className = '' }) => {
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card p-6 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-4">Apollo 17 Mission</h3>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/Dz7V8POeG6g?si=Ev5FMdefL8DWTrLP" 
                title="Apollo 17 Mission Video"
                className="w-full h-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-gray-300 text-sm">
              The Apollo 17 mission was the final mission of NASA's Apollo program and marks the most recent time humans traveled beyond low Earth orbit.
            </p>
            <a 
              href="https://youtu.be/Dz7V8POeG6g?si=Ev5FMdefL8DWTrLP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-space-blue hover:text-space-accent mt-4 transition-colors"
            >
              <span>Watch on YouTube</span>
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
          
          <div className="glass-card p-6 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-4">Animals in Space</h3>
            <div className="aspect-w-4 aspect-h-3 mb-4">
              <iframe 
                src="https://www.youtube-nocookie.com/embed/dwLSbirbrIs?si=gzGy4irq4e2aB6hZ" 
                title="Animals in Space Video"
                className="w-full h-full rounded"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <p className="text-gray-300 text-sm">
              The United States Air Force documentary about animals in space reveals the important role these creatures played in the early days of space exploration.
            </p>
            <a 
              href="https://youtu.be/dwLSbirbrIs?si=gzGy4irq4e2aB6hZ" 
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
