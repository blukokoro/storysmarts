
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
                <h3 className="text-sm font-medium text-primary">Day 1: Pre-Production</h3>
                <p className="text-sm text-gray-400">Script finalization, voice actor selection, storyboard preparation</p>
              </div>
              <div className="relative pl-6 border-l border-primary/30">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Day 2: Production</h3>
                <p className="text-sm text-gray-400">AI scene generation, voice recording, initial composition</p>
              </div>
              <div className="relative pl-6 border-l border-primary/30">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Day 3-4: Post-Production</h3>
                <p className="text-sm text-gray-400">Sound design, music scoring, final edits and rendering</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Day 5-6: Marketing & Release</h3>
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
                <h3 className="text-sm font-medium text-primary">Week 1: Style Definition</h3>
                <p className="text-sm text-gray-400">Art style selection, concept art, overall visual direction</p>
              </div>
              <div className="relative pl-6 border-l border-primary/30">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Week 1-2: Character Creation</h3>
                <p className="text-sm text-gray-400">Character designs, outfit variations, expression sheets</p>
              </div>
              <div className="relative pl-6 border-l border-primary/30">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Week 2-3: Panels & Structure</h3>
                <p className="text-sm text-gray-400">Panel layout, scene composition, rough sketches, client review</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-[6.5px] top-1"></div>
                <h3 className="text-sm font-medium text-primary">Week 4: Pagination & Final PDF</h3>
                <p className="text-sm text-gray-400">Final assembly, page numbering, digital formats, print preparation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectTimeline;
