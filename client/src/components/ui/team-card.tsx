import { motion } from 'framer-motion';

interface SocialLink {
  platform: string;
  url: string;
}

interface TeamCardProps {
  name: string;
  position: string;
  socialLinks: SocialLink[];
}

const TeamCard = ({ name, position, socialLinks }: TeamCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z";
      case 'twitter':
        return "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z";
      case 'email':
        return "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z";
      default:
        return "";
    }
  };

  return (
    <motion.div 
      className="group relative"
      variants={itemVariants}
    >
      <div className="relative overflow-hidden rounded-xl">
        <div className="w-full h-80 bg-dark-700 object-cover transition-transform duration-500 group-hover:scale-110">
          <svg className="w-full h-full" viewBox="0 0 400 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="500" fill="#2D2D2D" />
            <path d="M200 100 L300 200 L200 300 L100 200 Z" fill="#B721FF" fillOpacity="0.2" />
            <circle cx="200" cy="175" r="50" fill="#FF00C8" fillOpacity="0.3" />
          </svg>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-6 w-full">
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center text-silver hover:text-white hover:bg-accent-magenta transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d={getSocialIcon(link.platform)} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center mt-6">
        <h3 className="text-xl font-display font-semibold">{name}</h3>
        <p className="text-accent-magenta">{position}</p>
      </div>
    </motion.div>
  );
};

export default TeamCard;
