import { Link } from 'wouter';
import { motion } from 'framer-motion';
import GradientText from '@/components/ui/gradient-text';

const Hero = () => {
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
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-accent-purple opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full bg-accent-magenta opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Hero Content */}
          <div className="max-w-2xl">
            <motion.h5 
              className="text-accent-blue font-semibold mb-4"
              variants={itemVariants}
            >
              Turnkey Website Solutions
            </motion.h5>
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <span>Transforming Brands for the</span> <br />
              <GradientText>Digital Age</GradientText>
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
              <Link href="#contact">
                <a className="btn-hover-effect bg-gradient-to-r from-accent-purple to-accent-magenta px-8 py-4 rounded-full text-white font-semibold text-center transition-all hover:shadow-lg hover:shadow-accent-purple/20">
                  Get a Free Consultation
                </a>
              </Link>
              <Link href="#portfolio">
                <a className="btn-hover-effect px-8 py-4 rounded-full text-silver border border-silver hover:text-white hover:border-white text-center transition-colors">
                  View Our Work
                </a>
              </Link>
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
                    className="h-8 w-20 bg-silver opacity-60 rounded"
                    whileHover={{ 
                      opacity: 1, 
                      filter: "grayscale(0)",
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
              <div className="w-full h-auto rounded-xl shadow-2xl bg-dark-700 aspect-square overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="400" height="400" fill="#2D2D2D" />
                  <path d="M200 100 L300 200 L200 300 L100 200 Z" fill="#B721FF" fillOpacity="0.2" />
                  <path d="M200 150 L250 200 L200 250 L150 200 Z" fill="#FF00C8" fillOpacity="0.3" />
                </svg>
              </div>
              
              {/* Floating elements */}
              <motion.div 
                className="absolute -top-6 -right-6 bg-dark-800 rounded-lg p-4 shadow-xl"
                animate={pulseAnimation}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-accent-blue flex items-center justify-center text-white">
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
                className="absolute -bottom-6 -left-6 bg-dark-800 rounded-lg p-4 shadow-xl"
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
                    <div className="w-8 h-8 rounded-full bg-accent-purple"></div>
                    <div className="w-8 h-8 rounded-full bg-accent-magenta"></div>
                    <div className="w-8 h-8 rounded-full bg-accent-blue"></div>
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
          <div className="text-center">
            <h3 className="text-4xl font-display font-bold mb-2 gradient-text">250+</h3>
            <p className="text-silver">Projects Completed</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-display font-bold mb-2 gradient-text">15+</h3>
            <p className="text-silver">Team Members</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-display font-bold mb-2 gradient-text">7</h3>
            <p className="text-silver">Years Experience</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-display font-bold mb-2 gradient-text">180+</h3>
            <p className="text-silver">Happy Clients</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
