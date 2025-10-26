import { Info } from "lucide-react";
import ChangePasswordModal from "./modals/change-password-modal";
import CheckIcon from "/public/svgs/check.svg";
import Image from "next/image";
import { UserData } from "@/types/auth";
import { getStatusColors } from "@/lib/helpers";

export default async function PersonalInfoBox({ user }: { user: UserData }) {
  const { firstName, lastName, email, kycStatus, phoneNumber } = user;

  return (
    <div className="col-start w-full justify-center gap-3 rounded-xl bg-white px-4 py-5 shadow-[0px_4px_20px_0px_#0000000D] md:p-5">
      <h3 className="text-Gray-900 text-base font-bold md:text-lg">
        Personal details
      </h3>
      <ul className="col-start bg-BlueGray-25 w-full gap-4 rounded-lg p-3">
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            First name
          </span>
          <span className="text-Gray-900 text-sm font-medium capitalize md:text-base">
            {firstName}
          </span>
        </li>
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            Last name
          </span>
          <span className="text-Gray-900 text-sm font-medium capitalize md:text-base">
            {lastName}
          </span>
        </li>
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            Email address
          </span>
          <span className="text-Gray-900 text-sm font-medium md:text-base">
            {email}
          </span>
        </li>
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            Phone number
          </span>
          <span className="text-Gray-900 text-sm font-medium md:text-base">
            {phoneNumber || "N/A"}
          </span>
        </li>
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            Country
          </span>
          <span className="text-Gray-900 text-sm font-medium md:text-base">
            Nigeria
          </span>
        </li>
        <li className="flex-between w-full">
          <span className="text-Gray-500 text-xs font-normal md:text-sm">
            KYC Status
          </span>

          <span
            className={`${getStatusColors(kycStatus)} flex items-center gap-1 text-sm font-medium capitalize md:text-base`}
          >
            {kycStatus}{" "}
            {(kycStatus?.toLowerCase() === "verified" ||
              kycStatus?.toLowerCase() === "approved") && (
              <Image src={CheckIcon} alt="check icon" className="size-5" />
            )}
          </span>
        </li>
      </ul>
      <div className="bg-Yellow-25 text-Yellow-600 flex-start h-12 w-full gap-2 rounded-lg px-4">
        <Info className="size-4" />
        <span className="text-Gray-900 text-xs font-normal">
          Contact{" "}
          <a href="mailto:legal@afribloc.co" className="underline">
            legal@afribloc.co
          </a>{" "}
          to update KYC details
        </span>
      </div>
      <div className="flex-between mt-5 w-full gap-3">
        <h3 className="text-Gray-900 text-base font-semibold md:text-lg">
          Password
        </h3>
        <ChangePasswordModal />
      </div>
    </div>
  );
}
