import { motion } from 'framer-motion';

interface TestimonialCardProps {
  name: string;
  position: string;
  company: string;
  content: string;
  rating: number;
}

const TestimonialCard = ({ name, position, company, content, rating }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-dark-800 rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20"
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="flex items-center mb-6">
        <div className="mr-4">
          <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center text-accent-magenta text-2xl">
            {name.charAt(0)}
          </div>
        </div>
        <div>
          <h4 className="text-xl font-display font-semibold">{name}</h4>
          <p className="text-silver">{position}, {company}</p>
        </div>
      </div>
      <div className="text-accent-yellow mb-4 flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg 
            key={index}
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 ${index < rating ? 'text-accent-yellow' : 'text-dark-600'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-silver">
        "{content}"
      </p>
    </motion.div>
  );
};

export default TestimonialCard;
