import React, { useRef, useState } from 'react';

/**
 * SpotlightCard
 * Implements Mouse/Touch-reactive radial spotlight glow
 * Plus optional 3D perspective tilt on hover-capable devices.
 */
export default function SpotlightCard({
  children,
  className = '',
  tilt = false,
  maxTilt = 6,
  glowColor = 'rgba(0, 245, 255, 0.15)',
  onClick,
  style = {}
}) {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState('');

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    // Skip 3D tilt on touch-only mobile devices so scrolling feels native
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
      );
    }
  };

  const handleMouseLeave = () => {
    if (tilt) {
      setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transform: tilt ? transform : undefined,
        transition: tilt ? 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1)' : undefined,
        '--spotlight-color': glowColor,
        ...style
      }}
      className={`bento-spotlight cyber-glass rounded-2xl relative transition-colors duration-300 ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
