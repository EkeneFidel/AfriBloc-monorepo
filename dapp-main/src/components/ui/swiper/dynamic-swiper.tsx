"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperProps } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Keyboard, Autoplay } from "swiper/modules";
import type { AutoplayOptions } from "swiper/types";

export interface DynamicSwiperProps<T> extends Omit<SwiperProps, "children"> {
  data: T[];
  renderSlide: (item: T, idx: number) => ReactNode;
  direction?: "horizontal" | "vertical";
  slidesPerView?: number;
  spaceBetween?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  className?: string;
  style?: React.CSSProperties;
  autoplay?: boolean | AutoplayOptions;
  onSwiper?: (swiper: SwiperClass) => void;
  customPaginationClassName?: string;
  showCustomPaginationPagination?: boolean;
  activeIndex?: number;
  setActiveIndex?: (idx: number) => void;
}

export default function DynamicSwiper<T>({
  data,
  renderSlide,
  direction = "horizontal",
  slidesPerView = 1,
  spaceBetween = 0,
  showPagination = true,
  showNavigation = false,
  className = "",
  style = {},
  autoplay = false,
  onSwiper,
  customPaginationClassName = "",
  showCustomPaginationPagination = true,
  activeIndex,
  setActiveIndex,
  ...swiperProps
}: DynamicSwiperProps<T>) {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState(0);

  // Sync Swiper with external activeIndex
  useEffect(() => {
    if (
      typeof activeIndex === "number" &&
      swiperRef.current &&
      swiperRef.current.realIndex !== activeIndex
    ) {
      swiperRef.current.slideTo(activeIndex);
    }
  }, [activeIndex]);

  const handleSwiper = (swiper: SwiperClass) => {
    swiperRef.current = swiper;
    if (onSwiper) onSwiper(swiper);
  };

  const handleSlideChange = (swiper: SwiperClass) => {
    if (setActiveIndex) {
      setActiveIndex(swiper.realIndex);
    } else {
      setInternalActiveIndex(swiper.realIndex);
    }
    swiperProps.onSlideChange?.(swiper);
  };

  const dotActiveIndex =
    typeof activeIndex === "number" ? activeIndex : internalActiveIndex;

  return (
    <Swiper
      direction={direction}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      pagination={showPagination ? { clickable: true } : undefined}
      navigation={showNavigation}
      keyboard={{ enabled: true }}
      modules={[Pagination, Navigation, Keyboard, Autoplay]}
      autoplay={autoplay}
      className={className}
      style={style}
      onSwiper={handleSwiper}
      onSlideChange={handleSlideChange}
      initialSlide={activeIndex}
      {...swiperProps}
    >
      {data.map((item, idx) => (
        <SwiperSlide key={idx}>{renderSlide(item, idx)}</SwiperSlide>
      ))}
      {showCustomPaginationPagination && (
        <div
          className={`mt-2 flex justify-center gap-2 ${customPaginationClassName}`}
        >
          {data.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => {
                if (setActiveIndex) {
                  setActiveIndex(idx);
                } else {
                  swiperRef.current?.slideTo(idx);
                }
              }}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                dotActiveIndex === idx ? "bg-Purple-500 w-6" : "bg-Gray-100"
              } border-none outline-none`}
              style={{
                boxShadow:
                  dotActiveIndex === idx ? "0 0 0 2px #9e4bf1" : undefined,
              }}
            />
          ))}
        </div>
      )}
    </Swiper>
  );
}
