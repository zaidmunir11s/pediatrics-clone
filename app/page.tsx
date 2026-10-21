import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Preorder } from "@/components/sections/Preorder";
import { TrustedStrip } from "@/components/sections/TrustedStrip";
import { StartHere } from "@/components/sections/StartHere";
import { Strategy } from "@/components/sections/Strategy";
import { TrustReviews } from "@/components/sections/TrustReviews";
import { AsSeenOn } from "@/components/sections/AsSeenOn";
import { WhoHelp } from "@/components/sections/WhoHelp";
import { Reviews } from "@/components/sections/Reviews";
import { WhyLove } from "@/components/sections/WhyLove";
import { QuizCta } from "@/components/sections/QuizCta";
import { Founder } from "@/components/sections/Founder";
import { Articles } from "@/components/sections/Articles";
import { Footer } from "@/components/sections/Footer";
import { FunnelRibbon } from "@/components/interactive/FunnelRibbon";
import { ScrollToTop } from "@/components/interactive/ScrollToTop";
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
        <TrustReviews />
        <AsSeenOn />
        <WhoHelp />
        <Reviews />
        <WhyLove />
        <QuizCta />
        <Founder />
        <Articles />
      </main>
      <Footer />
      <FunnelRibbon />
      <ScrollToTop />
      <GetStartedModal />
    </div>
  );
}
