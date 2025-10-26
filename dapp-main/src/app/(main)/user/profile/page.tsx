import PersonalInfoBox from "@/components/main/user/profile/personal-info-box";
import BaseButton from "@/components/ui/buttons/base-button";
import { formatDate, getNameInitials } from "@/lib/helpers";
import { getCurrentUserApi } from "@/services/apis/auth.api";
import { UserData } from "@/types/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function page() {
  const rsp = await getCurrentUserApi();

  const user = rsp?.ok ? rsp?.body?.user : ({} as UserData);
  const { firstName, lastName, email, createdAt } = user;

  return (
    <main className="text-Gray-900 bg-white">
      <section className="col-start container gap-5 py-14">
        <h1 className="text-2xl font-bold lg:text-[40px] lg:leading-[100%]">
          Profile
        </h1>
        <div className="grid w-full max-w-[857px] gap-5 lg:grid-cols-[334px_1fr]">
          <div className="flex w-full flex-col items-center justify-start gap-3 rounded-xl bg-white p-5 shadow-[0px_4px_20px_0px_#0000000D]">
            <div className="col-center">
              <div className="bg-Orange-25 text-Orange-500 flex size-28 items-center justify-center overflow-hidden rounded-full text-3xl font-medium uppercase md:text-[40px]">
                {getNameInitials(`${firstName} ${lastName}`)}
              </div>
              <h3 className="text-Gray-900 text-center text-base font-bold capitalize md:text-lg">
                {firstName} {lastName}
              </h3>
              <p className="text-Gray-700 text-center text-sm font-normal">
                {email}
              </p>
              <p className="text-Gray-500 text-center text-xs font-normal">
                Joined: {formatDate(createdAt)}
              </p>
            </div>
            <BaseButton
              disabled
              className="!text-Purple-500 border-Gray-50 w-full border !bg-white px-6 !text-base lg:w-fit lg:px-10"
            >
              Edit image
            </BaseButton>
          </div>
          <PersonalInfoBox user={user} />
        </div>
      </section>
    </main>
  );
}
