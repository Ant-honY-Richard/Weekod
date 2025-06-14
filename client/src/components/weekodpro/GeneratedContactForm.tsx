import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedContactForm: React.FC = () => {
  const { formData } = useGeneratorContext();

  if (!formData.features.contactForm) {
    return null; // Don't render if feature not selected
  }

  return (
    <motion.section
      className="py-12 px-6 bg-futuristic-dark-slate/50 border-t border-neon-blue/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }} // Small delay for staggered effect
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-neon-blue mb-4">
          Contact Us Section (Placeholder)
        </h2>
        <p className="text-slate-300">
          This is where the Contact Form for <span className="font-semibold text-white">{formData.businessName || "your business"}</span> will appear.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          (Feature: Contact Form Enabled) - Primary Color: <span style={{color: formData.primaryColors.split(',')[0]?.trim() || 'var(--color-neon-blue)'}}>{formData.primaryColors || "Default Neon Blue"}</span>
        </p>
      </div>
    </motion.section>
  );
};

export default GeneratedContactForm;
