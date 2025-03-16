
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChartPie, ChartBar, TrendingUp, Zap } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { Analysis } from './types';

interface AnalysisTabProps {
  analyses: Analysis[];
}

const AnalysisTab: React.FC<AnalysisTabProps> = ({ analyses }) => {
  const navigate = useNavigate();

  const handleViewAnalysis = (analysisId: string) => {
    toast.success(`Viewing analysis ${analysisId}`);
    navigate('/analyze');
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Analysis Reports</h1>
        <div className="flex space-x-2">
          <Button onClick={() => navigate('/analyze')}>Create New Analysis</Button>
          <Button variant="outline" asChild>
            <Link to="/marketing-plan">
              <TrendingUp className="h-4 w-4 mr-2" />
              Marketing Plan
            </Link>
          </Button>
          <Button variant="outline" className="bg-primary/20 border-primary/30 text-primary hover:bg-primary/30" asChild>
            <Link to="/content-generator">
              <Zap className="h-4 w-4 mr-2" />
              AI Content Generator
            </Link>
          </Button>
        </div>
      </div>
      
      {analyses.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="bg-black/20 backdrop-blur-sm border-white/10 hover:bg-black/30 transition-colors">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-start md:items-center mb-4 md:mb-0">
                    <div className="rounded-full bg-primary/20 p-2 mr-4">
                      {analysis.type.includes('Comic') ? (
                        <ChartPie className="h-6 w-6 text-primary" />
                      ) : (
                        <ChartBar className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{analysis.title}</h3>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span>{analysis.type}</span>
                        <span className="mx-2">•</span>
                        <span>{new Date(analysis.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewAnalysis(analysis.id)}
                  >
                    View Full Analysis
                  </Button>
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Audience Size</div>
                    <div className="font-medium">{analysis.insights.audienceSize}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Revenue Potential</div>
                    <div className="font-medium">{analysis.insights.potentialRevenue}</div>
                  </div>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/5">
                    <div className="text-xs text-gray-400 mb-1">Break-even Point</div>
                    <div className="font-medium">{analysis.insights.breakEvenPoint}</div>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-400 flex justify-between">
                  <span>Marketing Budget: {analysis.insights.marketingBudget}</span>
                  <div className="flex items-center gap-3">
                    <Link to="/marketing-plan" className="flex items-center text-primary hover:underline">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      <span>Marketing Plan</span>
                    </Link>
                    <Link to="/content-creator" className="flex items-center text-primary hover:underline">
                      <Zap className="h-3 w-3 mr-1" />
                      <span>AI Content</span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-black/20 backdrop-blur-sm border-white/10">
          <CardContent className="p-6 text-center">
            <p className="text-gray-400 mb-4">You haven't created any analysis reports yet.</p>
            <Button onClick={() => navigate('/analyze')}>Create Your First Analysis</Button>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AnalysisTab;
