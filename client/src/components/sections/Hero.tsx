'use client';

import { motion } from 'framer-motion';
import ShinyText from '../ui/ShinyText';
import DotGrid from '../ui/DotGrid';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fullscreen DotGrid Background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={5} // smaller size
          gap={15}
          baseColor= "#000000" // black on default
          activeColor="#ff0000" // red on proximity
          
          proximity={100}
          shockRadius={200}
          shockStrength={10}
          resistance={600}
          returnDuration={1.5}
          className="w-full h-full"
        />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full max-w-7xl mx-auto px-4 pt-16 sm:pt-20 md:pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          className="hero-title font-black leading-tight tracking-wider"
          style={{
            fontFamily: "'Orbitron', 'Exo 2', 'Rajdhani', 'Space Mono', monospace",
            fontSize: "clamp(1.5rem, 4vw, 5rem)",
            background: "linear-gradient(45deg, #C0C0C0 0%, #E8E8E8 15%, #A8A8A8 30%, #D3D3D3 45%, #B8B8B8 60%, #E0E0E0 75%, #BEBEBE 90%, #F5F5F5 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 0 20px rgba(192, 192, 192, 0.4), 0 0 40px rgba(192, 192, 192, 0.2), 0 0 60px rgba(192, 192, 192, 0.1)",
            filter: "drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))",
            letterSpacing: "0.05em",
            textSizeAdjust: "100%", // Prevents browser font scaling
            WebkitTextSizeAdjust: "100%", // Chrome-specific
            MozTextSizeAdjust: "100%", // Firefox-specific
          }}
        >
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px rgba(192, 192, 192, 0.4), 0 0 20px rgba(192, 192, 192, 0.3)",
                "0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)",
                "0 0 10px rgba(192, 192, 192, 0.4), 0 0 20px rgba(192, 192, 192, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="block"
          >
            TRANSFORMING IDEAS INTO
          </motion.span>
          <br />
          <motion.span
            animate={{
              textShadow: [
                "0 0 10px rgba(192, 192, 192, 0.4), 0 0 20px rgba(192, 192, 192, 0.3)",
                "0 0 20px rgba(255, 255, 255, 0.6), 0 0 30px rgba(255, 255, 255, 0.4)",
                "0 0 10px rgba(192, 192, 192, 0.4), 0 0 20px rgba(192, 192, 192, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="block"
          >
            DIGITAL REALITY
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="block mt-4 sm:mt-6 text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em]"
            style={{
              fontFamily: "'Exo 2', 'Orbitron', sans-serif",
              background: "linear-gradient(135deg, #B0B0B0 0%, #D0D0D0 30%, #F0F0F0 50%, #D0D0D0 70%, #B0B0B0 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 10px rgba(176, 176, 176, 0.4)",
              filter: "drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.6))",
            }}
          >
            YOUR VISION, OUR MISSION
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-6 sm:mt-8 max-w-3xl mx-auto px-4"
        >
          <ShinyText
            text="We create stunning websites and applications that drive results and elevate your business to new heights."
            disabled={true}
            speed={3}
            className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium max-w-4xl mx-auto block"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 sm:mt-12 mb-16 sm:mb-20 md:mb-24 flex flex-wrap gap-4 justify-center px-4"
        >
          <a
            href="#contact"
            className="px-6 sm:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-4 text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-6 sm:px-8 lg:px-10 xl:px-12 py-2.5 sm:py-3 lg:py-4 text-base sm:text-lg lg:text-xl xl:text-2xl font-semibold rounded-lg border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
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
          repeatType: 'reverse',
        }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-fuchsia-500 rounded-full flex justify-center backdrop-blur-sm bg-black/30">
          <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-fuchsia-500 rounded-full mt-1.5 sm:mt-2 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
