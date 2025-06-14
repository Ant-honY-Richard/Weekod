import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';
import ParticlesBackground from '@/components/ui/ParticlesBackground'; // Import ParticlesBackground

const GeneratedHero: React.FC = () => {
  const { formData } = useGeneratorContext();

  const getPrimaryColor = (defaultColorHex = '#00A3FF') => { // Default to neon-blue hex
    if (formData.primaryColors) {
      const colors = formData.primaryColors.split(',').map(c => c.trim());
      // Basic hex color validation
      if (/^#[0-9A-F]{6}$/i.test(colors[0])) {
        return colors[0];
      }
    }
    return defaultColorHex;
  };

  const primaryColor = getPrimaryColor();
  // Use a fixed secondary color or derive it if needed. For now, neon-cyan.
  const secondaryColor = 'var(--color-neon-cyan, #00FFD1)';

  return (
    <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-br from-futuristic-dark-blue to-futuristic-dark-slate text-white flex flex-col items-center justify-center px-6 py-10 text-center overflow-hidden"> {/* Adjusted min-h, added relative and overflow-hidden */}
      <ParticlesBackground baseColor={primaryColor} particleCount={50} connectionDistance={100} />
      {/* Ensure content is layered on top of particles */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight z-10" // Added z-10
        style={{
          backgroundImage: `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {formData.businessName || 'Your Awesome Company'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl z-10" // Added z-10
      >
        {formData.industry || 'We build amazing things that will revolutionize your world!'}
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }} // Removed boxShadow from here, neon-glow-border handles it
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        className="neon-glow-border mt-10 px-8 py-4 font-semibold rounded-lg transition-all duration-300 ease-in-out z-10" // Added neon-glow-border, removed shadow-lg
        style={{
          backgroundColor: primaryColor,
          color: '#0A0E17', // Dark text for contrast with neon button
          "--neon-glow-color": primaryColor, // Set CSS variable for the glow color
          // The border from neon-glow-border will use --neon-glow-color.
          // If a different border thickness is desired than what neon-glow-border provides (1px), it needs adjustment in CSS or via another class.
        }}
        // onMouseEnter/Leave for border color change removed as neon-glow-border handles border consistently
      >
        Get Started
      </motion.button>
    </div>
  );
};

export default GeneratedHero;
