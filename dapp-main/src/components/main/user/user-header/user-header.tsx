import AppLogo from "@/components/ui/app-logo/app-logo";
import React from "react";
import HeaderLinks from "./header-links";
import ProfileBox from "./profile-box";
import UserMobileNav from "./user-mobile-nav";
import { UserData } from "@/types/auth";
import { getUser } from "@/services/session";

export default async function UserHeader() {
  const user = await getUser();

  const { firstName, lastName, email } = user as UserData;
  return (
    <header className="border-Gray-25 w-full border-b bg-white py-3">
      <div className="container">
        <nav className="flex-between w-full">
          <AppLogo />
          <div className="hidden items-center gap-6 lg:flex">
            <HeaderLinks />
            <ProfileBox
              imageUrl={""}
              firstName={`${firstName}`}
              fullName={`${firstName} ${lastName}`}
              email={email}
            />
          </div>
          <UserMobileNav
            imageUrl={""}
            firstName={`${firstName}`}
            fullName={`${firstName} ${lastName}`}
            email={email}
          />
        </nav>
      </div>
    </header>
  );
}
