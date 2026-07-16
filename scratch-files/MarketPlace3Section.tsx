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
 *
 * 1. Piso + wall panel:
 *    floor-london__wall-panel-gs-loria
 *
 * 2. Solo piso:
 *    floor-london
 *
 * 3. Solo wall panel:
 *    wall-panel-gs-loria
 *
 * 4. Sin selección:
 *    null
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
 * Este patrón permite escalar el catálogo sin incrementar demasiado
 * la altura de la sección.
 */
function ProductScroller({
  title,
  products,
  selectedProductId,
  onSelect,
}: ProductScrollerProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  function handleScroll(direction: "left" | "right") {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -260 : 260,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative rounded-[2rem] bg-white p-5 shadow-[0_18px_50px_rgba(31,35,40,0.10)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold tracking-[0.22em] text-neutral-950 uppercase">
          {title}
        </h3>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            aria-label={`Desplazar ${title} hacia la izquierda`}
            className="flex h-9 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-xl leading-none text-neutral-800 transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={() => handleScroll("right")}
            aria-label={`Desplazar ${title} hacia la derecha`}
            className="flex h-9 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-xl leading-none text-neutral-800 transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => handleScroll("left")}
          aria-label={`Desplazar ${title} hacia la izquierda`}
          className="absolute left-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-r-xl border border-l-0 border-neutral-200 bg-white/95 text-2xl leading-none text-neutral-800 shadow-[0_8px_22px_rgba(31,35,40,0.12)] backdrop-blur transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white md:hidden"
        >
          ‹
        </button>

        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product) => {
            const isSelected = selectedProductId === product.id;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => onSelect(product)}
                aria-pressed={isSelected}
                className={`group min-w-[150px] rounded-2xl border bg-white p-2 text-left transition duration-300 sm:min-w-[170px] ${
                  isSelected
                    ? "translate-y-[2px] scale-[0.98] border-[#C8A45D] bg-[#F7F1E6] shadow-[inset_0_3px_8px_rgba(31,35,40,0.18),0_4px_12px_rgba(31,35,40,0.10)] ring-2 ring-[#C8A45D]/35"
                    : "translate-y-0 scale-100 border-neutral-200 shadow-sm hover:-translate-y-[1px] hover:border-[#C8A45D]/70 hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)]"
                }`}
              >
                <div
                  className={`relative h-24 overflow-hidden rounded-xl bg-neutral-100 transition duration-200 sm:h-28 ${
                    isSelected ? "brightness-95" : "group-hover:brightness-105"
                  }`}
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.label}
                    fill
                    sizes="170px"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-2 flex flex-col items-center text-center">
  <p className="text-sm font-semibold text-neutral-950">
    {product.label}
  </p>

  {!product.previewAvailable && (
    <p className="mt-1 text-[11px] font-medium leading-tight text-[#8A6A28]">
      Visualización bajo solicitud
    </p>
  )}
</div>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handleScroll("right")}
          aria-label={`Desplazar ${title} hacia la derecha`}
          className="absolute right-0 top-1/2 z-10 flex h-16 w-9 -translate-y-1/2 items-center justify-center rounded-l-xl border border-r-0 border-neutral-200 bg-white/95 text-2xl leading-none text-neutral-800 shadow-[0_8px_22px_rgba(31,35,40,0.12)] backdrop-blur transition duration-300 hover:border-[#C8A45D] hover:bg-[#C8A45D] hover:text-white md:hidden"
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
   * En el switch se muestra:
   * - Residencial
   * - Comercial
   *
   * En la leyenda de selección se muestra:
   * - Residential
   * - Commercial
   */
  const [spaceType, setSpaceType] = useState<SpaceType>("residential");

  /**
   * Estado inicial:
   * no hay productos seleccionados para que se muestre la imagen base
   * del ambiente activo.
   */
  const [selectedFloor, setSelectedFloor] =
    useState<Marketplace2Product | null>(null);

  const [selectedWallPanel, setSelectedWallPanel] =
    useState<Marketplace2Product | null>(null);

  /**
   * Al cambiar de espacio, se limpian las selecciones.
   *
   * Esto evita que el usuario arrastre una combinación de Residencial
   * hacia Comercial, o viceversa.
   */
  function handleSpaceChange(nextSpaceType: SpaceType) {
    setSpaceType(nextSpaceType);
    setSelectedFloor(null);
    setSelectedWallPanel(null);
  }

  const activeSpace = spaceTypes.find((space) => space.id === spaceType);

  const previewKey = useMemo(
    () => getPreviewKey(selectedFloor, selectedWallPanel),
    [selectedFloor, selectedWallPanel],
  );

  /**
   * Indica si ya existe alguna selección.
   *
   * Esta variable es clave para decidir entre:
   * - default image
   * - preview image
   * - fallback image
   */
  const hasSelection = Boolean(selectedFloor || selectedWallPanel);

  const activePreview = previewKey
    ? marketplace2PreviewImages[spaceType][previewKey]
    : null;

  /**
   * Regla final de imagen visible:
   *
   * 1. Sin selección:
   *    default del espacio activo.
   *
   * 2. Con selección y preview disponible:
   *    preview específico.
   *
   * 3. Con selección y preview no disponible:
   *    fallback del espacio activo.
   */
  const visiblePreview = !hasSelection
    ? defaultMarketplace2Previews[spaceType]
    : (activePreview ?? fallbackMarketplace2Previews[spaceType]);

  const hasPreview = Boolean(activePreview);

  const selectedSummary = [selectedFloor?.label, selectedWallPanel?.label]
    .filter(Boolean)
    .join(" + ");

  const helperText =
    spaceType === "residential"
      ? "Visualización residencial"
      : "Visualización comercial";

  return (
    <section className="bg-[#F7F3EC] px-5 py-12 md:px-8 md:py-14 lg:px-12">
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

        <div className="mt-8 overflow-hidden rounded-4xl bg-white shadow-[0_24px_70px_rgba(31,35,40,0.16)]">
          <div className="relative h-[320px] overflow-hidden bg-neutral-200 sm:h-[360px] md:h-[400px] lg:h-[440px] xl:h-[460px]">
            <Image
              src={visiblePreview.src}
              alt={visiblePreview.alt}
              fill
              priority={false}
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 z-10 rounded-2xl bg-white/50 px-4 py-2.5 shadow-[0_12px_30px_rgba(31,35,40,0.16)] backdrop-blur md:bottom-6 md:left-6 md:px-5 md:py-3">
              <p className="text-[10px] font-semibold tracking-[0.22em] text-neutral-600 uppercase md:text-xs">
                {helperText}
              </p>

              {hasSelection ? (
                <div className="mt-1 flex max-w-[320px] flex-wrap items-end gap-x-3 gap-y-1 md:max-w-[520px]">
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
                <p className="mt-1 max-w-[260px] text-base font-semibold leading-tight text-neutral-950 md:max-w-[420px] md:text-xl">
                  Personaliza este ambiente
                </p>
              )}
            </div>

            {hasSelection && !hasPreview && (
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-[0_16px_35px_rgba(31,35,40,0.18)] backdrop-blur md:max-w-xl">
                <p className="text-sm font-semibold text-neutral-950">
                  Visualización personalizada disponible
                </p>

                <p className="mt-1 text-sm leading-6 text-neutral-700">
                  Esta combinación no tiene preview inmediato. Podemos
                  prepararte una visualización con los productos seleccionados o
                  aplicarla sobre una foto de tu propio espacio.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-4xl bg-white p-4 shadow-[0_18px_50px_rgba(31,35,40,0.10)] md:p-5">
            <h3 className="text-sm font-semibold tracking-[0.22em] text-neutral-950 uppercase">
              Ambiente
            </h3>

            <div className="mt-3 flex flex-col gap-3">
              {spaceTypes.map((space) => {
                const isActive = spaceType === space.id;

                return (
                  <button
                    key={space.id}
                    type="button"
                    onClick={() => handleSpaceChange(space.id)}
                    className={`rounded-full px-5 py-3 text-sm font-semibold transition duration-300 ${
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
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
