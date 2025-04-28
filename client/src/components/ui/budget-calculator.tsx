import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureOption {
  id: string;
  label: string;
  price: number;
  description: string;
  icon: string;
  days: number;
}

interface WebsiteType {
  value: string;
  label: string;
  basePrice: number;
  baseDays: number;
  icon: string;
  description: string;
}

interface SupportOption {
  id: string;
  label: string;
  price: number;
  description: string;
  duration: string;
  icon: string;
}

interface BudgetCalculatorProps {
  ref?: React.RefObject<any>;
}

const BudgetCalculator = React.forwardRef<any, BudgetCalculatorProps>((props, ref) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [basePrice, setBasePrice] = useState<number>(8000);
  const [baseDays, setBaseDays] = useState<number>(7);
  const [complexity, setComplexity] = useState<'simple' | 'medium' | 'complex'>('simple');
  const [activeTab, setActiveTab] = useState<'type' | 'complexity' | 'features' | 'support'>('type');
  const [selectedType, setSelectedType] = useState<string>('landing');
  const [selectedSupport, setSelectedSupport] = useState<string>('free');
  const [isCalculating, setIsCalculating] = useState(false);
  
  const websiteTypes: WebsiteType[] = [
    { 
      value: 'landing', 
      label: 'Landing Page', 
      basePrice: 8000, 
      baseDays: 7,
      icon: '🚀',
      description: 'Perfect for product launches, events, or simple business presence'
    },
    { 
      value: 'business', 
      label: 'Business Website', 
      basePrice: 20000, 
      baseDays: 14,
      icon: '💼',
      description: 'Comprehensive multi-page site for established businesses'
    },
    { 
      value: 'ecommerce', 
      label: 'E-commerce', 
      basePrice: 50000, 
      baseDays: 30,
      icon: '🛒',
      description: 'Full-featured online store with product management'
    },
    { 
      value: 'webapp', 
      label: 'Web Application', 
      basePrice: 75000, 
      baseDays: 45,
      icon: '⚙️',
      description: 'Custom web app with advanced functionality and user accounts'
    },
  ];
  
  const featureOptions: FeatureOption[] = [
    { id: 'responsive', label: 'Responsive Design', price: 2000, days: 3, icon: '📱', description: 'Optimized for all devices and screen sizes' },
    { id: 'cms', label: 'Content Management', price: 5000, days: 5, icon: '📝', description: 'Easy content updates without coding knowledge' },
    { id: 'seo', label: 'SEO Optimization', price: 3000, days: 4, icon: '🔍', description: 'Search engine friendly with structured data' },
    { id: 'analytics', label: 'Analytics Integration', price: 1500, days: 2, icon: '📊', description: 'Track user behavior and conversion metrics' },
    { id: 'payment', label: 'Payment Processing', price: 4000, days: 5, icon: '💳', description: 'Secure payment gateway integration' },
    { id: 'multilingual', label: 'Multilingual Support', price: 3500, days: 4, icon: '🌐', description: 'Support for multiple languages and regions' },
    { id: 'auth', label: 'User Authentication', price: 4500, days: 6, icon: '🔐', description: 'Secure login system with role management' },
    { id: 'api', label: 'API Integration', price: 6000, days: 7, icon: '🔌', description: 'Connect with third-party services and data' },
    { id: 'ai', label: 'AI Features', price: 8000, days: 8, icon: '🤖', description: 'Intelligent automation and personalization' },
    { id: 'chat', label: 'Live Chat', price: 3000, days: 3, icon: '💬', description: 'Real-time customer support integration' },
  ];
  
  const supportOptions: SupportOption[] = [
    { 
      id: 'free', 
      label: 'Free One Month Support', 
      price: 0, 
      description: 'Basic support for the first month after deployment', 
      duration: '1 month',
      icon: '🔧'
    },
    { 
      id: 'three-months', 
      label: 'Three Months Support', 
      price: 5000, 
      description: 'Extended support for three months with priority response', 
      duration: '3 months',
      icon: '🛠️'
    },
    { 
      id: 'six-months', 
      label: 'Six Months Support', 
      price: 9000, 
      description: 'Comprehensive support package for half a year', 
      duration: '6 months',
      icon: '⚙️'
    },
    { 
      id: 'one-year', 
      label: 'One Year Support', 
      price: 15000, 
      description: 'Complete annual support with dedicated support team', 
      duration: '12 months',
      icon: '🛡️'
    },
  ];
  
  const complexityOptions = [
    { value: 'simple', label: 'Simple', multiplier: 1, daysMultiplier: 1, description: 'Basic implementation with standard features' },
    { value: 'medium', label: 'Medium', multiplier: 1.5, daysMultiplier: 1.3, description: 'Advanced features with custom styling' },
    { value: 'complex', label: 'Complex', multiplier: 2, daysMultiplier: 1.7, description: 'Highly customized with unique functionality' }
  ];
  
  const complexityMultiplier = {
    simple: 1,
    medium: 1.5,
    complex: 2
  };
  
  const daysMultiplier = {
    simple: 1,
    medium: 1.3,
    complex: 1.7
  };
  
  const handleWebsiteTypeChange = (typeValue: string) => {
    const selected = websiteTypes.find(type => type.value === typeValue);
    if (selected) {
      setSelectedType(typeValue);
      setBasePrice(selected.basePrice);
      setBaseDays(selected.baseDays);
      
      // Automatically move to next tab after selection
      setTimeout(() => {
        setActiveTab('complexity');
      }, 500);
    }
  };
  
  const handleFeatureToggle = (featureId: string) => {
    setSelectedFeatures(prev => 
      prev.includes(featureId) 
        ? prev.filter(id => id !== featureId)
        : [...prev, featureId]
    );
    
    // Trigger calculation animation
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 800);
  };
  
  const handleComplexityChange = (value: 'simple' | 'medium' | 'complex') => {
    setComplexity(value);
    
    // Automatically move to next tab after selection
    setTimeout(() => {
      setActiveTab('features');
    }, 500);
    
    // Trigger calculation animation
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 800);
  };
  
  const handleSupportChange = (supportId: string) => {
    setSelectedSupport(supportId);
    
    // Trigger calculation animation
    setIsCalculating(true);
    setTimeout(() => setIsCalculating(false), 800);
  };
  
  const calculateTotal = () => {
    const featuresTotal = selectedFeatures.reduce((sum, featureId) => {
      const feature = featureOptions.find(f => f.id === featureId);
      return sum + (feature?.price || 0);
    }, 0);
    
    const supportPrice = supportOptions.find(s => s.id === selectedSupport)?.price || 0;
    
    return Math.round((basePrice + featuresTotal) * complexityMultiplier[complexity] + supportPrice);
  };
  
  const calculateDays = () => {
    const featuresDays = selectedFeatures.reduce((sum, featureId) => {
      const feature = featureOptions.find(f => f.id === featureId);
      return sum + (feature?.days || 0);
    }, 0);
    
    return Math.round((baseDays + featuresDays) * daysMultiplier[complexity]);
  };
  
  const total = calculateTotal();
  const totalDays = calculateDays();
  
  // Determine delivery date
  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + totalDays);
    return deliveryDate.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Progress calculation
  const calculateProgress = () => {
    if (activeTab === 'type') return 25;
    if (activeTab === 'complexity') return 50;
    if (activeTab === 'features') return 75;
    return 100;
  };
  
  const progressPercent = calculateProgress();
  
  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    getCalculatorData: () => {
      // Return the current calculator data
      return {
        total,
        totalDays,
        selectedType,
        complexity,
        selectedFeatures,
        selectedSupport,
        estimatedDeliveryDate: getDeliveryDate()
      };
    },
    resetCalculator: () => {
      // Reset all calculator values
      setSelectedType('landing');
      setComplexity('simple');
      setSelectedFeatures([]);
      setSelectedSupport('free');
      setActiveTab('type');
    }
  }));
  
  return (
    <div className="bg-dark-800/80 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-dark-600/50 relative overflow-hidden w-full">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent-purple/20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-accent-magenta/20 blur-3xl"></div>
      </div>
      
      {/* Progress bar */}
      <div className="relative mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-silver-dark">Project Configuration</span>
          <span className="text-xs font-medium text-accent-magenta">{progressPercent}%</span>
        </div>
        <div className="h-1.5 w-full bg-dark-700 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-accent-purple to-accent-magenta"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-2">
          <div className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeTab === 'type' || activeTab === 'complexity' || activeTab === 'features' || activeTab === 'support'
                  ? 'bg-accent-purple text-white' 
                  : 'bg-dark-700 text-silver'
              }`}
            >
              1
            </div>
            <span className="text-xs mt-1 text-silver">Type</span>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeTab === 'complexity' || activeTab === 'features' || activeTab === 'support'
                  ? 'bg-accent-purple text-white' 
                  : 'bg-dark-700 text-silver'
              }`}
            >
              2
            </div>
            <span className="text-xs mt-1 text-silver">Complexity</span>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeTab === 'features' || activeTab === 'support'
                  ? 'bg-accent-purple text-white' 
                  : 'bg-dark-700 text-silver'
              }`}
            >
              3
            </div>
            <span className="text-xs mt-1 text-silver">Features</span>
          </div>
          <div className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                activeTab === 'support'
                  ? 'bg-accent-purple text-white' 
                  : 'bg-dark-700 text-silver'
              }`}
            >
              4
            </div>
            <span className="text-xs mt-1 text-silver">Support</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Tab navigation */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('type')}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              activeTab === 'type' 
                ? 'bg-accent-purple text-white' 
                : 'bg-dark-700 text-silver hover:bg-dark-600'
            }`}
          >
            <span className={activeTab === 'type' ? 'bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-magenta font-bold' : ''}>
              Type
            </span>
          </button>
          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              activeTab === 'complexity' 
                ? 'bg-accent-purple text-white' 
                : 'bg-dark-700 text-silver hover:bg-dark-600'
            }`}
          >
            <span className={activeTab === 'complexity' ? 'bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-magenta font-bold' : ''}>
              Complexity
            </span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              activeTab === 'features' 
                ? 'bg-accent-purple text-white' 
                : 'bg-dark-700 text-silver hover:bg-dark-600'
            }`}
          >
            <span className={activeTab === 'features' ? 'bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-magenta font-bold' : ''}>
              Features
            </span>
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`px-4 py-2 text-sm rounded-lg transition-all ${
              activeTab === 'support' 
                ? 'bg-accent-purple text-white' 
                : 'bg-dark-700 text-silver hover:bg-dark-600'
            }`}
          >
            <span className={activeTab === 'support' ? 'bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-magenta font-bold' : ''}>
              Support
            </span>
          </button>
        </div>
        
        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'type' && (
            <motion.div
              key="type-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white">Select Website Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {websiteTypes.map((type) => (
                  <motion.div
                    key={type.value}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl overflow-hidden ${
                      selectedType === type.value 
                        ? 'ring-2 ring-accent-purple shadow-lg shadow-accent-purple/20' 
                        : 'border border-dark-600 hover:border-dark-500'
                    }`}
                    onClick={() => handleWebsiteTypeChange(type.value)}
                  >
                    <div className="p-5 bg-dark-700/50 backdrop-blur-sm">
                      <div className="flex items-center mb-3">
                        <div className="text-2xl mr-3">{type.icon}</div>
                        <div>
                          <h4 className="font-medium text-white">{type.label}</h4>
                          <p className="text-accent-magenta font-medium">₹{type.basePrice.toLocaleString()}</p>
                        </div>
                        
                        {selectedType === type.value && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-accent-purple rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-silver-dark">{type.description}</p>
                      
                      <div className="mt-3 text-xs text-silver flex items-center">
                        <svg className="w-4 h-4 mr-1 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Estimated: {type.baseDays} days
                      </div>
                    </div>
                    
                    {/* Highlight effect when selected */}
                    {selectedType === type.value && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-end mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-accent-purple text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('complexity')}
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'complexity' && (
            <motion.div
              key="complexity-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white">Select Project Complexity</h3>
              <p className="text-sm text-silver-dark mb-4">
                The complexity level affects both the cost and development time of your project.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {complexityOptions.map((option) => (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl overflow-hidden ${
                      complexity === option.value 
                        ? 'ring-2 ring-accent-purple shadow-lg shadow-accent-purple/20' 
                        : 'border border-dark-600 hover:border-dark-500'
                    }`}
                    onClick={() => handleComplexityChange(option.value as 'simple' | 'medium' | 'complex')}
                  >
                    <div className="p-5 bg-dark-700/50 backdrop-blur-sm">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-dark-600 flex items-center justify-center mr-3">
                          {option.value === 'simple' && (
                            <svg className="w-5 h-5 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                          )}
                          {option.value === 'medium' && (
                            <svg className="w-5 h-5 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          )}
                          {option.value === 'complex' && (
                            <svg className="w-5 h-5 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{option.label}</h4>
                          <p className="text-xs text-accent-magenta">
                            {option.multiplier}x multiplier
                          </p>
                        </div>
                        
                        {complexity === option.value && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-accent-purple rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-silver-dark">{option.description}</p>
                      
                      <div className="mt-3 text-xs text-silver">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Cost: {option.multiplier}x
                        </div>
                        <div className="flex items-center mt-1">
                          <svg className="w-4 h-4 mr-1 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Time: {option.daysMultiplier}x
                        </div>
                      </div>
                    </div>
                    
                    {/* Highlight effect when selected */}
                    {complexity === option.value && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-dark-700 text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('type')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-accent-purple text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('features')}
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'features' && (
            <motion.div
              key="features-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white">Select Additional Features</h3>
              <p className="text-sm text-silver-dark mb-4">
                Customize your project with these additional features.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {featureOptions.map((feature, index) => (
                  <motion.div 
                    key={feature.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedFeatures.includes(feature.id)
                        ? 'border-accent-purple bg-dark-700/70 shadow-lg shadow-accent-purple/20'
                        : 'border-dark-600 bg-dark-800/50 hover:border-dark-500'
                    }`}
                    onClick={() => handleFeatureToggle(feature.id)}
                    whileHover={{ y: -3, boxShadow: '0 15px 30px -5px rgba(124, 58, 237, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    layout
                  >
                    <div className="p-4 relative overflow-hidden">
                      {/* Background glow effect when selected */}
                      {selectedFeatures.includes(feature.id) && (
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      
                      <div className="flex items-center relative z-10">
                        <motion.div 
                          className={`w-10 h-10 rounded-lg mr-3 flex items-center justify-center text-lg ${
                            selectedFeatures.includes(feature.id)
                              ? 'bg-accent-purple/30 text-white'
                              : 'bg-dark-700 text-silver'
                          }`}
                          animate={{ 
                            scale: selectedFeatures.includes(feature.id) ? [1, 1.1, 1] : 1,
                            backgroundColor: selectedFeatures.includes(feature.id) ? 'rgba(124, 58, 237, 0.3)' : 'rgba(31, 41, 55, 1)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {feature.icon}
                          
                          {/* Ripple effect when selected */}
                          {selectedFeatures.includes(feature.id) && (
                            <motion.div 
                              className="absolute inset-0 rounded-lg bg-accent-purple/20"
                              initial={{ scale: 0, opacity: 1 }}
                              animate={{ scale: 1.5, opacity: 0 }}
                              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                            />
                          )}
                        </motion.div>
                        
                        <div className="flex-1">
                          <div className="font-medium text-white flex items-center justify-between">
                            <motion.span
                              animate={{ 
                                color: selectedFeatures.includes(feature.id) ? '#ffffff' : '#e5e7eb'
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              {feature.label}
                            </motion.span>
                            <motion.span 
                              className="text-accent-magenta text-sm font-medium"
                              animate={{ 
                                scale: selectedFeatures.includes(feature.id) ? [1, 1.1, 1] : 1,
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              +₹{feature.price.toLocaleString()}
                            </motion.span>
                          </div>
                          <div className="text-xs text-silver-dark mt-1">{feature.description}</div>
                          <div className="text-xs text-silver mt-1 flex items-center">
                            <svg className="w-3 h-3 mr-1 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            +{feature.days} days
                          </div>
                        </div>
                        
                        <motion.div 
                          className={`w-6 h-6 rounded-full ml-2 flex items-center justify-center ${
                            selectedFeatures.includes(feature.id)
                              ? 'bg-accent-purple'
                              : 'bg-dark-600'
                          }`}
                          animate={{ 
                            scale: selectedFeatures.includes(feature.id) ? [1, 1.2, 1] : 1,
                            backgroundColor: selectedFeatures.includes(feature.id) ? 'rgb(124, 58, 237)' : 'rgba(31, 41, 55, 1)'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {selectedFeatures.includes(feature.id) && (
                            <motion.svg 
                              className="w-3 h-3 text-white" 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1, rotate: [0, 10, 0] }}
                              transition={{ duration: 0.3 }}
                            >
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </motion.svg>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-between mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-dark-700 text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('complexity')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-accent-purple text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('support')}
                >
                  Next
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
          
          {activeTab === 'support' && (
            <motion.div
              key="support-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium text-white">Select Support Plan</h3>
              <p className="text-sm text-silver-dark mb-4">
                Choose a support plan for after your project is deployed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {supportOptions.map((option, index) => (
                  <motion.div
                    key={option.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative cursor-pointer rounded-xl overflow-hidden ${
                      selectedSupport === option.id 
                        ? 'ring-2 ring-accent-purple shadow-lg shadow-accent-purple/20' 
                        : 'border border-dark-600 hover:border-dark-500'
                    }`}
                    onClick={() => handleSupportChange(option.id)}
                  >
                    <div className="p-5 bg-dark-700/50 backdrop-blur-sm">
                      <div className="flex items-center mb-3">
                        <div className="text-2xl mr-3">{option.icon}</div>
                        <div>
                          <h4 className="font-medium text-white">{option.label}</h4>
                          <p className="text-accent-magenta font-medium">
                            {option.price === 0 ? 'Included' : `₹${option.price.toLocaleString()}`}
                          </p>
                        </div>
                        
                        {selectedSupport === option.id && (
                          <div className="ml-auto">
                            <div className="w-6 h-6 bg-accent-purple rounded-full flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-silver-dark">{option.description}</p>
                      
                      <div className="mt-3 text-xs text-silver flex items-center">
                        <svg className="w-4 h-4 mr-1 text-accent-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Duration: {option.duration}
                      </div>
                    </div>
                    
                    {/* Highlight effect when selected */}
                    {selectedSupport === option.id && (
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-br from-accent-purple/10 to-accent-magenta/10 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="flex justify-start mt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-dark-700 text-white rounded-lg flex items-center"
                  onClick={() => setActiveTab('features')}
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Results section - always visible */}
        <motion.div 
          className="mt-8 pt-6 border-t border-dark-600 relative"
          animate={{ opacity: isCalculating ? 0.5 : 1 }}
        >
          {/* Calculation animation */}
          {isCalculating && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-8 h-8 border-t-2 border-accent-magenta rounded-full animate-spin"></div>
            </motion.div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm text-silver">Estimated Budget</div>
              <motion.div 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-purple to-accent-magenta"
                key={total}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                ₹{total.toLocaleString()}
              </motion.div>
              <div className="text-xs text-silver-dark">
                Based on {websiteTypes.find(t => t.value === selectedType)?.label || 'selected type'} with {complexity} complexity
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm text-silver">Estimated Timeline</div>
              <motion.div 
                className="text-3xl font-bold text-white"
                key={totalDays}
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {totalDays} days
              </motion.div>
              <div className="text-xs text-silver-dark">
                Estimated delivery: {getDeliveryDate()}
              </div>
            </div>
          </div>
          
          {/* Project summary */}
          <motion.div 
            className="mt-6 p-4 rounded-lg bg-dark-700/50 border border-dark-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-sm font-medium text-white mb-2">Project Summary</h4>
            <ul className="space-y-1 text-xs text-silver-dark">
              <li className="flex justify-between">
                <span>Base ({websiteTypes.find(t => t.value === selectedType)?.label})</span>
                <span>₹{basePrice.toLocaleString()}</span>
              </li>
              {selectedFeatures.length > 0 && selectedFeatures.map(featureId => {
                const feature = featureOptions.find(f => f.id === featureId);
                return feature ? (
                  <li key={feature.id} className="flex justify-between">
                    <span>{feature.label}</span>
                    <span>₹{feature.price.toLocaleString()}</span>
                  </li>
                ) : null;
              })}
              <li className="flex justify-between font-medium text-white pt-1 border-t border-dark-600 mt-1">
                <span>Subtotal</span>
                <span>₹{(basePrice + selectedFeatures.reduce((sum, featureId) => {
                  const feature = featureOptions.find(f => f.id === featureId);
                  return sum + (feature?.price || 0);
                }, 0)).toLocaleString()}</span>
              </li>
              <li className="flex justify-between">
                <span>Complexity ({complexity}) multiplier</span>
                <span>x{complexityMultiplier[complexity]}</span>
              </li>
              {selectedSupport !== 'free' && (
                <li className="flex justify-between">
                  <span>Support Plan ({supportOptions.find(s => s.id === selectedSupport)?.duration})</span>
                  <span>₹{(supportOptions.find(s => s.id === selectedSupport)?.price || 0).toLocaleString()}</span>
                </li>
              )}
              <li className="flex justify-between font-medium text-accent-magenta pt-1 border-t border-dark-600 mt-1">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </li>
            </ul>
          </motion.div>
          
          <p className="text-xs text-silver-dark mt-4">
            This is an estimate based on the options selected. Final pricing and timeline may vary based on specific project requirements and scope changes.
          </p>
        </motion.div>
      </div>
      
      {/* Floating action button for mobile */}
      <motion.div 
        className="fixed bottom-6 right-6 md:hidden z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-accent-purple to-accent-magenta shadow-lg shadow-accent-purple/20 flex items-center justify-center"
          onClick={() => {
            if (activeTab === 'type') setActiveTab('complexity');
            else if (activeTab === 'complexity') setActiveTab('features');
            else if (activeTab === 'features') setActiveTab('support');
            else setActiveTab('type');
          }}
        >
          {activeTab === 'features' || activeTab === 'support' ? (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </motion.button>
      </motion.div>
      
      {/* Add CSS for grid pattern */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
});

export default BudgetCalculator;