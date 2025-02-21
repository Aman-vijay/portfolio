import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';

// Define the shape of an experience object
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
}

// Define the props for the Timeline component if needed

interface TimelineProps {
  experiences: Experience[];
  darkMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ experiences, darkMode }: TimelineProps) => {
  return (
    <div className="relative max-w-4xl mx-auto py-12">
      {/* Vertical Line */}
      <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${darkMode ? 'bg-gray-600' : 'bg-blue-600/50'}`}></div>

      {/* Timeline Items */}
      <div className="space-y-16">
        {experiences.map((exp, index) => (
          <motion.div 
            key={index} 
            className={`flex items-center justify-between relative ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
          >
            {/* Content */}
            <div className="w-5/12">
              <motion.div 
                className={`p-6 rounded-xl shadow-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} ${
                  index % 2 === 0 ? 'mr-8' : 'ml-8'
                }`}
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{exp.title}</h3>
                <p className={`font-semibold mt-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{exp.company}</p>
                <p className={`text-sm font-medium mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{exp.period}</p>
                <p className={`mt-3 leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{exp.description}</p>
              </motion.div>
            </div>

            {/* Icon Marker */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full border-4 shadow-md z-10 flex items-center justify-center ${darkMode ? 'bg-gray-700 border-gray-800' : 'bg-blue-600 border-white'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
              >
                {exp.type === 'work' ? <Briefcase size={20} color={darkMode ? 'white' : 'white'} /> : <GraduationCap size={20} color={darkMode ? 'white' : 'white'} />}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;