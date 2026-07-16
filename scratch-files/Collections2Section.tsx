"use client";

import { useMemo, useState } from "react";

import {
  collectionCategories,
  type CollectionCategory,
  type CollectionProduct,
  type ProductImage,
} from "@/data/collections/products";

/*
  CollectionsSection.tsx
  -----------------------------------------------------------------------------
  Componente visual e interactivo para la sección:

  "Catálogo Zenstyle 2026"

  Esta sección forma parte de la landing principal de Zenstyle y reemplaza la
  versión temporal que antes se renderizaba como una sola imagen estática.

  Objetivo de esta fase:
  Construir la primera versión funcional real de CollectionsSection usando:
  - React;
  - TypeScript;
  - Tailwind CSS;
  - data proveniente de src/data/collections/products.ts;
  - imágenes AVIF como formato principal;
  - imágenes WebP como fallback.

  Esta fase SÍ incluye:
  - consumo del catálogo placeholder desde products.ts;
  - switch entre categorías: Pisos SPC / Wall Panels;
  - selección manual de producto;
  - actualización del render principal de sala al cambiar producto;
  - actualización del render secundario de recámara/comedor al cambiar producto;
  - actualización del panel técnico al cambiar producto;
  - actualización de specs y beneficios desde data;
  - layout responsivo desktop/mobile;
  - estructura visual real, ya no basada en mockup imagen.

  Esta fase NO incluye todavía:
  - selección aleatoria inicial;
  - selección aleatoria al cambiar categoría;
  - modal de captación;
  - apertura de PDF posterior al submit;
  - conexión a CRM;
  - validación de formulario;
  - analytics;
  - animaciones avanzadas.

  Criterio funcional clave:
  En CollectionsSection NO existe combinación piso + wall panel.

  La lógica correcta es:
  categoría activa → producto activo → renders propios del producto.

  Esto significa que cuando el usuario selecciona un piso, se muestran los dos
  renders de ese piso; cuando selecciona un wall panel, se muestran los dos
  renders de ese wall panel.

  No se debe construir una lógica tipo:
  selectedFloor + selectedWallPanel → preview combinado.

  Esa lógica pertenece a secciones tipo Marketplace, no a CollectionsSection.

  Criterio de arquitectura:
  Este componente NO debe contener la base de datos de productos.
  La data vive en:

  src/data/collections/products.ts

  CollectionsSection solo consume esa data, administra estado de UI y renderiza
  la experiencia visual del catálogo.
*/

/*
  getFirstProductByCategory
  -----------------------------------------------------------------------------
  Función auxiliar para obtener el primer producto de una categoría.

  En esta Fase 1 usamos el primer producto como default porque todavía NO estamos
  integrando la función random.

  En una fase posterior, esta función podrá ser sustituida o complementada por:

  getRandomProductByCategory(categoryId)

  Regla futura ya definida:
  - random al montar por primera vez;
  - random al cambiar de categoría;
  - NO random al seleccionar manualmente un producto.

  Por ahora:
  - carga inicial: primer producto de floors;
  - cambio de categoría: primer producto de la nueva categoría.
*/
function getFirstProductByCategory(
  categoryId: CollectionCategory,
): CollectionProduct {
  const category = collectionCategories.find((item) => item.id === categoryId);

  if (!category || category.products.length === 0) {
    throw new Error(
      `CollectionsSection: no hay productos disponibles para la categoría "${categoryId}".`,
    );
  }

  return category.products[0];
}

/*
  CatalogPicture
  -----------------------------------------------------------------------------
  Componente interno para renderizar imágenes del catálogo usando AVIF/WebP.

  Decisión del proyecto:
  - AVIF es el formato principal.
  - WebP es el fallback.

  Por eso NO usamos aquí una sola ruta de imagen.
  El data model entrega un objeto ProductImage:

  {
    avif: "/images/catalog/renders/floor-london-living-room.avif",
    webp: "/images/catalog/renders/floor-london-living-room.webp",
  }

  Este componente genera:
  - <source type="image/avif" />
  - <source type="image/webp" />
  - <img /> como fallback final.

  Nota técnica:
  En esta fase usamos <picture> directamente para respetar la decisión de tener
  rutas explícitas AVIF/WebP en el modelo de datos.

  Más adelante se puede evaluar si conviene crear un componente global reusable
  para todo Zenstyle, pero por ahora se mantiene local para no introducir nueva
  arquitectura antes de validarla.
*/
function CatalogPicture({
  image,
  alt,
  className,
  loading = "lazy",
}: {
  image: ProductImage;
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
}) {
  return (
    <picture>
      <source srcSet={image.avif} type="image/avif" />
      <source srcSet={image.webp} type="image/webp" />
      <img src={image.webp} alt={alt} className={className} loading={loading} />
    </picture>
  );
}

export default function CollectionsSection() {
  /*
    activeCategoryId
    ---------------------------------------------------------------------------
    Estado que controla qué familia de producto está activa.

    Valores posibles:
    - "floors"
    - "wallPanels"

    Este estado alimenta:
    - el switch de categoría;
    - la lista de productos visible;
    - el label del panel derecho;
    - el producto default al cambiar de categoría.
  */
  const [activeCategoryId, setActiveCategoryId] =
    useState<CollectionCategory>("floors");

  /*
    selectedProduct
    ---------------------------------------------------------------------------
    Producto actualmente seleccionado.

    Este objeto alimenta todo el contenido dinámico de la sección:
    - render principal de sala: selectedProduct.renders.livingRoom;
    - render secundario de recámara/comedor: selectedProduct.renders.bedroom;
    - nombre del producto;
    - colección;
    - descripción;
    - specs;
    - beneficios;
    - PDF futuro.

    En esta Fase 1 el producto inicial es el primer producto de "floors".
    En fase posterior será un producto aleatorio de "floors".
  */
  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct>(
    () => getFirstProductByCategory("floors"),
  );

  /*
    activeCategory
    ---------------------------------------------------------------------------
    Objeto completo de la categoría activa.

    Usamos useMemo para derivar la categoría desde activeCategoryId.
    Esto evita recalcular manualmente en varias partes del JSX y mantiene el
    render más legible.

    Si por alguna razón no se encontrara la categoría, se usa la primera del
    array como fallback defensivo.
  */
  const activeCategory = useMemo(() => {
    const category = collectionCategories.find(
      (item) => item.id === activeCategoryId,
    );

    return category ?? collectionCategories[0];
  }, [activeCategoryId]);

  /*
    handleCategoryChange
    ---------------------------------------------------------------------------
    Handler para el switch Pisos SPC / Wall Panels.

    En esta fase:
    1. Actualiza la categoría activa.
    2. Selecciona el primer producto de esa categoría.

    En fase posterior:
    1. Actualizará la categoría activa.
    2. Seleccionará un producto random de esa categoría.

    Importante:
    No dejamos selectedProduct vacío. Cada cambio de categoría debe terminar con
    un producto activo válido para que nunca haya renders o panel técnico sin
    información.
  */
  function handleCategoryChange(categoryId: CollectionCategory) {
    setActiveCategoryId(categoryId);
    setSelectedProduct(getFirstProductByCategory(categoryId));
  }

  /*
    handleProductSelect
    ---------------------------------------------------------------------------
    Handler para selección manual de producto.

    Esta acción NO debe ejecutar random.
    Cuando el usuario elige un producto, el sistema debe respetar exactamente
    esa selección.
  */
  function handleProductSelect(product: CollectionProduct) {
    setSelectedProduct(product);
  }

  return (
    <section
      id="catalogo-zenstyle-2026"
      className="w-full bg-stone-100 px-4 py-14 sm:px-6 lg:px-8 lg:py-20"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/*
          HEADER MOBILE / TABLET
          ---------------------------------------------------------------------
          En pantallas menores a lg, el layout deja de ser de tres columnas.
          Por eso el título vive arriba de toda la sección.

          En desktop, este header se oculta y el título vive dentro del panel
          izquierdo para mantener el look editorial del mockup elegido.
        */}
        <div className="mb-8 lg:hidden">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-500">
            Catálogo premium
          </p>

          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
            Catálogo Zenstyle 2026
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
            Explora nuestra colección de pisos SPC y wall panels. Selecciona un
            modelo para visualizarlo aplicado y consultar sus especificaciones.
          </p>
        </div>

        {/*
          CONTENEDOR PRINCIPAL
          ---------------------------------------------------------------------
          Card general de la sección.

          Desktop:
          - grid de 12 columnas;
          - panel izquierdo: 3 columnas;
          - zona visual central: 6 columnas;
          - panel derecho: 3 columnas.

          Mobile:
          - una sola columna;
          - el orden se controla con order-* para priorizar render e información.
        */}
        <div className="overflow-hidden rounded-3xl bg-stone-950 shadow-2xl ring-1 ring-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/*
              PANEL IZQUIERDO / SELECTORES
              -----------------------------------------------------------------
              Desktop:
              - se muestra a la izquierda;
              - contiene título, descripción, switch y lista vertical.

              Mobile:
              - se mueve debajo de los renders y del panel técnico;
              - conserva switch y lista;
              - la lista se vuelve horizontal con overflow-x-auto para evitar
                desbordamientos.
            */}
            <aside className="order-3 border-t border-white/10 p-5 sm:p-6 lg:order-1 lg:col-span-3 lg:border-r lg:border-t-0 lg:p-7">
              {/* Header exclusivo desktop */}
              <div className="hidden lg:block">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Catálogo premium
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Catálogo Zenstyle 2026
                </h2>

                <p className="mt-4 text-sm leading-6 text-stone-300">
                  Explora nuestra colección de pisos SPC y wall panels.
                  Selecciona un modelo para visualizarlo aplicado y consultar sus
                  especificaciones.
                </p>
              </div>

              {/* Switch de categoría */}
              <div className="mt-0 lg:mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Categoría
                </p>

                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-white/5 p-1 ring-1 ring-white/10">
                  {collectionCategories.map((category) => {
                    const isActive = category.id === activeCategoryId;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => handleCategoryChange(category.id)}
                        aria-pressed={isActive}
                        className={`rounded-xl px-3 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 sm:text-sm ${
                          isActive
                            ? "bg-white text-stone-950 shadow-sm"
                            : "text-stone-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {category.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lista de productos */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Modelos
                </p>

                <div className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
                  {activeCategory.products.map((product) => {
                    const isActive = product.id === selectedProduct.id;

                    return (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => handleProductSelect(product)}
                        aria-pressed={isActive}
                        className={`flex min-w-64 shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950 lg:min-w-0 ${
                          isActive
                            ? "border-white/40 bg-white/15"
                            : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
                        }`}
                      >
                        {/* Thumbnail del producto */}
                        <span className="block size-14 shrink-0 overflow-hidden rounded-xl bg-stone-800 ring-1 ring-white/10">
                          <CatalogPicture
                            image={product.thumbnail}
                            alt={`Miniatura de ${product.name}`}
                            className="h-full w-full object-cover"
                          />
                        </span>

                        {/* Nombre y colección */}
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-white">
                            {product.name}
                          </span>

                          <span className="mt-1 block truncate text-xs text-stone-400">
                            {product.collection}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/*
              ZONA VISUAL CENTRAL
              -----------------------------------------------------------------
              Esta zona muestra los dos renders propios del producto activo.

              Render 1:
              - selectedProduct.renders.livingRoom
              - imagen dominante, tipo sala.

              Render 2:
              - selectedProduct.renders.bedroom
              - imagen secundaria, pensada como recámara/comedor.

              Ambas imágenes cambian al seleccionar producto.
              No dependen de una combinación entre piso y wall panel.
            */}
            <div className="order-1 bg-stone-900 lg:order-2 lg:col-span-6">
              <div className="grid h-full grid-cols-1 lg:grid-rows-[minmax(0,1fr)_14rem]">
                {/* Render principal / sala */}
                <div className="relative aspect-square w-full overflow-hidden sm:aspect-video lg:aspect-auto lg:min-h-0">
                  <CatalogPicture
                    image={selectedProduct.renders.livingRoom}
                    alt={`Render de sala con el producto ${selectedProduct.name}`}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />

                  {/* Overlay inferior para reforzar producto activo sobre imagen */}
                  <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-5 sm:p-6 lg:p-8">
                    <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                      Producto activo
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {selectedProduct.name}
                    </h3>
                  </div>
                </div>

                {/*
                  Render secundario / recámara-comedor
                  ----------------------------------------------------------------
                  En el layout final este bloque podrá ocupar la zona visual
                  secundaria del mockup, por ejemplo a la derecha o debajo del
                  bloque de specs, según el diseño definitivo.

                  En esta fase funcional se muestra debajo del render principal
                  para validar que la data ya cambia correctamente por producto.
                */}
                <div className="border-t border-white/10 bg-stone-950 p-4 sm:p-5 lg:p-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                        Segundo ambiente
                      </p>
                      <p className="mt-1 text-sm text-stone-300">
                        Recámara / comedor asociado al producto seleccionado.
                      </p>
                    </div>

                    <div className="w-full overflow-hidden rounded-2xl bg-stone-900 ring-1 ring-white/10 sm:w-48 lg:w-56">
                      <div className="aspect-video w-full">
                        <CatalogPicture
                          image={selectedProduct.renders.bedroom}
                          alt={`Render secundario del producto ${selectedProduct.name}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*
              PANEL DERECHO / INFORMACIÓN TÉCNICA
              -----------------------------------------------------------------
              Presenta la información del producto activo.

              Todo lo visible aquí proviene de selectedProduct:
              - name;
              - collection;
              - description;
              - specs;
              - benefits.

              Esto permite que al cambiar selectedProduct, el panel completo se
              actualice sin lógica adicional.
            */}
            <aside className="order-2 border-t border-white/10 p-5 sm:p-6 lg:order-3 lg:col-span-3 lg:border-l lg:border-t-0 lg:p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
                {activeCategory.label}
              </p>

              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {selectedProduct.name}
              </h3>

              <p className="mt-2 text-sm font-medium text-stone-400">
                {selectedProduct.collection}
              </p>

              <p className="mt-5 text-sm leading-6 text-stone-300">
                {selectedProduct.description}
              </p>

              {/* Specs */}
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Especificaciones
                </p>

                <div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
                  {selectedProduct.specs.map((spec) => (
                    <div
                      key={`${selectedProduct.id}-${spec.label}`}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <span className="text-xs text-stone-400">
                        {spec.label}
                      </span>

                      <span className="text-right text-xs font-semibold text-white">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/*
                Botón de ficha técnica
                ----------------------------------------------------------------
                En esta fase el botón aún NO abre PDF ni modal.

                Flujo futuro ya definido:
                Click en "Ver ficha técnica"
                → abrir modal de captación
                → submit exitoso
                → abrir selectedProduct.pdfUrl
                → cerrar modal

                Se mantiene visualmente desde esta fase para validar jerarquía,
                posición, tamaño y copy dentro del panel derecho.
              */}
              <button
                type="button"
                className="mt-6 w-full rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-stone-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-950"
              >
                Ver ficha técnica
              </button>

              {/* Beneficios */}
              <div className="mt-7">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-stone-400">
                  Beneficios
                </p>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {selectedProduct.benefits.map((benefit) => (
                    <div
                      key={`${selectedProduct.id}-${benefit.label}`}
                      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                    >
                      {/*
                        Placeholder de ícono.

                        products.ts ya incluye benefit.icon para que en una fase
                        posterior podamos mapear cada beneficio a su ícono real.

                        Por ahora usamos ✓ para validar estructura visual sin
                        introducir otra dependencia visual.
                      */}
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
                        ✓
                      </span>

                      <span className="text-sm text-stone-200">
                        {benefit.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
