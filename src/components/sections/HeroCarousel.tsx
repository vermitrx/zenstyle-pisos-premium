"use client";

import { useEffect, useState } from "react";
import LeadCaptureModal from "@/components/modals/LeadCaptureModal";

type HeroImageSourceSet = {
  png?: string;
  avif?: string;
  webp?: string;
};

type HeroImageSources = {
  mobile: HeroImageSourceSet;
  desktop: HeroImageSourceSet;
};

type HeroImage = {
  id: string;
  alt: string;
  isLcp: boolean;
  sources: HeroImageSources;
};

type ResponsiveHeroImageProps = {
  sources: HeroImageSources;
  alt: string;
  isActive: boolean;
  isLcp: boolean;
};

const HERO_IMAGES: HeroImage[] = [
  {
    id: "hero-01",
    alt: "Sala premium con piso SPC ZenStyle",
    isLcp: true,
    sources: {
      mobile: {
        png: "/images/hero/hero-01-sala-lcp-teaser-mobile.png",
        avif: "/images/hero/hero-01-sala-lcp-mobile.avif",
        webp: "/images/hero/hero-01-sala-lcp-mobile.webp",
      },
      desktop: {
        //png: "/images/hero/hero-01-sala-lcp-teaser-desktop.png",
        avif: "/images/hero/hero-01-sala-lcp-desktop.avif",
        webp: "/images/hero/hero-01-sala-lcp-desktop.webp",
      },
    },
  },
  {
    id: "hero-02",
    alt: "Interior oficina corporativa moderna con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        png: "/images/hero/hero-02-oficina-teaser-mobile.png",
        avif: "/images/hero/hero-02-oficina-mobile.avif",
        webp: "/images/hero/hero-02-oficina-mobile.webp",
      },
      desktop: {
        png: "/images/hero/hero-02-oficina-teaser-desktop.png",
        avif: "/images/hero/hero-02-oficina-desktop.avif",
        webp: "/images/hero/hero-02-oficina-desktop.webp",
      },
    },
  },
  {
    id: "hero-03",
    alt: "Recámara principal con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        png: "/images/hero/hero-03-recamara-ppal-teaser-mobile.png",
        avif: "/images/hero/hero-03-recamara-ppal-mobile.avif",
        webp: "/images/hero/hero-03-recamara-ppal-mobile.webp",
      },
      desktop: {
        png: "/images/hero/hero-03-recamara-ppal-teaser-desktop.png",
        avif: "/images/hero/hero-03-recamara-ppal-desktop.avif",
        webp: "/images/hero/hero-03-recamara-ppal-desktop.webp",
      },
    },
  },
  {
    id: "hero-04",
    alt: "Lobby de consultorios con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        png: "/images/hero/hero-04-lobby-teaser-mobile.png",
        avif: "/images/hero/hero-04-lobby-mobile.avif",
        webp: "/images/hero/hero-04-lobby-mobile.webp",
      },
      desktop: {
        png: "/images/hero/hero-04-lobby-teaser-desktop.png",
        avif: "/images/hero/hero-04-lobby-desktop.avif",
        webp: "/images/hero/hero-04-lobby-desktop.webp",
      },
    },
  },
  {
    id: "hero-05",
    alt: "Recámara infantil con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        png: "/images/hero/hero-05-recamara-infantil-teaser-mobile.png",
        avif: "/images/hero/hero-05-recamara-infantil-mobile.avif",
        webp: "/images/hero/hero-05-recamara-infantil-mobile.webp",
      },
      desktop: {
        png: "/images/hero/hero-05-recamara-infantil-teaser-desktop.png",
        avif: "/images/hero/hero-05-recamara-infantil-desktop.avif",
        webp: "/images/hero/hero-05-recamara-infantil-desktop.webp",
      },
    },
  },
{
    id: "hero-06",
    alt: "Cocina con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        png: "/images/hero/hero-06-cocina-teaser-mobile.png",
        avif: "/images/hero/hero-06-cocina-mobile.avif",
        webp: "/images/hero/hero-06-cocina-mobile.webp",
      },
      desktop: {
        png: "/images/hero/hero-06-cocina-teaser-desktop.png",
        avif: "/images/hero/hero-06-cocina-desktop.avif",
        webp: "/images/hero/hero-06-cocina-desktop.webp",
      },
    },
  }
];

function getPreferredSrc(sourceSet: HeroImageSourceSet) {
  return sourceSet.png ?? sourceSet.avif ?? sourceSet.webp;
}

function ResponsiveHeroImage({
  sources,
  alt,
  isActive,
  isLcp,
}: ResponsiveHeroImageProps) {
  const fallbackSrc = getPreferredSrc(sources.desktop) ?? getPreferredSrc(sources.mobile);

  if (!fallbackSrc) return null;

  return (
    <picture>
      {sources.desktop.png && (
        <source
          type="image/png"
          media="(min-width: 768px)"
          srcSet={sources.desktop.png}
        />
      )}

      {sources.desktop.avif && (
        <source
          type="image/avif"
          media="(min-width: 768px)"
          srcSet={sources.desktop.avif}
        />
      )}

      {sources.desktop.webp && (
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet={sources.desktop.webp}
        />
      )}

      {sources.mobile.png && <source type="image/png" srcSet={sources.mobile.png} />}

      {sources.mobile.avif && (
        <source type="image/avif" srcSet={sources.mobile.avif} />
      )}

      {sources.mobile.webp && (
        <source type="image/webp" srcSet={sources.mobile.webp} />
      )}

      <img
        src={fallbackSrc}
        alt={alt}
        loading={isLcp ? "eager" : "lazy"}
        fetchPriority={isLcp ? "high" : "auto"}
        decoding={isLcp ? "sync" : "async"}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </picture>
  );
}

export default function HeroCarrouselTeaser() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [canLoadSecondaryImages, setCanLoadSecondaryImages] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const secondaryImagesTimer = window.setTimeout(() => {
      setCanLoadSecondaryImages(true);
    }, 1500);

    return () => window.clearTimeout(secondaryImagesTimer);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setCurrentIndex((prev) =>
        prev === HERO_IMAGES.length - 1 ? 0 : prev + 1,
      );
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <>
      <main className="w-full overflow-x-hidden">
        <section
          className="relative h-svh min-h-155 w-full overflow-hidden bg-neutral-950 md:h-screen md:min-h-180"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {HERO_IMAGES.map((image, index) => {
            const isLcpImage = index === 0;
            const shouldRenderImage =
              isLcpImage || canLoadSecondaryImages || index === currentIndex;

            if (!shouldRenderImage) return null;

            return (
              <ResponsiveHeroImage
                key={image.id}
                sources={image.sources}
                alt={image.alt}
                isActive={index === currentIndex}
                isLcp={isLcpImage}
              />
            );
          })}

          <div className="absolute inset-0 z-10 bg-black/35 md:bg-black/30" />

          <div className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-center">
            <div className="mx-auto flex w-full max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className="flex max-w-xl translate-y-[-8vh] flex-col items-center text-center text-white md:ml-[8%] md:items-center md:text-center lg:ml-[2%] xl:ml-[12%]">
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.32em] text-white/95 sm:text-base sm:tracking-[0.38em] md:mb-6 md:text-lg md:tracking-[0.42em]">
                  Premium SPC Floors 2026
                </p>

                <h1 className="text-4xl font-light uppercase tracking-[0.16em] sm:text-5xl sm:tracking-[0.18em] md:text-7xl md:tracking-[0.22em] lg:text-8xl">
                  ZenStyle
                </h1>

                <p className="mt-5 max-w-85 text-base font-normal leading-7 tracking-wider text-white/90 drop-shadow-md sm:max-w-md sm:text-lg sm:leading-8 md:mt-6 md:max-w-xl md:text-xl md:leading-9 md:tracking-[0.06em]">
                  Superficies premium para interiores contemporáneos, elegantes
                  y de alto desempeño.
                </p>

                <button
                  type="button"
                  onClick={() => setIsLeadModalOpen(true)}
                  className="pointer-events-auto mt-8 rounded-[5px] border border-white/50 bg-black/35 px-6 py-3 text-[11px] font-light uppercase tracking-[0.18em] text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-white hover:bg-white hover:text-neutral-950 sm:px-8 sm:py-4 sm:text-sm sm:tracking-[0.22em] md:mt-10"
                >
                  Descarga Brochure
                </button>
              </div>
            </div>
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
