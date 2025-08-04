import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedNavbar: React.FC = () => {
  const { formData } = useGeneratorContext();

  const getPrimaryColor = (defaultColor = 'neon-blue') => {
    if (formData.primaryColors) {
      const colors = formData.primaryColors.split(',').map(c => c.trim());
      // Basic hex color validation
      if (/^#[0-9A-F]{6}$/i.test(colors[0])) {
        return colors[0];
      }
    }
    // Fallback to Tailwind configured neon-blue if primaryColors is invalid or not set
    // This requires 'neon-blue' to be a resolvable color in Tailwind config.
    // For direct hex, use a default hex like '#00A3FF'.
    // For this implementation, assuming 'neon-blue' will be correctly mapped by Tailwind.
    // If not, replace with a hex value e.g. '#00A3FF'.
    return `var(--color-${defaultColor}, #00A3FF)`; // Use CSS variable or fallback hex
  };

  const primaryColorValue = getPrimaryColor();

  const navLinks = ['Home', 'About', 'Services', 'Contact'];

  return (
    <nav className="glassmorphism-panel p-4 sticky top-0 z-50"> {/* Applied .glassmorphism-panel and removed conflicting Tailwind classes */}
      <div className="container mx-auto flex justify-between items-center">
        <motion.div
          className="text-2xl font-bold text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {formData.businessName || 'Your Business Name'}
        </motion.div>
        <ul className="flex space-x-6">
          {navLinks.map((link) => (
            <motion.li
              key={link}
              className="relative group"
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                {link}
                <span
                  className="absolute left-0 bottom-[-4px] w-full h-0.5 transition-all duration-300 ease-out scale-x-0 group-hover:scale-x-100"
                  style={{
                    backgroundColor: primaryColorValue,
                    boxShadow: `0 0 8px ${primaryColorValue}, 0 0 12px ${primaryColorValue}`
                  }}
                ></span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default GeneratedNavbar;
