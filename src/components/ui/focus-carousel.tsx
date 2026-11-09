import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EmployeeProfile } from '../../data/team';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface FocusCarouselProps {
  employees: EmployeeProfile[];
}

export const FocusCarousel: React.FC<FocusCarouselProps> = ({ employees }) => {
  // Duplicate array 3x to ensure smooth infinite circular wrap even on ultrawide monitors
  const slots = React.useMemo(
    () => [...employees, ...employees, ...employees],
    [employees]
  );

  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const scrollPosRef = useRef<number>(0);
  const targetOffsetRef = useRef<number | null>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartScrollRef = useRef<number>(0);
  const dragMovedRef = useRef<boolean>(false);

  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isPausedRef = useRef(false);
  isPausedRef.current = isPaused;

  const getMetrics = useCallback(() => {
    const width = stageRef.current?.clientWidth || window.innerWidth;
    const isMobile = width < 768;
    const cardW = isMobile ? 290 : 390;
    const gap = isMobile ? 28 : 54;
    const slotW = cardW + gap;
    const totalW = slotW * slots.length;
    return { width, isMobile, cardW, slotW, totalW };
  }, [slots.length]);

  // Center a specific slot index smoothly
  const centerCardBySlotIndex = useCallback(
    (slotIndex: number) => {
      const { slotW, totalW } = getMetrics();
      const targetRaw = slotIndex * slotW;
      // Pick closest equivalent wrapped target
      const current = scrollPosRef.current;
      let diff = ((targetRaw - current) % totalW + totalW) % totalW;
      if (diff > totalW / 2) diff -= totalW;
      targetOffsetRef.current = current + diff;
    },
    [getMetrics]
  );

  const handleStep = useCallback(
    (dir: 1 | -1) => {
      const { slotW } = getMetrics();
      const currentSlot = Math.round(scrollPosRef.current / slotW);
      targetOffsetRef.current = (currentSlot + dir) * slotW;
    },
    [getMetrics]
  );

  useEffect(() => {
    let rafId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const { width, isMobile, slotW, totalW } = getMetrics();

      if (targetOffsetRef.current !== null) {
        // Smooth ease toward clicked/selected target slot
        const diff = targetOffsetRef.current - scrollPosRef.current;
        scrollPosRef.current += diff * Math.min(1, dt * 7);
        if (Math.abs(diff) < 0.5) {
          scrollPosRef.current = targetOffsetRef.current;
          targetOffsetRef.current = null;
        }
      } else if (!isPausedRef.current && !isHoveredRef.current && !isDraggingRef.current) {
        // Smooth continuous horizontal motion ("Each card moves horizontally")
        const speed = isMobile ? 42 : 56;
        scrollPosRef.current += speed * dt;
      }

      // Compute modular offset for every virtual card and update 3D perspective transforms
      const scroll = scrollPosRef.current;
      let closestDist = Infinity;
      let closestEmpIdx = 0;

      const halfStage = Math.max(width * 0.52, 320);

      for (let i = 0; i < slots.length; i++) {
        const cardEl = cardRefs.current[i];
        if (!cardEl) continue;

        let dx = ((i * slotW - scroll) % totalW + totalW) % totalW;
        if (dx > totalW / 2) dx -= totalW;

        const absDx = Math.abs(dx);
        if (absDx < closestDist) {
          closestDist = absDx;
          closestEmpIdx = i % employees.length;
        }

        // Only compute full visual transforms for cards near viewport
        if (absDx > halfStage + slotW) {
          cardEl.style.opacity = '0';
          cardEl.style.pointerEvents = 'none';
          cardEl.style.transform = `translate3d(${dx}px, 0, -300px)`;
          continue;
        }

        const norm = dx / halfStage; // -1 at left edge, 0 at center, +1 at right edge
        const absNorm = Math.abs(norm);

        // Concave panoramic curve: angled in from edges, flat at center, fade around far edge
        const rotateY = Math.max(-36, Math.min(36, -norm * 26));
        const translateZ = -Math.pow(absNorm, 1.4) * (isMobile ? 45 : 75);
        const translateY = Math.pow(absNorm, 2) * 14;
        const scale = 1 - Math.min(0.14, absNorm * 0.1);

        // Smooth edge fade
        const fadeStart = 0.62;
        let opacity = 1;
        if (absNorm > fadeStart) {
          opacity = Math.max(0, 1 - (absNorm - fadeStart) / (1.05 - fadeStart));
        }

        cardEl.style.opacity = opacity.toFixed(3);
        cardEl.style.pointerEvents = opacity > 0.25 ? 'auto' : 'none';
        cardEl.style.zIndex = String(Math.round((1 - Math.min(1, absNorm)) * 100));
        cardEl.style.transform = `translate3d(${dx.toFixed(1)}px, ${translateY.toFixed(
          1
        )}px, ${translateZ.toFixed(1)}px) rotateY(${rotateY.toFixed(
          2
        )}deg) scale(${scale.toFixed(3)})`;

        // Highlight active border smoothly
        const isCenter = absDx < slotW * 0.35;
        cardEl.setAttribute('data-center', isCenter ? 'true' : 'false');
      }

      setActiveIndex((prev) => (prev !== closestEmpIdx ? closestEmpIdx : prev));

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [slots.length, employees.length, getMetrics]);

  // Pointer drag interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    isDraggingRef.current = true;
    targetOffsetRef.current = null;
    dragMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = scrollPosRef.current;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.clientX - dragStartXRef.current;
    if (Math.abs(delta) > 6) {
      dragMovedRef.current = true;
    }
    scrollPosRef.current = dragStartScrollRef.current - delta * 1.15;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleSelectEmployee = (empIndex: number) => {
    // Pick nearest slot instance matching empIndex
    const { slotW } = getMetrics();
    const current = scrollPosRef.current;
    let bestSlot = empIndex;
    let bestDist = Infinity;

    for (let k = 0; k < slots.length; k++) {
      if (k % employees.length === empIndex) {
        const dist = Math.abs(k * slotW - current);
        if (dist < bestDist) {
          bestDist = dist;
          bestSlot = k;
        }
      }
    }
    centerCardBySlotIndex(bestSlot);
  };

  return (
    <div className="w-full relative select-none">
      {/* 3D Curved Focus Stage */}
      <div
        ref={stageRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          isDraggingRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[500px] md:h-[540px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
      >
        {/* Left and Right Edge Vignettes ("fade away round the other") */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-36 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-[120]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-36 bg-gradient-to-l from-[#0A0A0A] via-[#0A0A0A]/80 to-transparent z-[120]" />

        {/* Virtual Curved Cards Track */}
        {slots.map((member, slotIdx) => (
          <div
            key={`${member.id}-slot-${slotIdx}`}
            ref={(el) => (cardRefs.current[slotIdx] = el)}
            onClick={() => {
              if (!dragMovedRef.current) {
                centerCardBySlotIndex(slotIdx);
              }
            }}
            data-center="false"
            className="absolute w-[290px] md:w-[390px] h-[450px] md:h-[485px] rounded-[20px] bg-[#121212]/95 backdrop-blur-md border border-white/12 data-[center=true]:border-[#E11D2A] p-7 md:p-8 flex flex-col justify-between shadow-2xl transition-colors duration-300 cursor-pointer"
            style={{
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
            }}
          >
            <div>
              {/* Top Row: Photo with Red Ring & Number */}
              <div className="flex items-start justify-between mb-6">
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 ring-2 ring-[#E11D2A] overflow-hidden bg-black flex-shrink-0">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full grayscale contrast-115"
                    draggable={false}
                  />
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
                  {member.number}
                </span>
              </div>

              {/* Specialist Name */}
              <h3 className="font-serif text-[26px] md:text-[32px] leading-[1.1] text-white mb-2">
                {member.name}
              </h3>

              {/* Red Mono Role */}
              <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.16em] text-[#E11D2A] font-medium mb-4 leading-relaxed">
                {member.role}
              </div>

              {/* Short Complete Bio */}
              <p className="font-sans text-[13.5px] md:text-[14.5px] leading-[1.6] text-white/75 font-light">
                {member.bio}
              </p>
            </div>

            {/* Bottom Credentials Note or Specialist Tag */}
            {member.note ? (
              <div className="pt-3 border-t border-white/10 font-mono text-[9px] uppercase tracking-[0.14em] text-white/45">
                {member.note}
              </div>
            ) : (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.16em] text-white/40">
                <span>URBRAND 360 SPECIALIST</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E11D2A]" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Carousel Controls & Direct Selector Pills */}
      <div className="max-w-5xl mx-auto px-6 mt-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Specialist Quick-Jump Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {employees.map((member, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={member.id}
                type="button"
                onClick={() => handleSelectEmployee(idx)}
                className={`px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-[0.15em] border transition-all duration-300 ${
                  isActive
                    ? 'bg-[#E11D2A] border-[#E11D2A] text-white'
                    : 'bg-white/[0.04] border-white/15 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                {member.number} · {member.name}
              </button>
            );
          })}
        </div>

        {/* Arrow & Motion Play/Pause Controls */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleStep(-1)}
            aria-label="Previous team member"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#E11D2A] hover:bg-[#E11D2A] transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((p) => !p)}
            aria-label={isPaused ? 'Resume motion' : 'Pause motion'}
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#E11D2A] hover:bg-[#E11D2A] transition-colors"
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => handleStep(1)}
            aria-label="Next team member"
            className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#E11D2A] hover:bg-[#E11D2A] transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

