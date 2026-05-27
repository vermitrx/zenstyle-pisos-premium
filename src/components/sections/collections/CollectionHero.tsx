import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

import CatalogPicture from "@/components/sections/collections/CatalogPicture";
import CollectionCatalogPanel from "@/components/sections/collections/CollectionCatalogPanel";
import CollectionIntroOverlay from "@/components/sections/collections/CollectionIntroOverlay";

type ActiveCategory = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

type CollectionHeroProps = {
  selectedProduct: CollectionProduct;
  activeCategory: ActiveCategory;
  activeCategoryId: CollectionCategory;
  isCatalogOpen: boolean;
  onCatalogOpenChange: (isOpen: boolean) => void;
  onCategoryChange: (categoryId: CollectionCategory) => void;
  onProductSelect: (product: CollectionProduct) => void;
};

export default function CollectionHero({
  selectedProduct,
  activeCategory,
  activeCategoryId,
  isCatalogOpen,
  onCatalogOpenChange,
  onCategoryChange,
  onProductSelect,
}: CollectionHeroProps) {
  return (
    <div
      className="relative aspect-91/36 overflow-hidden bg-stone-200"
      onPointerEnter={() => onCatalogOpenChange(true)}
      onPointerLeave={() => onCatalogOpenChange(false)}
    >
      <CatalogPicture
        image={selectedProduct.renders.livingRoom}
        alt={`Ambiente principal con ${selectedProduct.name}`}
        className="h-full w-full object-cover"
        loading="eager"
      />

      <CollectionIntroOverlay isVisible={!isCatalogOpen} />

      <CollectionCatalogPanel
        isVisible={isCatalogOpen}
        selectedProduct={selectedProduct}
        activeCategory={activeCategory}
        activeCategoryId={activeCategoryId}
        onCategoryChange={onCategoryChange}
        onProductSelect={onProductSelect}
      />

      <button
        type="button"
        onClick={() => onCatalogOpenChange(!isCatalogOpen)}
        className="absolute bottom-5 right-5 rounded-full bg-white/90 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-stone-800 shadow-lg ring-1 ring-stone-200 backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 lg:hidden"
      >
        Explorar catálogo
      </button>
    </div>
  );
}