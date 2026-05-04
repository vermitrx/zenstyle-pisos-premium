"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LEAD_FORMS, LeadFormType } from "@/config/leadForms";

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formType: LeadFormType;
};

type ProjectType = "Casa" | "Departamento" | "Oficina" | "Comercial" | "Otro";

type LeadFormData = {
  name: string;
  phone: string;
  email: string;
  projectType: ProjectType;
};

const INITIAL_FORM_DATA: LeadFormData = {
  name: "",
  phone: "",
  email: "",
  projectType: "Casa",
};

const PROJECT_TYPES: ProjectType[] = [
  "Casa",
  "Departamento",
  "Oficina",
  "Comercial",
  "Otro",
];

export default function LeadCaptureModal({
  isOpen,
  onClose,
  formType,
}: LeadCaptureModalProps) {
  const router = useRouter();
  const formConfig = LEAD_FORMS[formType];

  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const shouldShowField = (field: keyof LeadFormData) => {
    return formConfig.fields.includes(field);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    /*
      Punto de extensión futuro:
      Aquí deberá crecer la lógica real según el tipo de formulario.

      formType puede ser:
      - "brochure"
      - "newsletter"
      - futuros valores: "contact", "quote", "productLead", etc.

      Aquí se podrá:
      1. Enviar lead a CRM.
      2. Guardar fuente, campaña, formulario y página de origen.
      3. Validar respuesta real del backend.
      4. Manejar estado real del lead.
      5. Disparar eventos de conversión:
         - Meta Pixel
         - Google Ads
         - GA4
      6. Enviar PDF automáticamente por email o WhatsApp.
      7. Manejar errores reales y reintentos.

      Por ahora se simula el envío para conservar el flujo funcional
      sin conectar servicios externos todavía.
    */

    const simulatedPayload = {
      formType,
      ...formData,
    };

    console.log("Lead capturado:", simulatedPayload);

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    setIsSubmitting(false);
    setFormData(INITIAL_FORM_DATA);
    onClose();
    router.push(formConfig.redirectTo);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-capture-modal-title"
    >
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 text-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="mb-2 text-[10px] font-light uppercase tracking-[0.28em] text-white/60">
              {formConfig.eyebrow}
            </p>

            <h2
              id="lead-capture-modal-title"
              className="text-xl font-light uppercase tracking-[0.18em] sm:text-2xl"
            >
              {formConfig.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar modal"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-2xl font-light text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 sm:px-8 sm:py-8">
          <p className="mb-6 text-sm font-light leading-relaxed text-white/70 sm:text-base">
            {formConfig.description}
          </p>

          <div className="grid gap-4">
            {shouldShowField("name") && (
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-light uppercase tracking-[0.18em] text-white/70"
                >
                  Nombre
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-[5px] border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-white/60 focus:bg-white/10"
                  placeholder="Tu nombre"
                />
              </div>
            )}

            {shouldShowField("phone") && (
              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-xs font-light uppercase tracking-[0.18em] text-white/70"
                >
                  Teléfono / WhatsApp
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      phone: event.target.value,
                    }))
                  }
                  className="w-full rounded-[5px] border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-white/60 focus:bg-white/10"
                  placeholder="Tu número de contacto"
                />
              </div>
            )}

            {shouldShowField("email") && (
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-xs font-light uppercase tracking-[0.18em] text-white/70"
                >
                  Correo electrónico
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-[5px] border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-white/60 focus:bg-white/10"
                  placeholder="tu@email.com"
                />
              </div>
            )}

            {shouldShowField("projectType") && (
              <div>
                <label
                  htmlFor="projectType"
                  className="mb-2 block text-xs font-light uppercase tracking-[0.18em] text-white/70"
                >
                  Tipo de proyecto
                </label>

                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      projectType: event.target.value as ProjectType,
                    }))
                  }
                  className="w-full rounded-[5px] border border-white/15 bg-neutral-900 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 focus:border-white/60 focus:bg-neutral-800"
                >
                  {PROJECT_TYPES.map((projectType) => (
                    <option key={projectType} value={projectType}>
                      {projectType}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onClose}
              className="rounded-[5px] border border-white/20 px-5 py-3 text-xs font-light uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
            >
              Cerrar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-[5px] border border-white/50 bg-white px-5 py-3 text-xs font-light uppercase tracking-[0.18em] text-neutral-950 transition-all duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-white disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:bg-white disabled:hover:text-neutral-950"
            >
              {isSubmitting ? "Enviando..." : formConfig.submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}