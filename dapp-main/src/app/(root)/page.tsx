import EarnSimplified from "@/components/main/landing/earn-simplified";
import Faq from "@/components/main/landing/faq";
import FeaturedDeals from "@/components/main/landing/featureDeals/featured-deals";
import GetStarted from "@/components/main/landing/get-started";
import Hero from "@/components/main/landing/hero";
import HowItWorks from "@/components/main/landing/how-it-works";
import Why from "@/components/main/landing/why";

export default function page() {
  return (
    <main>
      <Hero />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <Why />
      <FeaturedDeals />
      <EarnSimplified />
      <Faq />
      <GetStarted />
    </main>
  );
}
