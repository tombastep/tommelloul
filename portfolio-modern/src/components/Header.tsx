'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Lazy load the 3D logo component
const Logo3D = dynamic(() => import('./Logo3D'), {
  ssr: false,
  loading: () => (
    <div className="w-32 h-32 bg-gray-200 rounded-full animate-pulse" />
  ),
});

interface HeaderProps {
  className?: string;
}

export default function Header({ className = '' }: HeaderProps) {
  const [isLogoReady, setIsLogoReady] = useState(false);

  useEffect(() => {
    // Simulate logo loading time
    const timer = setTimeout(() => {
      setIsLogoReady(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.header
      id="header"
      className={`fixed top-0 left-0 right-0 z-10 p-8 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        {/* Logo Container */}
        <div
          id="logo"
          className={`relative w-32 h-32 transition-all duration-300 ${
            isLogoReady ? 'logo-ready' : 'logo-placeholder'
          }`}
        >
          {isLogoReady ? (
            <Logo3D />
          ) : (
            <div className="w-full h-full bg-gray-200 rounded-full animate-pulse" />
          )}
        </div>

        {/* Title and Subtitle */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-black mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Tom Melloul
          </motion.h1>
          <motion.h3
            className="text-lg md:text-xl text-gray-600 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Architect & Creative Coder
          </motion.h3>
          <motion.div
            className="btn view-right"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <a
              href="#about"
              className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              About
            </a>
          </motion.div>
        </div>

        {/* Scroll Arrow */}
        <motion.a
          href="#about"
          className="ca3-scroll-down-link ca3-scroll-down-arrow view-down absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={(e) => {
            e.preventDefault();
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-black animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.a>
      </div>
    </motion.header>
  );
}
