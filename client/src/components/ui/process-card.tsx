import { motion } from 'framer-motion';

interface ProcessCardProps {
  number: number;
  title: string;
  description: string;
}

const ProcessCard = ({ number, title, description }: ProcessCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="relative group"
      variants={itemVariants}
    >
      <div className="absolute -inset-1 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
      <div className="relative bg-dark-800 p-8 rounded-xl">
        <div className="w-16 h-16 bg-dark-700 rounded-full flex items-center justify-center mb-6 text-2xl text-accent-magenta font-display font-bold">{number}</div>
        <h3 className="text-2xl font-display font-semibold mb-4">{title}</h3>
        <p className="text-silver">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default ProcessCard;
