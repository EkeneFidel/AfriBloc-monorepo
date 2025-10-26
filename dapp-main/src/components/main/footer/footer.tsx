import AppLogo from "@/components/ui/app-logo/app-logo";
import { footerLinks } from "./routes";
import Image from "next/image";
import Partner2 from "/public/svgs/hedera.svg";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-BlueGray-25 font-poppins text-Gray-900 px-4 py-12">
      <div className="container !mx-0 md:!mx-auto">
        <div className="grid w-full gap-5 pb-14 md:grid-cols-2">
          <div className="col-start w-full gap-4">
            <AppLogo />
            <p className="text-Gray-800 max-w-[392px] text-sm font-normal">
              AfriBloc gives you Global access to Africa&apos;s prime real
              estate. Start from $25 to own a bloc, earn monthly dividends, and
              share in capital appreciation at exit.
            </p>
            <div className="flex items-center justify-start gap-2">
              <span className="text-xs font-normal">Powered by</span>
              <Link
                href="https://hedera.com/"
                className="flex items-center justify-start gap-2"
              >
                <Image src={Partner2} alt="partner image" className="" />
              </Link>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-5">
            {footerLinks.map((item) => (
              <div
                key={item.title}
                className="flex w-full flex-col items-start justify-start gap-4"
              >
                <h3 className="text-sm font-semibold md:text-lg">
                  {item.title}
                </h3>
                <ul className="col-start gap-y-3">
                  {item.links.map((link) => (
                    <li key={link.text}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-Purple-500 cursor-pointer text-xs font-normal transition-all hover:underline md:text-base"
                      >
                        {link.imageSrc ? (
                          <div className="flex-center border-Gray-100 size-10 rounded-full border lg:size-14">
                            <Image
                              src={link.imageSrc}
                              alt={link.text}
                              width={24}
                              height={24}
                            />
                          </div>
                        ) : (
                          link.text
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-start border-Gray-50 w-full gap-3 border-t py-4">
          <div>
            <h6 className="mb-3 text-xs font-semibold">
              Regulatory notice (BVI)
            </h6>
            <p className="text-Gray-800 text-xs font-normal">
              Issuer incorporated in the British Virgin Islands. AfriBloc is not
              currently licensed by the BVI Financial Services Commission.
              Materials are informational only and not an offer. Any future
              offering will be made via licensed partners or under valid
              exemptions, and may be geo-fenced and restricted to whitelisted
              investors.
            </p>
          </div>
          <p className="text-Gray-800 text-xs font-normal">
            Copyright &copy; AfriBloc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
