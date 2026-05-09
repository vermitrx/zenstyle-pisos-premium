import Image from "next/image";

/**
 * FeaturesSection
 * -----------------------------------------------------------------------------
 * Nombre técnico del componente: FeaturesSection
 * Nombre comercial visible: Beneficios SPC
 *
 * Objetivo:
 * Comunicar los beneficios principales de los pisos SPC de Zen Style mediante
 * una composición editorial premium: imagen showroom + panel curvo + cards.
 *
 * Notas de mantenimiento:
 * - La sección es autónoma y no depende de HeroCarousel.
 * - Las cards NO son interactivas. Evitar cursor-pointer, chevrons o hover states.
 * - El CTA sí puede conectarse después a modal, formulario o ancla.
 * - Las imágenes de fondo viven en /public/images/features/.
 * - Los íconos ahora son PNG transparentes y viven en /public/icons/features/.
 * - La tipografía debe venir desde variables/globales del proyecto, no desde aquí.
 */

type FeatureTone = "dark" | "light" | "taupe";

type Feature = {
  title: string;
  description: string;
  tone: FeatureTone;

  /**
   * Ruta pública del ícono PNG.
   * Al estar dentro de /public, se referencia desde la raíz:
   * /icons/features/nombre-del-icono.png
   */
  icon: string;
};

const features: Feature[] = [
  {
    title: "Apariencia tipo madera premium",
    description:
      "La calidez visual de la madera con acabados modernos, elegantes y fáciles de integrar a distintos estilos de interiorismo.",
    tone: "dark",
    icon: "/icons/features/icon-wood-premium.png",
  },
  {
    title: "Resistencia al agua",
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
    title: "Instalación práctica",
    description:
      "Una forma eficiente de renovar tus espacios con menor complejidad frente a otros materiales.",
    tone: "light",
    icon: "/icons/features/icon-easy-installation.png",
  },
  {
    title: "Para hogar y comercio",
    description:
      "Una solución versátil para residencias, oficinas, showrooms, locales y proyectos de interiorismo.",
    tone: "taupe",
    icon: "/icons/features/icon-home-commercial.png",
  },
];

/**
 * toneStyles
 * -----------------------------------------------------------------------------
 * Controla la apariencia visual de cada card según su tono.
 *
 * card:
 *   Fondo, borde, color de texto y sombra de la tarjeta.
 *
 * badge:
 *   Contenedor circular del ícono. Aunque el ícono sea PNG, la profundidad,
 *   sombra y ring se controlan aquí.
 *
 * description:
 *   Color del copy descriptivo.
 *
 * Nota:
 * Ya no existe styles.icon porque el color del ícono viene integrado en el PNG.
 */
const toneStyles: Record<
  FeatureTone,
  {
    card: string;
    badge: string;
    description: string;
  }
> = {
  dark: {
    card: "border-[#7B5339]/35 bg-[#684128] text-[#FFF7EC] shadow-[0_22px_45px_rgba(62,38,24,0.28)]",
    badge:
      "bg-[#8A654B] shadow-[0_14px_28px_rgba(31,20,14,0.28)] ring-1 ring-[#F8E6CF]/22",
    description: "text-[#FFF7EC]/78",
  },
  light: {
    card: "border-[#D0B79D]/65 bg-[#FFF8EF] text-[#2E2118] shadow-[0_18px_38px_rgba(87,62,42,0.14)]",
    badge:
      "bg-[#E9D9C4] shadow-[0_13px_26px_rgba(87,62,42,0.20)] ring-1 ring-white/55",
    description: "text-[#6A584A]",
  },
  taupe: {
    card: "border-[#B99D80]/60 bg-[#D4BDA4] text-[#2F2118] shadow-[0_20px_42px_rgba(87,62,42,0.19)]",
    badge:
      "bg-[#8F755C] shadow-[0_14px_30px_rgba(49,32,22,0.26)] ring-1 ring-white/28",
    description: "text-[#4E3D31]",
  },
};

export default function FeaturesSection() {
  return (
    <section
      id="beneficios"
      className="relative overflow-hidden bg-white text-[#2E2118]"
    >
      {/*
        Contenedor general de la sección.
        py controla el aire exterior de la sección respecto a secciones vecinas.
        Ajustar aquí si la sección se siente demasiado encimada.
      */}
      <div className="relative overflow-hidden bg-[#201711] py-10 lg:pl-5 lg:min-h-screen">
        {/*
          Imagen mobile / tablet vertical.
          Se muestra hasta antes de lg.
          El contenido/panel se coloca debajo con curva superior.
        */}
        <div className="relative h-[390px] w-full md:h-[520px] lg:hidden">
          <Image
            src="/images/features/features-showroom-mobile.webp"
            alt="Estancia premium con piso SPC Zen Style"
            fill
            priority={false}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Overlay para integrar visualmente imagen con panel crema */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/0 to-[#F4E6D7]" />
        </div>

        {/*
          Imagen desktop / tablet horizontal.
          Vive al fondo, lado derecho.
          El panel curvo se monta por encima desde la izquierda.
        */}
        <div className="absolute inset-y-0 right-0 hidden w-[56%] lg:block">
          <Image
            src="/images/features/features-showroom-desktop.webp"
            alt="Showroom Zen Style con piso SPC instalado"
            fill
            priority={false}
            sizes="56vw"
            className="object-cover object-center"
          />

          {/* Overlay sutil para mejorar integración con el panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#201711]/15 via-transparent to-black/5" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1440px] lg:min-h-screen">
          {/*
            Panel principal curvo.
            before y after crean los biseles/líneas interiores que dan sensación
            de placa editorial y profundidad, similar al mockup aprobado.
          */}
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
              before:inset-[8px]
              before:rounded-t-[2.55rem]
              before:border
              before:border-white/55
              before:content-['']
              after:pointer-events-none
              after:absolute
              after:inset-[15px]
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
              md:before:inset-[10px]
              md:before:rounded-t-[3.55rem]
              md:after:inset-[18px]
              md:after:rounded-t-[3.05rem]
              lg:mx-0
              lg:mt-0
              lg:flex
              lg:min-h-screen
              lg:w-[63%]
              lg:items-center
              lg:rounded-none
              lg:rounded-r-[7rem]
              lg:border-y-0
              lg:border-l-0
              lg:border-r
              lg:px-14
              lg:py-16
              lg:shadow-[34px_0_80px_rgba(38,25,17,0.34)]
              lg:before:inset-[12px]
              lg:before:rounded-none
              lg:before:rounded-r-[6.2rem]
              lg:before:border-[#FFF7EC]/70
              lg:after:inset-[24px]
              lg:after:rounded-none
              lg:after:rounded-r-[5.15rem]
              lg:after:border-[#B99D80]/32
              xl:w-[61%]
              xl:px-16
              2xl:px-18
            "
          >
            {/*
              z-10 mantiene el contenido por encima de los pseudo-elementos
              before/after del panel.
            */}
            <div className="relative z-10 mx-auto w-full max-w-3xl lg:mx-0 lg:max-w-none">
              <header className="mb-8 md:mb-10 lg:mb-9">
                <div className="mb-4 flex items-center gap-4">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#7A5638] md:text-xs">
                    Beneficios SPC
                  </span>
                  <span className="h-px w-12 bg-[#B99D80]" />
                </div>

                <h2 className="max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-[#2E2118] md:text-5xl lg:text-[4.4rem] lg:leading-[0.96] xl:text-[4.85rem]">
                  Diseño premium para la vida real
                </h2>

                <p className="mt-5 max-w-xl text-base leading-7 text-[#6A584A] md:text-lg lg:mt-6 lg:max-w-2xl">
                  La apariencia cálida de la madera, con la resistencia y
                  practicidad que exigen los espacios modernos.
                </p>
              </header>

              {/*
                Grid de beneficios.
                Mobile: 1 columna.
                Tablet en adelante: 2 columnas.
                Las cards no son interactivas.
              */}
              <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:gap-5 xl:gap-6">
                {features.map((feature) => (
                  <FeatureCard key={feature.title} feature={feature} />
                ))}
              </div>

              <footer className="mt-8 border-t border-[#B99D80]/55 pt-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8 lg:mt-9">
                <p className="max-w-md text-sm leading-6 text-[#5F4C3D] md:text-base">
                  Una solución pensada para quienes buscan renovar con estilo,
                  funcionalidad y confianza.
                </p>

                {/*
                  CTA real de la sección.
                  Puede conectarse después a:
                  - LeadCaptureModal
                  - formulario
                  - sección #contacto
                  - acción de WhatsApp
                */}
                <a
                  href="#contacto"
                  className="
                    mt-6
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C49A6C]/75
                    bg-[#3A261A]
                    px-7
                    py-4
                    text-sm
                    font-semibold
                    tracking-wide
                    text-[#F8F1E8]
                    shadow-[0_18px_42px_rgba(58,38,26,0.32)]
                    transition-colors
                    duration-300
                    hover:bg-[#2B1B12]
                    md:mt-0
                    md:w-auto
                  "
                >
                  Cotizar mi proyecto
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </a>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const styles = toneStyles[feature.tone];

  return (
    <article
      className={`
        relative
        min-h-[132px]
        overflow-hidden
        rounded-[1.35rem]
        border
        p-4
        transition-none
        md:min-h-[154px]
        md:p-5
        lg:min-h-[158px]
        xl:min-h-[166px]
        ${styles.card}
      `}
      aria-label={feature.title}
    >
      {/*
        Bisel interno de la card.
        Aporta profundidad sin hacer que la card parezca clickeable.
      */}
      <div
        className="
          pointer-events-none
          absolute
          inset-[1px]
          rounded-[1.28rem]
          border
          border-white/35
        "
        aria-hidden="true"
      />

      {/*
        Highlight superior.
        Simula una línea de luz sobre la tarjeta.
      */}
      <div
        className="
          pointer-events-none
          absolute
          inset-x-5
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-white/50
          to-transparent
        "
        aria-hidden="true"
      />

      <div className="relative z-10 flex gap-4 md:gap-5">
        {/*
          Medallón del ícono.
          El PNG es decorativo; por eso el contenedor es aria-hidden
          y el Image usa alt vacío.
        */}
        <div
          className={`
            flex
            h-[52px]
            w-[52px]
            shrink-0
            items-center
            justify-center
            rounded-full
            md:h-[60px]
            md:w-[60px]
            ${styles.badge}
          `}
          aria-hidden="true"
        >
          <Image
            src={feature.icon}
            alt=""
            width={48}
            height={48}
            className="h-[40px] w-[40px] object-contain md:h-[46px] md:w-[46px]"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-semibold leading-snug tracking-[-0.02em] md:text-lg">
            {feature.title}
          </h3>

          <p className={`mt-2 text-sm leading-6 ${styles.description}`}>
            {feature.description}
          </p>
        </div>
      </div>
    </article>
  );
}
