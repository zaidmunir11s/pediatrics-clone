import Image from "next/image";
import { whyLove } from "@/content/home";

export function WhyLove() {
  return (
    <section className="bg-gray-bg">
      <div className="mx-auto max-w-[1310px] px-[10px] pt-[46px] pb-[50px] md:px-5 md:pt-20 md:pb-20">
        <h2 className="text-center text-[30px] leading-[40px] font-medium text-black md:text-[44px] md:leading-[55px]">
          {whyLove.titleLead}
          <strong className="font-bold text-navy">{whyLove.titleAccent}</strong>
        </h2>
        <div className="mt-[48px] grid gap-[10px] md:grid-cols-2 lg:grid-cols-3">
          {whyLove.cards.map((card) => (
            <article
              key={card.body}
              data-testid="why-card"
              className="flex flex-col items-center rounded-[30px] bg-white px-[25px] pt-[35px] pb-[25px] text-center md:h-[315px]"
            >
              <Image src={card.icon} alt={card.alt} width={66} height={66} className="size-[66px]" />
              <h3 className="mt-[18px] text-[20px] leading-[30px] font-bold text-ink-700">
                {card.title.map((line, i) => (
                  <span key={line}>
                    {i > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              <p className="mt-8 text-base leading-[26px] text-ink-500">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
