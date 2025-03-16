
import React from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { ContentType } from '@/types/marketing';

interface ContentTypeDistributionProps {
  contentNeeds: ContentType[];
}

const ContentTypeDistribution: React.FC<ContentTypeDistributionProps> = ({ contentNeeds }) => {
  return (
    <div className="h-64">
      <h3 className="text-sm font-medium mb-2">Content Type Distribution</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart
          data={contentNeeds}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis type="number" />
          <YAxis 
            dataKey="type"
            type="category" 
            width={120}
            tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                    <p className="font-medium">{payload[0].payload.type}</p>
                    <p>{`Count: ${payload[0].value} pieces`}</p>
                    <p>{`Percentage: ${payload[0].payload.percentage}%`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="count" fill="#8884d8" name="Content Count" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContentTypeDistribution;
