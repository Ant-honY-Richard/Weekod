import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Services', href: 'services' },
  { name: 'Process', href: 'process' },
  { name: 'Testimonials', href: 'testimonials' },
  { name: 'Contact', href: 'contact' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const variants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        duration: 0.4,
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    exit: {
      x: '100%',
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    },
  };

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Menu */}
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="fixed top-0 right-0 w-4/5 max-w-sm h-full z-50 bg-dark-700/60 backdrop-blur-lg shadow-2xl border-l border-white/10 p-6 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <motion.button
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                ✕
              </motion.button>
            </div>

            <motion.ul className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <motion.li
                  key={item.name}
                  variants={itemVariants}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-xl font-semibold text-white hover:text-accent-purple cursor-pointer transition-colors duration-200"
                  onClick={() => handleClick(item.href)}
                >
                  {item.name}
                </motion.li>
              ))}
              <motion.li
                variants={itemVariants}
                whileTap={{ scale: 0.95 }}
                className="pt-4"
              >
              </motion.li>
            </motion.ul>

            {/* Bottom Content */}
            <motion.div
              variants={itemVariants}
              className="mt-auto pt-8 border-t border-white/10"
            >
              <p className="text-silver/80 text-sm">
                Ready to transform your digital presence?
              </p>
              <a
                href="mailto:contact@weekodpro.com"
                className="text-accent-purple hover:text-accent-magenta transition-colors duration-200"
              >
                contact@weekodpro.com
              </a>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
