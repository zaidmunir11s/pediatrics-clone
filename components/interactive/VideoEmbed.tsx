"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { thumb: string; embed: string; className?: string };

// Click-to-load YouTube player, matching the reference's .click-video behaviour.
export function VideoEmbed({ thumb, embed, className = "" }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className={`relative aspect-[635/357] overflow-hidden ${className}`}>
      {playing ? (
        <iframe
          src={embed}
          title="Embedded video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" aria-label="Play video" onClick={() => setPlaying(true)} className="group absolute inset-0 size-full">
          <Image src={thumb} alt="Video thumbnail" fill sizes="(max-width: 767px) 100vw, 635px" className="object-cover" />
          {/* Reference .click-video__play: red pill with a CSS border triangle; scales up on hover. */}
          <span
            data-testid="play-pill"
            className="absolute top-1/2 left-1/2 flex h-[52px] w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#e53935] shadow-[0_4px_12px_rgba(0,0,0,0.35)] transition-[scale,background-color,box-shadow] duration-150 before:ml-[3px] before:block before:border-y-[10px] before:border-l-[18px] before:border-y-transparent before:border-l-white before:content-[''] hover:scale-[1.04] hover:bg-[#c62828] hover:shadow-[0_6px_16px_rgba(0,0,0,0.45)] md:h-16 md:w-24 md:before:border-y-[12px] md:before:border-l-[22px]"
          />
        </button>
      )}
    </div>
  );
}
