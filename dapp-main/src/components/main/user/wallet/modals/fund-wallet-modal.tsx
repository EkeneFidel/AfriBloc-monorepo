"use client";
import BaseButton from "@/components/ui/buttons/base-button";
import SubmitButton from "@/components/ui/buttons/submit-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import CardIcon from "/public/svgs/card.svg";
import BankIcon from "/public/svgs/bank.svg";
import CoinIcon from "/public/svgs/coin.svg";
import useFundWallet from "../hooks/use-fund-wallet";
import CopyToClipboardBtn from "@/components/ui/copyToClipboardBtn";
import { useCurrencyContext } from "@/contexts/currencyProvider";

export default function FundWalletModal({
  isVerified,
  evmAddress,
  walletAddress,
}: {
  isVerified: boolean;
  evmAddress: string;
  walletAddress: string;
}) {
  const {
    watch,
    isModalOpen,
    setIsModalOpen,
    decrease,
    increase,
    onSubmit,
    value,
    handleValueChange,
    convertAmount,
  } = useFundWallet();
  const { currency } = useCurrencyContext();

  const paymentMethod = watch("paymentMethod");

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <BaseButton
          type="button"
          className="w-full px-6 !text-base lg:w-fit lg:px-10"
          disabled={!isVerified}
        >
          Fund wallet
        </BaseButton>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[98vh] !max-w-lg overflow-x-hidden overflow-y-auto"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="!text-center text-base font-semibold">
            Fund Wallet
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="col-start w-full gap-6">
          <div className="col-start w-full gap-1">
            <label htmlFor="amount" className="text-sm font-normal">
              Enter amount to fund wallet
            </label>
            <div className="border-Gray-25 flex h-9 w-full items-center overflow-hidden rounded-lg border md:h-14">
              <button
                type="button"
                className="bg-Gray-25 flex-center size-9 border md:size-14"
                onClick={() => decrease("amount")}
                disabled={value["amount"] === "0"}
              >
                <Minus className="size-5" />
              </button>
              <div className="flex flex-1 items-center justify-center gap-1 text-base">
                <span className="text-Heading w-3/6 text-end text-lg font-semibold md:text-xl">
                  HBAR
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="100"
                  className="focus text-Heading flex w-3/6 bg-transparent text-lg font-semibold focus:border-0 focus:outline-0 md:text-xl"
                  value={value?.amount}
                  onChange={(e) => handleValueChange("amount", e.target.value)}
                />
              </div>

              <button
                type="button"
                className="bg-Gray-25 flex-center size-9 border md:size-14"
                onClick={() => increase("amount")}
              >
                <Plus className="size-5" />
              </button>
            </div>
            <p>
              {currency}
              {Number(convertAmount)?.toFixed(2)}
            </p>
          </div>
          <div className="col-start w-full gap-1">
            <label htmlFor="payment-method" className="text-sm font-normal">
              Select payment method
            </label>
            <RadioGroup
              className="!w-full"
              value={paymentMethod}
              // onValueChange={(value) => setValue("paymentMethod", value)}
            >
              <article className="border-BlueGray-100 w-full space-y-5 rounded-lg border px-4 py-2">
                <div className="flex-between w-full">
                  <div className="flex-start gap-2">
                    <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                      <Image src={BankIcon} alt="bank icon" />
                    </div>
                    <label
                      htmlFor="bank"
                      className="text-Gray-800 col-start text-sm font-normal"
                    >
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                  <span className="bg-Blue-25 text-Blue-600 rounded-full px-2 py-1 text-xs font-normal">
                    Coming soon
                  </span>
                </div>
              </article>
              <article className="border-BlueGray-100 w-full space-y-5 rounded-lg border px-4 py-2">
                <div className="flex-between w-full">
                  <div className="flex-start gap-2">
                    <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                      <Image src={CardIcon} alt="bank icon" />
                    </div>
                    <label
                      htmlFor="bank"
                      className="text-Gray-800 col-start text-sm font-normal"
                    >
                      <span>Debit / Credit Card</span>
                    </label>
                  </div>
                  <span className="bg-Blue-25 text-Blue-600 rounded-full px-2 py-1 text-xs font-normal">
                    Coming soon
                  </span>
                </div>
              </article>
              <article className="border-BlueGray-100 flex-between min-h-10 w-full rounded-lg border px-4 md:h-14">
                <div className="flex-start flex-1 gap-2">
                  <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                    <Image src={CoinIcon} alt="coin icon" />
                  </div>
                  <label
                    htmlFor="wallet"
                    className="text-Gray-800 col-start w-full !max-w-[80%] text-sm font-normal"
                  >
                    <span>Deposit USDC</span>
                  </label>
                </div>
                <RadioGroupItem
                  value="wallet"
                  id="wallet"
                  className=""
                  checked={true}
                />
              </article>
              <div className="flex w-full flex-col gap-2">
                <span className="text-Gray-500 flex items-center gap-1 text-xs">
                  Account ID: {walletAddress}
                  <CopyToClipboardBtn
                    id="walletAddress"
                    valuToCopy={walletAddress}
                  />
                </span>
                <span className="text-Gray-500 flex items-center gap-1 text-xs">
                  EVM Address: {evmAddress}
                  <CopyToClipboardBtn id="evmAddress" valuToCopy={evmAddress} />
                </span>
              </div>
            </RadioGroup>
            {/* {errors.paymentMethod && (
              <p className="text-xs text-red-500">
                {errors.paymentMethod.message}
              </p>
            )} */}
          </div>
          <SubmitButton
            // isSubmitting={isSubmitting}
            className="mt-3 w-full"
            disabled
          >
            Fund wallet
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
