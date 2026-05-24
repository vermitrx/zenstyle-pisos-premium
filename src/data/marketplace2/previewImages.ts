import type { SpaceType } from "./products";

export type PreviewImage = {
  src: string;
  alt: string;
};

/**
 * Imágenes base por espacio.
 *
 * Se usan únicamente cuando NO hay selección activa.
 */
export const defaultMarketplace2Previews: Record<SpaceType, PreviewImage> = {
  residential: {
    src: "/images/marketplace2/preview/default/residential/prvw-residential-base.webp",
    alt: "Espacio residencial base para personalizar con pisos SPC y wall panels Zen Style",
  },
  commercial: {
    src: "/images/marketplace2/preview/default/commercial/prvw-commercial-base.webp",
    alt: "Espacio comercial base para personalizar con pisos SPC y wall panels Zen Style",
  },
};

/**
 * Imágenes fallback por espacio.
 *
 * Se usan cuando el usuario ya seleccionó piso y/o wall panel,
 * pero esa selección no tiene preview inmediato disponible.
 */
export const fallbackMarketplace2Previews: Record<SpaceType, PreviewImage> = {
  residential: {
    src: "/images/marketplace2/preview/fallback/residential/prvw-fb-residential.webp",
    alt: "Visualización residencial personalizada disponible bajo solicitud",
  },
  commercial: {
    src: "/images/marketplace2/preview/fallback/commercial/prvw-fb-commercial.webp",
    alt: "Visualización comercial personalizada disponible bajo solicitud",
  },
};

/**
 * Mapa de previews grandes disponibles.
 *
 * Reglas de clave:
 *
 * Solo piso:
 * floor-london
 *
 * Solo wall panel:
 * wall-panel-gs-loria
 *
 * Piso + wall panel:
 * floor-london__wall-panel-gs-loria
 *
 * Se usa doble guion bajo "__" como separador para evitar conflictos,
 * ya que los slugs técnicos contienen guiones normales.
 */
export const marketplace2PreviewImages: Record<
  SpaceType,
  Record<string, PreviewImage>
> = {
  residential: {
    "floor-london": {
      src: "/images/marketplace2/preview/residential/prvw-floor-london.webp",
      alt: "Residencial con piso London Zen Style",
    },
    "floor-madrid": {
      src: "/images/marketplace2/preview/residential/prvw-floor-madrid.webp",
      alt: "Residencial con piso Madrid Zen Style",
    },
    "wall-panel-gs-loria": {
      src: "/images/marketplace2/preview/residential/prvw-wall-panel-gs-loria.webp",
      alt: "Residencial con wall panel Grain Series Loria Zen Style",
    },
    "wall-panel-pet-marble-1": {
      src: "/images/marketplace2/preview/residential/prvw-wall-panel-pet-marble-1.webp",
      alt: "Residencial con wall panel Marble 1 Zen Style",
    },
    "floor-london__wall-panel-gs-loria": {
      src: "/images/marketplace2/preview/residential/prvw-floor-london-wall-panel-gs-loria.webp",
      alt: "Residencial con piso London y wall panel Grain Series Loria Zen Style",
    },
    "floor-london__wall-panel-pet-marble-1": {
      src: "/images/marketplace2/preview/residential/prvw-floor-london-wall-panel-pet-marble-1.webp",
      alt: "Residencial con piso London y wall panel Marble 1 Zen Style",
    },
    "floor-madrid__wall-panel-gs-loria": {
      src: "/images/marketplace2/preview/residential/prvw-floor-madrid-wall-panel-gs-loria.webp",
      alt: "Residencial con piso Madrid y wall panel Grain Series Loria Zen Style",
    },
    "floor-madrid__wall-panel-pet-marble-1": {
      src: "/images/marketplace2/preview/residential/prvw-floor-madrid-wall-panel-pet-marble-1.webp",
      alt: "Residencial con piso Madrid y wall panel Marble 1 Zen Style",
    },
  },

  commercial: {
    "floor-la": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-la.webp",
      alt: "Comercial con piso Los Ángeles Zen Style",
    },
    "floor-vevey": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-vevey.webp",
      alt: "Comercial con piso Vevey Zen Style",
    },
    "wall-panel-luver-wood": {
      src: "/images/marketplace2/preview/commercial/prvw-wall-panel-luver-wood.webp",
      alt: "Comercial con wall panel Luver Wood Zen Style",
    },
    "wall-panel-metal-silver": {
      src: "/images/marketplace2/preview/commercial/prvw-wall-panel-metal-silver.webp",
      alt: "Comercial con wall panel Metallic Silver Zen Style",
    },
    "floor-la__wall-panel-luver-wood": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-la-wall-panel-luver-wood.webp",
      alt: "Comercial con piso Los Ángeles y wall panel Luver Wood Zen Style",
    },
    "floor-la__wall-panel-metal-silver": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-la-wall-panel-metal-silver.webp",
      alt: "Comercial con piso Los Ángeles y wall panel Metallic Silver Zen Style",
    },
    "floor-vevey__wall-panel-luver-wood": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-vevey-wall-panel-luver-wood.webp",
      alt: "Comercial con piso Vevey y wall panel Luver Wood Zen Style",
    },
    "floor-vevey__wall-panel-metal-silver": {
      src: "/images/marketplace2/preview/commercial/prvw-floor-vevey-wall-panel-metal-silver.webp",
      alt: "Comercial con piso Vevey y wall panel Metallic Silver Zen Style",
    },
  },
};