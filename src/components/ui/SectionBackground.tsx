
import React from 'react';
import { cn } from '@/lib/utils';
import SinuousLinesAnimation from '@/components/ui/animations/SinuousLinesAnimation';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  animationColor?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  children, 
  className,
  gradientFrom = "from-blue-950",
  gradientVia = "via-indigo-950",
  gradientTo = "to-slate-950",
  animationColor = "amber"
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} opacity-90`} />
      
      {/* Canvas for the sinuous lines animation */}
      <div className="absolute inset-0">
        <SinuousLinesAnimation colorFamily={animationColor} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SectionBackground;
