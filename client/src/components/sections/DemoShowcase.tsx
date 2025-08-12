import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const DemoShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Create multiple variations of the same demo image with different effects
  const demoVariations = [
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtZescich02_J5iHTX_B9AnfInXEE9zs7ig&s',
      filter: 'brightness(1) contrast(1) saturate(1)',
      scale: 1,
      rotate: 0,
    },
    {
      id: 2,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtZescich02_J5iHTX_B9AnfInXEE9zs7ig&s',
      filter: 'brightness(1.1) contrast(1.2) saturate(1.3)',
      scale: 1.05,
      rotate: 1,
    },
    {
      id: 3,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtZescich02_J5iHTX_B9AnfInXEE9zs7ig&s',
      filter: 'brightness(0.9) contrast(1.3) saturate(0.8) hue-rotate(15deg)',
      scale: 0.95,
      rotate: -1,
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtZescich02_J5iHTX_B9AnfInXEE9zs7ig&s',
      filter: 'brightness(1.2) contrast(1.1) saturate(1.2) sepia(0.1)',
      scale: 1.02,
      rotate: 2,
    },
    {
      id: 5,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBtZescich02_J5iHTX_B9AnfInXEE9zs7ig&s',
      filter: 'brightness(1) contrast(1.4) saturate(1.1) hue-rotate(-10deg)',
      scale: 0.98,
      rotate: -0.5,
    },
  ];

  // Auto-rotate every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % demoVariations.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [demoVariations.length]);

  return (
    <section id="demo-showcase" className="py-20 bg-dark-800 relative overflow-hidden min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="relative w-full max-w-6xl aspect-video">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: -90,
                }}
                animate={{ 
                  opacity: 1, 
                  scale: demoVariations[currentIndex].scale,
                  rotateY: 0,
                  rotate: demoVariations[currentIndex].rotate,
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotateY: 90,
                }}
                transition={{ 
                  duration: 1.2,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  filter: demoVariations[currentIndex].filter,
                }}
              >
                <img
                  src={demoVariations[currentIndex].image}
                  alt="Website Demo"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay effects */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20"
                />
                
                {/* Subtle border glow */}
                <div className="absolute inset-0 border-2 border-white/20 rounded-2xl" />
              </motion.div>
            </AnimatePresence>
            
            {/* Progress indicator */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {demoVariations.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white w-8' 
                      : 'bg-white/30 w-2'
                  }`}
                  layoutId={`progress-${index}`}
                />
              ))}
            </div>
            
            {/* Floating elements for visual interest */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full backdrop-blur-sm"
            />
            
            <motion.div
              animate={{
                y: [0, 15, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
              className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-full backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
    </section>
  );
};

export default DemoShowcase;