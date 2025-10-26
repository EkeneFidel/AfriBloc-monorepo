"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react"; // Added useState and useEffect
import HeroImage from "/public/images/hero-video-thumbnail.png";
import Partner1 from "/public/svgs/doahq.svg";
import Partner2 from "/public/svgs/hedera.svg";
import BaseButton from "@/components/ui/buttons/base-button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="lg:p-4">
      <div className="text-Gray-900 overflow-hidden bg-white bg-[url(/svgs/hero-bg.svg)] bg-cover bg-no-repeat px-2 py-26 lg:rounded-2xl lg:px-14 lg:pt-40">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex size-full flex-col justify-center gap-4 lg:items-start">
            <h1 className="text-center text-4xl font-bold md:text-6xl md:leading-[120%] lg:text-start">
              Global Access to <br /> Africa’s Prime <br /> Real Estate
            </h1>
            <p className="max-w-[481px] text-center text-sm font-normal lg:text-start lg:text-lg">
              From Lagos to Nairobi, invest in high-growth cities, earn monthly
              dividends from rental income, and share in capital appreciation at
              exit.
            </p>
            <BaseButton
              href="/user"
              className="w-full px-8 !text-base lg:w-fit"
            >
              Own a Bloc
            </BaseButton>
            <div className="flex items-center justify-start lg:gap-2">
              <span className="text-xs font-normal">
                Strategic Partnerships
              </span>
              <div className="flex items-center justify-start gap-2">
                <Link href="http://doahq.com/home" target="_blank">
                  <Image src={Partner1} alt="partner image" className="" />
                </Link>
                <Link href="https://hedera.com/" target="_blank">
                  <Image src={Partner2} alt="partner image" className="" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative flex w-full items-center justify-center lg:items-end lg:justify-end">
            <video
              ref={videoRef}
              src="/videos/DOA_Afribloc.mp4"
              poster={HeroImage.src}
              loop
              playsInline
              muted={isMuted}
              className="w-full cursor-pointer rounded-lg"
              onClick={togglePlayPause}
            />
            <button
              onClick={togglePlayPause}
              className={cn(
                "absolute left-1/2 -translate-x-1/2 rounded-full bg-black/50 p-4 text-white transition-all duration-200 lg:top-1/2",
                isPlaying ? "opacity-0" : "opacity-100",
              )}
            >
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={toggleMute}
              className="bg-opacity-50 absolute right-4 bottom-4 rounded-full bg-black/50 p-2 text-white"
            >
              {isMuted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.293 17.293A8 8 0 016.707 6.707m10.586 10.586L6.707 6.707M12 17a4 4 0 004-4V9a4 4 0 10-8 0v4a4 4 0 004 4z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.536 8.464A10.003 10.003 0 0012 5V2a10 10 0 013.536 6.464zm-2.545 11.313A9.998 9.998 0 0112 19v3a10 10 0 002.985-1.607l-2.498-2.498zM5.071 9.071a10.003 10.003 0 000 5.858l-2.498 2.498A10 10 0 012 12a10 10 0 013.071-5.858zM12 13a3 3 0 100-6 3 3 0 000 6z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
