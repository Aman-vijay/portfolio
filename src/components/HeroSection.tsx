import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import { SOCIAL_URLS } from '../utils/urls';

const roles = [
  "Full Stack Developer",
  "DevOps Engineer",
  "Cloud Architect",
  "Software Engineer",
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero">
      {/* Simplified Background */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
            : 'bg-gradient-to-br from-blue-900 via-indigo-800 to-gray-900'
        }`}
      >
        {/* Static Circuit Board Pattern */}
        <div
          className="absolute inset-0 opacity-10 bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%239C92AC' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M10 10h40M10 30h20M40 30h10M10 50h40M30 10v40M10 30h20M40 30h10'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%239C92AC'/%3E%3Ccircle cx='50' cy='10' r='1' fill='%239C92AC'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%239C92AC'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%239C92AC'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl text-center">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-white font-mono"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hey, I'm <span className={`${darkMode ? 'text-cyan-400' : 'text-cyan-300'}`}>Aman Vijay</span>
          </motion.h1>

          <motion.div
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 h-16 text-white font-mono tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
           
            <AnimatePresence mode="wait">
              <div className="relative flex items-center justify-center">
                <span className="absolute left-4 md:left-32 text-cyan-400">{'>_'}</span>
                <motion.div
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="pl-6"
                >
                  {roles[roleIndex]}
                </motion.div>
              </div>
            </AnimatePresence>
          </motion.div>

          <motion.p
            className={`text-lg sm:text-xl max-w-2xl mx-auto mb-10 ${
              darkMode ? 'text-gray-300' : 'text-gray-200'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Crafting scalable systems and pixel-perfect interfaces with code that runs like clockwork.
          </motion.p>

          {/* Social Links */}
          <motion.div
            className="flex items-center justify-center space-x-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { href: SOCIAL_URLS.GITHUB, Icon: Github, label: 'GitHub' },
              { href: SOCIAL_URLS.LINKEDIN, Icon: Linkedin, label: 'LinkedIn' },
              { href: SOCIAL_URLS.EMAIL, Icon: Mail, label: 'Email' },
            ].map(({ href, Icon, label }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full transition-colors group relative ${
                  darkMode
                    ? 'bg-gray-800/50 hover:bg-gray-700/50'
                    : 'bg-indigo-900/30 hover:bg-indigo-800/30'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={24} className={`${darkMode ? 'text-cyan-400' : 'text-cyan-300'}`} />
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            <ChevronDown size={24} className={`${darkMode ? 'text-cyan-400' : 'text-cyan-300'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;