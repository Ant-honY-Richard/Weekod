import React from 'react';
import { motion } from 'framer-motion';

interface SectionContainerProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A stable container for sections that prevents layout shifts
 * and provides consistent animations
 */
const SectionContainer: React.FC<SectionContainerProps> = ({ 
  id, 
  className = '', 
  children 
}) => {
  return (
    <section 
      id={id}
      className={`relative w-full overflow-hidden ${className}`}
      style={{ 
        willChange: 'transform', // Optimize for animations
        transform: 'translateZ(0)', // Force GPU acceleration
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;