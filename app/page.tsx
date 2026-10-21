import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Preorder } from "@/components/sections/Preorder";
import { TrustedStrip } from "@/components/sections/TrustedStrip";
import { StartHere } from "@/components/sections/StartHere";
import { Strategy } from "@/components/sections/Strategy";
import { GetStartedModal } from "@/components/interactive/GetStartedModal";

export default function Home() {
  return (
    // 50px top padding matches the reference; the fixed bar overlaps the header slightly.
    <div className="pt-[50px]">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Preorder />
        <TrustedStrip />
        <StartHere />
        <Strategy />
      </main>
      <GetStartedModal />
    </div>
  );
}
