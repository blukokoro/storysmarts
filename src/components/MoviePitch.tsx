
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MoviePitchAnalysis } from '@/types';

interface MoviePitchProps {
  data: MoviePitchAnalysis;
}

const MoviePitch: React.FC<MoviePitchProps> = ({ data }) => {
  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Movie Pitch Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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
      </CardContent>
    </Card>
  );
};

export default MoviePitch;
