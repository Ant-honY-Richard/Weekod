// client/src/components/sections/Technology.tsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const technologies = [
  {
    category: 'Frontend',
    items: [
      {
        name: 'React',
        logo: '/tech-logos/react.svg',
        description: 'Building interactive UIs with a component-based architecture',
      },
      {
        name: 'TypeScript',
        logo: '/tech-logos/typescript.svg',
        description: 'Type-safe JavaScript for robust development',
      },
      {
        name: 'Tailwind CSS',
        logo: '/tech-logos/tailwindcss.svg',
        description: 'Utility-first CSS for rapid, responsive styling',
      },
      {
        name: 'Framer Motion',
        logo: '/tech-logos/framer-motion.svg',
        description: 'Smooth animations and transitions',
      },
      {
        name: 'Wouter',
        logo: '/tech-logos/wouter.svg',
        description: 'Lightweight routing for React applications',
      },
      {
        name: 'React Query',
        logo: '/tech-logos/react-query.svg',
        description: 'Efficient data fetching and state management',
      },
      {
        name: 'Radix UI',
        logo: '/tech-logos/radix-ui.svg',
        description: 'Accessible, unstyled UI components',
      },
      {
        name: 'Lucide React',
        logo: '/tech-logos/lucide-react.svg',
        description: 'Beautiful, customizable icons',
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        name: 'Node.js',
        logo: '/tech-logos/nodejs.svg',
        description: 'Server-side JavaScript runtime',
      },
      {
        name: 'Express.js',
        logo: '/tech-logos/express.svg',
        description: 'Fast, minimalist web framework',
      },
      {
        name: 'Drizzle ORM',
        logo: '/tech-logos/drizzle-orm.svg',
        description: 'Type-safe ORM for database operations',
      },
      {
        name: 'Neon (PostgreSQL)',
        logo: '/tech-logos/neon.svg',
        description: 'Serverless PostgreSQL database',
      },
    ],
  },
  {
    category: 'Development Tools',
    items: [
      {
        name: 'Vite',
        logo: '/tech-logos/vite.svg',
        description: 'Next-generation frontend tooling',
      },
      {
        name: 'ESBuild',
        logo: '/tech-logos/esbuild.svg',
        description: 'Ultra-fast JavaScript bundler',
      },
      {
        name: 'PostCSS',
        logo: '/tech-logos/postcss.svg',
        description: 'CSS transformation and processing',
      },
      {
        name: 'TSX',
        logo: '/tech-logos/typescript.svg',
        description: 'Direct TypeScript execution',
      },
    ],
  },
];

export default function Technology() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      id="technology"
      className="py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Technology Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We leverage cutting-edge technologies to build robust and scalable
            solutions that drive your business forward.
          </p>
        </motion.div>

        <div ref={ref} className="space-y-20">
          {technologies.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.7, delay: categoryIndex * 0.2 }}
              className="relative"
            >
              <h3 className="text-2xl font-semibold text-white mb-8 text-center md:text-left">
                {category.category}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-accent-purple/50 transition-all duration-300"
                  >
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent-purple/0 to-accent-magenta/0 group-hover:from-accent-purple/10 group-hover:to-accent-magenta/10 transition-all duration-300" />

                    <div className="relative z-10">
                      <div className="h-16 mb-4 flex items-center justify-center">
                        <img
                          src={tech.logo}
                          alt={`${tech.name} logo`}
                          className="h-12 w-12 object-contain filter brightness-0 invert opacity-80 group-hover:opacity-100 transition-all duration-300"
                          onError={(e) =>
                            (e.currentTarget.src = '/tech-logos/placeholder.svg')
                          }
                        />
                      </div>
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {tech.name}
                      </h4>
                      <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                        {tech.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}