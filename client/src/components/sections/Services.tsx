import { motion } from 'framer-motion';
import ServiceCard from '@/components/ui/service-card';
import GradientText from '@/components/ui/gradient-text';
import { services } from '@/lib/data';

const Services = () => {
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

  return (
    <section id="services" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Premium Digital <GradientText>Services</GradientText> That We Offer
          </h2>
          <p className="text-silver">
            We deliver comprehensive solutions to help brands thrive in the digital landscape, 
            from stunning website design to effective marketing strategies.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
                link={service.link}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
