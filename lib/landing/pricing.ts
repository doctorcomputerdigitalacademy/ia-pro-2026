import { BONUS, PRICING } from "./content.fr";

/** Lignes du tableau de valeur : éléments inclus + bonus. */
export const VALUE_ROWS = [
  ...PRICING.includes.map((r) => ({ ...r, bonus: false })),
  ...BONUS.items.map((b) => ({ label: b.title, value: b.value, bonus: true })),
];

/** Valeur totale (barrée) calculée automatiquement. */
export const TOTAL_VALUE = VALUE_ROWS.reduce((sum, r) => sum + r.value, 0);

/** 205000 -> "205 000 FCFA" (espace fine insécable). */
export const fcfa = (n: number) => `${n.toLocaleString("fr-FR").replace(/\s/g, " ")} FCFA`;
