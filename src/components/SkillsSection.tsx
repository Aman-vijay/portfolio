import React, { useEffect, useRef, useState } from 'react';
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

// Matrix characters pool - includes binary, katakana, and tech symbols
const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>:;/%$#@!*()-+';

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
  const rainRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Advanced Matrix Rain Setup using Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full container size
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    // Initial resize and event listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix rain setup
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = [];

    // Initialize drops at random positions
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }

    // Matrix rain animation
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${darkMode ? 0.05 : 0.02})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set text style
      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px monospace`;

      // Draw each character
      for (let i = 0; i < drops.length; i++) {
        // Random character from matrix characters
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        
        // Determine if this should be a brighter character (glitch effect)
        const isGlitch = Math.random() > 0.98;
        if (isGlitch) {
          ctx.fillStyle = '#00c3ff';
          ctx.shadowColor = '#00c3ff';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowBlur = 0;
        }

        // Draw the character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Reset when it reaches bottom or random reset
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        
        // Move it down
        drops[i]++;
      }

      // Request next frame
      requestAnimationFrame(draw);
    };

    // Start animation
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [darkMode]);

  // Glitch Text Animation
  const GlitchText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const isHovered = hoveredSkill === text;
    
    // Effect for digital decryption animation on mount
    useEffect(() => {
      if (!text) return;
      
      let iterations = 0;
      const maxIterations = 10;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, idx) => {
              if (idx < iterations / 3) {
                return text[idx];
              }
              return matrixChars[Math.floor(Math.random() * matrixChars.length)];
            })
            .join('')
        );
        
        iterations += 1;
        
        if (iterations > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 50);
      
      return () => clearInterval(interval);
    }, [text]);
    
    // Effect for glitch animation on hover
    useEffect(() => {
      if (!isHovered) return;
      
      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          setDisplayText(
            text
              .split('')
              .map((char, idx) => {
                if (Math.random() > 0.9) {
                  return matrixChars[Math.floor(Math.random() * matrixChars.length)];
                }
                return char;
              })
              .join('')
          );
          
          // Reset after brief glitch
          setTimeout(() => {
            setDisplayText(text);
          }, 100);
        }
      }, 200);
      
      return () => clearInterval(interval);
    }, [isHovered, text]);
    
    return (
      <div
        className="glitch-text text-sm font-mono"
        onMouseEnter={() => setHoveredSkill(text)}
        onMouseLeave={() => setHoveredSkill(null)}
      >
        {displayText}
      </div>
    );
  };

  // Circuit Bar Component for skill proficiency
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
          {/* Circuit paths */}
          <div className="circuit-paths absolute inset-0 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div 
                key={i} 
                className="circuit-path" 
                style={{ 
                  left: `${20 * i + 10}%`, 
                  animationDelay: `${i * 0.2}s` 
                }} 
              />
            ))}
          </div>

          {/* Progress Indicator */}
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 circuit-bar relative z-10"
            initial={{ width: 0 }}
            whileInView={{ width: `${proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            animate={{ 
              boxShadow: isHovered 
                ? ['0 0 5px rgba(0, 243, 255, 0.8)', '0 0 15px rgba(0, 195, 255, 1)', '0 0 5px rgba(0, 243, 255, 0.8)'] 
                : '0 0 5px rgba(0, 243, 255, 0.8)' 
            }}
           
          >
            {/* Glitch nodes */}
            {[...Array(Math.ceil(proficiency / 20))].map((_, i) => (
              <div 
                key={i} 
                className="glitch-node" 
                style={{ left: `${i * 20}%` }} 
              />
            ))}
          </motion.div>
        </div>
        
        {/* Percentage indicator */}
        <div className={`text-xs font-mono mt-1 text-right ${darkMode ? 'text-cyan-400' : 'text-cyan-500'}`}>
          {proficiency}%
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      className={`py-20 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-100 via-indigo-50 to-gray-200'
      }`}
    >
      {/* Canvas Matrix Rain Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none opacity-30"
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
          <span className="terminal-cursor">Technical_Skills</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              className={`p-6 rounded-lg ${
                darkMode 
                  ? 'border border-cyan-400/30 bg-black/50 hover:bg-black/70 shadow-lg hover:shadow-cyan-400/20' 
                  : 'border border-cyan-400/30 bg-white/70 hover:bg-white/90 shadow-lg hover:shadow-cyan-400/10'
              } transition-all relative overflow-hidden backdrop-blur-sm`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 scanline" />
              
              {/* Noise Overlay */}
              <div className="absolute inset-0 noise-overlay opacity-10" />

              {/* Category Icon */}
              <motion.div
                className={`w-12 h-12 ${darkMode ? 'text-cyan-400' : 'text-cyan-600'} mb-6`}
                animate={{ 
                  opacity: [0.7, 1, 0.7],
                  textShadow: ['0 0 5px rgba(0, 243, 255, 0.5)', '0 0 10px rgba(0, 243, 255, 0.8)', '0 0 5px rgba(0, 243, 255, 0.5)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <category.icon size={48} strokeWidth={1.5} />
              </motion.div>

              {/* Category Title */}
              <h3 className={`text-xl font-semibold font-mono mb-4 ${darkMode ? 'text-white' : 'text-gray-800'} category-title`}>
                {category.title.split('').map((char, i) => (
                  <span 
                    key={i} 
                    className="category-char"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {char}
                  </span>
                ))}
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
                        <div 
                          className={`text-lg ${darkMode ? 'text-cyan-300' : 'text-cyan-600'} ${isHovered ? 'skill-icon-hover' : ''}`}
                        >
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

      {/* Global Styles */}
      <style>
        {`
          /* Terminal cursor animation */
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .terminal-cursor::after {
            content: '_';
            animation: blink 1s step-end infinite;
            color: #00f3ff;
          }
          
          /* Category title glitch effect */
          @keyframes category-glitch {
            0%, 90%, 100% { transform: translate(0); opacity: 1; }
            10% { transform: translate(-1px, 1px); opacity: 0.9; color: #00c3ff; }
            20% { transform: translate(1px, -1px); opacity: 0.8; }
          }
          .category-char {
            display: inline-block;
            animation: category-glitch 5s infinite;
          }
          
          /* Glitch text effect */
          .glitch-text {
            position: relative;
            ${darkMode 
              ? 'color: #00f3ff; text-shadow: 0 0 4px rgba(0, 243, 255, 0.7);' 
              : 'color: #0891b2; text-shadow: 0 0 2px rgba(0, 243, 255, 0.3);'
            }
            transition: all 0.3s ease;
          }
          
          /* Scan line animation */
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          .scanline {
            background: linear-gradient(to bottom, 
              ${darkMode 
                ? 'rgba(0, 255, 255, 0.1) 0%, transparent 10%, transparent 90%, rgba(0, 255, 255, 0.1) 100%' 
                : 'rgba(8, 145, 178, 0.05) 0%, transparent 10%, transparent 90%, rgba(8, 145, 178, 0.05) 100%'
              }
            );
            height: 100%;
            width: 100%;
            animation: scan 3s infinite linear;
            pointer-events: none;
          }
          
          /* Circuit bar and nodes */
          @keyframes circuit-pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
          .circuit-bar {
            position: relative;
          }
          .glitch-node {
            position: absolute;
            width: 4px;
            height: 4px;
            top: -1px;
            border-radius: 50%;
            background-color: white;
            box-shadow: 0 0 4px white, 0 0 6px #00f3ff;
            animation: circuit-pulse 2s infinite;
          }
          
          /* Circuit paths decoration */
          @keyframes circuit-flow {
            0% { opacity: 0; transform: translateX(-100%); }
            50% { opacity: 1; }
            100% { opacity: 0; transform: translateX(100%); }
          }
          .circuit-path {
            position: absolute;
            height: 1px;
            width: 20%;
            top: 50%;
            background: linear-gradient(to right, transparent, #00f3ff, transparent);
            animation: circuit-flow 2s infinite;
          }
          
          /* Noise overlay for texture */
          .noise-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            pointer-events: none;
          }
          
          /* Skill icon hover animation */
          @keyframes icon-pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); filter: brightness(1.5); }
          }
          .skill-icon-hover {
            animation: icon-pulse 0.6s infinite;
            text-shadow: 0 0 10px ${darkMode ? 'rgba(0, 243, 255, 1)' : 'rgba(8, 145, 178, 0.7)'};
          }
          
          /* Media query optimizations */
          @media (max-width: 768px) {
            .category-char { animation-duration: 8s; }
            .circuit-path { width: 10%; animation-duration: 3s; }
            .scanline { animation-duration: 5s; }
            .glitch-node { width: 3px; height: 3px; }
          }
          
          /* Fallback styles for browsers without support */
          @supports not (backdrop-filter: blur(4px)) {
            .glitch-text { animation: category-glitch 5s infinite; }
            .category-char { animation: none; }
          }
        `}
      </style>
    </section>
  );
};

export default SkillsSection;