'use client';

import { ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  background?: string;
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, children, className = '', background }, ref) => {
  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section h-screen flex items-center justify-center relative ${className}`}
      style={{ backgroundColor: background || '#ffffff' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
});

Section.displayName = 'Section';

export default Section;
