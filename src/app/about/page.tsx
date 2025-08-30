
import IntrodutionSection from "@/components/Abouts/IntrodutionSection";
import MemorySection from "@/components/Abouts/MemorySection";
import MainSection from "@/components/Abouts/MainSection";
import BannerAboutSection from "@/components/Abouts/BannerAboutSection";



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