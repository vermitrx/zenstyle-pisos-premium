export type SpaceType = "residential" | "commercial";

export type ProductCategory = "floor" | "wallPanel";

export type Marketplace2Product = {
  id: string;
  label: string;
  slug: string;
  category: ProductCategory;
  thumbnail: string;

  /**
   * Indica si el producto tiene algún preview grande asociado.
   *
   * Nota:
   * Un producto puede tener preview individual, pero no necesariamente
   * preview en todas sus combinaciones posibles.
   */
  previewAvailable: boolean;
};

export const spaceTypes: {
  id: SpaceType;
  switchLabel: string;
  summaryLabel: string;
}[] = [
  {
    id: "residential",
    switchLabel: "Residencial",
    summaryLabel: "Residential",
  },
  {
    id: "commercial",
    switchLabel: "Comercial",
    summaryLabel: "Commercial",
  },
];

export const floors: Marketplace2Product[] = [
  {
    id: "floor-london",
    label: "London",
    slug: "floor-london",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-london.webp",
    previewAvailable: true,
  },
  {
    id: "floor-madrid",
    label: "Madrid",
    slug: "floor-madrid",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-madrid.webp",
    previewAvailable: true,
  },
  {
    id: "floor-la",
    label: "Los Ángeles",
    slug: "floor-la",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-la.webp",
    previewAvailable: true,
  },
  {
    id: "floor-vevey",
    label: "Vevey",
    slug: "floor-vevey",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-vevey.webp",
    previewAvailable: true,
  },
  {
    id: "floor-lisbon",
    label: "Lisbon",
    slug: "floor-lisbon",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-lisbon.webp",
    previewAvailable: false,
  },
  {
    id: "floor-sf",
    label: "San Francisco",
    slug: "floor-sf",
    category: "floor",
    thumbnail: "/images/marketplace2/thumbnails/floors/thumb-floor-sf.webp",
    previewAvailable: false,
  },
];

export const wallPanels: Marketplace2Product[] = [
  {
    id: "wall-panel-gs-loria",
    label: "Grain Series Loria",
    slug: "wall-panel-gs-loria",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-gs-loria.webp",
    previewAvailable: true,
  },
  {
    id: "wall-panel-pet-marble-1",
    label: "Marble 1",
    slug: "wall-panel-pet-marble-1",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-pet-marble-1.webp",
    previewAvailable: true,
  },
  {
    id: "wall-panel-luver-wood",
    label: "Luver Wood",
    slug: "wall-panel-luver-wood",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-luver-wood.webp",
    previewAvailable: true,
  },
  {
    id: "wall-panel-metal-silver",
    label: "Metallic Silver",
    slug: "wall-panel-metal-silver",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-metal-silver.webp",
    previewAvailable: true,
  },
  {
    id: "wall-panel-ss-pistaccio",
    label: "Skin Series Pistaccio",
    slug: "wall-panel-ss-pistaccio",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-ss-pistaccio.webp",
    previewAvailable: false,
  },
  {
    id: "wall-panel-gs-white",
    label: "Grain Series White",
    slug: "wall-panel-gs-white",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-gs-white.webp",
    previewAvailable: false,
  },
  {
    id: "wall-panel-metal-wine",
    label: "Metallic Wine",
    slug: "wall-panel-metal-wine",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-metal-wine.webp",
    previewAvailable: false,
  },
  {
    id: "wall-panel-pet-marble-2",
    label: "Marble 2",
    slug: "wall-panel-pet-marble-2",
    category: "wallPanel",
    thumbnail:
      "/images/marketplace2/thumbnails/wall-panels/thumb-wall-panel-pet-marble-2.webp",
    previewAvailable: false,
  },
];