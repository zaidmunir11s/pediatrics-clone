"use client";

import { useEffect, useRef, useState } from "react";
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

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function close() {
    setOpen(false);
    opener.current?.focus();
  }

  if (!open) return null;
  const selected = choice === null ? null : getStartedQuiz.options[choice];

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-start justify-center overflow-y-auto bg-[rgba(16,11,71,0.75)] px-4 py-[28px]"
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
        className="relative w-full max-w-[800px] rounded-[28px] bg-white p-[30px] text-center outline-none max-md:p-5"
      >
        <button
          type="button"
          aria-label="Close Modal"
          onClick={close}
          className="absolute top-5 right-5 size-6 text-ink-700"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <span className="mx-auto mb-3 flex size-[52px] items-center justify-center rounded-full bg-lavender-soft text-purple-cta">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-6">
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 16a1.25 1.25 0 1 1 0-2.5A1.25 1.25 0 0 1 12 18Zm1.6-5.4c-.6.4-.8.6-.8 1.2v.4h-1.8v-.5c0-1.2.5-1.8 1.4-2.4.6-.4 1-.7 1-1.3 0-.7-.6-1.2-1.4-1.2-.9 0-1.5.6-1.6 1.4L8.6 9.9C8.8 8 10.2 6.8 12 6.8c1.9 0 3.3 1.1 3.3 2.9 0 1.3-.7 2.1-1.7 2.9Z" />
          </svg>
        </span>
        <h2 id="get-started-title" className="text-2xl leading-[1.5] font-bold text-ink-700">
          {getStartedQuiz.title}
        </h2>
        <p className="mt-4 text-base text-ink-700">{getStartedQuiz.intro}</p>

        <fieldset className="mt-6 flex flex-col gap-3 text-left">
          <legend className="sr-only">{getStartedQuiz.intro}</legend>
          {getStartedQuiz.options.map((opt, i) => (
            <label
              key={opt.title}
              className={`relative flex cursor-pointer items-center gap-4 rounded-[10px] border bg-white px-5 py-4 transition-colors ${
                choice === i ? "border-purple-cta bg-lavender-soft" : "border-[#eeeaf3] hover:border-lavender"
              }`}
            >
              <input
                type="radio"
                name="get-started-choice"
                checked={choice === i}
                onChange={() => setChoice(i)}
                className="peer absolute inset-0 size-full cursor-pointer opacity-0"
              />
              <span
                aria-hidden="true"
                className={`flex size-[22px] shrink-0 items-center justify-center rounded-full border-[3px] ${
                  choice === i ? "border-purple-cta" : "border-lavender"
                } peer-focus-visible:outline-2 peer-focus-visible:outline-purple-cta`}
              >
                {choice === i && <span className="size-2 rounded-full bg-purple-cta" />}
              </span>
              <span>
                <span className="block text-base font-semibold text-ink-700">{opt.title}</span>
                <span className="mt-2 block text-sm leading-[1.6] text-ink-700">{opt.body}</span>
              </span>
            </label>
          ))}
        </fieldset>

        {selected ? (
          <a
            href={selected.href}
            className="mt-6 inline-flex items-center gap-[0.7em] rounded-[50px] bg-purple-cta px-[25px] py-3 font-medium text-white transition-colors hover:bg-[#7f1aa6] max-md:w-full max-md:justify-center"
          >
            {getStartedQuiz.cta}
            <Chevron />
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="mt-6 inline-flex items-center gap-[0.7em] rounded-[50px] bg-purple-cta px-[25px] py-3 font-medium text-white opacity-50 max-md:w-full max-md:justify-center"
          >
            {getStartedQuiz.cta}
            <Chevron />
          </button>
        )}
      </div>
    </div>
  );
}
