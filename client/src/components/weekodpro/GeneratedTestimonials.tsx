import React from 'react';
import { useGeneratorContext } from '@/contexts/GeneratorContext';
import { motion } from 'framer-motion';

const GeneratedTestimonials: React.FC = () => {
  const { formData } = useGeneratorContext();

  if (!formData.features.testimonials) {
    return null;
  }

  return (
    <motion.section
      className="py-12 px-6 bg-futuristic-dark-slate/40 border-y border-silver/20" // Different bg, y-axis border
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-silver mb-4">
          Testimonials Section (Placeholder)
        </h2>
        <p className="text-slate-300">
          What customers are saying about <span className="font-semibold text-white">{formData.businessName || "your business"}</span>.
        </p>
        <p className="text-sm text-slate-400 mt-2">
          (Feature: Testimonials Enabled) - Business Name: <span className="font-semibold text-white">{formData.businessName || "N/A"}</span>
        </p>
      </div>
    </motion.section>
  );
};

export default GeneratedTestimonials;
