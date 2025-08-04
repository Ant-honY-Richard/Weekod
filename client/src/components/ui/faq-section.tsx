import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GradientText from '@/components/ui/gradient-text';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqItems: FAQItem[] = [
    {
      question: "What services do you offer?",
      answer: "We offer a comprehensive range of digital services including website design and development, e-commerce solutions, mobile app development, UI/UX design, SEO optimization, digital marketing, and branding services. Our team specializes in creating custom solutions tailored to your specific business needs."
    },
    {
      question: "How long does it take to complete a website?",
      answer: "The timeline for website development varies depending on the complexity and scope of the project. A simple landing page might take 1-2 weeks, while a complex e-commerce site or web application could take 2-3 months. During our initial consultation, we'll provide you with a more accurate timeline based on your specific requirements."
    },
    {
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on the scope, complexity, and specific requirements of your project. We offer different packages starting from ₹8,000 for landing pages to ₹75,000+ for full-stack applications. For a detailed quote, please fill out our contact form with your project details."
    },
    {
      question: "Do you offer maintenance and support after the website is launched?",
      answer: "Yes, we provide ongoing maintenance and support services to ensure your website continues to perform optimally. We offer various maintenance packages that include regular updates, security monitoring, performance optimization, content updates, and technical support. We can tailor a maintenance plan to suit your specific needs and budget."
    },
    {
      question: "What is your design process?",
      answer: "Our design process follows a user-centered approach: 1) Discovery - understanding your business, goals, and target audience; 2) Planning - creating sitemaps and wireframes; 3) Design - developing visual mockups and prototypes; 4) Development - building the actual website; 5) Testing - ensuring everything works perfectly; 6) Launch - going live with your new site; 7) Maintenance - providing ongoing support and updates."
    },
    {
      question: "What information do you need to start a project?",
      answer: "To get started, we typically need: 1) Your business information and brand guidelines; 2) Project goals and objectives; 3) Target audience details; 4) Content requirements; 5) Design preferences; 6) Technical requirements; 7) Timeline expectations; 8) Budget parameters. Don't worry if you don't have all of this information ready – we can guide you through the process during our initial consultation."
    }
  ];
  
  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <div className="max-w-4xl mx-auto w-full">
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
          Frequently <GradientText>Asked</GradientText> Questions
        </h2>
        <p className="text-silver text-base md:text-lg">
          Find answers to common questions about our services and process
        </p>
      </motion.div>
      
      <div className="space-y-4">
        {faqItems.map((item, index) => (
          <motion.div 
            key={index}
            className="bg-dark-800 rounded-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <button
              className={`w-full px-6 py-4 text-left flex justify-between items-center ${
                openIndex === index ? 'bg-dark-700' : 'hover:bg-dark-700/50'
              } transition-colors duration-200`}
              onClick={() => toggleQuestion(index)}
            >
              <span className="font-medium text-lg">{item.question}</span>
              <span className={`transform transition-transform duration-200 ${
                openIndex === index ? 'rotate-180' : ''
              }`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 text-accent-magenta" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M19 9l-7 7-7-7" 
                  />
                </svg>
              </span>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 border-t border-dark-600 text-silver">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;