import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
}

const GradientText = ({ children }: GradientTextProps) => {
  return (
    <span className="gradient-text">{children}</span>
  );
};

export default GradientText;
