
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from 'sonner';
import { Sparkles } from 'lucide-react';
import { GeneratedContent, ModelType, LoraType } from '@/components/content-generator/types';
import DocumentUploader from '@/components/content-generator/DocumentUploader';
import ContentGeneratorTabs from '@/components/content-generator/ContentGeneratorTabs';
import GeneratedContentList from '@/components/content-generator/GeneratedContentList';

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

  const handleRemoveContentItem = (index: number) => {
    const newContent = [...generatedContent];
    newContent.splice(index, 1);
    setGeneratedContent(newContent);
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
                <DocumentUploader 
                  documentText={documentText}
                  setDocumentText={setDocumentText}
                  onFileUpload={handleFileUpload}
                />
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
                <ContentGeneratorTabs 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
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
      </div>
    </div>
  );
};

export default ContentGenerator;
