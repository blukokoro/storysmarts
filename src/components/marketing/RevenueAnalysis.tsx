
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueAnalysisProps {
  productionCost: number;
  estimatedAdBudget: number;
  impressionsNeeded: number;
  targetSales: number;
  averagePrice: number;
  priceData: Array<{ price: number; units: number }>;
}

const RevenueAnalysis: React.FC<RevenueAnalysisProps> = ({ 
  productionCost, 
  estimatedAdBudget, 
  impressionsNeeded, 
  targetSales, 
  averagePrice,
  priceData
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="bg-black/20 backdrop-blur-md border border-white/5 col-span-1 md:col-span-3">
          <CardHeader>
            <CardTitle>Revenue Projections</CardTitle>
            <CardDescription>Sales and revenue forecasts based on different marketing scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Scenario</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Ad Spend</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Impressions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Conversions (1%)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Revenue</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">Profit/Loss</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-400">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">Conservative</td>
                    <td className="py-3 px-4">€500</td>
                    <td className="py-3 px-4">97,656</td>
                    <td className="py-3 px-4">977</td>
                    <td className="py-3 px-4">€3,409</td>
                    <td className="py-3 px-4 text-red-500">-€91</td>
                    <td className="py-3 px-4 text-red-500">-4.6%</td>
                  </tr>
                  <tr className="border-b border-white/5 bg-primary/5">
                    <td className="py-3 px-4 font-medium">Break-even</td>
                    <td className="py-3 px-4">€{estimatedAdBudget}</td>
                    <td className="py-3 px-4">{Math.ceil(impressionsNeeded).toLocaleString()}</td>
                    <td className="py-3 px-4">{targetSales}</td>
                    <td className="py-3 px-4">€{Math.round(targetSales * averagePrice)}</td>
                    <td className="py-3 px-4 text-yellow-400">€0</td>
                    <td className="py-3 px-4 text-yellow-400">0%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">Moderate</td>
                    <td className="py-3 px-4">€1,000</td>
                    <td className="py-3 px-4">195,313</td>
                    <td className="py-3 px-4">1,953</td>
                    <td className="py-3 px-4">€6,816</td>
                    <td className="py-3 px-4 text-green-500">€316</td>
                    <td className="py-3 px-4 text-green-500">+10.5%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">Aggressive</td>
                    <td className="py-3 px-4">€2,000</td>
                    <td className="py-3 px-4">390,625</td>
                    <td className="py-3 px-4">3,906</td>
                    <td className="py-3 px-4">€13,632</td>
                    <td className="py-3 px-4 text-green-500">€1,632</td>
                    <td className="py-3 px-4 text-green-500">+27.2%</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 px-4 font-medium">Optimized</td>
                    <td className="py-3 px-4">€3,000</td>
                    <td className="py-3 px-4">585,938</td>
                    <td className="py-3 px-4">5,859</td>
                    <td className="py-3 px-4">€20,448</td>
                    <td className="py-3 px-4 text-green-500">€2,948</td>
                    <td className="py-3 px-4 text-green-500">+39.3%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500/10 rounded-lg">
              <h3 className="text-yellow-400 text-sm font-medium mb-2">Recommendations to Improve ROI</h3>
              <ul className="text-sm space-y-1">
                <li>• Focus on high-engagement platforms first (Instagram and TikTok)</li>
                <li>• Start with the break-even budget and scale based on performance</li>
                <li>• Test different ad creatives to improve conversion rates beyond 1%</li>
                <li>• Implement retargeting to reach people who showed initial interest</li>
                <li>• Consider increasing average selling price on premium editions (€4.99-€5.99)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/20 backdrop-blur-md border border-white/5 md:col-span-2">
          <CardHeader>
            <CardTitle>Price Sensitivity Analysis</CardTitle>
            <CardDescription>Impact of different pricing strategies on break-even point</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="price" 
                    type="number" 
                    domain={[1.99, 5.99]} 
                    ticks={[1.99, 2.99, 3.49, 3.99, 4.99, 5.99]} 
                    label={{ value: 'Price (€)', position: 'insideBottom', offset: -5 }}
                  />
                  <YAxis 
                    dataKey="units"
                    label={{ value: 'Units to Break Even', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const price = payload[0].payload.price;
                        const units = payload[0].payload.units;
                        return (
                          <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                            <p className="font-medium">Price: €{price}</p>
                            <p>Units to break even: {units}</p>
                            <p>Total revenue: €{Math.round(price * units)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line type="monotone" dataKey="units" stroke="#8884d8" dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 backdrop-blur-md border border-white/5">
          <CardHeader>
            <CardTitle>Marketing Timeline</CardTitle>
            <CardDescription>Recommended schedule for optimal results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pl-6 border-l-2 border-primary/50 pb-6">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                <h3 className="text-sm font-medium text-primary">Month 1: Pre-launch</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Teaser content and audience building phase with minimal ad spend (€100-200).
                </p>
              </div>
              
              <div className="relative pl-6 border-l-2 border-primary/50 pb-6">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                <h3 className="text-sm font-medium text-primary">Month 2: Launch</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Highest ad spend period (€{Math.round(estimatedAdBudget * 0.6)}) to achieve break-even.
                </p>
              </div>
              
              <div className="relative pl-6 border-l-2 border-primary/50 pb-6">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                <h3 className="text-sm font-medium text-primary">Month 3: Optimization</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Moderate spend (€{Math.round(estimatedAdBudget * 0.3)}) focused on best performing channels.
                </p>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute w-4 h-4 bg-primary rounded-full -left-[9px] top-0"></div>
                <h3 className="text-sm font-medium text-primary">Month 4+: Maintenance</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Minimal sustaining budget (€100/month) to maintain visibility.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RevenueAnalysis;
