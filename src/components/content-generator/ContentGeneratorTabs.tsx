
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ImageIcon, MessageSquareQuote, PenSquare } from 'lucide-react';
import ImageGeneratorTab from './ImageGeneratorTab';
import QuoteExtractorTab from './QuoteExtractorTab';
import TextGeneratorTab from './TextGeneratorTab';

type ModelType = 'stable-diffusion' | 'midjourney-style' | 'realistic' | 'comic-art' | 'pixel-art';
type LoraType = 'street-photography' | 'comic-book' | 'anime-style' | 'fantasy' | 'realistic-portrait';

interface ContentGeneratorTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  imagePrompt: string;
  setImagePrompt: (prompt: string) => void;
  selectedModel: ModelType;
  setSelectedModel: (model: ModelType) => void;
  selectedLora: LoraType;
  setSelectedLora: (lora: LoraType) => void;
  imageSize: string;
  setImageSize: (size: string) => void;
  imageCount: number;
  setImageCount: (count: number) => void;
  samplingSteps: number;
  setSamplingSteps: (steps: number) => void;
  cfgScale: number;
  setCfgScale: (scale: number) => void;
  useAdvancedSettings: boolean;
  setUseAdvancedSettings: (use: boolean) => void;
  documentText: string;
  isLoading: boolean;
  onGenerateImage: () => void;
  onGenerateQuotes: () => void;
  onGenerateMarketingText: () => void;
}

const ContentGeneratorTabs: React.FC<ContentGeneratorTabsProps> = ({
  activeTab,
  setActiveTab,
  imagePrompt,
  setImagePrompt,
  selectedModel,
  setSelectedModel,
  selectedLora,
  setSelectedLora,
  imageSize,
  setImageSize,
  imageCount,
  setImageCount,
  samplingSteps,
  setSamplingSteps,
  cfgScale,
  setCfgScale,
  useAdvancedSettings,
  setUseAdvancedSettings,
  documentText,
  isLoading,
  onGenerateImage,
  onGenerateQuotes,
  onGenerateMarketingText
}) => {
  return (
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

      <TabsContent value="image-generator">
        <ImageGeneratorTab 
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
          isLoading={isLoading}
          onGenerateImage={onGenerateImage}
        />
      </TabsContent>

      <TabsContent value="quote-extractor">
        <QuoteExtractorTab 
          documentText={documentText}
          isLoading={isLoading}
          onGenerateQuotes={onGenerateQuotes}
        />
      </TabsContent>

      <TabsContent value="text-generator">
        <TextGeneratorTab 
          documentText={documentText}
          isLoading={isLoading}
          onGenerateMarketingText={onGenerateMarketingText}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ContentGeneratorTabs;
