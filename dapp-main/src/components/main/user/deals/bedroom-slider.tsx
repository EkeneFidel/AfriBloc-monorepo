"use client";
import Image from "next/image";
// import DealImage1 from "/public/images/deal1.png";
// import DealImage2 from "/public/images/deal2.png";
// import DealImage3 from "/public/images/deal3.png";
import DynamicSwiper from "@/components/ui/swiper/dynamic-swiper";

// const dealData = [
//   {
//     title: "Two bedroom Terrace",
//     imageSrc: DealImage1,
//     percentage: 10,
//   },
//   {
//     title: "Tokenization",

//     imageSrc: DealImage2,
//     percentage: 90,
//   },
//   {
//     title: "Invest in Minutes",
//     imageSrc: DealImage3,
//     percentage: 50,
//   },
//   {
//     title: "Two bedroom Terrace",
//     imageSrc: DealImage1,
//     percentage: 10,
//   },
//   {
//     title: "Tokenization",

//     imageSrc: DealImage2,
//     percentage: 90,
//   },
//   {
//     title: "Invest in Minutes",
//     imageSrc: DealImage3,
//     percentage: 50,
//   },
// ];

export default function BedroomSlider({ images }: { images: string[] }) {
  return (
    <div className="h-80 w-full rounded-2xl">
      <DynamicSwiper
        data={images}
        slidesPerView={1}
        className="!mx-0 size-full max-w-full"
        showPagination={false}
        showNavigation={false}
        showCustomPaginationPagination={true}
        customPaginationClassName="absolute w-fit left-2/4 right-2/4 -translate-x-2/4 bottom-2 z-10"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        renderSlide={(deal) => {
          return (
            <Image
              src={deal?.trimStart()}
              width={320}
              height={400}
              alt="Deals"
              className="!h-full w-full rounded-lg object-cover"
            />
          );
        }}
      />
    </div>
  );
}
