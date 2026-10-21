"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { funnel } from "@/content/home";
import { useDialog } from "./useDialog";

const DISMISS_KEY = "pbr-funnel-dismissed";

// Session-scoped dismissal flag, read via useSyncExternalStore so the server render
// (ribbon hidden) and the client agree without a setState-in-effect.
const listeners = new Set<() => void>();
const dismissedStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get() {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "1";
    } catch {
      return false;
    }
  },
  dismiss() {
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {}
    listeners.forEach((cb) => cb());
  },
};
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = Partial<Record<"first" | "last" | "email", string>>;

function DownloadModal({ onClose, returnTo }: { onClose: () => void; returnTo: () => HTMLElement | null }) {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialog(dialogRef, true, onClose, returnTo);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    for (const key of ["first", "last", "email"] as const) {
      if (!String(data.get(key) ?? "").trim()) next[key] = "This field is required.";
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !EMAIL.test(email)) next.email = "Please enter a valid email address.";
    setErrors(next);
    // No backend here: validate only, and say plainly that nothing was sent.
    setDone(Object.keys(next).length === 0);
  }

  const field = "h-[38px] w-full rounded-[3px] border border-[#ccc] px-3 text-[15px] outline-none focus:border-purple-cta";

  return (
    <div
      className="fixed inset-0 z-[100001] flex items-center justify-center overflow-y-auto bg-[rgba(16,11,71,0.75)] px-4 py-8"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="download-title"
        tabIndex={-1}
        className="relative w-full max-w-[900px] rounded-[8px] bg-white px-6 pt-10 pb-8 text-ink-700 outline-none md:px-[100px]"
      >
        <button type="button" aria-label="Close Modal" onClick={onClose} className="absolute top-3 right-3 size-6 text-black">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h2 id="download-title" className="text-center text-[20px] leading-[32px] font-bold">
          {funnel.modal.title}
        </h2>
        <p className="mt-3 text-center text-base">{funnel.modal.subtitle}</p>

        <div className="mt-10 grid items-start gap-8 md:grid-cols-[1fr_1.3fr]">
          <div className="text-center">
            <p className="text-[17px] leading-[24px] font-bold">
              {funnel.modal.guarantee[0]}
              <br />
              {funnel.modal.guarantee[1]}
            </p>
            <Image src={funnel.modal.image} alt="" width={250} height={250} className="mx-auto mt-4 w-[200px]" />
          </div>

          <form noValidate onSubmit={submit} className="flex flex-col gap-5">
            <fieldset>
              <legend className="text-[15px] font-semibold">
                Name <span className="text-[#c02b0a]">*</span>
              </legend>
              <div className="mt-2 grid grid-cols-2 gap-3">
                {(["first", "last"] as const).map((key) => (
                  <div key={key}>
                    <input id={`dl-${key}`} name={key} type="text" autoComplete={key === "first" ? "given-name" : "family-name"} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `dl-${key}-error` : undefined} className={field} />
                    <label htmlFor={`dl-${key}`} className="mt-1 block text-[13px] capitalize">
                      {key}
                    </label>
                    {errors[key] && <p id={`dl-${key}-error`} className="mt-1 text-[13px] text-[#c02b0a]">{errors[key]}</p>}
                  </div>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="dl-email" className="text-[15px] font-semibold">
                Email <span className="text-[#c02b0a]">*</span>
              </label>
              <input id="dl-email" name="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "dl-email-error" : undefined} className={`${field} mt-2`} />
              {errors.email && <p id="dl-email-error" className="mt-1 text-[13px] text-[#c02b0a]">{errors.email}</p>}
            </div>
            <button type="submit" className="self-start rounded-[4px] bg-[#7f1aa6] px-4 py-2 text-[15px] font-medium text-white hover:bg-purple-cta">
              Submit
            </button>
            <p role="status" className="min-h-[1px] text-[14px] text-[#157351]">
              {done && "Looks good — but this is a static reproduction, so your details were not sent anywhere."}
            </p>
          </form>
        </div>
        <p className="mt-6 text-center text-base font-bold">{funnel.modal.footer}</p>
      </div>
    </div>
  );
}

// Fixed "free chapters" ribbon. Dismissal lasts for the browser session.
export function FunnelRibbon() {
  const visible = !useSyncExternalStore(dismissedStore.subscribe, dismissedStore.get, () => true);
  const [modal, setModal] = useState(false);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const downloadRef = useRef<HTMLButtonElement>(null);

  // Reserve space under the page so the ribbon never hides the footer's last line.
  useEffect(() => {
    const el = ribbonRef.current;
    if (!visible || !el) {
      document.body.style.paddingBottom = "";
      return;
    }
    const sync = () => (document.body.style.paddingBottom = `${el.offsetHeight}px`);
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  return (
    <>
      {visible && (
        <div
          ref={ribbonRef}
          data-testid="funnel-ribbon"
          className="fixed inset-x-0 bottom-0 z-[9999] rounded-t-[20px] bg-navy-ribbon"
        >
          {/* Measured on the reference: mobile/tablet stacks the button under the cards;
              desktop is one row, 197px tall, vertically centred. */}
          <div className="relative mx-auto max-w-[1290px] px-[10px] pt-[30px] pb-5 lg:flex lg:items-center lg:px-5 lg:py-5">
            <div className="flex items-start lg:items-center">
              <div className="flex shrink-0 items-start gap-[10px] lg:gap-[15px]">
                {funnel.chapters.map((ch) => (
                  <div
                    key={ch.topic}
                    className="flex w-[84px] flex-col items-center rounded-[14px] bg-white p-[10px] text-center lg:h-[157px] lg:w-[135px] lg:rounded-[15px]"
                  >
                    <Image src={ch.image} alt="" width={115} height={76} className="h-[42px] w-16 rounded-[15px] object-cover lg:h-[76px] lg:w-[115px]" />
                    <p className="mt-[5px] text-[7px] leading-[10px] font-bold text-ink-700 lg:mt-[6px] lg:text-[10px] lg:leading-[16px]">
                      <span className="text-purple-cta">{ch.kicker}</span>
                      <br />
                      {ch.topic}
                    </p>
                    <Image src={funnel.logo} alt="" width={60} height={19} className="mt-[5px] h-5 w-16 object-contain lg:mt-auto lg:h-[19px] lg:w-[60px]" />
                  </div>
                ))}
              </div>
              <div className="ml-[15px] w-[154px] pt-[17px] lg:ml-[41px] lg:w-[495px] lg:pt-5">
                <strong className="block text-base leading-6 font-bold text-white lg:max-w-[447px] lg:text-[24px] lg:leading-8">
                  {funnel.title}
                </strong>
                <p className="mt-[5px] w-[162px] text-[12px] leading-[19.2px] text-[#dd91ff] lg:w-auto lg:mt-1 lg:text-[17px] lg:leading-[27.2px]">{funnel.tagline}</p>
              </div>
            </div>
            <button
              ref={downloadRef}
              type="button"
              onClick={() => setModal(true)}
              className="mt-[25px] ml-[21px] h-8 shrink-0 rounded-[50px] bg-[#7f1aa6] px-2 text-base text-white transition-colors hover:bg-purple-cta lg:mt-0 lg:ml-4 lg:h-12 lg:px-6"
            >
              {funnel.cta}
            </button>
            <button
              type="button"
              aria-label="Close"
              onClick={dismissedStore.dismiss}
              className="absolute top-[10px] right-[15px] flex size-[14px] items-center justify-center text-white lg:top-1/2 lg:right-[20px] lg:-translate-y-1/2"
            >
              {/* The reference's filled close glyph */}
              <svg viewBox="0 0 492 492" fill="currentColor" aria-hidden="true" className="size-[14px]">
                <path d="M300.188 246 484.14 62.04c5.06-5.064 7.852-11.82 7.86-19.024 0-7.208-2.792-13.972-7.86-19.028L468.02 7.872c-5.068-5.076-11.824-7.856-19.036-7.856-7.2 0-13.956 2.78-19.024 7.856L246.008 191.82 62.048 7.872C56.988 2.796 50.228.016 43.02.016c-7.2 0-13.96 2.78-19.02 7.856L7.872 23.988c-10.496 10.496-10.496 27.568 0 38.052L191.828 246 7.872 429.952C2.808 435.024.02 441.78.02 448.984c0 7.204 2.788 13.96 7.852 19.028l16.124 16.116c5.06 5.072 11.824 7.856 19.02 7.856 7.208 0 13.968-2.784 19.028-7.856l183.96-183.952 183.952 183.952c5.068 5.072 11.824 7.856 19.024 7.856h.008c7.204 0 13.96-2.784 19.028-7.856l16.12-16.116c5.06-5.064 7.852-11.824 7.852-19.028 0-7.204-2.792-13.96-7.852-19.028L300.188 246z" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {modal && <DownloadModal onClose={() => setModal(false)} returnTo={() => downloadRef.current} />}
    </>
  );
}
