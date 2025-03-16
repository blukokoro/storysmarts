
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AudienceAnalysis as AudienceAnalysisType } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface MarketingAnalysisProps {
  data: AudienceAnalysisType;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A459D1'];

const MarketingAnalysis: React.FC<MarketingAnalysisProps> = ({ data }) => {
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

  // Content production plan
  const contentPlan = [
    { name: 'Social Posts', count: 30 },
    { name: 'Reels/Shorts', count: 15 },
    { name: 'Stories', count: 45 },
    { name: 'Blog Articles', count: 5 },
  ];

  // Sales prediction data
  const averagePrice = 3.49; // Average price of digital comic
  const productionCost = 1500; // Estimated production cost
  const cpmRange = { min: 2.50, max: 14.00 }; // CPM range
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = targetSales / conversionRate;
  const minAdBudget = (impressionsNeeded / 1000) * cpmRange.min;
  const maxAdBudget = (impressionsNeeded / 1000) * cpmRange.max;
  
  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Marketing Analysis</span>
          <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
            <Link to="/marketing">View Marketing Options</Link>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="audience" className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/30 backdrop-blur-md border border-white/10 mb-4">
            <TabsTrigger value="audience" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Audience
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Content Plan
            </TabsTrigger>
            <TabsTrigger value="sales" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Sales Prediction
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="audience" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
          
          <TabsContent value="content" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-primary mb-3">Content Production Plan</h4>
              <div className="h-36 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentPlan}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value}`, 'Count']}
                      contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="count" fill="rgba(56, 189, 248, 0.8)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <h5 className="text-xs font-medium text-primary mb-2">Pre-Launch (4 Weeks)</h5>
                  <ul className="text-xs space-y-1">
                    <li>• 10 teaser posts</li>
                    <li>• 5 behind-the-scenes</li>
                    <li>• 3 character spotlights</li>
                    <li>• 2 creator interviews</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <h5 className="text-xs font-medium text-primary mb-2">Launch (2 Weeks)</h5>
                  <ul className="text-xs space-y-1">
                    <li>• Release announcement</li>
                    <li>• 8 highlight posts</li>
                    <li>• 5 reels/shorts</li>
                    <li>• 2 Q&A sessions</li>
                  </ul>
                </div>
                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                  <h5 className="text-xs font-medium text-primary mb-2">Maintenance (Ongoing)</h5>
                  <ul className="text-xs space-y-1">
                    <li>• 4 weekly posts</li>
                    <li>• 2 monthly reels</li>
                    <li>• Fan spotlights</li>
                    <li>• Periodic promotions</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sales" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="mb-4">
              <div className="bg-black/30 p-4 rounded-lg border border-primary/20 mb-4">
                <h4 className="text-sm font-medium text-primary mb-3">Sales Projection</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Estimated Production Cost</p>
                    <p className="text-lg font-semibold">€{productionCost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Break-Even Sales Target</p>
                    <p className="text-lg font-semibold">{targetSales.toLocaleString()} copies</p>
                    <p className="text-xs text-gray-400 mt-1">at €{averagePrice} per copy</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-white/5 mb-4">
                <h4 className="text-sm font-medium text-primary mb-3">Advertising Budget</h4>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Impressions Needed</p>
                    <p className="font-medium">{Math.ceil(impressionsNeeded).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">Based on 1% conversion rate</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Estimated Ad Budget</p>
                    <p className="font-medium">€{Math.ceil(minAdBudget).toLocaleString()} - €{Math.ceil(maxAdBudget).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mt-1">Based on CPM €{cpmRange.min.toFixed(2)} - €{cpmRange.max.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                <h4 className="text-sm font-medium text-primary mb-2">Optimization Recommendations</h4>
                <ul className="text-xs space-y-1">
                  <li>• Target high-converting audiences to improve 1% rate</li>
                  <li>• Test different ad creatives to lower acquisition cost</li>
                  <li>• Start with €{Math.ceil(minAdBudget / 3).toLocaleString()} budget and scale based on results</li>
                  <li>• Retarget website visitors to increase conversion rate</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketingAnalysis;
