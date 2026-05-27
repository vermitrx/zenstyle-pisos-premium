import type { ProductImage } from "@/data/collections/products";

/*
  CatalogPicture.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este componente centraliza el renderizado de imágenes del catálogo.

  Decisión técnica del proyecto:
  - AVIF como formato principal.
  - WebP como fallback.

  Ventaja:
  En lugar de repetir <picture>, <source> e <img> en cada componente, toda esa
  estructura queda centralizada aquí.

  Uso:
  - Hero principal.
  - Miniaturas de productos.
  - Potenciales renders futuros dentro de Marketplace o fichas técnicas.
*/

type CatalogPictureProps = {
  image: ProductImage;
  alt: string;
  className: string;
  loading?: "eager" | "lazy";
};

export default function CatalogPicture({
  image,
  alt,
  className,
  loading = "lazy",
}: CatalogPictureProps) {
  return (
    <picture>
      <source srcSet={image.avif} type="image/avif" />
      <source srcSet={image.webp} type="image/webp" />
      <img src={image.webp} alt={alt} className={className} loading={loading} />
    </picture>
  );
}
