'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '@/lib/data';
import ProjectSection from './ProjectSection';
import AboutSection from './AboutSection';

interface ScrollSectionProps {
  projects: Project[];
}

export default function ScrollSection({ projects }: ScrollSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate which section is currently in view
  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = containerRef.current?.children;
      if (!sections) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollTop >= sectionTop - windowHeight / 2 &&
          scrollTop < sectionTop + sectionHeight - windowHeight / 2
        ) {
          setCurrentSection(i);
          break;
        }
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolling]);

  // Handle smooth scrolling to sections
  const scrollToSection = (index: number) => {
    setIsScrolling(true);
    const sections = containerRef.current?.children;
    if (sections && sections[index]) {
      const section = sections[index] as HTMLElement;
      const sectionTop = section.offsetTop;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
      
      // Update URL hash
      const sectionId = section.id;
      if (sectionId) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
    
    setTimeout(() => setIsScrolling(false), 1000);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (currentSection < projects.length + 1) {
            scrollToSection(currentSection + 1);
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (currentSection > 0) {
            scrollToSection(currentSection - 1);
          }
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(projects.length + 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, isScrolling, projects.length]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${(projects.length + 2) * 100}vh` }}
    >
      {/* Home Section */}
      <motion.section
        id="home"
        className="h-screen flex items-center justify-center bg-white relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <motion.h1
            className="text-6xl md:text-8xl font-bold text-black mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Tom Melloul
          </motion.h1>
          <motion.h3
            className="text-xl md:text-2xl text-gray-600 mb-8"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Architect & Creative Coder
          </motion.h3>
          <motion.div
            className="flex justify-center space-x-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <a
              href="#about"
              className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
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
            <a
              href="#animism"
              className="px-8 py-3 border border-black text-black rounded-full hover:bg-black hover:text-white transition-colors duration-300"
            >
              View Work
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
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
            className="w-6 h-6 text-black"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </motion.div>
      </motion.section>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection
          key={project.id}
          project={project}
          index={index}
        />
      ))}

      {/* About Section */}
      <AboutSection />
    </div>
  );
}
