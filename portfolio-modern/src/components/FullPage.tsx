'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { projects } from '@/lib/data';

interface FullPageProps {
  children: React.ReactNode;
}

export default function FullPage({ children }: FullPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

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

  // Handle smooth scrolling to sections with easing
  const scrollToSection = (index: number) => {
    setIsScrolling(true);
    const sections = containerRef.current?.children;
    if (sections && sections[index]) {
      const section = sections[index] as HTMLElement;
      const sectionTop = section.offsetTop;
      
      // Use smooth scroll with easing
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

  // Handle wheel events for section snapping
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;
      const threshold = 50;

      if (Math.abs(deltaY) > threshold) {
        e.preventDefault();
        
        if (deltaY > 0 && currentSection < projects.length + 1) {
          scrollToSection(currentSection + 1);
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1);
        }
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    return () => document.removeEventListener('wheel', handleWheel);
  }, [currentSection, isScrolling, projects.length]);

  return (
    <div
      ref={containerRef}
      id="fullpage"
      className="relative"
      style={{ height: `${(projects.length + 2) * 100}vh` }}
    >
      {children}
    </div>
  );
}
