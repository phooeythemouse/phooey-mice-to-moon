
import React from 'react';
import SectionHeading from './SectionHeading';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Carl Johnson",
      role: "Founder & Lead Developer",
      imageUrl: "/lovable-uploads/carl.webp",
      bio: "Carl is the visionary behind PHOOEY, combining his passion for blockchain and space exploration to create the first lunar memecoin."
    },
    {
      name: "Laura Chen",
      role: "Creative Director",
      imageUrl: "/lovable-uploads/laura.webp",
      bio: "Laura leads the creative direction for PHOOEY, bringing the stories of the Apollo 17 mice to life through captivating visuals and narratives."
    },
    {
      name: "Alex Rivera",
      role: "Community Manager",
      imageUrl: "/lovable-uploads/alex.webp",
      bio: "Alex builds and nurtures the PHOOEY community, ensuring that every member feels connected to our lunar mission."
    },
    {
      name: "Sara Müller",
      role: "Blockchain Strategist",
      imageUrl: "/lovable-uploads/sara.webp",
      bio: "Sara's expertise in blockchain technology helps guide PHOOEY's technical development and tokenomics strategy."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Meet the visionaries behind PHOOEY who are bringing the story of the Apollo 17 mice to the crypto world.">
          Our Team
        </SectionHeading>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="glass-card p-6 flex flex-col items-center text-center hover:shadow-glow transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                <AspectRatio ratio={1/1}>
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </AspectRatio>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-sm text-space-accent mb-4">{member.role}</p>
              <p className="text-gray-300 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
