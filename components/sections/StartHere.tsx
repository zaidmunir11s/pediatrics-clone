import { startHere } from "@/content/home";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[19px]">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function StartHere() {
  return (
    <section data-testid="start-here" className="bg-lavender">
      <div className="mx-auto grid max-w-[1310px] px-[10px] pt-[30px] pb-[29px] md:h-[184px] md:grid-cols-3 md:gap-5 md:px-5 md:py-10">
        {startHere.map((item, i) => (
          <div
            key={item.title}
            className={`relative max-md:text-center max-md:not-first:pt-[17px] max-md:not-last:pb-[17px] ${
              i > 0
                ? "max-md:before:absolute max-md:before:inset-x-0 max-md:before:top-0 max-md:before:h-px max-md:before:bg-[radial-gradient(#8b8bec_0%,rgba(139,139,236,0)_69%)]"
                : ""
            } ${
              i === 1
                ? "md:before:absolute md:before:top-1/2 md:before:left-[-11%] md:before:h-[133px] md:before:w-px md:before:-translate-y-1/2 md:before:bg-[radial-gradient(#8b8bec_0%,rgba(139,139,236,0)_69%)] md:after:absolute md:after:top-1/2 md:after:right-[11%] md:after:h-[133px] md:after:w-px md:after:-translate-y-1/2 md:after:bg-[radial-gradient(#8b8bec_0%,rgba(139,139,236,0)_69%)]"
                : ""
            }`}
          >
            <h3 className="text-[15px] leading-[22.5px] font-bold text-black md:text-[19px] md:leading-[28.5px]">{item.title}</h3>
            <p className="mt-1 text-[15px] leading-[24px] text-ink-700">{item.body}</p>
            <a
              href={item.href}
              className="mt-[22px] inline-flex items-center gap-2 text-base leading-[25.6px] font-medium text-purple-cta"
            >
              Start Here
              <ArrowUpRight />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
