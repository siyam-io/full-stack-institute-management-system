import { withMongoId } from "../../core/utils/serialize.js";
export const serializeBranch = (b) => withMongoId(b);
