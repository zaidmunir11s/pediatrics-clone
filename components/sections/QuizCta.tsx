import Image from "next/image";
import { quiz } from "@/content/home";
import { Button } from "@/components/ui/Button";

export function QuizCta() {
  return (
    <section data-testid="quiz-cta" className="overflow-hidden bg-navy">
      <div className="mx-auto grid max-w-[1310px] px-[10px] pt-[46px] md:grid-cols-[619fr_619fr] md:gap-8 md:px-5 md:pt-0 lg:h-[454px]">
        <div className="max-md:px-[15px] md:pt-[86px]">
          <h2 className="text-[34px] leading-[44px] font-normal text-white md:text-[51px] md:leading-[64px]">
            <span className="text-lavender">{quiz.accent}</span>
            {quiz.rest}
            <br />
            {quiz.line2}
          </h2>
          <p className="mt-2 text-[20px] leading-[32px] font-semibold text-white">{quiz.sub}</p>
          <Button href={quiz.cta.href} chevron className="mt-[50px] h-[50px] md:mt-[72px]">
            {quiz.cta.label}
          </Button>
        </div>
        <Image
          src={quiz.image.src}
          alt={quiz.image.alt}
          width={619}
          height={439}
          sizes="(max-width: 767px) 100vw, 619px"
          className="mt-10 h-auto w-full self-end md:mt-[15px]"
        />
      </div>
    </section>
  );
}
