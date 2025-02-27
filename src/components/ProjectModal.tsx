import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン{}[]<>:;/%$#@!*()-+';

export default function ProjectModal({ project, isOpen, onClose, darkMode }: ProjectModalProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Glitch Text Component (Subtle, only for title)
  const GlitchText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = React.useState(text);

    React.useEffect(() => {
      if (!text || !isOpen) return;

      let iterations = 0;
      const maxIterations = 8;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, idx) => (idx < iterations / 2 ? char : matrixChars[Math.floor(Math.random() * matrixChars.length)]))
            .join('')
        );
        iterations += 1;
        if (iterations > maxIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 50);

      return () => clearInterval(interval);
    }, [text, isOpen]);

    return <span className="glitch-text font-mono text-white">{displayText}</span>;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative border border-cyan-400/30 bg-black/70 shadow-lg`}
          >
            {/* Close Button - Updated styling */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors z-50 border border-cyan-400/50 shadow-lg"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="relative z-10">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={project?.image}
                  alt={project?.title}
                  className="w-full h-full object-cover rounded-t-xl border-b border-cyan-400/30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold font-mono mb-2 text-white">
                  <GlitchText text={project?.title || ''} />
                </h3>
                <p className={`text-sm font-mono mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                  {project?.details}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project?.techUsed.split(', ').map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-mono glitch-tag"
                      animate={
                        hoveredTech === tech
                          ? { scale: [1, 1.05, 1], textShadow: '0 0 10px rgba(0, 243, 255, 1)' }
                          : { scale: 1, textShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }
                      }
                      transition={{ duration: 0.5, repeat: hoveredTech === tech ? Infinity : 0 }}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>

                {/* Project Details */}
                {project?.details && (
                  <div className="space-y-6">
                    {project.problem && (
                      <div>
                        <h4 className="text-lg font-semibold font-mono text-white mb-2">
                          <span className="text-cyan-400">{'>'}</span> Problem
                        </h4>
                        <p className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                          {project.problem}
                        </p>
                      </div>
                    )}

                    {project.solution && (
                      <div>
                        <h4 className="text-lg font-semibold font-mono text-white mb-2">
                          <span className="text-cyan-400">{'>'}</span> Solution
                        </h4>
                        <p className={`text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                          {project.solution}
                        </p>
                      </div>
                    )}

                    {project.features && (
                      <div>
                        <h4 className="text-lg font-semibold font-mono text-white mb-2">
                          <span className="text-cyan-400">{'>'}</span> Key Features
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm font-mono">
                          {project.features.map((feature, index) => (
                            <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-6 pt-6 border-t border-cyan-400/30">
                  {project?.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-sm uppercase tracking-wide text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      View Code
                    </motion.a>
                  )}
                  {project?.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-sm font-mono text-sm uppercase tracking-wide text-cyan-400 border border-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Global Styles (Add this in a CSS file or within the component)
const styles = `
  @keyframes scan {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100%); }
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
  .glitch-text {
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.8);
    animation: glitch-flash 4s infinite;
  }
  .glitch-tag {
    animation: tag-pulse 2s infinite;
    text-shadow: 0 0 5px rgba(0, 243, 255, 0.5);
  }
  @media (max-width: 768px) {
    .scanline { animation-duration: 5s; }
    .glitch-text { animation-duration: 6s; }
  }
  @supports not (backdrop-filter: blur(4px)) {
    .glitch-text { animation: glitch-flash 4s infinite; }
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}