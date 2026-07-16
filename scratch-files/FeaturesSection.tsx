"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * FeaturesSection
 * -----------------------------------------------------------------------------
 * Nombre técnico del componente: FeaturesSection
 * Nombre comercial visible: Beneficios SPC
 *
 * Objetivo:
 * Comunicar los beneficios principales de los pisos SPC de Zen Style mediante
 * una composición editorial premium: imagen showroom + bloque de contenido curvo
 * + cards interactivas.
 *
 * Lógica interactiva:
 * - Las cards funcionan como flip cards.
 * - Solo una card puede estar activa a la vez.
 * - Click/tap en una card cerrada: se voltea.
 * - Click/tap en la card activa: regresa al frente.
 * - Al activar otra card, la anterior se cierra automáticamente.
 *
 * Ajuste actual:
 * - En desktop, el alto queda contenido en el viewport con lg:h-dvh.
 * - Se agrega aire superior/inferior en lg con lg:py-1.5.
 * - Se reduce el margen izquierdo en lg con lg:pl-1.5.
 * - Se elimina el centrado max-w en desktop para evitar margen negro excesivo.
 */

type FeatureTone = "dark" | "light" | "taupe";

type Feature = {
  title: string;
  description: string;
  tone: FeatureTone;
  icon: string;
};

const features: Feature[] = [
  {
    title: "Apariencia tipo madera",
    description:
      "La calidez visual de la madera con acabados modernos, elegantes y fáciles de integrar a distintos estilos de interiorismo.",
    tone: "dark",
    icon: "/icons/features/icon-wood-premium.png",
  },
  {
    title: "Resistente al agua",
    description:
      "Ideal para espacios donde la vida sucede: cocina, comedor, sala, oficinas o áreas de alto tránsito.",
    tone: "light",
    icon: "/icons/features/icon-water-resistant.png",
  },
  {
    title: "Durabilidad para uso diario",
    description:
      "Preparado para acompañar la actividad cotidiana sin perder presencia, estilo ni funcionalidad.",
    tone: "taupe",
    icon: "/icons/features/icon-durability.png",
  },
  {
    title: "Fácil mantenimiento",
    description:
      "Limpieza práctica, menor esfuerzo y una apariencia cuidada por más tiempo.",
    tone: "light",
    icon: "/icons/features/icon-easy-clean.png",
  },
  {
    title: "Fácil instalación",
    description:
      "Una forma eficiente de renovar tus espacios con menor complejidad frente a otros materiales.",
    tone: "light",
    icon: "/icons/features/icon-easy-installation.png",
  },
  {
    title: "Para hogar, oficinas y comercio",
    description:
      "Una solución versátil para residencias, oficinas, showrooms, locales y proyectos de interiorismo.",
    tone: "taupe",
    icon: "/icons/features/icon-home-commercial.png",
  },
];

const toneStyles: Record<
  FeatureTone,
  {
    card: string;
    badge: string;
    title: string;
    description: string;
    back: string;
    hint: string;
  }
> = {
  dark: {
    card: "border-[#7B5339]/35 bg-[#684128] text-[#FFF7EC] shadow-[0_22px_45px_rgba(62,38,24,0.28)]",
    badge:
      "bg-[#8A654B] shadow-[0_14px_28px_rgba(31,20,14,0.28)] ring-1 ring-[#F8E6CF]/25",
    title: "text-[#FFF7EC]",
    description: "text-[#FFF7EC]/82",
    back: "bg-[#684128]",
    hint: "text-[#F8E6CF]/75",
  },
  light: {
    card: "border-[#D0B79D]/65 bg-[#FFF8EF] text-[#2E2118] shadow-[0_18px_38px_rgba(87,62,42,0.14)]",
    badge:
      "bg-[#E9D9C4] shadow-[0_13px_26px_rgba(87,62,42,0.20)] ring-1 ring-white/60",
    title: "text-[#2E2118]",
    description: "text-[#6A584A]",
    back: "bg-[#FFF8EF]",
    hint: "text-[#7A5638]/75",
  },
  taupe: {
    card: "border-[#B99D80]/60 bg-[#D4BDA4] text-[#2F2118] shadow-[0_20px_42px_rgba(87,62,42,0.19)]",
    badge:
      "bg-[#8F755C] shadow-[0_14px_30px_rgba(49,32,22,0.26)] ring-1 ring-white/30",
    title: "text-[#2F2118]",
    description: "text-[#4E3D31]",
    back: "bg-[#D4BDA4]",
    hint: "text-[#5A3924]/75",
  },
};

export default function FeaturesSection() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState<number | null>(
    null,
  );

  function handleFeatureToggle(index: number) {
    setActiveFeatureIndex((currentIndex) =>
      currentIndex === index ? null : index,
    );
  }

  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-white text-[#2E2118]"
    >
      <div className="relative overflow-hidden bg-[#201711] py-5 lg:h-dvh lg:py-1.5 lg:pl-1.5">
        {/* Imagen mobile / tablet vertical */}
        <div className="relative h-96 w-full md:h-128 lg:hidden">
          <Image
            src="/images/features/features-showroom-mobile.webp"
            alt="Estancia premium con piso SPC Zen Style"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/5 via-black/0 to-[#F4E6D7]" />
        </div>

        {/* Imagen desktop / tablet horizontal */}
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
          <Image
            src="/images/features/features-showroom-desktop.webp"
            alt="Showroom Zen Style con piso SPC instalado"
            fill
            priority={false}
            sizes="56vw"
            className="object-cover object-center"
          />

          <div className="absolute inset-0 bg-linear-to-r from-[#201711]/15 via-transparent to-black/5" />
        </div>

        <div className="relative z-10 w-full lg:h-full">
          <div
            className="
              relative
              -mt-14
              overflow-hidden
              rounded-t-[3rem]
              border border-[#F8ECDD]/80
              bg-[#F4E6D7]
              px-5
              pb-10
              pt-10
              shadow-[0_-28px_70px_rgba(38,25,17,0.28)]
              before:pointer-events-none
              before:absolute
              before:inset-2
              before:rounded-t-[2.55rem]
              before:border
              before:border-white/55
              before:content-['']
              after:pointer-events-none
              after:absolute
              after:inset-4
              after:rounded-t-[2.15rem]
              after:border
              after:border-[#B99D80]/26
              after:content-['']
              md:-mt-24
              md:mx-7
              md:rounded-t-[4.25rem]
              md:px-10
              md:pb-14
              md:pt-12
              md:before:inset-2.5
              md:before:rounded-t-[3.55rem]
              md:after:inset-4
              md:after:rounded-t-[3.05rem]
              lg:mx-0
              lg:mt-0
              lg:flex
              lg:h-full
              lg:w-[63%]
              lg:items-center
              lg:rounded-none
              lg:rounded-r-[7rem]
              lg:border-y-0
              lg:border-l-0
              lg:border-r
              lg:px-12
              lg:py-7
              lg:shadow-[34px_0_80px_rgba(38,25,17,0.34)]
              lg:before:inset-3
              lg:before:rounded-none
              lg:before:rounded-r-[6.2rem]
              lg:before:border-[#FFF7EC]/70
              lg:after:inset-6
              lg:after:rounded-none
              lg:after:rounded-r-[5.15rem]
              lg:after:border-[#B99D80]/32
              xl:w-[61%]
              xl:px-14
              2xl:px-16
            "
          >
            <div className="relative z-10 mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none">
              <header className="mb-6 md:mb-8 lg:mb-5 xl:mb-6">
                <div className="mb-3 flex items-center gap-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.36em] text-[#7A5638]">
                    Beneficios SPC
                  </span>
                  <span className="h-px w-12 bg-[#B99D80]" />
                </div>

                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#2E2118] md:text-5xl lg:text-6xl lg:leading-[0.96] xl:text-7xl">
                  Diseño premium para la vida real
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-6 text-[#6A584A] md:text-base md:leading-7 lg:max-w-2xl">
                  La apariencia cálida de la madera, con la resistencia y
                  practicidad que exigen los espacios modernos.
                </p>
              </header>

              <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-4 xl:gap-5">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    isActive={activeFeatureIndex === index}
                    onToggle={() => handleFeatureToggle(index)}
                  />
                ))}
              </div>

              <footer className="mt-4 border-t border-[#B99D80]/55 pt-3 md:mt-5 lg:mt-4">
                <p className="max-w-none text-sm leading-6 text-[#5F4C3D] lg:max-w-5xl">
                  Una solución pensada para quienes buscan renovar con estilo,
                  funcionalidad y confianza.
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  feature: Feature;
  isActive: boolean;
  onToggle: () => void;
};

function FeatureCard({ feature, isActive, onToggle }: FeatureCardProps) {
  const styles = toneStyles[feature.tone];

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isActive}
      aria-label={`${feature.title}. ${
        isActive ? "Ocultar detalle" : "Ver detalle"
      }`}
      className="
        group
        relative
        block
        h-52
        w-full
        rounded-[1.35rem]
        text-left
        outline-none
        perspective-[1000px]
        focus-visible:ring-2
        focus-visible:ring-[#C49A6C]
        focus-visible:ring-offset-2
        focus-visible:ring-offset-[#F4E6D7]
        md:h-56
        lg:h-40
        xl:h-44
        2xl:h-48
      "
    >
      <div
        className={`
          relative
          h-full
          w-full
          rounded-[1.35rem]
          transition-transform
          duration-500
          ease-out
          transform-3d
          ${isActive ? "transform-[rotateY(180deg)]" : ""}
        `}
      >
        {/* Frente */}
        <div
          className={`
            absolute
            inset-0
            overflow-hidden
            rounded-[1.35rem]
            border
            p-4
            backface-hidden
            ${styles.card}
          `}
        >
          <CardSurfaceDetails />

          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
            <div
              className={`
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-full
                md:h-18
                md:w-18
                lg:h-16
                lg:w-16
                xl:h-18
                xl:w-18
                ${styles.badge}
              `}
              aria-hidden="true"
            >
              <Image
                src={feature.icon}
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 object-contain md:h-12 md:w-12 lg:h-11 lg:w-11 xl:h-12 xl:w-12"
              />
            </div>

            <h3
              className={`mt-4 max-w-60 text-lg font-semibold leading-tight tracking-[-0.02em] md:text-xl lg:mt-3 lg:text-lg xl:text-xl ${styles.title}`}
            >
              {feature.title}
            </h3>

            <span
              className={`mt-3 self-stretch text-right text-xs font-semibold uppercase tracking-[0.18em] ${styles.hint}`}
            >
              Ver detalle
            </span>
          </div>
        </div>

        {/* Reverso */}
        <div
          className={`
            absolute
            inset-0
            overflow-hidden
            rounded-[1.35rem]
            border
            p-4
            backface-hidden
            transform-[rotateY(180deg)]
            ${styles.card}
            ${styles.back}
          `}
        >
          <CardSurfaceDetails />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <h3
                className={`text-center text-base font-semibold leading-tight tracking-[-0.02em] md:text-lg lg:text-base xl:text-lg ${styles.title}`}
              >
                {feature.title}
              </h3>

              <p
                className={`mt-3 text-center text-sm leading-6 lg:mt-2 lg:leading-5 xl:leading-6 ${styles.description}`}
              >
                {feature.description}
              </p>
            </div>

            <span
              className={`mt-3 text-xs font-semibold uppercase tracking-[0.18em] ${styles.hint}`}
            >
              Tocar para volver
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function CardSurfaceDetails() {
  return (
    <>
      <div
        className="
          pointer-events-none
          absolute
          inset-px
          rounded-[1.28rem]
          border
          border-white/35
        "
        aria-hidden="true"
      />

      <div
        className="
          pointer-events-none
          absolute
          inset-x-5
          top-0
          h-px
          bg-linear-to-r
          from-transparent
          via-white/50
          to-transparent
        "
        aria-hidden="true"
      />
    </>
  );
}