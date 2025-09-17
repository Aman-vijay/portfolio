import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Server, Cloud, Wrench } from 'lucide-react';
import {
  SiReact, SiTypescript, SiTailwindcss, SiNextdotjs,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb,
  SiDocker, SiAmazon, SiGit, SiGithubactions, SiJavascript,
  SiExpress, SiRedis, SiKubernetes, SiLinux, SiNginx
} from 'react-icons/si';

interface SkillsSectionProps {
  darkMode: boolean;
}

const skillsData = [
  { 
    icon: Code2, 
    title: "Frontend Development", 
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React", icon: SiReact, proficiency: 90, color: "#61DAFB" },
      { name: "TypeScript", icon: SiTypescript, proficiency: 85, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, proficiency: 92, color: "#F7DF1E" },
      { name: "Tailwind CSS", icon: SiTailwindcss, proficiency: 88, color: "#06B6D4" },
      { name: "Next.js", icon: SiNextdotjs, proficiency: 82, color: "#000000" }
    ]
  },
  { 
    icon: Server, 
    title: "Backend Development", 
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, proficiency: 85, color: "#339933" },
      { name: "Express.js", icon: SiExpress, proficiency: 82, color: "#000000" },
      { name: "Python", icon: SiPython, proficiency: 75, color: "#3776AB" },
      { name: "Redis", icon: SiRedis, proficiency: 70, color: "#DC382D" }
    ]
  },
  { 
    icon: Database, 
    title: "Database & Storage", 
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, proficiency: 78, color: "#336791" },
      { name: "MongoDB", icon: SiMongodb, proficiency: 75, color: "#47A248" },
      { name: "Redis", icon: SiRedis, proficiency: 70, color: "#DC382D" }
    ]
  },
  { 
    icon: Cloud, 
    title: "Cloud & Infrastructure", 
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", icon: SiAmazon, proficiency: 72, color: "#FF9900" },
      { name: "Docker", icon: SiDocker, proficiency: 75, color: "#2496ED" },
      { name: "Kubernetes", icon: SiKubernetes, proficiency: 60, color: "#326CE5" },
      { name: "NGINX", icon: SiNginx, proficiency: 68, color: "#009639" }
    ]
  },
  { 
    icon: Wrench, 
    title: "DevOps & Tools", 
    color: "from-yellow-500 to-orange-500",
    skills: [
      { name: "Git", icon: SiGit, proficiency: 88, color: "#F05032" },
      { name: "CI/CD", icon: SiGithubactions, proficiency: 70, color: "#2088FF" },
      { name: "Linux", icon: SiLinux, proficiency: 75, color: "#FCC624" }
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
    isHovered,
    color
  }: { 
    proficiency: number;
    isHovered: boolean;
    color: string;
  }) => {
    return (
      <div className="mt-3 relative">
        <div className={`h-3 rounded-full ${darkMode ? 'bg-gray-800/50' : 'bg-gray-700/50'} border border-gray-600/30 overflow-hidden backdrop-blur-sm`}>
          <motion.div
            className="h-full relative z-10 rounded-full"
            style={{
              background: `linear-gradient(90deg, ${color}40, ${color})`
            }}
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
          />
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
                animation: 'shimmer 2s infinite'
              }}
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
        
        <div className={`text-xs font-mono mt-2 text-right transition-colors ${
          isHovered 
            ? 'text-cyan-300' 
            : darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
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
              className={`p-6 rounded-xl relative overflow-hidden ${
                darkMode 
                  ? 'border border-cyan-400/20 bg-black/40 hover:bg-black/60 shadow-xl hover:shadow-cyan-400/10' 
                  : 'border border-cyan-400/20 bg-white/60 hover:bg-white/80 shadow-xl hover:shadow-cyan-400/10'
              } transition-all duration-500 backdrop-blur-sm group`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Category Icon */}
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                darkMode ? 'bg-cyan-400/10 text-cyan-400' : 'bg-cyan-600/10 text-cyan-600'
              } group-hover:scale-110 transition-transform duration-300`}>
                <category.icon size={32} strokeWidth={1.5} />
              </div>

              {/* Category Title */}
              <h3 className={`text-xl font-bold font-mono mb-6 ${darkMode ? 'text-white' : 'text-gray-800'} group-hover:text-cyan-400 transition-colors duration-300`}>
                {category.title}
              </h3>

              {/* Skills */}
              <div className="space-y-5">
                {category.skills.map((skill, i) => {
                  const isHovered = hoveredSkill === skill.name;
                  return (
                    <div 
                      key={i} 
                      className="skill-item p-3 rounded-lg hover:bg-white/5 transition-all duration-300"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="flex items-center space-x-3">
                        {/* Skill Icon */}
                        <div 
                          className={`text-2xl transition-all duration-300 ${
                            isHovered ? 'scale-125' : 'scale-100'
                          }`}
                          style={{ color: isHovered ? skill.color : (darkMode ? '#67e8f9' : '#0891b2') }}
                        >
                          <skill.icon size={24} />
                        </div>
                        
                        {/* Skill Name */}
                        <div className={`font-mono font-medium transition-colors duration-300 ${
                          isHovered 
                            ? 'text-cyan-300' 
                            : darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {skill.name}
                        </div>
                      </div>
                      
                      {/* Proficiency Bar */}
                      <CircuitBar 
                        proficiency={skill.proficiency} 
                        isHovered={isHovered}
                        color={skill.color}
                      />
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
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
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