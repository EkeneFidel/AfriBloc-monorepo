import { Suspense } from "react";
import RenderDeals from "../../user/deals/render-deals";
import { DealSkeleton } from "../../user/deals/dealSkeleton";
import FeaturedHeader from "./featuredHeader";

export default function FeaturedDeals() {
  return (
    <section id="deals" className="text-Gray-900 py-16">
      <div className="col-center container gap-8 lg:gap-18">
        <FeaturedHeader />
        <Suspense fallback={<DealSkeleton num={3} />}>
          <RenderDeals />
        </Suspense>
      </div>
    </section>
  );
}
