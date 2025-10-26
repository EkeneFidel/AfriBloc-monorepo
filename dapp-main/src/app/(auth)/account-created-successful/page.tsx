import Image from "next/image";
import SuccessImage from "/public/svgs/success.svg";
import BaseButton from "@/components/ui/buttons/base-button";
import Sumsub from "@/components/main/user/kyc/sumsub";

export default function page() {
  return (
    <div className="col-center text-Gray-900 gap-5 p-4 lg:p-0">
      <Image src={SuccessImage} alt="success" />
      <h2 className="mx-auto max-w-[250px] text-center text-3xl font-bold md:max-w-[330px] lg:text-[40px] lg:leading-[100%]">
        Account created successfully
      </h2>
      <p className="text-Gray-800 max-w-[250px] text-center text-sm font-normal md:max-w-[330px]">
        Your account creation was successful. You are just one step away from
        verifying your account.
      </p>
      <div className="mt-5 flex w-full flex-col items-center justify-center gap-4 lg:flex-row">
        <BaseButton
          href="/user/deals"
          className="!text-Gray-900 border-Gray-50 w-full border !bg-white px-6 !text-base lg:w-fit"
        >
          Browse Properties
        </BaseButton>
        <Sumsub auth />
      </div>
    </div>
  );
}
