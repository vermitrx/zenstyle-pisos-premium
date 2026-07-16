import Image from "next/image";

export default function CollectionsSection() {
  return (
    <section
      id="catalogo-zenstyle-2026"
      className="w-full bg-[#f4f0e8] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        {/* Versión desktop */}
        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-4xl shadow-[0_24px_80px_rgba(34,28,22,0.18)]">
            <Image
              src="/images/collections/mockups/collections-section-desktop.webp"
              alt="Catálogo interactivo Zenstyle 2026 - versión desktop"
              width={1920}
              height={1600}
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 1280px, 100vw"
              priority={false}
            />
          </div>
        </div>

        {/* Versión mobile / tablet */}
        <div className="block lg:hidden">
          <div className="mx-auto max-w-107.5 overflow-hidden rounded-4xl shadow-[0_24px_70px_rgba(34,28,22,0.22)]">
            <Image
              src="/images/collections/mockups/collections-section-mobile.webp"
              alt="Catálogo interactivo Zenstyle 2026 - versión mobile"
              width={860}
              height={1800}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1023px) 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}