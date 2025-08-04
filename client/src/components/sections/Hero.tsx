import { motion } from 'framer-motion';
import ParticlesBackground from '../ui/ParticlesBackground';
import SectionContainer from '@/components/ui/SectionContainer';
import ShinyText from '../ui/ShinyText';

const Hero = () => {
  return (
    <SectionContainer id="home" className="flex items-center justify-center min-h-screen bg-dark-900 px-4">
      {/* Particles Background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Glitter Background */}
      <div className="absolute inset-0 z-0 pointer-events-none glitter-bg" />

      {/* Animated Logo - Using will-change for better performance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ willChange: 'opacity' }}
      >
        <div className="relative w-[600px] h-[600px] max-w-[80vw] max-h-[80vh]">
          {/* Animated Outline Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15, scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', repeatDelay: 0 }}
            className="absolute inset-0 z-0 rounded-full border-[3px] border-accent-purple blur-xl"
            style={{ willChange: 'opacity, transform' }}
          />

          {/* Base Logo with Pulse - Fixed size to prevent layout shifts */}
          <div className="absolute inset-0 logo-shine" style={{ willChange: 'transform' }}>
            <img
              src="/weekod-logo.svg"
              alt="WeekodPro Logo"
              className="absolute inset-0 w-full h-full object-contain opacity-25"
              style={{ willChange: 'transform' }}
            />
          </div>
          
          {/* Gleaming Effect Layer - Fixed size to prevent layout shifts */}
          <img
            src="/weekod-logo.svg"
            alt="WeekodPro Logo Glow"
            className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-25"
            style={{ willChange: 'transform' }}
          />
          
          {/* Extra Glow Layer */}
          <div className="absolute inset-0 bg-gradient-radial from-accent-purple/10 to-transparent opacity-25" />
        </div>
      </motion.div>

      {/* Text Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-text-glow shining-text"
        >
          Transforming Ideas Into
          <br />
          Digital Reality
          <br />
          {/* New Line Below Digital Reality */}
          <motion.span
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
  className="block mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 font-medium italic relative overflow-hidden shimmer-text"
>
  Your Vision, Our Mission
</motion.span>

        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-8 text-lg sm:text-xl md:text-2xl animate-flow-text max-w-2xl mx-auto"
        >
          <ShinyText 
            text="We create stunning websites and applications that drive results and elevate your business to new heights."
            speed={4}
            className="text-lg sm:text-xl md:text-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-12 mb-24 flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#contact"
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shining-text"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:scale-105 shining-text"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1,
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-fuchsia-500 rounded-full flex justify-center backdrop-blur-sm bg-black/30">
          <div className="w-1 h-3 bg-fuchsia-500 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </SectionContainer>
  );
};

export default Hero;
