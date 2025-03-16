
import React from 'react';
import { BarChart2 } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from 'recharts';

const DevelopmentTimeline: React.FC = () => {
  const timelineData = [
    { name: "Film: Pre-Production", start: 0, duration: 14, type: "Film" },
    { name: "Film: Production", start: 14, duration: 7, type: "Film" },
    { name: "Film: Post-Production", start: 21, duration: 7, type: "Film" },
    { name: "Film: Marketing", start: 28, duration: 7, type: "Film" },
    { name: "Comic: Concept", start: 0, duration: 7, type: "Comic" },
    { name: "Comic: Line Art", start: 7, duration: 7, type: "Comic" },
    { name: "Comic: Coloring", start: 14, duration: 7, type: "Comic" },
    { name: "Comic: Publishing", start: 21, duration: 7, type: "Comic" }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-3 flex items-center">
        <BarChart2 className="w-4 h-4 mr-2 text-primary" />
        Development Timeline (weeks)
      </h4>
      <div className="h-[250px] bg-black/20 p-3 rounded-lg border border-white/5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={timelineData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              type="number" 
              domain={[0, 35]} 
              tickCount={6} 
              tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
              stroke="rgba(255,255,255,0.2)"
            />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100} 
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 10 }}
              stroke="rgba(255,255,255,0.2)"
            />
            <Tooltip
              formatter={(value, name, props) => {
                if (name === "start") return [`Week ${value}`, "Start"];
                if (name === "duration") return [`${value} weeks`, "Duration"];
                return [value, name];
              }}
              contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
              itemStyle={{ color: '#fff' }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend 
              verticalAlign="top" 
              align="center"
              wrapperStyle={{ fontSize: 10, marginBottom: 10 }}
            />
            <Bar 
              dataKey="duration" 
              stackId="a" 
              fill="#3B82F6"
              name="Duration (weeks)"
              barSize={15}
              radius={[4, 4, 4, 4]}
              style={{ transform: `translateX(${timelineData[0]?.start || 0}px)` }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DevelopmentTimeline;
