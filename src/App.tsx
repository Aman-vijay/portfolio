import { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import HeroSection from './components/HeroSection';
import AboutMeSection from './components/AboutMeSection';
import SkillsSection from './components/SkillsSection';
import { Timeline } from './components/Timeline';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'INNOVATEWISE SOLUTIONS',
      period: 'Jan 2024 – Sep 2024',
      description: 'Developed a MERN stack application for AdviceBytes, optimizing user experience and reducing load time by 40% through React lazy loading, memoization, and Context API for efficient state management.',
      type: 'work' as const,
    },
    {
      title: 'Front End Developer Intern',
      company: 'KS VENTURES',
      period: 'June 2022 – Aug 2022',
      description: 'Redesigned company website using React and Bootstrap, achieving 25% faster page rendering. Streamlined CI/CD workflows using Git, reducing merge conflicts by 20%.',
      type: 'work' as const,
    },
    {
      title: 'Bachelor of Technology in Computer Science',
      company: 'Tech University',
      period: 'Aug 2018 – May 2022',
      description: 'Graduated with honors, focusing on software engineering and cloud computing.',
      type: 'education' as const,
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? (darkMode ? 'bg-gray-800' : 'bg-white') : 'bg-transparent'
        } ${isScrolled ? 'shadow-md py-4' : 'py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.h1 
            className={`text-xl font-bold ${isScrolled ? (darkMode ? 'text-white' : 'text-gray-800') : 'text-white'}`}
            whileHover={{ scale: 1.05 }}
          >
            Aman Vijay
          </motion.h1>
          <nav>
            <ul className="flex space-x-8">
              {[
                { name: 'About', id: 'about' },
                { name: 'Skills', id: 'skills' },
                { name: 'Projects', id: 'projects' },
                { name: 'Contact', id: 'contact' }
              ].map((item) => (
                <motion.li 
                  key={item.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`font-medium transition-colors ${
                      isScrolled ? (darkMode ? 'text-white hover:text-blue-400' : 'text-gray-800 hover:text-blue-600') : 'text-white hover:text-blue-200'
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 bg-gray-200 rounded-full dark:bg-gray-700 transition-colors"
          >
            {darkMode ? '🌞' : '🌜'}
          </button>
        </div>
      </motion.header>

      {/* Sections */}
      <HeroSection darkMode={darkMode} />
      <AboutMeSection darkMode={darkMode} />
      <SkillsSection darkMode={darkMode} />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Professional Experience & Education
          </motion.h2>
          <Timeline experiences={experiences} darkMode={darkMode} />
        </div>
      </section>
      <ProjectsSection darkMode={darkMode} />
      <ContactSection darkMode={darkMode} />
    </div>
  );
}

export default App;