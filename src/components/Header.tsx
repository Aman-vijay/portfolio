import { useState, useEffect } from 'react';
import { useScroll, motion } from 'framer-motion';
import { User, Code, Mail, Home, Briefcase, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ darkMode, toggleTheme }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero', icon: <Home size={16} /> },
    { name: 'About', id: 'about', icon: <User size={16} /> },
    { name: 'Skills', id: 'skills', icon: <Code size={16} /> },
    { name: 'Projects', id: 'projects', icon: <Briefcase size={16} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={16} /> }
  ];

  return (
    <>
      <motion.header
        className={`fixed w-full z-50 transition-all duration-300
          ${isScrolled 
            ? darkMode 
              ? 'bg-gray-900/95 backdrop-blur-sm' 
              : 'bg-white/95 backdrop-blur-sm'
            : 'bg-transparent'
          } 
          ${isScrolled ? 'shadow-md py-4' : 'py-6'}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <motion.h1 
            className={`text-xl font-bold ${
              isScrolled 
                ? darkMode 
                  ? 'text-white' 
                  : 'text-gray-800' 
                : 'text-white'
            }`}
            whileHover={{ scale: 1.05 }}
          >
            Aman Vijay
          </motion.h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav>
              <ul className="flex space-x-8">
                {navItems.map((item) => (
                  <motion.li 
                    key={item.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={`font-medium transition-colors ${
                        isScrolled 
                          ? darkMode 
                            ? 'text-white hover:text-blue-400' 
                            : 'text-gray-800 hover:text-blue-600'
                          : 'text-white hover:text-blue-200'
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled
                ? darkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                : darkMode
                  ? 'bg-gray-800/50 text-yellow-400 hover:bg-gray-800'
                  : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Floating Navigation Pill */}
      <div className="md:hidden fixed bottom-2 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`flex items-center gap-1 p-1.5 rounded-full shadow-lg backdrop-blur-sm
            ${darkMode 
              ? 'bg-gray-800/90 text-gray-400' 
              : 'bg-white/90 text-gray-500'}`}
        >
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              whileTap={{ scale: 0.95 }}
              className={`relative p-2 rounded-full transition-all duration-300 ${
                activeSection === item.id
                  ? darkMode
                    ? 'text-white bg-gray-700'
                    : 'text-gray-900 bg-gray-100'
                  : 'hover:text-gray-700'
              }`}
            >
              {item.icon}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeSection"
                  className={`absolute inset-0 rounded-full ${
                    darkMode
                      ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20'
                      : 'bg-gradient-to-r from-blue-500/10 to-cyan-500/10'
                  }`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default Header;