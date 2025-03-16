
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, LineChart, Line, CartesianGrid, Legend, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, ArrowRight, TrendingUp, Target, Megaphone, Table } from 'lucide-react';

const MarketingPlan = () => {
  // Platform CPM data (2023)
  const platformCpmData = [
    { platform: 'LinkedIn', cpm: 6.59, color: '#0077B5' },
    { platform: 'Instagram', cpm: 6.29, color: '#E1306C' },
    { platform: 'Facebook', cpm: 5.82, color: '#1877F2' },
    { platform: 'TikTok', cpm: 3.86, color: '#000000' },
    { platform: 'Snapchat', cpm: 2.95, color: '#FFFC00' },
    { platform: 'Twitter', cpm: 2.19, color: '#1DA1F2' },
  ];
  
  // Content reach projection data
  const reachProjectionData = [
    { posts: 2, reach: 1000, engagementRate: 3.2 },
    { posts: 4, reach: 2100, engagementRate: 3.0 },
    { posts: 6, reach: 3300, engagementRate: 2.8 },
    { posts: 8, reach: 4600, engagementRate: 2.5 },
    { posts: 10, reach: 6000, engagementRate: 2.3 },
    { posts: 12, reach: 7500, engagementRate: 2.1 },
    { posts: 14, reach: 9000, engagementRate: 1.9 },
    { posts: 16, reach: 10500, engagementRate: 1.7 },
  ];
  
  // Budget allocation data
  const budgetAllocationData = [
    { name: 'Instagram', value: 30, color: '#E1306C' },
    { name: 'Facebook', value: 25, color: '#1877F2' },
    { name: 'TikTok', value: 20, color: '#000000' },
    { name: 'LinkedIn', value: 10, color: '#0077B5' },
    { name: 'Twitter', value: 10, color: '#1DA1F2' },
    { name: 'Snapchat', value: 5, color: '#FFFC00' },
  ];
  
  // For revenue projection calculations
  const calculateProjections = (impressions: number) => {
    const conversionRate = 0.01; // 1%
    const averageOrderValue = 3.49; // €3.49 average digital comic price
    
    const conversions = impressions * conversionRate;
    const revenue = conversions * averageOrderValue;
    
    return {
      impressions,
      conversions: Math.round(conversions),
      revenue: Math.round(revenue),
      adSpend: Math.round(impressions / 1000 * 5.12) // Average CPM across platforms
    };
  };
  
  // Revenue projection scenarios
  const smallReach = calculateProjections(50000);
  const mediumReach = calculateProjections(100000);
  const largeReach = calculateProjections(250000);
  
  // Break-even calculation
  const productionCost = 1500; // Estimated production cost for comic
  const averagePrice = 3.49; // Average digital comic price
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = targetSales / conversionRate;
  
  // Calculate average CPM from the platform data
  const averageCpm = platformCpmData.reduce((sum, platform) => sum + platform.cpm, 0) / platformCpmData.length;
  const estimatedAdBudget = Math.ceil((impressionsNeeded / 1000) * averageCpm);
  
  // Data for price sensitivity chart
  const priceData = [
    { price: 1.99, units: Math.ceil(productionCost / 1.99) },
    { price: 2.99, units: Math.ceil(productionCost / 2.99) },
    { price: 3.49, units: Math.ceil(productionCost / 3.49) },
    { price: 3.99, units: Math.ceil(productionCost / 3.99) },
    { price: 4.99, units: Math.ceil(productionCost / 4.99) },
    { price: 5.99, units: Math.ceil(productionCost / 5.99) },
  ];
  
  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Marketing Plan</h1>
          <p className="text-gray-400 max-w-3xl">
            This comprehensive analysis provides detailed advertising budget projections, content strategy recommendations, 
            and revenue forecasts to optimize your marketing efforts.
          </p>
          
          <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">Break-Even Analysis</h2>
                <p className="text-sm text-gray-400 mb-4">Based on your production costs and average selling price</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400">Production Cost</p>
                    <p className="text-lg font-bold">€{productionCost}</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400">Sales Needed</p>
                    <p className="text-lg font-bold">{targetSales} copies</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400">Impressions Needed</p>
                    <p className="text-lg font-bold">{Math.ceil(impressionsNeeded).toLocaleString()}</p>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                    <p className="text-xs text-gray-400">Ad Budget Estimate</p>
                    <p className="text-lg font-bold">€{estimatedAdBudget}</p>
                  </div>
                </div>
              </div>
              
              <Button className="bg-primary hover:bg-primary/90" size="lg">
                <Download className="w-4 h-4 mr-2" />
                Download Full Report
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="budget" className="w-full">
          <TabsList className="grid grid-cols-3 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
            <TabsTrigger value="budget" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Advertising Budget
            </TabsTrigger>
            <TabsTrigger value="content" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Content Strategy
            </TabsTrigger>
            <TabsTrigger value="projection" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              Revenue Projections
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="budget" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
          
          <TabsContent value="content" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <Card className="bg-black/20 backdrop-blur-md border border-white/5">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-primary" />
                    Content Reach Projection
                  </CardTitle>
                  <CardDescription>Relationship between number of posts and audience reach</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={reachProjectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="posts" label={{ value: 'Posts per Day', position: 'insideBottomRight', offset: 0 }} />
                        <YAxis yAxisId="left" orientation="left" label={{ value: 'Daily Reach', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Engagement Rate (%)', angle: -90, position: 'insideRight' }} domain={[0, 4]} />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                                  <p className="font-medium">{`${payload[0].payload.posts} posts per day`}</p>
                                  <p>{`Daily reach: ${payload[0].payload.reach.toLocaleString()} people`}</p>
                                  <p>{`Engagement rate: ${payload[0].payload.engagementRate}%`}</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Line yAxisId="left" type="monotone" dataKey="reach" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="engagementRate" stroke="#82ca9d" />
                        <Legend />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/20 backdrop-blur-md border border-white/5">
                <CardHeader>
                  <CardTitle>Content Strategy Recommendations</CardTitle>
                  <CardDescription>Optimal content mix for maximum engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-primary mb-2">Daily Content Recommendation</h3>
                      <p className="text-sm mb-3">
                        Based on our analysis, publishing 10 content pieces per day will allow you to reach approximately 5,000 people daily, 
                        assuming each post reaches around 500 people.
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                          <p className="text-xs text-gray-400">Recommended Posts</p>
                          <p className="text-2xl font-bold">10 per day</p>
                        </div>
                        <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                          <p className="text-xs text-gray-400">Projected Reach</p>
                          <p className="text-2xl font-bold">5,000 daily</p>
                        </div>
                      </div>
                      
                      <h4 className="text-sm font-medium mb-2">Recommended Content Mix:</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex justify-between">
                          <span>• Static posts (images with text)</span>
                          <span className="text-primary">4 daily</span>
                        </li>
                        <li className="flex justify-between">
                          <span>• Reels/shorts (15-60 sec videos)</span>
                          <span className="text-primary">3 daily</span>
                        </li>
                        <li className="flex justify-between">
                          <span>• Stories (24-hour content)</span>
                          <span className="text-primary">2 daily</span>
                        </li>
                        <li className="flex justify-between">
                          <span>• Interactive content (polls, questions)</span>
                          <span className="text-primary">1 daily</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-primary mb-2">Best Time to Post</h3>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="font-medium">Weekdays:</p>
                          <p>6-8 AM, 12-1 PM, 6-8 PM</p>
                        </div>
                        <div>
                          <p className="font-medium">Weekends:</p>
                          <p>9-11 AM, 4-6 PM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-black/20 backdrop-blur-md border border-white/5">
              <CardHeader>
                <CardTitle>Content Calendar Phases</CardTitle>
                <CardDescription>Strategic content timeline for maximum impact</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-primary/5 border border-primary/10 rounded-lg p-4">
                    <h3 className="text-primary font-medium text-lg mb-3">Pre-Launch (4 Weeks)</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span>• Teaser posts</span>
                        <span>10 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Behind-the-scenes</span>
                        <span>5 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Character spotlights</span>
                        <span>3 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Creator interviews</span>
                        <span>2 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Countdown posts</span>
                        <span>7 total</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-400">Weekly Content Rate</p>
                      <p className="text-lg font-bold">6-7 posts/week</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-900/20 border border-indigo-500/10 rounded-lg p-4">
                    <h3 className="text-indigo-400 font-medium text-lg mb-3">Launch (2 Weeks)</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span>• Release announcement</span>
                        <span>1 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Highlight posts</span>
                        <span>8 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Reels/shorts</span>
                        <span>5 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Q&A sessions</span>
                        <span>2 total</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Fan engagement posts</span>
                        <span>4 total</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-400">Weekly Content Rate</p>
                      <p className="text-lg font-bold">10 posts/week</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/40 border border-gray-500/10 rounded-lg p-4">
                    <h3 className="text-gray-300 font-medium text-lg mb-3">Maintenance (Ongoing)</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between text-sm">
                        <span>• Weekly posts</span>
                        <span>4 weekly</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Monthly reels</span>
                        <span>2 monthly</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Fan spotlights</span>
                        <span>2 monthly</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Periodic promotions</span>
                        <span>1 monthly</span>
                      </li>
                      <li className="flex justify-between text-sm">
                        <span>• Update announcements</span>
                        <span>As needed</span>
                      </li>
                    </ul>
                    <div className="mt-4 p-3 bg-black/30 rounded-lg border border-white/10">
                      <p className="text-xs text-gray-400">Weekly Content Rate</p>
                      <p className="text-lg font-bold">4-5 posts/week</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projection" className="focus-visible:outline-none focus-visible:ring-0">
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MarketingPlan;
