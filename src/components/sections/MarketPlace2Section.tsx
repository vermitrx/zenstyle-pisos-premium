"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import {
  floors,
  spaceTypes,
  wallPanels,
  type Marketplace2Product,
  type SpaceType,
} from "@/data/marketplace2/products";
import {
  defaultMarketplace2Previews,
  fallbackMarketplace2Previews,
  marketplace2PreviewImages,
} from "@/data/marketplace2/previewImages";

/**
 * Construye la clave usada para buscar el preview activo.
 *
 * Casos posibles:
 * 1. Piso + wall panel: floor-london__wall-panel-gs-loria
 * 2. Solo piso: floor-london
 * 3. Solo wall panel: wall-panel-gs-loria
 * 4. Sin selección: null
 *
 * Nota de mantenimiento:
 * Si en el futuro se agregan más familias de producto, este será uno de los
 * puntos principales a escalar.
 */
function getPreviewKey(
  selectedFloor: Marketplace2Product | null,
  selectedWallPanel: Marketplace2Product | null,
) {
  if (selectedFloor && selectedWallPanel) {
    return `${selectedFloor.slug}__${selectedWallPanel.slug}`;
  }

  if (selectedFloor) {
    return selectedFloor.slug;
  }

  if (selectedWallPanel) {
    return selectedWallPanel.slug;
  }

  return null;
}

type ProductScrollerProps = {
  title: string;
  products: Marketplace2Product[];
  selectedProductId: string | null;
  onSelect: (product: Marketplace2Product) => void;
};

/**
 * Catálogo horizontal reutilizable.
 *
 * Objetivo de UI:
 * Mantener catálogos escalables sin incrementar demasiado la altura de la
 * sección. El usuario debe percibir que los selectores son controles de apoyo,
 * no el protagonista visual de la sección.
 *
 * Uso actual:
 * - Catálogo de pisos.
 * - Catálogo de wall panels.
 */
function ProductScroller({
  title,
  products,
  selectedProductId,
  onSelect,
}: ProductScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  /**
   * Desplaza horizontalmente el catálogo.
   *
   * El valor de 220px mueve aproximadamente una tarjeta y media en la versión
   * compacta actual. Si se modifican los anchos de tarjeta, este valor puede
   * ajustarse sin tocar la lógica del catálogo.
   */
  function handleScroll(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -220 : 220,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative rounded-3xl bg-white p-3 shadow-[0_10px_28px_rgba(31,35,40,0.08)]">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold tracking-[0.22em] text-neutral-950 uppercase">
          {title}
        </h3>

        {/* Chevrons desktop: se ubican arriba para no tapar thumbnails. */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label={`Desplazar ${title} hacia la izquierda`}
            className="flex h-8 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-lg leading-none text-neutral-800 transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label={`Desplazar ${title} hacia la derecha`}
            className="flex h-8 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white text-lg leading-none text-neutral-800 transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Chevron mobile izquierdo: visible sobre la orilla del carrusel. */}
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label={`Desplazar ${title} hacia la izquierda`}
          className="absolute left-0 top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-neutral-200 bg-white/95 text-2xl leading-none text-neutral-800 shadow-[0_8px_22px_rgba(31,35,40,0.12)] backdrop-blur transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white md:hidden"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const isSelected = selectedProductId === product.id;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelect(product)}
                aria-pressed={isSelected}
                className={`group min-w-28 rounded-xl border bg-white p-1.5 transition duration-300 sm:min-w-31 ${
                  isSelected
                    ? "translate-y-0.5 scale-[0.98] border-[#C8A45D] bg-[#F7F1E6] shadow-[inset_0_3px_8px_rgba(31,35,40,0.18),0_4px_12px_rgba(31,35,40,0.10)] ring-2 ring-[#C8A45D]/35"
                    : "translate-y-0 scale-100 border-neutral-200 shadow-sm hover:-translate-y-px hover:border-[#C8A45D]/70 hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)]"
                }`}
              >
                <div
                  className={`relative h-16 overflow-hidden rounded-lg bg-neutral-100 transition duration-200 sm:h-20 ${
                    isSelected ? "brightness-95" : "group-hover:brightness-105"
                  }`}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.label}
                    fill
                    sizes="124px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-1 flex flex-col items-center text-center">
                  <p className="text-[11px] font-semibold leading-tight text-neutral-950">
                    {product.label}
                  </p>

                  {!product.previewAvailable && (
                    <p className="mt-0.5 text-[10px] font-medium leading-tight text-[#8A6A28]">
                      Visualización bajo solicitud
                    </p>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Chevron mobile derecho: visible sobre la orilla del carrusel. */}
        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label={`Desplazar ${title} hacia la derecha`}
          className="absolute right-0 top-1/2 z-10 flex h-14 w-8 -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 border-neutral-200 bg-white/95 text-2xl leading-none text-neutral-800 shadow-[0_8px_22px_rgba(31,35,40,0.12)] backdrop-blur transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white md:hidden"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default function MarketPlace2Section() {
  /**
   * Ambiente activo.
   *
   * En UI se muestra como: Residencial | Comercial.
   * En lógica se conserva como: residential | commercial.
   */
  const [spaceType, setSpaceType] = useState<SpaceType>("residential");

  /**
   * Estado inicial.
   *
   * Sin productos seleccionados, se muestra la imagen base del ambiente activo.
   */
  const [selectedFloor, setSelectedFloor] =
    useState<Marketplace2Product | null>(null);

  const [selectedWallPanel, setSelectedWallPanel] =
    useState<Marketplace2Product | null>(null);

  /**
   * Al cambiar de ambiente se limpian las selecciones.
   *
   * Esto evita que el usuario arrastre una combinación residencial al ambiente
   * comercial, o viceversa.
   */
  function handleSpaceChange(nextSpaceType: SpaceType) {
    setSpaceType(nextSpaceType);
    setSelectedFloor(null);
    setSelectedWallPanel(null);
  }

  const previewKey = useMemo(
    () => getPreviewKey(selectedFloor, selectedWallPanel),
    [selectedFloor, selectedWallPanel],
  );

  /**
   * Estados visuales posibles:
   *
   * 1. Sin selección:
   *    Muestra imagen default del ambiente activo.
   *
   * 2. Con selección y preview disponible:
   *    Muestra imagen específica del mapa de previews.
   *
   * 3. Con selección y preview no disponible:
   *    Muestra imagen fallback del ambiente activo.
   */
  const hasSelection = Boolean(selectedFloor || selectedWallPanel);

  const activePreview = previewKey
    ? marketplace2PreviewImages[spaceType][previewKey]
    : null;

  const hasPreview = Boolean(activePreview);

  const visiblePreview = !hasSelection
    ? defaultMarketplace2Previews[spaceType]
    : (activePreview ?? fallbackMarketplace2Previews[spaceType]);

  const helperText =
    spaceType === "residential"
      ? "Visualización residencial"
      : "Visualización comercial";

  return (
    <section className="bg-[#F7F3EC] px-5 py-10 md:px-8 md:py-12 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
            Marketplace Zen Style
          </p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-950 md:text-4xl">
            Diseña tu ambiente combinando Pisos SPC y Wall Panels en espacios
            residenciales o comerciales
          </h2>
        </div>

        <div className="mt-6 overflow-hidden rounded-4xl shadow-[0_24px_70px_rgba(31,35,40,0.16)]">
          {/**
           * Contenedor relativo del preview.
           *
           * Dentro viven tres capas:
           * 1. Imagen principal.
           * 2. Overlay principal de selección.
           * 3. Overlay secundario de fallback, solo cuando no hay preview.
           *
           * La altura aumenta respecto a la versión compacta anterior para que
           * la imagen recupere protagonismo y se vea más techo y más piso.
           */}
          <div className="relative h-90 overflow-hidden bg-neutral-200 sm:h-105 md:h-120 lg:h-130 xl:h-140">
            <Image
              src={visiblePreview.src}
              alt={visiblePreview.alt}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover object-center"
            />

            {/* Overlay principal: visualización + selección activa. */}
            <div className="absolute bottom-4 left-4 z-10 rounded-2xl bg-white/50 px-4 py-2.5 shadow-[0_12px_30px_rgba(31,35,40,0.16)] backdrop-blur md:bottom-6 md:left-6 md:px-5 md:py-3">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-neutral-600 uppercase md:text-xs">
                {helperText}
              </p>

              {hasSelection ? (
                <div className="mt-1 flex max-w-80 flex-wrap items-end gap-x-3 gap-y-1 md:max-w-130">
                  {selectedFloor && (
                    <div>
                      <p className="text-base font-semibold leading-tight text-neutral-950 md:text-xl">
                        {selectedFloor.label}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                        Piso
                      </p>
                    </div>
                  )}

                  {selectedFloor && selectedWallPanel && (
                    <span className="mb-4 text-base font-semibold text-neutral-800 md:text-xl">
                      +
                    </span>
                  )}

                  {selectedWallPanel && (
                    <div>
                      <p className="text-base font-semibold leading-tight text-neutral-950 md:text-xl">
                        {selectedWallPanel.label}
                      </p>
                      <p className="mt-0.5 text-[10px] font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                        Wall Panel
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="mt-1 max-w-65 text-base font-semibold leading-tight text-neutral-950 md:max-w-105 md:text-xl">
                  Personaliza este ambiente
                </p>
              )}
            </div>

            {/* Overlay secundario: aparece solo cuando hay selección sin preview. */}
            {hasSelection && !hasPreview && (
              <div className="absolute right-4 top-4 z-10 rounded-2xl bg-white/92 p-3 shadow-[0_16px_35px_rgba(31,35,40,0.18)] backdrop-blur md:right-6 md:top-6 md:max-w-md">
                <p className="text-sm font-semibold text-neutral-950">
                  Visualización personalizada disponible
                </p>

                <p className="mt-1 text-xs leading-5 text-neutral-700 md:text-sm md:leading-6">
                  Esta combinación no tiene preview inmediato. Podemos
                  prepararte una visualización con los productos seleccionados o
                  aplicarla sobre una foto de tu propio espacio.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[180px_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex h-full min-w-0 flex-col items-center justify-center rounded-3xl bg-white p-3 shadow-[0_10px_28px_rgba(31,35,40,0.08)]">
            <h3 className="text-center text-xs font-semibold tracking-[0.22em] text-neutral-950 uppercase">
              Ambiente
            </h3>

            {/**
             * En mobile estrecho los botones se apilan para evitar overflow.
             * Desde sm se colocan lado a lado. En desktop vuelven a apilarse
             * porque el card de Ambiente es una columna estrecha.
             */}
            <div className="mt-3 flex w-full max-w-80 justify-center gap-2 lg:max-w-36 lg:flex-col">
              {spaceTypes.map((space) => {
                const isActive = spaceType === space.id;

                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => handleSpaceChange(space.id)}
                    className={`min-w-0 flex-1 truncate rounded-full px-3 py-2 text-center text-xs font-semibold transition duration-300 lg:w-full lg:flex-none ${
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "border border-neutral-200 bg-white text-neutral-800 hover:border-[#C8A45D]"
                    }`}
                  >
                    {space.switchLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <ProductScroller
            title="Catálogo de pisos"
            products={floors}
            selectedProductId={selectedFloor?.id ?? null}
            onSelect={(product) =>
              setSelectedFloor((current) =>
                current?.id === product.id ? null : product,
              )
            }
          />

          <ProductScroller
            title="Catálogo de wall panels"
            products={wallPanels}
            selectedProductId={selectedWallPanel?.id ?? null}
            onSelect={(product) =>
              setSelectedWallPanel((current) =>
                current?.id === product.id ? null : product,
              )
            }
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-neutral-800"
          >
            Solicita una cotización
          </button>

          <button
            type="button"
            className="rounded-full border border-neutral-300 bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition duration-300 hover:border-[#C8A45D]"
          >
            Quiero verlo en mi espacio
          </button>
        </div>
      </div>
    </section>
  );
}
