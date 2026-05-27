/*
  CollectionIntroOverlay.tsx
  -----------------------------------------------------------------------------
  ROL DEL MÓDULO
  -----------------------------------------------------------------------------
  Este componente pinta el estado editorial inicial de la Hero.

  Incluye:
  - overlay lateral;
  - eyebrow;
  - título;
  - descripción.

  IMPORTANTE
  -----------------------------------------------------------------------------
  Este componente ya NO contiene botones.

  Motivo:
  Los botones "Ver ficha técnica" y "Ver catálogo" ahora viven directamente
  dentro de CollectionHero.tsx para compartir el mismo comportamiento visual:
  aparecen en "intro" y "collapsed", desaparecen en "catalog".
*/

type CollectionIntroOverlayProps = {
  isVisible: boolean;
};

export default function CollectionIntroOverlay({
  isVisible,
}: CollectionIntroOverlayProps) {
  return (
    <>
      {/*
        OVERLAY LATERAL
        -----------------------------------------------------------------------
        Su objetivo es dar legibilidad al texto sin cubrir toda la imagen.

        Cuando isVisible es false, desaparece mediante opacidad.
      */}
      <div
        className={`absolute inset-y-0 left-0 w-7/12 transition duration-300 ease-out sm:w-3/5 lg:w-1/2 ${
          isVisible ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(90deg, rgba(250,250,249,0.98) 0%, rgba(250,250,249,0.98) 58%, rgba(250,250,249,0.76) 72%, rgba(250,250,249,0.28) 88%, rgba(250,250,249,0) 100%)",
        }}
      />

      {/*
        BLOQUE EDITORIAL
        -----------------------------------------------------------------------
        Contiene únicamente el mensaje de introducción.

        En salida:
        - se desplaza hacia la izquierda;
        - pierde opacidad;
        - deja de recibir eventos.
      */}
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
      </div>
    </>
  );
}
