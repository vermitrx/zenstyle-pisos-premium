"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  floors,
  spaceTypes,
  wallPanels,
  type MarketplaceProduct,
  type SpaceType,
} from "@/data/marketplace/products";
import {
  defaultMarketplacePreview,
  marketplacePreviewImages,
} from "@/data/marketplace/previewImages";

/**
 * Construye la clave que se usará para buscar la imagen grande activa.
 *
 * Casos posibles:
 *
 * 1. Piso + wall panel:
 *    floor-a__wall-a
 *
 * 2. Solo piso:
 *    floor-a
 *
 * 3. Solo wall panel:
 *    wall-a
 *
 * 4. Sin selección:
 *    null
 *
 * Esta función es el núcleo de la lógica combinatoria.
 * Si en el futuro agregas más categorías, este será uno de los puntos
 * principales a revisar.
 */
function getPreviewKey(
  selectedFloor: string | null,
  selectedWallPanel: string | null,
) {
  if (selectedFloor && selectedWallPanel) {
    return `${selectedFloor}__${selectedWallPanel}`;
  }

  if (selectedFloor) {
    return selectedFloor;
  }

  if (selectedWallPanel) {
    return selectedWallPanel;
  }

  return null;
}

type ProductSelectorProps = {
  title: string;
  products: MarketplaceProduct[];
  selectedProductId: string | null;
  onSelect: (productId: string) => void;
};

/**
 * Selector reutilizable para catálogos.
 *
 * Actualmente se usa para:
 * - Pisos
 * - Wall panels
 *
 * En producción puede reutilizarse para más familias de producto:
 * zoclos, molduras, accesorios, líneas premium, etc.
 */
function ProductSelector({
  title,
  products,
  selectedProductId,
  onSelect,
}: ProductSelectorProps) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold tracking-[0.18em] text-neutral-900 uppercase">
          {title}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
        {products.map((product) => {
          const isSelected = selectedProductId === product.id;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onSelect(product.id)}
              className={`group rounded-2xl border bg-white p-2 text-left transition duration-300 ${
                isSelected
                  ? "border-[#C8A45D] shadow-[0_16px_35px_rgba(31,35,40,0.16)]"
                  : "border-neutral-200 shadow-sm hover:border-[#C8A45D]/70 hover:shadow-[0_14px_30px_rgba(31,35,40,0.12)]"
              }`}
            >
              <div className="relative h-24 overflow-hidden rounded-xl bg-neutral-100 sm:h-28 md:h-32 lg:h-auto lg:aspect-4/3">
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 22vw, 160px"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <div className="mt-2">
                <p className="text-sm font-medium text-neutral-950">
                  {product.name}
                </p>

                {!product.previewAvailable && (
                  <p className="mt-1 text-[11px] font-medium text-[#8A6A28]">
                    Visualización bajo solicitud
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketPlaceSection() {
  /**
   * Estado del tipo de espacio.
   *
   * Aunque en prototipo "commercial" muestra las mismas imágenes de casa,
   * conservamos el estado porque la interacción final sí lo requerirá.
   *
   * En producción solo se cambiarán los apuntadores del mapa de imágenes.
   */
  const [spaceType, setSpaceType] = useState<SpaceType>("home");

  /**
   * Estado inicial del prototipo.
   *
   * Se inicia con piso + wall panel seleccionados para que la sección
   * cargue con una imagen completa y comercial.
   */
  const [selectedFloor, setSelectedFloor] = useState<string | null>(null);
  const [selectedWallPanel, setSelectedWallPanel] = useState<string | null>(
    null,
  );

  /**
   * Genera la clave activa a partir de la selección actual.
   *
   * useMemo evita recalcular esta clave salvo que cambie el piso
   * o el wall panel seleccionado.
   */
  const previewKey = useMemo(
    () => getPreviewKey(selectedFloor, selectedWallPanel),
    [selectedFloor, selectedWallPanel],
  );

  /**
   * Busca la imagen grande correspondiente.
   *
   * Para prototipo:
   * - Si spaceType = "home", busca en imágenes de casa.
   * - Si spaceType = "commercial", también busca en imágenes de casa,
   *   porque previewImages.ts apunta ambos contextos al mismo set.
   */
  const activePreview = previewKey
    ? marketplacePreviewImages[spaceType][previewKey]
    : null;

  const hasPreview = Boolean(activePreview);

  /**
   * Imagen visible final.
   *
   * Regla:
   * - Si existe preview, se muestra.
   * - Si no existe preview, se conserva la imagen default.
   *
   * Esto mantiene la sección siempre visualmente activa.
   */
  const visiblePreview = activePreview ?? defaultMarketplacePreview;

  const selectedFloorData = floors.find((floor) => floor.id === selectedFloor);
  const selectedWallPanelData = wallPanels.find(
    (wallPanel) => wallPanel.id === selectedWallPanel,
  );

  const selectedSummary = [
    spaceType === "home" ? "Casa" : "Oficina / Comercio",
    selectedFloorData?.name,
    selectedWallPanelData?.name,
  ]
    .filter(Boolean)
    .join(" + ");

  const spaceHelperText =
    spaceType === "home"
      ? "Visualización residencial"
      : "Visualización comercial referencial";

  return (
    <section className="bg-[#F7F3EC] px-5 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.22em] text-[#C8A45D] uppercase">
            Marketplace Zen Style
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-950 md:text-5xl">
            Visualiza pisos SPC y wall panels en espacios reales
          </h2>

          <p className="mt-5 text-base leading-7 text-neutral-700 md:text-lg">
            Explora combinaciones disponibles o solicita una visualización
            personalizada para tu casa, oficina o local comercial.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-neutral-200">
            {spaceTypes.map((space) => {
              const isActive = spaceType === space.id;

              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => setSpaceType(space.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition duration-300 ${
                    isActive
                      ? "bg-neutral-950 text-white shadow-sm"
                      : "text-neutral-700 hover:text-neutral-950"
                  }`}
                >
                  {space.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
          <div className="overflow-hidden rounded-4xl bg-white shadow-[0_24px_70px_rgba(31,35,40,0.16)]">
            <div className="relative aspect-16/10 min-h-90 overflow-hidden bg-neutral-200">
              <Image
                src={visiblePreview.src}
                alt={visiblePreview.alt}
                fill
                priority={false}
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />

              {spaceType === "commercial" && (
                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-neutral-700 uppercase shadow-sm backdrop-blur">
                  Preview referencial
                </div>
              )}

              {!hasPreview && (
                <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-white/92 p-4 shadow-[0_16px_35px_rgba(31,35,40,0.18)] backdrop-blur">
                  <p className="text-sm font-semibold text-neutral-950">
                    Visualización personalizada disponible
                  </p>

                  <p className="mt-1 text-sm leading-6 text-neutral-700">
                    Esta combinación no tiene preview inmediato. Podemos
                    prepararte una visualización con los productos seleccionados
                    o aplicarla sobre una foto de tu propio espacio.
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">
                  {spaceHelperText}
                </p>

                <p className="mt-1 text-lg font-semibold text-neutral-950">
                  {selectedSummary || "Selecciona una combinación"}
                </p>

                {spaceType === "commercial" && (
                  <p className="mt-1 max-w-xl text-sm leading-6 text-neutral-600">
                    En esta etapa de prototipo, el espacio comercial utiliza la
                    misma visualización residencial. En producción se conectará
                    a renders específicos de oficina o comercio.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  className="rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-neutral-800"
                >
                  Solicita una cotización
                </button>

                <button
                  type="button"
                  className="rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition duration-300 hover:border-[#C8A45D]"
                >
                  Quiero verlo en mi espacio
                </button>
              </div>
            </div>
          </div>

          <aside className="rounded-4xl bg-white p-5 shadow-[0_20px_55px_rgba(31,35,40,0.12)] md:p-6">
            <div className="space-y-8">
              <ProductSelector
                title="Catálogo de pisos"
                products={floors}
                selectedProductId={selectedFloor}
                onSelect={(productId) =>
                  setSelectedFloor((current) =>
                    current === productId ? null : productId,
                  )
                }
              />

              <ProductSelector
                title="Catálogo de wall panels"
                products={wallPanels}
                selectedProductId={selectedWallPanel}
                onSelect={(productId) =>
                  setSelectedWallPanel((current) =>
                    current === productId ? null : productId,
                  )
                }
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
