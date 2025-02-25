import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

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
    <section 
      id="hero" 
      className={`relative min-h-screen flex items-center justify-center overflow-hidden
        ${darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-slate-900 to-black' 
          : 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800'}`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className={`absolute inset-0 opacity-30
            ${darkMode ? 'bg-grid-white/5' : 'bg-grid-white/10'}`}
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
        <div className={`absolute inset-0 
          ${darkMode 
            ? 'bg-gradient-to-br from-gray-900/80 via-slate-900/80 to-black/80' 
            : 'bg-gradient-to-br from-blue-600/80 via-indigo-700/80 to-purple-800/80'} 
          backdrop-blur-sm`}
        />
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <motion.div 
            className="md:w-1/2 text-center md:text-left space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <span className={`text-2xl font-light block mt-20
                ${darkMode ? 'text-blue-400' : 'text-blue-300'}`}>
                👋 Hi there, I'm
              </span>
              <h1 className={`text-6xl font-bold bg-clip-text text-transparent
                ${darkMode 
                  ? 'bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400' 
                  : 'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500'}
                animate-gradient`}>
                Aman Vijay
              </h1>
            </motion.div>

            {/* Animated role text */}
            <div className="h-24 flex items-center justify-center md:justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className={`text-3xl font-light
                    ${darkMode ? 'text-cyan-300' : 'text-blue-200'}`}
                >
                  {roles[roleIndex]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description */}
            <motion.p 
              className={`text-xl max-w-xl
                ${darkMode ? 'text-gray-300' : 'text-gray-200'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Passionate about crafting elegant solutions and building innovative digital experiences
            </motion.p>

            {/* Social links */}
            <motion.div 
              className="flex space-x-6 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {[
                { href: "https://github.com/Aman-vijay", Icon: Github },
                { href: "https://linkedin.com/in/amanvijay04", Icon: Linkedin },
                { href: "mailto:shivamvj04@gmail.com", Icon: Mail }
              ].map(({ href, Icon }, index) => (
                <motion.a 
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full transition-colors
                    ${darkMode 
                      ? 'bg-gray-800 hover:bg-gray-700' 
                      : 'bg-white/10 hover:bg-white/20'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={24} className={darkMode ? 'text-cyan-400' : 'text-white'} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column - Profile image */}
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <motion.div
                className={`absolute -inset-4 rounded-full blur-lg opacity-75
                  ${darkMode 
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'}`}
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