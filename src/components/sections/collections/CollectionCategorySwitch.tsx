import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

type CategoryItem = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

type CollectionCategorySwitchProps = {
  categories: CategoryItem[];
  activeCategoryId: CollectionCategory;
  onCategoryChange: (categoryId: CollectionCategory) => void;
};

export default function CollectionCategorySwitch({
  categories,
  activeCategoryId,
  onCategoryChange,
}: CollectionCategorySwitchProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-full bg-white/70 p-1 shadow-lg ring-1 ring-stone-200">
      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
              isActive
                ? "bg-stone-950 text-white shadow-sm"
                : "text-stone-600 ring-1 ring-stone-500 hover:bg-white hover:text-stone-950"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}