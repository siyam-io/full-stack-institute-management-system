import { ENV } from "../config/env.js";

const allowedOrigins = [
  "http://localhost:5174",
  "https://verification.cibdhk.com",
];

export const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
