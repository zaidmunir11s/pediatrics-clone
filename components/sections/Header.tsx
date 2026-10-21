import Image from "next/image";
import { logo, nav, SITE } from "@/content/home";
import { CoursesMenu } from "@/components/interactive/CoursesMenu";
import { MobileMenu } from "@/components/interactive/MobileMenu";

// Not sticky: it scrolls with the page beneath the fixed announcement bar.
export function Header() {
  return (
    <header className="relative z-40 bg-white">
      {/* Desktop ≥1025px */}
      <div className="mx-auto hidden h-[94px] max-w-[1290px] items-center justify-between px-5 py-[10px] lg:flex">
        <a href={SITE} aria-label="Pediatrics Board Review home">
          <Image src={logo.src} alt={logo.alt} width={235} height={74} preload className="h-[74px] w-[235px]" />
        </a>
        <div className="flex items-center">
          <nav aria-label="Main">
            <ul className="flex items-center gap-[14px]">
              <CoursesMenu />
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-2 py-[9.6px] text-base leading-[25.6px] text-black transition-colors hover:text-purple-cta"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={nav.login.href}
            className="ml-[23px] flex h-[54px] items-center rounded-[50px] bg-lavender px-[25px] text-base font-medium text-black uppercase transition-colors duration-300 hover:bg-purple-cta hover:text-white"
          >
            {nav.login.label}
          </a>
          <button
            type="button"
            data-modal-open="get-started"
            className="ml-[15px] flex h-[54px] items-center rounded-[50px] bg-purple-cta px-[25px] text-base font-medium text-white uppercase transition-colors hover:bg-[#7f1aa6]"
          >
            {nav.getStarted}
          </button>
        </div>
      </div>

      {/* Tablet & mobile ≤1024px */}
      <div className="flex h-[81px] items-center justify-between px-6 py-[10px] lg:hidden">
        <a href={SITE} aria-label="Pediatrics Board Review home">
          <Image src={logo.src} alt={logo.alt} width={194} height={61} preload className="h-[61px] w-[194px]" />
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
