import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Logo from '@/components/ui/logo';

type HeaderProps = {
  toggleMobileMenu: () => void;
};

const Header = ({ toggleMobileMenu }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Check which section is currently visible
      const sections = ['services', 'process', 'portfolio', 'testimonials', 'team', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="w-32">
          <Logo />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center">
          <ul className="flex space-x-1">
            <li>
              <Link href="#services">
                <div className={`px-5 py-2.5 relative group ${activeSection === 'services' ? 'text-white' : 'text-silver'}`}>
                  <div className="nav-item-background absolute inset-0 bg-dark-700/0 rounded-full -z-10 group-hover:bg-dark-700/30 transition-all duration-300"></div>
                  <span className="cursor-pointer font-medium">Services</span>
                  {activeSection === 'services' && (
                    <motion.div 
                      className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-full shadow-glow"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="#process">
                <div className={`px-5 py-2.5 relative group ${activeSection === 'process' ? 'text-white' : 'text-silver'}`}>
                  <div className="nav-item-background absolute inset-0 bg-dark-700/0 rounded-full -z-10 group-hover:bg-dark-700/30 transition-all duration-300"></div>
                  <span className="cursor-pointer font-medium">Process</span>
                  {activeSection === 'process' && (
                    <motion.div 
                      className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-full shadow-glow"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="#portfolio">
                <div className={`px-5 py-2.5 relative group ${activeSection === 'portfolio' ? 'text-white' : 'text-silver'}`}>
                  <div className="nav-item-background absolute inset-0 bg-dark-700/0 rounded-full -z-10 group-hover:bg-dark-700/30 transition-all duration-300"></div>
                  <span className="cursor-pointer font-medium">Portfolio</span>
                  {activeSection === 'portfolio' && (
                    <motion.div 
                      className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-full shadow-glow"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="#testimonials">
                <div className={`px-5 py-2.5 relative group ${activeSection === 'testimonials' ? 'text-white' : 'text-silver'}`}>
                  <div className="nav-item-background absolute inset-0 bg-dark-700/0 rounded-full -z-10 group-hover:bg-dark-700/30 transition-all duration-300"></div>
                  <span className="cursor-pointer font-medium">Testimonials</span>
                  {activeSection === 'testimonials' && (
                    <motion.div 
                      className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-full shadow-glow"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            </li>
            <li>
              <Link href="#team">
                <div className={`px-5 py-2.5 relative group ${activeSection === 'team' ? 'text-white' : 'text-silver'}`}>
                  <div className="nav-item-background absolute inset-0 bg-dark-700/0 rounded-full -z-10 group-hover:bg-dark-700/30 transition-all duration-300"></div>
                  <span className="cursor-pointer font-medium">Team</span>
                  {activeSection === 'team' && (
                    <motion.div 
                      className="h-1 w-full absolute bottom-0 bg-gradient-to-r from-accent-purple to-accent-magenta rounded-full shadow-glow"
                      layoutId="activeNavIndicator"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
        
        {/* CTA Button & Mobile Menu */}
        <div className="flex items-center space-x-4">
          <Link href="#contact">
            <motion.div 
              className="btn-hover-effect cursor-pointer bg-gradient-to-r from-accent-purple to-accent-magenta px-6 py-2.5 rounded-full text-white font-medium shadow-md"
              initial={{ boxShadow: "0 4px 10px rgba(183, 33, 255, 0.2)" }}
              whileHover={{ 
                scale: 1.03,
                textShadow: "0 0 8px rgba(255,255,255,0.8)" 
              }}
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 10
              }}
            >
              <span className="relative z-10">Get in Touch</span>
            </motion.div>
          </Link>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="block md:hidden text-white p-2 rounded-full bg-dark-700/50 backdrop-blur-sm"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
