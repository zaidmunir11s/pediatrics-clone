import Image from "next/image";
import { strategy } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function Strategy() {
  return (
    <section data-testid="strategy" className="bg-sky">
      <div className="mx-auto grid max-w-[1310px] gap-8 px-[10px] pt-10 pb-10 md:grid-cols-2 md:gap-5 md:px-5 md:pt-20 md:pb-20">
        <div>
          <h2 className="text-[22px] leading-[32px] font-medium text-black md:text-[39px] md:leading-[47px]">
            What if passing isn’t about <em>what</em> you study
            <span className="font-bold text-navy">, but how you study?</span>
          </h2>
          {strategy.paragraphs.map((p, i) => (
            <p key={p} className={`${i === 0 ? "mt-[35px]" : "mt-8"} text-base leading-[25.6px] text-black`}>
              {p}
            </p>
          ))}
          <p className="mt-8 text-base leading-[25.6px] font-bold text-black">
            {strategy.closing}
          </p>
          <Button href={strategy.cta.href} chevron className="mt-[34px] h-[50px] md:mt-8">
            {strategy.cta.label}
          </Button>
        </div>
        <Image
          src={strategy.image.src}
          alt={strategy.image.alt}
          width={625}
          height={548}
          sizes="(max-width: 767px) 100vw, 625px"
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
