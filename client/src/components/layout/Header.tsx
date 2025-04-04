import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import Logo from '@/components/ui/logo';

type HeaderProps = {
  toggleMobileMenu: () => void;
};

const Header = ({ toggleMobileMenu }: HeaderProps) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
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
        scrolled ? 'bg-dark-800 bg-opacity-90 backdrop-blur-md py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-10">
              <Logo />
            </a>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="#services">
              <a className="nav-link text-silver hover:text-white transition-colors">Services</a>
            </Link>
            <Link href="#process">
              <a className="nav-link text-silver hover:text-white transition-colors">Process</a>
            </Link>
            <Link href="#portfolio">
              <a className="nav-link text-silver hover:text-white transition-colors">Portfolio</a>
            </Link>
            <Link href="#testimonials">
              <a className="nav-link text-silver hover:text-white transition-colors">Testimonials</a>
            </Link>
            <Link href="#about">
              <a className="nav-link text-silver hover:text-white transition-colors">About</a>
            </Link>
          </nav>
        </div>
        
        {/* CTA Button */}
        <div className="flex items-center">
          <Link href="#contact">
            <a className="btn-hover-effect bg-gradient-to-r from-accent-purple to-accent-magenta px-6 py-3 rounded-full text-white font-semibold transition-all hover:shadow-lg hover:shadow-accent-purple/20">
              Get Started
            </a>
          </Link>
          {/* Mobile Menu Button */}
          <button 
            className="ml-4 md:hidden text-silver"
            onClick={toggleMobileMenu}
            aria-label="Toggle Mobile Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
