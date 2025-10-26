"use client";
import BaseButton from "@/components/ui/buttons/base-button";
import EmptyState from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";

import { usePaginationContext } from "@/contexts/paginateContext";
import { PortfolioDealCard } from "../deals/deal-card";
import TablePagination from "@/components/ui/tableComponent/TablePagination";
import { PortfolioTypes } from "@/types/property";

export default function MyPortfolios() {
  const { data } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <div className="bg-white shadow-[0px_4px_20px_0px_#0000000D]">
        <EmptyState
          title="No investment yet"
          description="Take a look at our properties and start investing today!"
          className="min-h-[400px]"
          renderContent={
            <div className="w-full pt-8">
              <BaseButton href="/user/deals" className="px-10 py-4 md:px-20">
                Explore deals
              </BaseButton>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <section
      className={cn(
        "col-start text-Gray-900 w-full gap-1 rounded-xl bg-white p-5 shadow-[0px_4px_20px_0px_#0000000D]",
      )}
    >
      <h3 className="text-lg font-semibold">My Properties</h3>

      <ul className="text-Gray-900 mt-5 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {(data?.assets as PortfolioTypes[])?.map(({ property }) => (
          <PortfolioDealCard key={property.id} deal={property} />
        ))}
      </ul>
      <TablePagination />
    </section>
  );
}
