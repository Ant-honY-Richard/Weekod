import { motion } from 'framer-motion';
import React, { useState, FormEvent, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import GradientText from '@/components/ui/gradient-text';
import BudgetCalculator from '@/components/ui/budget-calculator';
import FAQSection from '@/components/ui/faq-section';

// Import necessary components and hooks

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  // Budget calculator state
  const [budgetData, setBudgetData] = useState({
    total: 0,
    totalDays: 0,
    selectedType: '',
    complexity: '',
    selectedFeatures: [] as string[],
    selectedSupport: '',
    projectSummary: '',
    estimatedDeliveryDate: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const budgetCalculatorRef = useRef<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === 'application/pdf') {
        setPdfFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    }
  };

  // Function to get budget calculator data only when needed
  const getBudgetData = () => {
    if (budgetCalculatorRef.current && typeof budgetCalculatorRef.current.getCalculatorData === 'function') {
      // Only get the data when explicitly called (on form submission)
      const data = budgetCalculatorRef.current.getCalculatorData();
      setBudgetData(data);
      return data;
    }
    return budgetData;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    console.log("Form submission started", formData);

    try {
      // Validate required form fields
      if (!formData.name || !formData.email || !formData.message) {
        toast({
          title: "Missing Information",
          description: "Please fill in your name, email, and message.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }
      
      // Get latest budget calculator data only when submitting the form
      const calculatorData = getBudgetData();
      console.log("Budget calculator data:", calculatorData);
      
      // Validate budget calculator data
      if (!calculatorData.selectedType) {
        toast({
          title: "Budget Information Required",
          description: "Please complete the budget calculator before submitting.",
          variant: "destructive",
        });
        setSubmitting(false);
        return;
      }
      
      // Create FormData object to handle file upload
      const formDataObj = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
        console.log(`Adding form field: ${key} = ${value}`);
      });
      
      // Add budget calculator data
      formDataObj.append('budget', calculatorData.total.toString());
      formDataObj.append('estimatedTimeline', calculatorData.totalDays.toString());
      formDataObj.append('estimatedDeliveryDate', calculatorData.estimatedDeliveryDate);
      console.log("Added budget data:", calculatorData.total, calculatorData.totalDays, calculatorData.estimatedDeliveryDate);
      
      // Create project summary from calculator data
      const projectSummary = JSON.stringify({
        websiteType: calculatorData.selectedType,
        complexity: calculatorData.complexity,
        features: calculatorData.selectedFeatures,
        supportPlan: calculatorData.selectedSupport,
        total: calculatorData.total,
        timeline: calculatorData.totalDays
      });
      
      formDataObj.append('projectSummary', projectSummary);
      console.log("Added project summary:", projectSummary);
      
      // Add PDF file if it exists
      if (pdfFile) {
        formDataObj.append('projectDocument', pdfFile);
        console.log("Added PDF file:", pdfFile.name);
      }

      console.log("Sending data to backend...");
      // Only send data to backend when form is submitted
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataObj,
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
          message: ''
        });
        
        // Reset budget calculator if possible
        if (budgetCalculatorRef.current && typeof budgetCalculatorRef.current.resetCalculator === 'function') {
          budgetCalculatorRef.current.resetCalculator();
        }
        setPdfFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
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
    <section id="contact" className="py-20 md:py-24 lg:py-28 gradient-bg w-full overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6 w-full">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Get In <GradientText>Touch</GradientText> With Us
          </h2>
          <p className="text-silver text-base md:text-lg">
            Have a project in mind? Fill out the form below, and we'll get back to you within 24 hours.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-screen-xl mx-auto w-full">
          {/* Contact Form */}
          <motion.div 
            className="bg-dark-800 rounded-xl p-4 md:p-6 shadow-lg w-full"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-silver mb-1 text-sm">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-silver mb-1 text-sm">Your Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-silver mb-1 text-sm">Company Name</label>
                  <input 
                    type="text" 
                    id="company" 
                    name="company" 
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-silver mb-1 text-sm">Service Required</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
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
              </div>
              
              <div>
                <label htmlFor="message" className="block text-silver mb-1 text-sm">Project Details</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={3} 
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-dark-700 border border-dark-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-accent-purple"
                  required
                ></textarea>
                <div className="mt-1">
                  {["Perfect for product launches", "Events or promotions", "Simple business presence", "E-commerce solutions", "Custom web applications"].map((text, index) => (
                    <motion.span 
                      key={index}
                      className="inline-block text-xs bg-dark-600 text-silver-dark rounded-full px-2 py-0.5 mr-2 mb-2 cursor-help"
                      whileHover={{ 
                        backgroundColor: "rgba(124, 58, 237, 0.2)", 
                        color: "#ffffff",
                        scale: 1.05
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {text}
                    </motion.span>
                  ))}
                </div>
              </div>
              
              {/* PDF Upload Field */}
              <div>
                <label className="block text-silver mb-1 text-sm">
                  Project Document (PDF)
                </label>
                <div className="flex items-center justify-center w-full">
                  <label 
                    htmlFor="projectDocument" 
                    className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed rounded-lg cursor-pointer bg-dark-700 border-dark-600 hover:border-accent-purple transition-colors"
                  >
                    <div className="flex items-center justify-center p-2">
                      <svg 
                        className="w-5 h-5 mr-2 text-silver" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        ></path>
                      </svg>
                      <div>
                        <p className="text-xs text-silver">
                          <span className="font-semibold">Click to upload</span> PDF (MAX. 10MB)
                        </p>
                        {pdfFile && (
                          <p className="text-xs text-accent-magenta font-medium truncate max-w-[200px]">
                            {pdfFile.name}
                          </p>
                        )}
                      </div>
                    </div>
                    <input 
                      id="projectDocument" 
                      type="file" 
                      accept=".pdf" 
                      className="hidden" 
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-silver mb-2 text-sm font-medium">Budget Calculator</label>
                
                {/* Budget Calculator */}
                <div className="w-full bg-dark-800/50 rounded-lg p-3 shadow-lg">
                  <BudgetCalculator ref={budgetCalculatorRef} />
                </div>
              </div>
              
              <motion.button 
                type="submit" 
                className="btn-hover-effect w-full bg-gradient-to-r from-accent-purple to-accent-magenta px-6 py-3 rounded-full text-white font-medium text-sm transition-all hover:shadow-lg hover:shadow-accent-purple/20 flex justify-center items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={submitting}
              >
                {submitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : null}
                {submitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Right Column: Contact Info + FAQ */}
          <div className="space-y-8 w-full">
            {/* Contact Info */}
            <motion.div 
              className="p-6 md:p-8 bg-dark-800/50 rounded-xl lg:pl-8 shadow-lg w-full"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-xl font-display font-semibold mb-4">Contact Information</h3>
              <p className="text-silver text-sm mb-6">
                Whether you're ready to start a project or just want to learn more about our services, we're here to help.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center mr-3 text-accent-magenta shadow-lg shadow-accent-magenta/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Email Us</h4>
                    <a href="mailto:info@weekod.com" className="text-accent-magenta hover:underline text-sm">info@weekod.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center mr-3 text-accent-magenta shadow-lg shadow-accent-magenta/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Call Us</h4>
                    <div className="flex flex-col">
                      <a href="tel:+917899242883" className="text-accent-magenta hover:underline text-sm">(+91) 78992 42883</a>
                      <a href="tel:+918884460329" className="text-accent-magenta hover:underline text-sm">(+91) 88844 60329</a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-dark-700 rounded-full flex items-center justify-center mr-3 text-accent-magenta shadow-lg shadow-accent-magenta/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium">Location</h4>
                    <p className="text-silver text-sm">123 Tech Street, San Francisco, CA 94107</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-dark-600">
                <h4 className="text-white text-sm font-medium mb-3">Follow Us</h4>
                <div className="flex space-x-3">
                  <a href="#" className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center text-silver hover:text-accent-magenta transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center text-silver hover:text-accent-magenta transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center text-silver hover:text-accent-magenta transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 bg-dark-700 rounded-full flex items-center justify-center text-silver hover:text-accent-magenta transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* FAQ Section */}
            <motion.div
              className="bg-dark-800/50 rounded-xl p-4 md:p-6 shadow-lg w-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-xl font-display font-semibold mb-4">Frequently Asked </h3>
              <FAQSection compact={true} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;