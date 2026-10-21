"use client";

import { useEffect, useState } from "react";

// Reference: Kadence scroll-to-top, a 41px outlined circle at the bottom right.
export function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!shown) return null;
  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed right-[30px] bottom-[calc(var(--ribbon-h,0px)+20px)] z-[10000] flex size-[41px] items-center justify-center rounded-full border-2 border-purple-cta bg-transparent text-purple-cta transition-colors hover:bg-purple-cta hover:text-white max-md:right-4"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
