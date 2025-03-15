
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetEstimate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock } from 'lucide-react';

interface BudgetCalculatorProps {
  data: BudgetEstimate;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ data }) => {
  const chartData = data.breakdown.map(item => ({
    name: item.category,
    value: item.amount
  }));

  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Budget Estimate</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/pricing">View Pricing Options</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-400">Base Amount</p>
            <p className="text-2xl font-semibold text-white">€{data.baseAmount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Estimate</p>
            <p className="text-2xl font-semibold text-primary">€{data.totalEstimate}</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row mb-6 gap-4">
          <div className="md:w-1/2">
            <h4 className="text-sm font-medium text-white mb-2">Cost Factors</h4>
            <div className="space-y-2">
              {data.factors.map((factor, index) => (
                <div key={index} className="bg-black/20 backdrop-blur-sm p-2 rounded border border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{factor.name}</span>
                    <span className="text-xs font-medium text-primary">×{factor.impact}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{factor.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h4 className="text-sm font-medium text-white mb-2">Cost Breakdown</h4>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
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
          </div>
        </div>
        
        <div className="bg-black/20 rounded-md p-3 mb-4 border border-white/5">
          <h4 className="text-sm font-medium text-white mb-2 flex items-center">
            <CalendarClock className="w-4 h-4 mr-2 text-primary" />
            Estimated Timeline
          </h4>
          <div className="space-y-2 text-sm">
            <p className="text-gray-300">
              <span className="text-primary font-medium">AI Short Film (€899):</span> 3-4 weeks for a 5-minute runtime
            </p>
            <p className="text-gray-300">
              <span className="text-primary font-medium">Comic Book (€399):</span> 2-3 weeks for 10 pages
            </p>
            <p className="text-gray-400 text-xs mt-2">
              Suggested marketing launch: 2 weeks after delivery for maximum impact
            </p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-white mb-2">Detailed Breakdown</h4>
          <div className="space-y-2">
            {data.breakdown.map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between py-1 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span className="text-sm text-gray-300">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-300 mr-2">€{item.amount}</span>
                  <span className="text-xs text-gray-500">{item.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <Button asChild className="w-full">
              <Link to="/pricing">
                See Full Pricing Details
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCalculator;
