import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { timeline } from '../data/timeline';


interface TimelineProps {
  darkMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ darkMode }) => {
  const [expandedItems, setExpandedItems] = useState<{ [key: number]: boolean }>({});

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <section
      className={`py-12 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
      }`}
    >
      {/* Static Background Pattern */}
      <div
        className="absolute inset-0 opacity-15 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-800 hidden md:block"></div>
        <div className="absolute left-8 top-0 h-full w-1 bg-gray-800 md:hidden"></div>

        {/* Timeline Items */}
        <div className="space-y-8 md:space-y-16">
          {timeline.map((exp, index) => (
            <motion.div
              key={index}
              className={`flex items-start relative
                ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}
                flex-row timeline-item`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Content */}
              <div className="w-full md:w-5/12 pl-16 md:pl-0">
                <motion.div
                  className={`p-4 md:p-6 rounded-xl border ${
                    darkMode
                      ? 'bg-black/70 border-cyan-400/30 hover:bg-black/80'
                      : 'bg-gray-900/70 border-cyan-400/30 hover:bg-gray-900/80'
                  } ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} shadow-lg`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-lg md:text-xl font-bold font-mono text-white">{exp.title}</h3>
                  <p className="font-semibold mt-1 text-sm md:text-base text-cyan-400">{exp.company}</p>
                  <p className={`text-xs md:text-sm font-mono mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {exp.period}
                  </p>
                  <p className={`mt-2 md:mt-3 leading-relaxed text-xs md:text-sm font-mono ${darkMode ? 'text-gray-300' : 'text-gray-400'} ${expandedItems[index] ? '' : 'line-clamp-2 md:line-clamp-3'}`}>
                    {exp.description}
                  </p>
                  <button 
                    onClick={() => toggleExpanded(index)} 
                    className="text-cyan-400 mt-1 md:mt-2 text-xs md:text-sm"
                  >
                    {expandedItems[index] ? 'Read Less' : 'Read More'}
                  </button>
                </motion.div>
              </div>

              {/* Icon Marker */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 flex flex-col items-center z-10">
                <motion.div
                  className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-4 shadow-md flex items-center justify-center ${
                    darkMode ? 'bg-black/70 border-cyan-400/50' : 'bg-gray-900/70 border-cyan-400/50'
                  }`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  {exp.type === 'work' ? (
                    <Briefcase size={12} className="md:hidden text-cyan-400" />
                  ) : (
                    <GraduationCap size={12} className="md:hidden text-cyan-400" />
                  )}
                  {exp.type === 'work' ? (
                    <Briefcase size={20} className="hidden md:block text-cyan-400" />
                  ) : (
                    <GraduationCap size={20} className="hidden md:block text-cyan-400" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;