// client/src/components/ui/TechCard.tsx
import { motion } from 'framer-motion';
import { useState } from 'react';

interface TechCardProps {
  icon: string;
  name: string;
  color: string;
}

const TechCard = ({ icon, name, color }: TechCardProps) => {
  const [imgError, setImgError] = useState(false);
  const isSvg = icon.endsWith('.svg');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, rotateX: 3, rotateY: 3 }}
      className="relative bg-gray-900/80 rounded-lg p-3 sm:p-4 w-20 sm:w-24 md:w-28 h-24 sm:h-28 md:h-32 text-center transition-all duration-300 shadow-sm hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] overflow-hidden group"
    >
      {/* Gradient Border */}
      <div
        className="absolute inset-0 rounded-lg border border-transparent group-hover:border-opacity-50 transition-opacity duration-300"
        style={{ borderColor: `${color}50` }}
      />

      {/* Icon Container */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mx-auto mb-2 sm:mb-3 flex items-center justify-center rounded-full bg-gray-800/50 shadow-inner shadow-black/30 group-hover:shadow-[0_0_8px_rgba(0,0,0,0.3)]">
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
          className="w-full h-full flex items-center justify-center"
        >
          {isSvg ? (
            imgError ? (
              <i className="fas fa-code text-sm sm:text-base md:text-lg" style={{ color }} />
            ) : (
              <img
                src={icon}
                alt={name}
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 object-contain"
                loading="lazy"
                style={{ filter: 'brightness(0) invert(1)' }}
                onError={() => setImgError(true)}
              />
            )
          ) : (
            <i className={`${icon} text-sm sm:text-base md:text-lg`} style={{ color }} />
          )}
        </motion.div>
      </div>

      {/* Name and Tooltip */}
      <div className="relative">
        <h4 className="text-xs sm:text-sm md:text-base font-semibold text-white truncate">
          {name}
        </h4>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max max-w-[120px] px-2 py-1 text-[10px] sm:text-xs text-white bg-gray-950/90 rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none">
          {name}
        </div>
      </div>
    </motion.div>
  );
};

export default TechCard;