import type {
  CollectionCategory,
  CollectionProduct,
} from "@/data/collections/products";

/*
  collectionHeroTypes.ts
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este archivo centraliza los tipos compartidos por CollectionsSection y los
  componentes internos de la Hero del catálogo.

  Motivo arquitectónico:
  - CollectionsSection.tsx administra estado.
  - CollectionHero.tsx consume ese estado.
  - Ambos necesitan conocer el tipo CollectionHeroMode.

  En lugar de importar el type desde CollectionsSection hacia CollectionHero,
  se crea este archivo compartido para evitar dependencias circulares.

  Ventaja didáctica:
  En React + TypeScript, cuando un tipo será usado por varios componentes, es
  más limpio ubicarlo en un módulo neutral. Así cada archivo importa desde una
  fuente común y no desde un componente padre o hijo.
*/

/*
  CollectionHeroMode
  -----------------------------------------------------------------------------
  Representa los tres estados visuales válidos de la Hero image.

  "intro":
  - Se muestra el overlay editorial.
  - Se muestra el texto de entrada.
  - Se muestra el botón Ver ficha técnica.
  - Se muestra el botón Ver catálogo en la esquina inferior derecha.

  "catalog":
  - Se oculta el overlay editorial.
  - Se muestra el dock con switch + productos.
  - Se oculta el botón Ver catálogo.

  "collapsed":
  - Se mantiene la imagen limpia.
  - Se oculta el dock.
  - Se muestra el botón Ver catálogo en la parte inferior central.

  Usar un union type evita combinaciones inválidas de booleanos, por ejemplo:
  isCatalogOpen=true e isIntroVisible=true al mismo tiempo.
*/
export type CollectionHeroMode = "intro" | "catalog" | "collapsed";

/*
  ActiveCollectionCategory
  -----------------------------------------------------------------------------
  Describe la categoría activa que CollectionHero y CollectionCatalogPanel deben
  conocer para pintar el carrusel correcto.
*/
export type ActiveCollectionCategory = {
  id: CollectionCategory;
  label: string;
  products: CollectionProduct[];
};
