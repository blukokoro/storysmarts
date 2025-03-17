
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ArtisticStyleSuggestionsProps {
  story: string;
}

const ArtisticStyleSuggestions: React.FC<ArtisticStyleSuggestionsProps> = ({ story }) => {
  const styles = [
    {
      name: "Neo-Noir Comic Style",
      image: "/lovable-uploads/aba2b6fd-509a-45f5-9146-31ccf17ad0e7.png",
      description: "A high-contrast, shadow-heavy style inspired by classic film noir and modern graphic novels. Features bold black shadows, limited color palettes, and dramatic lighting that creates a moody atmosphere. Perfect for stories with mystery, intrigue, or urban settings.",
      suitableFor: "Detective stories, urban narratives, psychological thrillers",
      notableArtists: "Frank Miller, Sean Phillips, Eduardo Risso"
    },
    {
      name: "European Clear Line",
      image: "/placeholder.svg",
      description: "Characterized by clean, uniform line weight with minimal hatching and flat, vibrant colors. This style emphasizes clarity and readability while maintaining a sophisticated aesthetic. Backgrounds are often detailed while characters remain slightly stylized.",
      suitableFor: "Adventure stories, historical narratives, character-driven tales",
      notableArtists: "Hergé, Joost Swarte, Jason Lutes"
    },
    {
      name: "Expressive Watercolor",
      image: "/placeholder.svg",
      description: "Blends traditional watercolor painting techniques with comic storytelling, creating a dreamlike quality with soft edges and transparent color layers. Emotional moments are emphasized through color bleeding and expressive brushwork.",
      suitableFor: "Personal narratives, emotional journeys, fantasy stories",
      notableArtists: "Jon J Muth, Dustin Nguyen, Cyril Pedrosa"
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium text-white">Artistic Style Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-400 mb-6">
          Based on your story's themes and atmosphere, we recommend these artistic styles that would complement your narrative.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {styles.map((style, index) => (
            <div key={index} className="flex flex-col h-full">
              <div className="relative aspect-square w-full mb-3 overflow-hidden rounded-lg border border-primary/20">
                <img 
                  src={style.image} 
                  alt={`${style.name} preview`} 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                  <div className="p-3">
                    <h3 className="text-white font-medium text-lg">{style.name}</h3>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20 flex-grow">
                <p className="text-sm text-gray-300 mb-3">{style.description}</p>
                <div className="mb-3">
                  <h4 className="text-xs text-primary font-medium mb-1">Best For:</h4>
                  <p className="text-xs text-gray-400">{style.suitableFor}</p>
                </div>
                <div>
                  <h4 className="text-xs text-primary font-medium mb-1">Notable Artists:</h4>
                  <p className="text-xs text-gray-400">{style.notableArtists}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <h3 className="text-primary font-medium mb-2">Style Selection Guide</h3>
          <p className="text-sm text-gray-300 mb-2">
            Choosing the right artistic style can dramatically impact how your story is received and interpreted. Consider these factors:
          </p>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• <span className="text-primary">Tone:</span> Match your style to the emotional tone of your story</li>
            <li>• <span className="text-primary">Audience:</span> Consider age range and genre expectations</li>
            <li>• <span className="text-primary">Complexity:</span> Detailed artwork may slow production and increase costs</li>
            <li>• <span className="text-primary">Marketability:</span> Some styles have broader commercial appeal</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtisticStyleSuggestions;
