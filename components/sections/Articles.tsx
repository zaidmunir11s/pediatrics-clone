import Image from "next/image";
import { articles } from "@/content/home";
import { VideoEmbed } from "@/components/interactive/VideoEmbed";

function Featured() {
  const f = articles.featured;
  return (
    <article
      data-testid="featured-article"
      className="relative mt-5 grid rounded-[30px] bg-cream-feature lg:mt-[30px] lg:h-[562px] lg:grid-cols-[635px_1fr] lg:gap-10 lg:rounded-[60px]"
    >
      <div className="relative pt-4 lg:pt-[90px]">
        <VideoEmbed thumb={f.video.thumb} embed={f.video.embed} className="rounded-[14px] md:rounded-[16px]" />
        <span className="absolute top-[197px] left-[50px] rounded-[8px] bg-cyan-tag px-[10px] py-[5px] text-[12px] leading-[19.2px] font-semibold text-black uppercase lg:top-[492px] lg:px-3 lg:py-2 lg:text-[15px] lg:leading-[24px]">
          {f.tag}
        </span>
      </div>
      <div className="px-[15px] pt-[51px] pb-7 lg:px-0 lg:pt-[43px] lg:pr-10 lg:pb-0">
        <h3 className="text-[28px] leading-[44.8px] font-bold text-black">
          <a href={f.href} className="hover:text-purple-cta">
            {f.title}
          </a>
        </h3>
        <p className="mt-[34px] text-[17px] leading-[27.2px] text-ink-700 lg:mt-[31px]">{f.excerpt}</p>
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
    <section className="mx-auto max-w-[1310px] px-[10px] pt-10 pb-[100px] md:px-5 md:pt-20">
      <h2 className="text-[24px] leading-[34px] font-medium text-black md:text-[44px] md:leading-[55px]">
        {articles.titleLead}
        <strong className="font-bold text-purple-cta">{articles.titleAccent}</strong>
      </h2>
      <Featured />
      <div className="mt-[72px] grid gap-y-[25px] md:mt-14 md:grid-cols-2 md:gap-x-[50px] lg:grid-cols-3">
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
            <h3 className="text-base leading-[24px] font-bold text-black">
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
