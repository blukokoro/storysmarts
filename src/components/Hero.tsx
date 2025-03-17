
import React from 'react';
import SinuousLinesAnimation from './hero/SinuousLinesAnimation';
import HeroContent from './hero/HeroContent';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-violet-950 to-blue-900 opacity-80" />
      
      {/* Canvas for the sinuous lines animation */}
      <div className="absolute inset-0">
        <SinuousLinesAnimation />
      </div>
      
      <div className="relative pt-10 pb-16 px-6 md:pt-16 md:pb-24 max-w-6xl mx-auto">
        <HeroContent />
      </div>
    </div>
  );
};

export default Hero;
