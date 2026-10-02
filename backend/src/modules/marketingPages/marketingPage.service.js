import * as repo from "./marketingPage.repository.js";

export const getPage = async (slug, locale) => {
  if (!locale) {
    return await repo.findBySlugUnified(slug);
  }
  return await repo.findBySlugAndLocale(slug, locale);
};

export const savePage = async (slug, locale, data) => {
  if (!locale) {
    return await repo.upsertPageUnified(slug, data);
  }
  return await repo.upsertPage(slug, locale, data);
};

export const getActiveMentors = async () => {
  return await repo.findActiveMentors();
};
