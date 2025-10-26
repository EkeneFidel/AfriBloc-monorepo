import EmptyState from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { getAllTransactions } from "@/services/apis/wallets.api";
import TableWrapper from "./tableWrapper";
import { PaginationProvider } from "@/contexts/paginateContext";

export default async function TransactionHistory() {
  const rsp = await getAllTransactions({});

  if (!rsp?.ok) {
    return (
      <section
        className={cn(
          "col-start text-Gray-900 w-full gap-1 rounded-xl bg-white p-5 shadow-[0px_4px_20px_0px_#0000000D]",
        )}
      >
        <EmptyState
          title="Error"
          description={rsp?.body?.message}
          className="min-h-[400px] w-full"
        />
      </section>
    );
  }

  const { transactions, currentPage, totalCount, totalPages } = rsp?.body?.data;

  const portfolioData = {
    pageSize: Number(currentPage),
    totalCount,
    totalPages,
    assets: transactions,
  };
  return (
    <section
      className={cn(
        "col-start text-Gray-900 w-full gap-1 rounded-xl bg-white p-5 shadow-[0px_4px_20px_0px_#0000000D]",
      )}
    >
      <h3 className="text-lg font-semibold">Transaction history</h3>

      <PaginationProvider data={portfolioData}>
        <TableWrapper />
      </PaginationProvider>
    </section>
  );
}
