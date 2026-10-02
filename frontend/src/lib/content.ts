// Placeholder for content fetching logic
export async function getContent(locale: string, key: string) {
  // Logic to fetch JSON from content/[locale]/[key].json
  const content = await import(`../../content/${locale}/${key}.json`);
  return content.default;
}
