
import React from 'react';
import { Zap, Image, FileText, Calendar, Users, Download, Sparkles, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContentCreationSectionProps {
  totalContentNeeded: number;
}

const ContentCreationSection: React.FC<ContentCreationSectionProps> = ({ totalContentNeeded }) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-primary/30 to-black/20 rounded-xl border border-primary/40 shadow-lg shadow-primary/10">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary animate-pulse" />
            AI Content Production Studio
          </h2>
          <p className="text-sm text-gray-300 max-w-xl mt-1">
            Create professional-grade marketing assets in minutes with our AI engine. Generate images, captions, and complete posts tailored to your brand.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="bg-black/40 px-3 py-1 rounded-full flex items-center">
            <Users className="h-3 w-3 mr-1 text-primary" />
            <span className="text-xs font-medium">{totalContentNeeded} posts needed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10 transform transition-all hover:scale-105 hover:border-primary/40 duration-300">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <Image className="h-4 w-4 mr-2 text-primary" />
            Visual Content Generator
          </h3>
          <p className="text-xs text-gray-400 mb-4">Create stunning visuals for social media without design skills or expensive tools.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Product shots</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Promo banners</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Story templates</span>
          </div>
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-black/60 rounded-sm"></div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-black/60 rounded-sm"></div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-black/60 rounded-sm"></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-primary">Generate in bulk</span>
            <CheckCircle className="h-3 w-3 text-primary" />
          </div>
        </div>
        
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10 transform transition-all hover:scale-105 hover:border-primary/40 duration-300">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            AI Copywriting Assistant
          </h3>
          <p className="text-xs text-gray-400 mb-4">Generate professional copy that converts. Perfect for social media, ads and product descriptions.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Captions</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Hashtags</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">CTAs</span>
          </div>
          <div className="bg-black/60 rounded-sm p-2 mb-3">
            <p className="text-xs text-gray-300">"Unleash your creativity with our latest comic release! Perfect for fans of adventure and mystery. #ComicArt #NewRelease"</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-primary">One-click generation</span>
            <CheckCircle className="h-3 w-3 text-primary" />
          </div>
        </div>
        
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10 transform transition-all hover:scale-105 hover:border-primary/40 duration-300">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Smart Content Scheduler
          </h3>
          <p className="text-xs text-gray-400 mb-4">Optimize your posting schedule based on audience activity patterns for maximum engagement.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Auto-scheduling</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Bulk upload</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Analytics</span>
          </div>
          <div className="bg-black/60 rounded-sm p-2 mb-3">
            <div className="flex justify-between items-center text-xs">
              <span>Mon, 10:30 AM</span>
              <span className="text-primary">Instagram</span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-primary">AI-optimized timing</span>
            <CheckCircle className="h-3 w-3 text-primary" />
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-black/30 rounded-lg border border-primary/20">
        <div className="flex items-center mb-3">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <h3 className="font-medium text-primary">Why Use AI for Content Production?</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium">Save 15+ hours/week</p>
              <p className="text-xs text-gray-400">Create weeks of content in minutes</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium">Consistent brand voice</p>
              <p className="text-xs text-gray-400">Perfect tone across all channels</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium">No design skills needed</p>
              <p className="text-xs text-gray-400">Professional results every time</p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-medium">Reduce production costs</p>
              <p className="text-xs text-gray-400">Fraction of traditional costs</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 transition-all duration-300 animate-pulse hover:animate-none"
          asChild
        >
          <Link to="/content-creator">
            <Sparkles className="w-5 h-5 mr-2" />
            Create Content with AI Now
          </Link>
        </Button>
        
        <Button variant="outline" size="lg">
          <Download className="w-5 h-5 mr-2" />
          Download Content Plan
        </Button>
      </div>
    </div>
  );
};

export default ContentCreationSection;
