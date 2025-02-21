import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe } from 'lucide-react';

interface SkillsSectionProps {
  darkMode: boolean;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ darkMode }) => {
  return (
    <section id="skills" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-6">
        <motion.h2 
          className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Technical Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Code2, title: "Frontend Development", skills: "React, TypeScript, Tailwind CSS, Next.js" },
            { icon: Database, title: "Backend Development", skills: "Node.js, Python, PostgreSQL, MongoDB" },
            { icon: Globe, title: "DevOps & Tools", skills: "Docker, AWS, Git, CI/CD" }
          ].map((skill, index) => (
            <motion.div 
              key={index}
              className={`p-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <skill.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{skill.title}</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{skill.skills}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 