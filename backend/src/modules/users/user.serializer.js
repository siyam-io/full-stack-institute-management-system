import { serializeRecord } from "../../core/utils/serialize.js";

export const serializeUser = (user) => {
  const obj = serializeRecord(user);
  if (!obj) return obj;
  delete obj.password;
  const rawSocial = obj.social_links
    ? (typeof obj.social_links === "string" ? JSON.parse(obj.social_links) : obj.social_links)
    : {};
  obj.social_links = {
    facebook: rawSocial.facebook || "",
    linkedin: rawSocial.linkedin || "",
    twitter: rawSocial.twitter || "",
    instagram: rawSocial.instagram || "",
    custom: rawSocial.custom || "",
  };

  // Convert relational achievements back to newline separated strings for Employee edit form
  if (Array.isArray(user.achievements)) {
    obj.achievements = user.achievements.map(a => a.title_en).join("\n");
    obj.achievements_bn = user.achievements.map(a => a.title_bn || "").join("\n");
  } else {
    obj.achievements = "";
    obj.achievements_bn = "";
  }

  return obj;
};
