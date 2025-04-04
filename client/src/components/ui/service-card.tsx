import { motion } from 'framer-motion';
import { Link } from 'wouter';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
}

const ServiceCard = ({ icon, title, description, link }: ServiceCardProps) => {
  return (
    <motion.div 
      className="service-card bg-dark-800 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20"
      whileHover={{ y: -10 }}
    >
      <motion.div 
        className="service-icon text-4xl text-silver mb-6 transition-all duration-300"
        initial={{ y: 0 }}
        whileHover={{ y: -10, color: '#FF00C8' }}
      >
        <i className={icon}></i>
      </motion.div>
      <h3 className="text-2xl font-display font-semibold mb-4">{title}</h3>
      <p className="text-silver mb-6">
        {description}
      </p>
      <Link href={link}>
        <a className="inline-flex items-center text-accent-magenta hover:text-accent-purple transition-colors">
          Learn More 
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </Link>
    </motion.div>
  );
};

export default ServiceCard;
