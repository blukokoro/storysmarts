
import React from 'react';
import { Calendar } from 'lucide-react';

const CampaignTimeline: React.FC = () => {
  return (
    <div className="p-4 bg-black/30 rounded-lg border border-white/10">
      <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
        <Calendar className="w-4 h-4 text-primary" />
        Campaign Timeline Recommendations
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-black/40 rounded-lg">
          <h4 className="text-xs text-primary font-medium mb-2">Pre-Launch (2-3 weeks)</h4>
          <ul className="text-xs space-y-1">
            <li>• Teaser campaigns on Instagram, TikTok</li>
            <li>• Email list warmup sequence</li>
            <li>• Influencer outreach and prep</li>
          </ul>
        </div>
        
        <div className="p-3 bg-black/40 rounded-lg">
          <h4 className="text-xs text-primary font-medium mb-2">Launch Week</h4>
          <ul className="text-xs space-y-1">
            <li>• Full platform push with 70% budget</li>
            <li>• Daily content releases on all channels</li>
            <li>• Limited-time launch incentives</li>
          </ul>
        </div>
        
        <div className="p-3 bg-black/40 rounded-lg">
          <h4 className="text-xs text-primary font-medium mb-2">Week 2-3</h4>
          <ul className="text-xs space-y-1">
            <li>• Targeted retargeting campaigns</li>
            <li>• Engagement with early adopters</li>
            <li>• Secondary content wave</li>
          </ul>
        </div>
        
        <div className="p-3 bg-black/40 rounded-lg">
          <h4 className="text-xs text-primary font-medium mb-2">Week 4-5</h4>
          <ul className="text-xs space-y-1">
            <li>• Review/testimonial highlighting</li>
            <li>• Community engagement focus</li>
            <li>• Final push promotions</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CampaignTimeline;
