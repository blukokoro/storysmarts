
import React from 'react';
import { BarChart2 } from 'lucide-react';
import BudgetGanttChart, { GanttChartData } from '../charts/BudgetGanttChart';

const DevelopmentTimeline: React.FC = () => {
  const timelineData: GanttChartData[] = [
    { name: "Film: Pre-Production", start: 0, duration: 14, fill: "#3B82F6" },
    { name: "Film: Production", start: 14, duration: 7, fill: "#4F46E5" },
    { name: "Film: Post-Production", start: 21, duration: 7, fill: "#8B5CF6" },
    { name: "Film: Marketing", start: 28, duration: 7, fill: "#A855F7" },
    { name: "Comic: Concept", start: 0, duration: 7, fill: "#EC4899" },
    { name: "Comic: Line Art", start: 7, duration: 7, fill: "#F97316" },
    { name: "Comic: Coloring", start: 14, duration: 7, fill: "#0EA5E9" },
    { name: "Comic: Publishing", start: 21, duration: 7, fill: "#10B981" }
  ];

  return (
    <div>
      <h4 className="text-sm font-medium text-white mb-3 flex items-center">
        <BarChart2 className="w-4 h-4 mr-2 text-primary" />
        Development Timeline (weeks)
      </h4>
      <BudgetGanttChart 
        data={timelineData} 
        maxDuration={35}
      />
    </div>
  );
};

export default DevelopmentTimeline;
