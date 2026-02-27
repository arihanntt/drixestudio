// components/SmoothScrollWrapper.jsx
'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { usePathname } from 'next/navigation';

export default function SmoothScrollWrapper({ children }) {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      lerp: 0.075, // Optimal smoothness-to-responsiveness ratio
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: isTouchDevice ? 1.4 : 1.7,
      wheelMultiplier: 1.1,
      infinite: false,
      gestureOrientation: 'vertical',
      normalizeWheel: true,
      autoResize: true,
    });

    lenisRef.current = lenis;

    // RAF with error handling and delta time
    let rafId;

const raf = (time) => {
  if (lenisRef.current) {
    lenisRef.current.raf(time);
  }
  rafId = requestAnimationFrame(raf);
};

rafId = requestAnimationFrame(raf);

    // Dynamic adjustments
    const handleResize = () => {
      lenis.resize();
      if (window.innerWidth < 768) {
        lenis.options.lerp = 0.12; // More responsive on mobile
      } else {
        lenis.options.lerp = 0.075;
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

     // 🔥 expose globally
    window.lenis = lenis;
window.toggleLenis = (state) => {
  if (!lenisRef.current) return;

  if (state === "stop") {
    lenisRef.current.stop();
    lenisRef.current.options.smoothWheel = false;
    lenisRef.current.options.smoothTouch = false;
  } else {
    lenisRef.current.options.smoothWheel = true;
    lenisRef.current.options.smoothTouch = true;
    lenisRef.current.start();
  }
};

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Reset scroll on route change
  useEffect(() => {
    if (!lenisRef.current) return;
    lenisRef.current.scrollTo(0, { immediate: true });
    
    // Delay resize to allow DOM update
    const timer = setTimeout(() => lenisRef.current?.resize(), 100);
    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}