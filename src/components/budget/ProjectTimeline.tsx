
import React from 'react';
import { CalendarClock } from 'lucide-react';
import BudgetGanttChart, { GanttChartData } from '../charts/BudgetGanttChart';

const ProjectTimeline: React.FC = () => {
  // Simple timeline data for the mini chart in the ProjectTimeline component
  const timelineData: GanttChartData[] = [
    { name: "AI Short Film", start: 0, duration: 4, fill: "#3B82F6" },
    { name: "Comic Book", start: 0, duration: 3, fill: "#8B5CF6" },
    { name: "Marketing Launch", start: 4, duration: 2, fill: "#10B981" },
  ];

  return (
    <div className="bg-black/20 rounded-md p-3 mb-4 border border-white/5">
      <h4 className="text-sm font-medium text-white mb-2 flex items-center">
        <CalendarClock className="w-4 h-4 mr-2 text-primary" />
        Estimated Timeline
      </h4>
      
      {/* Add a small Gantt chart */}
      <div className="mb-4">
        <BudgetGanttChart 
          data={timelineData} 
          height={120} 
          className="bg-transparent" 
          maxDuration={6}
          tickCount={7}
        />
      </div>
      
      <div className="space-y-2 text-sm">
        <p className="text-gray-300">
          <span className="text-primary font-medium">AI Short Film (€899):</span> 3-4 weeks for a 5-minute runtime
        </p>
        <p className="text-gray-300">
          <span className="text-primary font-medium">Comic Book (€399):</span> 2-3 weeks for 10 pages
        </p>
        <p className="text-gray-400 text-xs mt-2">
          Suggested marketing launch: 2 weeks after delivery for maximum impact
        </p>
      </div>
    </div>
  );
};

export default ProjectTimeline;
