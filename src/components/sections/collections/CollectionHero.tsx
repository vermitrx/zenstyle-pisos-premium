import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

import type {
  ActiveCollectionCategory,
  CollectionHeroMode,
} from "@/components/sections/collections/collectionHeroTypes";

import CatalogPicture from "@/components/sections/collections/CatalogPicture";
import CollectionCatalogPanel from "@/components/sections/collections/CollectionCatalogPanel";
import CollectionIntroOverlay from "@/components/sections/collections/CollectionIntroOverlay";

/*
  CollectionHero.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Administra la experiencia visual principal de la Hero image.

  Estados visuales:
  - "intro":
    Se muestra texto + botón ficha técnica + overlay.
    También se muestra el botón “Ver catálogo” en la esquina inferior derecha.

  - "catalog":
    Se oculta el bloque editorial.
    Se muestra el dock inferior con switch + productos.

  - "collapsed":
    Se mantiene la imagen limpia.
    Se oculta el dock inferior.
    Se muestra el botón “Ver catálogo” en la parte inferior central.

  Este componente NO administra el producto activo.
  Solo administra qué capa visual se muestra sobre la imagen.
*/

type CollectionHeroProps = {
  heroMode: CollectionHeroMode;
  selectedProduct: CollectionProduct;
  activeCategory: ActiveCollectionCategory;
  activeCategoryId: CollectionCategory;
  onHeroModeChange: (mode: CollectionHeroMode) => void;
  onCategoryChange: (categoryId: CollectionCategory) => void;
  onProductSelect: (product: CollectionProduct) => void;
};

export default function CollectionHero({
  heroMode,
  selectedProduct,
  activeCategory,
  activeCategoryId,
  onHeroModeChange,
  onCategoryChange,
  onProductSelect,
}: CollectionHeroProps) {
  /*
    handleHeroPointerEnter
    ---------------------------------------------------------------------------
    Al entrar el pointer a la Hero, se abre el catálogo solo desde intro.

    Si el estado es collapsed, no se abre automáticamente. En ese caso, el
    usuario debe usar el botón “Ver catálogo”.
  */
  function handleHeroPointerEnter() {
    if (heroMode === "intro") {
      onHeroModeChange("catalog");
    }
  }

  /*
    handleHeroPointerLeave
    ---------------------------------------------------------------------------
    Al salir completamente de la Hero, regresa el estado editorial.

    No se reinicia el producto seleccionado, por lo tanto el último render
    elegido permanece visible cuando reaparece el overlay editorial.
  */
  function handleHeroPointerLeave() {
    onHeroModeChange("intro");
  }

  /*
    handleCatalogPanelPointerLeave
    ---------------------------------------------------------------------------
    Al salir del dock inferior, la Hero pasa a collapsed.

    Resultado:
    - desaparece switch + productos;
    - aparece “Ver catálogo” abajo al centro;
    - la imagen queda limpia.
  */
  function handleCatalogPanelPointerLeave() {
    if (heroMode === "catalog") {
      onHeroModeChange("collapsed");
    }
  }

  /*
    handleOpenCatalog
    ---------------------------------------------------------------------------
    Abre manualmente el catálogo desde el botón “Ver catálogo”.
  */
  function handleOpenCatalog() {
    onHeroModeChange("catalog");
  }

  return (
    <div
      className="relative aspect-[91/36] overflow-hidden bg-stone-200"
      onPointerEnter={handleHeroPointerEnter}
      onPointerLeave={handleHeroPointerLeave}
    >
      {/*
        IMAGEN PRINCIPAL
        -----------------------------------------------------------------------
        Siempre usa selectedProduct.renders.livingRoom.

        Cuando el usuario selecciona otro producto en el carrusel, el estado
        cambia en CollectionsSection y esta imagen se actualiza.
      */}
      <CatalogPicture
        image={selectedProduct.renders.livingRoom}
        alt={`Ambiente principal con ${selectedProduct.name}`}
        className="h-full w-full object-cover"
        loading="eager"
      />

      {/* CAPA 1: visible únicamente en modo intro. */}
      <CollectionIntroOverlay isVisible={heroMode === "intro"} />

      {/*
        CAPA 2: visible únicamente en modo catalog.
        onPanelPointerLeave transforma el modo catalog en collapsed.
      */}
      <CollectionCatalogPanel
        isVisible={heroMode === "catalog"}
        selectedProduct={selectedProduct}
        activeCategory={activeCategory}
        activeCategoryId={activeCategoryId}
        onCategoryChange={onCategoryChange}
        onProductSelect={onProductSelect}
        onPanelPointerLeave={handleCatalogPanelPointerLeave}
      />

      {/*
        BOTÓN VER CATÁLOGO
        -----------------------------------------------------------------------
        Sustituye por completo al botón “Explorar catálogo”.

        Estado intro:
        - aparece en esquina inferior derecha.

        Estado collapsed:
        - aparece en parte inferior central.

        Estado catalog:
        - desaparece.
      */}
      <button
        type="button"
        onClick={handleOpenCatalog}
        className={`absolute z-20 rounded-full bg-zinc-800 px-6 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-2xl ring-1 ring-white/50 transition duration-300 ease-out hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 ${
          heroMode === "intro"
            ? "bottom-8 right-8 translate-x-0 translate-y-0 scale-100 opacity-100"
            : ""
        } ${
          heroMode === "collapsed"
            ? "bottom-8 left-1/2 -translate-x-1/2 translate-y-0 scale-100 opacity-100"
            : ""
        } ${
          heroMode === "catalog"
            ? "pointer-events-none bottom-8 left-1/2 -translate-x-1/2 translate-y-3 scale-95 opacity-0"
            : ""
        }`}
      >
        Ver catálogo
      </button>
    </div>
  );
}
