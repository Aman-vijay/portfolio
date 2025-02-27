import React, { useState } from 'react';

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);

  // Binary animation for copyright text on hover
  const binaryText = (text: string) => {
    return text
      .split('')
      .map((char, index) => (
        <span
          key={index}
          className="binary-char"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {isHovered ? (Math.random() > 0.5 ? '1' : '0') : char}
        </span>
      ));
  };

  return (
    <footer
      className={`py-12 relative ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900'
          : 'bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900'
      }`}
    >
      {/* Neon Tech Background */}
      <div
        className="absolute inset-0 opacity-15 bg-repeat"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='none' stroke='%2300f3ff' stroke-width='0.5' stroke-opacity='0.4'%3E%3Cpath d='M0 20h40M20 0v40'/%3E%3Ccircle cx='20' cy='20' r='1' fill='%2300f3ff'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      {/* Subtle Neon Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent opacity-20 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-cyan-400/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="text-sm font-mono text-white"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {binaryText(`© ${currentYear} Aman Vijay. All rights reserved.`)}
            </p>
            <p className="text-sm font-mono text-cyan-400 mt-2 md:mt-0">
              {`Made with ${darkMode ? '💾' : '💿'} in India`}
            </p>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style>
        {`
          @keyframes binary-flash {
            0% { opacity: 0.5; color: #00f3ff; text-shadow: 0 0 5px rgba(0, 243, 255, 0.8); }
            50% { opacity: 1; color: #00c3ff; text-shadow: 0 0 10px rgba(0, 195, 255, 1); }
            100% { opacity: 0.5; color: #00f3ff; text-shadow: 0 0 5px rgba(0, 243, 255, 0.8); }
          }
          .binary-char {
            display: inline-block;
            animation: binary-flash 0.5s infinite;
          }
          .binary-char:not(:hover) {
            animation: none;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;