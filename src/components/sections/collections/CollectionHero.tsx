import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

import CatalogPicture from "@/components/sections/collections/CatalogPicture";
import CollectionCatalogPanel from "@/components/sections/collections/CollectionCatalogPanel";
import CollectionIntroOverlay from "@/components/sections/collections/CollectionIntroOverlay";

/*
  CollectionHero.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este componente administra la experiencia visual principal de la Hero image.

  Estados visuales:
  - "intro":
    Estado inicial/editorial.
    Muestra texto + overlay.
    Muestra únicamente el botón “Ver catálogo” abajo a la derecha.
    NO muestra “Ver ficha técnica”.

  - "catalog":
    Estado de exploración.
    Oculta texto + overlay.
    Oculta botones.
    Muestra el dock inferior con switch + productos.

  - "collapsed":
    Estado posterior a la exploración.
    La imagen queda limpia.
    El dock inferior desaparece.
    Aparecen juntos los botones:
    - “Ver ficha técnica”
    - “Ver catálogo”
    ubicados en la parte inferior central.

  IMPORTANTE
  -----------------------------------------------------------------------------
  Este componente NO administra qué producto está activo.
  El producto activo llega desde CollectionsSection mediante selectedProduct.

  Este componente SÍ administra qué capa visual se muestra encima de la imagen.
*/

/*
  CollectionHeroMode
  -----------------------------------------------------------------------------
  Se declara localmente para evitar crear archivos nuevos.

  Debe mantenerse conceptualmente sincronizado con el type equivalente declarado
  en CollectionsSection.tsx.
*/
type CollectionHeroMode = "intro" | "catalog" | "collapsed";

type ActiveCategory = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};

type CollectionHeroProps = {
  heroMode: CollectionHeroMode;
  selectedProduct: CollectionProduct;
  activeCategory: ActiveCategory;
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
    Al entrar el pointer a la Hero image desde el estado intro, se abre el
    catálogo.

    Si el estado es collapsed, NO se abre automáticamente.
    En collapsed, el usuario debe usar el botón “Ver catálogo”.
  */
  function handleHeroPointerEnter() {
    if (heroMode === "intro") {
      onHeroModeChange("catalog");
    }
  }

  /*
    handleHeroPointerLeave
    ---------------------------------------------------------------------------
    Al salir completamente de la Hero image, se regresa al estado intro.

    No se reinicia selectedProduct.
    Por lo tanto, la imagen conserva el último render elegido.
  */
  function handleHeroPointerLeave() {
    onHeroModeChange("intro");
  }

  /*
    handleCatalogPanelPointerLeave
    ---------------------------------------------------------------------------
    Cuando el pointer sale del contenedor switch + productos, el estado cambia
    a collapsed.

    Resultado:
    - desaparece el dock del catálogo;
    - la imagen queda limpia;
    - aparecen los dos botones inferiores centrales.
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
      className="relative aspect-91/36 overflow-hidden bg-stone-200"
      onPointerEnter={handleHeroPointerEnter}
      onPointerLeave={handleHeroPointerLeave}
    >
      {/*
        IMAGEN PRINCIPAL
        -----------------------------------------------------------------------
        Siempre se alimenta de selectedProduct.renders.livingRoom.

        Al seleccionar otro producto desde el carrusel, selectedProduct cambia
        en CollectionsSection y esta imagen se actualiza.
      */}
      <CatalogPicture
        image={selectedProduct.renders.livingRoom}
        alt={`Ambiente principal con ${selectedProduct.name}`}
        className="h-full w-full object-cover"
        loading="eager"
      />

      {/*
        CAPA INTRO
        -----------------------------------------------------------------------
        Muestra únicamente texto + overlay.

        Los botones ya no viven dentro de CollectionIntroOverlay.
      */}
      <CollectionIntroOverlay isVisible={heroMode === "intro"} />

      {/*
        CAPA CATÁLOGO
        -----------------------------------------------------------------------
        Muestra switch + productos.

        Al salir del panel, cambia a collapsed.
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
        BOTÓN VER CATÁLOGO — ESTADO INTRO
        -----------------------------------------------------------------------
        Estado inicial:
        - solo aparece “Ver catálogo”;
        - se ubica abajo a la derecha;
        - “Ver ficha técnica” no aparece en este estado.
      */}
      <button
        type="button"
        onClick={handleOpenCatalog}
        className={`absolute bottom-8 right-8 z-20 w-fit rounded-2xl bg-zinc-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition duration-300 ease-out hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 ${
          heroMode === "intro"
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        Ver catálogo
      </button>

      {/*
        BOTONES INFERIORES CENTRALES — ESTADO COLLAPSED
        -----------------------------------------------------------------------
        Aparecen únicamente después de que el usuario salió del contenedor
        switch + productos.

        En este estado sí se muestran ambos:
        - Ver ficha técnica
        - Ver catálogo
      */}
      <div
        className={`absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 transition duration-300 ease-out ${
          heroMode === "collapsed"
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0"
        }`}
      >
        <button
          type="button"
          className="w-fit rounded-2xl bg-zinc-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
        >
          Ver ficha técnica
        </button>

        <button
          type="button"
          onClick={handleOpenCatalog}
          className="w-fit rounded-2xl bg-zinc-800 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-800 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
        >
          Ver catálogo
        </button>
      </div>
    </div>
  );
}