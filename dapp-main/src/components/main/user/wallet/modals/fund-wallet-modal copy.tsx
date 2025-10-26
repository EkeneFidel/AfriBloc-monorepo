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
import { Copy, Minus, Plus } from "lucide-react";
import Image from "next/image";
import CardIcon from "/public/svgs/card.svg";
import BankIcon from "/public/svgs/bank.svg";
import CoinIcon from "/public/svgs/coin.svg";
import useClipboard from "@/hooks/use-clipboard";
import useFundWallet from "../hooks/use-fund-wallet";
import CopyToClipboardBtn from "@/components/ui/copyToClipboardBtn";

export default function FundWalletModal() {
  const { onSubmit, isModalOpen, setIsModalOpen, watch } = useFundWallet();
  // const { errors, isSubmitting } = formState;

  const paymentMethod = watch("paymentMethod");
  const [copy] = useClipboard("Copied!");

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <BaseButton
          type="button"
          className="w-full px-6 !text-base lg:w-fit lg:px-10"
        >
          Fund wallet
        </BaseButton>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[98vh] overflow-x-hidden overflow-y-auto"
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
                // onClick={() =>
                //   setValue("amount", Math.max(0, watch("amount") - 1))
                // }
              >
                <Minus className="size-5" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                placeholder="USDC 0"
                className="text-Heading placeholder:text-Heading h-full max-w-full flex-1 text-center text-lg font-semibold outline-none md:text-xl"
                // {...register("amount")}
              />
              <button
                type="button"
                className="bg-Gray-25 flex-center size-9 border md:size-14"
                // onClick={() => setValue("amount", watch("amount") + 1)}
              >
                <Plus className="size-5" />
              </button>
            </div>
            {/* {formState.errors.amount && (
              <p className="text-xs text-red-500">
                {formState.errors.amount.message}
              </p>
            )} */}
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
              <div className="border-BlueGray-100 flex-between h-10 w-full rounded-lg border px-4 md:h-14">
                <div className="flex-start gap-2">
                  <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                    <Image src={CardIcon} alt="card icon" />
                  </div>
                  <label
                    htmlFor="card"
                    className="text-Gray-800 col-start text-sm font-normal"
                  >
                    <span>Debit / Credit Card</span>
                    {/* <span className="text-Gray-600 flex items-center justify-start gap-1 text-[10px] font-normal">
                      <Image
                        src={StripeIcon}
                        alt="stripe"
                        className="rounded-full"
                      />
                      <span className="text-Gray-500 mt-0.5">Stripe - </span>{" "}
                    </span> */}
                    <span className="mt-0.5">Coming soon</span>
                  </label>
                </div>
                <RadioGroupItem value="card" id="card" className="" disabled />
              </div>
              <div className="border-BlueGray-100 w-full space-y-5 rounded-lg border px-4 py-5">
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
                      <span className="text-Gray-500 text-[10px] font-normal">
                        0% Transaction fees
                      </span>
                      <span className="mt-0.5">Coming soon</span>
                    </label>
                  </div>
                  <RadioGroupItem
                    value="bank"
                    id="bank"
                    className=""
                    disabled
                  />
                </div>
                {paymentMethod === "bank" && (
                  <ul className="col-start bg-BlueGray-25 w-full gap-4 rounded-lg p-3">
                    <li className="flex-between w-full">
                      <span className="text-Gray-500 text-xs font-normal md:text-sm">
                        Bank name
                      </span>
                      <span className="text-Gray-900 text-sm font-medium">
                        Guaranty Trust Bank
                      </span>
                    </li>
                    <li className="flex-between w-full">
                      <span className="text-Gray-500 text-xs font-normal md:text-sm">
                        Account name
                      </span>
                      <span className="text-Gray-900 text-sm font-medium">
                        Afribloc SPV LTD
                      </span>
                    </li>
                    <li className="flex-between w-full">
                      <span className="text-Gray-500 text-xs font-normal md:text-sm">
                        Account number
                      </span>
                      <span className="text-Gray-900 flex items-center gap-1 text-sm font-medium">
                        0176593860{" "}
                        <button
                          type="button"
                          onClick={() => copy("0176593860")}
                        >
                          <Copy className="size-3" />
                        </button>
                      </span>
                    </li>
                    <li className="flex-between w-full">
                      <span className="text-Gray-500 text-xs font-normal md:text-sm">
                        Rate
                      </span>
                      <span className="text-Gray-900 text-sm font-medium">
                        1 USDC = 1,530 NGN
                      </span>
                    </li>
                    <li className="flex-between w-full">
                      <span className="text-Gray-500 text-xs font-normal md:text-sm">
                        Transaction fees
                      </span>
                      <span className="text-Gray-900 text-sm font-medium">
                        1.25%
                      </span>
                    </li>
                  </ul>
                )}
              </div>
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
              <div className="border-BlueGray-100 flex-between h-10 w-full rounded-lg border px-4 md:h-14">
                <div className="flex-start gap-2">
                  <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                    <Image src={CoinIcon} alt="coin icon" />
                  </div>
                  <label
                    htmlFor="wallet"
                    className="text-Gray-800 col-start text-sm font-normal"
                  >
                    <span>Deposit USDC</span>
                    <CopyToClipboardBtn id="walletAddress" valuToCopy="here" />
                  </label>
                </div>
                <RadioGroupItem value="wallet" id="wallet" className="" />
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
