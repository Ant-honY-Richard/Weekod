import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon, title, description, link }: ServiceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="service-card relative overflow-hidden bg-dark-800 rounded-xl p-8 transition-all duration-300 border border-dark-600 hover:border-accent-purple/30"
      whileHover={{ 
        y: -10,
        boxShadow: "0 10px 25px -5px rgba(183, 33, 255, 0.3), 0 8px 10px -6px rgba(255, 0, 200, 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      {/* Background gradient effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-accent-magenta/5 opacity-0 -z-10"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Icon with shake effect */}
      <motion.div 
        className="service-icon relative z-10 flex items-center justify-center w-16 h-16 rounded-lg bg-dark-700 text-3xl text-silver mb-6"
        initial={{ y: 0 }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.i 
          className={`${icon} ${isHovered ? 'shake-element' : ''}`}
          animate={{ 
            color: isHovered ? '#FF00C8' : '#E0E0E0',
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      
      {/* Content */}
      <motion.h3 
        className="text-2xl font-display font-semibold mb-4"
        animate={{ 
          color: isHovered ? '#FFFFFF' : '#F5F5F5',
        }}
      >
        {title}
      </motion.h3>
      
      <motion.p 
        className="text-silver mb-6"
        animate={{ opacity: isHovered ? 1 : 0.8 }}
      >
        {description}
      </motion.p>
      
      {/* CTA Link */}
      <div className="relative z-10">
        <Link href={link}>
          <motion.div 
            className="inline-flex items-center text-accent-magenta hover:text-accent-purple transition-colors cursor-pointer"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Learn More 
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 ml-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10, 
                repeat: isHovered ? Infinity : 0, 
                repeatType: "reverse" 
              }}
            >
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.div>
        </Link>
      </div>
      
      {/* Corner accent */}
      <motion.div 
        className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-accent-purple to-accent-magenta rounded-full opacity-0 blur-xl"
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ServiceCard;
