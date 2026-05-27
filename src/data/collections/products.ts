/*
  products.ts
  -----------------------------------------------------------------------------
  Base de datos temporal / placeholder para CollectionsSection.

  Este archivo funciona como la fuente central de productos que serán mostrados
  en la sección de catálogo interactivo de Zenstyle.

  IMPORTANTE:
  - Este archivo NO contiene lógica visual.
  - Este archivo NO contiene estado de React.
  - Este archivo NO abre modales ni PDFs.
  - Este archivo solo define tipos, rutas y datos de producto.

  Objetivo actual:
  Crear una estructura estable y escalable para alimentar CollectionsSection
  antes de conectar una base de datos real.

  Objetivo de esta versión:
  Cada producto tiene valores distintos en descripción, specs y beneficios para
  confirmar visualmente que la lógica de selección está actualizando todas las
  partes de la UI correctamente.

  Decisión funcional importante para CollectionsSection:
  En esta sección NO habrá combinación piso + wall panel.

  La lógica será:
  Categoría activa → Producto activo → Renders del producto → Data técnica.

  Cada producto, sea piso SPC o wall panel, tiene sus propios renders asociados:
  - sala;
  - recámara/comedor.

  NO se debe construir una lógica tipo:
  selectedFloor + selectedWallPanel → render combinado.

  Esa lógica pertenece a secciones tipo Marketplace, no a CollectionsSection.
*/

/*
  Categorías internas del catálogo.

  - "floors" representa Pisos SPC.
  - "wallPanels" representa Wall Panels.

  Los labels visibles para la UI viven en collectionCategories.
*/
export type CollectionCategory = "floors" | "wallPanels";

/*
  ProductImage
  -----------------------------------------------------------------------------
  Modelo estándar para imágenes reutilizables de producto.

  Decisión técnica del proyecto:
  - AVIF será el formato principal.
  - WebP será el fallback.

  Por eso guardamos ambas rutas explícitamente en lugar de una sola ruta string.
*/
export type ProductImage = {
  avif: string;
  webp: string;
};

/*
  ProductRenders
  -----------------------------------------------------------------------------
  Cada producto de CollectionsSection tendrá dos renders:

  - livingRoom: imagen principal, tipo sala.
  - bedroom: imagen secundaria, tipo recámara/comedor.

  Ambos renders pertenecen al producto activo. No son combinaciones entre pisos
  y wall panels.
*/
export type ProductRenders = {
  livingRoom: ProductImage;
  bedroom: ProductImage;
};

/*
  BenefitIcon
  -----------------------------------------------------------------------------
  Lista controlada de nombres técnicos para íconos.

  La data no debe importar componentes visuales. La UI será responsable de
  mapear estos nombres a íconos reales cuando se integre esa fase.
*/
export type BenefitIcon =
  | "water"
  | "installation"
  | "resistance"
  | "pets"
  | "maintenance"
  | "design"
  | "premium"
  | "interior";

/*
  CollectionSpec
  -----------------------------------------------------------------------------
  Cada especificación técnica se muestra como una dupla label/value.

  Mantener esta estructura simple permite que CollectionsSection pinte las filas
  con .map(), sin hardcodear cada parámetro dentro del componente.
*/
export type CollectionSpec = {
  label: string;
  value: string;
};

/*
  CollectionBenefit
  -----------------------------------------------------------------------------
  Cada beneficio tiene:
  - label: texto visible para el usuario.
  - icon: nombre técnico del ícono.

  Aunque varios productos puedan compartir beneficios, se guardan dentro de cada
  producto para permitir variaciones futuras sin rediseñar el modelo.
*/
export type CollectionBenefit = {
  label: string;
  icon: BenefitIcon;
};

/*
  CollectionProduct
  -----------------------------------------------------------------------------
  Modelo principal de producto para CollectionsSection.

  Esta estructura alimenta:
  - lista de productos;
  - thumbnails;
  - render principal de sala;
  - render secundario de recámara/comedor;
  - panel de información;
  - especificaciones técnicas;
  - beneficios;
  - modal de captación futuro;
  - ficha técnica PDF futura.
*/
export type CollectionProduct = {
  id: string;
  name: string;
  slug: string;
  category: CollectionCategory;
  collection: string;
  thumbnail: ProductImage;
  renders: ProductRenders;
  pdfUrl: string;
  description: string;
  specs: CollectionSpec[];
  benefits: CollectionBenefit[];
};

/*
  CollectionCategoryGroup
  -----------------------------------------------------------------------------
  Agrupa productos por categoría para facilitar el switch de la UI.
*/
export type CollectionCategoryGroup = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

/*
  Rutas centrales de assets reutilizables.
  -----------------------------------------------------------------------------
  Estas rutas NO pertenecen solo a CollectionsSection.

  Son assets de catálogo/producto y podrán ser consumidos por:
  - CollectionsSection;
  - MarketPlaceSection;
  - MarketPlace2Section;
  - modales;
  - cards futuras;
  - futuras páginas de producto.
*/
const catalogThumbsPath = "/images/catalog/thumbs";
const catalogRendersPath = "/images/catalog/renders";
const techSpecsPath = "/pdfs/tech-specs";

/*
  createProductImage
  -----------------------------------------------------------------------------
  Helper para evitar repetir manualmente rutas .avif y .webp.

  Recibe:
  - basePath: carpeta donde vive la imagen.
  - fileName: nombre base sin extensión.

  Devuelve:
  - ruta AVIF;
  - ruta WebP.
*/
function createProductImage(basePath: string, fileName: string): ProductImage {
  return {
    avif: `${basePath}/${fileName}.avif`,
    webp: `${basePath}/${fileName}.webp`,
  };
}

/*
  createProductRenders
  -----------------------------------------------------------------------------
  Helper para crear el set de dos renders asociados a cada producto.

  Naming esperado:
  - [productFileBase]-living-room.avif / .webp
  - [productFileBase]-bedroom.avif / .webp
*/
function createProductRenders(productFileBase: string): ProductRenders {
  return {
    livingRoom: createProductImage(
      catalogRendersPath,
      `${productFileBase}-living-room`,
    ),
    bedroom: createProductImage(catalogRendersPath, `${productFileBase}-bedroom`),
  };
}

/*
  collectionFloors
  -----------------------------------------------------------------------------
  Catálogo inicial de Pisos SPC.

  En esta versión, cada producto tiene valores distintos para validar que:
  - specs cambian por producto;
  - beneficios cambian por producto;
  - descripción cambia por producto;
  - thumbnails y renders ya están correctamente vinculados por naming.
*/
export const collectionFloors: CollectionProduct[] = [
  {
    id: "floor-los-angeles",
    name: "Los Angeles",
    slug: "los-angeles",
    category: "floors",
    collection: "Colección SPC Urban Warm",
    thumbnail: createProductImage(catalogThumbsPath, "floor-los-angeles-thumb"),
    renders: createProductRenders("floor-los-angeles"),
    pdfUrl: `${techSpecsPath}/floor-los-angeles.pdf`,
    description:
      "Piso SPC de tono cálido y presencia contemporánea, diseñado para espacios interiores con carácter urbano y alto tránsito cotidiano.",
    specs: [
      { label: "Formato", value: "228 x 1524 mm" },
      { label: "Espesor total", value: "5.5 mm" },
      { label: "Capa de uso", value: "0.5 mm" },
      { label: "Sistema de instalación", value: "Click Lock" },
      { label: "Textura", value: "Madera cálida mate" },
      { label: "Uso recomendado", value: "Residencial / Comercial ligero" },
    ],
    benefits: [
      { label: "Resistente al agua", icon: "water" },
      { label: "Instalación rápida", icon: "installation" },
      { label: "Alta resistencia diaria", icon: "resistance" },
      { label: "Apto para mascotas", icon: "pets" },
    ],
  },
  {
    id: "floor-lisbon",
    name: "Lisbon",
    slug: "lisbon",
    category: "floors",
    collection: "Colección SPC Natural Balance",
    thumbnail: createProductImage(catalogThumbsPath, "floor-lisbon-thumb"),
    renders: createProductRenders("floor-lisbon"),
    pdfUrl: `${techSpecsPath}/floor-lisbon.pdf`,
    description:
      "Piso SPC de apariencia equilibrada y neutral, ideal para proyectos que buscan amplitud visual, sobriedad y fácil mantenimiento.",
    specs: [
      { label: "Formato", value: "228 x 1524 mm" },
      { label: "Espesor total", value: "6.0 mm" },
      { label: "Capa de uso", value: "0.5 mm" },
      { label: "Sistema de instalación", value: "Uniclic" },
      { label: "Textura", value: "Roble natural suave" },
      { label: "Uso recomendado", value: "Residencial premium" },
    ],
    benefits: [
      { label: "Limpieza sencilla", icon: "maintenance" },
      { label: "Estabilidad dimensional", icon: "resistance" },
      { label: "Acabado natural", icon: "premium" },
      { label: "Instalación sin obra húmeda", icon: "installation" },
    ],
  },
  {
    id: "floor-london",
    name: "London",
    slug: "london",
    category: "floors",
    collection: "Colección SPC Classic Wood",
    thumbnail: createProductImage(catalogThumbsPath, "floor-london-thumb"),
    renders: createProductRenders("floor-london"),
    pdfUrl: `${techSpecsPath}/floor-london.pdf`,
    description:
      "Piso SPC de tono madera clásico, pensado para interiores cálidos, elegantes y visualmente atemporales.",
    specs: [
      { label: "Formato", value: "180 x 1220 mm" },
      { label: "Espesor total", value: "5.0 mm" },
      { label: "Capa de uso", value: "0.3 mm" },
      { label: "Sistema de instalación", value: "Click 2G" },
      { label: "Textura", value: "Veta sincronizada" },
      { label: "Uso recomendado", value: "Residencial intensivo" },
    ],
    benefits: [
      { label: "Confort visual cálido", icon: "design" },
      { label: "Resistente a humedad", icon: "water" },
      { label: "Fácil reposición", icon: "maintenance" },
      { label: "Compatible con mascotas", icon: "pets" },
    ],
  },
  {
    id: "floor-madrid",
    name: "Madrid",
    slug: "madrid",
    category: "floors",
    collection: "Colección SPC Soft Grey",
    thumbnail: createProductImage(catalogThumbsPath, "floor-madrid-thumb"),
    renders: createProductRenders("floor-madrid"),
    pdfUrl: `${techSpecsPath}/floor-madrid.pdf`,
    description:
      "Piso SPC de tono gris sobrio, adecuado para espacios modernos que requieren resistencia, neutralidad y continuidad estética.",
    specs: [
      { label: "Formato", value: "228 x 1524 mm" },
      { label: "Espesor total", value: "5.5 mm" },
      { label: "Capa de uso", value: "0.55 mm" },
      { label: "Sistema de instalación", value: "Drop Click" },
      { label: "Textura", value: "Madera gris mate" },
      { label: "Uso recomendado", value: "Residencial / Oficinas" },
    ],
    benefits: [
      { label: "Alta resistencia al desgaste", icon: "resistance" },
      { label: "Diseño neutro profesional", icon: "design" },
      { label: "Bajo mantenimiento", icon: "maintenance" },
      { label: "Apto para interiores", icon: "interior" },
    ],
  },
  {
    id: "floor-san-francisco",
    name: "San Francisco",
    slug: "san-francisco",
    category: "floors",
    collection: "Colección SPC Deep Oak",
    thumbnail: createProductImage(
      catalogThumbsPath,
      "floor-san-francisco-thumb",
    ),
    renders: createProductRenders("floor-san-francisco"),
    pdfUrl: `${techSpecsPath}/floor-san-francisco.pdf`,
    description:
      "Piso SPC de tono profundo y sofisticado, ideal para interiores con contraste, mobiliario claro y acentos premium.",
    specs: [
      { label: "Formato", value: "228 x 1524 mm" },
      { label: "Espesor total", value: "6.5 mm" },
      { label: "Capa de uso", value: "0.7 mm" },
      { label: "Sistema de instalación", value: "Click Pro" },
      { label: "Textura", value: "Roble oscuro cepillado" },
      { label: "Uso recomendado", value: "Comercial moderado" },
    ],
    benefits: [
      { label: "Presencia visual premium", icon: "premium" },
      { label: "Mayor capa de uso", icon: "resistance" },
      { label: "Superficie fácil de limpiar", icon: "maintenance" },
      { label: "Instalación flotante", icon: "installation" },
    ],
  },
  {
    id: "floor-vevey",
    name: "Vevey",
    slug: "vevey",
    category: "floors",
    collection: "Colección SPC Alpine Neutral",
    thumbnail: createProductImage(catalogThumbsPath, "floor-vevey-thumb"),
    renders: createProductRenders("floor-vevey"),
    pdfUrl: `${techSpecsPath}/floor-vevey.pdf`,
    description:
      "Piso SPC de acabado claro y elegante, pensado para espacios luminosos que buscan una sensación limpia, amplia y sofisticada.",
    specs: [
      { label: "Formato", value: "230 x 1500 mm" },
      { label: "Espesor total", value: "5.2 mm" },
      { label: "Capa de uso", value: "0.4 mm" },
      { label: "Sistema de instalación", value: "Click Lock Plus" },
      { label: "Textura", value: "Madera clara satinada" },
      { label: "Uso recomendado", value: "Residencial / Hospitality" },
    ],
    benefits: [
      { label: "Apariencia luminosa", icon: "design" },
      { label: "Resistente al agua", icon: "water" },
      { label: "Acabado premium", icon: "premium" },
      { label: "Apto para mascotas", icon: "pets" },
    ],
  },
];

/*
  collectionWallPanels
  -----------------------------------------------------------------------------
  Catálogo inicial de Wall Panels.

  El naming sigue siendo genérico por decisión operativa. Cuando se definan los
  nombres reales, se actualizarán id, slug, name, copy, specs, rutas y PDFs.

  En esta versión, también tienen valores distintos para probar la lógica.
*/
export const collectionWallPanels: CollectionProduct[] = [
  {
    id: "wall-panel-01",
    name: "Wall Panel 01",
    slug: "wall-panel-01",
    category: "wallPanels",
    collection: "Colección Wall Panels Linear",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-01-thumb"),
    renders: createProductRenders("wall-panel-01"),
    pdfUrl: `${techSpecsPath}/wall-panel-01.pdf`,
    description:
      "Wall panel decorativo de líneas verticales para crear muros acento con profundidad, ritmo visual y acabado cálido.",
    specs: [
      { label: "Formato", value: "160 x 2900 mm" },
      { label: "Espesor", value: "22 mm" },
      { label: "Material", value: "WPC decorativo" },
      { label: "Sistema de instalación", value: "Adhesivo + fijación" },
      { label: "Textura", value: "Listonado madera" },
      { label: "Uso recomendado", value: "Interior residencial" },
    ],
    benefits: [
      { label: "Diseño decorativo", icon: "design" },
      { label: "Instalación rápida", icon: "installation" },
      { label: "Bajo mantenimiento", icon: "maintenance" },
      { label: "Acabado cálido", icon: "premium" },
    ],
  },
  {
    id: "wall-panel-02",
    name: "Wall Panel 02",
    slug: "wall-panel-02",
    category: "wallPanels",
    collection: "Colección Wall Panels Stone",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-02-thumb"),
    renders: createProductRenders("wall-panel-02"),
    pdfUrl: `${techSpecsPath}/wall-panel-02.pdf`,
    description:
      "Wall panel de apariencia pétrea para espacios interiores que requieren una presencia elegante, sobria y arquitectónica.",
    specs: [
      { label: "Formato", value: "1220 x 2440 mm" },
      { label: "Espesor", value: "8 mm" },
      { label: "Material", value: "PVC / compuesto decorativo" },
      { label: "Sistema de instalación", value: "Adhesivo directo" },
      { label: "Textura", value: "Piedra mate" },
      { label: "Uso recomendado", value: "Muros acento interiores" },
    ],
    benefits: [
      { label: "Acabado tipo piedra", icon: "premium" },
      { label: "Fácil limpieza", icon: "maintenance" },
      { label: "Apto para interiores", icon: "interior" },
      { label: "Impacto visual inmediato", icon: "design" },
    ],
  },
  {
    id: "wall-panel-03",
    name: "Wall Panel 03",
    slug: "wall-panel-03",
    category: "wallPanels",
    collection: "Colección Wall Panels Metallic",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-03-thumb"),
    renders: createProductRenders("wall-panel-03"),
    pdfUrl: `${techSpecsPath}/wall-panel-03.pdf`,
    description:
      "Wall panel de acabado metálico decorativo para proyectos que buscan un punto focal sofisticado y contemporáneo.",
    specs: [
      { label: "Formato", value: "600 x 2800 mm" },
      { label: "Espesor", value: "12 mm" },
      { label: "Material", value: "Panel compuesto decorativo" },
      { label: "Sistema de instalación", value: "Fijación oculta" },
      { label: "Textura", value: "Metal satinado" },
      { label: "Uso recomendado", value: "Recepciones / muros focales" },
    ],
    benefits: [
      { label: "Look contemporáneo", icon: "design" },
      { label: "Acabado premium", icon: "premium" },
      { label: "Bajo mantenimiento", icon: "maintenance" },
      { label: "Instalación limpia", icon: "installation" },
    ],
  },
];

/*
  collectionCategories
  -----------------------------------------------------------------------------
  Estructura lista para el switch de categoría en CollectionsSection.

  Este export es requerido por CollectionsSection.tsx.
  No cambiar el nombre sin actualizar también el import del componente.
*/
export const collectionCategories: CollectionCategoryGroup[] = [
  {
    id: "floors",
    label: "Pisos SPC",
    products: collectionFloors,
  },
  {
    id: "wallPanels",
    label: "Wall Panels",
    products: collectionWallPanels,
  },
];

/*
  collectionProducts
  -----------------------------------------------------------------------------
  Array plano con todos los productos.

  Útil para búsquedas, validaciones, generación futura de rutas, integración con
  CRM, analytics o páginas individuales de producto.
*/
export const collectionProducts: CollectionProduct[] = [
  ...collectionFloors,
  ...collectionWallPanels,
];
