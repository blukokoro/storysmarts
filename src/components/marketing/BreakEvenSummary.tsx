
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface BreakEvenSummaryProps {
  productionCost?: number;
  targetSales?: number;
  impressionsNeeded?: number;
  estimatedAdBudget?: number;
}

const BreakEvenSummary: React.FC<BreakEvenSummaryProps> = ({
  productionCost: propProductionCost,
  targetSales: propTargetSales,
  impressionsNeeded: propImpressionsNeeded,
  estimatedAdBudget: propEstimatedAdBudget
}) => {
  // Comic book production costs (just for calculation, not displayed anymore)
  const comicProductionCosts = {
    conceptAndCharacterDesign: 375, // 25% of budget
    lineArtAndInking: 570, // 38% of budget
    coloringAndLettering: 375, // 25% of budget
    layoutAndFinalAssembly: 180, // 12% of budget
  };

  // Calculate total production cost
  const productionCost = propProductionCost || 
    Object.values(comicProductionCosts).reduce((sum, cost) => sum + cost, 0);
  
  // Calculate other metrics based on production cost
  const averagePrice = 3.49; // Average digital comic price
  const conversionRate = 0.01; // 1% conversion rate
  
  const targetSales = propTargetSales || Math.ceil(productionCost / averagePrice);
  const impressionsNeeded = propImpressionsNeeded || (targetSales / conversionRate);
  
  // Calculate average CPM from common platform data
  const averageCpm = 4.62; // Average CPM across platforms
  const estimatedAdBudget = propEstimatedAdBudget || Math.ceil((impressionsNeeded / 1000) * averageCpm);

  const handleDownloadReport = async () => {
    const marketingPlanElement = document.getElementById('marketing-plan');
    if (!marketingPlanElement) return;

    try {
      const canvas = await html2canvas(marketingPlanElement);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.setFontSize(20);
      pdf.text('Marketing Plan Report', pdfWidth / 2, 20, { align: 'center' });
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('marketing-plan-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="sm" asChild>
          <Link to="/marketing">
            <ChevronLeft className="w-4 h-4" />
            Back to Marketing
          </Link>
        </Button>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">Marketing Plan</h1>
      <p className="text-gray-400 max-w-3xl">
        This comprehensive analysis provides detailed advertising budget projections, content strategy recommendations, 
        and revenue forecasts to optimize your marketing efforts.
      </p>
      
      <div className="mt-6 p-6 rounded-lg bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Break-Even Analysis</h2>
            <p className="text-sm text-gray-400 mb-4">Based on comic book production costs and average selling price</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Production Cost</p>
                <p className="text-lg font-bold">€{productionCost}</p>
                <p className="text-[10px] text-gray-500 mt-1">Comic book creation</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Sales Needed</p>
                <p className="text-lg font-bold">{targetSales} copies</p>
                <p className="text-[10px] text-gray-500 mt-1">At €{averagePrice} per copy</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Impressions Needed</p>
                <p className="text-lg font-bold">{Math.ceil(impressionsNeeded).toLocaleString()}</p>
                <p className="text-[10px] text-gray-500 mt-1">At {conversionRate * 100}% conversion rate</p>
              </div>
              <div className="bg-black/30 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-gray-400">Ad Budget Estimate</p>
                <p className="text-lg font-bold">€{estimatedAdBudget}</p>
                <p className="text-[10px] text-gray-500 mt-1">Based on €{averageCpm} CPM</p>
              </div>
            </div>
          </div>
          
          <Button 
            className="bg-primary hover:bg-primary/90" 
            size="lg" 
            onClick={handleDownloadReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenSummary;
