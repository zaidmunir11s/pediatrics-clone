import { startHere } from "@/content/home";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-[14px]">
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  );
}

export function StartHere() {
  return (
    <section data-testid="start-here" className="bg-lavender">
      <div className="mx-auto grid max-w-[1310px] px-[10px] py-6 md:h-[184px] md:grid-cols-3 md:gap-5 md:px-5 md:py-10">
        {startHere.map((item, i) => (
          <div
            key={item.title}
            className={`relative py-5 max-md:text-center md:py-0 ${
              i > 0
                ? "max-md:before:absolute max-md:before:inset-x-0 max-md:before:top-0 max-md:before:h-px max-md:before:bg-[linear-gradient(90deg,transparent,#b98ad6,transparent)] md:before:absolute md:before:top-0 md:before:-left-[10px] md:before:h-[105px] md:before:w-px md:before:bg-[#d7bfe5]"
                : ""
            }`}
          >
            <h3 className="text-[16px] leading-[28.5px] font-bold text-black md:text-[19px]">{item.title}</h3>
            <p className="mt-1 text-[15px] leading-[24px] text-ink-700">{item.body}</p>
            <a
              href={item.href}
              className="mt-[22px] inline-flex items-center gap-[13px] text-base leading-[25.6px] font-medium text-purple-cta transition-colors hover:text-[#7f1aa6]"
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
