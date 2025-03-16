
import React from 'react';
import { Calendar, Settings, Plus, Clock, Image, Video, FileText, Instagram, MessageSquare, ArrowRight, Sparkles, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { GeneratedContent } from '@/types/marketing';

interface GeneratedContentPlanProps {
  generatedContent: GeneratedContent | null;
}

const GeneratedContentPlan: React.FC<GeneratedContentPlanProps> = ({ generatedContent }) => {
  if (!generatedContent) return null;

  return (
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
                {generatedContent.contentPlan.schedule.map((day) => (
                  <div key={day.day} className="p-3 bg-black/40 rounded-lg">
                    <h4 className="text-xs font-medium mb-2 border-b border-white/10 pb-2">Day {day.day}</h4>
                    <div className="space-y-2">
                      {day.posts.map((post) => (
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
  );
};

export default GeneratedContentPlan;
