import { ReactNode } from 'react';

interface GradientBorderProps {
  children: ReactNode;
}

const GradientBorder = ({ children }: GradientBorderProps) => {
  return (
    <div className="relative rounded-xl z-0 p-0.5 bg-gradient-to-r from-accent-purple to-accent-magenta">
      {children}
    </div>
  );
};

export default GradientBorder;
