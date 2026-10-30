import { Hero } from "@/components/home/hero";
import { ServicesStrip } from "@/components/home/services-strip";
import { ProductTour } from "@/components/home/product-tour";
import { Odyssey } from "@/components/home/odyssey";
import { ChaosToOrder } from "@/components/home/chaos-to-order";
import { SheetToSystem } from "@/components/home/sheet-to-system";
import { FeatureBento } from "@/components/home/feature-bento";
import { Modules } from "@/components/home/modules";
import { AiSpotlight } from "@/components/home/ai-spotlight";
import { Versus } from "@/components/home/versus";
import { Finance } from "@/components/home/finance";
import { Region } from "@/components/home/region";
import { HomeFaq } from "@/components/home/home-faq";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Cta } from "@/components/home/cta";

/* Light hero, then the services, the scroll story and the assistant. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <Odyssey />
      <AiSpotlight />
      <Versus />
      <ChaosToOrder />
      <SheetToSystem />
      <ProductTour />
      <FeatureBento />
      <Modules />
      <Finance />
      <Region />
      <HomeFaq />
      <PricingPreview />
      <Cta />
    </>
  );
}
