/*
  Ruta de gracias reservada para flujos futuros con redirección real:
  - campañas pagadas
  - CRM
  - páginas externas
  - eventos de conversión independientes

  El flujo actual del HeroCarousel muestra la pantalla de gracias
  dentro de LeadCaptureModal.tsx, sin cambiar de ruta.
*/


import Link from "next/link";
import { ASSETS } from "@/config/assets";

const BROCHURE_URL = ASSETS.brochures.zenstyle.web;

export default function GraciasPage() {
  /*
    Punto de extensión futuro:
    Esta página real de gracias funciona como continuación del flujo iniciado
    en el modal de captación.

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
    <main className="min-h-screen bg-neutral-950 px-4 py-6 text-white sm:px-6 lg:px-8">
      <section className="flex min-h-[calc(100vh-48px)] items-center justify-center">
        <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 text-center shadow-2xl">
          <div className="border-b border-white/10 px-6 py-6 sm:px-8">
            <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-white/60">
              ZenStyle Brochure
            </p>

            <h1 className="text-2xl font-light uppercase tracking-[0.18em] sm:text-3xl">
              Gracias por tu interés
            </h1>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <p className="text-sm font-light leading-relaxed text-white/70 sm:text-base">
              Hemos recibido tu solicitud. Ahora puedes abrir el brochure de
              ZenStyle y conocer más sobre nuestras superficies premium para
              interiores contemporáneos, elegantes y de alto desempeño.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
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
                className="rounded-[5px] border border-white/20 px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
              >
                Volver a la landing
              </Link>
            </div>

            <p className="mt-6 text-xs font-light leading-relaxed text-white/40">
              Si el brochure no abre correctamente, verifica que el archivo
              exista en{" "}
              <span className="text-white/60">
                public/brochures/zenstyle-brochure-web.pdf
              </span>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}