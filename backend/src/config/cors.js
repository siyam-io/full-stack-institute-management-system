import { ENV } from "../config/env.js";

const explicitAllowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://admin-panel-green-chi.vercel.app",
  "https://frontend-alpha-one-4xdf3qqzp0.vercel.app",
  "https://culinaryacademy.com",
];

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, mobile, curl, Postman
    if (!origin) return callback(null, true);

    try {
      const url = new URL(origin);
      // Allow any localhost port
      if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
        return callback(null, true);
      }
      // Allow any Vercel deployment (*.vercel.app)
      if (url.hostname.endsWith(".vercel.app")) {
        return callback(null, true);
      }
      // Allow explicit list
      if (explicitAllowedOrigins.includes(origin)) {
        return callback(null, true);
      }
    } catch (e) {
      // ignore URL parse error
    }

    // Default allow to prevent CORS blocks for authorized clients
    return callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers"
  ],
  optionsSuccessStatus: 200,
};
