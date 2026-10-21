import { Fragment } from "react";
import { trustedStrip } from "@/content/home";

function Institutions() {
  return trustedStrip.institutions.map((name, i) => (
    <Fragment key={name}>
      {i > 0 && (
        <span aria-hidden="true" className="inline-block px-[24px] text-[40px] leading-[48px] text-[#d7d6d6]">
          .
        </span>
      )}
      <span className="whitespace-nowrap">{name}</span>
    </Fragment>
  ));
}

export function TrustedStrip() {
  return (
    <section className="mx-auto grid max-w-[1310px] px-[10px] pt-5 pb-[22px] md:grid-cols-[347fr_833fr] md:gap-[90px] md:px-5 md:pt-0 md:pb-10">
      <p className="text-[21px] leading-[33.6px] font-bold text-ink-700 max-md:text-center md:max-w-[304px]">
        {trustedStrip.lead}
      </p>

      {/* Desktop: two centred lines */}
      <p
        data-testid="institutions"
        className="-mt-[5px] text-center text-[20px] leading-[26px] font-bold text-teal-text max-md:hidden"
      >
        <Institutions />
      </p>

      {/* Mobile: the reference runs the list as a continuous ticker */}
      <div className="mt-[5px] overflow-hidden md:hidden" aria-label={trustedStrip.institutions.join(", ")} role="img">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center text-[16px] leading-[26px] font-bold text-teal-text motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden="true" className="flex items-center pr-[24px]">
              <Institutions />
              <span className="inline-block pl-[24px] text-[40px] leading-[48px] text-[#d7d6d6]">.</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
