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
    <section id="technologies" className="py-20 bg-dark-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Our Technology Stack
          </h2>
          <p className="text-lg sm:text-xl text-silver max-w-3xl mx-auto">
            We use cutting-edge technologies to build robust and scalable
            applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-dark-700 rounded-xl p-6 sm:p-8 hover:bg-dark-600 transition-all duration-300"
            >
              {/* <div className="text-accent-purple mb-6">{tech.icon}</div> */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {tech.name}
              </h3>
              <p className="text-silver">{tech.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
