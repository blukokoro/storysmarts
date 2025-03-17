
import React from 'react';

interface ComicPricingCalculatorProps {
  installmentPeriod: string;
}

// Convert to a hook function instead of a React component
export const useComicPricingCalculator = ({ installmentPeriod }: ComicPricingCalculatorProps) => {
  // Calculate comic book budget based on panel count
  const minimumPanels = 30;
  const pricePerPanel = 9;
  const estimatedPanelCount = 40; // Using an average value for demonstration
  const calculatedPanels = Math.max(estimatedPanelCount, minimumPanels);
  const comicTotalEstimate = calculatedPanels * pricePerPanel;
  const comicMonthlyAmount = Math.ceil(comicTotalEstimate / parseInt(installmentPeriod));

  return {
    comicTotalEstimate,
    comicMonthlyAmount,
    calculatedPanels,
    pricePerPanel
  };
};

export default useComicPricingCalculator;
