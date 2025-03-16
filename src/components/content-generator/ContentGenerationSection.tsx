
import React from 'react';
import { Card } from '@/components/ui/card';
import ContentGeneratorTabs from './ContentGeneratorTabs';
import GeneratedContentList from './GeneratedContentList';
import { GeneratedContent, ModelType, LoraType } from './types';

interface ContentGenerationSectionProps {
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
  generatedContent: GeneratedContent[];
  setGeneratedContent: (content: GeneratedContent[]) => void;
  onGenerateImage: () => void;
  onGenerateQuotes: () => void;
  onGenerateMarketingText: () => void;
  onRemoveContentItem: (index: number) => void;
}

const ContentGenerationSection: React.FC<ContentGenerationSectionProps> = ({
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
  generatedContent,
  setGeneratedContent,
  onGenerateImage,
  onGenerateQuotes,
  onGenerateMarketingText,
  onRemoveContentItem
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10">
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
            onGenerateImage={onGenerateImage}
            onGenerateQuotes={onGenerateQuotes}
            onGenerateMarketingText={onGenerateMarketingText}
          />
        </Card>
      </div>

      <div className="lg:col-span-2">
        <Card className="bg-black/30 backdrop-blur-sm border border-white/10 h-full">
          <GeneratedContentList 
            generatedContent={generatedContent}
            onClearAll={() => setGeneratedContent([])}
            onRemoveItem={onRemoveContentItem}
          />
        </Card>
      </div>
    </div>
  );
};

export default ContentGenerationSection;
