
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Film, TrendingUp } from 'lucide-react';

interface FeatureCardsProps {
  targetSales: number;
  estimatedAdBudget: number;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({ targetSales, estimatedAdBudget }) => {
  return (
    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Storyboard Feature Highlight Box */}
      <div className="p-6 bg-gradient-to-r from-indigo-900/60 to-purple-900/60 rounded-lg border border-primary/20 shadow-lg">
        <div className="flex flex-col items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Create Your Visual Storyboard</h3>
            <p className="text-gray-300 mb-4">
              Transform your narrative into a professional visual sequence with our AI-powered storyboard builder.
            </p>
            <ul className="text-sm text-gray-400 space-y-1 mb-4">
              <li>• Create frame-by-frame visual sequences</li>
              <li>• Organize shots with professional techniques</li>
              <li>• Export and share your storyboard</li>
            </ul>
          </div>
          <Button asChild size="lg" className="w-full bg-primary hover:bg-primary/90 text-white font-medium">
            <Link to="/storyboard">
              <Film className="h-5 w-5 mr-2" />
              Build Storyboard Now
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Sales Prediction Box */}
      <div className="p-6 bg-gradient-to-r from-green-900/60 to-blue-900/60 rounded-lg border border-primary/20 shadow-lg">
        <div className="flex flex-col items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">Sales Prediction</h3>
            <p className="text-gray-300 mb-4">
              Based on your story analysis, we've calculated revenue projections and marketing requirements.
            </p>
            <div className="grid grid-cols-2 gap-3 w-full mb-4">
              <div className="bg-black/40 rounded p-3 border border-white/10">
                <p className="text-xs text-gray-400">Break-even Sales</p>
                <p className="text-lg font-bold text-white">{targetSales} copies</p>
              </div>
              <div className="bg-black/40 rounded p-3 border border-white/10">
                <p className="text-xs text-gray-400">Suggested Ad Budget</p>
                <p className="text-lg font-bold text-white">€{estimatedAdBudget}</p>
              </div>
            </div>
          </div>
          <Button asChild size="lg" className="w-full bg-primary/90 hover:bg-primary text-white font-medium">
            <Link to="/marketing-plan">
              <TrendingUp className="h-5 w-5 mr-2" />
              View Full Marketing Plan
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
