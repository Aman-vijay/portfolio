import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects';
import { ProjectItem } from '../types/index';

interface ProjectsSectionProps {
  darkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const openModal = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const projectsToShow = showAll ? projects : projects.slice(0, 4);
  const hasMoreProjects = projects.length > 4;

  const GlitchText = ({ text }: { text: string }) => {
    return <span className="font-mono text-white">{text}</span>;
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
      {/* Static background pattern instead of canvas */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          className={`text-4xl font-bold font-mono text-center mb-16 ${darkMode ? 'text-white' : 'text-gray-200'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-cyan-400">{'>'}</span> <span>Featured_Projects</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsToShow.map((project, index) => (
            <motion.div
              key={index}
              className={`group relative rounded-xl border border-cyan-400/30 bg-black/50 hover:bg-black/70 shadow-lg hover:shadow-cyan-400/20 transition-all overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              onMouseEnter={() => setHoveredProject(project.title)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  loading="lazy"
                  width={800}
                  height={450}
                  style={{ filter: 'blur(10px)', transition: 'filter 0.3s ease-out' }}
                  onLoad={(e) => e.currentTarget.style.filter = 'blur(0)'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Tech Stack Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.techUsed.split(', ').slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm font-mono rounded-full bg-cyan-400/20 text-cyan-400`}
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
                    className="flex items-center gap-2 px-6 py-3 rounded-lg font-mono text-sm uppercase tracking-wide text-cyan-400 border-2 border-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/25 backdrop-blur-sm relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                    View Details
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More/View Less Button */}
        {hasMoreProjects && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <motion.button
              onClick={toggleShowAll}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-8 py-3 rounded-lg font-mono text-sm uppercase tracking-wide text-cyan-400 border border-cyan-400/50 bg-black/30 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
            >
              {showAll ? (
                <>
                  <span>View Less</span>
                  <ChevronUp size={20} />
                </>
              ) : (
                <>
                  <span>View More </span>
                  <ChevronDown size={20} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} darkMode={darkMode} />
    </section>
  );
};

export default ProjectsSection;