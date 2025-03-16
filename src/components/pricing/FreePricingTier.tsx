
import React from 'react';
import { FileText, FileCheck, BarChart } from 'lucide-react';
import PricingCard from './PricingCard';

const FreePricingTier: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Free Analysis</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PricingCard
            title="Free Analysis"
            price="0"
            description="Try our AI analysis with limited features"
            features={[
              "5 free analyses per month",
              "Basic story structure analysis",
              "Panel count recommendations",
              "Simple audience insights",
              "Basic budget estimation"
            ]}
            timeline="Instant"
            icon={<FileText className="w-5 h-5 text-emerald-500" />}
            freeTier={true}
            cta="Start Now"
            ctaLink="/analyze"
          />
        </div>
        <div className="md:col-span-2 flex items-center">
          <div className="glass-card p-6 h-full w-full">
            <h3 className="text-xl font-medium mb-4 text-gradient">What's Included in Free Analysis</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <FileText className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Story Structure</h4>
                  <p className="text-sm text-gray-400">Analyze your narrative structure and receive suggestions for improvement</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <FileCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Comic Panels</h4>
                  <p className="text-sm text-gray-400">Get suggestions for comic panel count and basic layout ideas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/20">
                  <BarChart className="w-6 h-6 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Basic Metrics</h4>
                  <p className="text-sm text-gray-400">See simplified audience and budget insights for your story</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg p-4 border border-emerald-500/30">
                <p className="text-sm text-emerald-400 font-medium mb-2">Pro Tip:</p>
                <p className="text-xs text-gray-300">Save your analyses to your profile and upgrade later to unlock advanced features and production options</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreePricingTier;
