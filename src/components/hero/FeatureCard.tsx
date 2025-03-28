
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-amber-500/10 hover:border-amber-500/20 transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 p-3 rounded-full bg-black/20 border border-amber-500/20">
          {icon}
        </div>
        <h3 className="text-lg font-sans font-normal text-white mb-1">{title}</h3>
        <p className="text-amber-100/70 text-sm font-light">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
