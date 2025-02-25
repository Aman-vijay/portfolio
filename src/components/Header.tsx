import { useState, useEffect } from 'react';
import { useScroll, motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Code, Mail } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const Header = ({ darkMode, toggleTheme }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'About', id: 'about', icon: <User size={18} /> },
    { name: 'Skills', id: 'skills', icon: <Code size={18} /> },
    { name: 'Projects', id: 'projects', icon: <Code size={18} /> },
    { name: 'Contact', id: 'contact', icon: <Mail size={18} /> }
  ];

  return (
    <motion.header
      className={`fixed w-full z-50 transition-all duration-300
         ${isScrolled ? darkMode 
            ? 'bg-gray-900/90 backdrop-blur-sm' 
            : 'bg-white/90 backdrop-blur-sm'
          : 'bg-transparent'
      } 
      ${isScrolled ? 'shadow-md py-4' : 'py-6'}`
      
    }
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
        <nav className="hidden md:block">
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

        {/* Desktop Theme Toggle */}
        <button
          onClick={toggleTheme}
          className={`ml-4 p-2 rounded-full transition-colors hidden md:block ${
            darkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-white' 
              : 'bg-white/10 hover:bg-white/20 text-white'
          }`}
        >
          {darkMode ? '🌞' : '🌜'}
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-full"
        >
          <Menu 
            className={`w-6 h-6 ${
              isScrolled 
                ? darkMode 
                  ? 'text-white' 
                  : 'text-gray-800' 
                : 'text-white'
            }`} 
          />
        </button>

        {/* Mobile Sidebar with completely solid background */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* The actual sidebar - detached from header completely */}
              <motion.aside
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{ 
                  backgroundColor: darkMode ? '#111827' : '#FFFFFF',
                  position: 'fixed',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  width: '18rem', // 72px equivalent 
                  zIndex: 50,
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Menu
                    </h2>
                    <button 
                      onClick={toggleMobileMenu} 
                      className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
                    >
                      <X className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
                    </button>
                  </div>

                  {/* Enhanced Navigation */}
                  <nav className="flex-1">
                    <ul className="space-y-2">
                      {navItems.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => scrollToSection(item.id)}
                            className={`w-full py-3 px-4 rounded-lg flex items-center gap-3 transition-all ${
                              darkMode 
                                ? 'text-white hover:bg-gray-800 hover:text-blue-400' 
                                : 'text-gray-800 hover:bg-gray-100 hover:text-blue-600'
                            }`}
                          >
                            <span className="flex items-center justify-center w-8 h-8">
                              {item.icon}
                            </span>
                            <span className="text-lg font-medium">{item.name}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Theme Toggle with better styling */}
                  <div className="mt-auto pt-4">
                    <div className={`flex items-center justify-between p-4 rounded-lg ${
                      darkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}>
                      <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {darkMode ? 'Switch to Light' : 'Switch to Dark'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTheme();
                        }}
                        className={`p-2 rounded-full ${
                          darkMode 
                            ? 'bg-gray-700 text-yellow-400' 
                            : 'bg-white text-gray-800 shadow-md'
                        }`}
                      >
                        {darkMode ? '🌞' : '🌜'}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.aside>

              {/* Overlay that sits behind sidebar but in front of content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 40
                }}
                className="md:hidden"
                onClick={toggleMobileMenu}
              />
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;