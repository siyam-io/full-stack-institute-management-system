const suffixFor = (lang) => (lang === "bn" ? "Bn" : "En");
const snakeSuffixFor = (lang) => (lang === "bn" ? "_bn" : "_en");
const alternateLang = (lang) => (lang === "bn" ? "en" : "bn");

const readValue = (row, baseField, lang) => {
  if (!row) return undefined;
  const camelKey = `${baseField}${suffixFor(lang)}`;
  const snakeKey = `${baseField.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)}${snakeSuffixFor(lang)}`;
  return row[camelKey] ?? row[snakeKey];
};

const hasContent = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
};

export const normalizeLang = (lang) => (lang === "bn" ? "bn" : "en");

export const parseMaybeJson = (value) => {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;
  if (!["{", "["].includes(trimmed[0])) return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

export const pickLocalizedField = (row, baseField, lang = "en") => {
  const normalizedLang = normalizeLang(lang);
  const primary = readValue(row, baseField, normalizedLang);
  if (hasContent(primary)) return primary;
  const fallback = readValue(row, baseField, alternateLang(normalizedLang));
  return hasContent(fallback) ? fallback : primary ?? fallback ?? null;
};

export const pickLocalizedJson = (row, baseField, lang = "en") =>
  parseMaybeJson(pickLocalizedField(row, baseField, lang));
