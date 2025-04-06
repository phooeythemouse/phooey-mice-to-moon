
import React, { useEffect, useRef } from 'react';

const MoonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize canvas to full screen
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    window.addEventListener('resize', resize);
    resize();

    // Draw moon
    function draw() {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create a radial gradient for the background (deep space)
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 0.8,
        0,
        canvas.width / 2,
        canvas.height * 0.8,
        canvas.width * 0.8
      );
      bgGradient.addColorStop(0, 'rgba(26, 31, 44, 0.5)');
      bgGradient.addColorStop(1, 'rgba(10, 14, 23, 0.9)');

      // Fill background
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the moon
      const moonX = canvas.width * 0.8;
      const moonY = canvas.height * 0.2;
      const moonRadius = Math.min(canvas.width, canvas.height) * 0.15;

      // Create a radial gradient for the moon
      const moonGradient = ctx.createRadialGradient(
        moonX,
        moonY,
        0,
        moonX,
        moonY,
        moonRadius
      );
      moonGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      moonGradient.addColorStop(0.8, 'rgba(220, 220, 220, 1)');
      moonGradient.addColorStop(1, 'rgba(200, 200, 200, 0.8)');

      // Draw moon circle
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius, 0, Math.PI * 2);
      ctx.fillStyle = moonGradient;
      ctx.fill();

      // Draw moon craters
      drawCrater(ctx, moonX - moonRadius * 0.5, moonY - moonRadius * 0.3, moonRadius * 0.1);
      drawCrater(ctx, moonX + moonRadius * 0.3, moonY + moonRadius * 0.4, moonRadius * 0.08);
      drawCrater(ctx, moonX - moonRadius * 0.1, moonY + moonRadius * 0.15, moonRadius * 0.12);
      drawCrater(ctx, moonX + moonRadius * 0.5, moonY - moonRadius * 0.2, moonRadius * 0.06);
      
      // Draw subtle glow around the moon
      const glowGradient = ctx.createRadialGradient(
        moonX,
        moonY,
        moonRadius,
        moonX,
        moonY,
        moonRadius * 1.5
      );
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(moonX, moonY, moonRadius * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }

    function drawCrater(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
      // Create a gradient for the crater
      const craterGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      craterGradient.addColorStop(0, 'rgba(180, 180, 180, 0.8)');
      craterGradient.addColorStop(1, 'rgba(200, 200, 200, 0)');

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = craterGradient;
      ctx.fill();
    }

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

export default MoonBackground;
