import Image from "next/image";
import IDCard from "/public/svgs/id-card.svg";
import Sumsub from "@/components/main/user/kyc/sumsub";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserData } from "@/types/auth";

export default async function KycStatInfo({ subtext }: { subtext?: string }) {
  const rsp = await getCurrentUserApi();

  const user = rsp?.ok ? rsp?.body?.user : ({} as UserData);

  if (
    user?.kycStatus?.toLowerCase() == "verified" ||
    user?.kycStatus?.toLowerCase() == "approved"
  ) {
    return;
  }

  return (
    <div className="bg-Purple-25 text-Gray-900 flex w-full items-start gap-3 rounded-2xl px-4 py-4 lg:px-8">
      <div className="flex-center bg-Purple-100 size-9 rounded-full md:size-12">
        <Image src={IDCard} alt="Kyc Card" />
      </div>
      <div className="flex max-w-[80%] flex-col justify-between gap-4 md:max-w-full md:flex-grow md:flex-row md:items-center md:gap-0">
        <div className="col-start">
          <h3 className="text-base font-semibold md:text-lg">
            Verify your account
          </h3>
          <p className="text-Gray-800 text-sm font-normal">
            {subtext
              ? subtext
              : `Get started by verifying your profile to start investing in Africa&apos;s
            top properties`}
          </p>
        </div>

        <Sumsub />
      </div>
    </div>
  );
}
