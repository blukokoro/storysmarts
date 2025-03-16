
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowRight } from 'lucide-react';
import TrafficRequirements from './TrafficRequirements';

interface ForecastFormProps {
  customTarget: string;
  setCustomTarget: React.Dispatch<React.SetStateAction<string>>;
  generateForecast: () => void;
  loading: boolean;
  forecastData: any;
}

const ForecastForm: React.FC<ForecastFormProps> = ({
  customTarget,
  setCustomTarget,
  generateForecast,
  loading,
  forecastData
}) => {
  return (
    <div className="col-span-1 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="target-sales">Target Sales (copies)</Label>
        <Input 
          id="target-sales" 
          type="number" 
          min="1"
          value={customTarget}
          onChange={(e) => setCustomTarget(e.target.value)}
          className="bg-black/30 border-white/10"
        />
      </div>
      
      <Button 
        onClick={generateForecast}
        className="w-full bg-primary hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Generate Forecast"}
        {!loading && <ArrowRight className="ml-2 w-4 h-4" />}
      </Button>
      
      {forecastData && <TrafficRequirements forecastData={forecastData} />}
    </div>
  );
};

export default ForecastForm;
