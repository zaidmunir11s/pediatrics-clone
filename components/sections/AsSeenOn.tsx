import Image from "next/image";
import { asSeenOn } from "@/content/home";

export function AsSeenOn() {
  return (
    <section data-testid="as-seen-on" className="bg-navy px-[10px] pt-[60px] pb-[50px] text-center max-md:pt-[36px] max-md:pb-[35px]">
      <h2 className="text-[20px] leading-[30px] font-semibold text-sky">{asSeenOn.title}</h2>
      <div className="mx-auto mt-5 flex max-w-[966px] flex-wrap items-center gap-x-[10px] gap-y-1 max-md:justify-start md:justify-center md:gap-x-0 md:pl-[13px]">
        {/* Reference spacing is uneven: 93px then 81px between logos. */}
        {asSeenOn.logos.map((logo, i) => (
          <Image
            key={logo.src}
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className={`object-cover max-md:h-auto max-md:w-[calc(50%-5px)] ${["md:h-[68px] md:w-[251px]", "md:ml-[93px] md:h-[56px] md:w-[234px]", "md:ml-[81px] md:h-[33px] md:w-[276px]"][i]}`}
          />
        ))}
      </div>
    </section>
  );
}
