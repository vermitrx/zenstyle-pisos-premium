import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
} from "@/data/collections/products";

import CollectionCategorySwitch from "@/components/sections/collections/CollectionCategorySwitch";
import CollectionProductList from "@/components/sections/collections/CollectionProductList";

type ActiveCategory = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

type CollectionCatalogPanelProps = {
  isVisible: boolean;
  selectedProduct: CollectionProduct;
  activeCategory: ActiveCategory;
  activeCategoryId: CollectionCategory;
  onCategoryChange: (categoryId: CollectionCategory) => void;
  onProductSelect: (product: CollectionProduct) => void;
};

export default function CollectionCatalogPanel({
  isVisible,
  selectedProduct,
  activeCategory,
  activeCategoryId,
  onCategoryChange,
  onProductSelect,
}: CollectionCatalogPanelProps) {
  return (
    <div
      className={`absolute inset-x-8 bottom-8 transition duration-300 ease-out ${
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-4 scale-95 opacity-0"
      }`}
    >
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