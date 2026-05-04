import Link from "next/link";

const BROCHURE_URL = "/brochures/zenstyle-brochure-web.pdf";

export default function GraciasPage() {
  /*
    Punto de extensión futuro:
    Esta página real de gracias es el lugar adecuado para disparar
    eventos de conversión después de un lead exitoso.

    Aquí podrá crecer la lógica para:
    1. Meta Pixel.
    2. Google Ads Conversion Tracking.
    3. GA4.
    4. Validación del estado real del lead.
    5. Personalización del contenido según fuente de campaña.
    6. Confirmación de envío automático del PDF por email o WhatsApp.

    En esta etapa no se implementan píxeles reales ni CRM real.
  */

  return (
    <main className="min-h-screen bg-neutral-950 px-6 py-10 text-white sm:px-8 lg:px-12">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-4xl flex-col items-center justify-center text-center">
        <p className="mb-5 text-[10px] font-light uppercase tracking-[0.32em] text-white/60 sm:text-xs sm:tracking-[0.4em]">
          ZenStyle Premium Floors
        </p>

        <h1 className="max-w-3xl text-3xl font-light uppercase tracking-[0.16em] sm:text-5xl sm:tracking-[0.18em] md:text-6xl">
          Gracias por tu interés
        </h1>

        <p className="mt-6 max-w-2xl text-sm font-light leading-relaxed text-white/70 sm:text-base md:text-lg">
          Hemos recibido tu solicitud. ZenStyle está diseñado para proyectos que
          buscan superficies premium, estética contemporánea y alto desempeño en
          interiores residenciales, corporativos y comerciales.
        </p>

        <div className="mt-10 flex w-full max-w-md flex-col gap-4 sm:flex-row sm:justify-center">
          <a
            href={BROCHURE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-[5px] border border-white bg-white px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-neutral-950 transition-all duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-white"
          >
            Abrir brochure
          </a>

          <Link
            href="/"
            className="rounded-[5px] border border-white/30 bg-white/5 px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-8 max-w-xl text-xs font-light leading-relaxed text-white/40">
          Si el brochure no abre correctamente, verifica que el archivo exista
          en <span className="text-white/60">public/brochures/zenstyle-brochure.pdf</span>.
        </p>
      </section>
    </main>
  );
}