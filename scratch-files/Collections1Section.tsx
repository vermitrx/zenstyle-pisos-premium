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
  Sección funcional para el catálogo premium de Zenstyle.

  Esta versión toma como referencia visual el layout ya aprobado:
  - fondo claro;
  - sensación editorial / catálogo premium;
  - encabezado visual amplio;
  - switch Pisos SPC / Wall Panels;
  - lista lateral de modelos;
  - información técnica al centro;
  - render principal y render secundario asociados al producto activo;
  - beneficios visibles;
  - botón de ficha técnica preparado para abrir modal en una fase posterior.

  Estado actual de esta fase:
  - La interacción de data ya funciona.
  - Los thumbs ya cargan correctamente.
  - Los renders livingRoom y bedroom ya existen en la estructura autorizada.
  - Todavía NO se integra random.
  - Todavía NO se integra modal.
  - Todavía NO se abre PDF.

  Regla funcional clave:
  CollectionsSection NO combina pisos + wall panels.

  La lógica correcta es:
  categoría activa → producto activo → renders propios del producto.

  Cada producto tiene:
  - thumbnail;
  - renders.livingRoom;
  - renders.bedroom;
  - description;
  - specs;
  - benefits;
  - pdfUrl futuro.
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
  Renderiza imágenes del catálogo respetando la decisión técnica del proyecto:
  AVIF como formato principal y WebP como fallback.

  Este componente se mantiene local por ahora para no introducir todavía una
  abstracción global. Si después Marketplace y otras secciones migran a la misma
  estructura de catálogo, este componente puede moverse a:

  src/components/ui/CatalogPicture.tsx
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
  const [activeCategoryId, setActiveCategoryId] =
    useState<CollectionCategory>("floors");

  const [selectedProduct, setSelectedProduct] = useState<CollectionProduct>(
    () => getFirstProductByCategory("floors"),
  );

  const activeCategory = useMemo(() => {
    const category = collectionCategories.find(
      (item) => item.id === activeCategoryId,
    );

    return category ?? collectionCategories[0];
  }, [activeCategoryId]);

  function handleCategoryChange(categoryId: CollectionCategory) {
    setActiveCategoryId(categoryId);
    setSelectedProduct(getFirstProductByCategory(categoryId));
  }

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
          CARD PRINCIPAL
          ---------------------------------------------------------------------
          El contenedor completo se presenta como una pieza editorial dentro de
          la landing, no como un dashboard oscuro.
        */}
        <div className="overflow-hidden rounded-3xl bg-stone-50 shadow-2xl ring-1 ring-stone-200">
          {/*
            BARRA SUPERIOR EDITORIAL
            -------------------------------------------------------------------
            Esta barra es visual, no funcional en esta fase.
            Ayuda a que la sección se perciba como un catálogo autónomo.
          */}
          <div className="flex items-center justify-between bg-stone-950 px-6 py-4 text-white lg:px-10">
            <div>
              <p className="text-lg font-semibold uppercase tracking-widest">
                LOGO Zenstyle
              </p>
            </div>

            <p className="hidden text-lg font-semibold uppercase tracking-widest text-white/70 sm:block">
              Catálogo Zenstyle 2026
            </p>
          </div>

          {/*
  HERO DEL PRODUCTO ACTIVO
  ---------------------------------------------------------------------------
  Este bloque controla el encabezado visual de CollectionsSection.

  Estructura:
  1. Imagen de fondo del producto activo.
  2. Overlay lateral izquierdo con ancho controlado.
  3. Bloque de texto encima del overlay.

  Nota importante:
  El overlay NO debe usar inset-0 con porcentajes globales sobre todo el hero,
  porque en viewports distintos la transición deja de coincidir con el bloque
  de texto. Por eso aquí el overlay tiene un ancho propio responsivo.
*/}
<div className="relative aspect-91/36 overflow-hidden bg-stone-200">
  <CatalogPicture
    image={selectedProduct.renders.livingRoom}
    alt={`Ambiente principal con ${selectedProduct.name}`}
    className="h-full w-full object-cover"
    loading="eager"
  />

  {/*
    OVERLAY DEL HERO
    -------------------------------------------------------------------------
    Este overlay se limita al lado izquierdo del hero para acompañar el bloque
    de texto, sin lavar toda la imagen.

    La transición se controla dentro del ancho propio del overlay, no sobre el
    ancho total de la imagen. Esto estabiliza el efecto cuando cambia el
    viewport.
  */}
  <div
    className="absolute inset-y-0 left-0 w-7/12 sm:w-3/5 lg:w-1/2"
    style={{
      background:
        "linear-gradient(90deg, rgba(250,250,249,0.98) 0%, rgba(250,250,249,0.98) 58%, rgba(250,250,249,0.76) 72%, rgba(250,250,249,0.28) 88%, rgba(250,250,249,0) 100%)",
    }}
  />

  {/*
    BLOQUE DE TEXTO DEL HERO
    -------------------------------------------------------------------------
    El texto se mantiene en un ancho máximo propio. El overlay anterior debe
    cubrir esta zona y desvanecerse antes de invadir visualmente el resto de la
    imagen.
  */}
  <div className="absolute inset-y-0 left-0 flex w-full max-w-xl flex-col justify-center px-6 sm:px-10 lg:px-12">
    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
      Catálogo 2026
    </p>

    <h2 className="max-w-md text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
      Colecciones que transforman espacios
    </h2>

    <p className="mt-5 max-w-md text-sm leading-6 text-stone-700 sm:text-base">
      Explora nuestra selección de pisos SPC y Wall Panels de alta calidad,
      diseñados para inspirar y durar.
    </p>
  </div>
</div>

          {/*
            SWITCH DE CATEGORÍA
            -------------------------------------------------------------------
            Se ubica entre el hero y el contenido para replicar la lógica visual
            del mockup aprobado.
          */}
          <div className="flex justify-center border-y border-stone-200 bg-stone-50 px-5 py-4">
            <div className="grid w-full max-w-md grid-cols-2 rounded-full bg-white p-1 shadow-lg ring-1 ring-stone-200">
              {collectionCategories.map((category) => {
                const isActive = category.id === activeCategoryId;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => handleCategoryChange(category.id)}
                    aria-pressed={isActive}
                    className={`rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-wider transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50 ${
                      isActive
                        ? "bg-stone-950 text-white shadow-sm"
                        : "text-stone-700 hover:bg-stone-100 hover:text-stone-950"
                    }`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/*
            CONTENIDO PRINCIPAL
            -------------------------------------------------------------------
            Desktop:
            - lista de modelos a la izquierda;
            - información/specs al centro;
            - render secundario + beneficios a la derecha.

            Mobile:
            - se apila en una sola columna;
            - la lista de productos se vuelve scroll horizontal.
          */}
          <div className="grid grid-cols-1 gap-6 p-5 sm:p-6 lg:grid-cols-12 lg:gap-8 lg:p-10">
            {/* LISTA DE PRODUCTOS */}
            <aside className="lg:col-span-3">
              <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-stone-200 lg:p-5">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
                  {activeCategory.label}
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
                        className={`flex min-w-64 shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white lg:min-w-0 ${
                          isActive
                            ? "border-stone-300 bg-stone-50 shadow-sm"
                            : "border-stone-100 bg-white hover:border-stone-300 hover:bg-stone-50"
                        }`}
                      >
                        <span className="block size-16 shrink-0 overflow-hidden rounded-xl bg-stone-100 ring-1 ring-stone-200">
                          <CatalogPicture
                            image={product.thumbnail}
                            alt={`Miniatura de ${product.name}`}
                            className="h-full w-full object-cover"
                          />
                        </span>

                        <span className="min-w-0">
                          <span className="block truncate text-sm font-semibold text-stone-950">
                            {product.name}
                          </span>
                          <span className="mt-1 block truncate text-xs text-stone-500">
                            {product.collection}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* INFO + SPECS */}
            <article className="lg:col-span-5">
              <div className="flex h-full flex-col rounded-3xl bg-stone-50 p-2">
                <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-stone-200 lg:p-7">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
                    Producto activo
                  </p>

                  <h3 className="text-4xl font-semibold tracking-tight text-stone-950">
                    {selectedProduct.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-stone-500">
                    {selectedProduct.collection}
                  </p>

                  <p className="mt-5 max-w-xl text-sm leading-6 text-stone-700">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-8">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
                      Especificaciones
                    </p>

                    <div className="divide-y divide-stone-200 border-y border-stone-200">
                      {selectedProduct.specs.map((spec) => (
                        <div
                          key={`${selectedProduct.id}-${spec.label}`}
                          className="grid grid-cols-2 gap-4 py-3"
                        >
                          <span className="text-sm font-semibold text-stone-700">
                            {spec.label}
                          </span>
                          <span className="text-sm font-medium text-stone-950">
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* RENDER SECUNDARIO + BENEFICIOS + CTA */}
            <aside className="lg:col-span-4">
              <div className="flex h-full flex-col gap-5">
                <div className="relative overflow-hidden rounded-3xl bg-stone-200 shadow-sm ring-1 ring-stone-200">
                  <div className="aspect-video w-full lg:aspect-square">
                    <CatalogPicture
                      image={selectedProduct.renders.bedroom}
                      alt={`Segundo ambiente con ${selectedProduct.name}`}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-stone-700 shadow-sm backdrop-blur">
                    Segundo ambiente
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-stone-200">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-stone-500">
                    Beneficios
                  </p>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {selectedProduct.benefits.map((benefit) => (
                      <div
                        key={`${selectedProduct.id}-${benefit.label}`}
                        className="flex items-center gap-3 rounded-2xl bg-stone-50 px-4 py-3 ring-1 ring-stone-200"
                      >
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-stone-950 text-xs font-semibold text-white">
                          ✓
                        </span>
                        <span className="text-sm font-medium text-stone-800">
                          {benefit.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/*
                  CTA preparado para fase posterior.
                  -------------------------------------------------------------
                  Flujo futuro:
                  click → modal de captación → submit → abrir selectedProduct.pdfUrl
                */}
                <button
                  type="button"
                  className="w-full rounded-2xl bg-stone-950 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
                >
                  Ver ficha técnica
                </button>
              </div>
            </aside>
          </div>

          {/*
            FRANJA INFERIOR DE CONFIANZA
            -------------------------------------------------------------------
            Por ahora es contenido estático de soporte visual.
            Más adelante puede convertirse en data propia si se reutiliza en
            otras secciones.
          */}
          <div className="grid grid-cols-2 border-t border-stone-200 bg-stone-100 sm:grid-cols-4">
            {[
              [
                "Calidad premium",
                "Materiales seleccionados para máxima durabilidad.",
              ],
              [
                "Diseño que inspira",
                "Texturas y acabados que elevan cada ambiente.",
              ],
              [
                "Fácil instalación",
                "Sistemas que simplifican tiempo y trabajo.",
              ],
              ["Garantía Zenstyle", "Respaldo y confianza en cada colección."],
            ].map(([title, copy]) => (
              <div
                key={title}
                className="border-b border-r border-stone-200 p-5 text-center last:border-r-0 sm:border-b-0"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-800">
                  {title}
                </p>
                <p className="mt-2 text-xs leading-5 text-stone-500">{copy}</p>
              </div>
            ))}
          </div>

          <div className="bg-stone-950 px-6 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white/60">
            Zenstyle&nbsp;&nbsp;|&nbsp;&nbsp;Elevamos tus espacios
          </div>
        </div>
      </div>
    </section>
  );
}
