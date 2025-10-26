import { useState } from "react";
import DownloadIcon from "/public/svgs/download.svg";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import BaseButton from "@/components/ui/buttons/base-button";
import { PropertyTypes } from "@/types/property";

export default function DocumentSection({
  property,
}: {
  property: PropertyTypes;
}) {
  const [openDocument, setOpenDocument] = useState(true);

  return (
    <section id="document" className="col-start w-full gap-6">
      {(property?.governorsConsentUrl || property?.surveyPlanUrl) && (
        <article className="border-BlueGray-100 w-full rounded-lg border p-3 text-start outline-none">
          <button
            type="button"
            onClick={() => setOpenDocument((prev) => !prev)}
            className="flex w-full items-center justify-between select-none"
          >
            <h4 className="max-w-[511px] text-base font-semibold">Documents</h4>
            <ChevronDown
              className={`text-base text-inherit ${
                openDocument ? "rotate-180" : "rotate-0"
              } transition-all duration-300`}
            />
          </button>

          <div
            className={cn(
              "text-Gray-800 w-full space-y-5 overflow-hidden text-xs font-normal transition-all duration-300 md:text-sm",
              openDocument ? "max-h-[1000px] py-2" : "max-h-0",
            )}
          >
            <div className="grid w-full grid-cols-2 gap-3 md:gap-5">
              {property?.governorsConsentUrl && (
                <a
                  href={property?.governorsConsentUrl}
                  className="flex-between bg-BlueGray-50 h-10 rounded-lg px-2 sm:px-4"
                >
                  <h4 className="text-xs font-medium md:text-sm">
                    Governor&apos;s Consent
                  </h4>
                  <Image src={DownloadIcon} alt="download icon" />
                </a>
              )}
              {property?.surveyPlanUrl && (
                <a
                  href={property?.surveyPlanUrl}
                  className="flex-between bg-BlueGray-50 h-10 rounded-lg px-2 sm:px-4"
                >
                  <h4 className="text-xs font-medium md:text-sm">
                    Survey Plan
                  </h4>
                  <Image src={DownloadIcon} alt="download icon" />
                </a>
              )}
            </div>
          </div>
        </article>
      )}
      <article className="border-BlueGray-100 flex w-full flex-col items-start justify-start gap-4 rounded-lg border p-3 text-start outline-none md:flex-row md:items-center md:justify-between">
        <div className="col-start">
          <h3 className="text-sm font-semibold md:text-base">
            Got any questions
          </h3>
          <p className="text-Gray-600 text-xs font-normal md:text-sm">
            Contact us for more information.
          </p>
        </div>
        <div className="flex items-start gap-4">
          <BaseButton
            href="mailto:contact@afribloc.co"
            className="!text-Purple-500 border-Gray-50 border !bg-white px-8 !text-base"
          >
            Email
          </BaseButton>
        </div>
      </article>
    </section>
  );
}
