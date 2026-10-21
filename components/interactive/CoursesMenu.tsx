"use client";

import { useRef, useState } from "react";
import { nav } from "@/content/home";

export function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// Desktop "Courses" item: hover or the toggle opens the dropdown; Escape closes it.
export function CoursesMenu() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggleRef.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className={`block py-[9.6px] pr-[33.6px] pl-2 text-base leading-[25.6px] transition-colors duration-200 ${open ? "text-purple-cta" : "text-black"}`}
      >
        {nav.courses.label}
      </a>
      <button
        ref={toggleRef}
        type="button"
        aria-label={`Expand ${nav.courses.label}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`absolute top-0 right-[7px] flex h-[45px] w-[26px] items-center justify-center transition-colors duration-200 ${open ? "text-purple-cta" : "text-black"}`}
      >
        <ChevronDown className="size-4" />
      </button>
      <ul
        data-testid="courses-dropdown"
        className={`absolute top-[48px] left-0 z-50 w-[290px] rounded-[13px] bg-white p-5 shadow-[0_10px_30px_-2px_rgba(0,0,0,0.1)] transition-[opacity,transform] duration-200 before:absolute before:inset-x-0 before:-top-[10px] before:h-[10px] ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {nav.courses.items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block px-[7.5px] py-[10px] text-[15px] leading-[25px] text-black transition-colors hover:text-purple-cta"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
