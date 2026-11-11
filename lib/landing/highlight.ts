export type Tone = "ink" | "primary" | "secondary";
export type Segment = { text: string; tone: Tone };

/**
 * Découpe un texte en segments colorés.
 *   [[texte]] -> couleur primaire, {{texte}} -> couleur secondaire.
 */
export function parseHighlight(input: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /\[\[(.+?)\]\]|\{\{(.+?)\}\}/g;
  let last = 0;
  for (const match of input.matchAll(pattern)) {
    const index = match.index ?? 0;
    if (index > last) segments.push({ text: input.slice(last, index), tone: "ink" });
    if (match[1] !== undefined) segments.push({ text: match[1], tone: "primary" });
    else segments.push({ text: match[2], tone: "secondary" });
    last = index + match[0].length;
  }
  if (last < input.length) segments.push({ text: input.slice(last), tone: "ink" });
  return segments;
}

export const plainText = (input: string) => parseHighlight(input).map((s) => s.text).join("");

export const toneClass: Record<Tone, string> = {
  ink: "",
  primary: "text-primary",
  secondary: "text-secondary",
};

/** Easing de la référence (expo-out) */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
/** Équivalent de GSAP power4.out, utilisé pour l'animation lettre par lettre */
export const EASE_POWER4 = [0.165, 0.84, 0.44, 1] as const;
