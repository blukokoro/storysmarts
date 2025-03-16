
import React from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import TabButtons from './TabButtons';
import ImageGeneratorTab from './ImageGeneratorTab';
import QuoteExtractorTab from './QuoteExtractorTab';
import TextGeneratorTab from './TextGeneratorTab';
import { ModelType, LoraType } from './types';

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
      <TabButtons activeTab={activeTab} />

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
