
import React from 'react';
import PricingCard from './PricingCard';
import { Sparkles, Palette, Wand2, Brain, Layers } from 'lucide-react';

const SubscriptionTiers: React.FC = () => {
  return (
    <div className="relative mb-16 py-10 px-4 rounded-2xl">
      {/* Background gradient for this section */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/30 to-indigo-950/30 rounded-2xl" />
      
      <div className="relative">
        <div className="flex items-center justify-center gap-3 mb-3">
          <Sparkles className="h-6 w-6 text-amber-400" />
          <h2 className="text-2xl font-bold text-center">Creative Tools Subscription</h2>
        </div>
        
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-8">
          Unlock advanced creative tools and AI-powered features to enhance your storytelling workflow.
          Subscribe monthly or annually to save.
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <PricingCard
            title="Basic Tools"
            price="9.99"
            description="Essential creative tools for storytellers"
            timeline="Billed monthly • Cancel anytime"
            features={[
              "Advanced panel breakdown analysis",
              "Basic character design suggestions",
              "5 Midjourney prompt generations/month",
              "File exports in PDF format",
              "Email support"
            ]}
            icon={<Palette className="h-5 w-5 text-amber-400" />}
            cta="Start Basic Plan"
          />
          
          <PricingCard
            title="Creator Pro"
            price="19.99"
            description="Professional tools for serious content creators"
            timeline="Billed monthly • Cancel anytime"
            features={[
              "Everything in Basic Tools",
              "Unlimited panel breakdown analysis",
              "20 Midjourney prompt generations/month",
              "Scene composition suggestions",
              "Style reference library access",
              "Priority support"
            ]}
            popular={true}
            icon={<Wand2 className="h-5 w-5" />}
            cta="Start Pro Plan"
          />
          
          <PricingCard
            title="AI Master"
            price="39.99"
            description="Ultimate AI tools for professional creators"
            timeline="Billed monthly • Cancel anytime"
            features={[
              "Everything in Creator Pro",
              "Unlimited Midjourney prompt generations",
              "Instant character generation",
              "Custom style creation",
              "Advanced scene composition AI",
              "Marketing material generation",
              "Dedicated support channel"
            ]}
            icon={<Brain className="h-5 w-5" />}
            cta="Start AI Master Plan"
          />
        </div>
        
        <div className="mt-12 bg-black/40 border border-amber-400/20 p-6 rounded-xl max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="bg-amber-400/10 p-3 rounded-full">
              <Layers className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Annual Subscription Discount</h3>
              <p className="text-gray-400 mb-4">Save 20% on any plan by subscribing annually. All annual plans include 2 months free and priority access to new features.</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                  <p className="text-amber-400 font-semibold">€95.90/year</p>
                  <p className="text-xs text-gray-500">Basic Tools</p>
                </div>
                <div className="bg-primary/10 px-4 py-3 rounded-lg border border-primary/30">
                  <p className="text-primary font-semibold">€191.90/year</p>
                  <p className="text-xs text-gray-500">Creator Pro</p>
                </div>
                <div className="bg-black/30 px-4 py-3 rounded-lg border border-white/10">
                  <p className="text-amber-400 font-semibold">€383.90/year</p>
                  <p className="text-xs text-gray-500">AI Master</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionTiers;
