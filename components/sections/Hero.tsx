import Image from "next/image";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/CheckList";
import { CountUp } from "@/components/interactive/CountUp";

function Stat({ stat }: { stat: (typeof hero.stats)[number] }) {
  return (
    <div className="flex items-start gap-[15px]">
      <CheckIcon className="size-[31px] rounded-[12px] bg-[#f9eeff] p-[10px]" />
      <div className="text-ink-700 md:w-[172px]">
        <p className="text-[15px] leading-[22px] whitespace-pre-line text-black md:text-sm md:leading-[17px]">{stat.label}</p>
        {"value" in stat && stat.value ? (
          <strong className="mt-[6px] block text-base leading-[21px] font-bold text-ink-600 md:max-w-[83px] md:text-lg md:leading-[24px]">
            {stat.value}
          </strong>
        ) : null}
        {"count" in stat && stat.count ? (
          <p className="mt-[6px] leading-[25px] md:flex md:flex-col">
            <CountUp
              to={stat.count}
              suffix={stat.suffix}
              className={`font-bold ${stat.suffix === "%" ? "text-[20px] leading-[26px]" : "text-lg"}`}
            />
            {"caption" in stat && stat.caption ? (
              <strong className="ml-2 text-base font-bold uppercase md:ml-0 md:text-[13px] md:leading-[20px]">
                {stat.caption}
              </strong>
            ) : null}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      data-testid="hero"
      className="mx-auto flex max-w-[1310px] flex-col px-[10px] pt-[30px] pb-[30px] md:grid md:grid-cols-[689fr_562fr] md:gap-x-5 md:px-[20px] md:pt-[60px] lg:h-[792px]"
    >
      {/* Left column; on mobile its children join the parent flow so they can reorder. */}
      <div className="contents md:flex md:flex-col">
        <h1 className="order-1 md:order-none text-[27px] leading-[39px] font-medium text-black md:text-[40px] md:leading-[52px] lg:text-[52px] lg:leading-[64px]">
          {hero.titleLines[0]}{" "}
          <br className="max-md:hidden" />
          {hero.titleLines[1]}
        </h1>
        <p
          data-testid="hero-copy"
          className="order-4 md:order-none mt-[25px] text-base leading-[25.6px] text-ink-500 md:mt-[26px]"
        >
          {hero.copy}
        </p>
        <div
          data-testid="hero-stats"
          className="order-5 md:order-none mt-[32px] flex flex-col gap-4 md:mt-[32px] md:grid md:h-[72px] md:grid-cols-3 md:gap-[18px]"
        >
          {hero.stats.map((stat) => (
            <Stat key={stat.label} stat={stat} />
          ))}
        </div>
        <div className="order-2 mt-[19px] md:order-none md:mt-[30px]">
          <Button href={hero.cta.href} chevron className="h-[50px] max-md:px-[25px]">
            {hero.cta.label}
          </Button>
        </div>
        <div
          data-testid="guarantee"
          className="order-3 mt-[14px] flex h-[110px] items-center gap-[17px] rounded-[18px] bg-cream-feature p-[10px] md:order-none md:mt-[32px] md:h-[102px] md:w-[409px]"
        >
          <Image
            src={hero.guarantee.badge.src}
            alt={hero.guarantee.badge.alt}
            width={89}
            height={88}
            className="size-[96px] md:h-[88px] md:w-[89px]"
          />
          <p className="text-[15px] leading-[24px] font-bold text-ink-700 md:text-lg md:leading-[28.8px]">
            {hero.guarantee.line1}
            <br />
            {hero.guarantee.line2Lead}
            <span className="text-purple-cta">{hero.guarantee.line2Accent}</span>
          </p>
        </div>
      </div>

      <picture data-testid="hero-image" className="order-6 mt-[38px] block md:mt-0">
        <source media="(max-width: 767px)" srcSet={hero.image.mobile} />
        <Image
          src={hero.image.desktop}
          alt={hero.image.alt}
          width={562}
          height={695}
          preload
          sizes="(max-width: 767px) 100vw, 562px"
          className="h-auto w-full"
        />
      </picture>
    </section>
  );
}
