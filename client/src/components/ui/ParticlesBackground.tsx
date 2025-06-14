import { useEffect, useRef } from 'react';

interface ParticlesBackgroundProps {
  baseColor?: string; // Hex color string e.g., "#00A3FF"
  particleCount?: number;
  connectionDistance?: number;
}

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const ParticlesBackground: React.FC<ParticlesBackgroundProps> = ({
  baseColor,
  particleCount = 80, // Default particle count
  connectionDistance = 120, // Default connection distance
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rgbColor = { r: 183, g: 33, b: 255 }; // Default purple
    if (baseColor) {
      const parsedRgb = hexToRgb(baseColor);
      if (parsedRgb) {
        rgbColor = parsedRgb;
      }
    }
    const colorString = `${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}`;

    // Set canvas size to parent element's size
    const resizeCanvas = () => {
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };
    resizeCanvas();
    // Use ResizeObserver for more robust resizing if available, or fallback to window resize
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }


    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5; // Slightly smaller min size
        this.speedX = Math.random() * 0.4 - 0.2; // Slightly slower
        this.speedY = Math.random() * 0.4 - 0.2; // Slightly slower
        this.color = `rgba(${colorString}, ${Math.random() * 0.4 + 0.1})`; // Adjusted opacity
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

        // Keep particles within bounds slightly more gracefully
        if (this.x > canvas.width) this.x = canvas.width;
        else if (this.x < 0) this.x = 0;
        if (this.y > canvas.height) this.y = canvas.height;
        else if (this.y < 0) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const numParticles = particleCount;
    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    let animationFrameId: number;
    // Animation loop
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      ctx.strokeStyle = `rgba(${colorString}, 0.08)`; // Adjusted opacity for lines
      ctx.lineWidth = 0.5; // Thinner lines

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }, [baseColor, particleCount, connectionDistance]); // Rerun effect if props change

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0" // Ensure z-index is low
    />
  );
};

export default ParticlesBackground;