import { Fragment } from "react";
import { trustedStrip } from "@/content/home";

export function TrustedStrip() {
  return (
    <section className="mx-auto grid max-w-[1310px] gap-6 px-[10px] pb-10 md:grid-cols-[347fr_833fr] md:gap-[90px] md:px-5">
      <p className="text-[19px] leading-[30px] font-bold text-ink-700 max-md:text-center md:text-[21px] md:leading-[33.6px] md:max-w-[304px]">
        {trustedStrip.lead}
      </p>
      <p
        data-testid="institutions"
        className="-mt-[5px] text-center text-[17px] leading-[26px] font-bold text-teal-text md:text-[20px]"
      >
        {trustedStrip.institutions.map((name, i) => (
          <Fragment key={name}>
            {i > 0 && (
              <span aria-hidden="true" className="inline-block px-[19px] text-[40px] leading-[48px] text-[#d7d6d6]">
                .
              </span>
            )}
            <span className="whitespace-nowrap">{name}</span>
          </Fragment>
        ))}
      </p>
    </section>
  );
}
