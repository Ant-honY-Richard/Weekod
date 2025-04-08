import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface NeonTextProps {
  children: ReactNode;
  className?: string;
  color?: 'purple' | 'magenta' | 'blue';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  glow?: 'sm' | 'md' | 'lg';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const NeonText = ({ 
  children, 
  className = "", 
  color = 'purple',
  size = 'lg',
  glow = 'md',
  as: Component = 'span'
}: NeonTextProps) => {
  
  const getColorClasses = () => {
    switch (color) {
      case 'purple':
        return 'text-accent-purple';
      case 'magenta':
        return 'text-accent-magenta';
      case 'blue':
        return 'text-accent-blue';
      default:
        return 'text-accent-purple';
    }
  };
  
  const getShadowClasses = () => {
    const shadowColor = {
      'purple': 'text-shadow-purple',
      'magenta': 'text-shadow-magenta',
      'blue': 'text-shadow-blue',
    }[color];
    
    const shadowSize = {
      'sm': 'text-shadow-sm',
      'md': 'text-shadow-md',
      'lg': 'text-shadow-lg',
    }[glow];
    
    return `${shadowColor} ${shadowSize}`;
  };

  const getSizeClasses = () => {
    return {
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
    }[size] || 'text-lg';
  };

  const pulseAnimation = {
    textShadow: ['0 0 4px currentColor, 0 0 8px currentColor', '0 0 7px currentColor, 0 0 15px currentColor', '0 0 4px currentColor, 0 0 8px currentColor'],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.span
      className={`font-display font-bold ${getColorClasses()} ${getShadowClasses()} ${getSizeClasses()} ${className}`}
      animate={pulseAnimation}
    >
      <Component>{children}</Component>
    </motion.span>
  );
};

export default NeonText;