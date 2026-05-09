"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import LeadCaptureModal from "@/components/modals/LeadCaptureModal";

const IMAGES = [
  "/images/hero/piso1.avif",
  "/images/hero/piso2.avif",
  "/images/hero/piso3.avif",
  "/images/hero/piso4.avif",
  "/images/hero/piso5.jpg",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === IMAGES.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <>
      <main className="w-full overflow-x-hidden">
        <section
          className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-neutral-950 md:h-screen md:min-h-[720px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {IMAGES.map((src, index) => (
            <div
              key={src}
              className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`ZenStyle Premium Floor ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 z-10 bg-black/35 md:bg-black/30" />

          <div className="relative z-20 flex h-full w-full flex-col items-center justify-center px-6 text-center text-white sm:px-8 lg:px-12">
            <p className="mb-4 text-[10px] font-light uppercase tracking-[0.28em] text-white/90 sm:text-xs sm:tracking-[0.35em] md:mb-5 md:text-sm md:tracking-[0.45em]">
              Premium Floors 2026
            </p>

            <h1 className="text-4xl font-light uppercase tracking-[0.16em] sm:text-5xl sm:tracking-[0.18em] md:text-7xl md:tracking-[0.22em] lg:text-8xl">
              ZenStyle
            </h1>

            <p className="mt-5 max-w-[320px] text-sm font-light leading-relaxed text-white/80 sm:max-w-md sm:text-base md:mt-6 md:max-w-xl md:text-lg">
              Superficies premium para interiores contemporáneos, elegantes y de
              alto desempeño.
            </p>

            <button
              type="button"
              onClick={() => setIsLeadModalOpen(true)}
              className="mt-8 rounded-[5px] border border-white/50 bg-black/35 px-6 py-3 text-[11px] font-light uppercase tracking-[0.18em] text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-neutral-950 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.22em] md:mt-10"
            >
              Descarga Brochure
            </button>
          </div>

          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/35 text-3xl font-light text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-neutral-950 sm:left-5 sm:h-12 sm:w-12 md:left-6 md:h-14 md:w-14 md:text-4xl"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Imagen siguiente"
            className="absolute right-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/35 text-3xl font-light text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-neutral-950 sm:right-5 sm:h-12 sm:w-12 md:right-6 md:h-14 md:w-14 md:text-4xl"
          >
            ›
          </button>
        </section>
      </main>

      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        formType="brochure"
      />
    </>
  );
}