import React, { useEffect, useRef } from 'react';

export const GlobalSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let rotation = 0;
    let isVisible = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    // Global sample node coordinates (lat, lon in radians)
    const points = [
      { lat: 0.35, lon: 1.35 },   // India / Asia
      { lat: 0.88, lon: -0.1 },   // UK / Europe
      { lat: 0.65, lon: -1.4 },   // US East Coast
      { lat: 0.58, lon: -2.1 },   // US West Coast
      { lat: -0.45, lon: 2.6 },   // Australia
      { lat: 0.42, lon: 0.95 },   // Middle East
      { lat: -0.38, lon: -0.8 },  // South America
      { lat: 0.22, lon: 1.8 },    // SE Asia
    ];

    const connections = [
      [0, 1],
      [1, 2],
      [2, 3],
      [0, 4],
      [0, 5],
      [1, 5],
      [2, 6],
      [0, 7],
    ];

    const render = () => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const radius = Math.min(width, height) * 0.38;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      rotation += 0.0035;

      // Draw wireframe latitude rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;

      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const rLat = radius * Math.cos(phi);
        const yLat = cy - radius * Math.sin(phi);

        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw wireframe longitude meridians
      for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
        const currentLon = lon + rotation;
        const xOffset = Math.sin(currentLon) * radius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Outer globe boundary
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Project 3D sphere points to 2D
      const projected = points.map((p) => {
        const lon = p.lon + rotation;
        const x = cx + radius * Math.cos(p.lat) * Math.sin(lon);
        const y = cy - radius * Math.sin(p.lat);
        const z = radius * Math.cos(p.lat) * Math.cos(lon); // Depth
        return { x, y, z };
      });

      // Draw connection lines
      ctx.strokeStyle = 'rgba(225, 29, 42, 0.45)';
      ctx.lineWidth = 1;
      connections.forEach(([i, j]) => {
        const p1 = projected[i];
        const p2 = projected[j];
        if (p1.z > -radius * 0.3 && p2.z > -radius * 0.3) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          // Slight bezier curve above surface
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2 - 12;
          ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
          ctx.stroke();
        }
      });

      // Draw red dots on visible hemisphere
      projected.forEach((p) => {
        if (p.z > 0) {
          const alpha = 0.4 + 0.6 * (p.z / radius);
          // Outer pulse glow
          ctx.fillStyle = `rgba(225, 29, 42, ${alpha * 0.35})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
          ctx.fill();

          // Core red dot
          ctx.fillStyle = `rgba(225, 29, 42, ${alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          animId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      id="global"
      className="relative w-full py-28 md:py-40 px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] overflow-hidden border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Eyebrow */}
        <div className="mb-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#E11D2A] font-semibold">
            GLOBAL REACH
          </span>
        </div>

        {/* Basic Display Heading H2 */}
        <div className="max-w-5xl mb-16 md:mb-20">
          <h2 className="font-display text-[42px] md:text-[64px] lg:text-[78px] leading-[1.03] tracking-[-0.015em] text-white font-normal">
            One studio. <span className="italic text-[#E11D2A]">Every market.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Copy & Details */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <p className="font-sans text-[20px] md:text-[22px] leading-[1.65] text-white/80 font-light">
              A remote-first team of specialists, based in Indore, India, working with brands worldwide.
              We bring the right expert to each project without the overhead of a large agency.
            </p>

            <div className="pt-6 border-t border-white/12 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E11D2A] pulse-red" />
                <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-white/90">
                  Indore, India · Working worldwide
                </span>
              </div>
              <p className="font-sans text-[15px] leading-[1.65] text-white/60">
                Operating without geographical friction, serving ambitious founders, D2C ventures,
                and expanding enterprises across all major timezones.
              </p>
            </div>
          </div>

          {/* Right: Rotating Wireframe Globe */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              <canvas
                ref={canvasRef}
                className="w-full h-full block cursor-grab active:cursor-grabbing"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

