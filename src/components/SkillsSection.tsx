import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Server } from 'lucide-react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb,
  SiDocker, SiAmazon, SiGit, SiGithubactions
} from 'react-icons/si';

interface SkillsSectionProps {
  darkMode: boolean;
}

const skillsData = [
  { 
    icon: Code2, 
    title: "Frontend Development", 
    skills: [
      { name: "React", icon: SiReact, proficiency: 90 },
      { name: "TypeScript", icon: SiTypescript, proficiency: 85 },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: 88 },
      { name: "Next.js", icon: SiNextdotjs, proficiency: 82 }
    ]
  },
  { 
    icon: Database, 
    title: "Backend Development", 
    skills: [
      { name: "Node.js", icon: SiNodedotjs, proficiency: 78 },
      { name: "Python", icon: SiPython, proficiency: 75 },
      { name: "PostgreSQL", icon: SiPostgresql, proficiency: 72 },
      { name: "MongoDB", icon: SiMongodb, proficiency: 70 }
    ]
  },
  { 
    icon: Server, 
    title: "DevOps & Tools", 
    skills: [
      { name: "Docker", icon: SiDocker, proficiency: 65 },
      { name: "AWS", icon: SiAmazon, proficiency: 68 },
      { name: "Git", icon: SiGit, proficiency: 85 },
      { name: "CI/CD", icon: SiGithubactions, proficiency: 62 }
    ]
  },
];

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Simplified GlitchText component - reduced animations
  const GlitchText = ({ text }: { text: string }) => {
    return (
      <div
        className="text-sm font-mono"
        onMouseEnter={() => setHoveredSkill(text)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {text}
      </div>
    );
  };

  // Simplified CircuitBar component
  const CircuitBar = ({ 
    proficiency, 
    isHovered 
  }: { 
    proficiency: number;
    isHovered: boolean;
  }) => {
    return (
      <div className="mt-2 relative">
        <div className={`h-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-700'} border border-cyan-400/50 overflow-hidden`}>
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 relative z-10"
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        
        <div className={`text-xs font-mono mt-1 text-right ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`}>
          {proficiency}%
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      className={`py-20 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-200'
      }`}
    >
      {/* Simplified background - static pattern instead of canvas */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className={`text-4xl font-bold font-mono text-center mb-16 ${
            darkMode ? 'text-white' : 'text-gray-800'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={`${darkMode ? 'text-cyan-400' : 'text-cyan-600'}`}>{'>'}</span>{' '}
          <span>Technical_Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${
                darkMode 
                  ? 'border border-cyan-400/30 bg-black/50 hover:bg-black/70 shadow-lg' 
                  : 'border border-cyan-400/30 bg-white/70 hover:bg-white/90 shadow-lg'
              } transition-all relative overflow-hidden backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Category Icon */}
              <div className={`w-12 h-12 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-6`}>
                <category.icon size={48} strokeWidth={1.5} />
              </div>

              {/* Category Title */}
              <h3 className={`text-xl font-semibold font-mono mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {category.title}
              </h3>

              {/* Skills */}
              <div className="space-y-4 mt-6">
                {category.skills.map((skill, i) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div 
                      key={i} 
                      className="skill-item"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center space-x-2">
                        {/* Skill Icon */}
                        <div className={`text-lg ${darkMode ? 'text-cyan-300' : 'text-cyan-600'}`}>
                          <skill.icon />
                        </div>
                        
                        {/* Skill Name */}
                        <GlitchText text={skill.name} />
                      </div>
                      
                      {/* Proficiency Bar */}
                      <CircuitBar proficiency={skill.proficiency} isHovered={isHovered} />
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Simplified styles */}
      <style>
        {`
          .terminal-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
            color: #00f3ff;
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;