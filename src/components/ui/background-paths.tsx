import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

function FloatingPaths({ position }: { position: number }) {
  const paths = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
          380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
          152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
          684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        stroke:
          i % 7 === 0
            ? 'rgba(225, 29, 42, 0.45)'
            : 'rgba(255, 255, 255, 0.25)',
        width: 0.5 + i * 0.03,
        duration: 20 + (i % 10) * 1.4,
      })),
    [position]
  );

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Animated Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={path.stroke}
            strokeWidth={path.width}
            strokeOpacity={0.12 + (path.id % 12) * 0.02}
            initial={{ pathLength: 0.3, opacity: 0.55 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.65, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/**
 * Full-bleed dark "Background Paths" backdrop (matching the Founder page design)
 */
export const BackgroundPaths: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`fixed inset-0 pointer-events-none bg-[#0A0A0A] overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />
      {/* Subtle dark vignette for crisp foreground legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 via-transparent to-[#0A0A0A]/80" />
    </div>
  );
};

/**
 * Complementary sweeping wave & orbital paths backdrop for Employees Page
 */
export const EmployeesBackgroundPaths: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const ribbonPaths = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const yOffset = -40 + i * 16;
        const amp = 90 + (i % 5) * 24;
        return {
          id: i,
          d: `M -120 ${yOffset} C 160 ${yOffset - amp}, 380 ${yOffset + amp}, 820 ${yOffset - 20}`,
          isRed: i % 6 === 2,
          width: 0.5 + (i % 6) * 0.08,
          duration: 18 + (i % 7) * 1.8,
        };
      }),
    []
  );

  const orbitalArcs = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        r: 180 + i * 52,
        isRed: i % 3 === 1,
        duration: 40 + i * 8,
        dir: i % 2 === 0 ? 360 : -360,
      })),
    []
  );

  return (
    <div
      className={`fixed inset-0 pointer-events-none bg-[#0A0A0A] overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Sweeping Horizontal Harmonic Paths */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 700 400"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <title>Employees Studio Flow Paths</title>
        {ribbonPaths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke={p.isRed ? 'rgba(225, 29, 42, 0.35)' : 'rgba(255, 255, 255, 0.14)'}
            strokeWidth={p.width}
            initial={{ pathLength: 0.4, pathOffset: 0 }}
            animate={{
              pathLength: [0.45, 0.95, 0.45],
              pathOffset: [0, 1],
              opacity: [0.2, 0.65, 0.2],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      {/* Subtle 360 Orbit Curves in Center Background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        viewBox="-500 -500 1000 1000"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {orbitalArcs.map((arc) => (
          <motion.circle
            key={arc.id}
            cx={0}
            cy={0}
            r={arc.r}
            stroke={arc.isRed ? '#E11D2A' : '#FFFFFF'}
            strokeOpacity={arc.isRed ? 0.35 : 0.12}
            strokeWidth={0.8}
            strokeDasharray="18 24 4 16"
            animate={{ rotate: arc.dir }}
            transition={{
              duration: arc.duration,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>

      {/* Soft edge & center depth vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/50 via-transparent to-[#0A0A0A]/85" />
    </div>
  );
};

