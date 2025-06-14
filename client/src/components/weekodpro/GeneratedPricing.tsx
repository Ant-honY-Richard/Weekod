import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedPricing: React.FC = () => {
  const { formData } = useGeneratorContext();

  if (!formData.features.pricing) {
    return null;
  }

  return (
    <motion.section
      className="py-12 px-6 bg-futuristic-dark-blue/60 border-t border-accent-magenta/30" // Different bg, border
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-accent-magenta mb-4">
          Pricing Section (Placeholder)
        </h2>
        <p className="text-slate-300">
          The pricing plans for <span className="font-semibold text-white">{formData.businessName || "your business"}</span> will be detailed here.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          (Feature: Pricing Table Enabled) - Font Preference: <span className="font-semibold text-white">{formData.fontPreference || "Sans-serif"}</span>
        </p>
      </div>
    </motion.section>
  );
};

export default GeneratedPricing;
