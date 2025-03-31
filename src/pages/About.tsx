
import React from 'react';
import { Clock, Flag, Microscope, Star, Award, Moon, Rocket, Home } from 'lucide-react';

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
            <div className="glass-card p-8">
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
            
            <div className="glass-card p-8">
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
      
      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="absolute left-0 right-0 h-full bg-space-purple/5 transform -skew-y-6 z-0"></div>
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
                    <div className="glass-card p-6">
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
      
      {/* Meet the Mice Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading subtitle="Get to know the five pocket mice who made history as the first of their kind to orbit the Moon.">
            Meet The Space Pioneers
          </SectionHeading>
          
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
          
          <div className="mt-16 glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">The Scientific Legacy</h3>
            <p className="text-gray-300 mb-4">
              The BIOCORE experiment with these five mice provided valuable data about the effects of cosmic radiation on living organisms, 
              contributing to our understanding of space biology and helping pave the way for future long-duration space missions.
            </p>
            <p className="text-gray-300">
              Though their time in space was brief, their contribution to science was significant. The PHOOEY token celebrates their 
              pioneering spirit and the sense of adventure that drives both space exploration and the crypto community.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
