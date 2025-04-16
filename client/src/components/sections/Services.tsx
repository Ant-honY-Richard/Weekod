import { motion } from "framer-motion";
import { services } from "@/data/data";
import SectionContainer from "@/components/ui/SectionContainer";

const Services = () => {
  return (
    <SectionContainer id="services" className="py-20 bg-dark-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
          Our Services
        </h2>
        <p className="text-lg sm:text-xl text-silver max-w-3xl mx-auto">
          We offer a comprehensive range of web development services to help your
          business thrive in the digital world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-dark-800 rounded-xl p-6 sm:p-8 hover:bg-dark-700 transition-all duration-300"
            style={{ 
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-lg flex items-center justify-center mb-6">
              <service.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {service.title}
            </h3>
            <p className="text-silver mb-6">{service.description}</p>
            <ul className="space-y-2">
              {service.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center text-silver">
                  <svg
                    className="w-5 h-5 text-accent-purple mr-2 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Services;
