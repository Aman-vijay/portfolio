import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export default function ProjectModal({ project, isOpen, onClose, darkMode }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4`}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-video w-full">
              <img
                src={project?.image}
                alt={project?.title}
                className="w-full h-full object-cover rounded-t-xl"
              />
            </div>

            <div className="p-6">
              <h3 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {project?.title}
              </h3>
              <p className={`text-gray-600 mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {project?.details}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project?.techUsed.split(', ').map((tech, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {project?.details && (
                <div className="space-y-6">
                  {project.problem && (
                    <div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Problem</h4>
                      <p className={`text-gray-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.problem}</p>
                    </div>
                  )}

                  {project.solution && (
                    <div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Solution</h4>
                      <p className={`text-gray-600 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{project.solution}</p>
                    </div>
                  )}

                  {project.features && (
                    <div>
                      <h4 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Key Features</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {project.features.map((feature, index) => (
                          <li key={index} className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-4 mt-6 pt-6 border-t">
                <a
                  href={project?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
                >
                  <Github className="w-5 h-5" />
                  View Code
                </a>
                <a
                  href={project?.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-indigo-600 text-white hover:bg-indigo-500'}`}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}