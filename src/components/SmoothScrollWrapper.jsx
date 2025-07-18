// components/SmoothScrollWrapper.jsx
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const SmoothScrollWrapper = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05, // ⏱ slightly faster than 1.4 for responsiveness
      easing: (t) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t), // ✨ smoother, more natural easing
      smooth: true,
      smoothTouch: true,
      gestureOrientation: 'vertical',
      mouseMultiplier: 2.5,   // 🖱️ higher = more scroll per tick
      touchMultiplier: 2.0,   // 📱 smooth mobile swipe
      normalizeWheel: true,   // ✅ normalize different device scroll speeds
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
};

export default SmoothScrollWrapper;