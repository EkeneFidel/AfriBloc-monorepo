"use client";
import { useRef, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import BaseButton from "@/components/ui/buttons/base-button";
import HowImage1 from "/public/images/how1.png";
import HowImage2 from "/public/images/how2.png";
import HowImage3 from "/public/images/how3.png";
import HowImage4 from "/public/images/how4.png";
import HowImage5 from "/public/images/how5.png";
import HowImage6 from "/public/images/how6.png";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const howData = [
  {
    title: "Sourcing & Acquisition",
    desc: "We buy undervalued properties in fast-growing African cities, prioritizing strong rental demand and clear upside.",
    imageSrc: HowImage1,
  },
  {
    title: "Tokenization",
    desc: "Each asset is structured and tokenized for transparent, verifiable ownership and fast settlement.",
    imageSrc: HowImage2,
  },
  {
    title: "Invest in Minutes",
    desc: "Start from $25 to own your first bloc. Fund with USDC (Hedera), Stripe (cards/bank), Fiat bank transfer, or mobile money in supported African countries.",
    imageSrc: HowImage3,
  },
  {
    title: "Renovate & Operate",
    desc: "We upgrade the properties and rent them (short-stay or long-let) to maximize net income.",
    imageSrc: HowImage4,
  },
  {
    title: "Monthly Dividends",
    desc: "Your share of net rental income is distributed every month to your wallet.",
    imageSrc: HowImage5,
  },
  {
    title: "Exit & Capital Growth",
    desc: "After 3–5 years, we sell the property and distribute your share of capital gains, in addition to any dividends already paid.",
    imageSrc: HowImage6,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const headingWrapperRef = useRef(null);
  const cardsWrapperRef = useRef(null);
  const innerCardsContainerRef = useRef(null);
  const howCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const numCards = howData.length;
      const cardWidth = isMobile ? 364 + 24 : 393 + 44;
      const totalCardsWidth = numCards * cardWidth;

      const wrapperWidth =
        (cardsWrapperRef.current as unknown as HTMLElement)?.offsetWidth || 0;
      const scrollDistance = Math.max(0, totalCardsWidth - wrapperWidth);

      const commonScrollEnd = () => `+=${totalCardsWidth}`;

      gsap.to(innerCardsContainerRef.current, {
        x: -scrollDistance,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: cardsWrapperRef.current,
          start: isMobile ? "top -5%" : "top top",
          end: commonScrollEnd,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      if (isMobile) {
        gsap.from(headingWrapperRef.current, {
          y: 100,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.set(headingWrapperRef.current, { opacity: 0 });
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: commonScrollEnd,
          pin: headingWrapperRef.current,
          pinSpacing: false,
          onEnter: () =>
            gsap.to(headingWrapperRef.current, { opacity: 1, duration: 0.5 }),
          onLeaveBack: () =>
            gsap.to(headingWrapperRef.current, { opacity: 0, duration: 0.5 }),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={sectionRef} className="text-Gray-900 bg-white py-16">
      <div className="container">
        <div className="grid lg:grid-cols-[403px_1fr]">
          <div
            ref={headingWrapperRef}
            className="flex w-full flex-col items-center justify-center gap-1 md:items-start md:justify-start"
          >
            <h2 className="text-center text-3xl font-bold lg:text-start lg:text-[40px] lg:leading-[100%]">
              How it works
            </h2>
            <p className="max-w-[268px] text-center text-base font-normal lg:text-start">
              See how you can start earning from tokenized real estate
            </p>
          </div>
          <div
            ref={cardsWrapperRef}
            className="no-scrollbar relative w-full overflow-hidden py-16 whitespace-nowrap"
          >
            <div ref={innerCardsContainerRef} className="flex w-fit">
              {howData.map((data, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    howCardsRef.current[idx] = el;
                  }}
                  className="relative mx-6 inline-block w-[343px] pb-8 align-top first:ml-0 md:first:ml-6 lg:w-[393px]"
                >
                  <div
                    className={cn(
                      "flex items-start justify-start overflow-hidden rounded-2xl shadow-[0px_4px_20px_0px_#0000000D]",
                      idx % 2 !== 0 ? "flex-col-reverse" : "flex-col",
                    )}
                  >
                    <div className="col-start gap-2 px-5 py-6">
                      <h4 className="text-Orange-500 text-2xl font-bold md:text-3xl">
                        0{idx + 1}.
                      </h4>
                      <h3 className="text-lg font-semibold whitespace-normal md:text-2xl">
                        {data.title}
                      </h3>
                      <p className="text-base font-normal whitespace-normal">
                        {data.desc}
                      </p>
                    </div>
                    <Image
                      src={data.imageSrc}
                      alt="how image"
                      className="max-h-[226px] w-full lg:max-h-[294px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-center w-full">
          <BaseButton href="/user" className="w-full px-8 !text-base lg:w-fit">
            Get Started
          </BaseButton>
        </div>
      </div>
    </section>
  );
}
