import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import SkillsSection from './components/SkillsSection';
import Timeline from './components/Timeline';
import ProjectsSection from './components/ProjectsSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import clickSound from './assets/click-sound.mp3'; 



function App() {

  const [darkMode, setDarkMode] = useState(true); 
  const audio = new Audio(clickSound); 

  useEffect(() => {
    // Set dark mode class on initial load
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    audio.play(); 
  };

  

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Sections */}
      <HeroSection darkMode={darkMode} />
      <AboutMeSection darkMode={darkMode} />
      <SkillsSection darkMode={darkMode} />
      <section className={`py-20 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-white via-gray-50 to-white'
      }`}>
        <div className="container mx-auto px-6">
          <motion.h2 
            className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional Experience & Education
          </motion.h2>
          <Timeline  darkMode={darkMode} />
        </div>
      </section>
      <ProjectsSection darkMode={darkMode} />
      <Contact darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;