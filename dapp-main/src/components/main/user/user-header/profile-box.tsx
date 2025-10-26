"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogOutIcon from "/public/svgs/log-out.svg";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth.actions";
import { getNameInitials } from "@/lib/helpers";

export type ProfileBoxProps = {
  imageUrl: string | null;
  firstName: string;
  fullName: string;
  email: string;
  className?: string;
};

export default function ProfileBox({
  imageUrl,
  firstName,
  fullName,
  email,
  className,
}: ProfileBoxProps) {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    await logoutAction();
    setIsLoading(false);
    push("/");
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "border-BlueGray-200 flex h-[50px] max-w-[240px] items-center gap-3 rounded-full border bg-white pr-4",
            className,
          )}
        >
          <div className="flex flex-1 items-center gap-3">
            {imageUrl ? (
              <div className="relative size-[38px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={imageUrl}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-Orange-500 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-medium text-white uppercase">
                {getNameInitials(firstName)}
              </div>
            )}

            <p className="text-Gray-800 text-base font-medium capitalize">
              {firstName}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "hidden transition-transform duration-300 sm:block",
              isOpen && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>

      <PopoverContent className="border-Gray-400 flex w-[274px] flex-col gap-y-3 rounded-2xl border bg-white p-3">
        <div className="border-Gray-100 flex flex-col gap-y-3 rounded-2xl border p-3">
          <div className="flex items-center gap-3">
            {imageUrl ? (
              <div className="relative size-[38px] shrink-0 overflow-hidden rounded-full">
                <Image
                  src={imageUrl}
                  alt="avatar"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="bg-Orange-500 flex size-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full text-base font-medium text-white uppercase">
                {getNameInitials(firstName)}
              </div>
            )}

            <div>
              <p className="text-Gray-800 text-base font-medium">{fullName}</p>
              <p className="text-Gray-500 text-sm">
                {email.length > 22 ? email.slice(0, 22) + "..." : email}
              </p>
            </div>
          </div>

          <Link
            href="/user/profile"
            className="text-Gray-800 border-Gray-100 rounded-[99px] border p-2 text-center text-sm font-medium"
          >
            Edit Profile
          </Link>
        </div>

        <button
          type="button"
          disabled={isLoading}
          className="flex items-center gap-2.5 py-4 disabled:cursor-progress disabled:opacity-50"
          onClick={handleLogout}
        >
          <Image src={LogOutIcon} alt="logout" />
          <p className="text-Error-500 text-sm font-medium">
            {isLoading ? "Logging out..." : "Logout"}
          </p>
        </button>
      </PopoverContent>
    </Popover>
  );
}
