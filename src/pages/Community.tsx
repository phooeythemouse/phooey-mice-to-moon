
import React from 'react';
import { Share2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SectionHeading from '@/components/SectionHeading';
import SocialIcon from '@/components/SocialIcon';

const CommunityPage = () => {
  const socialPlatforms = [
    {
      name: "Twitter",
      icon: <SocialIcon type="twitter" size={24} />,
      color: "bg-blue-400",
      url: "https://twitter.com/phooeythemouse",
      description: "Follow for the latest updates and announcements"
    },
    {
      name: "Telegram",
      icon: <SocialIcon type="telegram" size={24} />,
      color: "bg-blue-500",
      url: "https://t.me/phooeythemouse",
      description: "Get instant notifications and chat with the community"
    }
  ];

  const updates = [
    {
      date: "June 15, 2023",
      title: "PHOOEY Community Launch",
      content: "We're excited to announce the official launch of the PHOOEY community! Join us on this cosmic journey."
    },
    {
      date: "June 10, 2023",
      title: "Website Launch",
      content: "Our website is now live, featuring the story of the Apollo 17 mice and details about the PHOOEY token."
    },
    {
      date: "June 5, 2023",
      title: "Social Media Channels Live",
      content: "Follow us on Twitter and join our Telegram for the latest updates and to connect with the community."
    }
  ];

  const ambassadors = [
    {
      name: "Cosmic Carl",
      role: "Community Manager",
      imageUrl: "/lovable-uploads/carl.webp"
    },
    {
      name: "Lunar Laura",
      role: "Content Creator",
      imageUrl: "/lovable-uploads/laura.webp"
    },
    {
      name: "Apollo Alex",
      role: "Technical Advisor",
      imageUrl: "/lovable-uploads/alex.webp"
    },
    {
      name: "Stellar Sara",
      role: "Marketing Lead",
      imageUrl: "/lovable-uploads/sara.webp"
    }
  ];

  const handleJoinCommunity = () => {
    toast.info("Join Our Community", {
      description: "Follow our Twitter and join our Telegram group to connect with other members!",
      duration: 3000,
    });
  };

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the <span className="text-gradient">PHOOEY</span> Community
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with fellow space enthusiasts and crypto explorers as we journey to new heights together.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* Social Media Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Connect with us on various platforms to stay updated and engage with the community.">
            Social Platforms
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socialPlatforms.map((platform, index) => (
              <a 
                href={platform.url}
                key={index} 
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-8 text-center hover:bg-white/10 transition-colors group"
              >
                <div className={`w-16 h-16 mx-auto ${platform.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{platform.name}</h3>
                <p className="text-gray-300 mb-4">
                  {platform.description}
                </p>
                <span className="inline-flex items-center text-space-blue group-hover:text-space-accent transition-colors">
                  <span>Join Now</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Updates Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Stay informed with the latest news and announcements from the PHOOEY team.">
            Latest Updates
          </SectionHeading>
          
          <div className="glass-card p-8">
            <div className="flex items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-space-blue mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white">News & Announcements</h3>
            </div>
            
            <div className="space-y-8">
              {updates.map((update, index) => (
                <div key={index} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                  <span className="text-sm text-space-accent font-semibold block mb-2">{update.date}</span>
                  <h4 className="text-lg font-bold text-white mb-2">{update.title}</h4>
                  <p className="text-gray-300">{update.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Ambassadors Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Meet our dedicated team members who help grow and nurture the PHOOEY community.">
            Community Ambassadors
          </SectionHeading>
          
          <div className="glass-card p-8">
            <div className="flex items-center mb-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-space-blue mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-bold text-white">The Team Behind PHOOEY</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {ambassadors.map((ambassador, index) => (
                <div key={index} className="text-center">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-2 border-space-blue">
                    <img 
                      src={ambassador.imageUrl} 
                      alt={ambassador.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">{ambassador.name}</h4>
                  <p className="text-space-accent text-sm">{ambassador.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Community Guidelines Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Our community values and principles to ensure a positive and inclusive environment.">
            Community Guidelines
          </SectionHeading>
          
          <div className="glass-card p-8">
            <div className="space-y-6">
              <p className="text-gray-300">
                At PHOOEY, we believe in creating a welcoming and respectful community for all members, 
                regardless of their background or experience level in the crypto space.
              </p>
              
              <h4 className="text-lg font-bold text-white">Our Core Values:</h4>
              
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-3 text-space-blue">•</div>
                  <div>
                    <h5 className="text-white font-semibold">Respect & Inclusion</h5>
                    <p className="text-gray-300 text-sm">Treat all community members with respect and courtesy.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-space-blue">•</div>
                  <div>
                    <h5 className="text-white font-semibold">Education & Support</h5>
                    <p className="text-gray-300 text-sm">Share knowledge and help each other grow in the crypto space.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-space-blue">•</div>
                  <div>
                    <h5 className="text-white font-semibold">Transparency & Trust</h5>
                    <p className="text-gray-300 text-sm">Open communication and honest engagement within our community.</p>
                  </div>
                </li>
                <li className="flex">
                  <div className="mr-3 text-space-blue">•</div>
                  <div>
                    <h5 className="text-white font-semibold">Fun & Creativity</h5>
                    <p className="text-gray-300 text-sm">Embrace the lighthearted, creative spirit of PHOOEY and the crypto memecoin culture.</p>
                  </div>
                </li>
              </ul>
              
              <p className="text-gray-300">
                By joining our community, you agree to abide by these values and contribute to a positive environment for all.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-12 text-center">
            <Share2 className="h-12 w-12 text-space-blue mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Join the Journey?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Become part of our growing community of space enthusiasts and crypto explorers today!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="https://t.me/phooeythemouse"
                target="_blank"
                rel="noopener noreferrer" 
                className="btn-glow bg-space-blue hover:bg-opacity-80 text-white font-bold py-3 px-8 rounded-lg transition-all"
              >
                Join Telegram
              </a>
              <a
                href="https://twitter.com/phooeythemouse"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent hover:bg-white/10 text-white border border-white/20 font-bold py-3 px-8 rounded-lg transition-all"
              >
                Follow on Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default CommunityPage;
