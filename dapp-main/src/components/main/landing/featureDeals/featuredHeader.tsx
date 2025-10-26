"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function FeaturedHeader() {
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
    <div ref={sectionRef}>
      <div ref={titleConRef}>
        <h2 className="lg:tex-start text-center text-3xl font-bold lg:text-[40px] lg:leading-[100%]">
          Featured Deals
        </h2>
        <p className="text-center text-base font-normal">
          Curated opportunities with clear yield targets and hold periods.
        </p>
      </div>
    </div>
  );
}
