
import React from 'react';
import HeroContent from './hero/HeroContent';
import SectionBackground from './ui/SectionBackground';

const Hero: React.FC = () => {
  return (
    <SectionBackground 
      gradientFrom="from-slate-950" 
      gradientVia="via-slate-900" 
      gradientTo="to-amber-950/30"
    >
      <div className="pt-10 pb-16 px-6 md:pt-16 md:pb-24 max-w-6xl mx-auto">
        <HeroContent />
      </div>
    </SectionBackground>
  );
};

export default Hero;
