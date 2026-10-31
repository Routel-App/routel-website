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
import { Cta } from "@/components/home/cta";
import { PlatformOverview } from "@/components/home/platform-overview";
import { WaysToWork } from "@/components/home/ways-to-work";

/* Light hero and the services, then what ROUTEL is, the scroll story and the assistant; the comparison comes once the system is explained. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesStrip />
      <PlatformOverview />
      <Odyssey />
      <AiSpotlight />
      <ChaosToOrder />
      <SheetToSystem />
      <ProductTour />
      <FeatureBento />
      <Modules />
      <WaysToWork />
      <Finance />
      <Region />
      <Versus withPrices={false} />
      <HomeFaq />
      <Cta />
    </>
  );
}
