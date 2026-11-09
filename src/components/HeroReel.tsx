import React, { useEffect, useRef } from 'react';

export const HeroReel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;
    const cancel = () => {
      cancelled = true;
    };

    // Only cancel auto-scroll on actual scroll / navigation gestures
    const scrollEvents = ['wheel', 'touchmove', 'keydown'];
    scrollEvents.forEach((event) => {
      window.addEventListener(event, cancel, { passive: true });
    });

    const scrollToStudio = () => {
      if (cancelled) return;
      if (window.scrollY >= window.innerHeight * 0.6) return;

      const studioEl = document.getElementById('studio');
      if (!studioEl) return;

      if (window.__lenis) {
        window.__lenis.scrollTo(studioEl, {
          duration: 1.4,
          easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
        });
      } else {
        // Guaranteed smooth 1.4s ease-in-out fallback if Lenis is absent
        const startY = window.scrollY;
        const targetY = studioEl.getBoundingClientRect().top + window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
        const duration = 1400;

        const easeInOutCubic = (t: number) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const scrollStep = (currentTime: number) => {
          if (cancelled) return;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          window.scrollTo(0, startY + distance * easeInOutCubic(progress));
          if (progress < 1) {
            requestAnimationFrame(scrollStep);
          }
        };
        requestAnimationFrame(scrollStep);
      }
    };

    // Ensure DOM properties are set for strict autoplay policy
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {
          // If browser policy temporarily blocks, try on first user gesture
          const unlockPlay = () => {
            video.muted = true;
            video.play().catch(() => {});
            window.removeEventListener('pointerdown', unlockPlay);
            window.removeEventListener('touchstart', unlockPlay);
          };
          window.addEventListener('pointerdown', unlockPlay, { once: true });
          window.addEventListener('touchstart', unlockPlay, { once: true });
        });
      }
    };

    // Attempt immediately and when ready
    attemptPlay();
    video.addEventListener('canplay', attemptPlay, { once: true });
    video.addEventListener('loadeddata', attemptPlay, { once: true });

    // Video ended -> auto-advance to #studio
    const handleEnded = () => {
      scrollToStudio();
    };

    const handleError = () => {
      scrollToStudio();
    };

    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    // Fallback: If autoplay is completely blocked, advance after 4s
    const fallbackTimer = setTimeout(() => {
      if (video.paused && !cancelled) {
        scrollToStudio();
      }
    }, 4000);

    // Pause when tab is hidden, resume when tab is active
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (!video.ended && window.scrollY < window.innerHeight * 0.8) {
        video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause only when completely scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            video.pause();
          } else if (entry.isIntersecting && !video.ended && !document.hidden) {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      clearTimeout(fallbackTimer);
      scrollEvents.forEach((event) => {
        window.removeEventListener(event, cancel);
      });
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', attemptPlay);
      video.removeEventListener('loadeddata', attemptPlay);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero-reel"
      className="relative w-full h-[100svh] p-4 md:p-4 bg-[#FFFFFF] flex items-center justify-center overflow-hidden"
    >
      <div className="relative w-full h-[calc(100svh-32px)] rounded-[16px] overflow-hidden bg-[#0A0A0A] shadow-2xl">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/video/urbrand360-reel-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/video/urbrand360-reel-720p.mp4" media="(max-width: 768px)" type="video/mp4" />
          <source src="/video/urbrand360-reel-1080p.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};
