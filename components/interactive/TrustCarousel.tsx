"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { trustReviews } from "@/content/home";

const TI = "/images/trustindex";

function Stars({ size }: { size: number }) {
  return (
    <span className="flex gap-px">
      {Array.from({ length: 5 }, (_, i) => (
        <Image key={i} src={`${TI}/star.svg`} alt="" width={size} height={size} />
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: (typeof trustReviews.reviews)[number] }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <article
      data-testid="review-card"
      className="relative flex shrink-0 snap-start flex-col rounded-[12px] border border-black bg-white bg-[url(/images/trustindex/pattern-dottie.svg)] bg-[length:auto] bg-top-right bg-no-repeat p-5 shadow-[1px_4px_10px_0_rgba(0,0,0,0.16)] max-md:w-full md:w-[calc((100%-16px)/2)] lg:w-[calc((100%-48px)/4)]"
    >
      <Image src={`${TI}/google-icon.svg`} alt="Google" width={20} height={20} className="absolute top-5 right-5" />
      <div className="flex items-center gap-[15px] pr-6">
        <Image src={review.avatar} alt={`${review.name} profile picture`} width={40} height={40} className="size-10 rounded-full object-cover" />
        <div>
          <div className="text-[15px] leading-[21px] font-semibold text-black">{review.name}</div>
          <div className="text-[13px] leading-[18.2px] text-[#767676]">{review.date}</div>
        </div>
      </div>
      <div className="mt-[11px] flex items-center gap-2">
        <Stars size={17} />
        <Image src={`${TI}/verified.svg`} alt="Verified" width={15} height={15} />
      </div>
      <p
        data-testid="review-text"
        className={`mt-[11px] text-[15px] leading-[21.75px] text-black ${expanded ? "" : "line-clamp-4"}`}
      >
        {review.text}
      </p>
      {review.text.length > 120 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-[7px] self-start text-[13px] leading-[18.2px] text-[#767676] hover:underline"
        >
          {expanded ? "Hide" : "Read more"}
        </button>
      )}
    </article>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous review" : "Next review"}
      onClick={onClick}
      className={`absolute top-[363px] flex size-[30px] items-center justify-center rounded-full bg-white shadow-[0_0_6px_rgba(0,0,0,0.15)] max-md:hidden ${
        dir === "prev" ? "left-[25px]" : "right-[25px]"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
        <polyline points={dir === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

// Static replica of the Trustindex Google-reviews slider: snap-scrolling track,
// arrows, "Read more" expansion, and a gentle autoplay that pauses on interaction.
export function TrustCarousel() {
  const track = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  // Any direct interaction (touch, drag, wheel) stops autoplay for good, as hover cannot on touch screens.
  const [stopped, setStopped] = useState(false);
  const [progress, setProgress] = useState(0);

  function step(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const stride = card ? card.offsetWidth + 16 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else el.scrollBy({ left: dir * stride, behavior: "smooth" });
  }

  useEffect(() => {
    if (paused || stopped || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => step(1), 6000);
    return () => clearInterval(id);
  }, [paused, stopped]);

  return (
    <div
      data-testid="trust-reviews"
      className="relative mx-auto max-w-[1440px] px-[24px] pt-5 pb-[90px] md:px-10 md:pt-2 md:pb-[96px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={() => setStopped(true)}
      onWheel={() => setStopped(true)}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-[12px] border border-white bg-gray-bg px-5 py-[21px] max-md:flex-col max-md:items-start max-md:gap-2 max-md:border-[#f0f0f0]">
        <div className="flex flex-wrap items-center gap-x-[10px] gap-y-1 text-[15px] leading-[21px] font-semibold text-black">
          <Image src={`${TI}/google-logo.svg`} alt="Google" width={79} height={25} className="max-md:basis-full max-md:pr-[calc(100%-79px)]" />
          <span>{trustReviews.rating}</span>
          <Stars size={18} />
          <span className="max-md:w-full">{trustReviews.label}</span>
        </div>
        <span className="flex items-center gap-1 rounded-[3px] bg-[#157351] px-[11px] py-1 text-[12px] leading-[16.8px] font-semibold text-white">
          {trustReviews.verified}
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="size-[13px]">
            <circle cx="8" cy="8" r="6.5" />
            <path d="M8 7v4M8 5v.5" strokeLinecap="round" />
          </svg>
        </span>
      </div>

      <div
        ref={track}
        data-testid="review-track"
        onScroll={(e) => {
          const el = e.currentTarget;
          const max = el.scrollWidth - el.clientWidth;
          setProgress(max > 0 ? el.scrollLeft / max : 0);
        }}
        className="mt-[30px] flex snap-x snap-mandatory gap-4 md:mt-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {trustReviews.reviews.map((review) => (
          <ReviewCard key={review.name} review={review} />
        ))}
      </div>

      <Arrow dir="prev" onClick={() => step(-1)} />
      <Arrow dir="next" onClick={() => step(1)} />

      {/* Mobile progress indicator */}
      <div aria-hidden="true" className="relative mx-auto mt-6 h-[3px] w-[150px] rounded bg-[#d9d9d9] md:hidden">
        <span
          className="absolute top-0 h-full w-[20px] rounded bg-black"
          style={{ left: `${progress * 130}px` }}
        />
      </div>
    </div>
  );
}
