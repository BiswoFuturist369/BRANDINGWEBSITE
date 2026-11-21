import React, { useEffect, useRef } from 'react';
import { CONTINENT_OUTLINES, LAND_POINTS, GLOBAL_HUBS, HUB_CONNECTIONS } from '../data/globeData';

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
    let pingPhase = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const render = () => {
      if (!isVisible) return;
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const radius = Math.min(width, height) * 0.40;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      rotation += 0.0032;
      pingPhase = (pingPhase + 0.035) % (Math.PI * 2);

      // 1. Ambient Glow behind globe
      const glowGrad = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.15);
      glowGrad.addColorStop(0, 'rgba(225, 29, 42, 0.08)');
      glowGrad.addColorStop(0.6, 'rgba(225, 29, 42, 0.02)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
      ctx.fill();

      // 2. Wireframe latitude rings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      for (let lat = -60; lat <= 60; lat += 30) {
        const phi = (lat * Math.PI) / 180;
        const rLat = radius * Math.cos(phi);
        const yLat = cy - radius * Math.sin(phi);

        ctx.beginPath();
        ctx.ellipse(cx, yLat, rLat, rLat * 0.28, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 3. Wireframe longitude meridians
      for (let lon = 0; lon < Math.PI; lon += Math.PI / 6) {
        const currentLon = lon + rotation;
        const xOffset = Math.sin(currentLon) * radius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xOffset), radius, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 4. Draw Continental Land Dots (Dotted Continent Matrix)
      for (let i = 0; i < LAND_POINTS.length; i++) {
        const [lat, baseLon] = LAND_POINTS[i];
        const lon = baseLon + rotation;
        const cosLat = Math.cos(lat);
        const sinLat = Math.sin(lat);
        const z = radius * cosLat * Math.cos(lon);

        // Only draw visible hemisphere
        if (z > 0) {
          const x = cx + radius * cosLat * Math.sin(lon);
          const y = cy - radius * sinLat;
          const depthAlpha = Math.min(1, Math.max(0.12, (z / radius) * 0.85));

          ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.65})`;
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 5. Draw Continuous Continental Coastline Boundaries
      ctx.lineWidth = 1.4;
      for (const [continentName, vertices] of Object.entries(CONTINENT_OUTLINES)) {
        let isDrawing = false;
        ctx.beginPath();

        for (let j = 0; j < vertices.length; j++) {
          const [lat, baseLon] = vertices[j];
          const lon = baseLon + rotation;
          const cosLat = Math.cos(lat);
          const sinLat = Math.sin(lat);
          const z = radius * cosLat * Math.cos(lon);
          const x = cx + radius * cosLat * Math.sin(lon);
          const y = cy - radius * sinLat;

          // If point is on the front facing hemisphere
          if (z > -radius * 0.1) {
            if (!isDrawing) {
              ctx.moveTo(x, y);
              isDrawing = true;
            } else {
              ctx.lineTo(x, y);
            }
          } else {
            isDrawing = false;
          }
        }

        ctx.strokeStyle = continentName === 'india' 
          ? 'rgba(225, 29, 42, 0.85)' 
          : 'rgba(255, 255, 255, 0.40)';
        ctx.stroke();
      }

      // 6. Outer Globe Boundary & Subtle Edge Rim
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
      ctx.lineWidth = 1.3;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // 7. Project Global Hubs (HQ & International Markets)
      const projectedHubs = GLOBAL_HUBS.map((hub) => {
        const lon = hub.lon + rotation;
        const cosLat = Math.cos(hub.lat);
        const sinLat = Math.sin(hub.lat);
        const x = cx + radius * cosLat * Math.sin(lon);
        const y = cy - radius * sinLat;
        const z = radius * cosLat * Math.cos(lon);
        return { ...hub, x, y, z };
      });

      // 8. Draw Great-Circle / Curved Flight Paths between Hubs
      ctx.lineWidth = 1.2;
      HUB_CONNECTIONS.forEach(([i, j]) => {
        const p1 = projectedHubs[i];
        const p2 = projectedHubs[j];

        // Draw if at least one hub is facing front or both near edge
        if (p1.z > -radius * 0.2 && p2.z > -radius * 0.2) {
          const avgZ = (p1.z + p2.z) / 2;
          const lineAlpha = Math.min(0.7, Math.max(0.1, (avgZ / radius) * 0.5 + 0.3));

          ctx.strokeStyle = `rgba(225, 29, 42, ${lineAlpha})`;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);

          // Control point elevated above sphere
          const mx = (p1.x + p2.x) / 2;
          const my = (p1.y + p2.y) / 2 - 14;
          ctx.quadraticCurveTo(mx, my, p2.x, p2.y);
          ctx.stroke();
        }
      });

      // 9. Draw Hub Markers & Labels
      projectedHubs.forEach((hub) => {
        if (hub.z > 0) {
          const depthRatio = hub.z / radius;
          const alpha = Math.min(1, Math.max(0.3, depthRatio));

          if (hub.isHQ) {
            // Animated Pulse Wave from Indore HQ
            const pingRadius = 5 + Math.sin(pingPhase) * 6;
            const pingOpacity = 1 - Math.sin(pingPhase) * 0.7;

            ctx.strokeStyle = `rgba(225, 29, 42, ${pingOpacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(hub.x, hub.y, pingRadius, 0, Math.PI * 2);
            ctx.stroke();

            // Core Solid Red Dot
            ctx.fillStyle = '#E11D2A';
            ctx.beginPath();
            ctx.arc(hub.x, hub.y, 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Text Label
            ctx.font = 'bold 10px monospace';
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
            ctx.fillText('INDORE (HQ)', hub.x + 8, hub.y + 3);
          } else {
            // International Market Hubs
            ctx.fillStyle = `rgba(225, 29, 42, ${alpha})`;
            ctx.beginPath();
            ctx.arc(hub.x, hub.y, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(hub.x, hub.y, 4.5, 0, Math.PI * 2);
            ctx.stroke();

            // City Label if depth is high
            if (depthRatio > 0.4) {
              ctx.font = '9px monospace';
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
              ctx.fillText(hub.name.toUpperCase(), hub.x + 7, hub.y + 3);
            }
          }
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
      className="relative w-full max-w-full py-16 md:py-28 px-4 sm:px-6 md:px-12 bg-[#0A0A0A] text-[#FFFFFF] overflow-x-clip border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Eyebrow, Heading, Copy & Global Presence Grid */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase tracking-[0.22em] text-[#FF3B47] font-bold block mb-4">
                GLOBAL REACH
              </span>
              <h2 className="font-display text-[clamp(32px,4.5vw,66px)] leading-[1.03] tracking-[-0.015em] text-white font-normal max-w-full">
                One partner. <span className="italic text-[#FF3B47]">Every market.</span>
              </h2>
            </div>

            <p className="font-sans text-[18px] md:text-[20px] leading-[1.65] text-white/85 font-light">
              A remote-first team of specialists, based in Indore, India, working with brands worldwide.
              We bring the right expert to each project without the overhead of a large agency.
            </p>

            <div className="pt-5 border-t border-white/12 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF3B47] pulse-red" />
                <span className="font-mono text-[12px] sm:text-[13px] uppercase tracking-[0.18em] text-white/95 font-semibold">
                  Indore, India · Working worldwide
                </span>
              </div>
              <p className="font-sans text-[15px] leading-[1.65] text-white/80 font-normal">
                Operating without geographical friction, serving ambitious founders, D2C ventures,
                and expanding enterprises across all major timezones with real-time connectivity.
              </p>
            </div>

            {/* Compact Regional & Delivery Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 pt-2">
              <div className="p-4 rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-1">
                  REGIONS SERVED
                </div>
                <div className="font-sans text-[14px] text-white/95 font-medium">
                  APAC · Europe · Americas · MENA
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-1">
                  DELIVERY MODEL
                </div>
                <div className="font-sans text-[14px] text-white/95 font-medium">
                  Async-First · Zero Agency Bloat
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-1">
                  TAX &amp; COMPLIANCE
                </div>
                <div className="font-sans text-[14px] text-white/95 font-medium">
                  Cross-Border CA Led Structuring
                </div>
              </div>

              <div className="p-4 rounded-[14px] bg-white/[0.04] border border-white/10">
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#FF3B47] font-bold mb-1">
                  RESPONSE SLA
                </div>
                <div className="font-sans text-[14px] text-white/95 font-medium">
                  Direct Senior Partner Access
                </div>
              </div>
            </div>
          </div>

          {/* Right: Rotating 3D Globe with Real Map Continents & Hubs */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[460px] aspect-square flex items-center justify-center">
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
