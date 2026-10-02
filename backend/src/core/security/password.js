import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
};
