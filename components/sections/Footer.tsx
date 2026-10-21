import Image from "next/image";
import { footer } from "@/content/home";
import { Chevron } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* CTA band with the faint concentric-arch artwork behind it */}
      <div className="relative overflow-hidden px-6 pt-[31px] pb-5 text-center md:h-[386px] md:px-[10px] md:pt-20 md:pb-20">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-1/2 h-[333px] w-[500px] -translate-x-1/2 bg-contain bg-bottom bg-no-repeat opacity-5 max-md:w-[360px]"
          style={{ backgroundImage: `url(${footer.arch})` }}
        />
        <h2 className="relative text-[30px] leading-[40px] font-bold text-lavender md:text-[50px] md:leading-[75px]">
          {footer.cta.title}
        </h2>
        <p className="relative mx-auto mt-[7px] max-w-[1242px] text-[17px] leading-[27.2px] text-white">{footer.cta.body}</p>
        <button
          type="button"
          data-modal-open="get-started"
          className="relative mt-[47px] inline-flex h-[54px] items-center gap-7 rounded-[50px] bg-purple-cta pr-[15px] pl-[25px] text-base font-medium text-white transition-colors hover:bg-[#7f1aa6] max-md:w-full max-md:justify-between md:h-[70px] md:pr-3"
        >
          {footer.cta.label}
          <span className="flex size-[30px] items-center justify-center rounded-full bg-white/15 md:size-[46px]">
            <Chevron />
          </span>
        </button>
      </div>

      <div className="mx-auto max-w-[1282px] px-6 md:px-5">
        <div data-testid="footer-links" className="grid grid-cols-2 gap-x-[14px] gap-y-11 pt-[42px] md:h-[398px] md:grid-cols-5 md:gap-x-[82px] md:pt-[52px]">
          {footer.columns.map((col) => (
            <div key={col.title}>
              <strong data-testid="footer-heading" className="block text-[20px] leading-[28px] font-bold text-lavender">
                {col.title}
              </strong>
              <ul className="mt-[22px] flex flex-col gap-2 leading-[22px] md:mt-[30px] md:gap-[17px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[13px] leading-[22px] font-normal text-white transition-colors hover:text-lavender md:text-[15px]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col-reverse items-center gap-[25px] pt-[46px] pb-12 md:flex-row md:items-end md:justify-between md:pt-[47px]">
          <Image src={footer.logo.src} alt="Pediatrics Board Review" width={220} height={68} className="h-[68px] w-[220px]" />
          <div className="flex flex-col items-center gap-[14px] md:items-end">
            <div className="flex gap-[10px]">
              {footer.socials.map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} className="transition-opacity hover:opacity-80">
                  <Image src={s.icon} alt="" width={48} height={48} />
                </a>
              ))}
            </div>
            <p className="text-center text-sm leading-[22.4px] font-light text-white/40 md:text-right">
              All rights reserved |{" "}
              {footer.legal.map((l, i) => (
                <span key={l.label}>
                  {i > 0 && " | "}
                  <a href={l.href} className="hover:text-white/70">
                    {l.label}
                  </a>
                </span>
              ))}
            </p>
            <p className="text-center text-sm leading-[22.4px] font-light text-white/40 md:text-right">{footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
