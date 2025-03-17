import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, FileSearch } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
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
    <div className="relative w-full overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-violet-950 to-blue-900 opacity-80" />
      
      {/* Canvas for the sinuous lines animation - now positioned to take the full width */}
      <div className="absolute inset-0">
        <canvas 
          ref={canvasRef} 
          width={dimensions.width} 
          height={dimensions.height}
          className="block w-full h-full"
        />
      </div>
      
      <div className="relative pt-10 pb-16 px-6 md:pt-16 md:pb-24 max-w-6xl mx-auto">
        <div className="animate-fade-in space-y-8">
          {/* Announcement banner */}
          <div className="mx-auto w-fit bg-black/30 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <p className="text-sm text-gray-300">AI-powered story analysis for creators</p>
            <Button variant="link" size="sm" asChild className="text-primary p-0 hover:text-primary/80">
              <Link to="/pricing" className="flex items-center">
                <span>Learn more</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
          
          {/* Main headline */}
          <div className="text-center space-y-6 relative z-10">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-2 text-gradient">
              StorySmarts
            </h1>
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              <span className="text-white">Transform Your </span>
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Narrative</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Turn your creative ideas into ready-to-produce comics, storyboards, and film pitches with powerful AI analysis.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
              <Button size="lg" className="group" asChild>
                <Link to="/analyze">
                  Analyze for Free
                  <FileSearch className="ml-2 w-4 h-4 group-hover:animate-pulse" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/pricing">
                  View Pricing
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Features highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 relative z-10">
            {[
              {
                icon: <Zap className="w-8 h-8 text-cyan-400" />,
                title: "AI Analysis",
                description: "Get detailed insights about your story structure, characters, and plot"
              },
              {
                icon: <Sparkles className="w-8 h-8 text-emerald-400" />,
                title: "Visual Production",
                description: "Transform text into comic panels, storyboards or film pitch materials"
              },
              {
                icon: <ArrowRight className="w-8 h-8 text-violet-400" />,
                title: "Market Ready",
                description: "Receive production-ready assets with audience and budget analysis"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-5 rounded-lg backdrop-blur-xl bg-white/5 border border-white/10 hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="mb-3 p-3 rounded-full bg-black/30">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
