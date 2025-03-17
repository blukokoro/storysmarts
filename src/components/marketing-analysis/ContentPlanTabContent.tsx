
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const ContentPlanTabContent: React.FC = () => {
  // Content production plan data
  const contentPlan = [
    { name: 'Social Posts', count: 30 },
    { name: 'Video/reels', count: 15 },
    { name: 'Stories', count: 45 },
    { name: 'Blog Articles', count: 5 },
  ];

  return (
    <div className="mb-4">
      <h4 className="text-sm font-medium text-primary mb-3">Content Production Plan</h4>
      <div className="h-36 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={contentPlan}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`${value}`, 'Count']}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="count" fill="rgba(56, 189, 248, 0.8)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
          <h5 className="text-xs font-medium text-primary mb-2">Pre-Launch (4 Weeks)</h5>
          <ul className="text-xs space-y-1">
            <li>• 10 teaser posts</li>
            <li>• 5 behind-the-scenes</li>
            <li>• 3 character spotlights</li>
            <li>• 2 creator interviews</li>
          </ul>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
          <h5 className="text-xs font-medium text-primary mb-2">Launch (2 Weeks)</h5>
          <ul className="text-xs space-y-1">
            <li>• Release announcement</li>
            <li>• 8 highlight posts</li>
            <li>• 5 reels/shorts</li>
            <li>• 2 Q&A sessions</li>
          </ul>
        </div>
        <div className="bg-black/30 p-3 rounded-lg border border-white/5">
          <h5 className="text-xs font-medium text-primary mb-2">Maintenance (Ongoing)</h5>
          <ul className="text-xs space-y-1">
            <li>• 4 weekly posts</li>
            <li>• 2 monthly reels</li>
            <li>• Fan spotlights</li>
            <li>• Periodic promotions</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-4 p-4 bg-gradient-to-r from-primary/20 to-black/30 rounded-lg border border-primary/30">
        <div className="flex items-center justify-between mb-2">
          <h5 className="text-sm font-medium flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            AI Content Creation
          </h5>
        </div>
        <p className="text-xs mb-3">
          Generate all your social media content with our AI-powered content studio. Create professional images and text in bulk.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
          <Link to="/content-creator">
            <Zap className="h-4 w-4 mr-2" />
            Create Content with AI
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ContentPlanTabContent;
