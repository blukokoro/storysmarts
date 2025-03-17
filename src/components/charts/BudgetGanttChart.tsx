
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export interface GanttChartData {
  name: string;
  start: number;
  duration: number;
  type?: string;
  fill?: string;
}

interface BudgetGanttChartProps {
  data: GanttChartData[];
  colors?: string[];
  height?: number | string;
  maxDuration?: number;
  tickCount?: number;
  className?: string;
}

const DEFAULT_COLORS = ['#3B82F6', '#4F46E5', '#8B5CF6', '#A855F7', '#EC4899'];

const BudgetGanttChart: React.FC<BudgetGanttChartProps> = ({
  data,
  colors = DEFAULT_COLORS,
  height = 250,
  maxDuration,
  tickCount = 6,
  className = "bg-black/20 p-3 rounded-lg border border-white/5"
}) => {
  // Calculate the maximum duration if not provided
  const calculatedMaxDuration = maxDuration || 
    data.reduce((max, item) => Math.max(max, item.start + item.duration), 0);

  return (
    <div className={className} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 100, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            type="number" 
            domain={[0, calculatedMaxDuration]} 
            tickCount={tickCount} 
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
            name="Duration (weeks)"
            barSize={15}
            radius={[4, 4, 4, 4]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.fill || colors[index % colors.length]} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetGanttChart;
