import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";

import { corsOptions } from "./config/cors.js";
import { registerRoutes } from "./routes/index.js";
import { notFound } from "./middlewares/notFound.js";
import { globalErrorHandler } from "./core/errors/errorHandler.js";
import { auditLogger } from "./middlewares/audit.js";

const app = express();
const __dirname = path.resolve();

// CORS preflight must run first
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// Request logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
  });
  next();
});

// Global middleware
app.use(express.json());
app.use(cookieParser());
app.use(auditLogger);

// Static files
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// Health check
app.get("/", (req, res) => res.send("hello world"));

// API routes
registerRoutes(app);

// Error handling
app.all("*", notFound);
app.use(globalErrorHandler);

export default app;
