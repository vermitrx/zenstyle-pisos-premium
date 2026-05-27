"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
} from "@/data/collections/products";

import CollectionHero from "@/components/sections/collections/CollectionHero";

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

  Este archivo NO debe resolver la composición visual completa.
  Para mantener mantenimiento, lectura y escalabilidad, delega la UI a los
  componentes modulares ubicados en:

  src/components/sections/collections/

  PRINCIPIO FUNCIONAL
  -----------------------------------------------------------------------------
  CollectionsSection NO combina pisos + wall panels.

  La lógica correcta es:

  categoría activa
  → producto activo
  → renders propios del producto
  → imagen principal dinámica.

  La lógica de combinaciones tipo selectedFloor + selectedWallPanel pertenece a
  Marketplace, no a CollectionsSection.
*/

/*
  CollectionHeroMode
  -----------------------------------------------------------------------------
  Define los tres estados visuales posibles de la Hero.

  "intro":
  - Se muestra el bloque editorial: texto + overlay.
  - Se muestran los botones flotantes inferiores:
    - Ver ficha técnica
    - Ver catálogo

  "catalog":
  - Se oculta el bloque editorial.
  - Se ocultan los botones flotantes inferiores.
  - Se muestra el dock inferior con switch + productos.

  "collapsed":
  - Se mantiene la imagen limpia.
  - Se oculta el dock inferior.
  - Se muestran nuevamente los botones flotantes inferiores.

  Nota didáctica:
  Usar un union type evita manejar varios booleanos simultáneos, lo que reduce
  combinaciones inválidas de UI.
*/
type CollectionHeroMode = "intro" | "catalog" | "collapsed";

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
    Controla qué grupo de productos está visible:
    - "floors"
    - "wallPanels"
  */
  const [activeCategoryId, setActiveCategoryId] =
    useState<CollectionCategory>("floors");

  /*
    ESTADO FUNCIONAL: PRODUCTO ACTIVO
    ---------------------------------------------------------------------------
    Controla qué producto alimenta el render principal de la Hero image.
  */
  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct>(
    () => getFirstProductByCategory("floors"),
  );

  /*
    ESTADO VISUAL: MODO DE LA HERO
    ---------------------------------------------------------------------------
    Sustituye la lógica booleana anterior de isCatalogOpen.

    Esto permite distinguir:
    - estado editorial inicial;
    - estado de catálogo abierto;
    - estado colapsado con imagen limpia.
  */
  const [heroMode, setHeroMode] = useState<CollectionHeroMode>("intro");

  /*
    CATEGORÍA ACTIVA DERIVADA
    ---------------------------------------------------------------------------
    A partir del id activo, obtenemos el objeto completo de categoría.

    useMemo evita recalcular esta búsqueda salvo cuando cambia activeCategoryId.
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
    Al cambiar entre Pisos SPC y Wall Panels:
    1. Se actualiza la categoría activa.
    2. Se selecciona el primer producto de la nueva categoría.

    Esto mantiene coherencia entre categoría, carrusel y render principal.
  */
  function handleCategoryChange(categoryId: CollectionCategory) {
    setActiveCategoryId(categoryId);
    setSelectedProduct(getFirstProductByCategory(categoryId));
  }

  /*
    CAMBIO DE PRODUCTO
    ---------------------------------------------------------------------------
    Al seleccionar un modelo, se actualiza selectedProduct.

    CollectionHero recibe selectedProduct y actualiza la imagen principal.
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
            HEADER DE LA SECCIÓN
            -------------------------------------------------------------------
            Este bloque contiene la identidad visual superior del card:
            - logo blanco;
            - fondo grafito/zinc;
            - texto de catálogo.

            No participa en la lógica interactiva de la Hero.
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
