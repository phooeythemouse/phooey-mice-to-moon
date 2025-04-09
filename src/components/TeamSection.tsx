
import React from 'react';
import SectionHeading from './SectionHeading';

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
      imageUrl: "/lovable-uploads/c28a7eb5-eca8-476d-8654-185dafffe1e3.png",
      bio: "Carl is the visionary behind PHOOEY, combining his passion for blockchain and space exploration to create the first lunar memecoin."
    },
    {
      name: "Laura Chen",
      role: "Creative Director",
      imageUrl: "/lovable-uploads/010366fd-96f6-4622-a05d-195476d740fd.png",
      bio: "Laura leads the creative direction for PHOOEY, bringing the stories of the Apollo 17 mice to life through captivating visuals and narratives."
    },
    {
      name: "Alex Rivera",
      role: "Community Manager",
      imageUrl: "/lovable-uploads/e10a76fb-88cb-401c-851f-b1370c515606.png",
      bio: "Alex builds and nurtures the PHOOEY community, ensuring that every member feels connected to our lunar mission."
    },
    {
      name: "Sara Müller",
      role: "Blockchain Strategist",
      imageUrl: "/lovable-uploads/f9b8773b-6445-4f05-8863-6d0399d08a8d.png",
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
                <img 
                  src={member.imageUrl} 
                  alt={member.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
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
