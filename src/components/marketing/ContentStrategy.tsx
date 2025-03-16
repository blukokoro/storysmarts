
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Target } from 'lucide-react';

interface ContentStrategyProps {
  reachProjectionData: Array<{
    posts: number;
    reach: number;
    engagementRate: number;
  }>;
}

const ContentStrategy: React.FC<ContentStrategyProps> = ({ reachProjectionData }) => {
  return (
    <>
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
    </>
  );
};

export default ContentStrategy;
