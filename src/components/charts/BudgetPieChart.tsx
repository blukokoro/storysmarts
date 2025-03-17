
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

interface BudgetPieChartProps {
  data: PieChartData[];
  colors?: string[];
  innerRadius?: number;
  outerRadius?: number;
  className?: string;
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#0EA5E9'];

const BudgetPieChart: React.FC<BudgetPieChartProps> = ({
  data,
  colors = DEFAULT_COLORS,
  innerRadius = 40,
  outerRadius = 60,
  className = "h-[180px]"
}) => {
  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={outerRadius}
            paddingAngle={2}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color || colors[index % colors.length]} 
                stroke="rgba(0,0,0,0.3)"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`€${value}`, 'Amount']}
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
            itemStyle={{ color: '#fff' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChart;
