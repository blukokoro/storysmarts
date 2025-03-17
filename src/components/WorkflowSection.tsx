import React from 'react';
import { ArrowRight, FileText, PanelTop, Film, Users, BarChart } from 'lucide-react';
const steps = [{
  icon: <FileText className="h-8 w-8 text-cyan-400" />,
  title: "Upload Your Story",
  description: "Submit your story text or PDF for AI analysis"
}, {
  icon: <PanelTop className="h-8 w-8 text-purple-400" />,
  title: "Get Panel Breakdown",
  description: "Receive comic panel recommendations and structure"
}, {
  icon: <Film className="h-8 w-8 text-blue-400" />,
  title: "Generate Film Pitch",
  description: "Create a compelling pitch for your film adaptation"
}, {
  icon: <Users className="h-8 w-8 text-emerald-400" />,
  title: "Audience Analysis",
  description: "Understand your target demographic"
}, {
  icon: <BarChart className="h-8 w-8 text-amber-400" />,
  title: "Budget & Timeline",
  description: "Get production estimates and schedules"
}];
const WorkflowSection: React.FC = () => {
  return <div className="py-20 relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-indigo-900/80 to-blue-950/80" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4 text-gradient font-medium">
            How It Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our streamlined process transforms your story into production-ready materials
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />
          
          {steps.map((step, index) => <div key={index} className="relative z-10 flex flex-col items-center mb-10 md:mb-0 w-full max-w-[200px]">
              <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10 mb-4">
                {step.icon}
              </div>
              <h3 className="text-white font-medium text-lg mb-2">{step.title}</h3>
              <p className="text-gray-300 text-sm text-center">{step.description}</p>
              
              {index < steps.length - 1 && <ArrowRight className="h-6 w-6 text-primary/60 mt-4 hidden md:block rotate-90 md:rotate-0" />}
            </div>)}
        </div>
      </div>
    </div>;
};
export default WorkflowSection;