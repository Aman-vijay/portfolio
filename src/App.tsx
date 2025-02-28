import React, { useState, useEffect, Suspense, lazy } from 'react';

import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import Header from './components/Header';
import clickSound from './assets/click-sound.mp3'; 

// Lazy load components that are not immediately needed
const AboutMeSection = lazy(() => import('./components/AboutMeSection'));
const SkillsSection = lazy(() => import('./components/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/ProjectsSection'));
const Contact = lazy(() => import('./components/Contact'));
const Timeline = lazy(() => import('./components/Timeline'));

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
    <div className={`min-h-screen overflow-x-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Sections */}
      <HeroSection darkMode={darkMode} />
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <AboutMeSection darkMode={darkMode} />
        <SkillsSection darkMode={darkMode} />
        <ProjectsSection darkMode={darkMode} />
        <Timeline darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </Suspense>
      
      <Footer darkMode={darkMode} />
    </div>
  );
}

export default App;