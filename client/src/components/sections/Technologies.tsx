import { motion } from 'framer-motion';
import { technologies } from '@/lib/data';
import CardSwap, { Card } from '@/components/ui/CardSwap';
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
      <span className="text-3xl" role="img" aria-label={tech.name}>
        {getFallbackIcon(tech.name)}
      </span>
    );
  }

  return (
    <img
      src={tech.icon}
      alt={tech.name}
      className="w-12 h-12 object-contain"
      style={{ filter: 'brightness(0) invert(1)' }}
      onError={() => setImgError(true)}
    />
  );
};

const Technologies = () => {
  // Get featured technologies for the card swap
  const featuredTechs = technologies.slice(0, 6);

  return (
    <section id="technologies" className="py-20 bg-dark-800 relative overflow-hidden">
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

    {/* Left side content */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Cutting-Edge Technologies
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team leverages the latest and most powerful technologies to deliver 
                exceptional digital solutions. From modern frontend frameworks to robust 
                backend systems, we ensure your project is built with the best tools available.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
                    {technologies.slice(6).map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <TechIcon tech={tech} />
                    </div>
                    <span className="text-sm font-medium text-white truncate">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right side - CardSwap */}
          <div className="lg:w-1/2 relative" style={{ height: '600px' }}>
            <CardSwap
              width={400}
              height={300}
              cardDistance={60}
              verticalDistance={70}
              delay={4000}
              pauseOnHover={true}
              easing="elastic"
            >
              {featuredTechs.map((tech, index) => (
                <Card key={tech.name} className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600 shadow-2xl">
                  <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                    <div className="mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                      <TechIcon tech={tech} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {tech.description}
                    </p>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technologies;
