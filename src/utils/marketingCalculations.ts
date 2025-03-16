
export const calculateProjections = (impressions: number) => {
  const conversionRate = 0.01; // 1%
  const averageOrderValue = 3.49; // €3.49 average digital comic price
  
  const conversions = impressions * conversionRate;
  const revenue = conversions * averageOrderValue;
  
  return {
    impressions,
    conversions: Math.round(conversions),
    revenue: Math.round(revenue),
    adSpend: Math.round(impressions / 1000 * 5.12) // Average CPM across platforms
  };
};

export const calculateBreakEvenMetrics = (productionCost: number) => {
  const averagePrice = 3.49; // Average digital comic price
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = targetSales / conversionRate;
  
  // Calculate average CPM (simplified for refactoring)
  const averageCpm = 4.62; 
  const estimatedAdBudget = Math.ceil((impressionsNeeded / 1000) * averageCpm);
  
  return {
    targetSales,
    impressionsNeeded,
    estimatedAdBudget,
    averagePrice
  };
};

export const generatePriceData = (productionCost: number) => {
  return [
    { price: 1.99, units: Math.ceil(productionCost / 1.99) },
    { price: 2.99, units: Math.ceil(productionCost / 2.99) },
    { price: 3.49, units: Math.ceil(productionCost / 3.49) },
    { price: 3.99, units: Math.ceil(productionCost / 3.99) },
    { price: 4.99, units: Math.ceil(productionCost / 4.99) },
    { price: 5.99, units: Math.ceil(productionCost / 5.99) },
  ];
};
