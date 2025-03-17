
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BudgetEstimate } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

interface PaymentPlansSectionProps {
  data: BudgetEstimate;
  installmentPeriod: '1' | '2' | '3';
  setInstallmentPeriod: (period: '1' | '2' | '3') => void;
  filmMonthlyAmount: number;
  comicTotalEstimate: number;
  comicMonthlyAmount: number;
}

const PaymentPlansSection: React.FC<PaymentPlansSectionProps> = ({
  data,
  installmentPeriod,
  setInstallmentPeriod,
  filmMonthlyAmount,
  comicTotalEstimate,
  comicMonthlyAmount
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-md font-medium text-white">Payment Installments</h3>
      
      <Tabs defaultValue="plans" className="w-full">
        <TabsList className={`${isMobile ? 'flex flex-col' : 'grid grid-cols-2'} mb-4`}>
          <TabsTrigger value="plans" className={`${isMobile ? 'justify-start pl-4' : ''}`}>Payment Plans</TabsTrigger>
          <TabsTrigger value="comparison" className={`${isMobile ? 'justify-start pl-4' : ''}`}>Film vs Comic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="plans">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2 mb-2">
              <Button 
                variant={installmentPeriod === '1' ? "default" : "outline"} 
                size="sm"
                onClick={() => setInstallmentPeriod('1')}
                className={installmentPeriod === '1' ? "" : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"}
              >
                1 Month
              </Button>
              <Button 
                variant={installmentPeriod === '2' ? "default" : "outline"} 
                size="sm"
                onClick={() => setInstallmentPeriod('2')}
                className={installmentPeriod === '2' ? "" : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"}
              >
                2 Months
              </Button>
              <Button 
                variant={installmentPeriod === '3' ? "default" : "outline"} 
                size="sm"
                onClick={() => setInstallmentPeriod('3')}
                className={installmentPeriod === '3' ? "" : "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"}
              >
                3 Months
              </Button>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">AI Short Film Payment Plan</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total amount:</span>
                  <span className="text-white font-medium">€{data.totalEstimate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Number of payments:</span>
                  <span className="text-white font-medium">{installmentPeriod}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Monthly payment:</span>
                  <span className="text-primary font-medium">€{filmMonthlyAmount}</span>
                </div>
                
                <div className="pt-2 mt-2 border-t border-white/10">
                  <h5 className="text-sm font-medium text-white mb-2">Payment Schedule</h5>
                  {Array.from({ length: parseInt(installmentPeriod) }, (_, i) => (
                    <div key={i} className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Payment {i + 1}:</span>
                      <span className="text-white">{i === parseInt(installmentPeriod) - 1 
                        ? `€${data.totalEstimate - (filmMonthlyAmount * (parseInt(installmentPeriod) - 1))}` 
                        : `€${filmMonthlyAmount}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="comparison">
          <div className={`${isMobile ? 'space-y-4' : 'grid grid-cols-2 gap-4'}`}>
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <h4 className="font-medium text-white text-sm mb-2">AI Short Film</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">€{data.totalEstimate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Monthly (x{installmentPeriod}):</span>
                  <span className="text-primary">€{filmMonthlyAmount}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-lg border border-white/10">
              <h4 className="font-medium text-white text-sm mb-2">Comic Book</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-white">€{comicTotalEstimate}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Monthly (x{installmentPeriod}):</span>
                  <span className="text-primary">€{comicMonthlyAmount}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 bg-gradient-to-r from-primary/20 to-primary/5 p-3 rounded-lg border border-primary/20">
            <h4 className="font-medium text-white text-sm mb-1">Combined Package Deal</h4>
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Total for both:</span>
              <span className="text-white">€{data.totalEstimate + comicTotalEstimate}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-gray-300">Bundle discount:</span>
              <span className="text-green-400">-€{Math.round((data.totalEstimate + comicTotalEstimate) * 0.1)}</span>
            </div>
            <div className="flex justify-between text-xs mt-1 pt-1 border-t border-white/10">
              <span className="text-gray-300">Monthly payment (x{installmentPeriod}):</span>
              <span className="text-primary font-medium">€{Math.ceil(((data.totalEstimate + comicTotalEstimate) * 0.9) / parseInt(installmentPeriod))}</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentPlansSection;
