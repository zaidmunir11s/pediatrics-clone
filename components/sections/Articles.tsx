import Image from "next/image";
import { articles } from "@/content/home";
import { VideoEmbed } from "@/components/interactive/VideoEmbed";

function Featured() {
  const f = articles.featured;
  return (
    <article
      data-testid="featured-article"
      className="relative mt-[30px] grid rounded-[60px] bg-cream-feature max-md:overflow-hidden max-md:rounded-[30px] md:h-[562px] md:grid-cols-[635px_1fr] md:gap-10"
    >
      <div className="relative md:pt-[90px]">
        <VideoEmbed thumb={f.video.thumb} embed={f.video.embed} className="rounded-[16px] max-md:rounded-b-none" />
        <span className="absolute bottom-[-20px] left-[50px] rounded-[8px] bg-cyan-tag px-3 py-2 text-[15px] leading-[24px] font-semibold text-black uppercase max-md:bottom-auto max-md:top-[calc(100%-56px)] md:top-[492px] md:bottom-auto">
          {f.tag}
        </span>
      </div>
      <div className="px-5 pt-14 pb-8 md:px-0 md:pt-[43px] md:pr-10 md:pb-0">
        <h3 className="text-[24px] leading-[38px] font-bold text-black md:text-[28px] md:leading-[44.8px]">
          <a href={f.href} className="hover:text-purple-cta">
            {f.title}
          </a>
        </h3>
        <p className="mt-[35px] text-[17px] leading-[27.2px] text-ink-700">{f.excerpt}</p>
        <a
          href={f.category.href}
          className="mt-[31px] inline-block rounded-[4px] bg-chip-yellow px-1 py-1 text-[11.9px] leading-[14.28px] font-medium text-black uppercase"
        >
          {f.category.label}
        </a>
        <div className="mt-[27px] flex items-center">
          <Image src={f.author.avatar} alt={f.author.name} width={48} height={48} className="size-12" />
          <div className="text-[13.6px] leading-[21.76px] text-ink-700">
            <div>{f.author.name}</div>
            <time dateTime={f.author.iso}>{f.author.date}</time>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Articles() {
  return (
    <section className="mx-auto max-w-[1310px] px-[10px] pt-[46px] pb-[50px] md:px-5 md:pt-20 md:pb-[90px]">
      <h2 className="text-[30px] leading-[40px] font-medium text-black md:text-[44px] md:leading-[55px]">
        {articles.titleLead}
        <strong className="font-bold text-purple-cta">{articles.titleAccent}</strong>
      </h2>
      <Featured />
      <div className="mt-14 grid gap-y-[25px] md:grid-cols-2 md:gap-x-[50px] lg:grid-cols-3">
        {articles.items.map((item, i) => (
          <article
            key={item.href}
            data-testid="article-card"
            className={`relative ${i % 3 !== 0 ? "lg:before:absolute lg:before:top-0 lg:before:-left-[25px] lg:before:h-full lg:before:w-px lg:before:bg-[#ececec]" : ""}`}
          >
            <a href={item.href} tabIndex={-1} aria-hidden="true" className="block">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={390}
                height={260}
                sizes="(max-width: 767px) 100vw, 390px"
                className="aspect-[3/2] w-full object-cover"
              />
            </a>
            <h3 className="mt-px text-base leading-[25.6px] font-bold text-black">
              <a href={item.href} className="hover:text-purple-cta">
                {item.title}
              </a>
            </h3>
            <p className="mt-[34px] text-[13px] leading-[20.8px] text-ink-700">{item.excerpt}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
