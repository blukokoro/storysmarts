
import { StoryAnalysis } from '@/types';
import { toast } from 'sonner';

// This is a mock implementation - in a real app, you would connect to an actual AI API
export class AIService {
  private static apiKey: string | null = null;

  public static setApiKey(key: string): void {
    this.apiKey = key;
    localStorage.setItem('story_ai_api_key', key);
    
    // Validate the API key (simplified mock)
    if (key.length < 10) {
      toast.error("API key seems invalid. Please check and try again.");
      return;
    }
    
    toast.success("API key saved successfully");
  }

  public static getApiKey(): string | null {
    if (!this.apiKey) {
      this.apiKey = localStorage.getItem('story_ai_api_key');
    }
    return this.apiKey;
  }

  public static async analyzeStory(story: string): Promise<StoryAnalysis> {
    if (!this.apiKey) {
      throw new Error("API key not set. Please configure your API key first.");
    }

    if (!story || story.trim().length < 100) {
      throw new Error("Please provide a more detailed story for accurate analysis.");
    }

    // In a real implementation, this would make an API call
    // For now, we'll simulate a delay and return mock data
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Word count based calculations
    const wordCount = story.split(/\s+/).length;
    const pageEstimate = Math.ceil(wordCount / 250);
    const panelEstimate = Math.ceil(wordCount / 50);
    
    // Mock response
    return {
      comicPanels: {
        suggestedPanelCount: panelEstimate,
        suggestedPageCount: pageEstimate,
        keyScenesForPanels: generateMockKeyScenes(story),
        panelLayout: "Standard grid layout with occasional splash pages for dramatic moments"
      },
      storyboard: {
        sceneCount: Math.ceil(wordCount / 300),
        keyScenes: generateMockStoryboardScenes(story),
        visualStyle: "Modern, high-contrast cinematography with selective color palette",
        shotTypes: ["Wide establishing shots", "Medium character shots", "Close-ups for emotional beats"]
      },
      moviePitch: {
        coreConcept: generateCoreConcept(story),
        uniqueSellingPoint: "Fresh perspective on a timeless theme with contemporary relevance",
        targetAudience: "18-35 year olds interested in thought-provoking content with visual appeal",
        marketPotential: "Strong potential for festival circuit and streaming platform acquisition",
        comparableSuccesses: ["Her", "Ex Machina", "Arrival"],
        logline: generateLogline(story)
      },
      audienceAnalysis: {
        primaryDemographic: {
          ageRange: "25-34",
          gender: "Balanced",
          interests: ["Science fiction", "Technology", "Character-driven narratives"]
        },
        secondaryDemographic: {
          ageRange: "18-24",
          gender: "Balanced",
          interests: ["Visual storytelling", "Indie films", "Social commentary"]
        },
        platformRecommendations: ["YouTube", "Vimeo", "Instagram"],
        genreCompatibility: [
          { genre: "Science Fiction", compatibilityScore: 0.9 },
          { genre: "Drama", compatibilityScore: 0.8 },
          { genre: "Thriller", compatibilityScore: 0.6 }
        ]
      },
      budgetEstimate: {
        baseAmount: 899,
        factors: [
          { name: "Length", impact: 1.2, description: "5 minute runtime" },
          { name: "Visual Complexity", impact: 1.1, description: "Moderate effects and compositing" },
          { name: "Sound Design", impact: 1.05, description: "Custom soundtrack and effects" }
        ],
        totalEstimate: 1242,
        breakdown: [
          { category: "AI Video Generation", amount: 650, percentage: 52 },
          { category: "Sound/Music", amount: 300, percentage: 24 },
          { category: "Post-Production", amount: 200, percentage: 16 },
          { category: "Miscellaneous", amount: 92, percentage: 8 }
        ]
      }
    };
  }
}

// Helper functions for generating mock data
function generateMockKeyScenes(story: string): string[] {
  const sentences = story.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences
    .filter((_, i) => i % 5 === 0)
    .slice(0, 5)
    .map(s => s.trim());
}

function generateMockStoryboardScenes(story: string): any[] {
  const sentences = story.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences
    .filter((_, i) => i % 7 === 0)
    .slice(0, 5)
    .map((s, i) => ({
      id: i + 1,
      description: s.trim(),
      shotType: ["Wide Shot", "Medium Shot", "Close-Up", "Over the Shoulder", "Point of View"][i % 5],
      visualNotes: "Focus on emotional expressions and environmental context"
    }));
}

function generateCoreConcept(story: string): string {
  const words = story.split(/\s+/);
  const storyStart = words.slice(0, 15).join(" ");
  return `${storyStart}... - a thought-provoking exploration of human connection in an increasingly digital world.`;
}

function generateLogline(story: string): string {
  const words = story.split(/\s+/);
  const shortVersion = words.slice(0, 20).join(" ");
  return `${shortVersion}... - a journey that challenges our understanding of reality and connection.`;
}
