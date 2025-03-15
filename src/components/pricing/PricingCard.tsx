
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, CalendarClock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  timeline: string;
  popular?: boolean;
  cta?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  timeline,
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
        <span className="text-3xl font-bold">€{price}</span>
        <span className="text-muted-foreground ml-1 text-sm">/project</span>
      </div>
      
      <div className="mb-4 p-2 bg-primary/5 rounded-md border border-primary/20 flex items-start">
        <CalendarClock className="w-4 h-4 text-primary mr-2 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-primary">Timeline</p>
          <p className="text-xs text-gray-400">{timeline}</p>
        </div>
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

export default PricingCard;
