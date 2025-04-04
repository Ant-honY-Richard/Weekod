import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PortfolioCard from '@/components/ui/portfolio-card';
import GradientText from '@/components/ui/gradient-text';
import { portfolioItems, categories } from '@/lib/data';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredItems, setFilteredItems] = useState(portfolioItems);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === 'all') {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(portfolioItems.filter(item => item.category === category));
    }
  };

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Our <GradientText>Featured</GradientText> Projects
          </h2>
          <p className="text-silver">
            Explore our diverse portfolio of successful projects that showcase our expertise and creativity.
          </p>
        </motion.div>
        
        {/* Portfolio Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button 
            className={`px-6 py-2 rounded-full ${activeCategory === 'all' ? 'bg-accent-purple text-white' : 'bg-dark-700 text-silver'} font-semibold transition-all hover:bg-dark-600 hover:text-white`}
            onClick={() => handleCategoryChange('all')}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button 
              key={index}
              className={`px-6 py-2 rounded-full ${activeCategory === category.value ? 'bg-accent-purple text-white' : 'bg-dark-700 text-silver'} font-semibold transition-all hover:bg-dark-600 hover:text-white`}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>
        
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <PortfolioCard 
                  title={item.title}
                  subtitle={item.subtitle}
                  description={item.description}
                  tags={item.tags}
                  category={item.category}
                  link={item.link}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="#" className="btn-hover-effect inline-block bg-gradient-to-r from-accent-purple to-accent-magenta px-8 py-4 rounded-full text-white font-semibold transition-all hover:shadow-lg hover:shadow-accent-purple/20">
            View All Projects
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
