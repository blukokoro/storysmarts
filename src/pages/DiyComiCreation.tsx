
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ExternalLink, FileText, Youtube, PenTool, UserCircle } from 'lucide-react';

const DiyComiCreation = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">DIY Comic Creation Guide</h1>
        
        <div className="grid gap-8 md:grid-cols-2">
          {/* Getting Started Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white">Getting Started</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-300">
                Creating your own comic book might seem daunting, but with the right tools and guidance, 
                you can bring your stories to life. This guide will walk you through the essential steps.
              </p>
              
              <div className="p-4 bg-black/20 rounded-lg border border-primary/20">
                <h3 className="font-medium text-primary mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Recommended Process
                </h3>
                <ol className="list-decimal ml-5 space-y-1 text-sm text-gray-300">
                  <li>Finalize your story structure and script</li>
                  <li>Create character designs using AI tools</li>
                  <li>Design panel layouts and storyboard</li>
                  <li>Generate consistent art with AI assistance</li>
                  <li>Add text and speech bubbles</li>
                  <li>Compile into PDF format</li>
                </ol>
              </div>
            </CardContent>
          </Card>
          
          {/* AI Tools Card */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white">Recommended AI Tools</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="font-medium text-white mb-1">Midjourney</h3>
                  <p className="text-sm text-gray-300">Best for consistent character design and high-quality illustrations.</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm flex items-center" asChild>
                    <a href="https://www.midjourney.com" target="_blank" rel="noopener noreferrer">
                      Visit Midjourney <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
                
                <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="font-medium text-white mb-1">Leonardo.AI</h3>
                  <p className="text-sm text-gray-300">Great for customizing art styles and backgrounds.</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm flex items-center" asChild>
                    <a href="https://leonardo.ai" target="_blank" rel="noopener noreferrer">
                      Visit Leonardo.AI <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
                
                <div className="p-3 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="font-medium text-white mb-1">DALL-E 3</h3>
                  <p className="text-sm text-gray-300">Excellent for quick concept art and ideas.</p>
                  <Button variant="link" className="text-primary p-0 h-auto mt-1 text-sm flex items-center" asChild>
                    <a href="https://openai.com/dall-e-3" target="_blank" rel="noopener noreferrer">
                      Visit DALL-E <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Character Design Tutorials */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <UserCircle className="w-5 h-5 mr-2 text-primary" />
                Character Design Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">Consistent Characters in Midjourney</h3>
                    <p className="text-xs text-gray-400 mb-1">Learn how to create and maintain character consistency across multiple panels.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=DjYKu1BbYLI" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">Character Sheets with AI</h3>
                    <p className="text-xs text-gray-400 mb-1">Create comprehensive character sheets to maintain style consistency.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=3wHKD6mJJKs" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">Facial Expressions in Comics</h3>
                    <p className="text-xs text-gray-400 mb-1">Master creating emotional expressions for your characters.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=Bxr-1EqAEFw" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Panel Layout Guidance */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl font-medium text-white flex items-center">
                <PenTool className="w-5 h-5 mr-2 text-primary" />
                Panel Layout & Design
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">Comic Panel Layout Fundamentals</h3>
                    <p className="text-xs text-gray-400 mb-1">Learn effective storytelling through panel arrangement.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=1KRFOxyZR1Y" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">AI Comic Backgrounds</h3>
                    <p className="text-xs text-gray-400 mb-1">Create stunning and consistent backgrounds for your panels.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=EY4M9hhUzY8" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 bg-black/20 rounded-lg border border-white/10 hover:border-primary/30 transition-all">
                  <Youtube className="w-8 h-8 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm">Text & Speech Bubbles</h3>
                    <p className="text-xs text-gray-400 mb-1">Add professional text and speech bubbles to your comics.</p>
                    <Button variant="link" className="text-primary p-0 h-auto text-xs flex items-center" asChild>
                      <a href="https://www.youtube.com/watch?v=kUXwggZeYh0" target="_blank" rel="noopener noreferrer">
                        Watch Tutorial <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button asChild className="w-full">
                  <Link to="/pricing">Need Professional Help? See Our Services</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiyComiCreation;
