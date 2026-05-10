import type { SpaceType } from "./products";

export type PreviewImage = {
  src: string;
  alt: string;
};

/**
 * Imagen default de la sección.
 *
 * Se usa cuando:
 * 1. La sección carga por primera vez.
 * 2. El usuario selecciona una combinación que no existe en el mapa.
 *
 * Importante:
 * Esta imagen debe ser aspiracional, no un placeholder técnico.
 * Recomendación actual: casa + piso + wall panel.
 */
export const defaultMarketplacePreview: PreviewImage = {
  src: "/images/marketplace/default/home-base.webp",
  alt: "Espacio residencial base para personalizar con pisos SPC y wall panels Zen Style",
};

/**
 * Set temporal de previews para prototipo.
 *
 * En esta fase, tanto "Casa" como "Oficina / Comercio" usarán estas mismas
 * imágenes residenciales.
 *
 * En producción, se podrá crear un set específico para "commercial" sin tocar
 * la lógica del componente.
 */
const homePreviewImages: Record<string, PreviewImage> = {
  "floor-a": {
    src: "/images/marketplace/home/floor-a.webp",
    alt: "Casa con Piso A Zen Style",
  },
  "floor-b": {
    src: "/images/marketplace/home/floor-b.webp",
    alt: "Casa con Piso B Zen Style",
  },
  "wall-a": {
    src: "/images/marketplace/home/wall-a.webp",
    alt: "Casa con Wall Panel A Zen Style",
  },
  "wall-b": {
    src: "/images/marketplace/home/wall-b.webp",
    alt: "Casa con Wall Panel B Zen Style",
  },
  "floor-a__wall-a": {
    src: "/images/marketplace/home/floor-a-wall-a.webp",
    alt: "Casa con Piso A y Wall Panel A Zen Style",
  },
  "floor-a__wall-b": {
    src: "/images/marketplace/home/floor-a-wall-b.webp",
    alt: "Casa con Piso A y Wall Panel B Zen Style",
  },
  "floor-b__wall-a": {
    src: "/images/marketplace/home/floor-b-wall-a.webp",
    alt: "Casa con Piso B y Wall Panel A Zen Style",
  },
  "floor-b__wall-b": {
    src: "/images/marketplace/home/floor-b-wall-b.webp",
    alt: "Casa con Piso B y Wall Panel B Zen Style",
  },
};

/**
 * Mapa general de previews.
 *
 * Para prototipo:
 * - home usa imágenes de casa.
 * - commercial también usa imágenes de casa.
 *
 * Para producción:
 * reemplaza el valor de "commercial" por un mapa propio:
 *
 * commercial: {
 *   "floor-a": { src: "/images/marketplace/commercial/floor-a.webp", ... },
 *   ...
 * }
 */
export const marketplacePreviewImages: Record<
  SpaceType,
  Record<string, PreviewImage>
> = {
  home: homePreviewImages,

  // Prototipo: Comercio reutiliza las imágenes residenciales.
  commercial: homePreviewImages,
};