"use client";
import ProgressBar from "@/components/ui/progress-bar/progress-bar";
import { Info } from "lucide-react";
import { PropertyTypes } from "@/types/property";
import {
  BathIcon,
  BedIcon,
  MapPinIcon,
  SqmIcon,
} from "../../../../../../public/svgs/svgs";
import Field from "@/components/ui/field";
import { MarketPrice } from "../deal-card";
import { useMemo } from "react";

export default function DetailSection({
  property,
}: {
  property: PropertyTypes;
}) {
  const soldPercentage = useMemo(() => {
    const unitsSold = Number(property?.unitsSold ?? 0);
    const initialUnits = Number(property?.initialUnits ?? 0);
    if (!initialUnits || initialUnits <= 0) return 0;
    const result = (unitsSold / initialUnits) * 100;
    return Math.max(0, Math.min(100, Number.isFinite(result) ? result : 0));
  }, [property?.unitsSold, property?.initialUnits]);
  return (
    <section id="detail" className="col-start w-full gap-4 md:gap-6">
      <section className="col-start w-full gap-4">
        <ul className="divide-Gray-50 flex flex-wrap items-center justify-start gap-2 divide-x">
          <li className="text-Gray-800 border-r pr-2 text-xs font-normal">
            {property?.type}
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BedIcon /> {property?.bedrooms} bed
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BathIcon />
            {property?.bathroom}
            bath
          </li>
          <li className="text-Gray-800 flex items-center gap-1 text-xs font-normal">
            <SqmIcon /> {property?.landMeasurement}
          </li>
        </ul>
        <article className="flex w-full items-center justify-between lg:items-start">
          <div className="col-start gap-1">
            <h3 className="text-lg font-bold md:text-2xl">{property.title}</h3>
            <div className="flex-start gap-1">
              <MapPinIcon />
              <p className="text-Gray-700 text-xs font-normal md:text-sm">
                {property.location}
              </p>
            </div>
          </div>
          <div className="col-end gap-1 lg:-translate-y-9">
            <h6 className="text-Gray-700 text-end text-xs font-normal whitespace-nowrap md:text-sm">
              Price per unit
            </h6>

            <MarketPrice
              price={parseInt(property.pricePerUnit)}
              className="text-Purple-400 text-end text-base font-semibold md:text-lg"
            />
          </div>
        </article>
        <article className="flex w-full items-center gap-4">
          <div className="hidden items-center justify-start md:flex">
            <div className="flex-start gap-1 pr-4">
              <MapPinIcon />
              <p className="text-Gray-700 text-xs font-normal">
                {property.numUnits} units available
              </p>
            </div>
            <div className="flex-start border-Gray-50 gap-1 border-l pl-4">
              <MapPinIcon />
              <p className="text-Gray-700 text-xs font-normal">
                {/* Placeholder for investors */}215 investors
              </p>
            </div>
          </div>
          <div className="border-BlueGray-100 flex-between w-full gap-2 rounded-full border px-3 py-2 md:flex-1">
            <ProgressBar percentage={soldPercentage} className="h-2 flex-1" />{" "}
            {/* Placeholder percentage */}
            <span className="text-sm font-normal">
              {soldPercentage}% <span className="hidden md:inline">funded</span>
            </span>{" "}
            {/* Placeholder percentage */}
          </div>
        </article>
      </section>
      <section className="grid w-full gap-5 lg:grid-cols-2">
        <ul className="bg-BlueGray-25 border-BlueGray-100 col-start w-full gap-3 rounded-lg border p-4">
          <li className="flex-between w-full">
            <Field
              title="Listing Price"
              value={
                <MarketPrice
                  price={parseInt(property.listingPrice)}
                  className="text-Purple-400 flex-1 !text-end text-base font-semibold md:text-lg"
                />
              }
              wrapperClassName="justify-between"
              titleClassName="!w-5/12 !text-xs"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title="Net Rental Yield"
              value={`${property?.annualisedRoiPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
              titleClassName="!w-5/12 !text-xs"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title="Annualised ROI"
              value={`${property?.annualisedRoiPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
              titleClassName=" !w-5/12 !text-xs"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title="Gross Rental yield"
              value={`${property?.grossRentalYieldPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
              titleClassName=" !w-5/12 !text-xs"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title="Funded date"
              value={`${property?.fundedDate}`}
              wrapperClassName="justify-between"
              className="text-end"
              titleClassName=" !w-5/12 !text-xs"
            />
          </li>
        </ul>
        <ul className="col-start border-BlueGray-100 w-full gap-3 rounded-lg border p-4">
          <li>
            <h5 className="text-xs font-semibold md:text-sm">
              Investment cost breakdown
            </h5>
          </li>

          <li className="flex-between w-full">
            <Field
              title={
                <>
                  Property cost <Info className="size-3" />
                </>
              }
              value={
                <MarketPrice
                  price={parseInt(property.propertyPrice)}
                  className="flex-1 !text-end text-sm"
                />
              }
              wrapperClassName="justify-between"
              titleClassName="!w-5/12 !text-xs flex items-center gap-1"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title={
                <>
                  Purchase cost <Info className="size-3" />
                </>
              }
              value={
                <MarketPrice
                  price={parseInt(property.purchaseCosts)}
                  className="flex-1 !text-end text-sm"
                />
              }
              wrapperClassName="justify-between"
              titleClassName="!w-5/12 !text-xs flex items-center gap-1"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title={
                <>
                  Transaction fees <Info className="size-3" />
                </>
              }
              value={
                <MarketPrice
                  price={parseInt(property.transactionFees)}
                  className="flex-1 !text-end text-sm"
                />
              }
              wrapperClassName="justify-between"
              titleClassName="!w-5/12 !text-xs flex items-center gap-1"
            />
          </li>
          <li className="flex-between w-full">
            <Field
              title={
                <>
                  MOF fees <Info className="size-3" />
                </>
              }
              value={
                <MarketPrice
                  price={parseInt(property.mofFees)}
                  className="flex-1 !text-end text-sm"
                />
              }
              wrapperClassName="justify-between"
              titleClassName="!w-5/12 !text-xs flex items-center gap-1"
            />
          </li>
        </ul>
      </section>
    </section>
  );
}
