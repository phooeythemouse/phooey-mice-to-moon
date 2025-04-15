
import React from 'react';
import SectionHeading from './SectionHeading';

const phases = [
  {
    phase: "Phase 1: Launch",
    title: "Foundation Building",
    timeline: "Q2 2023",
    completed: true,
    items: [
      "Initial website launch",
      "Social media channels establishment",
      "Community building begins",
      "Token contract deployment and audit"
    ]
  },
  {
    phase: "Phase 2: Growth",
    title: "Expansion & Visibility",
    timeline: "Q3 2023",
    completed: false,
    items: [
      "DEX listings and liquidity pools",
      "NFT collection release",
      "Marketing campaigns",
      "Community expansion initiatives"
    ]
  },
  {
    phase: "Phase 3: Evolution",
    title: "Utility & Partnerships",
    timeline: "Q4 2023",
    completed: false,
    items: [
      "CEX listings",
      "Strategic partnerships",
      "Enhanced token utility",
      "Community governance implementation"
    ]
  },
  {
    phase: "Phase 4: Maturity",
    title: "Long-term Sustainability",
    timeline: "2024 and beyond",
    completed: false,
    items: [
      "Ecosystem expansion",
      "Cross-chain integration",
      "Community-driven development",
      "Continued project evolution"
    ]
  }
];

const ProjectRoadmap = () => {
  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Our strategic plan for PHOOEY's journey to the moon and beyond.">
          Project Roadmap
        </SectionHeading>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gradient-to-b from-space-blue via-space-accent to-transparent transform -translate-x-1/2"></div>
          
          <div className="space-y-12 relative">
            {phases.map((phase, index) => (
              <div key={index} className={`relative ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} md:w-1/2`}>
                <div className="glass-card p-6 md:p-8 hover:shadow-glow transition-all duration-300">
                  {/* Dot on timeline */}
                  <div className={`absolute top-6 ${index % 2 === 0 ? 'left-4 md:right-0 md:translate-x-1/2' : 'left-4 md:left-0 md:-translate-x-1/2'} w-4 h-4 rounded-full ${phase.completed ? 'bg-space-accent' : 'bg-space-blue'} z-10 transition-all duration-300`}></div>
                  
                  <span className="inline-block px-3 py-1 rounded-full bg-space-blue/20 text-space-blue text-xs font-semibold mb-2">
                    {phase.phase}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                  <p className="text-space-accent text-sm mb-4">{phase.timeline}</p>
                  
                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-space-accent mt-2 mr-2"></span>
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  {phase.completed && (
                    <div className="mt-4 bg-green-500/10 text-green-400 px-3 py-1 rounded-md inline-flex items-center text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectRoadmap;
