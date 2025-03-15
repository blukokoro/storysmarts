
export interface StoryAnalysis {
  title: string;
  comicPanels: ComicPanelAnalysis;
  storyboard: StoryboardAnalysis;
  moviePitch: MoviePitchAnalysis;
  audienceAnalysis: AudienceAnalysis;
  budgetEstimate: BudgetEstimate;
}

export interface ComicPanelAnalysis {
  suggestedPanelCount: number;
  suggestedPageCount: number;
  keyScenesForPanels: string[];
  panelLayout: string;
}

export interface StoryboardAnalysis {
  sceneCount: number;
  keyScenes: KeyScene[];
  visualStyle: string;
  shotTypes: string[];
}

export interface KeyScene {
  id: number;
  description: string;
  shotType: string;
  visualNotes: string;
}

export interface MoviePitchAnalysis {
  coreConcept: string;
  uniqueSellingPoint: string;
  targetAudience: string;
  marketPotential: string;
  comparableSuccesses: string[];
  logline: string;
}

export interface AudienceAnalysis {
  primaryDemographic: {
    ageRange: string;
    gender: string;
    interests: string[];
  };
  secondaryDemographic: {
    ageRange: string;
    gender: string;
    interests: string[];
  };
  platformRecommendations: string[];
  genreCompatibility: {
    genre: string;
    compatibilityScore: number;
  }[];
}

export interface BudgetEstimate {
  baseAmount: number;
  factors: {
    name: string;
    impact: number;
    description: string;
  }[];
  totalEstimate: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
}
