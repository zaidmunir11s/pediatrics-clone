import { AnnouncementBar } from "@/components/sections/AnnouncementBar";
import { Header } from "@/components/sections/Header";
import { GetStartedModal } from "@/components/interactive/GetStartedModal";

export default function Home() {
  return (
    // 50px top padding matches the reference; the fixed bar overlaps the header slightly.
    <div className="pt-[50px]">
      <AnnouncementBar />
      <Header />
      <main />
      <GetStartedModal />
    </div>
  );
}
