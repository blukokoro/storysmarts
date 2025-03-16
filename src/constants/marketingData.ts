
// Platform CPM data (2023)
export const platformCpmData = [
  { platform: 'LinkedIn', cpm: 6.59, color: '#0077B5' },
  { platform: 'Instagram', cpm: 6.29, color: '#E1306C' },
  { platform: 'Facebook', cpm: 5.82, color: '#1877F2' },
  { platform: 'TikTok', cpm: 3.86, color: '#000000' },
  { platform: 'Snapchat', cpm: 2.95, color: '#FFFC00' },
  { platform: 'Twitter', cpm: 2.19, color: '#1DA1F2' },
];

// Content reach projection data
export const reachProjectionData = [
  { posts: 2, reach: 1000, engagementRate: 3.2 },
  { posts: 4, reach: 2100, engagementRate: 3.0 },
  { posts: 6, reach: 3300, engagementRate: 2.8 },
  { posts: 8, reach: 4600, engagementRate: 2.5 },
  { posts: 10, reach: 6000, engagementRate: 2.3 },
  { posts: 12, reach: 7500, engagementRate: 2.1 },
  { posts: 14, reach: 9000, engagementRate: 1.9 },
  { posts: 16, reach: 10500, engagementRate: 1.7 },
];

// Budget allocation data
export const budgetAllocationData = [
  { name: 'Instagram', value: 30, color: '#E1306C' },
  { name: 'Facebook', value: 25, color: '#1877F2' },
  { name: 'TikTok', value: 20, color: '#000000' },
  { name: 'LinkedIn', value: 10, color: '#0077B5' },
  { name: 'Twitter', value: 10, color: '#1DA1F2' },
  { name: 'Snapchat', value: 5, color: '#FFFC00' },
];

// Comic book production costs breakdown
export const comicProductionCosts = {
  conceptAndCharacterDesign: 375, // 25% of budget
  lineArtAndInking: 570, // 38% of budget
  coloringAndLettering: 375, // 25% of budget
  layoutAndFinalAssembly: 180, // 12% of budget
};

// Calculate total production cost
export const productionCost = Object.values(comicProductionCosts).reduce((sum, cost) => sum + cost, 0);
