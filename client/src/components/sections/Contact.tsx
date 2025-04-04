import { motion } from 'framer-motion';
import { useState, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import GradientText from '@/components/ui/gradient-text';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you as soon as possible.",
        });
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          budget: '',
          message: ''
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 gradient-bg">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Get In <GradientText>Touch</GradientText> With Us
          </h2>
          <p className="text-silver">
            Have a project in mind? Fill out the form below, and we'll get back to you within 24 hours.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="bg-dark-800 rounded-xl p-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-silver mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-silver mb-2">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="company" className="block text-silver mb-2">Company Name</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                />
              </div>
              
              <div>
                <label htmlFor="service" className="block text-silver mb-2">Service Required</label>
                <select 
                  id="service" 
                  name="service" 
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  required
                >
                  <option value="">Select a service</option>
                  <option value="website">Website Design & Development</option>
                  <option value="ecommerce">E-commerce Development</option>
                  <option value="seo">Search Engine Optimization</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="branding">Branding & Identity</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-silver mb-2">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  required
                ></textarea>
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-silver mb-2">Budget Range</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['1000-5000', '5000-10000', '10000-20000', '20000+'].map((range, index) => (
                    <div className="flex items-center" key={index}>
                      <input 
                        type="radio" 
                        id={`budget${index + 1}`} 
                        name="budget" 
                        value={range}
                        onChange={handleInputChange}
                        checked={formData.budget === range}
                        className="hidden peer" 
                      />
                      <label 
                        htmlFor={`budget${index + 1}`} 
                        className="w-full text-center px-4 py-2 bg-dark-700 border border-dark-600 rounded-lg peer-checked:bg-accent-purple peer-checked:text-white cursor-pointer"
                      >
                        ${range.replace('-', '-$').replace('+', '+')}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <motion.button 
                type="submit" 
                className="btn-hover-effect w-full bg-gradient-to-r from-accent-purple to-accent-magenta px-8 py-4 rounded-full text-white font-semibold transition-all hover:shadow-lg hover:shadow-accent-purple/20 flex justify-center items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                {submitting ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {submitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div 
            className="lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Contact Information</h3>
            <p className="text-silver mb-8">
              Whether you're ready to start a project or just want to learn more about our services, we're here to help.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mr-4 text-accent-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-display font-semibold mb-2">Our Location</h4>
                  <p className="text-silver">123 Digital Avenue, Tech City, TC 10101</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mr-4 text-accent-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-display font-semibold mb-2">Email Us</h4>
                  <p className="text-silver">contact@weekod.com</p>
                  <p className="text-silver">support@weekod.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mr-4 text-accent-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-display font-semibold mb-2">Call Us</h4>
                  <p className="text-silver">+1 (555) 123-4567</p>
                  <p className="text-silver">+1 (555) 987-6543</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center mr-4 text-accent-magenta">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xl font-display font-semibold mb-2">Working Hours</h4>
                  <p className="text-silver">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-silver">Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-display font-semibold mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" },
                  { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { icon: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" },
                  { icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center text-silver hover:text-white hover:bg-accent-magenta transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
