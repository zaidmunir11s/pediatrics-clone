import { trustHeading } from "@/content/home";
import { TrustCarousel } from "@/components/interactive/TrustCarousel";

export function TrustReviews() {
  return (
    <section className="bg-gray-bg">
      <h2 className="mx-auto max-w-[1199px] px-[10px] pt-5 pb-[15px] text-center text-[26px] leading-[38px] font-bold text-black md:text-[44px] md:leading-[55px]">
        {trustHeading.lead}{" "}
        <span className="ml-[10px] text-[31px] font-medium text-purple-cta md:text-[52.8px]">{trustHeading.accent}</span>
        <br />
        {trustHeading.tail}
      </h2>
      <TrustCarousel />
    </section>
  );
}
