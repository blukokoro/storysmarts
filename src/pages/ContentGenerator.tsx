import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { 
  Sparkles, 
  Upload, 
  Image as ImageIcon, 
  MessageSquareQuote, 
  PenSquare, 
  Layout, 
  Palette, 
  Settings, 
  RefreshCw, 
  CheckCircle,
  Plus, 
  X
} from 'lucide-react';
import PdfUploader from '@/components/PdfUploader';

type ModelType = 'stable-diffusion' | 'midjourney-style' | 'realistic' | 'comic-art' | 'pixel-art';
type LoraType = 'street-photography' | 'comic-book' | 'anime-style' | 'fantasy' | 'realistic-portrait';

interface GeneratedContent {
  type: 'image' | 'text' | 'quote';
  content: string;
  prompt?: string;
}

const ContentGenerator = () => {
  const [activeTab, setActiveTab] = useState<string>('image-generator');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentText, setDocumentText] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent[]>([]);
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('comic-art');
  const [selectedLora, setSelectedLora] = useState<LoraType>('comic-book');
  const [imageSize, setImageSize] = useState<string>('1:1');
  const [imageCount, setImageCount] = useState<number>(1);
  const [samplingSteps, setSamplingSteps] = useState<number>(30);
  const [cfgScale, setCfgScale] = useState<number>(7.5);
  const [useAdvancedSettings, setUseAdvancedSettings] = useState<boolean>(false);

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
      }, 2000);
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error("Error uploading file. Please try again.");
      setIsLoading(false);
    }
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
        prompt: imagePrompt
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
        content: quote
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
        content: text
      }));
      
      setGeneratedContent([...newContent, ...generatedContent]);
      toast.success("Marketing text generated successfully!");
      setIsLoading(false);
    }, 2500);
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle>Document Upload</CardTitle>
                <CardDescription>
                  Upload a PDF to extract text and generate content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <PdfUploader onFileSelected={handleFileUpload} />
                  
                  {documentText && (
                    <div className="mt-4">
                      <Label htmlFor="extracted-text">Extracted Text</Label>
                      <div className="mt-1.5">
                        <Textarea 
                          id="extracted-text"
                          value={documentText}
                          onChange={(e) => setDocumentText(e.target.value)}
                          className="h-32 bg-black/20 border-white/10"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle>Content Generator</CardTitle>
                <CardDescription>
                  Choose what type of content to create
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="image-generator" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Images
                    </TabsTrigger>
                    <TabsTrigger value="quote-extractor" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <MessageSquareQuote className="h-4 w-4 mr-2" />
                      Quotes
                    </TabsTrigger>
                    <TabsTrigger value="text-generator" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                      <PenSquare className="h-4 w-4 mr-2" />
                      Text
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="image-generator" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-prompt">Image Prompt</Label>
                      <Textarea
                        id="image-prompt"
                        placeholder="Describe the image you want to generate..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="h-24 bg-black/20 border-white/10"
                      />
                      <p className="text-xs text-gray-400">Be specific and detailed for best results</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Base Model</Label>
                      <Select value={selectedModel} onValueChange={(value) => setSelectedModel(value as ModelType)}>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="stable-diffusion">Stable Diffusion</SelectItem>
                          <SelectItem value="midjourney-style">Midjourney Style</SelectItem>
                          <SelectItem value="realistic">Realistic</SelectItem>
                          <SelectItem value="comic-art">Comic Art</SelectItem>
                          <SelectItem value="pixel-art">Pixel Art</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Enhanced Model (LoRA)</Label>
                      <Select value={selectedLora} onValueChange={(value) => setSelectedLora(value as LoraType)}>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Select a LoRA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="street-photography">Street Photography</SelectItem>
                          <SelectItem value="comic-book">Comic Book</SelectItem>
                          <SelectItem value="anime-style">Anime Style</SelectItem>
                          <SelectItem value="fantasy">Fantasy</SelectItem>
                          <SelectItem value="realistic-portrait">Realistic Portrait</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Image Size</Label>
                      <Select value={imageSize} onValueChange={setImageSize}>
                        <SelectTrigger className="bg-black/20 border-white/10">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:1">1:1 Square (1024×1024)</SelectItem>
                          <SelectItem value="2:3">2:3 Portrait (768×1152)</SelectItem>
                          <SelectItem value="3:2">3:2 Landscape (1152×768)</SelectItem>
                          <SelectItem value="16:9">16:9 Widescreen (1216×684)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="image-count">Number of Images: {imageCount}</Label>
                      </div>
                      <Slider
                        id="image-count"
                        min={1}
                        max={4}
                        step={1}
                        value={[imageCount]}
                        onValueChange={(value) => setImageCount(value[0])}
                      />
                    </div>

                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="advanced-settings">Advanced Settings</Label>
                      <Switch
                        id="advanced-settings"
                        checked={useAdvancedSettings}
                        onCheckedChange={setUseAdvancedSettings}
                      />
                    </div>

                    {useAdvancedSettings && (
                      <div className="space-y-4 p-4 bg-black/20 rounded-md">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="sampling-steps">Sampling Steps: {samplingSteps}</Label>
                          </div>
                          <Slider
                            id="sampling-steps"
                            min={10}
                            max={50}
                            step={1}
                            value={[samplingSteps]}
                            onValueChange={(value) => setSamplingSteps(value[0])}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="cfg-scale">CFG Scale: {cfgScale}</Label>
                          </div>
                          <Slider
                            id="cfg-scale"
                            min={1}
                            max={15}
                            step={0.5}
                            value={[cfgScale]}
                            onValueChange={(value) => setCfgScale(value[0])}
                          />
                        </div>
                      </div>
                    )}

                    <Button
                      onClick={handleGenerateImage}
                      className="w-full bg-primary hover:bg-primary/90"
                      disabled={isLoading || !imagePrompt.trim()}
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Image
                        </>
                      )}
                    </Button>
                  </TabsContent>

                  <TabsContent value="quote-extractor" className="space-y-4">
                    <div>
                      <p className="text-sm mb-4">
                        Extract memorable quotes from your document that can be used in social media posts, marketing materials, and more.
                      </p>
                      
                      {!documentText && (
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
                          Please upload a document first to extract quotes.
                        </div>
                      )}
                      
                      <Button
                        onClick={handleGenerateQuotes}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                        disabled={isLoading || !documentText.trim()}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Extracting quotes...
                          </>
                        ) : (
                          <>
                            <MessageSquareQuote className="h-4 w-4 mr-2" />
                            Extract Quotes
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="text-generator" className="space-y-4">
                    <div>
                      <p className="text-sm mb-4">
                        Generate marketing text, social media posts, and other content based on your document.
                      </p>
                      
                      {!documentText && (
                        <div className="p-4 bg-primary/10 border border-primary/20 rounded-md text-sm">
                          Please upload a document first to generate marketing text.
                        </div>
                      )}
                      
                      <Button
                        onClick={handleGenerateMarketingText}
                        className="w-full mt-4 bg-primary hover:bg-primary/90"
                        disabled={isLoading || !documentText.trim()}
                      >
                        {isLoading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Generating text...
                          </>
                        ) : (
                          <>
                            <PenSquare className="h-4 w-4 mr-2" />
                            Generate Marketing Text
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Generated Content</span>
                  {generatedContent.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => setGeneratedContent([])}>
                      Clear All
                    </Button>
                  )}
                </CardTitle>
                <CardDescription>
                  Your AI-generated images, quotes, and marketing text will appear here
                </CardDescription>
              </CardHeader>
              <CardContent>
                {generatedContent.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-6 border border-dashed border-gray-700 rounded-md">
                    <Layout className="h-12 w-12 text-gray-500 mb-4" />
                    <h3 className="text-xl font-medium text-gray-300 mb-2">No content generated yet</h3>
                    <p className="text-gray-400 max-w-md">
                      Upload a document and use the tools on the left to generate content. Your created content will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {generatedContent.map((content, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-black/20 border border-white/10 rounded-md relative group hover:border-primary/30 transition-colors"
                      >
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              const newContent = [...generatedContent];
                              newContent.splice(index, 1);
                              setGeneratedContent(newContent);
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        {content.type === 'image' && (
                          <div className="space-y-2">
                            <div className="aspect-square max-w-full overflow-hidden rounded-md">
                              <img 
                                src={content.content} 
                                alt="Generated" 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {content.prompt && (
                              <p className="text-xs text-gray-400 mt-2">Prompt: {content.prompt}</p>
                            )}
                          </div>
                        )}
                        
                        {content.type === 'quote' && (
                          <div className="flex">
                            <MessageSquareQuote className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                            <div>
                              <p className="italic text-white">{content.content}</p>
                              <div className="flex items-center mt-2 gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  Copy
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  Use in Post
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {content.type === 'text' && (
                          <div className="flex">
                            <PenSquare className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-white">{content.content}</p>
                              <div className="flex items-center mt-2 gap-2">
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  Copy
                                </Button>
                                <Button variant="outline" size="sm" className="h-7 text-xs">
                                  Edit
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGenerator;
