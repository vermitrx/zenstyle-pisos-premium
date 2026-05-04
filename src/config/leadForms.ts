export type LeadFormField = "name" | "phone" | "email" | "projectType";

export type LeadFormType = "brochure" | "newsletter";

export const LEAD_FORMS = {
  brochure: {
    eyebrow: "ZenStyle Brochure",
    title: "Descarga el brochure",
    description:
      "Déjanos tus datos y accede al brochure de superficies premium para interiores contemporáneos.",
    submitLabel: "Recibir brochure",
    redirectTo: "/gracias",
    fields: ["name", "phone", "email", "projectType"],
  },

  newsletter: {
    eyebrow: "ZenStyle Journal",
    title: "Inscríbete a la newsletter",
    description:
      "Recibe ideas, tendencias y recomendaciones para proyectos de interiorismo premium.",
    submitLabel: "Inscribirme",
    redirectTo: "/gracias",
    fields: ["name", "email"],
  },
} as const satisfies Record<
  LeadFormType,
  {
    eyebrow: string;
    title: string;
    description: string;
    submitLabel: string;
    redirectTo: string;
    fields: readonly LeadFormField[];
  }
>;