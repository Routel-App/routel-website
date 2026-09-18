import { Hero } from "@/components/home/hero";
import { ProofStrip } from "@/components/home/proof-strip";
import { Outcomes } from "@/components/home/outcomes";
import { Modules } from "@/components/home/modules";
import { AiSpotlight } from "@/components/home/ai-spotlight";
import { Finance } from "@/components/home/finance";
import { Workflow } from "@/components/home/workflow";
import { Roles } from "@/components/home/roles";
import { Testimonials } from "@/components/home/testimonials";
import { PricingPreview } from "@/components/home/pricing-preview";
import { Cta } from "@/components/home/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Outcomes />
      <Modules />
      <AiSpotlight />
      <Finance />
      <Workflow />
      <Roles />
      <Testimonials />
      <PricingPreview />
      <Cta />
    </>
  );
}
