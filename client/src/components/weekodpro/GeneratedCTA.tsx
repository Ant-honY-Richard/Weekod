import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedCTA: React.FC = () => {
  const { formData } = useGeneratorContext();

  if (!formData.features.cta) {
    return null;
  }

  return (
    <motion.section
      className="py-16 px-6 bg-futuristic-dark-slate/70" // No border, different padding
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-neon-cyan mb-6">
          Call To Action (Placeholder)
        </h2>
        <p className="text-slate-200 text-lg mb-8">
          A compelling call to action for <span className="font-semibold text-white">{formData.businessName || "your business"}</span> will be here!
        </p>
        <button
          className="px-10 py-4 font-bold text-futuristic-dark-blue rounded-lg shadow-lg hover:scale-105 transition-transform"
          style={{ backgroundColor: formData.primaryColors.split(',')[0]?.trim() || 'var(--color-neon-cyan)' }}
        >
          Get Started Now! (Example)
        </button>
        <p className="text-xs text-slate-500 mt-4">
          (Feature: CTA Enabled) - Target Audience: <span className="font-semibold text-slate-400">{formData.targetAudience || "Everyone"}</span>
        </p>
      </div>
    </motion.section>
  );
};

export default GeneratedCTA;
