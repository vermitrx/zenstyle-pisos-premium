"use client";

import { useEffect, useRef, useState } from "react";

import type { CollectionProduct } from "@/data/collections/products";

import CatalogPicture from "@/components/sections/collections/CatalogPicture";

/*
  CollectionProductList.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este componente pinta el carrusel horizontal de productos.

  Responsabilidades:
  - mostrar miniatura del producto;
  - mostrar nombre del modelo debajo de la miniatura;
  - marcar visualmente el producto activo;
  - permitir scroll horizontal;
  - mostrar chevrons solo cuando el contenido no cabe.

  Este componente NO sabe si está mostrando Pisos SPC o Wall Panels.
  Recibe products ya filtrado desde CollectionCatalogPanel.
*/

type CollectionProductListProps = {
  products: CollectionProduct[];
  selectedProductId: string;
  onProductSelect: (product: CollectionProduct) => void;
};

export default function CollectionProductList({
  products,
  selectedProductId,
  onProductSelect,
}: CollectionProductListProps) {
  /*
    scrollContainerRef
    ---------------------------------------------------------------------------
    useRef permite apuntar directamente al div que tiene overflow-x-auto.

    Lo usamos para medir:
    - scrollWidth: ancho total del contenido;
    - clientWidth: ancho visible del contenedor.

    Si scrollWidth > clientWidth, significa que no caben todos los productos y
    deben aparecer chevrons.
  */
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  /*
    canScroll
    ---------------------------------------------------------------------------
    Define si el carrusel necesita botones de navegación horizontal.
  */
  const [canScroll, setCanScroll] = useState(false);

  /*
    updateScrollState
    ---------------------------------------------------------------------------
    Recalcula si hay overflow horizontal.

    Se ejecuta:
    - al montar el componente;
    - cuando cambia products;
    - cuando cambia el tamaño del viewport.
  */
  function updateScrollState() {
    const container = scrollContainerRef.current;

    if (!container) return;

    setCanScroll(container.scrollWidth > container.clientWidth);
  }

  /*
    scrollModels
    ---------------------------------------------------------------------------
    Desplaza el carrusel hacia la izquierda o derecha.

    El desplazamiento usa clientWidth para avanzar aproximadamente una pantalla
    visible del carrusel.
  */
  function scrollModels(direction: "left" | "right") {
    const container = scrollContainerRef.current;

    if (!container) return;

    container.scrollBy({
      left:
        direction === "left" ? -container.clientWidth : container.clientWidth,
      behavior: "smooth",
    });
  }

  /*
    useEffect
    ---------------------------------------------------------------------------
    Sincroniza el estado de overflow.

    También se registra resize para que los chevrons aparezcan/desaparezcan
    correctamente cuando cambia el ancho del viewport.
  */
  useEffect(() => {
    updateScrollState();

    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("resize", updateScrollState);
    };
  }, [products]);

  return (
    <div className="relative">
      {canScroll && (
        <button
          type="button"
          onClick={() => scrollModels("left")}
          aria-label="Ver modelos anteriores"
          className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-base font-semibold text-stone-700 shadow-md ring-1 ring-stone-200 backdrop-blur transition hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 md:block"
        >
          ‹
        </button>
      )}

      <div
        ref={scrollContainerRef}
        className="flex justify-center gap-4 overflow-x-auto px-8 pb-1"
      >
        {products.map((product) => {
          const isActive = product.id === selectedProductId;

          return (
            <button
              key={product.id}
              type="button"
              onClick={() => onProductSelect(product)}
              aria-pressed={isActive}
              className={`flex w-24 shrink-0 flex-col items-center rounded-2xl px-2 py-2 text-center transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                isActive
                  ? "bg-white/40 shadow-md ring-1 ring-stone-300"
                  : "bg-transparent hover:bg-white/40"
              }`}
            >
              <span className="block h-10 w-16 overflow-hidden rounded-xl bg-stone-100 ring-1 ring-stone-200">
                <CatalogPicture
                  image={product.thumbnail}
                  alt={`Miniatura de ${product.name}`}
                  className="h-full w-full object-cover"
                />
              </span>

              <span className="mt-2 block w-full truncate text-xs font-semibold text-stone-800">
                {product.name}
              </span>
            </button>
          );
        })}
      </div>

      {canScroll && (
        <button
          type="button"
          onClick={() => scrollModels("right")}
          aria-label="Ver más modelos"
          className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/90 px-3 py-2 text-base font-semibold text-stone-700 shadow-md ring-1 ring-stone-200 backdrop-blur transition hover:bg-white hover:text-stone-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 md:block"
        >
          ›
        </button>
      )}
    </div>
  );
}
