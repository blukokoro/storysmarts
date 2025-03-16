
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  LineChart, 
  Line, 
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
import { TrendingUp, Target, ArrowRight, Calendar } from 'lucide-react';

interface SalesForecastingProps {
  productionCost: number;
  averagePrice: number;
  estimatedAdBudget: number;
  targetSales: number;
  platformCpmData: Array<{
    platform: string;
    cpm: number;
    color: string;
  }>;
}

const SalesForecasting: React.FC<SalesForecastingProps> = ({
  productionCost,
  averagePrice,
  estimatedAdBudget,
  targetSales,
  platformCpmData
}) => {
  const [customTarget, setCustomTarget] = useState<string>(targetSales.toString());
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Initial probabilistic forecast data
  const initialForecastData = {
    dailyViews: Math.ceil((parseInt(customTarget) * 100) / 1), // Assuming 1% conversion rate
    weeklyViews: Math.ceil(((parseInt(customTarget) * 100) / 1) * 7),
    monthlyViews: Math.ceil(((parseInt(customTarget) * 100) / 1) * 30),
    projections: [
      { week: 1, expected: Math.round(parseInt(customTarget) * 0.15), pessimistic: Math.round(parseInt(customTarget) * 0.10), optimistic: Math.round(parseInt(customTarget) * 0.20) },
      { week: 2, expected: Math.round(parseInt(customTarget) * 0.25), pessimistic: Math.round(parseInt(customTarget) * 0.18), optimistic: Math.round(parseInt(customTarget) * 0.32) },
      { week: 3, expected: Math.round(parseInt(customTarget) * 0.30), pessimistic: Math.round(parseInt(customTarget) * 0.22), optimistic: Math.round(parseInt(customTarget) * 0.38) },
      { week: 4, expected: Math.round(parseInt(customTarget) * 0.20), pessimistic: Math.round(parseInt(customTarget) * 0.15), optimistic: Math.round(parseInt(customTarget) * 0.25) },
      { week: 5, expected: Math.round(parseInt(customTarget) * 0.10), pessimistic: Math.round(parseInt(customTarget) * 0.07), optimistic: Math.round(parseInt(customTarget) * 0.13) },
    ],
    platformBreakdown: platformCpmData.map(platform => ({
      platform: platform.platform,
      sales: Math.round(parseInt(customTarget) * (platform.cpm / (platformCpmData.reduce((sum, p) => sum + p.cpm, 0)))),
      color: platform.color
    }))
  };

  const generateForecast = () => {
    if (!customTarget || isNaN(parseInt(customTarget)) || parseInt(customTarget) <= 0) {
      return;
    }

    setLoading(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setForecastData(initialForecastData);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-md border border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Sales Forecasting & Performance Analytics
          </CardTitle>
          <CardDescription>
            Given a target sales volume, the AI models conversion rates to estimate required daily/weekly views and probabilistic sales projections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="target-sales">Target Sales (copies)</Label>
                <Input 
                  id="target-sales" 
                  type="number" 
                  min="1"
                  value={customTarget}
                  onChange={(e) => setCustomTarget(e.target.value)}
                  className="bg-black/30 border-white/10"
                />
              </div>
              
              <Button 
                onClick={generateForecast}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? "Analyzing..." : "Generate Forecast"}
                {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
              </Button>
              
              {forecastData && (
                <div className="p-4 bg-black/30 rounded-lg border border-white/10 space-y-4">
                  <h3 className="text-sm font-medium">Required Traffic</h3>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2 bg-black/40 rounded-lg text-center">
                      <p className="text-xs text-gray-400">Daily Views</p>
                      <p className="text-lg font-bold">{forecastData.dailyViews.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg text-center">
                      <p className="text-xs text-gray-400">Weekly Views</p>
                      <p className="text-lg font-bold">{forecastData.weeklyViews.toLocaleString()}</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg text-center">
                      <p className="text-xs text-gray-400">Monthly Views</p>
                      <p className="text-lg font-bold">{forecastData.monthlyViews.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="col-span-2">
              {forecastData ? (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={forecastData.projections}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="week" label={{ value: 'Week', position: 'insideBottomRight', offset: 0 }} />
                      <YAxis label={{ value: 'Sales Volume', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        content={({ active, payload, label }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                                <p className="font-medium">{`Week ${label}`}</p>
                                <p className="text-green-400">{`Optimistic: ${payload[2].value} sales`}</p>
                                <p className="text-blue-400">{`Expected: ${payload[0].value} sales`}</p>
                                <p className="text-red-400">{`Pessimistic: ${payload[1].value} sales`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} name="Expected" />
                      <Line type="monotone" dataKey="pessimistic" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} name="Pessimistic" />
                      <Line type="monotone" dataKey="optimistic" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Optimistic" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-64 flex items-center justify-center bg-black/30 rounded-lg border border-white/10">
                  <p className="text-gray-400">Enter a target sales volume and generate a forecast to see projections</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {forecastData && (
        <Card className="bg-black/20 backdrop-blur-md border border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="w-5 h-5 mr-2 text-primary" />
              Platform-Specific Breakdown
            </CardTitle>
            <CardDescription>
              Granular breakdowns of expected sales per platform based on historical performance data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={forecastData.platformBreakdown} 
                    layout="vertical" 
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" />
                    <YAxis dataKey="platform" type="category" width={80} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                              <p className="font-medium">{payload[0].payload.platform}</p>
                              <p>{`Estimated Sales: ${payload[0].value}`}</p>
                              <p>{`Percentage: ${Math.round((payload[0].value / parseInt(customTarget)) * 100)}%`}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar 
                      dataKey="sales" 
                      name="Projected Sales" 
                      radius={[0, 4, 4, 0]}
                    >
                      {forecastData.platformBreakdown.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-6">
                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="flex items-center gap-2 text-sm font-medium mb-3">
                    <Calendar className="w-4 h-4 text-primary" />
                    Campaign Timeline Recommendations
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-black/40 rounded-lg">
                      <h4 className="text-xs text-primary font-medium mb-2">Pre-Launch (2-3 weeks)</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Teaser campaigns on Instagram, TikTok</li>
                        <li>• Email list warmup sequence</li>
                        <li>• Influencer outreach and prep</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-black/40 rounded-lg">
                      <h4 className="text-xs text-primary font-medium mb-2">Launch Week</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Full platform push with 70% budget</li>
                        <li>• Daily content releases on all channels</li>
                        <li>• Limited-time launch incentives</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-black/40 rounded-lg">
                      <h4 className="text-xs text-primary font-medium mb-2">Week 2-3</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Targeted retargeting campaigns</li>
                        <li>• Engagement with early adopters</li>
                        <li>• Secondary content wave</li>
                      </ul>
                    </div>
                    
                    <div className="p-3 bg-black/40 rounded-lg">
                      <h4 className="text-xs text-primary font-medium mb-2">Week 4-5</h4>
                      <ul className="text-xs space-y-1">
                        <li>• Review/testimonial highlighting</li>
                        <li>• Community engagement focus</li>
                        <li>• Final push promotions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-primary/10 to-transparent rounded-lg border border-primary/10">
                  <h3 className="text-sm font-medium mb-2">AI Recommendations</h3>
                  <p className="text-xs mb-2">Based on your sales target of {parseInt(customTarget)} copies:</p>
                  <ul className="text-xs space-y-1">
                    <li>• Focus 55% of budget on Instagram and TikTok for highest conversion</li>
                    <li>• Schedule posts between 6-8pm for optimal engagement</li>
                    <li>• Consider bundles/packages to increase average order value</li>
                    <li>• Use retargeting ads for visitors who don't convert initially</li>
                    <li>• Test incentives (limited edition content) to boost conversion rate</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SalesForecasting;
