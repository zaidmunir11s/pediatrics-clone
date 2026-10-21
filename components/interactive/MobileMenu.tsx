"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { logo, nav } from "@/content/home";
import { ChevronDown } from "./CoursesMenu";

function HamburgerIcon() {
  // Reference icon: two full bars and a shorter right-aligned bottom bar.
  return (
    <svg viewBox="0 0 12 10" fill="currentColor" aria-hidden="true" className="size-5">
      <rect x="0.4" y="0.2" width="11.2" height="1.6" rx="0.8" />
      <rect x="0.4" y="4.2" width="11.2" height="1.6" rx="0.8" />
      <rect x="5.2" y="8.2" width="6.4" height="1.6" rx="0.8" />
    </svg>
  );
}

// Tablet/mobile off-canvas menu (≤1024px): full-screen white panel.
export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function close() {
    setOpen(false);
    toggleRef.current?.focus();
  }

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-label="Toggle Menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-[52px] w-[72px] items-center justify-center rounded-[50px] bg-purple-cta pt-[18px] pr-[26px] pb-[14px] pl-[26px] text-white"
      >
        <HamburgerIcon />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[100000] flex flex-col overflow-y-auto bg-white p-5"
        >
          <button
            ref={closeRef}
            type="button"
            aria-label="Close Menu"
            onClick={close}
            className="absolute top-5 right-5 size-6 text-black"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <Image src={logo.src} alt={logo.alt} width={194} height={61} className="mt-[10px] h-[61px] w-[194px]" />

          <ul className="mt-[4px] flex flex-col">
            <li>
              <div className="flex items-center justify-between">
                <a href="#" onClick={(e) => e.preventDefault()} className="block py-[9.6px] pl-2 text-base leading-[25.6px] text-black">
                  {nav.courses.label}
                </a>
                <button
                  type="button"
                  aria-label={`Expand ${nav.courses.label}`}
                  aria-expanded={coursesOpen}
                  onClick={() => setCoursesOpen((v) => !v)}
                  className="mr-4 flex size-[26px] items-center justify-center"
                >
                  <ChevronDown className={`size-4 transition-transform ${coursesOpen ? "rotate-180" : ""}`} />
                </button>
              </div>
              {coursesOpen && (
                <ul className="pl-4">
                  {nav.courses.items.map((item) => (
                    <li key={item.href}>
                      <a href={item.href} className="block py-2 pl-2 text-sm text-black">
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block py-[9.6px] pl-2 text-base leading-[25.6px] text-black">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-4 pt-8">
            <a
              href={nav.login.href}
              className="flex h-[52px] items-center justify-center rounded-[50px] bg-lavender text-base font-medium text-black uppercase"
            >
              Log In
            </a>
            <button
              type="button"
              data-modal-open="get-started"
              onClick={() => setOpen(false)}
              className="flex h-[52px] items-center justify-center rounded-[50px] bg-purple-cta text-base font-medium text-white uppercase"
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </>
  );
}
