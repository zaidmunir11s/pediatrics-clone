import { Fragment } from "react";
import { trustedStrip } from "@/content/home";

// The reference draws each separator as an oversized "." glyph; a real 8px dot,
// centred on the text, reproduces how it renders without the glyph's baseline drift.
function Dot() {
  return <span aria-hidden="true" className="mx-[14px] inline-block size-2 shrink-0 rounded-full bg-[#d7d6d6] align-middle md:mr-[25px] md:ml-[30px] md:translate-y-[3px]" />;
}

function Institutions() {
  return trustedStrip.institutions.map((name, i) => (
    <Fragment key={name}>
      {i > 0 && <Dot />}
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
        className="text-center text-[20px] leading-[48px] font-bold text-teal-text max-md:hidden"
      >
        <Institutions />
      </p>

      {/* Mobile: the reference runs the list as a continuous ticker */}
      <div className="mt-[5px] flex h-14 items-center overflow-hidden md:hidden" aria-label={trustedStrip.institutions.join(", ")} role="img">
        <div className="flex w-max animate-[marquee_25s_linear_infinite] items-center text-[16px] leading-[26px] font-bold text-teal-text motion-reduce:animate-none">
          {[0, 1].map((copy) => (
            <span key={copy} aria-hidden="true" className="flex items-center">
              <Institutions />
              <Dot />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
