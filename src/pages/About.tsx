
import React from 'react';
import { Clock, Flag, Microscope, Star, Award, Moon, Rocket, Home, Zap, DollarSign } from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StarryBackground from '@/components/StarryBackground';
import SectionHeading from '@/components/SectionHeading';
import MouseCharacter from '@/components/MouseCharacter';

const AboutPage = () => {
  const mice = [
    { 
      name: 'Fe', 
      id: 'A3305', 
      description: 'The leader of the pack, known for being the first to adapt to space conditions.' 
    },
    { 
      name: 'Fi', 
      id: 'A3326', 
      description: 'The curious one, always exploring every corner of the enclosure.' 
    },
    { 
      name: 'Fo', 
      id: 'A3352', 
      description: 'The resilient one, who faced challenges with determination.' 
    },
    { 
      name: 'Fum', 
      id: 'A3356', 
      description: 'The analytical one, carefully observing every detail.' 
    },
    { 
      name: 'Phooey', 
      id: 'A3400', 
      description: 'The adventurous one, whose name inspired our token.' 
    },
  ];

  const timelineEvents = [
    {
      date: 'December 7, 1972',
      title: 'Launch Day',
      description: 'Apollo 17 launches from Kennedy Space Center with the five mice aboard.',
      icon: <Rocket className="h-6 w-6 text-space-blue" />
    },
    {
      date: 'December 10, 1972',
      title: 'Entering Lunar Orbit',
      description: 'The spacecraft enters lunar orbit, making the mice the first of their species to orbit the Moon.',
      icon: <Moon className="h-6 w-6 text-space-accent" />
    },
    {
      date: 'December 11-14, 1972',
      title: 'Lunar Surface Exploration',
      description: 'While astronauts explore the lunar surface, the mice remain in orbit inside the command module.',
      icon: <Flag className="h-6 w-6 text-white" />
    },
    {
      date: 'December 19, 1972',
      title: 'Return to Earth',
      description: 'After orbiting the Moon 75 times, the mice return to Earth with the Apollo 17 crew.',
      icon: <Home className="h-6 w-6 text-space-blue" />
    },
  ];

  return (
    <div className="space-bg min-h-screen">
      <StarryBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">The Story Behind <span className="text-gradient">PHOOEY</span></h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              How five pocket mice made history by journeying to the Moon and back on NASA's final Apollo mission.
            </p>
            <div className="space-divider mt-8 max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
      
      {/* The Mission Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Apollo 17 was the final mission of NASA's Apollo program and took place in December 1972. It marked the last time humans have visited the Moon.">
            The Apollo 17 Mission
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">The Final Journey</h3>
              <p className="text-gray-300 mb-4">
                Launched on December 7, 1972, Apollo 17 was commanded by Eugene Cernan, with Harrison Schmitt as lunar module pilot and Ronald Evans as command module pilot.
              </p>
              <p className="text-gray-300 mb-4">
                The mission set several records, including the longest lunar landing, longest total moonwalks, largest lunar sample return, and longest time in lunar orbit.
              </p>
              <p className="text-gray-300">
                But perhaps one of the most fascinating aspects of the mission was its smallest passengers - five pocket mice (Perognathus longimembris) that were part of the BIOCORE experiment.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-6">The BIOCORE Experiment</h3>
              <p className="text-gray-300 mb-4">
                BIOCORE (Biological Cosmic Ray Experiment) was designed to assess the impact of cosmic rays on living organisms during spaceflight.
              </p>
              <p className="text-gray-300 mb-4">
                The five pocket mice were chosen for their small size, ease of maintenance, and ability to withstand environmental stress. Each mouse was implanted with radiation monitors.
              </p>
              <p className="text-gray-300">
                It was during this mission that the crew gave the mice their memorable nicknames: Fe, Fi, Fo, Fum, and Phooey, adding a touch of humanity to the scientific experiment.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Real Lunar Mice Heroes Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Discover the remarkable stories of these tiny pioneering astronauts who made scientific history.">
            The Real Lunar Mice Heroes
          </SectionHeading>
          
          <div className="glass-card p-8 mb-10 hover:shadow-glow transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-xl font-bold text-space-accent mb-3">Fun Fact #1</h4>
                <p className="text-gray-300">
                  The mice were pocket mice (Perognathus longimembris), chosen because they don't need free water to drink - they get moisture from their food, making them perfect for space travel.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-space-accent mb-3">Fun Fact #2</h4>
                <p className="text-gray-300">
                  These mice traveled over half a million miles during their lunar journey - making them the first rodents to orbit another celestial body.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-space-accent mb-3">Fun Fact #3</h4>
                <p className="text-gray-300">
                  The mice were housed in special containers with life support systems that maintained pressure, temperature, and air quality throughout their historic journey.
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {mice.map((mouse, index) => (
              <MouseCharacter 
                key={index} 
                name={mouse.name} 
                id={mouse.id} 
                description={mouse.description}
                animationClass={`animate-float`}
                style={{ animationDelay: `${index * 0.5}s` }}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="Follow the journey of our five space-traveling mice during the historic Apollo 17 mission.">
            Mission Timeline
          </SectionHeading>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-space-blue/30"></div>
            
            {/* Timeline Events */}
            <div className="space-y-16">
              {timelineEvents.map((event, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-space-blue flex items-center justify-center z-10">
                    {event.icon}
                  </div>
                  
                  {/* Content */}
                  <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="glass-card p-6 hover:shadow-glow transition-all duration-300">
                      <span className="text-sm text-space-accent font-semibold block mb-2">{event.date}</span>
                      <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                      <p className="text-gray-300">{event.description}</p>
                    </div>
                  </div>
                  
                  {/* Empty Space for Alternate Side */}
                  <div className="hidden md:block md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* PHOOEY's Mission to the Crypto Moon */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="How we're honoring the legacy of these brave space pioneers through blockchain technology.">
            PHOOEY's Mission to the Crypto Moon
          </SectionHeading>
          
          <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Preserving History Through Blockchain</h3>
                <p className="text-gray-300 mb-4">
                  PHOOEY uses blockchain technology to immortalize the story of these pioneering mice. Through our token and NFT collection, we're ensuring that their contribution to science isn't forgotten.
                </p>
                <p className="text-gray-300 mb-4">
                  Each transaction on our network contains a tiny piece of their story, permanently embedded in the Solana blockchain - creating an unalterable record of their historic journey.
                </p>
                <p className="text-gray-300">
                  Our community-driven initiatives aim to increase awareness about these unsung heroes of space exploration, with a portion of proceeds supporting STEM education focused on space sciences.
                </p>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Building A New Kind of Community</h3>
                <p className="text-gray-300 mb-4">
                  Just as these five mice were pioneers in space exploration, PHOOEY holders are pioneers in a new kind of community that bridges science, history, and crypto culture.
                </p>
                <p className="text-gray-300 mb-4">
                  Our governance system allows token holders to vote on community initiatives, charity donations, and even scientific sponsorships - creating a decentralized force for education and awareness.
                </p>
                <p className="text-gray-300">
                  Through digital collectibles, interactive experiences, and community events, we're creating new ways to engage with both space history and cutting-edge technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Space Matters to Memecoins */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform skew-y-6 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading subtitle="How the final frontier inspires the new generation of cryptocurrency projects.">
            Why Space Matters to Memecoins
          </SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-space-blue rounded-full flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">The Explorer's Mindset</h3>
              <p className="text-gray-300 text-center">
                Both space exploration and cryptocurrency represent frontiers of human innovation. The "moonshot" mentality connects these worlds, inspiring communities to push boundaries.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-space-accent rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-space-dark" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Technological Innovation</h3>
              <p className="text-gray-300 text-center">
                Space programs pioneered technologies we use daily. Similarly, blockchain is transforming how we think about value, ownership, and community governance.
              </p>
            </div>
            
            <div className="glass-card p-8 hover:shadow-glow transition-all duration-300">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-space-blue to-space-accent rounded-full flex items-center justify-center mb-6">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 text-center">Community Power</h3>
              <p className="text-gray-300 text-center">
                Just as space missions require collective effort, successful crypto projects depend on passionate communities working toward shared goals and visions.
              </p>
            </div>
          </div>
          
          <div className="mt-16 glass-card p-8 hover:shadow-glow transition-all duration-300">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">The PHOOEY Difference</h3>
            <p className="text-gray-300 text-center max-w-3xl mx-auto">
              While many memecoins simply appropriate random themes for short-term hype, PHOOEY has authentic roots in real history. 
              We're not just using space imagery for marketing — we're celebrating actual scientific pioneers and creating 
              lasting value through education, community building, and technological innovation on the Solana blockchain.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
