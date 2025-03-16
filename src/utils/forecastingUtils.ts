
/**
 * Generates initial forecast data based on target sales
 */
export const generateInitialForecastData = (
  targetSales: number,
  platformCpmData: Array<{ platform: string; cpm: number; color: string }>
) => {
  return {
    dailyViews: Math.ceil((targetSales * 100) / 1), // Assuming 1% conversion rate
    weeklyViews: Math.ceil(((targetSales * 100) / 1) * 7),
    monthlyViews: Math.ceil(((targetSales * 100) / 1) * 30),
    projections: [
      { week: 1, expected: Math.round(targetSales * 0.15), pessimistic: Math.round(targetSales * 0.10), optimistic: Math.round(targetSales * 0.20) },
      { week: 2, expected: Math.round(targetSales * 0.25), pessimistic: Math.round(targetSales * 0.18), optimistic: Math.round(targetSales * 0.32) },
      { week: 3, expected: Math.round(targetSales * 0.30), pessimistic: Math.round(targetSales * 0.22), optimistic: Math.round(targetSales * 0.38) },
      { week: 4, expected: Math.round(targetSales * 0.20), pessimistic: Math.round(targetSales * 0.15), optimistic: Math.round(targetSales * 0.25) },
      { week: 5, expected: Math.round(targetSales * 0.10), pessimistic: Math.round(targetSales * 0.07), optimistic: Math.round(targetSales * 0.13) },
    ],
    platformBreakdown: platformCpmData.map(platform => ({
      platform: platform.platform,
      sales: Math.round(targetSales * (platform.cpm / (platformCpmData.reduce((sum, p) => sum + p.cpm, 0)))),
      color: platform.color
    }))
  };
};
