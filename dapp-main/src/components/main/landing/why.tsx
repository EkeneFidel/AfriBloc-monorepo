"use client";

import Image from "next/image";
import { useRef, useLayoutEffect } from "react";
import WhyImage from "/public/images/why-image.png";
import WhyIcon1 from "/public/svgs/coins.svg";
import WhyIcon2 from "/public/svgs/plant.svg";
import WhyIcon3 from "/public/svgs/coin.svg";
import WhyIcon4 from "/public/svgs/notepad.svg";
import WhyIcon5 from "/public/svgs/warehouse.svg";
import { gsap } from "@/lib/gsap";

const whyData = [
  {
    title: "Higher yields than many developed markets",
    iconSrc: WhyIcon1,
  },
  {
    title: "Prime growth exposure across Africa’s fastest-rising cities",
    iconSrc: WhyIcon2,
  },
  {
    title: "Low minimums; start from $25",
    iconSrc: WhyIcon3,
  },
  {
    title: "Transparent by design; on-chain ownership & clear reporting",
    iconSrc: WhyIcon4,
  },
  {
    title: "Fully managed: sourcing, renovations, tenanting, distributions",
    iconSrc: WhyIcon5,
  },
];

export default function Why() {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const whyMapRef = useRef(null);
  const whyImageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // H2 animation
      gsap.fromTo(
        h2Ref.current,
        { y: -100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );

      // whyMapRef animation
      gsap.fromTo(
        whyMapRef.current,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 1,
          },
        },
      );

      // WhyImage animation
      gsap.fromTo(
        whyImageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: whyImageRef.current,
            start: "top 80%",
            end: "top 50%",
            scrub: 1,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-afribloc"
      ref={sectionRef}
      className="bg-BlueGray-25 text-Gray-900"
    >
      <div className="col-center container gap-8 overflow-hidden py-16 lg:gap-18 lg:py-24">
        <h2
          ref={h2Ref}
          className="lg:tex-start text-center text-3xl font-bold lg:text-[40px] lg:leading-[100%]"
        >
          Why AfriBloc
        </h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <div ref={whyMapRef} className="col-start gap-6">
            {whyData.map((info, idx) => (
              <div key={idx} className="flex-start gap-4">
                <div className="bg-Gray-25 flex-center size-9 rounded-full">
                  <Image src={info.iconSrc} alt="why source" />
                </div>
                <p className="text-base font-normal">{info.title}</p>
              </div>
            ))}
          </div>
          <div className="flex-center lg:pl-16">
            <Image
              ref={whyImageRef}
              src={WhyImage}
              alt="why image"
              className="h-auto md:h-[275px] lg:max-w-[470px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
