import { Api } from "./api";
import {
  GetBalanceRsp,
  GetTransactionRsp,
  GetWalletRsp,
} from "@/types/wallets";

export const getWalletBalance = () => {
  return Api.get<GetBalanceRsp>("/wallet/balance", true);
};

export const getWalletAddress = () => {
  return Api.get<GetWalletRsp>("/wallet", true);
};

export const getAllTransactions = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return Api.get<GetTransactionRsp>(
    `/wallet/transactions?limit=${limit}&page=${page}`,
    true,
  );
};
