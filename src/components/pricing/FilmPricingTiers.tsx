
import React from 'react';
import PricingCard from './PricingCard';
import { Wand2, Film, Clapperboard } from 'lucide-react';

const FilmPricingTiers: React.FC = () => {
  return (
    <div className="relative mb-16 py-10 px-4 rounded-2xl">
      {/* Background gradient for this section */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-950/50 to-indigo-950/50 rounded-2xl" />
      
      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Film className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-center">AI Short Film</h2>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Transform your story into a cinematic experience with our AI-powered film production services.
          Fast 3-4 day delivery.
        </p>
        
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
            icon={<Wand2 className="h-5 w-5" />}
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
            icon={<Film className="h-5 w-5" />}
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
            icon={<Clapperboard className="h-5 w-5" />}
          />
        </div>
      </div>
    </div>
  );
};

export default FilmPricingTiers;
