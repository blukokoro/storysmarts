
import React from 'react';
import PricingCard from './PricingCard';

const FilmPricingTiers: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">AI Short Film</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <PricingCard
          title="Film Basic"
          price="699"
          description="Turn your story into a simple AI-generated film"
          timeline="2-3 days for production • Release 1 day after delivery"
          features={[
            "3 minutes runtime",
            "Standard AI voices",
            "Basic soundtrack",
            "Simple effects",
            "720p resolution"
          ]}
        />
        
        <PricingCard
          title="Film Standard"
          price="899"
          description="Turn your story into a complete AI-generated short film"
          timeline="3-4 days for production • Release 1-2 days after delivery"
          features={[
            "5 minutes runtime",
            "Professional voice acting",
            "Custom soundtrack",
            "Special effects",
            "1080p resolution",
            "Distribution package"
          ]}
          popular={true}
        />
        
        <PricingCard
          title="Film Premium"
          price="1299"
          description="Create a premium AI-generated film with advanced features"
          timeline="4-5 days for production • Release 2 days after delivery"
          features={[
            "8 minutes runtime",
            "Premium voice actors",
            "Original music composition",
            "Advanced special effects",
            "4K resolution",
            "Marketing & distribution package",
            "Festival submission package"
          ]}
        />
      </div>
    </div>
  );
};

export default FilmPricingTiers;
