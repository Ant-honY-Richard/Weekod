import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TestimonialCard from '@/components/ui/testimonial-card';
import GradientText from '@/components/ui/gradient-text';
import { testimonials } from '@/lib/data';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Auto-advance testimonials every 2.5 seconds (faster)
  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 2500);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const nextTestimonial = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Create a continuous loop effect by duplicating some testimonials
  const extendedTestimonials = [...testimonials, ...testimonials.slice(0, 3)];
  const visibleTestimonials = extendedTestimonials.slice(currentIndex, currentIndex + 3);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.5,
      },
    }),
  };

  return (
    <section id="testimonials" className="py-20 gradient-bg overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            What Our <GradientText>Clients</GradientText> Say
          </h2>
          <p className="text-silver">
            Don't just take our word for it. Here's what our clients have to say about their experience working with us.
          </p>
        </motion.div>
        
        {/* Desktop View - Horizontal Moving Cards (Right to Left) */}
        <div className="hidden lg:block relative overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -120 * testimonials.length],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: testimonials.length * 2, // Faster: 2 seconds per testimonial
                ease: "linear",
              },
            }}
          >
            {/* Double the testimonials for seamless loop */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-96"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
              >
                <TestimonialCard 
                  name={testimonial.name}
                  position={testimonial.position}
                  company={testimonial.company}
                  content={testimonial.content}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Progress Indicators - Display Only */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-accent-magenta animate-pulse"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  animationDuration: '1.5s',
                }}
              />
            ))}
          </div>
        </div>

        {/* Mobile/Tablet View - Horizontal Scrolling Animation */}
        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -100 * testimonials.length],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: testimonials.length * 2, // Faster: 2 seconds per testimonial
                  ease: "linear",
                },
              }}
              style={{
                width: `${testimonials.length * 100}%`,
              }}
            >
              {/* Double the testimonials for seamless loop */}
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 mx-2"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: (index % testimonials.length) * 0.1 }}
                >
                  <TestimonialCard 
                    name={testimonial.name}
                    position={testimonial.position}
                    company={testimonial.company}
                    content={testimonial.content}
                    rating={testimonial.rating}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Progress Indicator for Mobile */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-dark-600 animate-pulse"
                style={{
                  animationDelay: `${index * 0.5}s`,
                  animationDuration: '2s',
                }}
              />
            ))}
          </div>

          {/* Tablet View - Faster Animation */}
          <div className="md:block hidden">
            <motion.div
              className="flex gap-8 mt-8"
              animate={{
                x: [0, -120 * Math.ceil(testimonials.length / 2)],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: Math.ceil(testimonials.length / 2) * 2.5, // Faster: 2.5 seconds per pair
                  ease: "linear",
                },
              }}
            >
              {/* Show 2 cards at once on tablet */}
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, pairIndex) => (
                <div key={pairIndex} className="flex gap-8 flex-shrink-0">
                  {testimonials.slice(pairIndex * 2, pairIndex * 2 + 2).map((testimonial, index) => (
                    <div key={index} className="w-80">
                      <TestimonialCard 
                        name={testimonial.name}
                        position={testimonial.position}
                        company={testimonial.company}
                        content={testimonial.content}
                        rating={testimonial.rating}
                      />
                    </div>
                  ))}
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, pairIndex) => (
                <div key={`duplicate-${pairIndex}`} className="flex gap-8 flex-shrink-0">
                  {testimonials.slice(pairIndex * 2, pairIndex * 2 + 2).map((testimonial, index) => (
                    <div key={index} className="w-80">
                      <TestimonialCard 
                        name={testimonial.name}
                        position={testimonial.position}
                        company={testimonial.company}
                        content={testimonial.content}
                        rating={testimonial.rating}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
