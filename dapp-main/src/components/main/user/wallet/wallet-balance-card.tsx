import FundWalletModal from "./modals/fund-wallet-modal";
import WithdrawModal from "./modals/withdraw-modal";
import { MarketPrice } from "../deals/deal-card";
import KycStatInfo from "@/components/ui/info/kyc-stat-info";
import {
  getWalletAddress,
  getWalletBalance,
} from "@/services/apis/wallets.api";
import EmptyState from "@/components/ui/empty-state";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserData } from "@/types/auth";

export default async function WalletBalanceCard() {
  const rsp = await getCurrentUserApi();

  const user = rsp?.ok ? rsp?.body?.user : ({} as UserData);
  const balancersp = await getWalletBalance();
  const walletRsp = await getWalletAddress();

  if (!balancersp?.ok || !walletRsp?.ok) {
    return (
      <EmptyState
        title="Error"
        description={balancersp?.body?.message || walletRsp?.body?.message}
        className="flex min-h-24 w-full flex-col gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[0px_4px_20px_0px_#0000000D]"
      />
    );
  }

  const isNotVerified =
    user?.kycStatus?.toLowerCase() !== "verified" ||
    user?.kycStatus?.toLowerCase() !== "approved";

  const { balance } = balancersp?.body?.data;

  return (
    <>
      <KycStatInfo subtext="Complete your KYC to activate and fund your wallet" />
      <div className="flex min-h-24 w-full flex-col gap-3 rounded-xl bg-white px-4 py-3.5 shadow-[0px_4px_20px_0px_#0000000D] md:flex-row md:items-center md:justify-between">
        <div className="col-start">
          <h3 className="text-Gray-700 text-sm font-normal">
            Total Wallet Balance
          </h3>
          <MarketPrice
            price={balance?.ngn}
            className="text-Gray-900 text-lg font-bold md:text-2xl"
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3 md:w-fit md:flex-row">
          <WithdrawModal isVerified={isNotVerified} />
          <FundWalletModal
            isVerified={isNotVerified}
            evmAddress={walletRsp?.body?.data?.evmAddress}
            walletAddress={walletRsp?.body?.data?.walletAddress}
          />
        </div>
      </div>
    </>
  );
}
