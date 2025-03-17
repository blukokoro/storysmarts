
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Users } from 'lucide-react';
import ScenesTabContent from './key-scenes/ScenesTabContent';
import CharactersTabContent from './key-scenes/CharactersTabContent';
import { Character } from './key-scenes/types';

interface KeyScenesListProps {
  scenes: string[];
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
          
          <TabsContent value="scenes">
            <ScenesTabContent 
              scenes={scenes} 
              generateSceneTitle={generateSceneTitle} 
            />
          </TabsContent>
          
          <TabsContent value="characters">
            <CharactersTabContent characters={characters} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default KeyScenesList;
