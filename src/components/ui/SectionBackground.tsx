
import React from 'react';
import { cn } from '@/lib/utils';

interface SectionBackgroundProps {
  children: React.ReactNode;
  className?: string;
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  animationColor?: string;
}

const SectionBackground: React.FC<SectionBackgroundProps> = ({ 
  children, 
  className,
  gradientFrom = "from-blue-950",
  gradientVia = "via-indigo-950",
  gradientTo = "to-slate-950",
  animationColor = "amber"
}) => {
  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientVia} ${gradientTo} opacity-90`} />
      
      {/* Canvas for the sinuous lines animation */}
      <div className="absolute inset-0">
        <SinuousLinesAnimation colorFamily={animationColor} />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SectionBackground;

// Improved SinuousLinesAnimation component with color customization
const SinuousLinesAnimation: React.FC<{ colorFamily: string }> = ({ colorFamily }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });

  // Define color mappings for different color families
  const getColorConfig = (colorName: string) => {
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
  
  const colorConfig = getColorConfig(colorFamily);

  // Set up the canvas and animation
  React.useEffect(() => {
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
        // Slowing down the animation speed by reducing the speed value by 50%
        this.speed = (Math.random() * 0.01 + 0.005); // Reduced from 0.02 to 0.01, and from 0.01 to 0.005
        
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
        gradient.addColorStop(0, colorConfig.gradientStart);
        gradient.addColorStop(0.5, colorConfig.gradientMiddle);
        gradient.addColorStop(1, colorConfig.gradientEnd);
        
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
          particle.x += 1;
          if (particle.x > this.length) {
            particle.x = 0;
          }
          
          const x = this.x + particle.x;
          const y = this.y + Math.sin(particle.x * this.frequency + this.phase) * this.amplitude;
          
          // Draw glowing particle
          const glow = ctx.createRadialGradient(x, y, 0, x, y, 6);
          glow.addColorStop(0, colorConfig.particleColor);
          glow.addColorStop(0.5, colorConfig.particleColor.replace('0.8', '0.4'));
          glow.addColorStop(1, colorConfig.particleFadeColor);
          
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(x, y, 6, 0, Math.PI * 2);
          ctx.fill();
          
          // Draw bright center
          ctx.fillStyle = colorConfig.particleCenterColor;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
      }
    }

    // Create lines starting off-screen to the left and spanning the full width
    const lines: SinuousLine[] = [];
    for (let i = 0; i < 6; i++) {
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
  }, [colorFamily, colorConfig]);

  return (
    <canvas 
      ref={canvasRef} 
      width={dimensions.width} 
      height={dimensions.height}
      className="block w-full h-full"
    />
  );
};
