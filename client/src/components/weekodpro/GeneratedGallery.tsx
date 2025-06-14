import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedGallery: React.FC = () => {
  const { formData } = useGeneratorContext();

  if (!formData.features.gallery) {
    return null;
  }

  return (
    <motion.section
      className="py-12 px-6 bg-futuristic-dark-blue/40 border-t border-neon-purple/30" // Different bg tint & border
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-neon-purple mb-4">
          Gallery Section (Placeholder)
        </h2>
        <p className="text-slate-300">
          This is where the Gallery for <span className="font-semibold text-white">{formData.businessName || "your business"}</span> will be displayed.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          (Feature: Gallery Enabled) - UI Style: <span className="font-semibold text-white">{formData.uiStyle || "Not set"}</span>
        </p>
      </div>
    </motion.section>
  );
};

export default GeneratedGallery;
