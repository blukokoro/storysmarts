
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const dummyGenreData = [
  { name: 'Sci-Fi', value: 35, color: '#8B5CF6' },
  { name: 'Drama', value: 25, color: '#3B82F6' },
  { name: 'Adventure', value: 20, color: '#10B981' },
  { name: 'Mystery', value: 10, color: '#F59E0B' },
  { name: 'Romance', value: 10, color: '#EC4899' },
];

const dummyAudienceData = [
  { name: '18-24', value: 15, color: '#8B5CF6' },
  { name: '25-34', value: 40, color: '#3B82F6' },
  { name: '35-44', value: 25, color: '#10B981' },
  { name: '45-54', value: 15, color: '#F59E0B' },
  { name: '55+', value: 5, color: '#EC4899' },
];

const dummyProductionData = [
  { name: 'Script', value: 15, color: '#8B5CF6' },
  { name: 'Visuals', value: 40, color: '#3B82F6' },
  { name: 'Voice', value: 15, color: '#10B981' },
  { name: 'Music', value: 20, color: '#F59E0B' },
  { name: 'Effects', value: 10, color: '#EC4899' },
];

const PieChartCard = ({ title, description, data }: { title: string; description: string; data: typeof dummyGenreData }) => {
  return (
    <Card className="glass-card overflow-hidden h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Percentage']}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

const AnalyticsVisualizer: React.FC = () => {
  return (
    <div className="py-20 relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 opacity-90" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-gradient">
            Story Analysis Insights
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our AI provides comprehensive analytics to help you better understand your story's potential and audience appeal.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PieChartCard 
            title="Genre Composition" 
            description="How your story blends different genres"
            data={dummyGenreData}
          />
          <PieChartCard 
            title="Target Audience" 
            description="Age demographics that would engage with your story"
            data={dummyAudienceData}
          />
          <PieChartCard 
            title="Production Allocation" 
            description="Recommended production resource distribution"
            data={dummyProductionData}
          />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsVisualizer;
