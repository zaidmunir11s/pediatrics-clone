import Image from "next/image";
import { founder } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function Founder() {
  return (
    <section data-testid="founder" className="bg-sky">
      <div className="mx-auto flex max-w-[1310px] flex-col px-[10px] pt-7 lg:grid lg:grid-cols-[432px_1fr] lg:gap-x-[150px] lg:px-5 lg:pt-[60px]">
        {/* Text column; on mobile the kicker and heading sit above the photo, the rest below. */}
        <div className="contents lg:block">
          <p className="order-1 text-[21px] leading-[31.5px] font-semibold text-ink-700 lg:order-none">
            {founder.kicker}
          </p>
          <h2 className="order-2 mt-[7px] text-[24px] leading-[34px] font-medium text-black lg:order-none lg:text-[39px] lg:leading-[47px]">
            {founder.titleLead}
            <br />
            <strong className="font-bold text-teal-text">{founder.name}</strong>
          </h2>
          <p className="order-4 mt-[34px] text-[17px] leading-[27.2px] text-black lg:order-none">{founder.body}</p>
          <div className="order-5 mt-8 pb-[39px] lg:order-none lg:pb-0">
            <Button href={founder.cta.href} chevron className="h-[50px]">
              {founder.cta.label}
            </Button>
          </div>
        </div>
        <Image
          src={founder.image.src}
          alt={founder.image.alt}
          width={432}
          height={517}
          sizes="(max-width: 767px) 100vw, 432px"
          className="order-3 mt-[35px] h-auto w-full lg:order-none lg:col-start-1 lg:row-start-1 lg:mt-0"
        />
      </div>
    </section>
  );
}
