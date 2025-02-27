import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { timeline } from '../data/timeline';

interface TimelineProps {
  darkMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ darkMode }) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <section
      className={`py-12 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
      }`}
    >
      {/* Neon Tech Background */}
      <div
        className="absolute inset-0 opacity-15 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle Neon Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent opacity-20 pointer-events-none" />

      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Circuit Line with Pulse Animation */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800 overflow-hidden">
          <div className="circuit-line" />
        </div>

        {/* Timeline Items */}
        <div className="space-y-16">
          {timeline.map((exp, index) => (
            <motion.div
              key={index}
              className={`flex items-center justify-between relative ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onMouseEnter={() => setHoveredItem(exp.title)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Content */}
              <div className="w-5/12">
                <motion.div
                  className={`p-6 rounded-xl border ${
                    darkMode
                      ? 'bg-black/70 border-cyan-400/30 hover:bg-black/80'
                      : 'bg-gray-900/70 border-cyan-400/30 hover:bg-gray-900/80'
                  } ${index % 2 === 0 ? 'mr-8' : 'ml-8'} shadow-lg`}
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0, 243, 255, 0.1)' }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-bold font-mono text-white">{exp.title}</h3>
                  <p className="font-semibold mt-1 text-cyan-400">{exp.company}</p>
                  <p className={`text-sm font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {exp.period}
                  </p>
                  <p className={`mt-3 leading-relaxed text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                    {exp.description}
                  </p>
                </motion.div>
              </div>

              {/* Icon Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
                <motion.div
                  className={`w-8 h-8 rounded-full border-4 shadow-md flex items-center justify-center ${
                    darkMode ? 'bg-black/70 border-cyan-400/50' : 'bg-gray-900/70 border-cyan-400/50'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  animate={
                    hoveredItem === exp.title
                      ? { scale: [1, 1.1, 1], boxShadow: '0 0 10px rgba(0, 243, 255, 0.8)' }
                      : { scale: 1, boxShadow: '0 0 5px rgba(0, 243, 255, 0.5)' }
                  }
                  transition={{ 
                    duration: 0.5, 
                    repeat: hoveredItem === exp.title ? Infinity : 0,
                    delay: index * 0.2 
                  }}
                >
                  {exp.type === 'work' ? (
                    <Briefcase size={20} className="text-cyan-400" />
                  ) : (
                    <GraduationCap size={20} className="text-cyan-400" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes circuit-pulse {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(100%); opacity: 0; }
          }
          .circuit-line {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent, #00f3ff 50%, transparent);
            animation: circuit-pulse 3s infinite linear;
          }
          @media (max-width: 768px) {
            .circuit-line { animation-duration: 5s; }
          }
        `}
      </style>
    </section>
  );
};

export default Timeline;