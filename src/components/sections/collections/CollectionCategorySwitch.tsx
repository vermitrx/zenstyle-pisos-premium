import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

/*
  CollectionCategorySwitch.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Pinta el switch entre categorías del catálogo.

  Este componente no administra estado interno.
  Recibe la categoría activa desde CollectionsSection y comunica cambios mediante
  onCategoryChange.

  Ajuste visual:
  Los botones del switch usan el mismo color zinc del header/footer para mantener
  consistencia cromática dentro de la sección.
*/

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
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
              isActive
                ? "bg-zinc-800 text-white shadow-sm"
                : "text-zinc-800 ring-1 ring-zinc-800/40 hover:bg-white hover:text-zinc-900"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}
