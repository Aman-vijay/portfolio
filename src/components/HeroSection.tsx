import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';
import { SOCIAL_URLS } from '../utils/urls';

const roles = [
  "Full Stack Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "Software Engineer"
];

const HeroSection: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [roleIndex, setRoleIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center">
      {/* Background gradient */}
      <div className={`absolute inset-0 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800' 
          : 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800'
      }`}></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {/* Left column - Text content */}
          <motion.div 
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <span className={`${darkMode ? 'text-cyan-400' : 'text-yellow-300'}`}>Aman Vijay</span>
            </motion.h1>
            
            <motion.div 
              className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 h-12 text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
            
            <motion.p 
              className={`text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0
                ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about crafting elegant solutions and building innovative digital experiences
            </motion.p>

            {/* Social links */}
            <motion.div 
              className="flex space-x-4 sm:space-x-6 justify-center md:justify-start mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { href: SOCIAL_URLS.GITHUB, Icon: Github },
                { href: SOCIAL_URLS.LINKEDIN, Icon: Linkedin },
                { href: SOCIAL_URLS.EMAIL, Icon: Mail }
              ].map(({ href, Icon }, index) => (
                <motion.a 
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 sm:p-3 rounded-full transition-colors
                    ${darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white/10 hover:bg-white/20'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={20} className={darkMode ? 'text-cyan-400' : 'text-white'} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Profile image (hidden on mobile) */}
          <motion.div 
            className="md:w-1/2 hidden md:flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className={`absolute inset-0 rounded-full blur-2xl opacity-70 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                    : 'bg-gradient-to-r from-pink-500 to-yellow-500'
                }`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 0.4, 0.7],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <img 
                src="./Aman.jpg"  
                alt="Profile" 
                className="relative w-72 h-72 object-cover rounded-full border-4 border-white/50 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;