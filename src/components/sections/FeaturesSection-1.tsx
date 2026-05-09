import Image from "next/image";
import { WoodPremiumIcon } from "@/components/icons/features/WoodPremiumIcon";
import { WaterResistantIcon } from "@/components/icons/features/WaterResistantIcon";
import { DurabilityIcon } from "@/components/icons/features/DurabilityIcon";
import { EasyCleanIcon } from "@/components/icons/features/EasyCleanIcon";
import { InstallationIcon } from "@/components/icons/features/InstallationIcon";
import { HomeCommercialIcon } from "@/components/icons/features/HomeCommercialIcon";

type FeatureTone = "dark" | "light" | "taupe";

type Feature = {
  title: string;
  description: string;
  tone: FeatureTone;
  icon: React.ComponentType<{ className?: string }>;
};

const features: Feature[] = [
  {
    title: "Apariencia tipo madera premium",
    description:
      "La calidez visual de la madera con acabados modernos, elegantes y fáciles de integrar a distintos estilos de interiorismo.",
    tone: "dark",
    icon: WoodPremiumIcon,
  },
  {
    title: "Resistencia al agua",
    description:
      "Ideal para espacios donde la vida sucede: cocina, comedor, sala, oficinas o áreas de alto tránsito.",
    tone: "light",
    icon: WaterResistantIcon,
  },
  {
    title: "Durabilidad para uso diario",
    description:
      "Preparado para acompañar la actividad cotidiana sin perder presencia, estilo ni funcionalidad.",
    tone: "taupe",
    icon: DurabilityIcon,
  },
  {
    title: "Fácil mantenimiento",
    description:
      "Limpieza práctica, menor esfuerzo y una apariencia cuidada por más tiempo.",
    tone: "dark",
    icon: EasyCleanIcon,
  },
  {
    title: "Instalación práctica",
    description:
      "Una forma eficiente de renovar tus espacios con menor complejidad frente a otros materiales.",
    tone: "light",
    icon: InstallationIcon,
  },
  {
    title: "Para hogar y comercio",
    description:
      "Una solución versátil para residencias, oficinas, showrooms, locales y proyectos de interiorismo.",
    tone: "taupe",
    icon: HomeCommercialIcon,
  },
];

const toneStyles: Record<
  FeatureTone,
  {
    card: string;
    badge: string;
    icon: string;
  }
> = {
  dark: {
    card: "border-[#5A3924]/25 bg-[#5A3924] text-[#F8F1E8] shadow-[0_18px_45px_rgba(42,25,14,0.22)]",
    badge: "bg-[#F8F1E8]/12 text-[#F4DFC6]",
    icon: "text-[#F4DFC6]",
  },
  light: {
    card: "border-[#CBB79F]/45 bg-[#FFF9F1] text-[#2E2118] shadow-[0_16px_35px_rgba(78,54,35,0.12)]",
    badge: "bg-[#EADCCB] text-[#6B442A]",
    icon: "text-[#6B442A]",
  },
  taupe: {
    card: "border-[#B99D80]/40 bg-[#D8C2AA] text-[#2F2118] shadow-[0_16px_35px_rgba(78,54,35,0.16)]",
    badge: "bg-[#4B3222] text-[#F4DFC6]",
    icon: "text-[#F4DFC6]",
  },
};

export default function FeaturesSection() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-[#1F1712] py-10 text-[#2E2118] md:py-14 lg:min-h-screen lg:py-0"
    >
      {/* Imagen mobile / tablet vertical */}
      <div className="relative h-[420px] w-full md:h-[520px] lg:hidden">
        <Image
          src="/images/features/features-showroom-mobile.webp"
          alt="Estancia premium con piso SPC Zen Style"
          fill
          priority={false}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-[#F4E7D8]" />
      </div>

      {/* Imagen desktop / tablet horizontal */}
      <div className="absolute inset-y-0 right-0 hidden w-[58%] lg:block">
        <Image
          src="/images/features/features-showroom-desktop.webp"
          alt="Showroom Zen Style con piso SPC instalado"
          fill
          priority={false}
          sizes="58vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/0 to-[#1F1712]/20" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] lg:min-h-screen">
        <div className="relative -mt-16 rounded-t-[3rem] bg-[#F4E7D8] px-5 pb-10 pt-10 shadow-[0_-28px_60px_rgba(28,18,12,0.22)] md:-mt-24 md:mx-8 md:rounded-t-[4rem] md:px-10 md:pb-14 md:pt-12 lg:mx-0 lg:mt-0 lg:flex lg:min-h-screen lg:w-[58%] lg:items-center lg:rounded-none lg:rounded-r-[5rem] lg:px-12 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-3xl lg:max-w-none">
            <div className="mb-8 md:mb-10">
              <div className="mb-4 flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-[0.32em] text-[#7A5638]">
                  Beneficios SPC
                </span>
                <span className="h-px w-12 bg-[#B99D80]" />
              </div>

              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.03] tracking-[-0.04em] text-[#2E2118] md:text-5xl lg:text-6xl">
                Diseño premium para la vida real
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#6A584A] md:text-lg">
                La apariencia cálida de la madera, con la resistencia y
                practicidad que exigen los espacios modernos.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 md:gap-5">
              {features.map((feature) => (
                <FeatureCard key={feature.title} feature={feature} />
              ))}
            </div>

            <div className="mt-8 border-t border-[#CBB79F]/70 pt-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8">
              <p className="max-w-md text-sm leading-6 text-[#6A584A] md:text-base">
                Una solución pensada para quienes buscan renovar con estilo,
                funcionalidad y confianza.
              </p>

              <a
                href="#contacto"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-[#C49A6C]/70 bg-[#3A261A] px-7 py-4 text-sm font-semibold tracking-wide text-[#F8F1E8] shadow-[0_18px_40px_rgba(58,38,26,0.28)] transition-colors duration-300 hover:bg-[#2B1B12] md:mt-0 md:w-auto"
              >
                Cotizar mi proyecto
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;
  const styles = toneStyles[feature.tone];

  return (
    <article
      className={`rounded-3xl border p-4 md:p-5 ${styles.card}`}
      aria-label={feature.title}
    >
      <div className="flex gap-4">
        <div
        //  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-black shadow-[8px_3px_10px_rgba(31,35,40,0.38)] ring-1 ring-[#C8A45D]/55 md:h-14 md:w-14"
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4F4032] shadow-[0_10px_22px_rgba(31,35,40,0.38)] ring-2 ring-white/25 md:h-14 md:w-14 ${styles.badge}`}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7 text-[#C8A45D] md:h-8 md:w-8" />
        </div>

        <div>
          <h3 className="text-base font-semibold leading-snug tracking-[-0.02em] md:text-lg">
            {feature.title}
          </h3>

          <p
            className={`mt-2 text-sm leading-6 ${
              feature.tone === "dark" ? "text-[#F8F1E8]/78" : "text-[#6A584A]"
            }`}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </article>
  );
}
