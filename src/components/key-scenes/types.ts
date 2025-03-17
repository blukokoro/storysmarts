
export interface Character {
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
