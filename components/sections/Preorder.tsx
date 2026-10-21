import Image from "next/image";
import { preorder } from "@/content/home";

export function Preorder() {
  return (
    <section
      id="preorder-2027"
      className="scroll-mt-[90px] bg-[linear-gradient(#f3eeff_0px,#fff_100%)] px-5 pt-[46px] pb-[58px] text-center"
    >
      <span className="relative inline-block pb-[14px] text-[22px] leading-[35.2px] font-extrabold tracking-[1px] text-purple-deep uppercase after:absolute after:bottom-0 after:left-1/2 after:h-[3px] after:w-[187px] after:-translate-x-1/2 after:rounded-full after:bg-amber max-md:text-[18px]">
        {preorder.kicker}
      </span>

      <h2 className="mt-[60px] text-[30px] leading-[1.2] font-extrabold text-ink-900 max-md:mt-10 md:text-[40px] md:leading-[45.6px]">
        {preorder.title}
        <span className="text-purple-cta">{preorder.titleAccent}</span>
      </h2>

      <p className="mt-5 inline-block rounded-full border-[1.5px] border-cream-border bg-cream-pill px-6 py-[11px] text-[19px] leading-[30.4px] font-extrabold text-ink-800">
        {preorder.pillLead}
        <span className="text-[#b45309]">{preorder.pillAccent}</span>
      </p>

      <div className="mx-auto mt-[30px] grid max-w-[1080px] gap-[26px] md:grid-cols-2">
        {preorder.cards.map((card) => (
          <article
            key={card.title}
            data-testid="preorder-card"
            className="flex flex-col items-center rounded-[18px] border border-card-border bg-white px-6 pt-7 pb-[26px] shadow-[0_10px_30px_0_rgba(76,29,149,0.08)]"
          >
            <h3 className="text-[27px] leading-[40.5px] font-extrabold text-purple-deep">{card.title}</h3>
            <p className="mt-2 text-base leading-[25.6px] text-ink-800">
              {preorder.releaseLabel}
              <b className="font-bold text-purple-deep">{preorder.releaseDate}</b>
            </p>
            <Image
              src={card.image.src}
              alt={card.image.alt}
              width={card.image.width}
              height={card.image.height}
              className="mt-[31px] h-[188px] w-[340px] max-w-full object-contain"
            />
            <a
              href={card.href}
              className="mt-[22px] inline-flex h-[57px] items-center rounded-full bg-purple-deep px-9 text-lg leading-[28.8px] font-extrabold text-white transition-colors hover:bg-violet-dark"
            >
              {preorder.cta}
            </a>
            <p className="mt-5 flex items-center gap-2 text-[15px] leading-[24px] font-bold text-ink-800">
              <span aria-hidden="true" className="text-[17px] font-black text-cream-border">
                ✔
              </span>
              {card.guarantee}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
