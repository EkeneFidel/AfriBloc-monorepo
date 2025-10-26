import { gsap } from "gsap";
import ScrollSmoother from "gsap/dist/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export { gsap, ScrollTrigger, ScrollSmoother };
