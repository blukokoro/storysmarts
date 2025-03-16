
import { ReactNode } from 'react';

export interface ContentType {
  type: string;
  icon: ReactNode;
  factor: number;
  limit: number;
  count?: number;
  percentage?: number;
}

export interface Platform {
  name: string;
  percentage: number;
  color: string;
}

export interface ReachProjectionData {
  posts: number;
  reach: number;
  engagementRate: number;
}

export interface ContentPlanDay {
  day: number;
  posts: {
    id: string;
    type: string;
    time: string;
  }[];
}

export interface ContentPlanSummary {
  totalPieces: number;
  campaignDuration: string;
  postsPerDay: number;
  estimatedReach: number;
}

export interface GeneratedContent {
  contentPlan: {
    summary: ContentPlanSummary;
    schedule: ContentPlanDay[];
  };
}
