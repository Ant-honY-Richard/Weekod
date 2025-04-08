import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import GradientText from '@/components/ui/gradient-text';
import NeonText from '@/components/ui/neon-text';
import ParticlesBackground from '@/components/ui/particles-background';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading delay and then show the hero elements
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const pulseAnimation = {
    opacity: [0.7, 1, 0.7],
    scale: [1, 1.05, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section className="pt-32 pb-20 relative overflow-hidden">
      {/* Particles Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none z-0">
        <ParticlesBackground />
      </div>
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent-purple opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-accent-magenta opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-accent-blue opacity-10 blur-3xl"></div>
        
        {/* Tech Pattern Background */}
        <div className="absolute inset-0 tech-pattern-bg opacity-10"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Hero Content */}
          <div className="max-w-2xl">
            <motion.div 
              className="flex items-center mb-4"
              variants={itemVariants}
            >
              <NeonText color="blue" size="md" glow="sm" className="font-semibold">
                Turnkey Website Solutions
              </NeonText>
              <motion.div 
                className="ml-2 w-2 h-2 bg-accent-blue rounded-full"
                animate={{
                  opacity: [1, 0.4, 1],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span>Transforming Brands for the</span> <br />
              <span className="animated-gradient-text">Digital Age</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg text-silver mb-8"
              variants={itemVariants}
            >
              From concept to completion in just 7 days. We build custom websites that drive traffic, boost engagement, and grow your business with our turnkey development solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <a 
                href="#contact"
                className="btn-charge btn-hover-effect relative bg-gradient-to-r from-accent-purple to-accent-magenta px-8 py-4 rounded-full text-white font-semibold text-center transition-all hover:shadow-lg hover:shadow-accent-purple/20 group"
              >
                <motion.span
                  className="absolute right-4 inline-flex items-center justify-center"
                  animate={{
                    x: [0, 5, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.span>
                Get a Free Consultation
              </a>
              
              <a
                href="#portfolio"
                className="glass-effect-light px-8 py-4 rounded-full text-silver hover:text-white text-center transition-all hover:shadow-lg"
              >
                View Our Work
              </a>
            </motion.div>
            
            {/* Client Logos */}
            <motion.div 
              className="mt-16"
              variants={itemVariants}
            >
              <p className="text-sm text-silver-dark mb-4">TRUSTED BY INNOVATIVE BRANDS</p>
              <div className="flex flex-wrap gap-8 items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <motion.div 
                    key={index}
                    className="h-8 w-20 bg-dark-700 opacity-60 rounded border border-dark-600"
                    whileHover={{ 
                      opacity: 1, 
                      filter: "grayscale(0)",
                      boxShadow: "0 0 8px rgba(183, 33, 255, 0.3)",
                      transition: { duration: 0.3 } 
                    }}
                    style={{ filter: "grayscale(1)" }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Hero Image */}
          <motion.div className="relative" variants={itemVariants}>
            <motion.div 
              className="relative z-10"
              animate={floatingAnimation}
            >
              <div className="w-full h-auto rounded-xl shadow-2xl bg-dark-700 aspect-square overflow-hidden card-glass">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="400" fill="rgba(45, 45, 45, 0.5)" />
                  <path d="M200 100 L300 200 L200 300 L100 200 Z" fill="#B721FF" fillOpacity="0.2" />
                  <path d="M200 150 L250 200 L200 250 L150 200 Z" fill="#FF00C8" fillOpacity="0.3" />
                  
                  {/* Add more futuristic elements */}
                  <circle cx="200" cy="200" r="80" stroke="#00D9FF" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="10 5" />
                  <circle cx="200" cy="200" r="120" stroke="#B721FF" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="5 8" />
                  
                  {/* Grid lines */}
                  <path d="M0 200 L400 200" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
                  <path d="M200 0 L200 400" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
                </svg>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 glass-effect rounded-lg p-4 shadow-xl"
                animate={pulseAnimation}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-blue shadow-glow-blue flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Project Delivered</p>
                    <p className="text-silver-dark text-sm">Just now</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-6 -left-6 glass-effect rounded-lg p-4 shadow-xl"
                animate={{
                  x: [0, 5, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent-purple shadow-glow"></div>
                    <div className="w-8 h-8 rounded-full bg-accent-magenta shadow-glow-magenta"></div>
                    <div className="w-8 h-8 rounded-full bg-accent-blue shadow-glow-blue"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-white font-semibold">Live Collaboration</p>
                    <p className="text-silver-dark text-sm">3 team members</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Background shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-accent-purple opacity-10 blur-3xl"></div>
          </motion.div>
        </motion.div>
        
        {/* Stats */}
        <motion.div 
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {[
            { value: "250+", label: "Projects Completed" },
            { value: "15+", label: "Team Members" },
            { value: "7", label: "Years Experience" },
            { value: "180+", label: "Happy Clients" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="text-center glass-effect p-4 rounded-xl"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-4xl font-display font-bold mb-2 animated-gradient-text">{stat.value}</h3>
              <p className="text-silver">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
