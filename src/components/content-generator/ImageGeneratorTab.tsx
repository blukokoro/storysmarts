
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw } from 'lucide-react';

type ModelType = 'stable-diffusion' | 'midjourney-style' | 'realistic' | 'comic-art' | 'pixel-art';
type LoraType = 'street-photography' | 'comic-book' | 'anime-style' | 'fantasy' | 'realistic-portrait';

interface ImageGeneratorTabProps {
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
  isLoading: boolean;
  onGenerateImage: () => void;
}

const ImageGeneratorTab: React.FC<ImageGeneratorTabProps> = ({
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
  isLoading,
  onGenerateImage
}) => {
  return (
    <div className="space-y-4">
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
        onClick={onGenerateImage}
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
    </div>
  );
};

export default ImageGeneratorTab;
