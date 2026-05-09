import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturesSection from "@/components/sections/FeaturesSection";
import SpacerSection from "@/components/sections/SpacerSection";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroCarousel />
      <SpacerSection />
      <FeaturesSection />
    </main>
  );
}