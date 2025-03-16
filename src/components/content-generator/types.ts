
export type ModelType = 'stable-diffusion' | 'midjourney-style' | 'realistic' | 'comic-art' | 'pixel-art';
export type LoraType = 'street-photography' | 'comic-book' | 'anime-style' | 'fantasy' | 'realistic-portrait';

export interface GeneratedContent {
  type: 'image' | 'text' | 'quote';
  content: string;
  prompt?: string;
}
