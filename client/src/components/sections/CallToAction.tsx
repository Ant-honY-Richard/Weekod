import { motion } from 'framer-motion';
import { Link } from 'wouter';
import GradientText from '@/components/ui/gradient-text';
import GradientBorder from '@/components/ui/gradient-border';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-accent-purple opacity-20 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-magenta opacity-20 blur-3xl"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <GradientBorder>
          <div className="bg-dark-800 rounded-2xl p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <svg width="300" height="300" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10 L70 30 L50 50 L30 30 Z" fill="#E0E0E0"/>
                <path d="M70 30 L90 50 L70 70 L50 50 Z" fill="#E0E0E0"/>
                <path d="M30 30 L50 50 L30 70 L10 50 Z" fill="#E0E0E0"/>
              </svg>
            </div>
            
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Ready to Transform Your <GradientText>Digital Presence?</GradientText>
              </h2>
              <p className="text-lg text-silver mb-8">
                Let's collaborate to create a stunning website that drives results. Get in touch with us today for a free consultation.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="#contact"
                    className="btn-hover-effect inline-block w-full bg-gradient-to-r from-accent-purple to-accent-magenta px-8 py-4 rounded-full text-white font-semibold text-center transition-all hover:shadow-lg hover:shadow-accent-purple/20"
                  >
                    Start Your Project
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="#" 
                    className="btn-hover-effect inline-block w-full px-8 py-4 rounded-full text-silver border border-silver hover:text-white hover:border-white text-center transition-colors"
                  >
                    Schedule a Call
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </GradientBorder>
      </div>
    </section>
  );
};

export default CallToAction;
