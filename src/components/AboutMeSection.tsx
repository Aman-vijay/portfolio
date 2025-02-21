import React from 'react';
import { motion } from 'framer-motion';

interface AboutMeSectionProps {
  darkMode: boolean;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ darkMode }) => {
  return (
    <section className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Area */}
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img 
            src="../public/about-me.jpg" 
            alt="About Me" 
            className={`w-72 h-72 object-cover rounded-full border-4 ${darkMode ? 'border-gray-700' : 'border-gray-300'} shadow-lg`}
          />
        </motion.div>

        {/* Description Area */}
        <motion.div 
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>About Me</h2>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Full Stack Developer  specializing in scalable web application development using the MERN stack, Docker, and cloud platforms (AWS, GCP). Proven ability to enhance system performance by 30-40% via microservices, CI/CD, and Agile. Eager to contribute to challenging projects.
          </p>
          <div className="flex space-x-8">
            <div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>1+</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years of Experience</p>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>10+</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects Completed</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection; 