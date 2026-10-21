"use client";

import Image from "next/image";
import { useState } from "react";
import { reviews } from "@/content/home";

function Star() {
  return (
    <svg viewBox="2 2.2 20 19" fill="currentColor" aria-hidden="true" className="size-[19px]">
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
    </svg>
  );
}

function Arrow({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
      onClick={onClick}
      className={`absolute top-[379px] z-10 flex h-12 w-8 items-center justify-center rounded-[3px] border-2 border-transparent bg-black/80 text-white opacity-0 transition-opacity group-hover:opacity-75 [@media(hover:none)]:opacity-75 hover:opacity-100 focus-visible:opacity-100 max-md:top-[308px] ${
        dir === "prev" ? "left-0" : "right-0"
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="size-4">
        <polyline points={dir === "prev" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

// One centred testimonial at a time; arrows loop. No autoplay (none observed on the reference).
export function ReviewsCarousel() {
  const count = reviews.slides.length;
  const [index, setIndex] = useState(reviews.startIndex);
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  return (
    <div className="group relative mt-[31px] md:mt-[42px]">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {reviews.slides.map((slide, i) => (
            <div
              key={slide.name}
              aria-hidden={i !== index}
              inert={i !== index}
              className="flex w-full shrink-0 justify-center px-[71px] md:px-10"
            >
              <figure className="w-full max-w-[460px] text-center">
                <Image
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  width={460}
                  height={345}
                  sizes="(max-width: 767px) 80vw, 460px"
                  className="aspect-[4/3] w-full rounded-[20px] object-cover"
                />
                <h3 className="mt-[15px] text-[22px] leading-[33px] font-bold text-navy md:text-[48px] md:leading-[72px]">
                  {slide.title}
                </h3>
                <div className="mt-3 flex justify-center text-purple-cta md:mt-6" aria-label="5 out of 5 stars" role="img">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star key={s} />
                  ))}
                </div>
                <blockquote className="mt-[10px] text-[15px] leading-[24px] text-black md:text-base md:leading-[25.6px]">{slide.quote}</blockquote>
                <figcaption className="mt-[10px]">
                  <div className="text-base leading-[25.6px] font-bold text-black md:text-lg md:leading-[28.8px]">{slide.name}</div>
                  <div className="text-base leading-[25.6px] font-bold text-black md:text-[17px] md:leading-[27.2px]">{reviews.occupation}</div>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
      <Arrow dir="prev" onClick={() => go(-1)} />
      <Arrow dir="next" onClick={() => go(1)} />
    </div>
  );
}
