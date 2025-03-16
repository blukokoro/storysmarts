
export interface StorySummary {
  id: string;
  title: string;
  date: string;
  wordCount: number;
  type: 'comic' | 'storyboard' | 'pitch' | 'film';
}

export interface Storyboard {
  id: string;
  title: string;
  date: string;
  frames: number;
  hasImages: boolean;
}

export interface Analysis {
  id: string;
  title: string;
  date: string;
  type: string;
  insights: {
    audienceSize: string;
    primaryGender: string;
    potentialRevenue: string;
    marketingBudget: string;
    breakEvenPoint: string;
  };
}
