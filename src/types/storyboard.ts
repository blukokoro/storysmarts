
export interface StoryboardFrame {
  id: number;
  title: string;
  description: string;
  shotType: string;
  image: string | null;
  cards: number;
}

export const DEFAULT_FRAMES: StoryboardFrame[] = [
  {
    id: 1,
    title: "1. Driveway",
    description: "Camera tracks low along driveway to entrance of the property. Captures front native desert garden and palm trees.",
    shotType: "Track",
    image: null,
    cards: 2
  },
  {
    id: 2,
    title: "2. Front entrance",
    description: "Camera stops at front entrance and pans around capturing the owner's midcentury restored car and front streetscape.",
    shotType: "POV shot",
    image: null,
    cards: 2
  },
  {
    id: 3,
    title: "3. Back patio",
    description: "Fade to interview the owner about the pool and entertainment area with the San Jacinto mountains in the background.",
    shotType: "Stationary Close-up",
    image: null,
    cards: 2
  },
  {
    id: 4,
    title: "4. Pool",
    description: "Camera flies over capturing the entire back half of the house, pool garden and surrounding view. Home owner dialogue continues over this footage.",
    shotType: "Aerial shot",
    image: null,
    cards: 2
  }
];

export const SHOT_TYPES = [
  "Track", "POV shot", "Stationary", "Stationary Close-up", "Aerial shot", 
  "Pan", "Zoom", "Dolly", "Establishing shot", "Cut-away"
];
