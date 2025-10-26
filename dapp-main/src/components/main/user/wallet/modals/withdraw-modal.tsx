"use client";
import BaseButton from "@/components/ui/buttons/base-button";
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
import BankIcon from "/public/svgs/bank.svg";
import CoinIcon from "/public/svgs/coin.svg";
import SubmitButton from "@/components/ui/buttons/submit-button";
import SelectField from "@/components/ui/form/select-field";
import InputField from "@/components/ui/form/input-field";
import useWithdraw from "../hooks/use-withdraw";
import { Controller } from "react-hook-form";

export default function WithdrawModal({ isVerified }: { isVerified: boolean }) {
  const {
    register,
    onSubmit,
    formState,
    isModalOpen,
    setIsModalOpen,
    watch,
    setValue,
    trigger,
    control,
  } = useWithdraw();

  const destination = watch("destination");

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <BaseButton
          className="!text-Purple-500 border-Gray-50 w-full border !bg-white px-6 !text-base lg:w-fit lg:px-10"
          disabled={!isVerified}
        >
          Withdraw
        </BaseButton>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[98vh] overflow-x-hidden overflow-y-auto"
      >
        <DialogHeader className="pb-2">
          <DialogTitle className="!text-center text-base font-semibold">
            Withdraw
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="col-start w-full gap-6">
          <div className="col-start w-full gap-1">
            <label htmlFor="amount" className="text-sm font-normal">
              Enter amount to withdraw
            </label>
            <div className="border-Gray-25 flex h-9 w-full items-center overflow-hidden rounded-lg border md:h-14">
              <button
                type="button"
                className="bg-Gray-25 flex-center size-9 border md:size-14"
                onClick={() =>
                  setValue("amount", Math.max(0, watch("amount") - 1))
                }
              >
                <Minus className="size-5" />
              </button>
              <input
                type="number"
                inputMode="numeric"
                placeholder="USDC 0"
                className="text-Heading placeholder:text-Heading h-full max-w-full flex-1 text-center text-lg font-semibold outline-none md:text-xl"
                {...register("amount")}
              />
              <button
                type="button"
                className="bg-Gray-25 flex-center size-9 border md:size-14"
                onClick={() => setValue("amount", watch("amount") + 1)}
              >
                <Plus className="size-5" />
              </button>
            </div>
            {formState.errors.amount && (
              <p className="text-xs text-red-500">
                {formState.errors.amount.message}
              </p>
            )}
          </div>
          <div className="col-start w-full gap-1">
            <label htmlFor="destination" className="text-sm font-normal">
              Select withdrawal destination
            </label>
            <RadioGroup
              className="!w-full"
              value={destination}
              onValueChange={(value) => {
                setValue("destination", value);
                trigger(["network", "walletAddress"]);
              }}
            >
              <div className="border-BlueGray-100 w-full space-y-5 rounded-lg border px-4 py-2">
                <div className="flex-between w-full rounded-lg">
                  <div className="flex-start gap-2">
                    <div className="flex-center bg-BlueGray-50 size-10 rounded-full">
                      <Image src={CoinIcon} alt="coin icon" />
                    </div>
                    <label
                      htmlFor="crypto"
                      className="text-Gray-800 col-start text-sm font-normal"
                    >
                      <span>Crypto</span>
                      <span className="text-Gray-500 flex items-center justify-start gap-1 text-[10px] font-normal">
                        Send to a crypto wallet address
                      </span>
                    </label>
                  </div>
                  <RadioGroupItem value="crypto" id="crypto" className="" />
                </div>
                {destination === "crypto" && (
                  <div className="col-start w-full gap-3">
                    <div className="w-full">
                      <label htmlFor="network" className="font-medium">
                        Choose Network
                      </label>
                      <Controller
                        name="network"
                        control={control}
                        render={({ field }) => (
                          <SelectField
                            className="!text-Gray-900 mt-2 !h-10 w-full rounded-lg px-4"
                            placeholder="Choose Network"
                            options={[
                              { value: "all", name: "Select Network" },
                              { value: "bnb", name: "BNB Smart Chain (BEP20)" },
                            ]}
                            {...field}
                            handleValue={field.onChange}
                          />
                        )}
                      />
                      {formState.errors.network && (
                        <p className="text-xs text-red-500">
                          {formState.errors.network.message}
                        </p>
                      )}
                    </div>
                    <div className="w-full">
                      <InputField
                        label="Address"
                        placeholder="Paste address"
                        inputClassName="rounded-lg !h-10"
                        {...register("walletAddress")}
                      />
                      {formState.errors.walletAddress && (
                        <p className="text-xs text-red-500">
                          {formState.errors.walletAddress.message}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="border-BlueGray-100 w-full space-y-5 rounded-lg border px-4 py-2">
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
              </div>
            </RadioGroup>
            {formState.errors.destination && (
              <p className="text-xs text-red-500">
                {formState.errors.destination.message}
              </p>
            )}
          </div>
          <SubmitButton
            isSubmitting={formState.isSubmitting}
            className="mt-3 w-full"
          >
            Withdraw
          </SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
