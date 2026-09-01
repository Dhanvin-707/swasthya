export type LanguageCode =
  | "en"
  | "hi"
  | "mr"
  | "te"
  | "ta"
  | "bn"
  | "gu"
  | "kn"
  | "ml"
  | "pa";

export const LANGUAGE_CODES: readonly LanguageCode[] = [
  "en",
  "hi",
  "mr",
  "te",
  "ta",
  "bn",
  "gu",
  "kn",
  "ml",
  "pa",
] as const;

export const FALLBACK_LANGUAGE: LanguageCode = "en";

export function isLanguageCode(value: string): value is LanguageCode {
  return (LANGUAGE_CODES as readonly string[]).includes(value);
}
