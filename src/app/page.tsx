import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturesSection from "@/components/sections/FeaturesSection";
{
  /* import Features2Section from "@/components/sections/Features2Section"; */
}
import SpacerSection from "@/components/sections/SpacerSection";
import MarketPlaceSection from "@/components/sections/MarketPlaceSection";
import MarketPlaceSection2 from "@/components/sections/MarketPlace2Section";
import CollectionsSection from "@/components/sections/CollectionsSection";
import Collections3Section from "@/components/sections/Collections3Section";
import Collections2Section from "@/components/sections/Collections2Section";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroCarousel />
      <FeaturesSection />
      <SpacerSection />
      <CollectionsSection />
      <SpacerSection />
      <Collections3Section />
      <SpacerSection />
      {/*<Collections2Section />
      <SpacerSection />*/}
      <MarketPlaceSection />
      <MarketPlaceSection2 />
    </main>
  );
}
