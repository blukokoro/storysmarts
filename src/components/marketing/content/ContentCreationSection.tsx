
import React from 'react';
import { Zap, Image, FileText, Calendar, Users, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface ContentCreationSectionProps {
  totalContentNeeded: number;
}

const ContentCreationSection: React.FC<ContentCreationSectionProps> = ({ totalContentNeeded }) => {
  return (
    <div className="mt-8 p-6 bg-gradient-to-r from-primary/20 to-black/20 rounded-xl border border-primary/30">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center">
            <Zap className="h-5 w-5 mr-2 text-primary" />
            Advanced AI Content Creation
          </h2>
          <p className="text-sm text-gray-400 max-w-xl mt-1">
            Generate professional social media assets in bulk with our AI engine. Create images, captions, and complete posts ready to publish.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="bg-black/40 px-3 py-1 rounded-full flex items-center">
            <Users className="h-3 w-3 mr-1 text-primary" />
            <span className="text-xs">{totalContentNeeded} posts needed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <Image className="h-4 w-4 mr-2 text-primary" />
            Visual Content
          </h3>
          <p className="text-xs text-gray-400 mb-4">Generate custom images for your social media posts tailored to your brand.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Product shots</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Promo banners</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Story templates</span>
          </div>
          <p className="text-xs text-gray-500 mb-1">Example outputs:</p>
          <div className="grid grid-cols-3 gap-1 mb-3">
            <div className="aspect-square bg-black/60 rounded-sm"></div>
            <div className="aspect-square bg-black/60 rounded-sm"></div>
            <div className="aspect-square bg-black/60 rounded-sm"></div>
          </div>
        </div>
        
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Copy & Captions
          </h3>
          <p className="text-xs text-gray-400 mb-4">Generate engaging captions, hashtags and calls-to-action for your posts.</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Captions</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">Hashtags</span>
            <span className="text-xs px-2 py-1 bg-primary/20 rounded-full">CTAs</span>
          </div>
          <div className="bg-black/60 rounded-sm p-2 mb-3">
            <p className="text-xs text-gray-300">Sample caption goes here with #relevanthashtags #comics #digitalart</p>
          </div>
        </div>
        
        <div className="col-span-1 bg-black/40 p-4 rounded-lg border border-white/10">
          <h3 className="font-medium text-sm mb-3 flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-primary" />
            Scheduling
          </h3>
          <p className="text-xs text-gray-400 mb-4">Plan your content calendar and schedule posts for optimal engagement.</p>
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
        </div>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90"
          asChild
        >
          <Link to="/content-creator">
            <Zap className="w-5 h-5 mr-2" />
            Create Content with AI
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
