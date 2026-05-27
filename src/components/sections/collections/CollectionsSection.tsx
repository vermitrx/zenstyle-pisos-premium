"use client";

import { useMemo, useState } from "react";

import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
} from "@/data/collections/products";

import CollectionHero from "@/components/sections/collections/CollectionHero";

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
  const [activeCategoryId, setActiveCategoryId] =
    useState<CollectionCategory>("floors");

  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct>(
    () => getFirstProductByCategory("floors"),
  );

  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const activeCategory = useMemo(() => {
    const category = collectionCategories.find(
      (item) => item.id === activeCategoryId,
    );

    return category ?? collectionCategories[0];
  }, [activeCategoryId]);

  function handleCategoryChange(categoryId: CollectionCategory) {
    setActiveCategoryId(categoryId);
    setSelectedProduct(getFirstProductByCategory(categoryId));
  }

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
          <div className="flex items-center justify-between bg-stone-950 px-6 py-4 text-white lg:px-10">
            <p className="text-lg font-semibold uppercase tracking-widest">
              LOGO Zenstyle
            </p>

            <p className="hidden text-lg font-semibold uppercase tracking-widest text-white/70 sm:block">
              Catálogo 2026
            </p>
          </div>

          <CollectionHero
            selectedProduct={selectedProduct}
            activeCategory={activeCategory}
            activeCategoryId={activeCategoryId}
            isCatalogOpen={isCatalogOpen}
            onCatalogOpenChange={setIsCatalogOpen}
            onCategoryChange={handleCategoryChange}
            onProductSelect={handleProductSelect}
          />

          <div className="bg-stone-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            Zenstyle&nbsp;&nbsp;|&nbsp;&nbsp;Elevamos tus espacios
          </div>
        </div>
      </div>
    </section>
  );
}