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
      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-transparent bg-clip-text animate-aurora bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400"
        >
          Transforming Ideas Into
          <br />
          Digital Reality
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
            className="block mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-medium italic text-transparent bg-clip-text animate-aurora bg-gradient-to-r from-purple-300 via-fuchsia-500 to-pink-400"
          >
            Your Vision, Our Mission
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <ShinyText
            text="We create stunning websites and applications that drive results and elevate your business to new heights."
            disabled={true}
            speed={3}
            className="text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto block"
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
            className="px-8 py-3 text-lg font-semibold rounded-lg bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="#services"
            className="px-8 py-3 text-lg font-semibold rounded-lg border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white transition-all duration-300 transform hover:scale-105"
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
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-fuchsia-500 rounded-full flex justify-center backdrop-blur-sm bg-black/30">
          <div className="w-1 h-3 bg-fuchsia-500 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
