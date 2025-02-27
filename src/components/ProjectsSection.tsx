import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects'; // Import the projects data
import { ProjectItem } from '../types/index'; // Ensure this is imported

interface ProjectsSectionProps {
  darkMode: boolean;
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>:;/%$#@!*()-+';

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix Rain Setup using Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    const drops: number[] = Array(columns).fill(0).map(() => Math.floor(Math.random() * canvas.height));

    const draw = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${darkMode ? 0.05 : 0.02})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00f3ff';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const isGlitch = Math.random() > 0.98;
        if (isGlitch) {
          ctx.fillStyle = '#00c3ff';
          ctx.shadowColor = '#00c3ff';
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = '#00f3ff';
          ctx.shadowBlur = 0;
        }

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      requestAnimationFrame(draw);
    };

    draw();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [darkMode]);

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // Glitch Text Component
  const GlitchText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(text);
    const isHovered = hoveredProject === text;

    useEffect(() => {
      if (!text) return;

      let iterations = 0;
      const maxIterations = 10;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, idx) => (idx < iterations / 3 ? char : matrixChars[Math.floor(Math.random() * matrixChars.length)]))
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

    useEffect(() => {
      if (!isHovered) return;

      const interval = setInterval(() => {
        if (Math.random() > 0.8) {
          setDisplayText(
            text
              .split('')
              .map((char) => (Math.random() > 0.9 ? matrixChars[Math.floor(Math.random() * matrixChars.length)] : char))
              .join('')
          );
          setTimeout(() => setDisplayText(text), 100);
        }
      }, 200);

      return () => clearInterval(interval);
    }, [isHovered, text]);

    return <span className="glitch-text font-mono text-white">{displayText}</span>;
  };

  return (
    <section
      id="projects"
      className={`py-20 relative overflow-hidden ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
      }`}
    >
      {/* Canvas Matrix Rain Background */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className={`text-4xl font-bold font-mono text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-200'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400">{'>'}</span> <span className="terminal-cursor">Featured_Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative rounded-xl border border-cyan-400/30 bg-black/50 hover:bg-black/70 shadow-lg hover:shadow-cyan-400/20 transition-all overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02, y: -5 }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Scanline Effect */}
              <div className="absolute inset-0 scanline" />

              {/* Noise Overlay */}
              <div className="absolute inset-0 noise-overlay opacity-10" />

              {/* Project Image with Cyberpunk Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  loading="lazy"
                  width={800}
                  height={450}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Tech Stack Tags with Glitch */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.techUsed.split(', ').slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm font-mono rounded-full bg-cyan-400/20 text-cyan-400 glitch-tag`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techUsed.split(', ').length > 3 && (
                    <span className="px-3 py-1 text-sm font-mono rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
                      +{project.techUsed.split(', ').length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold font-mono mb-3 text-white">
                  <GlitchText text={project.title} />
                </h3>
                <p className={`mb-6 line-clamp-3 font-mono text-sm ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                  {project.details}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300"
                      >
                        <Github size={18} />
                        Code
                      </motion.a>
                    )}
                    {project.live && (
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 text-sm font-mono text-cyan-400 hover:text-cyan-300"
                      >
                        <ExternalLink size={18} />
                        Demo
                      </motion.a>
                    )}
                  </div>

                  <motion.button
                    onClick={() => openModal(project)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-sm uppercase tracking-wide text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                  >
                    View Details
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} darkMode={darkMode} />

      {/* Global Styles */}
      <style>
        {`
          @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
          }
          @keyframes glitch {
            0%, 20%, 40%, 60%, 80% { transform: translate(0); opacity: 1; }
            5% { transform: translate(-2px, 1px); opacity: 0.8; }
            25% { transform: translate(2px, -1px); opacity: 0.9; }
            45% { transform: translate(-1px, 2px); opacity: 0.7; }
            65% { transform: translate(1px, -2px); opacity: 0.8; }
          }
          @keyframes glitch-flash {
            0%, 100% { color: #00f3ff; text-shadow: 0 0 5px rgba(0, 243, 255, 0.8); }
            50% { color: #00c3ff; text-shadow: 0 0 10px rgba(0, 195, 255, 1); }
          }
          @keyframes tag-pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          .scanline {
            background: linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 0%, transparent 10%, transparent 90%, rgba(0, 255, 255, 0.1) 100%);
            animation: scan 3s infinite linear;
            pointer-events: none;
          }
          .noise-overlay {
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            pointer-events: none;
          }
          .glitch-text {
            text-shadow: 0 0 5px rgba(0, 243, 255, 0.8);
            animation: glitch-flash 4s infinite;
          }
          .glitch-text:hover {
            animation: glitch 0.5s infinite steps(1), glitch-flash 1s infinite;
          }
          .glitch-tag {
            animation: tag-pulse 2s infinite;
            text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
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
          @media (max-width: 768px) {
            .glitch-text { animation-duration: 6s; }
            .scanline { animation-duration: 5s; }
          }
          @supports not (backdrop-filter: blur(4px)) {
            .glitch-text { animation: glitch-flash 4s infinite; }
          }
        `}
      </style>
    </section>
  );
};

export default ProjectsSection;