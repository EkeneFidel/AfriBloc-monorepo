import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import MapIndicator from "/public/svgs/map-indicator.svg";
import BedIcon from "/public/svgs/bed.svg";
import BathtubIcon from "/public/svgs/bathtub.svg";
import KitchenIcon from "/public/svgs/kitchen.svg";
import ChairIcon from "/public/svgs/chair.svg";
import Image from "next/image";
import { PropertyTypes } from "@/types/property";

export default function CostBreakdownSection({
  property,
}: {
  property: PropertyTypes;
}) {
  const [openCost, setOpenCost] = useState({
    description: true,
    why: true,
  });

  const [openWhy, setOpenWhy] = useState<number>(0);

  const toggleWhy = (index: number) => {
    setOpenWhy(index);
  };

  return (
    <section id="cost-breakdown" className="col-start w-full gap-6">
      <article className="border-BlueGray-100 w-full rounded-lg border p-3 text-start outline-none">
        <button
          type="button"
          onClick={() =>
            setOpenCost({
              ...openCost,
              description: !openCost.description,
            })
          }
          className="flex w-full items-center justify-between select-none"
        >
          <h4 className="max-w-[511px] text-base font-semibold">Description</h4>
          <ChevronDown
            className={`text-base text-inherit ${
              openCost.description ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
        </button>
        <div
          className={cn(
            "text-Gray-800 w-full space-y-5 overflow-hidden text-xs font-normal transition-all duration-300 md:text-sm",
            openCost.description ? "max-h-[1000px] py-2" : "max-h-0",
          )}
        >
          <p>{property.description}</p>
          <ul className="col-start w-full gap-2">
            <h6 className="text-xs font-semibold md:text-sm">What’s in it</h6>
            <ul className="flex w-full max-w-[90%] flex-wrap items-center justify-start gap-2">
              {property?.features?.map((item, idx) => (
                <li
                  key={idx}
                  className="text-Gray-800 border-Gray-50 flex items-center gap-1 border-r pr-1.5 text-[10px] font-normal sm:pr-2 sm:text-xs"
                >
                  {item?.toLowerCase()?.includes("bedrooms") && (
                    <Image src={BedIcon} alt="bed icon" />
                  )}
                  {item?.toLowerCase()?.includes("bathrooms") && (
                    <Image src={BathtubIcon} alt="bathtub icon" />
                  )}
                  {item?.toLowerCase()?.includes("kitchen") && (
                    <Image src={KitchenIcon} alt="kitchen icon" />
                  )}
                  {item?.toLowerCase()?.includes("living") && (
                    <Image src={ChairIcon} alt="chair icon" />
                  )}
                  {item}
                </li>
              ))}
            </ul>
          </ul>
          <div className="col-start w-full gap-2">
            <h6 className="text-xs font-semibold md:text-sm">Amenities</h6>
            <div className="flex w-full max-w-[70%] flex-wrap items-center justify-start gap-2">
              {property?.amenities?.map((item, idx) => (
                <span
                  key={idx}
                  className="text-Gray-800 border-Gray-50 flex items-center gap-1 border-r pr-1.5 text-[10px] font-normal sm:pr-2 sm:text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="col-start w-full gap-2">
            <h6 className="text-xs font-semibold md:text-sm">Location</h6>
            <div className="flex-start gap-1">
              <Image src={MapIndicator} alt="icon" />
              <p className="text-Gray-700 text-xs font-normal md:text-sm">
                {property.location}
              </p>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.490457315629!2d3.5093916736493402!3d6.4593729239079964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf697d9db5b5b%3A0xf66667ed1445e65!2sOrchid%20Rd%2C%20Lekki%20Penninsula%20II%2C%20Lekki%20106104%2C%20Lagos!5e0!3m2!1sen!2sng!4v1756412518407!5m2!1sen!2sng"
              width="100%"
              height="150"
              style={{ border: "0" }}
              allowFullScreen={true}
              loading="lazy"
              className="rounded-lg"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </article>
      <article className="border-BlueGray-100 w-full rounded-lg border p-3 text-start outline-none">
        <button
          type="button"
          onClick={() =>
            setOpenCost({
              ...openCost,
              why: !openCost.why,
            })
          }
          className="flex w-full items-center justify-between select-none"
        >
          <h4 className="max-w-[511px] text-base font-semibold">
            Why Invest in this Property?
          </h4>
          <ChevronDown
            className={`text-base text-inherit ${
              openCost.why ? "rotate-180" : "rotate-0"
            } transition-all duration-300`}
          />
        </button>
        <div
          className={cn(
            "text-Gray-800 w-full space-y-5 overflow-hidden text-xs font-normal transition-all duration-300 md:text-sm",
            openCost.why ? "max-h-[1000px] py-2" : "max-h-0",
          )}
        >
          <div className="col-start w-full gap-y-3">
            {property?.whyInvest?.map((reason, idx) => (
              <button
                key={idx}
                onClick={() => toggleWhy(idx)}
                className="border-BlueGray-50 bg-BlueGray-50 w-full rounded-2xl border p-3 text-start outline-none"
              >
                <div className="flex w-full items-center justify-between select-none">
                  <h4 className="max-w-[511px] text-sm font-semibold">
                    {reason}
                  </h4>
                  <ChevronDown
                    className={`text-sm text-inherit ${
                      openWhy === idx ? "rotate-180" : "rotate-0"
                    } transition-all duration-300`}
                  />
                </div>
                <p
                  className={cn(
                    "w-full overflow-hidden text-xs font-normal transition-all duration-300 md:text-sm",
                    openWhy === idx ? "max-h-[1000px] py-2" : "max-h-0",
                  )}
                >
                  {reason}
                </p>
              </button>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
