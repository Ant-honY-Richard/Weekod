import { motion } from 'framer-motion';
import TeamCard from '@/components/ui/team-card';
import GradientText from '@/components/ui/gradient-text';
import { teamMembers } from '@/lib/data';

const Team = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Meet Our <GradientText>Expert</GradientText> Team
          </h2>
          <p className="text-silver">
            Our talented team of professionals is dedicated to bringing your digital vision to life.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member, index) => (
            <TeamCard 
              key={index}
              name={member.name}
              position={member.position}
              socialLinks={member.socialLinks}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
