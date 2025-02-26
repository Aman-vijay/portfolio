import React from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon } from 'lucide-react';
import { RESUME_URL } from '../utils/urls';

interface AboutMeSectionProps {
  darkMode: boolean;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ darkMode }) => {
  return (
    <section
     id="about"
     className={`py-20 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
    }`}>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Image Area */}
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <motion.div
              className={`absolute -inset-4  blur-lg opacity-75 ${
                darkMode 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-600'
              }`}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <img 
              src="./Aman.jpg" 
              alt="About Me" 
              className={`relative w-72 h-72 object-cover shadow-2xl`}
            />
          </div>
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
            Full Stack Developer specializing in scalable web application development using the MERN stack, Docker, and cloud platforms (AWS, GCP). Proven ability to enhance system performance by 30-40% via microservices, CI/CD, and Agile. Eager to contribute to challenging projects.
          </p>
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>1+</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years of Experience</p>
            </div>
            <div>
              <h3 className={`text-2xl font-bold ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>10+</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects Completed</p>
            </div>
          </div>
          
          {/* Resume button - moved outside the stats div */}
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full mt-6 font-medium transition-colors
              ${darkMode 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white' 
                : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon size={20} />
            <span>Resume</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection;