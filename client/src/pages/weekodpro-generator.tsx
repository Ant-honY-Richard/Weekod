import React from 'react';
import { motion } from 'framer-motion';
import LiveForm from '@/components/weekodpro/LiveForm';
import { GeneratorProvider } from '@/contexts/GeneratorContext';
import GeneratedNavbar from '@/components/weekodpro/GeneratedNavbar';
import GeneratedHero from '@/components/weekodpro/GeneratedHero';
import GeneratedCTA from '@/components/weekodpro/GeneratedCTA';
import GeneratedGallery from '@/components/weekodpro/GeneratedGallery';
import GeneratedPricing from '@/components/weekodpro/GeneratedPricing';
import GeneratedTestimonials from '@/components/weekodpro/GeneratedTestimonials';
import GeneratedContactForm from '@/components/weekodpro/GeneratedContactForm';

const WeekodProGenerator: React.FC = () => {
  return (
    <GeneratorProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 bg-futuristic-dark-blue min-h-screen"
      >
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0">
          {/* Form Area */}
          <div className="lg:w-1/3 bg-futuristic-dark-slate p-6 rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto">
            <LiveForm />
          </div>

          {/* Live Preview Area */}
          <div className="lg:w-2/3 rounded-xl shadow-2xl overflow-hidden flex flex-col bg-futuristic-dark-slate">
            {/* This div will act as the viewport for the generated components */}
            <div className="flex-grow overflow-y-auto relative w-full" style={{ maxHeight: 'calc(90vh - 0px)', WebkitOverflowScrolling: 'touch' }}>
              {/* Subtract approx navbar height if any global navbar exists above this page, else 0px */}
              <GeneratedNavbar />
              <GeneratedHero />
              <GeneratedCTA />
              <GeneratedGallery />
              <GeneratedPricing />
              <GeneratedTestimonials />
              <GeneratedContactForm />
              {/* Future generated components will go here, e.g. Footer */}
            </div>
          </div>
        </div>
      </motion.div>
    </GeneratorProvider>
  );
};

export default WeekodProGenerator;
