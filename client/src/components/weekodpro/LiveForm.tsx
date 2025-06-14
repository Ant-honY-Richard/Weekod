import React from 'react';
import { useGeneratorContext, IGeneratorState, IGeneratorFeatures } from '../../contexts/GeneratorContext';

const featureKeyMap: Record<string, keyof IGeneratorFeatures> = {
  'Contact Form': 'contactForm',
  'Gallery': 'gallery',
  'Call To Action (CTA)': 'cta',
  'Pricing Table': 'pricing',
  'Testimonials': 'testimonials',
};

const LiveForm: React.FC = () => {
  const { formData, updateFormData, updateFeatureData } = useGeneratorContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here - potentially call another context function
    console.log('Form submitted with data:', formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    updateFormData(name as keyof IGeneratorState, value as IGeneratorState[keyof IGeneratorState]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData('logoFile', e.target.files[0]);
    } else {
      updateFormData('logoFile', null);
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const featureKey = featureKeyMap[value];
    if (featureKey) {
      updateFeatureData(featureKey, checked);
    }
  };

  const neonPurpleHex = '#9D4EDD'; // From tailwind.config.js

  return (
    <form
      onSubmit={handleSubmit}
      className="neon-glow-border space-y-6 p-4 bg-futuristic-dark-slate rounded-lg"
      style={{ "--neon-glow-color": neonPurpleHex }}
    >
      <div>
        <label htmlFor="businessName" className="block mb-1 text-neon-cyan text-sm font-medium">
          Business Name
        </label>
        <input
          type="text"
          id="businessName"
          name="businessName"
          value={formData.businessName}
          onChange={handleInputChange}
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple"
        />
      </div>

      <div>
        <label htmlFor="industry" className="block mb-1 text-neon-cyan text-sm font-medium">
          Industry/Niche
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          value={formData.industry}
          onChange={handleInputChange}
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple"
        />
      </div>

      <div>
        <label htmlFor="primaryColors" className="block mb-1 text-neon-cyan text-sm font-medium">
          Primary Colors
        </label>
        <input
          type="text"
          id="primaryColors"
          name="primaryColors"
          value={formData.primaryColors}
          onChange={handleInputChange}
          placeholder="e.g., #00A3FF, #9D4EDD"
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple placeholder-gray-500"
        />
      </div>

      <div>
        <label htmlFor="uiStyle" className="block mb-1 text-neon-cyan text-sm font-medium">
          Preferred UI Style
        </label>
        <select
          id="uiStyle"
          name="uiStyle"
          value={formData.uiStyle}
          onChange={handleInputChange}
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple"
        >
          <option value="">Select Style</option>
          <option value="Minimal">Minimal</option>
          <option value="Futuristic">Futuristic</option>
          <option value="Playful">Playful</option>
          <option value="Corporate">Corporate</option>
        </select>
      </div>

      <fieldset className="p-4 border border-neon-blue rounded-md">
        <legend className="text-neon-cyan text-sm font-medium px-2">Features Needed</legend>
        <div className="space-y-2 grid grid-cols-2 gap-4 mt-2">
          {[
            'Contact Form',
            'Gallery',
            'Call To Action (CTA)',
            'Pricing Table',
            'Testimonials',
          ].map((featureName) => {
            const featureKey = featureKeyMap[featureName];
            return (
              <div key={featureName} className="flex items-center">
                <input
                  type="checkbox"
                  id={featureName.toLowerCase().replace(/\s+/g, '')}
                  name="features"
                  value={featureName} // This value is used to map to featureKey in handleCheckboxChange
                  checked={formData.features[featureKey]}
                  onChange={handleCheckboxChange}
                  className="h-5 w-5 text-neon-purple bg-futuristic-dark-blue border-neon-blue rounded focus:ring-neon-purple focus:ring-2"
                />
                <label
                  htmlFor={featureName.toLowerCase().replace(/\s+/g, '')}
                  className="ml-2 text-gray-300 text-sm"
                >
                  {featureName}
                </label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="targetAudience" className="block mb-1 text-neon-cyan text-sm font-medium">
          Target Audience
        </label>
        <input
          type="text"
          id="targetAudience"
          name="targetAudience"
          value={formData.targetAudience}
          onChange={handleInputChange}
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple"
        />
      </div>

      <div>
        <label htmlFor="logoUpload" className="block mb-1 text-neon-cyan text-sm font-medium">
          Logo Upload
        </label>
        <input
          type="file"
          id="logoUpload"
          name="logoFile" // Changed name to match state key
          onChange={handleFileChange}
          className="w-full p-2 bg-futuristic-dark-blue text-gray-400 border border-neon-blue rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neon-purple file:text-white hover:file:bg-opacity-80"
        />
      </div>

      <div>
        <label htmlFor="fontPreference" className="block mb-1 text-neon-cyan text-sm font-medium">
          Font Preference
        </label>
        <select
          id="fontPreference"
          name="fontPreference"
          value={formData.fontPreference}
          onChange={handleInputChange}
          className="w-full p-3 bg-futuristic-dark-blue text-gray-200 border border-neon-blue rounded-md focus:ring-neon-purple focus:border-neon-purple"
        >
          <option value="">Select Font</option>
          <option value="Sans-serif">Sans-serif (e.g., Inter)</option>
          <option value="Serif">Serif (e.g., Georgia)</option>
          <option value="Tech">Tech (e.g., JetBrains Mono)</option>
          <option value="Monospace">Monospace (e.g., Courier)</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-neon-purple hover:bg-opacity-80 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-neon-blue focus:ring-opacity-75 transition duration-150 ease-in-out"
      >
        Generate UI
      </button>
    </form>
  );
};

export default LiveForm;
