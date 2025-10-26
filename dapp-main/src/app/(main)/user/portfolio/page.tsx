import CurrencySwitcher from "@/components/main/user/deals/actions/currencySwitcher";
import MyPortfolios from "@/components/main/user/portfolio/my-portfolios";
import PortfolioStats from "@/components/main/user/portfolio/portfolioStats";
import EmptyState from "@/components/ui/empty-state";
import KycStatInfo from "@/components/ui/info/kyc-stat-info";
import { PaginationProvider } from "@/contexts/paginateContext";
import { getPortofolio } from "@/services/apis/properties.api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const rsp = await getPortofolio({ page: Number(page) || 1 });

  if (!rsp?.ok) {
    return (
      <EmptyState
        title="Error"
        description={rsp?.body?.message}
        className="min-h-[400px] w-full"
      />
    );
  }

  const { items, currentPage, totalCount, totalPages, totals } =
    rsp?.body?.data;

  const portfolioData = {
    pageSize: Number(currentPage),
    totalCount,
    totalPages,
    assets: items,
  };

  return (
    <main className="text-Gray-900 bg-white">
      <section className="col-start container gap-5 py-14">
        <div className="flex-between w-full">
          <h1 className="text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
            Portfolio
          </h1>
          <CurrencySwitcher />
        </div>
        <KycStatInfo />
        <div className="grid w-full grid-cols-1 items-start justify-start gap-5 lg:grid-cols-3">
          <PortfolioStats statsData={totals} />
        </div>
        <PaginationProvider data={portfolioData}>
          <MyPortfolios />
        </PaginationProvider>
      </section>
    </main>
  );
}
