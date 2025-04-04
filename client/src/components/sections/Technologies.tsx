import { motion } from 'framer-motion';
import TechCard from '@/components/ui/tech-card';
import GradientText from '@/components/ui/gradient-text';
import { technologies } from '@/lib/data';

const Technologies = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            The <GradientText>Technology</GradientText> We Use
          </h2>
          <p className="text-silver">
            We leverage the latest technologies to deliver high-performance, scalable, and secure websites and applications.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 text-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {technologies.map((tech, index) => (
            <TechCard 
              key={index}
              icon={tech.icon}
              name={tech.name}
              color={tech.color}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
