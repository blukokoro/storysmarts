
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  Download, 
  Zap, 
  Image as ImageIcon, 
  FileText, 
  RefreshCw, 
  CheckCircle2, 
  Copy, 
  X, 
  Plus, 
  ChevronLeft,
  ArrowRight,
  Settings,
  Trash,
  Pencil,
  MessageSquare
} from 'lucide-react';

// Types for the content items
interface ImageContent {
  id: string;
  prompt: string;
  imageUrl: string | null;
  status: 'idle' | 'generating' | 'completed' | 'failed';
  platform: string;
}

interface TextContent {
  id: string;
  prompt: string;
  generatedText: string;
  type: 'caption' | 'hashtags' | 'cta';
  status: 'idle' | 'generating' | 'completed' | 'failed';
  platform: string;
}

const ContentCreator = () => {
  // State for image generation
  const [imagePrompt, setImagePrompt] = useState<string>("");
  const [bulkImageCount, setBulkImageCount] = useState<number>(5);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("instagram");
  const [generatedImages, setGeneratedImages] = useState<ImageContent[]>([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState<boolean>(false);
  
  // State for text generation
  const [textPrompt, setTextPrompt] = useState<string>("");
  const [textCount, setTextCount] = useState<number>(5);
  const [selectedTextType, setSelectedTextType] = useState<string>("caption");
  const [generatedTexts, setGeneratedTexts] = useState<TextContent[]>([]);
  const [isGeneratingTexts, setIsGeneratingTexts] = useState<boolean>(false);

  // Handle image generation
  const generateImages = () => {
    if (!imagePrompt.trim()) {
      toast.error("Please enter a prompt for image generation");
      return;
    }

    setIsGeneratingImages(true);
    
    // Create placeholder items for the images being generated
    const newImages: ImageContent[] = Array.from({ length: bulkImageCount }, (_, index) => ({
      id: `img-${Date.now()}-${index}`,
      prompt: imagePrompt,
      imageUrl: null,
      status: 'generating',
      platform: selectedPlatform
    }));
    
    setGeneratedImages([...generatedImages, ...newImages]);
    
    // Simulate API call for image generation with staggered completion
    newImages.forEach((image, index) => {
      setTimeout(() => {
        setGeneratedImages(prev => 
          prev.map(img => 
            img.id === image.id 
              ? { ...img, imageUrl: `https://picsum.photos/seed/${img.id}/400/400`, status: 'completed' } 
              : img
          )
        );
        
        if (index === newImages.length - 1) {
          setIsGeneratingImages(false);
          toast.success(`Generated ${bulkImageCount} images successfully!`);
        }
      }, 1500 + (index * 500)); // Stagger the completion times
    });
    
    // Clear the prompt after generating
    setImagePrompt("");
  };

  // Handle text generation
  const generateTexts = () => {
    if (!textPrompt.trim()) {
      toast.error("Please enter a prompt for text generation");
      return;
    }

    setIsGeneratingTexts(true);
    
    // Create placeholder items for the texts being generated
    const newTexts: TextContent[] = Array.from({ length: textCount }, (_, index) => ({
      id: `text-${Date.now()}-${index}`,
      prompt: textPrompt,
      generatedText: "",
      type: selectedTextType as 'caption' | 'hashtags' | 'cta',
      status: 'generating',
      platform: selectedPlatform
    }));
    
    setGeneratedTexts([...generatedTexts, ...newTexts]);
    
    // Simulate API call for text generation with staggered completion
    const sampleTexts = {
      caption: [
        "Dive into a world of imagination with our latest comic release! 📚✨ #ComicBookDay",
        "When art meets storytelling - the magic of comics comes alive! 🎨📖 #CreativeStorytelling",
        "Every frame tells a story, every page an adventure. Discover our newest creation! 🚀📚",
        "Unleash your imagination with our visually stunning comic series - where dreams take form! ✨📖",
        "Characters that stay with you long after you've turned the last page. Experience our new comic today! 🦸‍♀️📚"
      ],
      hashtags: [
        "#ComicArt #DigitalComics #CreativeStorytelling #ArtisticExpression #VisualNarrative",
        "#GraphicNovel #ComicIllustration #StoryArt #VisualStorytelling #CharacterDesign",
        "#ComicBookArt #IllustratedStory #DigitalArt #CreativeContent #ArtisticVision",
        "#ComicCreator #VisualContent #StorytellingArt #CreativeDesign #ArtisticNarrative",
        "#DigitalStorytelling #ComicNarrative #VisualExpression #CreativeIllustration #ArtisticContent"
      ],
      cta: [
        "Grab your copy today and step into a new world! Link in bio. 👆",
        "Limited edition available now! Click to secure your copy before they're gone.",
        "Pre-order now and get exclusive bonus content! Swipe up to order.",
        "Join our community of comic lovers! Subscribe for early access to new releases.",
        "Double tap if you can't wait to read this! Order now through our website."
      ]
    };
    
    newTexts.forEach((text, index) => {
      setTimeout(() => {
        const sampleTextArray = sampleTexts[text.type];
        const randomText = sampleTextArray[index % sampleTextArray.length];
        
        setGeneratedTexts(prev => 
          prev.map(txt => 
            txt.id === text.id 
              ? { ...txt, generatedText: randomText, status: 'completed' } 
              : txt
          )
        );
        
        if (index === newTexts.length - 1) {
          setIsGeneratingTexts(false);
          toast.success(`Generated ${textCount} texts successfully!`);
        }
      }, 1000 + (index * 300)); // Stagger the completion times
    });
    
    // Clear the prompt after generating
    setTextPrompt("");
  };

  // Handle image deletion
  const deleteImage = (id: string) => {
    setGeneratedImages(generatedImages.filter(img => img.id !== id));
    toast.info("Image removed");
  };

  // Handle text deletion
  const deleteText = (id: string) => {
    setGeneratedTexts(generatedTexts.filter(txt => txt.id !== id));
    toast.info("Text removed");
  };

  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Handle downloading all content
  const downloadAllContent = () => {
    toast.success("Preparing download...");
    // In a real implementation, this would package all generated content for download
    setTimeout(() => {
      toast.success("Download complete!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="outline" size="sm" asChild>
            <Link to="/marketing-plan">
              <ChevronLeft className="w-4 h-4" />
              Back to Marketing Plan
            </Link>
          </Button>
        </div>
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">AI Content Creation Studio</h1>
            <p className="text-gray-400 mt-1">Generate and manage social media assets with AI</p>
          </div>
          
          <Button onClick={downloadAllContent} className="bg-primary hover:bg-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Download All Content
          </Button>
        </div>
        
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid grid-cols-2 w-full md:w-[400px] bg-black/30 backdrop-blur-md border border-white/10 mb-6">
            <TabsTrigger value="images" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <ImageIcon className="w-4 h-4 mr-2" />
              Visual Content
            </TabsTrigger>
            <TabsTrigger value="text" className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
              <FileText className="w-4 h-4 mr-2" />
              Captions & Text
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="images" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="bg-black/20 backdrop-blur-md border border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      Generate Images
                    </CardTitle>
                    <CardDescription>
                      Create custom images for your social media posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="image-prompt">What would you like to create?</Label>
                      <Textarea
                        id="image-prompt"
                        placeholder="Enter a detailed description of the image..."
                        value={imagePrompt}
                        onChange={(e) => setImagePrompt(e.target.value)}
                        className="bg-black/30 border-white/10 min-h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Number of images: {bulkImageCount}</Label>
                      <Slider
                        value={[bulkImageCount]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => setBulkImageCount(value[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger id="platform" className="bg-black/30 border-white/10">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={generateImages}
                      disabled={isGeneratingImages || !imagePrompt.trim()}
                    >
                      {isGeneratingImages ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate {bulkImageCount} Images
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Generated Images</h2>
                    <div className="text-xs text-gray-400">
                      {generatedImages.length} images
                    </div>
                  </div>
                  
                  {generatedImages.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                      <h3 className="text-lg font-medium text-gray-300">No images generated yet</h3>
                      <p className="text-gray-400 max-w-md mx-auto mt-2">
                        Fill out the form and click "Generate Images" to create custom visuals for your social media
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {generatedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square bg-black/40 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center">
                            {image.status === 'generating' ? (
                              <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
                            ) : image.imageUrl ? (
                              <img 
                                src={image.imageUrl} 
                                alt={image.prompt} 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <X className="h-8 w-8 text-red-500" />
                            )}
                          </div>
                          
                          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-white w-full"
                              onClick={() => copyToClipboard(image.prompt)}
                              disabled={image.status === 'generating'}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy Prompt
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-white w-full"
                              onClick={() => deleteImage(image.id)}
                            >
                              <Trash className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                          
                          <div className="mt-1 text-xs flex justify-between">
                            <span className="text-gray-400 truncate max-w-[100px]">{selectedPlatform}</span>
                            <span className={`${
                              image.status === 'completed' ? 'text-green-400' : 
                              image.status === 'generating' ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                              {image.status === 'completed' ? 'Ready' : 
                              image.status === 'generating' ? 'Processing...' : 'Failed'}
                            </span>
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="aspect-square flex flex-col items-center justify-center border-dashed"
                        onClick={() => setImagePrompt("Create a promotional image for a comic book")}
                      >
                        <Plus className="h-8 w-8 mb-2" />
                        <span className="text-xs">Add New</span>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="text" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card className="bg-black/20 backdrop-blur-md border border-white/5">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-primary" />
                      Generate Text
                    </CardTitle>
                    <CardDescription>
                      Create captions, hashtags and calls-to-action
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-prompt">What kind of text do you need?</Label>
                      <Textarea
                        id="text-prompt"
                        placeholder="Describe what you want to generate..."
                        value={textPrompt}
                        onChange={(e) => setTextPrompt(e.target.value)}
                        className="bg-black/30 border-white/10 min-h-24"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Number of variations: {textCount}</Label>
                      <Slider
                        value={[textCount]}
                        min={1}
                        max={10}
                        step={1}
                        onValueChange={(value) => setTextCount(value[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="text-type">Text Type</Label>
                      <Select value={selectedTextType} onValueChange={setSelectedTextType}>
                        <SelectTrigger id="text-type" className="bg-black/30 border-white/10">
                          <SelectValue placeholder="Select text type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="caption">Captions</SelectItem>
                          <SelectItem value="hashtags">Hashtags</SelectItem>
                          <SelectItem value="cta">Call-to-Action</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="text-platform">Platform</Label>
                      <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <SelectTrigger id="text-platform" className="bg-black/30 border-white/10">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="twitter">Twitter</SelectItem>
                          <SelectItem value="tiktok">TikTok</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={generateTexts}
                      disabled={isGeneratingTexts || !textPrompt.trim()}
                    >
                      {isGeneratingTexts ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate {textCount} {selectedTextType === 'caption' ? 'Captions' : 
                                             selectedTextType === 'hashtags' ? 'Hashtag Sets' : 'CTAs'}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Generated Text</h2>
                    <div className="text-xs text-gray-400">
                      {generatedTexts.length} items
                    </div>
                  </div>
                  
                  {generatedTexts.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                      <h3 className="text-lg font-medium text-gray-300">No text generated yet</h3>
                      <p className="text-gray-400 max-w-md mx-auto mt-2">
                        Fill out the form and click "Generate Text" to create captions, hashtags, or calls-to-action
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {generatedTexts.map((text) => (
                        <div key={text.id} className="bg-black/40 rounded-lg p-4 border border-white/10">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                {text.type === 'caption' ? 'Caption' : 
                                text.type === 'hashtags' ? 'Hashtags' : 'CTA'}
                              </span>
                              <span className="text-xs text-gray-400">
                                {text.platform}
                              </span>
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => copyToClipboard(text.generatedText)}
                                disabled={text.status === 'generating'}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-7 w-7 p-0"
                                onClick={() => deleteText(text.id)}
                              >
                                <Trash className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mt-2">
                            {text.status === 'generating' ? (
                              <div className="flex items-center h-16 justify-center">
                                <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />
                              </div>
                            ) : (
                              <p className="text-sm">{text.generatedText}</p>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <Button 
                        variant="outline" 
                        className="w-full border-dashed py-6"
                        onClick={() => {
                          if (selectedTextType === 'caption') {
                            setTextPrompt("Write an engaging caption for a comic book post");
                          } else if (selectedTextType === 'hashtags') {
                            setTextPrompt("Generate relevant hashtags for a comic book marketing post");
                          } else {
                            setTextPrompt("Create a persuasive call-to-action for comic book sales");
                          }
                        }}
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Add New {selectedTextType === 'caption' ? 'Caption' : 
                                selectedTextType === 'hashtags' ? 'Hashtags' : 'CTA'}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContentCreator;
