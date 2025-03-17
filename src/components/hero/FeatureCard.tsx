
import React, { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="glass-card p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 hover:transform hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col items-center text-center">
        <div className="mb-3 p-3 rounded-full bg-black/30">
          {icon}
        </div>
        <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
