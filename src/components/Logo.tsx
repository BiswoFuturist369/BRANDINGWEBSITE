import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  theme?: 'dark' | 'light';
  compact?: boolean;
  className?: string;
  onClick?: () => void;
}

export const URBrandLogo: React.FC<LogoProps> = ({
  theme = 'dark',
  compact = false,
  className = '',
  onClick,
}) => {
  // theme === 'light' means the background is light (white), so use the dark logo/text
  // theme === 'dark' means the background is dark (#0A0A0A), so use the light logo/text
  const isLightBg = theme === 'light';
  const emblemSrc = isLightBg
    ? '/logo/urbrand360-emblem-dark.png'
    : '/logo/urbrand360-emblem-light.png';

  return (
    <Link
      to="/"
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 focus:outline-none select-none transition-colors duration-200 ${className}`}
      aria-label="URBrand 360 - Where Vision Meets Strategy"
    >
      {/* Real Emblem Image (34px high, no box/background) */}
      <img
        src={emblemSrc}
        alt="URBrand 360 Emblem"
        className="h-[34px] w-auto object-contain flex-shrink-0"
        loading="eager"
      />

      {/* Wordmark */}
      <div className="flex flex-col justify-center leading-none">
        <div
          className={`font-display text-[22px] tracking-tight leading-none ${
            isLightBg ? 'text-[#0A0A0A]' : 'text-[#FFFFFF]'
          }`}
        >
          URBrand <span className="text-[#E11D2A] italic">360</span>
        </div>
        {!compact && (
          <span
            className={`font-mono text-[9px] uppercase tracking-[0.18em] mt-1 ${
              isLightBg ? 'text-[#0A0A0A]/70' : 'text-[#FFFFFF]/70'
            }`}
          >
            BRAND · GROWTH · OPS
          </span>
        )}
      </div>
    </Link>
  );
};
