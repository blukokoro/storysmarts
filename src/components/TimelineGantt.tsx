
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { CalendarClock, Clock } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface TimelineGanttProps {
  panelCount: number;
  estimatedPrice: number;
}

const TimelineGantt: React.FC<TimelineGanttProps> = ({ panelCount, estimatedPrice }) => {
  // Calculate timeline (2 weeks for 100 panels)
  const weeksPerHundredPanels = 2;
  const estimatedWeeks = Math.ceil((panelCount / 100) * weeksPerHundredPanels);
  
  // Create timeline data for Gantt chart with comic book specific phases
  const timelineData = [
    {
      name: 'Style Definition',
      start: 0,
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#2563eb',
    },
    {
      name: 'Character Creation',
      start: Math.ceil(estimatedWeeks * 0.1),
      duration: Math.ceil(estimatedWeeks * 0.3),
      fill: '#4f46e5',
    },
    {
      name: 'Panels & Structure',
      start: Math.ceil(estimatedWeeks * 0.3),
      duration: Math.ceil(estimatedWeeks * 0.3),
      fill: '#8b5cf6',
    },
    {
      name: 'Pagination',
      start: Math.ceil(estimatedWeeks * 0.6),
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#a855f7',
    },
    {
      name: 'Final PDF Delivery',
      start: Math.ceil(estimatedWeeks * 0.8),
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#ec4899',
    },
  ];

  // Calculate multiple issues estimation
  const minPagesPerIssue = 25;
  const estimatedPages = Math.ceil(panelCount / 4); // Assuming an average of 4 panels per page
  const issueCount = Math.ceil(estimatedPages / minPagesPerIssue);

  return (
    <Card className="glass-card h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white flex items-center gap-2">
          <CalendarClock className="h-5 w-5 text-primary" />
          Comic Book Timeline
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Panels</h4>
            <p className="text-2xl font-semibold text-white">{panelCount}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Timeline</h4>
            <p className="text-2xl font-semibold text-white">{estimatedWeeks} weeks</p>
          </div>
          <div className="bg-black/30 backdrop-blur-sm p-3 rounded-lg text-center">
            <h4 className="text-sm text-gray-400">Budget</h4>
            <p className="text-2xl font-semibold text-primary">€{estimatedPrice}</p>
          </div>
        </div>

        <div className="bg-black/20 backdrop-blur-sm border border-white/5 p-3 rounded-lg">
          <h4 className="text-md font-medium text-white mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            Production Timeline
          </h4>
          
          <div className="h-64">
            <ChartContainer
              config={{
                style: { label: 'Style Definition' },
                character: { label: 'Character Creation' },
                panels: { label: 'Panels & Structure' },
                pagination: { label: 'Pagination' },
                delivery: { label: 'Final PDF Delivery' },
              }}
            >
              <BarChart
                layout="vertical"
                data={timelineData}
                margin={{ top: 10, right: 30, left: 120, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis 
                  type="number" 
                  domain={[0, estimatedWeeks]} 
                  ticks={Array.from({ length: estimatedWeeks + 1 }, (_, i) => i)}
                  tickFormatter={(value) => value === 0 ? '' : `Week ${value}`}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: '#e5e7eb' }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '0.375rem' }} 
                  formatter={(value, name, props) => {
                    const start = props.payload.start;
                    const end = start + (value as number);
                    return [`Week ${start + 1} - Week ${end}`, name];
                  }}
                />
                <Bar dataKey="duration" barSize={20} radius={[4, 4, 4, 4]}>
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ChartContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Delivery Breakdown</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex justify-between">
                  <span>Style & Character Concepts:</span>
                  <span>Week {Math.ceil(estimatedWeeks * 0.3)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Full Panel Sketches:</span>
                  <span>Week {Math.ceil(estimatedWeeks * 0.6)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Final PDF Delivery:</span>
                  <span>Week {estimatedWeeks}</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Multi-Issue Publishing</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex justify-between">
                  <span>Recommended Issues:</span>
                  <span>{issueCount}</span>
                </li>
                <li className="flex justify-between">
                  <span>Pages per Issue:</span>
                  <span>~{Math.ceil(estimatedPages / issueCount)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Issue Release Cadence:</span>
                  <span>{Math.ceil(estimatedWeeks / issueCount)} weeks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimelineGantt;
