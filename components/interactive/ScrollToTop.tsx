"use client";

import { useEffect, useState } from "react";

// Reference: Kadence scroll-to-top — 41px outlined circle, 30px from the bottom-right corner,
// slides/fades in after scrolling, hidden on phones, and stacked below the funnel ribbon.
export function ScrollToTop() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      tabIndex={shown ? 0 : -1}
      aria-hidden={!shown}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-[30px] bottom-[30px] z-[1000] flex size-[41px] items-center justify-center rounded-full border-2 border-current text-[#7f1aa6] transition-[opacity,transform,color] duration-200 hover:text-purple-cta max-md:hidden ${
        shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-5">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  );
}
