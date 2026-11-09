import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Direct dot coordinates with tight spring
  const dotX = useSpring(0, { stiffness: 900, damping: 45, mass: 0.1 });
  const dotY = useSpring(0, { stiffness: 900, damping: 45, mass: 0.1 });

  // Trailing ring coordinates with smooth physics
  const ringX = useSpring(0, { stiffness: 220, damping: 25, mass: 0.4 });
  const ringY = useSpring(0, { stiffness: 220, damping: 25, mass: 0.4 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = target.closest('a, button, input, select, textarea, [role="button"], .interactive, [data-interactive]');
      setIsHovered(Boolean(isInteractive));
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [dotX, dotY, ringX, ringY, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Trailing Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#E11D2A] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 44 : 28,
          height: isHovered ? 44 : 28,
          opacity: isHovered ? 0.85 : 0.45,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Small Red Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-[#E11D2A] pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? 8 : 6,
          height: isHovered ? 8 : 6,
        }}
        transition={{ duration: 0.15 }}
      />
    </div>
  );
};
