"use client";
import BaseButton from "@/components/ui/buttons/base-button";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function GetStarted() {
  const sectionRef = useRef(null);
  const titleConRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // H2 animation
      gsap.fromTo(
        titleConRef.current,
        { y: -150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
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
      ref={sectionRef}
      className="bg-Purple-900/60 flex flex-col items-center justify-center gap-6 bg-[image:linear-gradient(to_right,#28103F99,#28103F99),url('/images/get-started.jpg')] bg-cover bg-center py-24 text-white md:gap-8"
    >
      <h2
        ref={titleConRef}
        className="max-w-[562px] text-center text-3xl font-bold lg:text-start lg:text-[40px] lg:leading-[100%]"
      >
        Start building your African real-estate portfolio today.
      </h2>
      <BaseButton href="/user" className="px-8 !text-base">
        Get Started
      </BaseButton>
    </section>
  );
}
