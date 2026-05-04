"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ASSETS } from "@/config/assets";
import { LEAD_FORMS, LeadFormType } from "@/config/leadForms";

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formType: LeadFormType;
};

type ModalStep = "form" | "success";

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

const BROCHURE_URL = ASSETS.brochures.zenstyle.web;

const getOnlyDigits = (value: string) => {
  return value.replace(/\D/g, "").slice(0, 10);
};

const formatPhoneNumber = (value: string) => {
  const digits = getOnlyDigits(value);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 2)} ${digits.slice(2)}`;
  }

  return `${digits.slice(0, 2)} ${digits.slice(2, 6)} ${digits.slice(6)}`;
};

export default function LeadCaptureModal({
  isOpen,
  onClose,
  formType,
}: LeadCaptureModalProps) {
  const formConfig = LEAD_FORMS[formType];

  const [formData, setFormData] = useState<LeadFormData>(INITIAL_FORM_DATA);
const [isSubmitting, setIsSubmitting] = useState(false);
const [phoneError, setPhoneError] = useState("");
const [modalStep, setModalStep] = useState<ModalStep>("form");

const handleClose = useCallback(() => {
  setFormData(INITIAL_FORM_DATA);
  setPhoneError("");
  setIsSubmitting(false);
  setModalStep("form");
  onClose();
}, [onClose]);

useEffect(() => {
  if (!isOpen) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    }
  };

  document.body.style.overflow = "hidden";
  window.addEventListener("keydown", handleKeyDown);

  return () => {
    document.body.style.overflow = "";
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isOpen, handleClose]);

if (!isOpen) return null;

  const shouldShowField = (field: keyof LeadFormData) => {
    const fields = formConfig.fields as readonly (keyof LeadFormData)[];
    return fields.includes(field);
  };

  const handlePhoneChange = (value: string) => {
    const formattedPhone = formatPhoneNumber(value);

    setFormData((prev) => ({
      ...prev,
      phone: formattedPhone,
    }));

    if (phoneError) {
      setPhoneError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phoneDigits = getOnlyDigits(formData.phone);

    if (shouldShowField("phone") && phoneDigits.length !== 10) {
      setPhoneError("El teléfono debe tener exactamente 10 dígitos.");
      return;
    }

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

      En esta etapa se simula el envío y se cambia el contenido del modal
      a una pantalla de gracias, sin redirigir a otra ruta.
    */

    const simulatedPayload = {
      formType,
      ...formData,
      phoneDigits,
    };

    console.log("Lead capturado:", simulatedPayload);

    await new Promise((resolve) => window.setTimeout(resolve, 700));

    setIsSubmitting(false);
    setPhoneError("");
    setModalStep("success");
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
        onClick={handleClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/95 text-white shadow-2xl">
        {modalStep === "form" ? (
          <>
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
                onClick={handleClose}
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
                      inputMode="numeric"
                      autoComplete="tel"
                      required
                      maxLength={12}
                      value={formData.phone}
                      onChange={(event) => handlePhoneChange(event.target.value)}
                      className="w-full rounded-[5px] border border-white/15 bg-white/5 px-4 py-3 text-sm font-light text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-white/60 focus:bg-white/10"
                      placeholder="55 1234 5678"
                    />

                    {phoneError && (
                      <p className="mt-2 text-xs font-light text-red-300">
                        {phoneError}
                      </p>
                    )}
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
                  onClick={handleClose}
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
          </>
        ) : (
          <>
            <div className="border-b border-white/10 px-6 py-7 text-center sm:px-8">
              <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-white/60">
                ZenStyle Brochure
              </p>

              <h2
                id="lead-capture-modal-title"
                className="text-2xl font-light uppercase tracking-[0.18em] sm:text-3xl"
              >
                Gracias por tu interés
              </h2>
            </div>

            <div className="px-6 py-8 text-center sm:px-8">
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
                  onClick={handleClose}
                  className="rounded-[5px] border border-white bg-white px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-neutral-950 transition-all duration-300 hover:scale-[1.02] hover:bg-transparent hover:text-white"
                >
                  Abrir brochure
                </a>

                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-[5px] border border-white/20 px-6 py-4 text-center text-xs font-light uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white hover:bg-white hover:text-neutral-950"
                >
                  Volver a la landing
                </button>
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
          </>
        )}
      </div>
    </div>
  );
}