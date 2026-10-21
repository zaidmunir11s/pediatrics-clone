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
      document.documentElement.style.removeProperty("--ribbon-h");
      return;
    }
    const sync = () => {
      document.body.style.paddingBottom = `${el.offsetHeight}px`;
      document.documentElement.style.setProperty("--ribbon-h", `${el.offsetHeight}px`);
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      document.body.style.paddingBottom = "";
      document.documentElement.style.removeProperty("--ribbon-h");
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
          <div className="mx-auto flex max-w-[1290px] items-center gap-4 px-[10px] py-5 max-lg:flex-wrap lg:gap-10 lg:px-5">
            <div className="flex shrink-0 gap-[15px] max-lg:gap-[10px]">
              {funnel.chapters.map((ch) => (
                <div key={ch.topic} className="flex h-[157px] w-[135px] flex-col items-center rounded-[15px] bg-white p-[10px] text-center max-lg:h-[123px] max-lg:w-[84px] max-lg:p-[6px]">
                  <Image src={ch.image} alt="" width={115} height={76} className="h-[76px] w-[115px] rounded-[15px] object-cover max-lg:h-[48px] max-lg:w-[72px] max-lg:rounded-[10px]" />
                  <p className="mt-[6px] text-[10px] leading-[16px] font-bold text-ink-700 max-lg:text-[7px] max-lg:leading-[10px]">
                    <span className="text-purple-cta">{ch.kicker}</span>
                    <br />
                    {ch.topic}
                  </p>
                  <Image src={funnel.logo} alt="" width={60} height={19} className="mt-auto h-[19px] w-[60px] max-lg:h-[14px] max-lg:w-[44px]" />
                </div>
              ))}
            </div>
            <div className="min-w-0 flex-1 max-lg:min-w-[130px] max-lg:basis-[130px]">
              <strong className="block text-[24px] leading-[32px] font-bold text-white max-lg:text-[16px] max-lg:leading-[24px] lg:max-w-[447px]">
                {funnel.title}
              </strong>
              <p className="mt-1 text-[17px] leading-[27.2px] text-[#dd91ff] max-lg:text-[13px] max-lg:leading-[20px]">{funnel.tagline}</p>
            </div>
            <button
              ref={downloadRef}
              type="button"
              onClick={() => setModal(true)}
              className="h-12 shrink-0 rounded-[50px] bg-[#7f1aa6] px-6 text-base text-white transition-colors hover:bg-purple-cta max-lg:h-[34px] max-lg:px-4"
            >
              {funnel.cta}
            </button>
            <button type="button" aria-label="Close" onClick={dismissedStore.dismiss} className="ml-auto size-6 shrink-0 text-white max-lg:absolute max-lg:top-3 max-lg:right-3">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {modal && <DownloadModal onClose={() => setModal(false)} returnTo={() => downloadRef.current} />}
    </>
  );
}
