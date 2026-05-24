"use client";

import { useEffect, useState } from "react";
import LeadCaptureModal from "@/components/modals/LeadCaptureModal";

/**
 * HeroCarousel — ZenStyle
 * -----------------------------------------------------------------------------
 * Objetivo del componente:
 * Renderizar el carrusel principal de la Hero Section priorizando la primera
 * imagen como recurso LCP (Largest Contentful Paint), y difiriendo la carga de
 * las imágenes secundarias para no competir con la imagen crítica del primer
 * render.
 *
 * Criterio actual:
 * - Imagen 01: LCP / carga prioritaria.
 * - Imagen 02: No-LCP / carga diferida.
 * - Formato principal: AVIF.
 * - Formato fallback: WebP.
 * - Breakpoints activos en esta versión: mobile + desktop.
 *
 * Nota de mantenimiento:
 * Las variantes tablet y retina quedan documentadas en comments para una futura
 * activación, pero no participan en el render actual. Esto evita referencias a
 * assets que todavía no se quieran servir en producción.
 */

const HERO_IMAGES = [
  {
    id: "hero-01",
    alt: "Sala premium con piso SPC ZenStyle",
    isLcp: true,
    sources: {
      mobile: {
        avif: "/images/hero/hero-01-sala-lcp-mobile.avif",
        webp: "/images/hero/hero-01-sala-lcp-mobile.webp",
      },

      /**
       * TABLET — futura activación.
       * Activar cuando exista una versión optimizada específicamente para tablet.
       */
      // tablet: {
      //   avif: "/images/hero/hero-01-sala-tablet.avif",
      //   webp: "/images/hero/hero-01-sala-tablet.webp",
      // },

      desktop: {
        avif: "/images/hero/hero-01-sala-lcp-desktop.avif",
        webp: "/images/hero/hero-01-sala-lcp-desktop.webp",
      },

      /**
       * RETINA — futura activación.
       * Activar para pantallas de alta densidad o resoluciones grandes.
       */
      // retina: {
      //   avif: "/images/hero/hero-01-sala-lcp-retina.avif",
      //   webp: "/images/hero/hero-01-sala-lcp-retina.webp",
      // },
    },
  },
  {
    id: "hero-02",
    alt: "Interior oficina corporativa moderna con piso SPC ZenStyle",
    isLcp: false,
    sources: {
      mobile: {
        avif: "/images/hero/-.avif",
        webp: "/images/hero/hero-02-oficina-mobile.webp",
      },

      /**
       * TABLET — futura activación.
       * Activar cuando se genere/exporte la variante tablet No-LCP.
       */
      // tablet: {
      //   avif: "/images/hero/hero-02-oficina-tablet.avif",
      //   webp: "/images/hero/hero-02-oficina-tablet.webp",
      // },

      desktop: {
        avif: "/images/hero/hero-02-oficina-desktop.avif",
        webp: "/images/hero/hero-02-oficina-desktop.webp",
      },

      /**
       * RETINA — futura activación.
       * Activar cuando se decida servir imágenes de mayor resolución a pantallas
       * grandes o de alta densidad.
       */
      // retina: {
      //   avif: "/images/hero/hero-02-oficina-retina.avif",
      //   webp: "/images/hero/hero-02-oficina-retina.webp",
      // },
    },
  },
];

type HeroImageSources = {
  mobile: {
    avif: string;
    webp: string;
  };

  /**
   * TABLET — futura activación.
   * Cuando se reactive, también se deben reactivar los <source> correspondientes
   * dentro del componente ResponsiveHeroImage.
   */
  // tablet: {
  //   avif: string;
  //   webp: string;
  // };

  desktop: {
    avif: string;
    webp: string;
  };

  /**
   * RETINA — futura activación.
   * Cuando se reactive, también se deben reactivar los <source> correspondientes
   * dentro del componente ResponsiveHeroImage.
   */
  // retina: {
  //   avif: string;
  //   webp: string;
  // };
};

type ResponsiveHeroImageProps = {
  sources: HeroImageSources;
  alt: string;
  isActive: boolean;
  isLcp: boolean;
};

function ResponsiveHeroImage({
  sources,
  alt,
  isActive,
  isLcp,
}: ResponsiveHeroImageProps) {
  return (
    <picture>
      {/*
        AVIF — formato preferente.
        El navegador evalúa los <source> de arriba hacia abajo y usa el primero
        que cumpla la media query y cuyo formato soporte.
      */}

      {/*
        RETINA — futura activación.
        Este source debe ir antes de desktop para que pantallas grandes puedan
        tomar la versión de mayor resolución.
      */}
      {/* <source
        type="image/avif"
        media="(min-width: 1920px)"
        srcSet={sources.retina.avif}
      /> */}

      <source
        type="image/avif"
        media="(min-width: 768px)"
        srcSet={sources.desktop.avif}
      />

      {/*
        TABLET — futura activación.
        Si se activa tablet, debe colocarse entre desktop y mobile, ajustando
        los breakpoints para evitar solapamientos no deseados.
      */}
      {/* <source
        type="image/avif"
        media="(min-width: 768px) and (max-width: 1023px)"
        srcSet={sources.tablet.avif}
      /> */}

      <source type="image/avif" srcSet={sources.mobile.avif} />

      {/*
        WebP — fallback.
        Si el navegador no soporta AVIF, baja a WebP respetando los mismos
        criterios responsivos.
      */}

      {/*
        RETINA — futura activación.
      */}
      {/* <source
        type="image/webp"
        media="(min-width: 1920px)"
        srcSet={sources.retina.webp}
      /> */}

      <source
        type="image/webp"
        media="(min-width: 768px)"
        srcSet={sources.desktop.webp}
      />

      {/*
        TABLET — futura activación.
      */}
      {/* <source
        type="image/webp"
        media="(min-width: 768px) and (max-width: 1023px)"
        srcSet={sources.tablet.webp}
      /> */}

      <source type="image/webp" srcSet={sources.mobile.webp} />

      <img
        src={sources.desktop.webp}
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

export default function HeroCarousel() {
  /**
   * currentIndex controla qué slide está visible.
   * Inicia en 0 para que la primera imagen sea la imagen inicial del Hero y,
   * por lo tanto, la candidata natural a LCP.
   */
  const [currentIndex, setCurrentIndex] = useState(0);

  /**
   * isPaused detiene el autoplay cuando el usuario pone el cursor sobre el Hero.
   * Esto mejora la experiencia en desktop, porque evita que el carrusel avance
   * mientras el usuario está interactuando con la sección.
   */
  const [isPaused, setIsPaused] = useState(false);

  /**
   * Controla la apertura/cierre del modal de captura de lead.
   */
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  /**
   * canLoadSecondaryImages difiere el render de imágenes No-LCP.
   *
   * Motivo:
   * Durante el primer render, la prioridad debe ser la imagen LCP. Si todas las
   * imágenes del carrusel se montan inmediatamente, el navegador podría iniciar
   * descargas secundarias y competir por ancho de banda con la imagen crítica.
   */
  const [canLoadSecondaryImages, setCanLoadSecondaryImages] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_IMAGES.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === HERO_IMAGES.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    /**
     * Después de 1.5 segundos se permite montar las imágenes secundarias.
     *
     * Lectura didáctica:
     * - Al inicio solo debe cargarse la imagen LCP.
     * - Después de un breve margen, el navegador ya puede empezar a preparar las
     *   imágenes No-LCP sin afectar tanto el primer render visible.
     */
    const secondaryImagesTimer = window.setTimeout(() => {
      setCanLoadSecondaryImages(true);
    }, 1500);

    return () => window.clearTimeout(secondaryImagesTimer);
  }, []);

  useEffect(() => {
    /**
     * Autoplay del carrusel.
     * Si isPaused es true, no se crea el intervalo.
     */
    if (isPaused) return;

    const timer = window.setInterval(() => {
      goToNext();
    }, 5000);

    /**
     * Cleanup:
     * Evita intervalos duplicados cuando React vuelve a ejecutar el efecto.
     */
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
            /**
             * Aunque cada imagen tiene la propiedad isLcp, se valida también por
             * posición para mantener la regla operativa: la primera imagen del
             * array es la imagen crítica del Hero.
             */
            const isLcpImage = index === 0;

            /**
             * Regla de render:
             * - La imagen 0 siempre se renderiza porque es LCP.
             * - Las imágenes secundarias se renderizan cuando canLoadSecondaryImages
             *   cambia a true.
             * - index === currentIndex permite que una imagen solicitada por navegación
             *   manual pueda renderizarse aunque todavía no haya pasado el delay.
             */
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

          {/* Overlay oscuro para mejorar contraste y legibilidad del texto. */}
          <div className="absolute inset-0 z-10 bg-black/35 md:bg-black/30" />

          {/* 
  BLOQUE EDITORIAL DEL HERO
  ---------------------------------------------------------------------------
  Este bloque contiene todo el texto del Hero: eyebrow, H1, bajada y CTA.

  Importante:
  - No se posiciona cada texto de forma independiente.
  - Se mueve el bloque completo para respetar la safety zone de las imágenes.
  - Como todas las Hero images fueron generadas con la misma zona libre,
    esta posición funciona para todo el carrusel.
  - Si en el futuro cambia la composición de las imágenes, este es el bloque
    que debe ajustarse, no la lógica del carrusel.
*/}
          <div className="pointer-events-none absolute inset-0 z-20 flex h-full w-full items-center">
            <div className="mx-auto flex w-full max-w-7xl px-6 sm:px-8 lg:px-12">
              <div className=" flex max-w-xl translate-y-[-8vh] flex-col items-center text-center text-white md:ml-[8%] md:items-center md:text-center lg:ml-[2%] xl:ml-[12%]">
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

          {/* Navegación manual: slide anterior. */}
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-black/35 text-3xl font-light text-white shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-white hover:bg-white hover:text-neutral-950 sm:left-5 sm:h-12 sm:w-12 md:left-6 md:h-14 md:w-14 md:text-4xl"
          >
            ‹
          </button>

          {/* Navegación manual: siguiente slide. */}
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

{
  /* COMMENTARIO DIDÁCTICO SOBRE LA CARGA DE IMÁGENES EN EL CARRUSEL
No: cada elemento de HERO_IMAGES no es una clase. Es un objeto de configuración dentro de un array.
La carga ocurre aquí:
{HERO_IMAGES.map((image, index) => {  const isLcpImage = index === 0;  const shouldRenderImage =    isLcpImage || canLoadSecondaryImages || index === currentIndex;  if (!shouldRenderImage) return null;  return (    <ResponsiveHeroImage      key={image.id}      sources={image.sources}      alt={image.alt}      isActive={index === currentIndex}      isLcp={isLcpImage}    />  );})}
Qué está pasando ahí
HERO_IMAGES.map(...) recorre el array completo, imagen por imagen.
Conceptualmente es equivalente a esto:
for (let i = 0; i < HERO_IMAGES.length; i++) {  const image = HERO_IMAGES[i];}
Pero en React se usa normalmente .map() porque permite convertir cada elemento del array en JSX.
Es decir:
HERO_IMAGES.map(...)
significa:
“Por cada imagen declarada en HERO_IMAGES, evalúa si debe pintarse y, si aplica, genera un componente ResponsiveHeroImage.”
Dónde se “cargan” realmente las imágenes
La imagen no se descarga simplemente por existir en el array.
El array solo declara rutas:
avif: "/images/hero/hero-03-departamento-desktop.avif"webp: "/images/hero/hero-03-departamento-desktop.webp"
La descarga real empieza cuando React pinta este componente:
<ResponsiveHeroImage  sources={image.sources}  alt={image.alt}  isActive={index === currentIndex}  isLcp={isLcpImage}/>
Y dentro de ResponsiveHeroImage, la carga ocurre aquí:
<picture>  <source type="image/avif" media="(min-width: 768px)" srcSet={sources.desktop.avif} />  <source type="image/avif" srcSet={sources.mobile.avif} />  <source type="image/webp" media="(min-width: 768px)" srcSet={sources.desktop.webp} />  <source type="image/webp" srcSet={sources.mobile.webp} />  <img    src={sources.desktop.webp}    alt={alt}    loading={isLcp ? "eager" : "lazy"}    fetchPriority={isLcp ? "high" : "auto"}    decoding={isLcp ? "sync" : "async"}  /></picture>
Ahí el navegador decide:
1. ¿Soporto AVIF?   Sí → uso AVIF.   No → uso WebP.2. ¿Estoy en desktop?   Sí → uso desktop.   No → uso mobile.3. ¿Es la primera imagen?   Sí → eager + high priority.   No → lazy + auto priority.
Flujo completo
La lógica funciona así:
1. HERO_IMAGES declara las 5 imágenes.2. React entra al return del componente.3. HERO_IMAGES.map(...) recorre las 5 imágenes.4. Para cada imagen calcula si debe renderizarse.5. Si debe renderizarse, crea un <ResponsiveHeroImage />.6. ResponsiveHeroImage genera <picture> + <source> + <img>.7. El navegador descarga el archivo adecuado.
Punto clave
Al inicio, aunque el array tenga 5 imágenes, no necesariamente se cargan las 5 inmediatamente.
Por esta condición:
const shouldRenderImage =  isLcpImage || canLoadSecondaryImages || index === currentIndex;
Inicialmente:
hero-01 → sí se renderiza inmediatamente porque index === 0hero-02 → nohero-03 → nohero-04 → nohero-05 → no
Después de 1.5 segundos:
setCanLoadSecondaryImages(true);
entonces las demás ya pueden renderizarse y empezar su carga lazy.
Traducción mental rápida
Esta línea:
HERO_IMAGES.map((image, index) => { ... })
léela como:
“Recorre todas las imágenes declaradas y pinta las que correspondan.”
No usa un for escrito manualmente, pero internamente cumple la misma función de recorrido.*/
}
