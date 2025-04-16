import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Technologies from "@/components/sections/Technologies";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import CallToAction from "@/components/sections/CallToAction";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";

const Home = () => {
  // Fix for layout shifts - force a reflow after initial load
  useEffect(() => {
    // Force a reflow after the page has loaded
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="hw-accelerated"
      style={{ 
        willChange: 'opacity',
        position: 'relative',
        overflowX: 'hidden'
      }}
    >
      <Hero />
      <Services />
      <Technologies />
      <Process />
      <Portfolio />
      <Testimonials />
      <CallToAction />
      <Contact />
    </motion.div>
  );
};

export default Home;
