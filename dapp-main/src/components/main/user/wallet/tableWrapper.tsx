"use client";

import EmptyState from "@/components/ui/empty-state";
import TableLoading from "@/components/ui/skeleton/tableLoading";
import TableComponent, {
  Column,
} from "@/components/ui/tableComponent/TableComponent";
import TablePagination from "@/components/ui/tableComponent/TablePagination";
import { usePaginationContext } from "@/contexts/paginateContext";
import { formatDate, getStatusColors } from "@/lib/helpers";
import { TransactionTypes } from "@/types/wallets";

export const columns: Column<TransactionTypes>[] = [
  {
    title: "Reference",
    key: "reference",
    render: (_, record) => <>{record?.reference}</>,
  },
  {
    title: "Wallet",
    key: "walletType",
    render: (_, record) => (
      <>
        {record?.walletType} - {record?.network}
      </>
    ),
  },

  {
    title: "Type",
    key: "transactionType",
    render: (_, record) => <>{record?.transactionType}</>,
  },

  {
    title: "Amount",
    key: "amount",
    render: (_, record) => (
      <>
        {record?.currency} {Number(record?.amount)?.toFixed(4)}
      </>
    ),
  },

  {
    title: "Spot Price",
    key: "spotPrice",
    render: (_, record) => <>{record?.spotPrice}</>,
  },
  {
    title: "Address",
    key: "address",
    render: (_, record) => <>{record?.address}</>,
  },

  {
    title: "Date",
    key: "createdAt",
    render: (_, record) => <> {formatDate(record?.createdAt)} </>,
  },
  {
    title: "Status",
    key: "status",
    render: (_, record) => (
      <span className={getStatusColors(record?.status)}>{record?.status}</span>
    ),
  },
];

const TableWrapper = () => {
  const { data, isPending } = usePaginationContext();

  if (data?.assets?.length === 0) {
    return (
      <EmptyState
        title="No transactions yet"
        description="All transactions will appear here"
        className="min-h-[400px] w-full"
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableLoading />
      ) : (
        <TableComponent
          title="All Transactions"
          columns={columns}
          data={data?.assets as TransactionTypes[]}
        />
      )}
      <TablePagination />
    </>
  );
};

export default TableWrapper;
