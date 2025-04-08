import { motion } from 'framer-motion';
import { useState } from 'react';

interface PortfolioCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  link: string;
}

const PortfolioCard = ({ title, subtitle, description, tags, category, link }: PortfolioCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="portfolio-item group bg-dark-800 rounded-xl overflow-hidden border border-dark-700/50 hover:border-accent-purple/30"
      whileHover={{ 
        y: -10, 
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.5), 0 0 10px rgba(183, 33, 255, 0.2)"
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <div className="relative overflow-hidden">
        {/* Portfolio Image/Graphic */}
        <motion.div 
          className="w-full h-64 bg-dark-700 object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
        >
          <motion.svg 
            className="w-full h-full" 
            viewBox="0 0 400 250" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            animate={{ 
              y: isHovered ? [0, -5, 0] : 0 
            }}
            transition={{ 
              duration: 2, 
              repeat: isHovered ? Infinity : 0,
              ease: "easeInOut" 
            }}
          >
            <rect width="400" height="250" fill="#2D2D2D" />
            
            <motion.path 
              d="M200 50 L350 125 L200 200 L50 125 Z" 
              fill="#B721FF" 
              fillOpacity="0.2"
              animate={{ 
                fillOpacity: isHovered ? [0.2, 0.4, 0.2] : 0.2,
                scale: isHovered ? [1, 1.05, 1] : 1,
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.path 
              d="M200 75 L300 125 L200 175 L100 125 Z" 
              fill="#FF00C8" 
              fillOpacity="0.3"
              animate={{ 
                fillOpacity: isHovered ? [0.3, 0.5, 0.3] : 0.3,
                scale: isHovered ? [1, 1.1, 1] : 1,
                rotate: isHovered ? [0, 5, 0] : 0
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
            
            {/* Add some floating particles for enhanced effect when hovered */}
            {isHovered && (
              <>
                <motion.circle 
                  cx="150" 
                  cy="100" 
                  r="5" 
                  fill="#B721FF"
                  fillOpacity="0.6"
                  animate={{ 
                    y: [-10, 10, -10],
                    x: [-5, 5, -5],
                    opacity: [0.6, 0.9, 0.6]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="250" 
                  cy="150" 
                  r="3" 
                  fill="#FF00C8"
                  fillOpacity="0.7"
                  animate={{ 
                    y: [5, -5, 5],
                    x: [3, -3, 3],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.circle 
                  cx="180" 
                  cy="200" 
                  r="4" 
                  fill="#B721FF"
                  fillOpacity="0.5"
                  animate={{ 
                    y: [-8, 8, -8],
                    x: [4, -4, 4],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />
              </>
            )}
          </motion.svg>
        </motion.div>
        
        {/* Overlay with details */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-dark to-transparent flex items-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-6">
            <motion.h4 
              className="text-xl font-display font-semibold text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {subtitle}
            </motion.h4>
            <motion.p 
              className="text-silver-light"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {category}
            </motion.p>
          </div>
        </motion.div>
      </div>
      
      <div className="p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <motion.span 
              key={index} 
              className="px-3 py-1 bg-dark-700 rounded-full text-xs text-silver hover:bg-accent-purple/20 hover:text-white transition-all"
              whileHover={{ y: -3, x: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
        <p className="text-silver mb-4">{description}</p>
        
        {/* CTA */}
        <motion.a 
          href={link} 
          className="inline-flex items-center text-accent-magenta hover:text-accent-purple transition-colors"
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          View Project 
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ 
              duration: 1, 
              repeat: isHovered ? Infinity : 0, 
              ease: "easeInOut" 
            }}
          >
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
