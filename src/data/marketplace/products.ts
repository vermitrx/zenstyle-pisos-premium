export type SpaceType = "home" | "commercial";

export type ProductCategory = "floor" | "wallPanel";

export type MarketplaceProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  thumbnail: string;

  /**
   * Indica si este producto participa en previews grandes pre-renderizados.
   *
   * En esta etapa de prototipado todos los productos visibles tienen preview.
   * En producción, cuando el catálogo crezca, algunos productos podrán existir
   * solo como thumbnail y requerir visualización personalizada.
   */
  previewAvailable: boolean;
};

export const spaceTypes: {
  id: SpaceType;
  label: string;
}[] = [
  {
    id: "home",
    label: "Casa",
  },
  {
    id: "commercial",
    label: "Oficina / Comercio",
  },
];

export const floors: MarketplaceProduct[] = [
  {
    id: "floor-a",
    name: "Piso A",
    category: "floor",
    thumbnail: "/images/marketplace/thumbnails/floors/floor-a.webp",
    previewAvailable: true,
  },
  {
    id: "floor-b",
    name: "Piso B",
    category: "floor",
    thumbnail: "/images/marketplace/thumbnails/floors/floor-b.webp",
    previewAvailable: true,
  },
];

export const wallPanels: MarketplaceProduct[] = [
  {
    id: "wall-a",
    name: "Wall Panel A",
    category: "wallPanel",
    thumbnail: "/images/marketplace/thumbnails/wall-panels/wall-a.webp",
    previewAvailable: true,
  },
  {
    id: "wall-b",
    name: "Wall Panel B",
    category: "wallPanel",
    thumbnail: "/images/marketplace/thumbnails/wall-panels/wall-b.webp",
    previewAvailable: true,
  },
];