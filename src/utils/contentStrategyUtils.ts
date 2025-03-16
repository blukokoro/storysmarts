
import { ContentType } from "@/types/marketing";

// Calculate content needs based on parameters
export const calculateContentNeeds = (
  postsPerDay: number,
  campaignDays: number,
  contentTypes: ContentType[]
) => {
  const totalPosts = postsPerDay * campaignDays;
  
  // Calculate distribution based on content type factors
  const totalFactors = contentTypes.reduce((sum, type) => sum + type.factor, 0);
  
  return contentTypes.map(type => {
    // Calculate percentage based on factor weight
    const percentage = type.factor / totalFactors;
    // Calculate count based on percentage of total posts
    let count = Math.round(totalPosts * percentage);
    // Make sure we don't exceed limits
    count = Math.min(count, type.limit);
    
    return {
      ...type,
      count,
      percentage: Math.round(percentage * 100)
    };
  });
};

// Calculate total content pieces needed based on average views
export const calculateTotalContentNeeded = (
  contentNeeds: any[],
  postsPerDay: number,
  averageViews: string,
  reachProjectionData: any[]
) => {
  const totalContentPieces = contentNeeds.reduce((sum, type) => sum + type.count, 0);
  
  const views = parseInt(averageViews) || 0;
  const requiredReach = Math.round(reachProjectionData.find(data => data.posts >= postsPerDay)?.reach * 30 || 150000);
  
  if (views <= 0) return totalContentPieces;
  
  // Calculate how many posts needed to reach the required audience
  const estimatedReachPerPost = views;
  const postsNeeded = Math.ceil(requiredReach / estimatedReachPerPost);
  
  return Math.max(totalContentPieces, postsNeeded);
};
