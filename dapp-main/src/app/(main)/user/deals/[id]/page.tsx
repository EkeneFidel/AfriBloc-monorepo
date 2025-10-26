import BackButton from "@/components/main/user/back-button";
import BedroomSlider from "@/components/main/user/deals/bedroom-slider";
import DealDetail from "@/components/main/user/deals/detail/deal-detail";
import InvestAction from "@/components/main/user/deals/detail/invest-action";
import KycStatInfo from "@/components/ui/info/kyc-stat-info";
import { Metadata } from "next";
import EmptyState from "@/components/ui/empty-state";
import { getPropertyById } from "@/services/apis/properties.api";
import { getWalletBalance } from "@/services/apis/wallets.api";

export const metadata: Metadata = {
  title: "Deal details",
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const rsp = await getPropertyById(id);
  const balRsp = await getWalletBalance();
  const balance = balRsp?.ok ? balRsp?.body?.data?.balance?.ngn : 0;

  if (!rsp?.ok) {
    return (
      <EmptyState
        title="Error"
        description={rsp?.body?.message}
        className="min-h-[400px] w-full"
      />
    );
  }

  const { title, imageUrls } = rsp?.body?.data;

  return (
    <main className="text-Gray-900">
      <section className="col-start container gap-5 py-8 md:py-12">
        <BackButton />
        <KycStatInfo />
        <h1 className="text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
          {title}
        </h1>
        <BedroomSlider images={imageUrls} />
        <div className="grid w-full gap-6 lg:grid-cols-2">
          <DealDetail property={rsp?.body?.data} />
          <div className="sticky top-24 z-50 self-start">
            <InvestAction balance={balance} propertyId={id} />
          </div>
        </div>
      </section>
    </main>
  );
}
