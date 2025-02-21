import React from 'react';
import { motion } from 'framer-motion';

interface ContactSectionProps {
  darkMode: boolean;
}

const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  return (
    <section id="contact" className={`py-20 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        <motion.h2 
          className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.div 
          className="max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Name"
              className={`p-2 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            <input
              type="email"
              placeholder="Email"
              className={`p-2 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            />
            <textarea
              placeholder="Message"
              rows={4}
              className={`p-2 border ${darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600`}
            ></textarea>
            <motion.button 
              className={`py-2 px-6 rounded-lg transition-colors ${darkMode ? 'bg-blue-700 text-white hover:bg-blue-800' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Send Message
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection; 