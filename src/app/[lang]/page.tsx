import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { ProductTour } from "@/components/home/product-tour";
import { Outcomes } from "@/components/home/outcomes";
import { BookingJourney } from "@/components/home/booking-journey";
import { Modules } from "@/components/home/modules";
import { AiSpotlight } from "@/components/home/ai-spotlight";
import { Finance } from "@/components/home/finance";
import { Region } from "@/components/home/region";
import { Roles } from "@/components/home/roles";
import { Compare } from "@/components/home/compare";
import { HomeFaq } from "@/components/home/home-faq";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Cta } from "@/components/home/cta";

/* Dark and light sections alternate: hero, tour, journey, AI, region. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <ProductTour />
      <Outcomes />
      <BookingJourney />
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
