
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
  
  // Create timeline data for Gantt chart
  const timelineData = [
    {
      name: 'Planning',
      start: 0,
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#2563eb',
    },
    {
      name: 'Concept Art',
      start: Math.ceil(estimatedWeeks * 0.1),
      duration: Math.ceil(estimatedWeeks * 0.3),
      fill: '#4f46e5',
    },
    {
      name: 'Line Art',
      start: Math.ceil(estimatedWeeks * 0.3),
      duration: Math.ceil(estimatedWeeks * 0.3),
      fill: '#8b5cf6',
    },
    {
      name: 'Coloring',
      start: Math.ceil(estimatedWeeks * 0.5),
      duration: Math.ceil(estimatedWeeks * 0.3),
      fill: '#a855f7',
    },
    {
      name: 'Lettering',
      start: Math.ceil(estimatedWeeks * 0.7),
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#d946ef',
    },
    {
      name: 'Revisions',
      start: Math.ceil(estimatedWeeks * 0.8),
      duration: Math.ceil(estimatedWeeks * 0.2),
      fill: '#ec4899',
    },
  ];

  // Create week labels for the chart
  const weekLabels = Array.from({ length: estimatedWeeks }, (_, i) => `Week ${i + 1}`);

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
                planning: { label: 'Planning' },
                concept: { label: 'Concept Art' },
                lineart: { label: 'Line Art' },
                coloring: { label: 'Coloring' },
                lettering: { label: 'Lettering' },
                revisions: { label: 'Revisions' },
              }}
            >
              <BarChart
                layout="vertical"
                data={timelineData}
                margin={{ top: 10, right: 30, left: 100, bottom: 20 }}
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
                  <span>Initial Concepts:</span>
                  <span>Week {Math.ceil(estimatedWeeks * 0.2)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Draft Pages:</span>
                  <span>Week {Math.ceil(estimatedWeeks * 0.5)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Final Delivery:</span>
                  <span>Week {estimatedWeeks}</span>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-medium text-white mb-1">Production Rate</h5>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex justify-between">
                  <span>Sketches:</span>
                  <span>15-20 panels/day</span>
                </li>
                <li className="flex justify-between">
                  <span>Line Art:</span>
                  <span>8-10 panels/day</span>
                </li>
                <li className="flex justify-between">
                  <span>Coloring:</span>
                  <span>6-8 panels/day</span>
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
