import Image from "next/image";
import { whoHelp } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";

export function WhoHelp() {
  return (
    <section id="who-do-we-help" className="relative mx-auto max-w-[1310px] scroll-mt-[90px] px-[10px] pt-10 pb-[50px] md:px-5 md:pt-20 md:pb-20">
      <Image
        src={whoHelp.vector}
        alt=""
        width={570}
        height={392}
        className="pointer-events-none absolute top-[171px] right-[10px] w-[calc(100%-20px)] max-w-[570px] md:top-20 md:right-5"
      />
      <div className="relative max-md:text-center">
        <h2 className="text-[28px] leading-[38px] font-medium text-black md:text-[44px] md:leading-[55px]">
          {whoHelp.titleLead}
          <strong className="font-bold text-purple-cta">{whoHelp.titleAccent}</strong>
        </h2>
        <p className="mt-[14px] text-base leading-[25.6px] text-black md:mt-[22px] md:max-w-[556px]">
          {whoHelp.intro}
        </p>
      </div>

      <div className="relative mt-[52px] grid gap-8 md:mt-[34px] md:grid-cols-2 md:gap-[15px]">
        {whoHelp.large.map((card) => (
          <article
            key={card.title}
            data-testid="who-card-large"
            className={`flex flex-col overflow-hidden rounded-[33px] ${card.tone} md:h-[682px]`}
          >
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={628}
              height={300}
              sizes="(max-width: 767px) 100vw, 628px"
              className="h-[300px] w-full rounded-t-[33px] object-cover max-md:h-[175px]"
            />
            <div className="flex flex-1 flex-col px-[18px] pt-[19px] pb-[18px] md:px-[30px] md:pt-[31px] md:pb-[29px]">
              <strong className="text-[25px] leading-[37.5px] font-bold text-black">{card.title}</strong>
              <CheckList items={card.bullets} className="mt-[23px] gap-3 text-base leading-[25.6px] md:gap-[14px]" />
              <Button href={card.cta.href} className="mt-[26px] h-[52px] self-start py-[13px] md:mt-auto">
                {card.cta.label}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="relative mt-[15px] grid gap-3 md:gap-[15px] lg:grid-cols-3">
        {whoHelp.small.map((card) => (
          <article
            key={card.titleBold}
            data-testid="who-card-small"
            className="flex flex-col rounded-[30px] bg-gray-bg p-[30px] lg:h-[424px] lg:pt-7 lg:pb-[29px]"
          >
            <h3 className="text-[22px] leading-[31px] font-semibold text-black">
              <strong className="font-bold">{card.titleBold}</strong>
              {card.titleRest}
            </h3>
            <CheckList items={card.bullets} className="mt-[9px] gap-[17px] text-[15px] leading-[25px]" />
            <Button href={card.cta.href} className="mt-10 h-[52px] self-start py-[13px] lg:mt-auto">
              {card.cta.label}
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}
