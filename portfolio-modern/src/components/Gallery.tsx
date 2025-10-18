'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/data';

interface GalleryProps {
  project: Project;
}

export default function Gallery({ project }: GalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = project.images.gallery.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        setIsLoading(false);
      } catch (error) {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      }
    };

    preloadImages();
  }, [project.images.gallery]);

  const openGallery = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % project.images.gallery.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + project.images.gallery.length) % project.images.gallery.length);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          closeGallery();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (isLoading) {
    return (
      <div className="absolute bottom-8 right-8">
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Gallery Thumbnail Grid */}
      <div className="absolute bottom-8 right-8 grid grid-cols-3 gap-2 max-w-xs z-20">
        {project.images.thumbnails.slice(0, 6).map((thumbnail, index) => (
          <motion.div
            key={index}
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg overflow-hidden cursor-pointer hover:bg-white/30 transition-colors duration-300"
            onClick={() => openGallery(index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={thumbnail}
              alt={`${project.title} thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {project.images.thumbnails.length > 6 && (
          <motion.div
            className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center cursor-pointer hover:bg-white/30 transition-colors duration-300"
            onClick={() => openGallery(6)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-sm font-semibold">
              +{project.images.thumbnails.length - 6}
            </span>
          </motion.div>
        )}
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            {/* Close Button */}
            <button
              className="absolute top-8 right-8 text-white text-2xl z-10 hover:text-gray-300 transition-colors duration-300"
              onClick={closeGallery}
            >
              ×
            </button>

            {/* Image Container */}
            <div className="relative max-w-4xl max-h-[80vh] mx-8">
              <motion.img
                key={currentIndex}
                src={project.images.gallery[currentIndex]}
                alt={`${project.title} image ${currentIndex + 1}`}
                className="max-w-full max-h-full object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              />

              {/* Navigation Arrows */}
              {project.images.gallery.length > 1 && (
                <>
                  <button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-gray-300 transition-colors duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                  >
                    ›
                  </button>
                </>
              )}

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
                {currentIndex + 1} / {project.images.gallery.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
