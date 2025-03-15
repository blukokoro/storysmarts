
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProjectTimeline: React.FC = () => {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Project Timeline</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="text-xl">AI Short Film (Standard - €899)</CardTitle>
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
            <CardTitle className="text-xl">Comic Book (Standard - €399)</CardTitle>
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
  );
};

export default ProjectTimeline;
