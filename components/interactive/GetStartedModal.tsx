"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDialog } from "./useDialog";
import { getStartedQuiz } from "@/content/home";
import { Chevron } from "@/components/ui/Button";

// "Welcome to PBR!" chooser. Any element with data-modal-open="get-started" opens it,
// mirroring the reference's Kadence modal triggers.
export function GetStartedModal() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as Element).closest<HTMLElement>('[data-modal-open="get-started"]');
      if (!trigger) return;
      e.preventDefault();
      opener.current = trigger;
      setOpen(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useDialog(dialogRef, open, () => setOpen(false), () => {
    const el = opener.current;
    if (el?.isConnected) return el;
    // Trigger was unmounted (e.g. inside the mobile menu): use its declared fallback.
    const fallback = el?.dataset.returnFocus;
    return fallback ? document.querySelector<HTMLElement>(fallback) : null;
  });

  const close = () => setOpen(false);

  if (!open) return null;
  const selected = choice === null ? null : getStartedQuiz.options[choice];

  const ctaClass =
    "mt-[30px] inline-flex h-[70px] items-center gap-7 rounded-[50px] bg-purple-cta pr-3 pl-[25px] text-base font-medium text-white transition-colors hover:bg-[#7f1aa6] max-md:w-full max-md:justify-between";
  const chip = (
    <span className="flex size-[46px] items-center justify-center rounded-full bg-white/15">
      <Chevron />
    </span>
  );

  // Layout measured from the reference's Kadence modal (800px box, 28px radius, 30px padding).
  return (
    <div
      className="fixed inset-0 z-[100001] flex items-start justify-center overflow-y-auto bg-[rgba(16,11,71,0.8)] px-4 py-[28px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="get-started-title"
        tabIndex={-1}
        className="relative w-full max-w-[800px] rounded-[28px] bg-white p-[30px] pt-10 text-center outline-none max-md:p-5"
      >
        <button type="button" aria-label="Close Modal" onClick={close} className="absolute top-[17px] right-5 size-[26px] text-[#444]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <Image src={getStartedQuiz.icon} alt="" width={54} height={54} className="mx-auto size-[54px]" />
        <h2 id="get-started-title" className="mt-[11px] text-2xl leading-9 font-bold text-ink-700">
          {getStartedQuiz.title}
        </h2>
        <p className="mt-6 text-base leading-[26px] text-ink-500">{getStartedQuiz.intro}</p>

        <fieldset className="mt-[30px] flex flex-col gap-[10px] text-left">
          <legend className="sr-only">{getStartedQuiz.intro}</legend>
          {getStartedQuiz.options.map((opt, i) => (
            <label
              key={opt.title}
              className="relative flex min-h-[104px] cursor-pointer items-center gap-[15px] rounded-[16px] border-[3px] border-gray-bg bg-white py-[18px] pr-5 pl-[18px]"
            >
              <input
                type="radio"
                name="get-started-choice"
                checked={choice === i}
                onChange={() => setChoice(i)}
                className="peer absolute inset-0 size-full cursor-pointer opacity-0"
              />
              {/* Reference radio: white disc with a lavender inset ring; fills green with a check when chosen. */}
              <span
                aria-hidden="true"
                className={`flex size-[30px] shrink-0 items-center justify-center rounded-full p-[10px] text-white transition-shadow peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-purple-cta ${
                  choice === i ? "bg-[#11ac65] shadow-[inset_0_0_0_15px_#11ac65]" : "bg-white shadow-[inset_0_0_0_6px_rgba(233,211,245,0.8)]"
                }`}
              >
                <svg viewBox="0 0 8 8" fill="currentColor" className="size-[10px]">
                  <path d="M6.41 0l-.69.72-2.78 2.78-.81-.78-.72-.72-1.41 1.41.72.72 1.5 1.5.69.72.72-.72 3.5-3.5.72-.72-1.44-1.41z" transform="translate(0 1)" />
                </svg>
              </span>
              <span>
                <span className="block text-[17px] leading-[26px] font-semibold text-ink-600">{opt.title}</span>
                <span className="mt-[14px] block text-sm leading-[22px] text-ink-600">{opt.body}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {selected ? (
          <a href={selected.href} className={ctaClass}>
            {getStartedQuiz.cta}
            {chip}
          </a>
        ) : (
          // Same look as the reference before a choice; it prompts for a selection instead of navigating.
          <button
            type="button"
            aria-disabled="true"
            onClick={() => dialogRef.current?.querySelector<HTMLInputElement>("input[type=radio]")?.focus()}
            className={ctaClass}
          >
            {getStartedQuiz.cta}
            {chip}
          </button>
        )}
      </div>
    </div>
  );
}
