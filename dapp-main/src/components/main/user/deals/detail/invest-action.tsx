"use client";
import WalletIcon from "/public/svgs/wallet.svg";
import Image from "next/image";
import BaseButton from "@/components/ui/buttons/base-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MarketPrice, QtyInput } from "../deal-card";
import { orderPropertyAction } from "@/lib/actions/properties.actions";
import useFundWallet from "../../wallet/hooks/use-fund-wallet";
import { handleError, handleSuccess } from "@/lib/helpers";
import { useTransition } from "react";

export default function InvestAction({
  propertyId,
  balance,
}: {
  propertyId: string;
  balance: number;
}) {
  const [isPending, startTransition] = useTransition();
  const { value } = useFundWallet();

  const handleOrder = () => {
    const payload = {
      propertyId,
      units: Number(value?.qty),
    };

    startTransition(async () => {
      const rsp = await orderPropertyAction(payload);
      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
      }
    });
  };

  return (
    <div className="col-start w-full gap-6">
      <div className="w-full rounded-lg p-3 text-start shadow-[0px_4px_20px_0px_#0000000D] outline-none md:p-5">
        <h3 className="text-lg font-bold md:text-2xl">
          Invest in this property
        </h3>
        <div className="col-start mt-5 w-full gap-1">
          <label htmlFor="unit" className="text-sm font-normal">
            Select unit to buy
          </label>
          <QtyInput />
        </div>
        <div className="col-start mt-5 w-full gap-1">
          <label htmlFor="payment-method" className="text-base font-semibold">
            Payment method
          </label>
          <RadioGroup defaultValue="wallet" className="!w-full">
            <div className="border-BlueGray-100 flex-between h-10 w-full rounded-lg border px-4 md:h-14">
              <div className="flex-start gap-2">
                <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                  <Image src={WalletIcon} alt="wallet icon" />
                </div>
                <label
                  htmlFor="wallet"
                  className="text-Gray-900 text-sm font-normal"
                >
                  Wallet
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-Gray-600 text-xs font-normal">
                  Balance:
                  <MarketPrice
                    price={balance}
                    className="text-Gray-900 text-sm"
                  />
                </span>
                <RadioGroupItem value="wallet" id="wallet" className="" />
              </div>
            </div>
          </RadioGroup>
        </div>
        <BaseButton
          className="mt-5 w-full !py-4"
          onClick={handleOrder}
          isSubmitting={isPending}
          disabled={balance === 0}
        >
          Make Payment
        </BaseButton>
      </div>
    </div>
  );
}
