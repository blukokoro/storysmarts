
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Megaphone, Table } from 'lucide-react';

interface BudgetProjectionsProps {
  platformCpmData: Array<{ platform: string; cpm: number; color: string }>;
  budgetAllocationData: Array<{ name: string; value: number; color: string }>;
  estimatedAdBudget: number;
  smallReach: { conversions: number; revenue: number; adSpend: number };
  mediumReach: { conversions: number; revenue: number; adSpend: number };
  largeReach: { conversions: number; revenue: number; adSpend: number };
  targetSales: number;
  impressionsNeeded: number;
  averagePrice: number;
}

const BudgetProjections: React.FC<BudgetProjectionsProps> = ({
  platformCpmData,
  budgetAllocationData,
  estimatedAdBudget,
  smallReach,
  mediumReach,
  largeReach,
  targetSales,
  impressionsNeeded,
  averagePrice
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-black/20 backdrop-blur-md border border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Platform CPM Rates (2023)
            </CardTitle>
            <CardDescription>Average cost per thousand impressions by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformCpmData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis type="number" domain={[0, 8]} unit="€" />
                  <YAxis dataKey="platform" type="category" width={80} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                            <p>{`${payload[0].payload.platform}: €${payload[0].value}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar 
                    dataKey="cpm" 
                    name="CPM (€)" 
                    radius={[0, 4, 4, 0]}
                  >
                    {platformCpmData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 backdrop-blur-md border border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Megaphone className="w-5 h-5 mr-2 text-primary" />
              Budget Allocation Recommendation
            </CardTitle>
            <CardDescription>Optimal distribution of your marketing budget</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {budgetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Budget Allocation']}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const payloadValue = payload[0].value as number;
                        return (
                          <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                            <p className="font-medium">{payload[0].payload.name}</p>
                            <p>{`Budget share: ${payloadValue}%`}</p>
                            <p>{`For €${estimatedAdBudget} budget: €${Math.round(estimatedAdBudget * payloadValue / 100)}`}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6 bg-black/20 backdrop-blur-md border border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Table className="w-5 h-5 mr-2 text-primary" />
            Budget Calculator by Reach Goal
          </CardTitle>
          <CardDescription>
            Estimated budget required for different impression targets with 1% conversion rate
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Impressions Target</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Expected Conversions</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Projected Revenue</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">Ad Spend (avg. CPM €5.12)</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-400">ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">50,000</td>
                  <td className="py-3 px-4">{smallReach.conversions}</td>
                  <td className="py-3 px-4">€{smallReach.revenue}</td>
                  <td className="py-3 px-4">€{smallReach.adSpend}</td>
                  <td className={`py-3 px-4 ${smallReach.revenue > smallReach.adSpend ? 'text-green-500' : 'text-red-500'}`}>
                    {((smallReach.revenue / smallReach.adSpend - 1) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">100,000</td>
                  <td className="py-3 px-4">{mediumReach.conversions}</td>
                  <td className="py-3 px-4">€{mediumReach.revenue}</td>
                  <td className="py-3 px-4">€{mediumReach.adSpend}</td>
                  <td className={`py-3 px-4 ${mediumReach.revenue > mediumReach.adSpend ? 'text-green-500' : 'text-red-500'}`}>
                    {((mediumReach.revenue / mediumReach.adSpend - 1) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">250,000</td>
                  <td className="py-3 px-4">{largeReach.conversions}</td>
                  <td className="py-3 px-4">€{largeReach.revenue}</td>
                  <td className="py-3 px-4">€{largeReach.adSpend}</td>
                  <td className={`py-3 px-4 ${largeReach.revenue > largeReach.adSpend ? 'text-green-500' : 'text-red-500'}`}>
                    {((largeReach.revenue / largeReach.adSpend - 1) * 100).toFixed(1)}%
                  </td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-4">{Math.ceil(impressionsNeeded).toLocaleString()}</td>
                  <td className="py-3 px-4">{targetSales}</td>
                  <td className="py-3 px-4">€{Math.round(targetSales * averagePrice)}</td>
                  <td className="py-3 px-4">€{estimatedAdBudget}</td>
                  <td className="py-3 px-4 text-yellow-400">Break-even</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BudgetProjections;
