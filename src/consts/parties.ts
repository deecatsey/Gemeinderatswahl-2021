export const Parties = {
  GRÜNE: { identifier: "GRÜNE", label: "Grüne", color: "#06CC0D" },
  SPÖ: { identifier: "SPÖ", label: "Spö", color: "#F54927" },
  ÖVP: { identifier: "ÖVP", label: "Övp", color: "#262926" },
  FPÖ: { identifier: "FPÖ", label: "Fpö", color: "#020CBD" },
  NEOS: { identifier: "NEOS", label: "Neos", color: "#FF00BB" },
  LINZ: { identifier: "LINZ", label: "Linz+", color: "#600066" },
  KPÖ: { identifier: "KPÖ", label: "Kpö", color: "#610B1D" },
  WANDL: { identifier: "WANDL", label: "Wandl/Ahoi", color: "#D1AE00" },
} as const;

export type Party = (typeof Parties)[keyof typeof Parties];

export type PartyIdentifier = keyof typeof Parties;
