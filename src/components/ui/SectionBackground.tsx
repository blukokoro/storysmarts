
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  children, 
  className,
  gradientFrom = "from-blue-950",
  gradientVia = "via-indigo-950",
  gradientTo = "to-slate-950",
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} opacity-90`} />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SectionBackground;
