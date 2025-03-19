
import React from 'react';
import { getColorConfig } from './colorConfigs';
import { SinuousLine } from './SinuousLine';

export interface SinuousLinesAnimationProps {
  colorFamily: string;
}

// Main animation component
const SinuousLinesAnimation: React.FC<SinuousLinesAnimationProps> = ({ colorFamily }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = React.useState({ width: 0, height: 0 });
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

    // Create lines starting off-screen to the left and spanning the full width
    const lines: SinuousLine[] = [];
    for (let i = 0; i < 6; i++) {
      lines.push(new SinuousLine(
        -200, // Start further left off-screen 
        canvas.height * (i / 6) + 100, // Distribute evenly across the height
        canvas.width,
        colorConfig
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

export default SinuousLinesAnimation;
