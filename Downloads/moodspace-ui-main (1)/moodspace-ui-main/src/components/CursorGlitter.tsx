import { useState, useEffect, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  velocityX: number;
  velocityY: number;
}

const CursorGlitter = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const createParticle = useCallback((x: number, y: number) => {
    const particle: Particle = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 4 + 2,
      opacity: 1,
      velocityX: (Math.random() - 0.5) * 2,
      velocityY: (Math.random() - 0.5) * 2 - 1,
    };
    return particle;
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    // Create 2-3 particles on each mouse move
    if (Math.random() > 0.5) {
      const newParticles = Array.from({ length: Math.floor(Math.random() * 2) + 1 }, () =>
        createParticle(e.clientX, e.clientY)
      );
      setParticles((prev) => [...prev.slice(-50), ...newParticles]);
    }
  }, [createParticle]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Animate and remove old particles
  useEffect(() => {
    if (particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocityX,
            y: p.y + p.velocityY,
            opacity: p.opacity - 0.03,
            velocityY: p.velocityY + 0.05,
          }))
          .filter((p) => p.opacity > 0)
      );
    }, 30);

    return () => clearInterval(interval);
  }, [particles.length > 0]);

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            background: `radial-gradient(circle, hsl(45 100% 70%) 0%, hsl(45 95% 55%) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(45 95% 55% / 0.6)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Core sparkle at cursor */}
      <div
        className="absolute w-1 h-1 rounded-full transition-all duration-75"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          background: "hsl(45 100% 80%)",
          boxShadow: "0 0 8px 2px hsl(45 95% 55% / 0.8)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
};

export default CursorGlitter;
