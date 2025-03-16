
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';
import { 
  Sparkles, 
  Calendar, 
  Clock, 
  Image, 
  Video, 
  FileText, 
  MessageSquare, 
  Instagram, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Send, 
  Settings, 
  Plus,
  CheckCircle2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface AIContentStrategyProps {
  reachProjectionData: Array<{
    posts: number;
    reach: number;
    engagementRate: number;
  }>;
}

const AIContentStrategy: React.FC<AIContentStrategyProps> = ({ reachProjectionData }) => {
  const [postsPerDay, setPostsPerDay] = useState<number>(5);
  const [campaignDays, setCampaignDays] = useState<number>(30);
  const [generateContent, setGenerateContent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  
  // Content types with their complexity factors
  const contentTypes = [
    { type: 'Static image posts', icon: <Image size={16} />, factor: 1, limit: 60 },
    { type: 'Video/reels', icon: <Video size={16} />, factor: 3, limit: 20 },
    { type: 'Written captions', icon: <FileText size={16} />, factor: 0.5, limit: 100 },
    { type: 'Stories', icon: <Instagram size={16} />, factor: 0.8, limit: 50 },
    { type: 'Engagement posts', icon: <MessageSquare size={16} />, factor: 0.7, limit: 30 }
  ];
  
  // Calculate suggested content based on selected parameters
  const calculateContentNeeds = () => {
    const totalPosts = postsPerDay * campaignDays;
    
    // Calculate distribution based on content type factors
    const totalFactors = contentTypes.reduce((sum, type) => sum + type.factor, 0);
    
    return contentTypes.map(type => {
      // Calculate percentage based on factor weight
      const percentage = type.factor / totalFactors;
      // Calculate count based on percentage of total posts
      let count = Math.round(totalPosts * percentage);
      // Make sure we don't exceed limits
      count = Math.min(count, type.limit);
      
      return {
        ...type,
        count,
        percentage: Math.round(percentage * 100)
      };
    });
  };

  const contentNeeds = calculateContentNeeds();
  
  // Total content pieces
  const totalContentPieces = contentNeeds.reduce((sum, type) => sum + type.count, 0);
  
  // Platform allocation
  const platformAllocation = [
    { name: 'Instagram', percentage: 40, color: '#E1306C' },
    { name: 'Facebook', percentage: 25, color: '#1877F2' },
    { name: 'TikTok', percentage: 20, color: '#000000' },
    { name: 'Twitter', percentage: 10, color: '#1DA1F2' },
    { name: 'LinkedIn', percentage: 5, color: '#0077B5' }
  ];
  
  // Handle generate content
  const handleGenerateContent = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Example generated content
      const exampleContent = {
        contentPlan: {
          summary: {
            totalPieces: totalContentPieces,
            campaignDuration: `${campaignDays} days`,
            postsPerDay: postsPerDay,
            estimatedReach: Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach || 5000),
          },
          schedule: Array.from({ length: 5 }, (_, i) => ({
            day: i + 1,
            posts: Array.from({ length: Math.min(postsPerDay, 3) }, (_, j) => ({
              id: `post-${i}-${j}`,
              type: contentTypes[Math.floor(Math.random() * contentTypes.length)].type,
              time: `${10 + Math.floor(Math.random() * 10)}:${Math.random() > 0.5 ? '30' : '00'}`
            }))
          }))
        }
      };
      
      setGeneratedContent(exampleContent);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-md border border-white/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-primary" />
            AI-Powered Content Strategy & Generation
          </CardTitle>
          <CardDescription>
            Estimate required content volume and automatically generate assets to meet your visibility goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-6 col-span-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor="posts-per-day">Posts per day: {postsPerDay}</Label>
                    <span className="text-xs text-gray-400">
                      Est. daily reach: {Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach || 5000).toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    id="posts-per-day"
                    value={[postsPerDay]}
                    min={1}
                    max={15}
                    step={1}
                    onValueChange={(value) => setPostsPerDay(value[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="campaign-days">Campaign duration: {campaignDays} days</Label>
                  <Slider
                    id="campaign-days"
                    value={[campaignDays]}
                    min={7}
                    max={90}
                    step={1}
                    onValueChange={(value) => setCampaignDays(value[0])}
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="generate-content">Generate content with AI</Label>
                  <Switch
                    id="generate-content"
                    checked={generateContent}
                    onCheckedChange={setGenerateContent}
                  />
                </div>
                
                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <h3 className="text-sm font-medium mb-3">Content Requirements Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="p-2 bg-black/40 rounded-lg text-center">
                      <p className="text-xs text-gray-400">Total Content Pieces</p>
                      <p className="text-2xl font-bold">{totalContentPieces}</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg text-center">
                      <p className="text-xs text-gray-400">Est. Monthly Reach</p>
                      <p className="text-2xl font-bold">
                        {Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach * 30 || 150000).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerateContent}
                  className={`w-full ${generateContent ? 'bg-primary hover:bg-primary/90' : 'bg-gray-700'}`}
                  disabled={loading || !generateContent}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      {generateContent ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Content Plan
                        </>
                      ) : (
                        <>
                          Enable AI content generation
                        </>
                      )}
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-64">
                  <h3 className="text-sm font-medium mb-2">Content Type Distribution</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={contentNeeds}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis type="number" />
                      <YAxis 
                        dataKey="type"
                        type="category" 
                        width={120}
                        tickFormatter={(value) => value.length > 15 ? `${value.substring(0, 15)}...` : value}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                                <p className="font-medium">{payload[0].payload.type}</p>
                                <p>{`Count: ${payload[0].value} pieces`}</p>
                                <p>{`Percentage: ${payload[0].payload.percentage}%`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="count" fill="#8884d8" name="Content Count" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="h-64">
                  <h3 className="text-sm font-medium mb-2">Platform Allocation</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                      data={platformAllocation}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            const platform = payload[0].payload;
                            return (
                              <div className="bg-black/90 border border-gray-700 p-2 rounded text-white text-xs">
                                <p className="font-medium">{platform.name}</p>
                                <p>{`Allocation: ${platform.percentage}%`}</p>
                                <p>{`Content pieces: ${Math.round(totalContentPieces * platform.percentage / 100)}`}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="percentage">
                        {platformAllocation.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {generateContent && generatedContent && (
        <Card className="bg-black/20 backdrop-blur-md border border-white/5">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              AI-Generated Content Plan
            </CardTitle>
            <CardDescription>
              Automated content calendar with optimized posting schedule
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="p-4 bg-black/30 rounded-lg border border-white/10 space-y-4">
                  <h3 className="text-sm font-medium">Plan Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-black/40 rounded-lg">
                      <p className="text-xs text-gray-400">Total Content</p>
                      <p className="text-lg font-bold">{generatedContent.contentPlan.summary.totalPieces} pieces</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg">
                      <p className="text-xs text-gray-400">Campaign Duration</p>
                      <p className="text-lg font-bold">{generatedContent.contentPlan.summary.campaignDuration}</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg">
                      <p className="text-xs text-gray-400">Posts Per Day</p>
                      <p className="text-lg font-bold">{generatedContent.contentPlan.summary.postsPerDay}</p>
                    </div>
                    <div className="p-2 bg-black/40 rounded-lg">
                      <p className="text-xs text-gray-400">Est. Daily Reach</p>
                      <p className="text-lg font-bold">{generatedContent.contentPlan.summary.estimatedReach}</p>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-white/10">
                    <h4 className="text-xs font-medium mb-2">Subscription Options</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-primary/20 border border-primary/30 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Pro Plan</p>
                          <p className="text-xs text-gray-400">Generate up to 100 assets/month</p>
                        </div>
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Subscribe
                        </Button>
                      </div>
                      
                      <div className="p-2 bg-black/40 rounded-lg flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Enterprise</p>
                          <p className="text-xs text-gray-400">Unlimited content generation</p>
                        </div>
                        <Button size="sm" variant="outline">Contact Sales</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-span-2">
                <div className="p-4 bg-black/30 rounded-lg border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-medium">Content Calendar Preview</h3>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {generatedContent.contentPlan.schedule.map((day: any) => (
                      <div key={day.day} className="p-3 bg-black/40 rounded-lg">
                        <h4 className="text-xs font-medium mb-2 border-b border-white/10 pb-2">Day {day.day}</h4>
                        <div className="space-y-2">
                          {day.posts.map((post: any) => (
                            <div key={post.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {post.type.includes('image') ? (
                                  <Image className="w-4 h-4 text-primary" />
                                ) : post.type.includes('Video') ? (
                                  <Video className="w-4 h-4 text-primary" />
                                ) : post.type.includes('caption') ? (
                                  <FileText className="w-4 h-4 text-primary" />
                                ) : post.type.includes('Stories') ? (
                                  <Instagram className="w-4 h-4 text-primary" />
                                ) : (
                                  <MessageSquare className="w-4 h-4 text-primary" />
                                )}
                                <span className="text-xs">{post.type}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {post.time}
                                </span>
                                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    
                    <div className="flex justify-center mt-2">
                      <Button variant="outline" size="sm">
                        View Full Calendar <ArrowRight className="ml-2 w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-3 border-t border-white/10 p-4">
            <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              Generate All Content
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <Send className="w-4 h-4 mr-2" />
              Schedule Content
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Approve Plan
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default AIContentStrategy;
