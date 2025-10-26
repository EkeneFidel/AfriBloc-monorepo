import { ApiResponse } from "./auth";

export type BalanceTypes = {
  balance: {
    hbar: string;
    usd: number;
    ngn: number;
  };
};
export type GetBalanceRsp = ApiResponse & { data: BalanceTypes };

export type WalletTypes = {
  id: string;
  walletAddress: string;
  evmAddress: string;
  isActive: boolean;
  walletType: string;
  networkType: string;
  asset: string;
  currency: string;
  vaultId: string;
  balance: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};
export type GetWalletRsp = ApiResponse & { data: WalletTypes };

export type TransactionTypes = {
  id: string;
  userId: string;
  walletType: string;
  transactionType: string;
  status: string;
  amount: string;
  fees: string;
  currency: string;
  reference: string;
  fireblockTransactionId: string;
  description: string;
  hash: string;
  address: string;
  network: string;
  spotPrice: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTransactionRsp = ApiResponse & {
  data: {
    currentPage: string;
    pageSize: string;
    totalCount: number;
    totalPages: number;
    transactions: TransactionTypes[];
  };
};
