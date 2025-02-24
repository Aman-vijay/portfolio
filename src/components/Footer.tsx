import React from 'react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`py-12 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} Aman Vijay. All rights reserved.
            </p>
            <p className="text-sm mt-2 md:mt-0">
             { `Made with ${darkMode? "💖":"❤️"}  in India`}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;