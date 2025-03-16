
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoviePitchAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Download, Film, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface MoviePitchProps {
  data: MoviePitchAnalysis;
}

const MoviePitch: React.FC<MoviePitchProps> = ({ data }) => {
  const handleDownload = () => {
    // In a real app, this would initiate a download of the movie pitch
    toast.success("Movie pitch download started");
    // Simulate a download for demo purposes
    setTimeout(() => {
      toast.success("Movie pitch downloaded successfully");
    }, 1500);
  };
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Movie Pitch</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" />
              Download Free
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30"
            >
              <Link to="/ai-refinement">
                <Sparkles className="h-4 w-4 mr-1" />
                Request AI Refinement
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-4">
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5">
          <h4 className="text-sm font-medium text-gray-400 mb-1">Logline</h4>
          <p className="text-white">{data.logline}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-1">Core Concept</h4>
            <p className="text-sm text-gray-200">{data.coreConcept}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-1">Unique Selling Point</h4>
            <p className="text-sm text-gray-200">{data.uniqueSellingPoint}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-1">Target Audience</h4>
            <p className="text-sm text-gray-200">{data.targetAudience}</p>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-400 mb-1">Market Potential</h4>
            <p className="text-sm text-gray-200">{data.marketPotential}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-2">Comparable Successes</h4>
          <div className="flex flex-wrap gap-2">
            {data.comparableSuccesses.map((movie, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {movie}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-400 mb-2">AI Film Options</h4>
          <div className="grid grid-cols-3 gap-2">
            <Button asChild variant="outline" size="sm" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20">
              <Link to="/pricing">Basic €699</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/pricing">Standard €899</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/30 border-primary/50 text-primary hover:bg-primary/40">
              <Link to="/pricing">Premium €1299</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoviePitch;
