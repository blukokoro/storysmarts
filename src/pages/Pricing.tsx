
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Star, CalendarClock, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PricingCard = ({ 
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
            timeline="2-3 weeks for production • Launch 2 weeks after delivery"
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
            timeline="2-3 weeks for production • Present 1 week after delivery"
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
            timeline="3-4 weeks for preparation • Pitch 2 weeks after delivery"
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
            timeline="3-4 weeks for production • Release 2-3 weeks after delivery"
            features={[
              "5 minutes runtime",
              "Voice acting",
              "Custom soundtrack",
              "Special effects",
              "Distribution package"
            ]}
          />
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Project Timeline</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">AI Short Film (€899)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 1-2: Pre-Production</h3>
                    <p className="text-sm text-gray-400">Script finalization, voice actor selection, storyboard preparation</p>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 2-3: Production</h3>
                    <p className="text-sm text-gray-400">AI scene generation, voice recording, initial composition</p>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 3-4: Post-Production</h3>
                    <p className="text-sm text-gray-400">Sound design, music scoring, final edits and rendering</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 6-7: Marketing & Release</h3>
                    <p className="text-sm text-gray-400">Promotional materials, online distribution, social media campaign</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-xl">Comic Book (€399)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 1: Concept & Layout</h3>
                    <p className="text-sm text-gray-400">Character designs, script breakdown, layout sketches</p>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 1-2: Line Art</h3>
                    <p className="text-sm text-gray-400">Detailed line drawings, panel composition, client review</p>
                  </div>
                  <div className="relative pl-6 border-l border-primary/30">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 2-3: Coloring & Lettering</h3>
                    <p className="text-sm text-gray-400">Color application, speech bubbles, typography, final touches</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                    <h3 className="text-sm font-medium text-primary">Week 4-5: Publication</h3>
                    <p className="text-sm text-gray-400">Digital release, print preparation, marketing materials</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Marketing Suggestions</h2>
          
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white">Social Media Strategy</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Begin teaser campaign 2-3 weeks before release</li>
                    <li>Create platform-specific content (TikTok shorts, Instagram carousels)</li>
                    <li>Partner with relevant content creators for wider reach</li>
                    <li>Schedule regular posts during the first month after release</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white">Festival & Competition Submissions</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Submit AI short films to digital film festivals</li>
                    <li>Enter comic books in relevant industry awards</li>
                    <li>Plan submission timeline 3 months in advance of major festivals</li>
                    <li>Prepare press kit and promotional materials specifically for competitions</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white">Online Platform Distribution</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Upload short films to YouTube, Vimeo, and social platforms simultaneously</li>
                    <li>Distribute comic books through digital comics platforms and your own website</li>
                    <li>Implement SEO strategy for discoverability</li>
                    <li>Consider paid promotion for first week of release</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white">Launch Event Ideas</AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  <ul className="list-disc list-inside space-y-2">
                    <li>Host virtual premiere with creator Q&A session</li>
                    <li>Create exclusive behind-the-scenes content for attendees</li>
                    <li>Partner with related brands or communities for co-promotion</li>
                    <li>Schedule release during relevant seasonal or industry events</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
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
