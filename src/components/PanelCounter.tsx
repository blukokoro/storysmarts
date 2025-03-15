
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ComicPanelAnalysis } from '@/types';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CalendarClock, Wrench } from 'lucide-react';

interface PanelCounterProps {
  data: ComicPanelAnalysis;
}

const PanelCounter: React.FC<PanelCounterProps> = ({ data }) => {
  // Calculate panel info to display
  const totalPanels = data.suggestedPanelCount;
  const totalPages = data.suggestedPageCount;
  
  // Calculate price estimation (minimum 30 panels at €9 each)
  const minimumPanels = 30;
  const pricePerPanel = 9;
  const calculatedPanels = Math.max(totalPanels, minimumPanels);
  const estimatedPrice = calculatedPanels * pricePerPanel;

  // Calculate timeline (1 week for 100 panels - updated production rate)
  const panelsPerWeek = 100;
  
  // Calculate the phase durations
  const styleDefinitionWeeks = Math.max(1, Math.ceil(calculatedPanels / panelsPerWeek * 0.15));
  const characterCreationWeeks = Math.max(1, Math.ceil(calculatedPanels / panelsPerWeek * 0.25));
  const panelsStructureWeeks = Math.max(1, Math.ceil(calculatedPanels / panelsPerWeek * 0.4));
  const paginationWeeks = Math.max(1, Math.ceil(calculatedPanels / panelsPerWeek * 0.1));
  const finalDeliveryWeeks = Math.max(1, Math.ceil(calculatedPanels / panelsPerWeek * 0.1));
  
  // Total project weeks (sum of all sequential phases)
  const estimatedWeeks = styleDefinitionWeeks + characterCreationWeeks + panelsStructureWeeks + paginationWeeks + finalDeliveryWeeks;
  const estimatedDays = estimatedWeeks * 7;
  
  // Multiple issues estimation
  const panelsPerPage = Math.ceil(totalPanels / totalPages);
  const minPagesPerIssue = 25;
  const issueCount = Math.ceil(totalPages / minPagesPerIssue);
  const pagesPerIssue = Math.ceil(totalPages / issueCount);
  const panelsPerIssue = pagesPerIssue * panelsPerPage;
  const pricePerIssue = Math.max(panelsPerIssue, minimumPanels) * pricePerPanel;

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex justify-between items-center">
          <span>Comic Book Design</span>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 flex items-center">
              <Link to="/diy-comic-creation">
                <Wrench className="h-4 w-4 mr-1" />
                Make Yourself
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/pricing">See Comic Pricing</Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Recommended Panels</h4>
            <p className="text-2xl font-semibold text-white">{totalPanels}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Estimated Pages</h4>
            <p className="text-2xl font-semibold text-white">{totalPages}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Estimated Price</h4>
            <p className="text-2xl font-semibold text-primary">€{estimatedPrice}</p>
            <p className="text-xs text-gray-500">@€9/panel</p>
          </div>
        </div>

        {/* Multiple Issues Estimation */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Multiple Issues</h4>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-400">Recommended Issues</p>
                <p className="text-xl font-semibold text-white">{issueCount}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Pages per Issue</p>
                <p className="text-xl font-semibold text-white">{pagesPerIssue}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Price per Issue</p>
                <p className="text-xl font-semibold text-primary">€{pricePerIssue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-md font-medium text-white">Panel Breakdown</h4>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-white">Key Scenes</span>
            </div>
            {data.keyScenesForPanels.map((scene, index) => (
              <p key={index} className="text-xs text-gray-400 mb-1">{scene}</p>
            ))}
          </div>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium text-white">Layout Style</span>
            </div>
            <p className="text-xs text-gray-400">{data.panelLayout}</p>
          </div>
        </div>
        
        {/* Project Timeline Section */}
        <div className="space-y-2">
          <h4 className="text-md font-medium text-white flex items-center gap-2">
            <CalendarClock className="h-4 w-4 text-primary" />
            Project Timeline
          </h4>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <p className="text-xs text-gray-400">Estimated Timeline</p>
                <p className="text-lg font-semibold text-white">{estimatedWeeks} weeks</p>
                <p className="text-xs text-gray-500">({estimatedDays} days)</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">Production Rate</p>
                <p className="text-lg font-semibold text-white">100 panels/week</p>
                <p className="text-xs text-gray-500">(Standard production)</p>
              </div>
            </div>
            <div className="space-y-1 mt-3">
              <div className="w-full bg-black/30 h-7 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center px-2 text-xs text-gray-300 font-medium">
                  Style Definition ({styleDefinitionWeeks} weeks)
                </div>
                <div 
                  className="h-full bg-primary/40 rounded-l-md"
                  style={{ width: `${(styleDefinitionWeeks/estimatedWeeks) * 100}%` }}
                ></div>
              </div>
              <div className="w-full bg-black/30 h-7 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center px-2 text-xs text-gray-300 font-medium">
                  Character Creation ({characterCreationWeeks} weeks)
                </div>
                <div 
                  className="h-full bg-primary/45 rounded-l-md"
                  style={{ width: `${(characterCreationWeeks/estimatedWeeks) * 100}%` }}
                ></div>
              </div>
              <div className="w-full bg-black/30 h-7 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center px-2 text-xs text-gray-300 font-medium">
                  Panels & Structure ({panelsStructureWeeks} weeks)
                </div>
                <div 
                  className="h-full bg-primary/50 rounded-l-md" 
                  style={{ width: `${(panelsStructureWeeks/estimatedWeeks) * 100}%` }}
                ></div>
              </div>
              <div className="w-full bg-black/30 h-7 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center px-2 text-xs text-gray-300 font-medium">
                  Pagination ({paginationWeeks} weeks)
                </div>
                <div 
                  className="h-full bg-primary/55 rounded-l-md" 
                  style={{ width: `${(paginationWeeks/estimatedWeeks) * 100}%` }}
                ></div>
              </div>
              <div className="w-full bg-black/30 h-7 rounded-md overflow-hidden relative">
                <div className="absolute inset-0 flex items-center px-2 text-xs text-gray-300 font-medium">
                  Final PDF Delivery ({finalDeliveryWeeks} weeks)
                </div>
                <div 
                  className="h-full bg-primary/60 rounded-l-md" 
                  style={{ width: `${(finalDeliveryWeeks/estimatedWeeks) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <div className="grid grid-cols-3 gap-2">
            <Button asChild variant="outline" size="sm" className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20">
              <Link to="/pricing">Basic €299</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/20 border-primary/40 text-primary hover:bg-primary/30">
              <Link to="/pricing">Standard €399</Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="bg-primary/30 border-primary/50 text-primary hover:bg-primary/40">
              <Link to="/pricing">Premium €599</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PanelCounter;
