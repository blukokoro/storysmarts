
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { AudienceAnalysis } from '@/types';

interface AudienceTabContentProps {
  data: AudienceAnalysis;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A459D1'];

const AudienceTabContent: React.FC<AudienceTabContentProps> = ({ data }) => {
  // Format data for chart
  const genreChartData = data.genreCompatibility.map((item) => ({
    name: item.genre,
    value: Math.round(item.compatibilityScore * 100),
  }));

  // Format data for gender pie chart
  const genderData = [
    { name: 'Male', value: 65 },
    { name: 'Female', value: 35 },
  ];

  // Format data for location pie chart
  const locationData = [
    { name: 'North America', value: 45 },
    { name: 'Europe', value: 30 },
    { name: 'Asia', value: 15 },
    { name: 'Other', value: 10 },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5">
          <h4 className="text-sm font-medium text-primary mb-3">Gender Distribution</h4>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-white/5">
          <h4 className="text-sm font-medium text-primary mb-3">Geographic Distribution</h4>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={locationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {locationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-white mb-3">Genre Compatibility</h4>
        <div className="h-36">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={genreChartData} layout="vertical">
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
      
      <div className="mt-4">
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
    </>
  );
};

export default AudienceTabContent;
