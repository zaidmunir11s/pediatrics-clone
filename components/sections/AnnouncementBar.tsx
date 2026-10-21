import { announcement } from "@/content/home";

// Fixed 2027 preorder bar. On mobile the text wraps and the button flows inline after it.
export function AnnouncementBar() {
  return (
    <div
      data-testid="announcement-bar"
      className="fixed inset-x-0 top-0 z-[99990] bg-[linear-gradient(90deg,#4c1d95,#6d28d9)] px-4 py-[11px] text-center text-white max-md:min-h-[88px] max-md:leading-[24px] md:flex md:h-[63px] md:items-center md:justify-center md:gap-[14px]"
    >
      <span className="text-[15px] font-extrabold tracking-[0.2px] whitespace-pre-wrap md:text-[17px] md:leading-[24px]">
        {announcement.text}
      </span>{" "}
      <a
        href={announcement.cta.href}
        className="inline-block rounded-full bg-amber px-[14px] py-[6px] text-[17px] leading-[27.2px] font-extrabold whitespace-nowrap text-ink-900 md:px-5 md:py-[7px]"
      >
        {announcement.cta.label}
      </a>
    </div>
  );
}
