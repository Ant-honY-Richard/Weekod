import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Define Interfaces
export interface IGeneratorFeatures {
  contactForm: boolean;
  gallery: boolean;
  cta: boolean;
  pricing: boolean;
  testimonials: boolean;
}

export interface IGeneratorState {
  businessName: string;
  industry: string;
  primaryColors: string; // Comma-separated hex values or single hex
  uiStyle: 'Minimal' | 'Futuristic' | 'Playful' | 'Corporate' | '';
  features: IGeneratorFeatures;
  targetAudience: string;
  logoFile: File | null;
  fontPreference: 'Sans-serif' | 'Serif' | 'Tech' | 'Monospace' | '';
}

export interface IGeneratorContext {
  formData: IGeneratorState;
  updateFormData: <K extends keyof IGeneratorState>(
    field: K,
    value: IGeneratorState[K]
  ) => void;
  updateFeatureData: (featureName: keyof IGeneratorFeatures, value: boolean) => void;
}

// 2. Create Context
const GeneratorContext = createContext<IGeneratorContext | undefined>(undefined);

// 3. Create Provider Component
interface GeneratorProviderProps {
  children: ReactNode;
}

export const GeneratorProvider: React.FC<GeneratorProviderProps> = ({ children }) => {
  const [formData, setFormData] = useState<IGeneratorState>({
    businessName: '',
    industry: '',
    primaryColors: '',
    uiStyle: 'Futuristic', // Default UI Style
    features: {
      contactForm: false,
      gallery: false,
      cta: false,
      pricing: false,
      testimonials: false,
    },
    targetAudience: '',
    logoFile: null,
    fontPreference: 'Sans-serif', // Default Font Preference
  });

  const updateFormData = <K extends keyof IGeneratorState>(
    field: K,
    value: IGeneratorState[K]
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateFeatureData = (featureName: keyof IGeneratorFeatures, value: boolean) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: value,
      },
    }));
  };

  return (
    <GeneratorContext.Provider value={{ formData, updateFormData, updateFeatureData }}>
      {children}
    </GeneratorContext.Provider>
  );
};

// 4. Create Custom Hook
export const useGeneratorContext = (): IGeneratorContext => {
  const context = useContext(GeneratorContext);
  if (!context) {
    throw new Error('useGeneratorContext must be used within a GeneratorProvider');
  }
  return context;
};
