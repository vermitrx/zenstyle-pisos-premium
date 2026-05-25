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

  Objetivo futuro:
  Cuando Zenstyle evolucione hacia una etapa dinámica, esta estructura podrá
  migrarse a una base de datos, CMS, API o CRM sin rediseñar la UI completa.

  Decisión funcional importante para CollectionsSection:
  En esta sección NO habrá combinación piso + wall panel.

  La lógica será:
  Categoría activa → Producto activo → Renders del producto → Data técnica.

  Esto significa que cada producto, sea piso SPC o wall panel, tiene sus propios
  renders asociados. Al seleccionar un producto, cambian sus dos imágenes:
  - sala;
  - recámara/comedor.

  NO se debe construir una lógica tipo:
  selectedFloor + selectedWallPanel → render combinado.

  Esa lógica pertenece a otro tipo de sección, no a CollectionsSection.
*/

/*
  Categorías internas del catálogo.

  Usamos nombres técnicos en inglés porque serán más cómodos para código,
  filtros, estados y futuras integraciones.

  - "floors" representa Pisos SPC.
  - "wallPanels" representa Wall Panels.

  No usar aquí labels visibles como "Pisos SPC" o "Wall Panels".
  Los labels visibles viven más abajo en collectionCategories.
*/
export type CollectionCategory = "floors" | "wallPanels";

/*
  ProductImage
  -----------------------------------------------------------------------------
  Modelo estándar para imágenes reutilizables de producto.

  Decisión técnica del proyecto:
  - AVIF será el formato principal.
  - WebP será el fallback.

  Por eso NO guardamos una sola ruta como string.
  Guardamos ambas rutas explícitamente.

  Ejemplo:
  thumbnail: {
    avif: "/images/catalog/thumbs/floor-london-thumb.avif",
    webp: "/images/catalog/thumbs/floor-london-thumb.webp",
  }

  Esto permite que después el componente renderice la imagen con <picture>,
  <source type="image/avif" />, <source type="image/webp" /> e <img />.
*/
export type ProductImage = {
  avif: string;
  webp: string;
};

/*
  ProductRenders
  -----------------------------------------------------------------------------
  Modelo para las imágenes principales asociadas a cada producto.

  Cada producto de CollectionsSection tendrá dos renders:

  1. livingRoom
     Imagen principal tipo sala. Será la imagen dominante del layout final.

  2. bedroom
     Segunda imagen de apoyo. Aunque en esta etapa pueda ser una escena tipo
     comedor, se nombra como bedroom porque la intención final es que represente
     la segunda habitación / recámara del producto aplicado.

  Importante:
  Estos renders pertenecen al producto activo. No son combinaciones entre pisos
  y wall panels.

  Ejemplo:
  selectedProduct.renders.livingRoom
  selectedProduct.renders.bedroom
*/
export type ProductRenders = {
  livingRoom: ProductImage;
  bedroom: ProductImage;
};

/*
  BenefitIcon
  -----------------------------------------------------------------------------
  Lista controlada de nombres técnicos para íconos de beneficios.

  La intención es que la data NO importe componentes visuales.
  En lugar de eso, cada beneficio declara un nombre técnico de ícono.

  Después, en CollectionsSection o en un subcomponente, se podrá hacer un mapa:

  const benefitIcons = {
    water: DropletIcon,
    installation: ToolsIcon,
    resistance: ShieldIcon,
    pets: PawIcon,
  }

  Así la data permanece limpia y desacoplada de la UI.
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

  Ejemplo visual:
  Formato:       228 x 1524 mm
  Espesor total: 5.5 mm

  Mantener esta estructura simple facilita que después la UI pueda renderizar
  las specs con .map() sin hardcodear filas manualmente.
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
  - icon: nombre técnico del ícono que la UI deberá resolver.

  Aunque de inicio varios productos compartan los mismos beneficios, los
  beneficios viven dentro de cada producto para permitir variaciones futuras.

  Ejemplo futuro:
  Un piso puede tener "Uso comercial intenso" y otro no.
*/
export type CollectionBenefit = {
  label: string;
  icon: BenefitIcon;
};

/*
  CollectionProduct
  -----------------------------------------------------------------------------
  Modelo principal de producto para CollectionsSection.

  Esta estructura debe ser suficientemente rica para alimentar:
  - lista de productos;
  - thumbnails;
  - render principal de sala;
  - render secundario de recámara/comedor;
  - panel de información;
  - especificaciones técnicas;
  - beneficios;
  - modal de captación;
  - ficha técnica PDF.

  Campos:
  - id: identificador único y estable para React, selección y tracking.
  - name: nombre comercial visible.
  - slug: versión amigable para rutas, archivos o futuras URLs.
  - category: familia técnica del producto.
  - collection: colección visible o familia comercial.
  - thumbnail: imagen pequeña AVIF/WebP para selectores.
  - renders: set de imágenes principales asociadas al producto.
  - pdfUrl: ruta de la ficha técnica.
  - description: copy breve para panel de producto.
  - specs: especificaciones técnicas.
  - benefits: beneficios propios del producto.
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

  CollectionsSection podrá usar esta estructura así:
  - pintar botones de categoría;
  - encontrar la categoría activa;
  - obtener los productos visibles;
  - elegir un producto random al cargar o cambiar categoría.
*/
export type CollectionCategoryGroup = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

/*
  Rutas centrales de assets reutilizables.
  -----------------------------------------------------------------------------
  Estas rutas NO pertenecen a CollectionsSection exclusivamente.

  Son assets de catálogo/producto y podrán ser usados por:
  - CollectionsSection;
  - MarketPlaceSection;
  - MarketPlace2Section;
  - modales;
  - cards futuras;
  - futuras páginas de producto.

  Regla del proyecto:
  Si el asset representa un producto, vive en /catalog.
  Si el asset representa una sección específica, vive en la carpeta de esa sección.
*/
const catalogThumbsPath = "/images/catalog/thumbs";
const catalogRendersPath = "/images/catalog/renders";
const techSpecsPath = "/pdfs/tech-specs";

/*
  createProductImage
  -----------------------------------------------------------------------------
  Helper pequeño para evitar repetir manualmente las rutas .avif y .webp.

  Recibe:
  - basePath: carpeta donde vive la imagen.
  - fileName: nombre base sin extensión.

  Devuelve:
  {
    avif: `${basePath}/${fileName}.avif`,
    webp: `${basePath}/${fileName}.webp`,
  }

  Ventaja:
  Si respetamos el mismo nombre base para AVIF y WebP, la data queda más limpia.

  Ejemplo:
  createProductImage(catalogThumbsPath, "floor-london-thumb")

  genera:
  /images/catalog/thumbs/floor-london-thumb.avif
  /images/catalog/thumbs/floor-london-thumb.webp
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
  Helper para crear el set de dos renders asociados a un producto.

  Recibe:
  - productFileBase: nombre base del producto sin sufijo de ambiente.

  Genera automáticamente:
  - [productFileBase]-living-room.avif / .webp
  - [productFileBase]-bedroom.avif / .webp

  Ejemplo:
  createProductRenders("floor-london")

  genera:
  /images/catalog/renders/floor-london-living-room.avif
  /images/catalog/renders/floor-london-living-room.webp
  /images/catalog/renders/floor-london-bedroom.avif
  /images/catalog/renders/floor-london-bedroom.webp

  Nota de mantenimiento:
  Si más adelante se agrega una tercera escena, por ejemplo "kitchen", este tipo
  y este helper serán el punto correcto para ampliar la estructura.
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
  Specs placeholder para Pisos SPC.
  -----------------------------------------------------------------------------
  Estos valores son temporales.

  Cuando se tengan las fichas técnicas reales, reemplazar los placeholders por
  datos exactos de cada modelo.

  Aunque hoy todos los pisos compartan specs, se asignan dentro de cada producto.
  Si un modelo cambia en el futuro, puede recibir su propio array de specs sin
  modificar la estructura del componente.
*/
const defaultFloorSpecs: CollectionSpec[] = [
  { label: "Formato", value: "Placeholder" },
  { label: "Espesor total", value: "Placeholder" },
  { label: "Capa de uso", value: "Placeholder" },
  { label: "Sistema", value: "Click Lock" },
];

/*
  Beneficios placeholder para Pisos SPC.
  -----------------------------------------------------------------------------
  Se declaran como base inicial, pero cada producto conserva su propia propiedad
  benefits para permitir variaciones futuras.
*/
const defaultFloorBenefits: CollectionBenefit[] = [
  { label: "Resistente al agua", icon: "water" },
  { label: "Fácil instalación", icon: "installation" },
  { label: "Alta resistencia", icon: "resistance" },
  { label: "Apto para mascotas", icon: "pets" },
];

/*
  Specs placeholder para Wall Panels.
  -----------------------------------------------------------------------------
  Estos valores son temporales hasta tener los datos técnicos definitivos de
  los tres modelos reales de wall panels.
*/
const defaultWallPanelSpecs: CollectionSpec[] = [
  { label: "Formato", value: "Placeholder" },
  { label: "Espesor", value: "Placeholder" },
  { label: "Material", value: "Placeholder" },
  { label: "Uso recomendado", value: "Interior" },
];

/*
  Beneficios placeholder para Wall Panels.
  -----------------------------------------------------------------------------
  Igual que en pisos, se parte de beneficios comunes pero se mantienen dentro
  de cada producto para futura personalización.
*/
const defaultWallPanelBenefits: CollectionBenefit[] = [
  { label: "Diseño decorativo", icon: "design" },
  { label: "Instalación rápida", icon: "installation" },
  { label: "Bajo mantenimiento", icon: "maintenance" },
  { label: "Acabado premium", icon: "premium" },
];

/*
  collectionFloors
  -----------------------------------------------------------------------------
  Catálogo inicial de Pisos SPC.

  Modelos definidos para esta primera versión:
  - Los Angeles
  - Lisbon
  - London
  - Madrid
  - San Francisco
  - Vevey

  Naming de assets:
  - Thumb:           floor-[slug]-thumb.avif / .webp
  - Render sala:    floor-[slug]-living-room.avif / .webp
  - Render recámara: floor-[slug]-bedroom.avif / .webp
  - PDF:             floor-[slug].pdf

  Ejemplo para London:
  public/images/catalog/thumbs/floor-london-thumb.avif
  public/images/catalog/thumbs/floor-london-thumb.webp
  public/images/catalog/renders/floor-london-living-room.avif
  public/images/catalog/renders/floor-london-living-room.webp
  public/images/catalog/renders/floor-london-bedroom.avif
  public/images/catalog/renders/floor-london-bedroom.webp
  public/pdfs/tech-specs/floor-london.pdf
*/
export const collectionFloors: CollectionProduct[] = [
  {
    id: "floor-los-angeles",
    name: "Los Angeles",
    slug: "los-angeles",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(catalogThumbsPath, "floor-los-angeles-thumb"),
    renders: createProductRenders("floor-los-angeles"),
    pdfUrl: `${techSpecsPath}/floor-los-angeles.pdf`,
    description:
      "Piso SPC de apariencia premium, diseñado para aportar calidez, resistencia y continuidad visual en espacios interiores.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
  {
    id: "floor-lisbon",
    name: "Lisbon",
    slug: "lisbon",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(catalogThumbsPath, "floor-lisbon-thumb"),
    renders: createProductRenders("floor-lisbon"),
    pdfUrl: `${techSpecsPath}/floor-lisbon.pdf`,
    description:
      "Piso SPC con estética sobria y versátil, ideal para ambientes residenciales y comerciales con diseño contemporáneo.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
  {
    id: "floor-london",
    name: "London",
    slug: "london",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(catalogThumbsPath, "floor-london-thumb"),
    renders: createProductRenders("floor-london"),
    pdfUrl: `${techSpecsPath}/floor-london.pdf`,
    description:
      "Piso SPC de tono natural, pensado para crear espacios cálidos, elegantes y de alto desempeño.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
  {
    id: "floor-madrid",
    name: "Madrid",
    slug: "madrid",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(catalogThumbsPath, "floor-madrid-thumb"),
    renders: createProductRenders("floor-madrid"),
    pdfUrl: `${techSpecsPath}/floor-madrid.pdf`,
    description:
      "Piso SPC con presencia visual equilibrada, adecuado para proyectos que buscan durabilidad y diseño atemporal.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
  {
    id: "floor-san-francisco",
    name: "San Francisco",
    slug: "san-francisco",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(
      catalogThumbsPath,
      "floor-san-francisco-thumb",
    ),
    renders: createProductRenders("floor-san-francisco"),
    pdfUrl: `${techSpecsPath}/floor-san-francisco.pdf`,
    description:
      "Piso SPC de carácter moderno, desarrollado para interiores con una estética limpia, técnica y sofisticada.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
  {
    id: "floor-vevey",
    name: "Vevey",
    slug: "vevey",
    category: "floors",
    collection: "Colección SPC",
    thumbnail: createProductImage(catalogThumbsPath, "floor-vevey-thumb"),
    renders: createProductRenders("floor-vevey"),
    pdfUrl: `${techSpecsPath}/floor-vevey.pdf`,
    description:
      "Piso SPC de acabado elegante, ideal para espacios que requieren resistencia, diseño y una sensación premium.",
    specs: defaultFloorSpecs,
    benefits: defaultFloorBenefits,
  },
];

/*
  collectionWallPanels
  -----------------------------------------------------------------------------
  Catálogo inicial de Wall Panels.

  En esta etapa existen tres modelos placeholder:
  - Wall Panel 01
  - Wall Panel 02
  - Wall Panel 03

  Cuando tengas los nombres comerciales reales, se deberán actualizar:
  - id
  - name
  - slug
  - collection
  - thumbnail
  - renders
  - pdfUrl
  - description
  - specs
  - benefits, si aplica

  Naming temporal:
  - wall-panel-01-thumb.avif / .webp
  - wall-panel-01-living-room.avif / .webp
  - wall-panel-01-bedroom.avif / .webp
  - wall-panel-01.pdf
*/
export const collectionWallPanels: CollectionProduct[] = [
  {
    id: "wall-panel-01",
    name: "Wall Panel 01",
    slug: "wall-panel-01",
    category: "wallPanels",
    collection: "Colección Wall Panels",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-01-thumb"),
    renders: createProductRenders("wall-panel-01"),
    pdfUrl: `${techSpecsPath}/wall-panel-01.pdf`,
    description:
      "Wall panel decorativo para interiores, diseñado para elevar la presencia visual de muros principales y espacios de alto impacto.",
    specs: defaultWallPanelSpecs,
    benefits: defaultWallPanelBenefits,
  },
  {
    id: "wall-panel-02",
    name: "Wall Panel 02",
    slug: "wall-panel-02",
    category: "wallPanels",
    collection: "Colección Wall Panels",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-02-thumb"),
    renders: createProductRenders("wall-panel-02"),
    pdfUrl: `${techSpecsPath}/wall-panel-02.pdf`,
    description:
      "Wall panel de acabado premium, ideal para generar muros acento en salas, recepciones, recámaras o espacios comerciales.",
    specs: defaultWallPanelSpecs,
    benefits: defaultWallPanelBenefits,
  },
  {
    id: "wall-panel-03",
    name: "Wall Panel 03",
    slug: "wall-panel-03",
    category: "wallPanels",
    collection: "Colección Wall Panels",
    thumbnail: createProductImage(catalogThumbsPath, "wall-panel-03-thumb"),
    renders: createProductRenders("wall-panel-03"),
    pdfUrl: `${techSpecsPath}/wall-panel-03.pdf`,
    description:
      "Wall panel para interiores con enfoque decorativo, pensado para aportar textura, profundidad y sofisticación al espacio.",
    specs: defaultWallPanelSpecs,
    benefits: defaultWallPanelBenefits,
  },
];

/*
  collectionCategories
  -----------------------------------------------------------------------------
  Estructura lista para el switch de categoría en CollectionsSection.

  Esta estructura permite que la UI no tenga que saber manualmente qué productos
  pertenecen a cada categoría.

  Uso esperado:
  - activeCategoryId = "floors" | "wallPanels"
  - activeCategory = collectionCategories.find(...)
  - activeProducts = activeCategory.products

  Al cambiar de categoría, la sección podrá seleccionar aleatoriamente uno de
  los productos de activeProducts.
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

  Puede ser útil para:
  - búsquedas globales;
  - validaciones;
  - generación de rutas futuras;
  - sitemap futuro;
  - lookup por id;
  - integración con CRM o analytics.

  CollectionsSection probablemente usará más collectionCategories, pero este
  array plano deja preparada la data para necesidades futuras.
*/
export const collectionProducts: CollectionProduct[] = [
  ...collectionFloors,
  ...collectionWallPanels,
];
