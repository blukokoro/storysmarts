import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Bot, Palette, Rocket, BarChart3, Users, Clock } from 'lucide-react';

const benefitsData = [{
  icon: <Bot className="h-10 w-10 text-cyan-400" />,
  title: "AI-Powered Analysis",
  description: "Our advanced algorithms analyze your story's structure, pacing, and character development to identify strengths and improvement opportunities.",
  image: "/benefit-ai-analysis.jpg",
  color: "from-cyan-500/10 via-cyan-400/5 to-transparent"
}, {
  icon: <Palette className="h-10 w-10 text-emerald-400" />,
  title: "Visual Storytelling",
  description: "Transform your written narratives into compelling visual storyboards and comic layouts optimized for audience engagement.",
  image: "/benefit-visual-storytelling.jpg",
  color: "from-emerald-500/10 via-emerald-400/5 to-transparent"
}, {
  icon: <Rocket className="h-10 w-10 text-indigo-400" />,
  title: "Production Ready",
  description: "Generate industry-standard production materials including shot lists, character designs, and format-specific adaptations.",
  image: "/benefit-production-ready.jpg",
  color: "from-indigo-500/10 via-indigo-400/5 to-transparent"
}, {
  icon: <BarChart3 className="h-10 w-10 text-amber-400" />,
  title: "Budget Optimization",
  description: "Receive detailed production cost estimates and optimization recommendations to maximize your creative investment.",
  image: "/benefit-budget.jpg",
  color: "from-amber-500/10 via-amber-400/5 to-transparent"
}, {
  icon: <Users className="h-10 w-10 text-purple-400" />,
  title: "Audience Insights",
  description: "Understand your target demographic with AI-driven audience analysis and content recommendations for maximum impact.",
  image: "/benefit-audience.jpg",
  color: "from-purple-500/10 via-purple-400/5 to-transparent"
}, {
  icon: <Clock className="h-10 w-10 text-rose-400" />,
  title: "Time Efficiency",
  description: "Cut development time by up to 70% with automated processes that handle time-consuming analytical and technical tasks.",
  image: "/benefit-time.jpg",
  color: "from-rose-500/10 via-rose-400/5 to-transparent"
}];

const BenefitsSection: React.FC = () => {
  return (
    <section className="py-20">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating transparent circles */}
        <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-2xl -top-20 -left-20 animate-float" />
        <div className="absolute h-80 w-80 rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-2xl top-40 -right-20 animate-float" style={{
        animationDelay: '1s'
        }} />
        <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-emerald-500/10 to-transparent blur-2xl bottom-20 left-1/4 animate-float" style={{
        animationDelay: '2s'
        }} />
        
        {/* Decorative lines */}
        <div className="absolute h-px w-3/4 bg-gradient-to-r from-transparent via-white/10 to-transparent top-1/4 left-0" />
        <div className="absolute h-px w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent bottom-1/3 right-0" />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display mb-4 text-gradient font-medium">
            Story Creation Superpowers
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Elevate your creative process with cutting-edge tools designed for modern storytellers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefitsData.map((benefit, index) => (
            <Card key={index} className="group backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all overflow-hidden relative h-full">
              {/* Soft gradient background based on benefit type */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="p-6 relative flex flex-col h-full">
                <div className="mb-4 p-3 rounded-full bg-black/30 w-fit">
                  {benefit.icon}
                </div>
                
                <h3 className="text-xl font-medium text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{benefit.description}</p>
                
                {/* Visual element - shown on hover */}
                <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="h-1 w-12 bg-gradient-to-r from-primary to-transparent rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
