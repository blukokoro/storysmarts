
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketingSuggestions from '@/components/pricing/MarketingSuggestions';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold">Marketing Services</h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Amplify your comic's reach with our tailored marketing packages. 
            From social media campaigns to promotional materials, we've got your launch covered.
          </p>
          
          {/* Marketing Plan CTA */}
          <div className="mt-6 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-left">
              <h2 className="text-lg font-semibold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Need a detailed marketing plan?
              </h2>
              <p className="text-sm text-gray-400">View our comprehensive marketing blueprint with budget projections and content strategy</p>
            </div>
            <Button asChild variant="default">
              <Link to="/marketing-plan" className="flex items-center">
                View Marketing Plan <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="social" className="w-full mb-12">
          <TabsList className="grid grid-cols-3 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
            <TabsTrigger value="social" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Social Media Packages
            </TabsTrigger>
            <TabsTrigger value="promo" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Promotional Materials
            </TabsTrigger>
            <TabsTrigger value="pr" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              PR & Press
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="social" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Basic Package</CardTitle>
                  <CardDescription>Essential social media support</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€599</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>30 Social Media Images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>10 Social Media Shorts/Videos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>3 Teaser Graphics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>2 Character Spotlight Posts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Content Calendar Planning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>1 Month of Launch Support</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-primary/20 overflow-hidden relative">
                <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-md">
                  POPULAR
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Standard Package</CardTitle>
                  <CardDescription>Enhanced social presence</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€999</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>50 Social Media Images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>20 Social Media Shorts/Videos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>5 Teaser Graphics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>4 Character Spotlight Posts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Advanced Content Calendar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>2 Months of Launch Support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Hashtag Strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>2 Mock Interview Posts</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Premium Package</CardTitle>
                  <CardDescription>Complete marketing solution</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€1,499</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>80 Social Media Images</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>30 Social Media Shorts/Videos</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>8 Teaser Graphics</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>6 Character Spotlight Posts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>3-Month Content Calendar</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>3 Months of Launch Support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Complete Hashtag Strategy</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>4 Mock Interview Posts</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>1 Animated Trailer</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="promo" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Basic Promo Kit</CardTitle>
                  <CardDescription>Essential promotional materials</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€299</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Digital Poster</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Character Cards (3)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Banner Design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Social Media Profile Images</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Standard Promo Kit</CardTitle>
                  <CardDescription>Comprehensive promotional materials</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€499</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Digital & Print Posters</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Character Cards (5)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Banner Designs (3 sizes)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Social Media Profile Pack</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Bookmark Design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Digital Wallpapers (3)</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Premium Promo Kit</CardTitle>
                  <CardDescription>Deluxe promotional package</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€799</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Digital & Print Posters (Multiple Variants)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Full Character Card Set</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Complete Banner Design Package</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Comprehensive Social Media Pack</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Bookmark & Postcard Designs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Digital Wallpapers (10)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Motion Graphics Pack</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>3D Mockup Package</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="pr" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Basic PR Package</CardTitle>
                  <CardDescription>Essential press outreach</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€399</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Press Release Writing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Press Kit Design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Distribution to 20+ Comic News Sites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Media Contact List</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Standard PR Package</CardTitle>
                  <CardDescription>Comprehensive press strategy</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€699</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Press Release Writing & Editing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Comprehensive Press Kit</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Distribution to 50+ Comic News Sites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Curated Media Contact List</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Interview Pitch Creation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>2 Guaranteed Reviews</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5 overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Premium PR Package</CardTitle>
                  <CardDescription>Full-scale press campaign</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">€1,199</span>
                    <span className="text-gray-400 ml-2">one-time</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Custom Press Release Series (3)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Deluxe Press Kit & EPK</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Distribution to 100+ Comic & Entertainment Sites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Personalized Media Outreach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Interview Coordination (up to 5)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>5 Guaranteed Reviews</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Feature Article Placement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Press Conference Coordination</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Get Started</Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        <MarketingSuggestions />
      </div>
    </div>
  );
};

export default Marketing;
