import { motion } from 'framer-motion';
import ProcessCard from '@/components/ui/process-card';
import GradientText from '@/components/ui/gradient-text';
import { processes } from '@/lib/data';

const Process = () => {
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

  return (
    <section id="process" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Our <GradientText>Development</GradientText> Process
          </h2>
          <p className="text-silver">
            We follow a streamlined process to ensure that your website is delivered on time, on budget, and exceeds your expectations.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {processes.map((process, index) => (
            <ProcessCard 
              key={index}
              number={index + 1}
              title={process.title}
              description={process.description}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Process;
