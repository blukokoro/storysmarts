
import React from 'react';
import PricingCard from './PricingCard';

const ComicPricingTiers: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Comic Book Production</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <PricingCard
          title="Comic Basic"
          price="299"
          description="Transform your story into a simple comic book"
          timeline="2-3 weeks for production • Launch 2 weeks after delivery"
          features={[
            "8 pages included",
            "Black & white illustrations",
            "Basic character design",
            "PDF files only",
            "1 round of revisions"
          ]}
        />
        
        <PricingCard
          title="Comic Standard"
          price="399"
          description="Transform your story into a professional comic book"
          timeline="2-3 weeks for production • Launch 2 weeks after delivery"
          features={[
            "10 pages included",
            "Full color illustrations",
            "Character design",
            "PDF & print-ready files",
            "2 rounds of revisions"
          ]}
          popular={true}
        />
        
        <PricingCard
          title="Comic Premium"
          price="599"
          description="Create a deluxe comic book with enhanced features"
          timeline="3-4 weeks for production • Launch 2 weeks after delivery"
          features={[
            "15 pages included",
            "Premium color illustrations",
            "Advanced character design",
            "PDF, print-ready & digital interactive formats",
            "3 rounds of revisions",
            "Marketing materials included"
          ]}
        />
      </div>
    </div>
  );
};

export default ComicPricingTiers;
