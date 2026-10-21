import Image from "next/image";
import { asSeenOn } from "@/content/home";

export function AsSeenOn() {
  return (
    <section data-testid="as-seen-on" className="bg-navy px-[10px] pt-[60px] pb-[50px] text-center max-md:pt-[45px] max-md:pb-[35px]">
      <h2 className="text-[20px] leading-[30px] font-semibold text-sky">{asSeenOn.title}</h2>
      <div className="mx-auto mt-5 flex max-w-[966px] flex-wrap items-center justify-center gap-x-[87px] gap-y-1 max-md:gap-x-2">
        {asSeenOn.logos.map((logo) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="max-md:h-auto max-md:w-[45%] max-md:last:w-[48%]"
          />
        ))}
      </div>
    </section>
  );
}
