"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
} from "@/data/collections/products";

import CollectionHero from "@/components/sections/collections/CollectionHero";
import type { CollectionHeroMode } from "@/components/sections/collections/collectionHeroTypes";

/*
  CollectionsSection.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este archivo funciona como ADMINISTRADOR de la sección CollectionsSection.

  Su responsabilidad principal es coordinar:
  - categoría activa;
  - producto activo;
  - modo visual activo de la Hero;
  - handlers principales de interacción.

  Este archivo NO debe concentrar todo el markup visual de la sección. Para
  mantener orden, escalabilidad y mantenimiento, delega la construcción visual a
  componentes hijos dentro de:

  src/components/sections/collections/

  ARQUITECTURA DE LA SECCIÓN
  -----------------------------------------------------------------------------
  products.ts
  → CollectionsSection.tsx
  → CollectionHero.tsx
  → CollectionIntroOverlay.tsx
  → CollectionCatalogPanel.tsx
  → CollectionCategorySwitch.tsx
  → CollectionProductList.tsx
  → CatalogPicture.tsx

  PRINCIPIO FUNCIONAL
  -----------------------------------------------------------------------------
  CollectionsSection NO combina pisos + wall panels.

  La lógica correcta es:
  categoría activa → producto activo → renders propios del producto.

  La lógica de combinaciones tipo selectedFloor + selectedWallPanel pertenece a
  Marketplace, no a CollectionsSection.
*/

/*
  getFirstProductByCategory
  -----------------------------------------------------------------------------
  Función auxiliar local.

  Objetivo:
  Cuando el usuario cambia de categoría, esta función obtiene el primer producto
  disponible de la nueva categoría.

  Esto evita inconsistencias como:
  - activeCategoryId = "wallPanels"
  - selectedProduct = producto de "floors"

  Se mantiene dentro de CollectionsSection porque forma parte de la lógica de
  coordinación de la sección.
*/
function getFirstProductByCategory(
  categoryId: CollectionCategory,
): CollectionProduct {
  const category = collectionCategories.find((item) => item.id === categoryId);

  if (!category || category.products.length === 0) {
    throw new Error(
      `CollectionsSection: no hay productos disponibles para la categoría "${categoryId}".`,
    );
  }

  return category.products[0];
}

export default function CollectionsSection() {
  /*
    ESTADO FUNCIONAL: CATEGORÍA ACTIVA
    ---------------------------------------------------------------------------
    Controla si el catálogo está mostrando:
    - Pisos SPC
    - Wall Panels
  */
  const [activeCategoryId, setActiveCategoryId] =
    useState<CollectionCategory>("floors");

  /*
    ESTADO FUNCIONAL: PRODUCTO ACTIVO
    ---------------------------------------------------------------------------
    Controla qué producto está seleccionado.

    Este producto alimenta:
    - imagen principal de la Hero;
    - estado selected del carrusel;
    - futuro pdfUrl de ficha técnica.
  */
  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct>(
    () => getFirstProductByCategory("floors"),
  );

  /*
    ESTADO VISUAL: MODO DE LA HERO
    ---------------------------------------------------------------------------
    Reemplaza la lógica anterior de isCatalogOpen.

    Modos disponibles:
    - "intro"
    - "catalog"
    - "collapsed"

    El type se importa desde collectionHeroTypes.ts para que CollectionsSection
    y CollectionHero compartan una misma definición sin crear dependencia
    circular entre archivos.
  */
  const [heroMode, setHeroMode] = useState<CollectionHeroMode>("intro");

  /*
    CATEGORÍA ACTIVA DERIVADA
    ---------------------------------------------------------------------------
    A partir del id de categoría activa, obtenemos el objeto completo de la
    categoría.

    useMemo evita recalcular la búsqueda en cada render, salvo cuando cambia
    activeCategoryId.
  */
  const activeCategory = useMemo(() => {
    const category = collectionCategories.find(
      (item) => item.id === activeCategoryId,
    );

    return category ?? collectionCategories[0];
  }, [activeCategoryId]);

  /*
    CAMBIO DE CATEGORÍA
    ---------------------------------------------------------------------------
    Al cambiar de Pisos SPC a Wall Panels, o viceversa:
    1. Se actualiza la categoría activa.
    2. Se selecciona automáticamente el primer producto de esa categoría.

    Esto conserva coherencia entre categoría, listado visible y render principal.
  */
  function handleCategoryChange(categoryId: CollectionCategory) {
    setActiveCategoryId(categoryId);
    setSelectedProduct(getFirstProductByCategory(categoryId));
  }

  /*
    CAMBIO DE PRODUCTO
    ---------------------------------------------------------------------------
    Al seleccionar un producto del carrusel, se actualiza selectedProduct.

    Como selectedProduct se pasa a CollectionHero, el render principal cambia
    automáticamente.
  */
  function handleProductSelect(product: CollectionProduct) {
    setSelectedProduct(product);
  }

  return (
    <section
      id="catalogo-zenstyle-2026"
      className="w-full bg-stone-100 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="overflow-hidden rounded-3xl bg-stone-50 shadow-2xl ring-1 ring-stone-200">
          {/*
            BARRA SUPERIOR
            -------------------------------------------------------------------
            Este bloque es estructural de la sección, no de la Hero interactiva.

            Aquí se conserva:
            - fondo grafito/zinc;
            - logo horizontal blanco;
            - texto Catálogo 2026.
          */}
          <div className="flex items-center justify-between bg-zinc-800 px-16 py-4 text-white lg:px-10">
            <Image
              src="/images/brand/logo-zenstyle-horizontal-white.svg"
              alt="Zenstyle"
              width={160}
              height={40}
              className="h-20 w-auto"
              priority
            />

            <p className="hidden text-2xl font-semibold uppercase tracking-widest text-white/70 sm:block">
              Catálogo&nbsp;&nbsp;2026
            </p>
          </div>

          <CollectionHero
            heroMode={heroMode}
            selectedProduct={selectedProduct}
            activeCategory={activeCategory}
            activeCategoryId={activeCategoryId}
            onHeroModeChange={setHeroMode}
            onCategoryChange={handleCategoryChange}
            onProductSelect={handleProductSelect}
          />

          <div className="bg-zinc-800 px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            Zenstyle&nbsp;&nbsp;|&nbsp;&nbsp;Elevamos tus espacios
          </div>
        </div>
      </div>
    </section>
  );
}
