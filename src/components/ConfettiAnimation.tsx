import React, { useState, useEffect } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  size: number;
}

interface ConfettiAnimationProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
  particleCount?: number;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({
  isActive,
  onComplete,
  duration = 3000,
  particleCount = 50
}) => {
  const [particles, setParticles] = useState<ConfettiPiece[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  useEffect(() => {
    if (isActive && !isAnimating) {
      setIsAnimating(true);
      
      // Generate confetti particles
      const newParticles: ConfettiPiece[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4
      }));

      setParticles(newParticles);

      // Stop animation after duration
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setParticles([]);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, isAnimating, particleCount, duration, onComplete]);

  useEffect(() => {
    if (!isAnimating || particles.length === 0) return;

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.vx,
        y: particle.y + particle.vy,
        rotation: particle.rotation + particle.rotationSpeed,
        vy: particle.vy + 0.1, // gravity
        vx: particle.vx * 0.99 // air resistance
      })).filter(p => p.y < window.innerHeight + 50));
    }, 16); // 60fps

    return () => clearInterval(interval);
  }, [isAnimating, particles]);

  if (!isActive && particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            borderRadius: '2px',
            opacity: 0.8,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`
          }}
        />
      ))}
    </div>
  );
};

export default ConfettiAnimation; 