import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { projects } from '../data/projects'; // Import the projects data
import { ProjectItem } from '../types/index'; // Ensure this is imported

interface Project {
  title: string;
  description: string;
  image: string;
  techUsed: string;
  problem: string;
  solution: string;
  features: string[];
  github?: string;
  demo?: string;
}

interface ProjectsSectionProps {
  darkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null); // Use ProjectItem here

  const openModal = (project: ProjectItem) => { // Use ProjectItem here
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2 
            className={`text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured Projects
          </motion.h2>
          <motion.p
            className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Explore some of my recent work showcasing my expertise in full-stack development,
            microservices architecture, and cloud solutions.
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={projectVariants}
              className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl
                ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
              whileHover={{ y: -5 }}
            >
              {/* Project Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />
                
                {/* Tech Stack Tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {project.techUsed.split(', ').slice(0, 3).map((tech, i) => (
                    <span 
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full backdrop-blur-sm
                        ${darkMode 
                          ? 'bg-white/10 text-white' 
                          : 'bg-black/10 text-white'}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techUsed.split(', ').length > 3 && (
                    <span className="px-3 py-1 text-sm rounded-full text-white bg-gradient-to-r from-cyan-500 to-blue-600">
                      +{project.techUsed.split(', ').length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`mb-6 line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
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
                        className={`flex items-center gap-2 text-sm font-medium
                          ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
                        className={`flex items-center gap-2 text-sm font-medium
                          ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
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
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                      ${darkMode 
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    View Details
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={selectedProject}
        darkMode={darkMode}
      />
    </section>
  );
};

export default ProjectsSection;