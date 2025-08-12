import MetallicPaint, { parseLogoImage } from "./MetallicPaint";
import { useState, useEffect } from 'react';

const MetallicLogo = ({ className = "", width = 300, height = 300 }: { 
  className?: string;
  width?: number;
  height?: number;
}) => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch('/weekod_logo_temp.svg');
        if (!response.ok) {
          throw new Error(`Failed to fetch logo: ${response.status}`);
        }
        const blob = await response.blob();
        const file = new File([blob], "weekod_logo_temp.svg", { type: blob.type });
        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
        setError(true);
        // Create a fallback empty ImageData
        setImageData(new ImageData(1, 1));
      } finally {
        setLoading(false);
      }
    }
    loadDefaultImage();
  }, []);

  if (loading) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-fuchsia-500"></div>
      </div>
    );
  }

  // Fallback to regular SVG logo if there's an error or WebGL is not supported
  if (error || !imageData) {
    return (
      <div 
        className={`flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <img 
          src="https://res.cloudinary.com/djxoeyk1a/image/upload/v1754573858/weekod_logo_temp_wezt1a.svg" 
          alt="Weekod Logo" 
          className="w-full h-full object-contain filter brightness-110 contrast-125"
          style={{ 
            filter: 'brightness(1.2) contrast(1.3) drop-shadow(0 0 20px rgba(168, 85, 247, 0.4))'
          }}
        />
      </div>
    );
  }

  return (
    <div 
      className={className}
      style={{ width, height }}
    >
      <MetallicPaint 
        imageData={imageData} 
        params={{ 
          edge: 2, 
          patternBlur: 0.005, 
          patternScale: 2, 
          refraction: 0.015, 
          speed: 0.3, 
          liquid: 0.07 
        }} 
      />
    </div>
  );
};

export default MetallicLogo;