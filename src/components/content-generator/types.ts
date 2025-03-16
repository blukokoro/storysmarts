
export type ModelType = 'stable-diffusion' | 'midjourney-style' | 'realistic' | 'comic-art' | 'pixel-art';
export type LoraType = 'street-photography' | 'comic-book' | 'anime-style' | 'fantasy' | 'realistic-portrait';

export interface GeneratedContent {
  type: 'image' | 'text' | 'quote';
  content: string;
  prompt?: string;
  category?: string;
  score?: number;
  source?: string;
  tags?: string[];
  aiModel?: string;
}

export interface ContentAnalysis {
  keyThemes: string[];
  suggestedTopics: string[];
  keyTerms: string[];
  sentimentScore: number;
  audienceMatch: {
    demographic: string;
    score: number;
  }[];
}

export interface AIContentPlan {
  contentTypes: {
    type: string;
    count: number;
    examples: string[];
  }[];
  schedule: {
    week: number;
    content: {
      type: string;
      description: string;
      platform: string;
    }[];
  }[];
  keywords: string[];
  hashtagSuggestions: string[];
}
