
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudienceAnalysis as AudienceAnalysisType } from '@/types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface AudienceAnalysisProps {
  data: AudienceAnalysisType;
}

const AudienceAnalysis: React.FC<AudienceAnalysisProps> = ({ data }) => {
  // Format data for chart
  const chartData = data.genreCompatibility.map((item) => ({
    name: item.genre,
    value: Math.round(item.compatibilityScore * 100),
  }));

  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Audience Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            <h4 className="text-sm font-medium text-primary mb-2">Primary Demographic</h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                <span className="text-xs text-gray-500">Age:</span> {data.primaryDemographic.ageRange}
              </p>
              <p className="text-gray-300">
                <span className="text-xs text-gray-500">Gender:</span> {data.primaryDemographic.gender}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Interests:</p>
              <div className="flex flex-wrap gap-1">
                {data.primaryDemographic.interests.map((interest, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-black/30 rounded text-gray-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg border border-white/5">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Secondary Demographic</h4>
            <div className="space-y-1 text-sm">
              <p className="text-gray-300">
                <span className="text-xs text-gray-500">Age:</span> {data.secondaryDemographic.ageRange}
              </p>
              <p className="text-gray-300">
                <span className="text-xs text-gray-500">Gender:</span> {data.secondaryDemographic.gender}
              </p>
            </div>
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Interests:</p>
              <div className="flex flex-wrap gap-1">
                {data.secondaryDemographic.interests.map((interest, index) => (
                  <span key={index} className="text-xs px-1.5 py-0.5 bg-black/30 rounded text-gray-300">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-white mb-3">Genre Compatibility</h4>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Compatibility']}
                  contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="rgba(56, 189, 248, 0.8)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Recommended Platforms</h4>
          <div className="flex flex-wrap gap-2">
            {data.platformRecommendations.map((platform, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300"
              >
                {platform}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AudienceAnalysis;
