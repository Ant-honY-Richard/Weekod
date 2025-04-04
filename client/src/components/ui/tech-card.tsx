import { motion } from 'framer-motion';

interface TechCardProps {
  icon: string;
  name: string;
  color: string;
}

const TechCard = ({ icon, name, color }: TechCardProps) => {
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
      className="bg-dark-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-accent-purple/20 hover:-translate-y-2"
      variants={itemVariants}
    >
      <div className="bg-dark-700 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
        <i className={`${icon} text-3xl`} style={{ color }}></i>
      </div>
      <h4 className="font-display font-semibold text-white">{name}</h4>
    </motion.div>
  );
};

export default TechCard;
