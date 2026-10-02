import { withMongoId } from "../../core/utils/serialize.js";

export const serializeRole = (role) => {
  const obj = withMongoId(role);
  if (obj && typeof obj.permissions === "string") {
    try { obj.permissions = JSON.parse(obj.permissions); } catch {}
  }
  return obj;
};
