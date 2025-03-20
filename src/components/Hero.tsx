
import React from 'react';
import HeroContent from './hero/HeroContent';
import SectionBackground from './ui/SectionBackground';
import { BackgroundPaths } from './ui/background-paths';

const Hero: React.FC = () => {
  return (
    <SectionBackground 
      gradientFrom="from-slate-950" 
      gradientVia="via-slate-900" 
      gradientTo="to-amber-950/30"
    >
      <BackgroundPaths className="opacity-40" />
      <div className="pt-10 pb-16 px-6 md:pt-16 md:pb-24 max-w-6xl mx-auto">
        <HeroContent />
      </div>
    </SectionBackground>
  );
};

export default Hero;
