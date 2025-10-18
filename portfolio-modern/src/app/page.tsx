'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import FullPage from '@/components/FullPage';
import Section from '@/components/Section';
import ProjectSection from '@/components/ProjectSection';
import AboutSection from '@/components/AboutSection';
import { projects } from '@/lib/data';

export default function Home() {
  useEffect(() => {
    document.body.classList.remove('is-preload');
  }, []);

  return (
    <FullPage>
      {/* Home Section */}
      <Section id="home" className="bg-white">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-black mb-4">Tom Melloul</h1>
          <h3 className="text-xl md:text-2xl text-gray-600 mb-8">Architect & Creative Coder</h3>
          <div className="flex justify-center space-x-4">
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
          </div>
        </motion.div>
        <motion.a 
          href="#about" 
          className="ca3-scroll-down-link ca3-scroll-down-arrow view-down absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-black animate-bounce">
            <path d="M12 5v14M5 12l7 7 7-7"></path>
          </svg>
        </motion.a>
      </Section>

      {/* Project Sections */}
      {projects.map((project, index) => (
        <ProjectSection key={project.id} project={project} index={index} />
      ))}

      {/* About Section */}
      <AboutSection />
    </FullPage>
  );
}