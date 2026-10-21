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
          <span className="absolute top-1/2 left-1/2 flex h-[52px] w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:h-16 md:w-24 bg-[#e53935] transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="white" aria-hidden="true" className="ml-1 size-7">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
