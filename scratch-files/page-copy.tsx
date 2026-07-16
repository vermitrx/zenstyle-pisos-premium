import HeroCarousel from "@/components/sections/HeroCarousel";
import FeaturesSection from "@/components/sections/FeaturesSection";
import CollectionsSection from "@/components/sections/CollectionsSection";

import MarketPlaceSection from "@/components/sections/MarketPlaceSection";

import SpacerSection from "@/components/sections/SpacerSection";

/*
import Features2Section from "@/components/sections/Features2Section";

import MarketPlaceSection from "@/components/sections/MarketPlaceSection";
import MarketPlaceSection2 from "@/components/sections/MarketPlace2Section";

import Collections3Section from "@/components/sections/Collections3Section";
import Collections2Section from "@/components/sections/Collections2Section"; */

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <HeroCarousel />
      <SpacerSection />
      <FeaturesSection />
      <SpacerSection />
      <CollectionsSection />
      <SpacerSection />
      <MarketPlaceSection />

      {/*
      <SpacerSection />
      <Collections3Section />
      <SpacerSection />
      <Collections2Section />
      <MarketPlaceSection /> 
      <MarketPlaceSection2 />
      <MarketPlace3Section />
*/}
    </main>
  );
}
