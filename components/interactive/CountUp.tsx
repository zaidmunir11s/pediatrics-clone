"use client";

import { useEffect, useRef, useState } from "react";

type Props = { to: number; suffix?: string; duration?: number; className?: string };

const format = (n: number) => n.toLocaleString("en-US");

// Server-renders the final value; once visible, counts up from 0 (skipped for reduced motion).
export function CountUp({ to, suffix = "", duration = 2500, className }: Props) {
  const [value, setValue] = useState(to);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setValue(Math.round(to * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${format(to)}${suffix}`}</span>
      <span aria-hidden="true">
        {format(value)}
        {suffix}
      </span>
    </span>
  );
}
