import { useEffect, useRef, useState } from 'react';

export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: '0px 0px -60px 0px' },
    );
    io.observe(node);
    // safety net: never leave content invisible
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [threshold]);

  return { ref, shown, className: shown ? 'reveal reveal-in' : 'reveal' };
}