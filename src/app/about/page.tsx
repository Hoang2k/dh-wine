
import IntrodutionSection from "@/components/Abouts/IntrodutionSection";
import MemorySection from "@/components/Abouts/MemorySection";
import MainSection from "@/components/Abouts/MainSection";
import BannerAboutSection from "@/components/Abouts/BannerAboutSection";

// Enable ISR - revalidate every 3600 seconds (1 hour)
export const revalidate = 3600;

export default function About() {
  return (
    <div>
      <BannerAboutSection />
      <IntrodutionSection />
      <MainSection />
      <MemorySection />
    </div>
  );
}