
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BudgetEstimate } from '@/types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock, BarChart2, Megaphone, Target } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Legend
} from 'recharts';

interface BudgetCalculatorProps {
  data: BudgetEstimate;
}

const COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B'];

const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ data }) => {
  const chartData = data.breakdown.map(item => ({
    name: item.category,
    value: item.amount
  }));

  // Comic book pricing tiers
  const comicTiers = [
    { name: "Comic Basic", price: 299, pages: "8 pages (40 panels)", features: "B&W illustrations, basic design" },
    { name: "Comic Standard", price: 399, pages: "10 pages (50 panels)", features: "Color illustrations, 2 revisions" },
    { name: "Comic Premium", price: 599, pages: "15 pages (75 panels)", features: "Premium illustrations, marketing materials" }
  ];

  // Comic book breakdown data
  const comicBreakdown = [
    { category: "Concept & Character Design", amount: 75, percentage: 25 },
    { category: "Line Art & Inking", amount: 115, percentage: 38 },
    { category: "Coloring & Lettering", amount: 75, percentage: 25 },
    { category: "Layout & Final Assembly", amount: 34, percentage: 12 }
  ];

  // Development timeline data for Gantt chart
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

  // Marketing suggestions based on target audience
  const marketingSuggestions = [
    { 
      title: "Seasonal Timing",
      suggestions: [
        "Summer release for maximum youth engagement",
        "Fall launch to coincide with convention season",
        "Holiday season for gift-focused promotions"
      ]
    },
    {
      title: "Target Locations",
      suggestions: [
        "Urban centers with high concentration of 25-34 demographic",
        "College campuses for reaching secondary 18-24 audience",
        "Comic book shops and independent theaters for direct marketing"
      ]
    },
    {
      title: "Platform Strategy",
      suggestions: [
        "Instagram/TikTok for visual teasers and behind-the-scenes",
        "YouTube for trailer and making-of content",
        "Reddit AMAs focused on sci-fi and filmmaking communities"
      ]
    }
  ];

  return (
    <Card className="glass-card h-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Short Film Budget Estimate</span>
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
            <h4 className="text-sm font-medium text-white mb-2">Short Film Cost Factors</h4>
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
            <h4 className="text-sm font-medium text-white mb-2">Short Film Cost Breakdown</h4>
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
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-2">AI Short Film Breakdown</h4>
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
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-2">Comic Book Production Breakdown</h4>
          <div className="space-y-2">
            {comicBreakdown.map((item, index) => (
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
        </div>
        
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-2">Comic Book Production Tiers</h4>
          <div className="space-y-3">
            {comicTiers.map((tier, index) => (
              <div 
                key={index} 
                className="bg-black/20 backdrop-blur-sm p-3 rounded border border-white/5"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-white">{tier.name}</span>
                  <span className="text-sm font-medium text-primary">€{tier.price}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-xs text-gray-400">
                    <span className="text-gray-300">Pages: </span>{tier.pages}
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-gray-300">Features: </span>{tier.features}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Development Timeline Gantt Chart */}
        <div className="mb-6">
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
                  fill={(entry) => entry.type === "Film" ? "#3B82F6" : "#10B981"}
                  name="Duration (weeks)"
                  barSize={15}
                  radius={[4, 4, 4, 4]}
                  style={{ transform: `translateX(${timelineData[0]?.start || 0}px)` }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Marketing Suggestions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-white mb-3 flex items-center">
            <Megaphone className="w-4 h-4 mr-2 text-primary" />
            Marketing Suggestions
          </h4>
          <div className="space-y-3">
            {marketingSuggestions.map((category, index) => (
              <div 
                key={index} 
                className="bg-black/20 backdrop-blur-sm p-3 rounded border border-white/5"
              >
                <h5 className="text-sm font-medium text-primary mb-2 flex items-center">
                  {index === 0 && <CalendarClock className="w-3 h-3 mr-1" />}
                  {index === 1 && <Target className="w-3 h-3 mr-1" />}
                  {index === 2 && <Megaphone className="w-3 h-3 mr-1" />}
                  {category.title}
                </h5>
                <ul className="space-y-1">
                  {category.suggestions.map((suggestion, idx) => (
                    <li key={idx} className="text-xs text-gray-300 flex items-start">
                      <span className="text-primary mr-1">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Based on your project's target audience of 25-34 year olds interested in science fiction and character-driven narratives.
          </p>
        </div>
          
        <div className="mt-6 flex justify-center">
          <Button asChild className="w-full">
            <Link to="/pricing">
              See Full Pricing Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetCalculator;
