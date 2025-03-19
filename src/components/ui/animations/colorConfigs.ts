
// Color config type definition
export interface ColorConfig {
  baseHue: number;
  hueRange: number;
  gradientStart: string;
  gradientMiddle: string;
  gradientEnd: string;
  particleColor: string;
  particleFadeColor: string;
  particleCenterColor: string;
}

// Define color mappings for different color families
export const getColorConfig = (colorName: string): ColorConfig => {
  const colorConfig = {
    amber: {
      baseHue: 40,
      hueRange: 20,
      gradientStart: 'rgba(255, 215, 0, 0.1)',
      gradientMiddle: 'rgba(255, 215, 0, 0.6)',
      gradientEnd: 'rgba(255, 215, 0, 0.2)',
      particleColor: 'rgba(255, 215, 0, 0.8)',
      particleFadeColor: 'rgba(255, 215, 0, 0)',
      particleCenterColor: 'rgba(255, 250, 220, 0.9)'
    },
    cyan: {
      baseHue: 180,
      hueRange: 20,
      gradientStart: 'rgba(0, 215, 255, 0.1)',
      gradientMiddle: 'rgba(0, 215, 255, 0.6)',
      gradientEnd: 'rgba(0, 215, 255, 0.2)',
      particleColor: 'rgba(0, 215, 255, 0.8)',
      particleFadeColor: 'rgba(0, 215, 255, 0)',
      particleCenterColor: 'rgba(220, 250, 255, 0.9)'
    },
    purple: {
      baseHue: 270,
      hueRange: 20,
      gradientStart: 'rgba(180, 130, 255, 0.1)',
      gradientMiddle: 'rgba(180, 130, 255, 0.6)',
      gradientEnd: 'rgba(180, 130, 255, 0.2)',
      particleColor: 'rgba(180, 130, 255, 0.8)',
      particleFadeColor: 'rgba(180, 130, 255, 0)',
      particleCenterColor: 'rgba(240, 230, 255, 0.9)'
    },
    green: {
      baseHue: 120,
      hueRange: 20,
      gradientStart: 'rgba(100, 220, 100, 0.1)',
      gradientMiddle: 'rgba(100, 220, 100, 0.6)',
      gradientEnd: 'rgba(100, 220, 100, 0.2)',
      particleColor: 'rgba(100, 220, 100, 0.8)',
      particleFadeColor: 'rgba(100, 220, 100, 0)',
      particleCenterColor: 'rgba(230, 255, 230, 0.9)'
    }
  };
  
  return colorConfig[colorName as keyof typeof colorConfig] || colorConfig.amber;
};
