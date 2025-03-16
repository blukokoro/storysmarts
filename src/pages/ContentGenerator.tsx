
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Sparkles, FileText, Brain, Wand, Loader, Robot, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { GeneratedContent, ContentAnalysis, ModelType, LoraType, AIContentPlan } from '@/components/content-generator/types';
import DocumentUploader from '@/components/content-generator/DocumentUploader';
import ContentGeneratorTabs from '@/components/content-generator/ContentGeneratorTabs';
import GeneratedContentList from '@/components/content-generator/GeneratedContentList';

const ContentGenerator = () => {
  const [activeTab, setActiveTab] = useState<string>('document-upload');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [documentText, setDocumentText] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [contentAnalysis, setContentAnalysis] = useState<ContentAnalysis | null>(null);
  const [contentPlan, setContentPlan] = useState<AIContentPlan | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  
  // Image generation settings
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('comic-art');
  const [selectedLora, setSelectedLora] = useState<LoraType>('comic-book');
  const [imageSize, setImageSize] = useState<string>('1:1');
  const [imageCount, setImageCount] = useState<number>(1);
  const [samplingSteps, setSamplingSteps] = useState<number>(30);
  const [cfgScale, setCfgScale] = useState<number>(7.5);
  const [useAdvancedSettings, setUseAdvancedSettings] = useState<boolean>(false);
  const [autoGenerateContent, setAutoGenerateContent] = useState<boolean>(false);

  // Reset progress when documentText changes
  useEffect(() => {
    if (documentText) {
      setAnalysisProgress(0);
    }
  }, [documentText]);

  const handleFileUpload = async (file: File) => {
    try {
      setIsLoading(true);
      setTimeout(() => {
        const mockExtractedText = `This is extracted text from the uploaded PDF.
        It contains several paragraphs of content that can be used to generate
        marketing materials, images, and quotes. The protagonist in this story
        battles against all odds to emerge victorious in the final confrontation.`;
        
        setDocumentText(mockExtractedText);
        toast.success("Document uploaded and text extracted successfully!");
        setIsLoading(false);
        
        if (autoGenerateContent) {
          handleAnalyzeDocument();
        }
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error uploading file. Please try again.");
      setIsLoading(false);
    }
  };

  const handleAnalyzeDocument = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate document analysis with progress updates
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 500);
    
    // Simulate API call with delay
    setTimeout(() => {
      clearInterval(interval);
      setAnalysisProgress(100);
      
      // Mock analysis results
      const mockAnalysis: ContentAnalysis = {
        keyThemes: ['perseverance', 'triumph', 'adversity', 'journey', 'transformation'],
        suggestedTopics: [
          'Overcoming challenges in life',
          'Finding inner strength',
          'The hero's journey',
          'Transformative experiences',
          'Victory against the odds'
        ],
        keyTerms: ['protagonist', 'battle', 'victory', 'odds', 'confrontation', 'emerge'],
        sentimentScore: 0.75, // Positive sentiment
        audienceMatch: [
          { demographic: 'Young Adults (18-24)', score: 0.85 },
          { demographic: 'Adults (25-34)', score: 0.78 },
          { demographic: 'Teens (13-17)', score: 0.62 }
        ]
      };
      
      // Mock content plan
      const mockContentPlan: AIContentPlan = {
        contentTypes: [
          { 
            type: 'Image', 
            count: 12, 
            examples: ['Character portrait', 'Action scene', 'Emotional moment'] 
          },
          { 
            type: 'Quote', 
            count: 8, 
            examples: ['Inspirational line', 'Character dialogue', 'Pivotal moment'] 
          },
          { 
            type: 'Text', 
            count: 15, 
            examples: ['Social media post', 'Email newsletter', 'Ad copy'] 
          }
        ],
        schedule: [
          {
            week: 1,
            content: [
              { type: 'Image', description: 'Character introduction', platform: 'Instagram' },
              { type: 'Quote', description: 'Teaser quote', platform: 'Twitter' },
              { type: 'Text', description: 'Announcement post', platform: 'Facebook' }
            ]
          },
          {
            week: 2,
            content: [
              { type: 'Image', description: 'Key scene visual', platform: 'Instagram' },
              { type: 'Quote', description: 'Motivational quote', platform: 'Twitter' },
              { type: 'Text', description: 'Behind-the-scenes', platform: 'Facebook' }
            ]
          }
        ],
        keywords: ['hero', 'adventure', 'challenge', 'triumph', 'journey', 'victory'],
        hashtagSuggestions: ['#HeroJourney', '#OvercomingOdds', '#VictoryStory', '#Inspiration']
      };
      
      setContentAnalysis(mockAnalysis);
      setContentPlan(mockContentPlan);
      
      // Generate some initial content based on analysis
      const initialQuotes = [
        "The protagonist battles against all odds to emerge victorious.",
        "In the final confrontation, the truth is revealed."
      ];
      
      const initialContent: GeneratedContent[] = initialQuotes.map(quote => ({
        type: 'quote',
        content: quote,
        category: 'Inspirational',
        score: 0.92,
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent(initialContent);
      setIsAnalyzing(false);
      toast.success("Document analysis complete!");
      
      // Move to the "content-plan" tab
      setActiveTab('content-plan');
    }, 4000);
  };

  const handleGenerateImage = () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter an image prompt");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockGeneratedImageUrl = "/lovable-uploads/aba2b6fd-509a-45f5-9146-31ccf17ad0e7.png";
      
      const newContent: GeneratedContent = {
        type: 'image',
        content: mockGeneratedImageUrl,
        prompt: imagePrompt,
        aiModel: selectedModel,
        tags: ['generated', selectedModel, selectedLora]
      };
      
      setGeneratedContent([newContent, ...generatedContent]);
      toast.success("Image generated successfully!");
      setIsLoading(false);
    }, 3000);
  };

  const handleGenerateQuotes = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockQuotes = [
        "The protagonist battles against all odds to emerge victorious.",
        "In the final confrontation, the truth is revealed.",
        "This story contains several paragraphs of content that can be used for marketing."
      ];
      
      const newContent: GeneratedContent[] = mockQuotes.map(quote => ({
        type: 'quote',
        content: quote,
        source: 'Document Analysis',
        score: 0.85 + Math.random() * 0.1,
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newContent, ...generatedContent]);
      toast.success("Quotes extracted successfully!");
      setIsLoading(false);
    }, 2000);
  };

  const handleGenerateMarketingText = () => {
    if (!documentText.trim()) {
      toast.error("Please upload a document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const mockMarketingTexts = [
        "Experience the epic journey of our hero as they face impossible challenges and emerge triumphant! #ComingSoon #MustRead",
        "The most thrilling adventure of the year is here! Dive into a world of excitement and mystery that will keep you on the edge of your seat.",
        "Unforgettable characters. Breathtaking action. A story that will stay with you long after the final page. Pre-order now and be the first to discover this year's most anticipated release!"
      ];
      
      const newContent: GeneratedContent[] = mockMarketingTexts.map(text => ({
        type: 'text',
        content: text,
        category: 'Social Media',
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newContent, ...generatedContent]);
      toast.success("Marketing text generated successfully!");
      setIsLoading(false);
    }, 2500);
  };

  const handleRemoveContentItem = (index: number) => {
    const newContent = [...generatedContent];
    newContent.splice(index, 1);
    setGeneratedContent(newContent);
  };

  const handleGenerateFullContentPlan = () => {
    if (!contentAnalysis) {
      toast.error("Please analyze your document first");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      // Generate a mix of content based on the analysis
      const newImages: GeneratedContent[] = [
        {
          type: 'image',
          content: "/lovable-uploads/aba2b6fd-509a-45f5-9146-31ccf17ad0e7.png",
          prompt: "Hero character portrait in comic style",
          category: 'Character',
          aiModel: 'comic-art'
        }
      ];
      
      const newQuotes: GeneratedContent[] = contentAnalysis.keyThemes.slice(0, 2).map(theme => ({
        type: 'quote',
        content: `Inspiring quote about ${theme} and overcoming challenges.`,
        category: 'Theme',
        aiModel: 'GPT-4'
      }));
      
      const newTexts: GeneratedContent[] = contentAnalysis.suggestedTopics.slice(0, 2).map(topic => ({
        type: 'text',
        content: `Marketing copy about "${topic}" that resonates with the target audience.`,
        category: 'Marketing',
        aiModel: 'GPT-4'
      }));
      
      setGeneratedContent([...newImages, ...newQuotes, ...newTexts, ...generatedContent]);
      toast.success("Full content plan generated!");
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-primary animate-pulse" />
            AI Content Generator
          </h1>
          <p className="text-gray-400">
            Create professional marketing content from your documents using AI. Generate images, extract quotes, and create social media posts.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 gap-1 bg-black/30 backdrop-blur-md border border-white/10 mb-6">
            <TabsTrigger value="document-upload" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <FileText className="h-4 w-4 mr-2" />
              1. Upload Document
            </TabsTrigger>
            <TabsTrigger value="content-plan" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" disabled={!documentText}>
              <Brain className="h-4 w-4 mr-2" />
              2. Content Plan
            </TabsTrigger>
            <TabsTrigger value="content-generation" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary" disabled={!documentText}>
              <Wand className="h-4 w-4 mr-2" />
              3. Generate Content
            </TabsTrigger>
          </TabsList>

          <TabsContent value="document-upload">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle>Document Upload</CardTitle>
                  <CardDescription>
                    Upload a PDF to extract text and generate content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <DocumentUploader 
                    documentText={documentText}
                    setDocumentText={setDocumentText}
                    onFileUpload={handleFileUpload}
                  />
                  
                  <div className="mt-4 flex items-center space-x-2">
                    <Switch
                      id="auto-generate"
                      checked={autoGenerateContent}
                      onCheckedChange={setAutoGenerateContent}
                    />
                    <Label htmlFor="auto-generate">Auto-analyze after upload</Label>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle>Document Analysis</CardTitle>
                  <CardDescription>
                    Analyze your document to identify key themes, topics, and content opportunities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!documentText && (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
                      Please upload a document first to analyze content.
                    </div>
                  )}
                  
                  {documentText && !isAnalyzing && analysisProgress < 100 && (
                    <Button
                      onClick={handleAnalyzeDocument}
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      <Brain className="h-4 w-4 mr-2" />
                      Analyze Document
                    </Button>
                  )}
                  
                  {isAnalyzing && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-1">
                        <Label>Analyzing document...</Label>
                        <span className="text-xs text-gray-400">{Math.round(analysisProgress)}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                      <div className="text-xs text-gray-400 animate-pulse">
                        <Loader className="h-3 w-3 inline-block mr-2 animate-spin" />
                        Extracting key themes and content opportunities...
                      </div>
                    </div>
                  )}
                  
                  {analysisProgress === 100 && contentAnalysis && (
                    <div className="space-y-4">
                      <div className="flex items-center text-primary">
                        <Brain className="h-4 w-4 mr-2" />
                        <span className="font-medium">Analysis Complete</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                          <h4 className="text-xs font-medium mb-2">Key Themes</h4>
                          <div className="flex flex-wrap gap-1">
                            {contentAnalysis.keyThemes.map((theme, i) => (
                              <span key={i} className="text-xs px-2 py-0.5 bg-primary/20 rounded-full">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                          <h4 className="text-xs font-medium mb-2">Content Sentiment</h4>
                          <div className="flex items-center">
                            <div className="w-full bg-black/30 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${contentAnalysis.sentimentScore * 100}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-xs">{Math.round(contentAnalysis.sentimentScore * 100)}%</span>
                          </div>
                          <p className="text-xs mt-1">
                            {contentAnalysis.sentimentScore > 0.6 ? 'Positive' : 
                             contentAnalysis.sentimentScore > 0.4 ? 'Neutral' : 'Negative'}
                          </p>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => setActiveTab('content-plan')}
                        className="w-full bg-primary/20 hover:bg-primary/30 text-primary"
                      >
                        View Full Content Plan
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content-plan">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Robot className="h-5 w-5 mr-2 text-primary" />
                    AI Content Plan
                  </CardTitle>
                  <CardDescription>
                    Recommended content based on document analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!contentAnalysis ? (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
                      Please analyze your document first to see content recommendations.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                        <h4 className="text-xs font-medium mb-2">Audience Match</h4>
                        {contentAnalysis.audienceMatch.map((audience, i) => (
                          <div key={i} className="mb-2">
                            <div className="flex justify-between text-xs mb-1">
                              <span>{audience.demographic}</span>
                              <span>{Math.round(audience.score * 100)}%</span>
                            </div>
                            <div className="w-full bg-black/30 rounded-full h-1.5">
                              <div 
                                className="bg-primary h-1.5 rounded-full" 
                                style={{ width: `${audience.score * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                        <h4 className="text-xs font-medium mb-2">Suggested Topics</h4>
                        <ul className="text-xs space-y-1">
                          {contentAnalysis.suggestedTopics.map((topic, i) => (
                            <li key={i} className="flex items-start">
                              <span className="inline-block bg-primary/20 text-primary rounded-full w-4 h-4 text-xs flex items-center justify-center mr-2 mt-0.5">
                                {i + 1}
                              </span>
                              {topic}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-black/20 p-3 rounded-lg border border-white/10">
                        <h4 className="text-xs font-medium mb-2">Recommended Hashtags</h4>
                        <div className="flex flex-wrap gap-1">
                          {contentPlan?.hashtagSuggestions.map((hashtag, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full">
                              {hashtag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <Button
                        onClick={handleGenerateFullContentPlan}
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader className="h-4 w-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand className="h-4 w-4 mr-2" />
                            Generate Full Content Plan
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card className="bg-black/30 backdrop-blur-sm border border-white/10 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Content Schedule</CardTitle>
                  <CardDescription>
                    Recommended content schedule based on your document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!contentPlan ? (
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
                      Generate a content plan to see your recommended schedule.
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {contentPlan.contentTypes.map((type, i) => (
                          <div key={i} className="bg-black/20 p-4 rounded-lg border border-white/10">
                            <h4 className="font-medium text-sm mb-1">{type.type} Content</h4>
                            <p className="text-2xl font-bold text-primary mb-2">{type.count}</p>
                            <p className="text-xs text-gray-400">Examples:</p>
                            <ul className="text-xs space-y-1 mt-1">
                              {type.examples.map((example, j) => (
                                <li key={j}>• {example}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      
                      <h4 className="text-sm font-medium mb-3">Publishing Schedule</h4>
                      {contentPlan.schedule.map((week, i) => (
                        <div key={i} className="bg-black/20 p-4 rounded-lg border border-white/10 mb-4">
                          <h5 className="text-sm font-medium mb-2">Week {week.week}</h5>
                          <div className="space-y-2">
                            {week.content.map((item, j) => (
                              <div key={j} className="flex items-center justify-between bg-black/30 p-2 rounded">
                                <div className="flex items-center">
                                  <span className={`w-2 h-2 rounded-full mr-2 ${
                                    item.type === 'Image' ? 'bg-blue-500' : 
                                    item.type === 'Quote' ? 'bg-green-500' : 'bg-amber-500'
                                  }`}></span>
                                  <span className="text-sm">{item.description}</span>
                                </div>
                                <div className="flex items-center">
                                  <span className="text-xs text-gray-400 mr-2">{item.platform}</span>
                                  <span className="text-xs px-1.5 py-0.5 bg-black/40 rounded">
                                    {item.type}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        onClick={() => setActiveTab('content-generation')}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        Continue to Content Generation
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content-generation">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-6">
                <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
                  <CardHeader>
                    <CardTitle>Content Generator</CardTitle>
                    <CardDescription>
                      Choose what type of content to create
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ContentGeneratorTabs 
                      activeTab="image-generator"
                      setActiveTab={() => {}}
                      imagePrompt={imagePrompt}
                      setImagePrompt={setImagePrompt}
                      selectedModel={selectedModel}
                      setSelectedModel={setSelectedModel}
                      selectedLora={selectedLora}
                      setSelectedLora={setSelectedLora}
                      imageSize={imageSize}
                      setImageSize={setImageSize}
                      imageCount={imageCount}
                      setImageCount={setImageCount}
                      samplingSteps={samplingSteps}
                      setSamplingSteps={setSamplingSteps}
                      cfgScale={cfgScale}
                      setCfgScale={setCfgScale}
                      useAdvancedSettings={useAdvancedSettings}
                      setUseAdvancedSettings={setUseAdvancedSettings}
                      documentText={documentText}
                      isLoading={isLoading}
                      onGenerateImage={handleGenerateImage}
                      onGenerateQuotes={handleGenerateQuotes}
                      onGenerateMarketingText={handleGenerateMarketingText}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
                  <GeneratedContentList 
                    generatedContent={generatedContent}
                    onClearAll={() => setGeneratedContent([])}
                    onRemoveItem={handleRemoveContentItem}
                  />
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentGenerator;
