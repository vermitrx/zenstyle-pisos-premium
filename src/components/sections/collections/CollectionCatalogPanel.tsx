import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
} from "@/data/collections/products";

import type { ActiveCollectionCategory } from "@/components/sections/collections/collectionHeroTypes";

import CollectionCategorySwitch from "@/components/sections/collections/CollectionCategorySwitch";
import CollectionProductList from "@/components/sections/collections/CollectionProductList";

/*
  CollectionCatalogPanel.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este componente pinta el dock inferior del catálogo.

  Contiene:
  - switch Pisos SPC | Wall Panels;
  - carrusel horizontal de modelos.

  Este componente NO muestra:
  - texto editorial;
  - descripción;
  - CTA;
  - datos técnicos.

  Su función es exclusivamente permitir navegación rápida entre categorías y
  productos.

  COMPORTAMIENTO
  -----------------------------------------------------------------------------
  Cuando isVisible es true:
  - el panel sube;
  - escala a tamaño normal;
  - gana opacidad.

  Cuando isVisible es false:
  - baja ligeramente;
  - reduce escala;
  - pierde opacidad;
  - queda sin interacción mediante pointer-events-none.
*/

type CollectionCatalogPanelProps = {
  isVisible: boolean;
  selectedProduct: CollectionProduct;
  activeCategory: ActiveCollectionCategory;
  activeCategoryId: CollectionCategory;
  onCategoryChange: (categoryId: CollectionCategory) => void;
  onProductSelect: (product: CollectionProduct) => void;
  onPanelPointerLeave: () => void;
};

export default function CollectionCatalogPanel({
  isVisible,
  selectedProduct,
  activeCategory,
  activeCategoryId,
  onCategoryChange,
  onProductSelect,
  onPanelPointerLeave,
}: CollectionCatalogPanelProps) {
  return (
    <div
      onPointerLeave={onPanelPointerLeave}
      className={`absolute inset-x-8 bottom-8 transition duration-300 ease-out ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
      {/*
        CONTENEDOR GLASS DEL DOCK
        -----------------------------------------------------------------------
        Conserva los ajustes visuales actuales:
        - bg-white/30 para un glass tenue;
        - backdrop-blur-none para no lavar la imagen;
        - ring-white/80 para borde sutil;
        - shadow-2xl para separación visual.
      */}
      <div className="mx-auto max-w-4xl rounded-3xl bg-white/30 px-5 py-4 shadow-2xl ring-1 ring-white/80 backdrop-blur-none">
        <div className="mx-auto max-w-sm">
          <CollectionCategorySwitch
            categories={collectionCategories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <div className="mt-4">
          <CollectionProductList
            products={activeCategory.products}
            selectedProductId={selectedProduct.id}
            onProductSelect={onProductSelect}
          />
        </div>
      </div>
    </div>
  );
}
