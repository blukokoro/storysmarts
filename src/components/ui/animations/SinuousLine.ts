
import { ColorConfig } from './colorConfigs';

export class SinuousLine {
  x: number;
  y: number;
  length: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
  particlePositions: { x: number, y: number }[];
  speed: number;
  colorConfig: ColorConfig;

  constructor(x: number, y: number, canvasWidth: number, colorConfig: ColorConfig) {
    this.x = x;
    this.y = y;
    this.length = canvasWidth + 200; // Ensure lines span the full width plus some extra
    this.amplitude = Math.random() * 50 + 20;
    this.frequency = Math.random() * 0.02 + 0.01;
    this.phase = Math.random() * Math.PI * 2;
    this.speed = (Math.random() * 0.0005 + 0.00025); // Extremely slow animation (5x slower than before)
    this.colorConfig = colorConfig;
    
    // Color based on the provided color family
    this.color = `hsl(${colorConfig.baseHue + Math.random() * colorConfig.hueRange}, ${90 + Math.random() * 10}%, ${70 + Math.random() * 20}%)`;
    this.particlePositions = [];
    
    // Generate particle positions along the line
    for (let i = 0; i < 15; i++) {
      this.particlePositions.push({
        x: Math.random() * this.length,
        y: 0
      });
    }
  }

  update() {
    this.phase += this.speed;
    if (this.phase > Math.PI * 2) {
      this.phase = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    
    // Create gradient for the line
    const gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.length, this.y);
    gradient.addColorStop(0, this.colorConfig.gradientStart);
    gradient.addColorStop(0.5, this.colorConfig.gradientMiddle);
    gradient.addColorStop(1, this.colorConfig.gradientEnd);
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 1.5;
    
    // Draw the sinuous line
    for (let i = 0; i <= this.length; i += 5) {
      const x = this.x + i;
      const y = this.y + Math.sin(i * this.frequency + this.phase) * this.amplitude;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Draw particles along the line
    this.particlePositions.forEach((particle) => {
      particle.x += 0.1; // Even slower particle movement (2.5x slower than before)
      if (particle.x > this.length) {
        particle.x = 0;
      }
      
      const x = this.x + particle.x;
      const y = this.y + Math.sin(particle.x * this.frequency + this.phase) * this.amplitude;
      
      // Draw glowing particle
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
      glow.addColorStop(0, this.colorConfig.particleColor);
      glow.addColorStop(0.5, this.colorConfig.particleColor.replace('0.6', '0.3'));
      glow.addColorStop(1, this.colorConfig.particleFadeColor);
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw bright center
      ctx.fillStyle = this.colorConfig.particleCenterColor;
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}
