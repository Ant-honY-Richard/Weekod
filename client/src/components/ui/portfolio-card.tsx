import { motion } from 'framer-motion';

interface PortfolioCardProps {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: string;
  link: string;
}

const PortfolioCard = ({ title, subtitle, description, tags, category, link }: PortfolioCardProps) => {
  return (
    <motion.div 
      className="portfolio-item group bg-dark-800 rounded-xl overflow-hidden"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-64 bg-dark-700 object-cover transition-transform duration-500 group-hover:scale-110">
          <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="250" fill="#2D2D2D" />
            <path d="M200 50 L350 125 L200 200 L50 125 Z" fill="#B721FF" fillOpacity="0.2" />
            <path d="M200 75 L300 125 L200 175 L100 125 Z" fill="#FF00C8" fillOpacity="0.3" />
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6">
            <h4 className="text-xl font-display font-semibold text-white mb-2">{subtitle}</h4>
            <p className="text-silver-light">{category}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-silver">{tag}</span>
          ))}
        </div>
        <h3 className="text-xl font-display font-semibold mb-3">{title}</h3>
        <p className="text-silver mb-4">{description}</p>
        <a href={link} className="inline-flex items-center text-accent-magenta hover:text-accent-purple transition-colors">
          View Project 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
};

export default PortfolioCard;
