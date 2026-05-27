type CollectionIntroOverlayProps = {
  isVisible: boolean;
};

export default function CollectionIntroOverlay({
  isVisible,
}: CollectionIntroOverlayProps) {
  return (
    <>
      <div
        className={`absolute inset-y-0 left-0 w-7/12 transition duration-300 ease-out sm:w-3/5 lg:w-1/2 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(250,250,249,0.98) 0%, rgba(250,250,249,0.98) 58%, rgba(250,250,249,0.76) 72%, rgba(250,250,249,0.28) 88%, rgba(250,250,249,0) 100%)",
        }}
      />

      <div
        className={`absolute inset-y-0 left-0 flex w-full max-w-xl flex-col justify-center px-6 transition duration-300 ease-out sm:px-10 lg:px-12 ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "pointer-events-none -translate-x-4 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-stone-500/70" />

          <p className="text-xs font-semibold uppercase tracking-widest text-stone-500">
            Catálogo 2026
          </p>
        </div>

        <h2 className="max-w-md text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          Colecciones que transforman espacios
        </h2>

        <p className="mt-5 max-w-md text-sm leading-6 text-stone-700 sm:text-base">
          Explora nuestra selección de pisos SPC y Wall Panels de alta calidad,
          diseñados para inspirar y durar.
        </p>

        <button
          type="button"
          className="mt-7 w-fit rounded-2xl bg-stone-950 px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white transition hover:bg-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-50"
        >
          Ver ficha técnica
        </button>
      </div>
    </>
  );
}