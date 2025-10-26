"use client";
import BaseButton from "@/components/ui/buttons/base-button";
import Image from "next/image";
import ProgressBar from "@/components/ui/progress-bar/progress-bar";
import noImage from "../../../../../public/images/noImage.webp";

import { PropertyTypes } from "@/types/property";
import {
  BathIcon,
  BedIcon,
  MapPinIcon,
  SqmIcon,
} from "../../../../../public/svgs/svgs";
import Field from "@/components/ui/field";
import { useMemo, useState } from "react";
import { formatNumInThousands } from "@/lib/helpers";
import { useCurrencyContext } from "@/contexts/currencyProvider";
import useFundWallet from "../wallet/hooks/use-fund-wallet";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

export const DealCard = ({ deal }: { deal: PropertyTypes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const soldPercentage = useMemo(() => {
    const unitsSold = Number(deal?.unitsSold ?? 0);
    const initialUnits = Number(deal?.initialUnits ?? 0);
    if (!initialUnits || initialUnits <= 0) return 0;
    const raw = (unitsSold / initialUnits) * 100;
    const rounded = Math.round(raw);
    return Math.max(0, Math.min(100, Number.isFinite(rounded) ? rounded : 0));
  }, [deal?.unitsSold, deal?.initialUnits]);

  const handleImageError = () => {
    if (currentImageIndex < (deal?.imageUrls?.length || 0) - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };
  return (
    <li className="col-start shadow-3xl w-full overflow-hidden rounded-2xl">
      <figure className="relative h-[226px] w-full overflow-hidden">
        {!imageError && deal?.imageUrls?.length > 0 ? (
          <Image
            src={deal.imageUrls[currentImageIndex]}
            alt={deal?.title}
            fill
            sizes="100%"
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <Image
            src={noImage}
            alt={deal?.title}
            fill
            sizes="100%"
            className="object-cover"
            onError={handleImageError}
          />
        )}
      </figure>

      <article className="col-start w-full gap-2 p-5">
        <ul className="divide-Gray-50 flex flex-wrap items-center justify-start gap-2 divide-x">
          <li className="text-Gray-800 border-r pr-2 text-xs font-normal">
            {deal?.type}
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BedIcon /> {deal?.bedrooms} bed
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BathIcon />
            {deal?.bathroom}
            bath
          </li>
          <li className="text-Gray-800 flex items-center gap-1 text-xs font-normal">
            <SqmIcon /> {deal?.landMeasurement}
          </li>
        </ul>
        <hgroup className="space-y-2">
          <h3 className="text-lg font-bold md:text-2xl">{deal?.title}</h3>

          <h6 className="text-Gray-700 flex items-center gap-1 text-sm font-normal">
            <MapPinIcon />
            {deal?.location}
          </h6>
        </hgroup>

        <div className="border-BlueGray-100 flex-between w-full gap-2 rounded-full border px-3 py-2">
          <ProgressBar percentage={soldPercentage} className="h-2 flex-1" />
          <span className="text-sm font-normal">{soldPercentage}%</span>
        </div>

        <ul className="border-Blue-100 my-3 flex w-full flex-col items-start justify-start gap-2 rounded-xl border px-4 py-2">
          <li className="w-full">
            <Field
              title="Listing Price"
              value={
                <MarketPrice
                  price={parseInt(deal.listingPrice)}
                  className="text-Purple-400 flex-1 !text-end text-base font-semibold md:text-lg"
                />
              }
              wrapperClassName="justify-between"
            />
          </li>

          <li className="w-full">
            <Field
              title="Projected ROI"
              value={`${deal.annualisedRoiPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
            />
          </li>

          <li className="w-full">
            <Field
              title="Gross yield"
              value={`${deal.grossRentalYieldPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
            />
          </li>
        </ul>
        <BaseButton
          href={`/user/deals/${deal.id}`}
          className="w-full px-8 !text-base"
        >
          Own this bloc
        </BaseButton>
      </article>
    </li>
  );
};

export const PortfolioDealCard = ({ deal }: { deal: PropertyTypes }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const soldPercentage = useMemo(() => {
    const unitsSold = Number(deal?.unitsSold ?? 0);
    const initialUnits = Number(deal?.initialUnits ?? 0);
    if (!initialUnits || initialUnits <= 0) return 0;
    const result = (unitsSold / initialUnits) * 100;
    return Math.max(0, Math.min(100, Number.isFinite(result) ? result : 0));
  }, [deal?.unitsSold, deal?.initialUnits]);

  const handleImageError = () => {
    if (currentImageIndex < (deal?.imageUrls?.length || 0) - 1) {
      setCurrentImageIndex((prev) => prev + 1);
    } else {
      setImageError(true);
    }
  };
  return (
    <Link
      href={`/user/portfolio/${deal.id}`}
      className="col-start shadow-3xl w-full overflow-hidden rounded-2xl"
    >
      <figure className="relative h-[226px] w-full overflow-hidden">
        {!imageError && deal?.imageUrls?.length > 0 ? (
          <Image
            src={deal.imageUrls[currentImageIndex]}
            alt={deal?.title}
            fill
            sizes="100%"
            className="object-cover"
            onError={handleImageError}
          />
        ) : (
          <Image
            src={noImage}
            alt={deal?.title}
            fill
            sizes="100%"
            className="object-cover"
            onError={handleImageError}
          />
        )}
      </figure>

      <article className="col-start w-full gap-2 p-5">
        <ul className="divide-Gray-50 flex flex-wrap items-center justify-start gap-2 divide-x">
          <li className="text-Gray-800 border-r pr-2 text-xs font-normal">
            {deal?.type}
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BedIcon /> {deal?.bedrooms} bed
          </li>
          <li className="text-Gray-800 flex items-center gap-1 border-r pr-2 text-xs font-normal">
            <BathIcon />
            {deal?.bathroom}
            bath
          </li>
          <li className="text-Gray-800 flex items-center gap-1 text-xs font-normal">
            <SqmIcon /> {deal?.landMeasurement}
          </li>
        </ul>
        <hgroup className="space-y-2">
          <h3 className="text-lg font-bold md:text-2xl">{deal?.title}</h3>

          <h6 className="text-Gray-700 flex items-center gap-1 text-sm font-normal">
            <MapPinIcon />
            {deal?.location}
          </h6>
        </hgroup>

        <div className="border-BlueGray-100 flex-between w-full gap-2 rounded-full border px-3 py-2">
          <ProgressBar percentage={soldPercentage} className="h-2 flex-1" />
          <span className="text-sm font-normal">{soldPercentage}%</span>
        </div>

        <ul className="border-Blue-100 my-3 flex w-full flex-col items-start justify-start gap-2 rounded-xl border px-4 py-2">
          <li className="w-full">
            <Field
              title="Listing Price"
              value={
                <MarketPrice
                  price={parseInt(deal.listingPrice)}
                  className="text-Purple-400 flex-1 !text-end text-base font-semibold md:text-lg"
                />
              }
              wrapperClassName="justify-between"
            />
          </li>

          <li className="w-full">
            <Field
              title="Projected ROI"
              value={`${deal.annualisedRoiPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
            />
          </li>

          <li className="w-full">
            <Field
              title="Gross yield"
              value={`${deal.grossRentalYieldPct}%`}
              wrapperClassName="justify-between"
              className="text-end"
            />
          </li>
        </ul>
      </article>
    </Link>
  );
};

export const MarketPrice = ({
  price,
  className,
}: {
  className?: string;
  price: number;
}) => {
  const { usdNGNRate, currency } = useCurrencyContext();

  const formatedPrice = useMemo(() => {
    return currency === "$"
      ? parseFloat(price?.toString()) / usdNGNRate
      : price;
  }, [currency, price, usdNGNRate]);
  return (
    <span className={className}>
      {currency}
      {formatNumInThousands(formatedPrice?.toFixed(3))}
    </span>
  );
};

export const QtyInput = () => {
  const { decrease, increase, value, handleValueChange } = useFundWallet();

  return (
    <div className="border-Gray-25 flex h-9 w-full items-center overflow-hidden rounded-lg border md:h-14">
      <button
        type="button"
        className="bg-Gray-25 flex-center size-9 border md:size-14"
        onClick={() => decrease("qty")}
        disabled={value["qty"] === "0"}
      >
        <Minus className="size-5" />
      </button>
      <div className="flex flex-1 items-center justify-center gap-1 text-base">
        <input
          type="number"
          inputMode="numeric"
          placeholder="0"
          className="focus text-Heading flex flex-1 bg-transparent text-center text-lg font-semibold focus:border-0 focus:outline-0 md:text-xl"
          value={value?.qty}
          onChange={(e) => handleValueChange("qty", e.target.value)}
        />
      </div>

      <button
        type="button"
        className="bg-Gray-25 flex-center size-9 border md:size-14"
        onClick={() => increase("qty")}
      >
        <Plus className="size-5" />
      </button>
    </div>
  );
};
