
import React, { useRef, useEffect, useState } from 'react';

type SinuousLine = {
  x: number;
  y: number;
  length: number;
  amplitude: number;
  frequency: number;
  phase: number;
  color: string;
  particlePositions: { x: number, y: number }[];
  speed: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
};

const SinuousLinesAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Set up the canvas and animation
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const updateDimensions = () => {
      if (!canvasRef.current) return;
      const container = canvasRef.current.parentElement;
      if (!container) return;
      
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
      canvas.width = width;
      canvas.height = height;
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Create sinuous lines
    class SinuousLine {
      x: number;
      y: number;
      length: number;
      amplitude: number;
      frequency: number;
      phase: number;
      color: string;
      particlePositions: { x: number, y: number }[];
      speed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.length = canvas.width + 200; // Ensure lines span the full width plus some extra
        this.amplitude = Math.random() * 50 + 20;
        this.frequency = Math.random() * 0.02 + 0.01;
        this.phase = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.02 + 0.01;
        // Gold gradient colors
        this.color = `hsl(${40 + Math.random() * 20}, ${90 + Math.random() * 10}%, ${70 + Math.random() * 20}%)`;
        this.particlePositions = [];
        
        // Generate more particle positions along the line for wider coverage
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
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0.1)');
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0.2)');
        
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
        this.particlePositions.forEach((particle, index) => {
          particle.x += 1;
          if (particle.x > this.length) {
            particle.x = 0;
          }
          
          const x = this.x + particle.x;
          const y = this.y + Math.sin(particle.x * this.frequency + this.phase) * this.amplitude;
          
          // Draw glowing particle
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
          glow.addColorStop(0, 'rgba(255, 215, 0, 0.8)');
          glow.addColorStop(0.5, 'rgba(255, 215, 0, 0.4)');
          glow.addColorStop(1, 'rgba(255, 215, 0, 0)');
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw bright center
          ctx.fillStyle = 'rgba(255, 250, 220, 0.9)';
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    // Create lines starting off-screen to the left and spanning the full width
    const lines: SinuousLine[] = [];
    for (let i = 0; i < 6; i++) { // Added one more line for better coverage
      lines.push(new SinuousLine(
        -200, // Start further left off-screen 
        canvas.height * (i / 6) + 100 // Distribute evenly across the height
      ));
    }

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        line.update();
        line.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height}
      className="block w-full h-full"
    />
  );
};

export default SinuousLinesAnimation;
