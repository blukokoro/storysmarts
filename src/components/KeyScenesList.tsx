
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users } from 'lucide-react';

interface KeyScenesListProps {
  scenes: string[];
}

interface Character {
  name: string;
  description: string;
  traits: {
    openness: number;
    conscientiousness: number;
    extraversion: number;
    agreeableness: number;
    neuroticism: number;
  };
  audience: {
    primary: string;
    psychographic: string;
  };
  audienceResonance: string[];
}

const KeyScenesList: React.FC<KeyScenesListProps> = ({ scenes }) => {
  const [activeTab, setActiveTab] = useState<string>("scenes");
  
  // Function to generate a title for each scene based on its content
  const generateSceneTitle = (scene: string): string => {
    // Extract the first few words for a title
    const words = scene.split(' ');
    const titleWords = words.slice(0, Math.min(3, words.length));
    return titleWords.join(' ').replace(/[.,!?;:]$/, '') + '...';
  };

  // Mock character data - in a real app this would come from the analysis
  const characters: Character[] = [
    {
      name: "Alex Morgan",
      description: "A brilliant but reclusive scientist who struggles with social interactions but is driven by curiosity and the pursuit of knowledge.",
      traits: {
        openness: 90,
        conscientiousness: 75,
        extraversion: 30,
        agreeableness: 60,
        neuroticism: 65
      },
      audience: {
        primary: "25-40 year old professionals and academics",
        psychographic: "Intellectually curious individuals who value discovery and innovation"
      },
      audienceResonance: [
        "Will resonate with audiences who enjoy intellectual challenges",
        "Appeals to those who appreciate detailed world-building and scientific accuracy",
        "Connects with introverts who understand social anxiety"
      ]
    },
    {
      name: "Layla Chen",
      description: "A charismatic leader with exceptional people skills who brings optimism to every situation, though sometimes at the cost of overlooking practical details.",
      traits: {
        openness: 70,
        conscientiousness: 55,
        extraversion: 95,
        agreeableness: 85,
        neuroticism: 35
      },
      audience: {
        primary: "18-35 year old socially active individuals",
        psychographic: "Outgoing personalities who value connection and positive experiences"
      },
      audienceResonance: [
        "Attracts extroverted audiences who enjoy social dynamics",
        "Appeals to optimists and those who appreciate positive messaging",
        "Resonates with natural leaders and team-oriented individuals"
      ]
    },
    {
      name: "Marcus Rivera",
      description: "A disciplined and methodical problem-solver with unwavering principles, who can sometimes be rigid in his worldview but is fiercely loyal to his beliefs.",
      traits: {
        openness: 40,
        conscientiousness: 95,
        extraversion: 50,
        agreeableness: 65,
        neuroticism: 45
      },
      audience: {
        primary: "30-55 year old professionals with established values",
        psychographic: "Structure-oriented individuals who value consistency and principle"
      },
      audienceResonance: [
        "Connects with audiences who appreciate methodical problem-solving",
        "Appeals to those with strong moral compasses and ethical frameworks",
        "Resonates with disciplined personalities who value planning and organization"
      ]
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Story Elements Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 bg-black/30 backdrop-blur-md border border-primary/20">
            <TabsTrigger value="scenes" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <BookOpen className="h-4 w-4 mr-2" />
              Key Scenes
            </TabsTrigger>
            <TabsTrigger value="characters" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
              <Users className="h-4 w-4 mr-2" />
              Character Analysis
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="scenes" className="space-y-4 focus-visible:outline-none focus-visible:ring-0">
            <p className="text-sm text-gray-400 mb-4">
              These crucial moments from your story would make excellent focus points for your comic panels
            </p>
            
            <div className="grid gap-4">
              {scenes.map((scene, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                  <h3 className="text-primary font-medium mb-1">Scene {index + 1}: {generateSceneTitle(scene)}</h3>
                  <p className="text-sm text-gray-300">{scene}</p>
                  <div className="mt-2 flex gap-2">
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      Page {Math.floor(index * 2) + 1}-{Math.floor(index * 2) + 2}
                    </span>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                      {index === 0 ? 'Opening' : index === scenes.length - 1 ? 'Climax' : 'Key Moment'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="characters" className="space-y-6 focus-visible:outline-none focus-visible:ring-0">
            <p className="text-sm text-gray-400 mb-4">
              Analysis of main characters using the Big Five Personality Traits (OCEAN) model and their resonance with audience segments
            </p>
            
            <div className="grid gap-6">
              {characters.map((character, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-sm rounded-lg border border-primary/20 overflow-hidden">
                  <div className="p-4 border-b border-primary/20 bg-primary/10">
                    <h3 className="text-lg font-medium text-white">{character.name}</h3>
                    <p className="text-sm text-gray-300 mt-1">{character.description}</p>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="text-primary font-medium text-sm mb-3">Personality Profile (OCEAN)</h4>
                    <div className="grid grid-cols-5 gap-2 mb-4">
                      {Object.entries(character.traits).map(([trait, value], i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-24 w-4 bg-black/50 rounded-full relative mb-1">
                            <div 
                              className="absolute bottom-0 w-full rounded-full bg-primary/70"
                              style={{ height: `${value}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-400 capitalize">{trait.substring(0, 1)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="text-xs text-gray-400 flex justify-between px-2 mb-4">
                      <span>O: Openness</span>
                      <span>C: Conscientiousness</span>
                      <span>E: Extraversion</span>
                      <span>A: Agreeableness</span>
                      <span>N: Neuroticism</span>
                    </div>
                    
                    <div className="space-y-4 mt-4">
                      <div>
                        <h4 className="text-primary font-medium text-sm mb-2">Target Audience</h4>
                        <div className="bg-black/20 p-3 rounded border border-primary/10">
                          <p className="text-sm text-gray-300">
                            <span className="text-primary font-medium">Primary:</span> {character.audience.primary}
                          </p>
                          <p className="text-sm text-gray-300 mt-1">
                            <span className="text-primary font-medium">Psychographic Profile:</span> {character.audience.psychographic}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-primary font-medium text-sm mb-2">Audience Resonance</h4>
                        <ul className="space-y-1">
                          {character.audienceResonance.map((point, i) => (
                            <li key={i} className="text-sm text-gray-300 flex items-start">
                              <span className="text-primary mr-2">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KeyScenesList;
