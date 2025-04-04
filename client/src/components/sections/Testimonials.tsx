import { useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from '@/components/ui/testimonial-card';
import GradientText from '@/components/ui/gradient-text';
import { testimonials } from '@/lib/data';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 gradient-bg">
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
