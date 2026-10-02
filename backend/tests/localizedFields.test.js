import { pickLocalizedField, pickLocalizedJson } from "../src/core/utils/localizedFields.js";

describe("localized field helpers", () => {
  test("picks requested language and falls back to alternate language", () => {
    const row = {
      title_en: "English title",
      title_bn: "",
    };

    expect(pickLocalizedField(row, "title", "bn")).toBe("English title");
    expect(pickLocalizedField(row, "title", "en")).toBe("English title");
  });

  test("supports camelCase rows from Prisma serializers", () => {
    const row = {
      seoTitleEn: "",
      seoTitleBn: "Bangla SEO",
    };

    expect(pickLocalizedField(row, "seoTitle", "en")).toBe("Bangla SEO");
  });

  test("normalizes JSON strings before returning localized JSON", () => {
    const row = {
      data_en: "{\"title\":\"Hello\"}",
      data_bn: "",
    };

    expect(pickLocalizedJson(row, "data", "bn")).toEqual({ title: "Hello" });
  });
});
