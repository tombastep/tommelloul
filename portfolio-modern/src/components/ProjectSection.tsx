'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '@/lib/data';
import Section from './Section';
import Gallery from './Gallery';

interface ProjectSectionProps {
  project: Project;
  index: number;
}

export default function ProjectSection({ project, index }: ProjectSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(ref, { amount: 0.3 });

  // Auto-play video when section comes into view
  useEffect(() => {
    console.log(`Project ${project.id}: isInView=${isInView}, hasVideo=${!!project.videos?.main}`);
    if (isInView && project.videos?.main && videoRef.current) {
      console.log(`Playing video for ${project.id}: ${project.videos.main}`);
      setIsVideoPlaying(true);
      videoRef.current.play().catch(console.error);
    } else if (videoRef.current) {
      console.log(`Pausing video for ${project.id}`);
      setIsVideoPlaying(false);
      videoRef.current.pause();
    }
  }, [isInView, project.videos?.main, project.id]);

  return (
    <Section id={project.id} className="bg-white relative overflow-hidden" ref={ref}>
      {/* Background Video */}
      {project.videos?.main && (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={isVideoPlaying}
            muted
            loop
            playsInline
            poster={project.images.main}
            onLoadedData={() => {
              if (isInView && isVideoPlaying) {
                videoRef.current?.play().catch(console.error);
              }
            }}
          >
            <source src={project.videos.main} type="video/webm" />
            <source src={project.videos.main.replace('.webm', '.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Background Image (fallback for projects without videos) */}
      {!project.videos?.main && project.images.main && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.images.main}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 text-center">
        <motion.div
          className="mb-8"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {project.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 mb-2 drop-shadow-lg">
            {project.subtitle}
          </h2>
          <p className="text-lg text-white/80 mb-4 drop-shadow-lg">
            {project.description}
          </p>
          <div className="flex justify-center space-x-4 text-sm text-white/70">
            <span>{project.year}</span>
            <span>•</span>
            <span>{project.location}</span>
            <span>•</span>
            <span>{project.type}</span>
          </div>
        </motion.div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center w-full">
          <motion.button
            className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const prevSection = index > 0 ? document.getElementById(project.id)?.previousElementSibling : null;
              if (prevSection) {
                prevSection.scrollIntoView({ behavior: 'smooth' });
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
              className="w-6 h-6 text-white"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>

          <motion.button
            className="p-4 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              const nextSection = document.getElementById(project.id)?.nextElementSibling;
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
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
              className="w-6 h-6 text-white"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Gallery */}
      <Gallery project={project} />
    </Section>
  );
}
