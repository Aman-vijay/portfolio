import React from 'react';
import { motion } from 'framer-motion';
import { GithubIcon, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  darkMode: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ darkMode }) => {
  return (
    <section id="projects" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <motion.h2 
          className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "FOODFLOW MICROSERVICES",
              description: "Architected 5+ containerized microservices using Docker, improving deployment efficiency by 50%. Configured NGINX reverse proxy to manage 100 concurrent requests, achieving 99.9% uptime on AWS EC2.",
              image: "path/to/foodflow-image.jpg",
            },
            {
              title: "TOURISM IN RAJASTHAN",
              description: "Developed an online platform with HTML, CSS, and JavaScript for tourists visiting Rajasthan to locate popular tourist spots. Created a database in SQLite to reduce loading static file reducing 10% compile time provided by Django to store the locations along with the maps and general information.",
              image: "path/to/tourism-image.jpg",
            }
          ].map((project, index) => (
            <motion.div 
              key={index}
              className={`rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{project.description}</p>
                <div className="flex items-center space-x-4">
                  <a href="#" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'}`}>
                    <GithubIcon className="w-5 h-5 mr-1" /> Code
                  </a>
                  <a href="#" className={`flex items-center ${darkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'}`}>
                    <ExternalLink className="w-5 h-5 mr-1" /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 