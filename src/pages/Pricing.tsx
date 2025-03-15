
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingCard = ({ 
  title, 
  price, 
  description, 
  features, 
  popular = false,
  cta = "Get Started"
}) => (
  <Card className={`flex flex-col h-full ${popular ? 'border-primary' : 'border-gray-700'}`}>
    <CardHeader className={popular ? 'bg-primary/10' : ''}>
      {popular && (
        <div className="flex items-center mb-2 text-primary">
          <Star className="w-4 h-4 mr-1 fill-primary" />
          <span className="text-xs font-medium">MOST POPULAR</span>
        </div>
      )}
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-muted-foreground ml-1 text-sm">/project</span>
      </div>
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-4 h-4 mr-2 mt-1 text-primary" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full" variant={popular ? "default" : "outline"}>
        <Link to="/sign-up">{cta}</Link>
      </Button>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-gradient text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">
            Start Creating
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose the right package for your storytelling needs. All plans include unlimited story analysis.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <PricingCard
            title="Comic Book"
            price="399"
            description="Transform your story into a professional comic book"
            features={[
              "10 pages included",
              "Character design",
              "Full color illustrations",
              "PDF & print-ready files",
              "2 rounds of revisions"
            ]}
          />
          
          <PricingCard
            title="Storyboard"
            price="499"
            description="Visualize your story with detailed storyboards"
            features={[
              "20 frames included",
              "Professional shot composition",
              "Scene transitions",
              "Camera movement notes",
              "Director's comments"
            ]}
            popular={true}
          />
          
          <PricingCard
            title="Movie Pitch"
            price="699"
            description="Professional pitch deck for film industry"
            features={[
              "Executive summary",
              "Character breakdowns",
              "Market analysis",
              "Budget estimation",
              "Presentation materials"
            ]}
          />
          
          <PricingCard
            title="AI Short Film"
            price="899"
            description="Turn your story into a complete AI-generated short film"
            features={[
              "5 minutes runtime",
              "Voice acting",
              "Custom soundtrack",
              "Special effects",
              "Distribution package"
            ]}
          />
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/10 text-center">
          <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
          <p className="mb-6 text-gray-400 max-w-xl mx-auto">
            Contact our team for custom projects, longer productions, or special requirements.
          </p>
          <Button asChild variant="outline" className="bg-black/50">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
