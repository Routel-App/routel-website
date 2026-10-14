import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { ProductTour } from "@/components/home/product-tour";
import { Odyssey } from "@/components/home/odyssey";
import { ChaosToOrder } from "@/components/home/chaos-to-order";
import { SheetToSystem } from "@/components/home/sheet-to-system";
import { FeatureBento } from "@/components/home/feature-bento";
import { Modules } from "@/components/home/modules";
import { AiSpotlight } from "@/components/home/ai-spotlight";
import { Finance } from "@/components/home/finance";
import { Region } from "@/components/home/region";
import { Roles } from "@/components/home/roles";
import { Compare } from "@/components/home/compare";
import { HomeFaq } from "@/components/home/home-faq";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Cta } from "@/components/home/cta";

/* Dark and light sections alternate: hero, odyssey, bento, AI, region. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Odyssey />
      <ChaosToOrder />
      <SheetToSystem />
      <ProductTour />
      <FeatureBento />
      <Modules />
      <AiSpotlight />
      <Finance />
      <Region />
      <Roles />
      <Compare />
      <HomeFaq />
      <PricingPreview />
      <Cta />
    </>
  );
}
