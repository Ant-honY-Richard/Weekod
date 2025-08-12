import { motion } from "framer-motion";
import { services } from "@/data/data";
import SectionContainer from "@/components/ui/SectionContainer";
import PixelCard from "@/components/ui/PixelCard";

const Services = () => {
  // Define different variants for each service
  const getPixelVariant = (index: number) => {
    const variants = ['blue', 'pink', 'yellow'] as const;
    return variants[index % variants.length];
  };

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
          We offer a comprehensive range of development services to help your
          business and academic projects thrive in the digital world.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 justify-items-center">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <PixelCard 
              variant={getPixelVariant(index)}
              className="w-[350px] h-[450px] sm:w-[380px] sm:h-[480px]"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                {/* Icon */}
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 shadow-lg">
                  <service.icon className="w-10 h-10 text-white" />
                </div>
                
                {/* Title */}
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed text-base sm:text-lg">
                  {service.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-3 w-full">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-300 text-base sm:text-lg">
                      <svg
                        className="w-5 h-5 text-green-400 mr-3 flex-shrink-0"
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
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </PixelCard>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

export default Services;
