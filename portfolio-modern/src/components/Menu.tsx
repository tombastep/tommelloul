'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/data';

interface MenuProps {
  projects: Project[];
}

export default function Menu({ projects }: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Menu Background Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="menuBG"
            className="fixed inset-0 bg-black/50 z-25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>

      {/* Menu Container */}
      <div id="menu" className="fixed top-0 right-0 z-20 p-8">
        {/* Logo */}
        <div id="menuLogo" className="mb-8">
          <a
            id="menuHome"
            href="#home"
            className="block"
            onClick={closeMenu}
          >
            <div className="overflow-hidden h-full inline-block">
              <svg
                className="menu w-32 h-16"
                id="Name"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 630 185"
              >
                <line
                  className="cls-1"
                  x1="5.27"
                  y1="182.5"
                  x2="46.27"
                  y2="2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <text
                  className="cls-2"
                  transform="translate(100 79.52)"
                  fill="currentColor"
                  fontSize="60"
                  fontFamily="Montserrat"
                  fontWeight="700"
                >
                  <tspan x="0" y="0">TOM</tspan>
                  <tspan x="0" y="96">MELLOUL</tspan>
                </text>
              </svg>
            </div>
          </a>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="menu relative w-16 h-16"
          id="Pages"
          aria-label="Main Menu"
          onClick={toggleMenu}
        >
          <svg width="100" height="100" viewBox="0 0 100 100">
            <motion.path
              className="line line1"
              d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                d: isOpen
                  ? "M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                  : "M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058",
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              className="line line2"
              d="M 20,50 H 80"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.path
              className="line line3"
              d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              animate={{
                d: isOpen
                  ? "M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                  : "M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942",
              }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>

        {/* Hidden Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="hiddenMenu"
              className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-30 p-8 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="space-y-4">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="menuItem cursor-pointer p-4 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      closeMenu();
                      // Scroll to project section
                      const element = document.getElementById(project.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="text-lg font-semibold text-black mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {project.subtitle}
                    </p>
                    <p className="text-xs text-gray-500">
                      {project.year} • {project.location}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
