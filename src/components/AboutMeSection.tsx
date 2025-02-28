import React from 'react';
import { motion } from 'framer-motion';
import { DownloadIcon } from 'lucide-react';
import { RESUME_URL } from '../utils/urls';

interface AboutMeSectionProps {
  darkMode: boolean;
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ darkMode }) => {
  const textVariants = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1, // Stagger each character
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  };

  // Split "About Me" into individual characters, excluding the "/"
  const titleText = "About_Me".split('');
  return (
    <section
      id="about"
      className={`py-20 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-800'
          : 'bg-gradient-to-br from-gray-800 via-indigo-800 to-gray-900'
      }`}
    >
      {/* Simplified Background */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%239C92AC' stroke-width='1' stroke-opacity='0.4'%3E%3Cpath d='M10 10h40M10 30h20M40 30h10M10 50h40M30 10v40M10 30h20M40 30h10'/%3E%3Ccircle cx='10' cy='10' r='1' fill='%239C92AC'/%3E%3Ccircle cx='50' cy='10' r='1' fill='%239C92AC'/%3E%3Ccircle cx='30' cy='30' r='1' fill='%239C92AC'/%3E%3Ccircle cx='50' cy='50' r='1' fill='%239C92AC'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        {/* Image Area */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            {/* Hexagonal Frame */}
            <svg
              className="absolute -inset-2 text-cyan-400 opacity-50"
              width="300"
              height="300"
              viewBox="0 0 100 100"
            >
              <polygon
                points="50,10 90,30 90,70 50,90 10,70 10,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
            <img
              src="./Av.png"
              alt="About Me"
              className="relative w-80 h-96 object-cover"
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
          <h2
            className={`text-3xl font-bold font-mono ${
              darkMode ? 'text-white' : 'text-gray-200'
            }`}
          >
           <span className="text-cyan-400 mr-1">/</span>
            {/* Animated "About Me" characters */}
            {titleText.map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={textVariants}
                className="inline-block"
                style={{
                  textShadow: darkMode
                    ? '0 0 5px rgba(0, 243, 255, 0.5)'
                    : '0 0 3px rgba(0, 243, 255, 0.3)',
                }}
              >
                {char}
              </motion.span>
            ))}
          </h2>
          <p
            className={`text-lg font-mono ${
              darkMode ? 'text-gray-300' : 'text-gray-400'
            }`}
          >
            Full Stack Developer specializing in scalable web application development using the MERN stack, Docker, and cloud platforms (AWS, GCP). Proven ability to enhance system performance by 30-40% via microservices, CI/CD, and Agile. Eager to contribute to challenging projects.
          </p>
          <div className="flex flex-wrap gap-8">
            <div className="relative">
              <h3
                className={`text-2xl font-bold font-mono ${
                  darkMode ? 'text-cyan-400' : 'text-cyan-300'
                }`}
              >
                1+
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Years of Experience
              </p>
              <div className="absolute -inset-2 bg-cyan-400/20 blur-md rounded" />
            </div>
            <div className="relative">
              <h3
                className={`text-2xl font-bold font-mono ${
                  darkMode ? 'text-cyan-400' : 'text-cyan-300'
                }`}
              >
                10+
              </h3>
              <p
                className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Projects Completed
              </p>
              <div className="absolute -inset-2 bg-cyan-400/20 blur-md rounded" />
            </div>
          </div>

          {/* Resume Button */}
          <motion.a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-sm font-mono text-sm uppercase tracking-wide transition-colors border border-cyan-400 ${
              darkMode
                ? 'bg-black text-cyan-400 hover:bg-cyan-400 hover:text-black'
                : 'bg-indigo-900 text-cyan-300 hover:bg-cyan-300 hover:text-black'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <DownloadIcon size={20} />
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMeSection;