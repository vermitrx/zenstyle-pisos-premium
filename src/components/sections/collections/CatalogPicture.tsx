import type { ProductImage } from "@/data/collections/products";

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