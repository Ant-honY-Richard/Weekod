import { motion } from 'framer-motion';
import { technologies } from '@/lib/data';
import PixelCard from '@/components/ui/PixelCard';
import { useState } from 'react';

// Tech icon component with fallback
const TechIcon = ({ tech }: { tech: any }) => {
  const [imgError, setImgError] = useState(false);
  
  // Map of available logos
  const availableLogos = [
    'react.svg', 'typescript.svg', 'nodejs.svg', 'javascript.svg', 
    'html5-css3.svg', 'php.svg', 'mysql.svg', 'aws.svg', 'figma.svg',
    'react-native.svg', 'shopify.svg', 'wordpress.svg', 'tailwindcss.svg',
    'framer-motion.svg', 'react-query.svg', 'vite.svg', 'express.svg',
    'drizzle-orm.svg', 'neon.svg', 'esbuild.svg', 'postcss.svg',
    'radix-ui.svg', 'lucide-react.svg', 'wouter.svg'
  ];
  
  const logoFileName = tech.icon.split('/').pop();
  const hasLogo = availableLogos.includes(logoFileName);
  
  // Fallback icons for technologies without logos
  const getFallbackIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'Tailwind CSS': '🎨',
      'Framer Motion': '🎬',
      'Wouter': '🛣️',
      'React Query': '🔄',
      'Radix UI': '🧩',
      'Lucide React': '✨',
      'Express.js': '⚡',
      'Drizzle ORM': '🗃️',
      'Neon (PostgreSQL)': '🐘',
      'Vite': '⚡',
      'ESBuild': '📦',
      'PostCSS': '🎨',
      'TSX': '📝'
    };
    return iconMap[name] || '⚙️';
  };

  if (!hasLogo || imgError) {
    return (
      <span className="text-2xl" role="img" aria-label={tech.name}>
        {getFallbackIcon(tech.name)}
      </span>
    );
  }

  return (
    <img
      src={tech.icon}
      alt={tech.name}
      className="w-8 h-8 object-contain"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={() => setImgError(true)}
    />
  );
};

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

  // Define color variants for different technologies
  const getPixelVariant = (index: number) => {
    const variants = ['default', 'blue', 'yellow', 'pink'] as const;
    return variants[index % variants.length];
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 justify-items-center">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PixelCard 
                variant={getPixelVariant(index)}
                className="w-[160px] h-[180px] sm:w-[180px] sm:h-[200px]"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <div className="mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <TechIcon tech={tech} />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-tight">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed overflow-hidden" style={{ 
                    display: '-webkit-box', 
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical' 
                  }}>
                    {tech.description}
                  </p>
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;
