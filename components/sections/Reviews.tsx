import { reviews } from "@/content/home";
import { ReviewsCarousel } from "@/components/interactive/ReviewsCarousel";

export function Reviews() {
  return (
    <section data-testid="reviews" className="bg-lavender">
      <div className="mx-auto max-w-[1310px] px-[10px] pt-[31px] pb-[100px] md:px-5 md:pt-[60px] md:pb-[121px]">
        <h2 className="text-center text-[22px] leading-[32px] font-bold text-navy md:text-[44px] md:leading-[55px]">
          {reviews.title}
        </h2>
        <ReviewsCarousel />
      </div>
    </section>
  );
}
