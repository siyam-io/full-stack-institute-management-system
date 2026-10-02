import prisma from "../core/db/prisma.js";

// Helper to sanitize payload (removes passwords and tokens)
const sanitizePayload = (body) => {
  if (!body || typeof body !== "object") return body;
  
  const sanitized = { ...body };
  const sensitiveKeys = ["password", "token", "password_hash", "passwordHash", "secret"];
  
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(sk => key.toLowerCase().includes(sk))) {
      sanitized[key] = "[REDACTED]";
    } else if (typeof sanitized[key] === "object" && sanitized[key] !== null) {
      sanitized[key] = sanitizePayload(sanitized[key]);
    }
  }
  return sanitized;
};

// Map URL to action name dynamically or with mappings
const getActionName = (method, url) => {
  const cleanUrl = url.split("?")[0].replace(/\/+$/, "");
  const parts = cleanUrl.split("/").filter(Boolean);
  
  // Try to find a resource name
  const resource = parts[parts.length - 1] || "system";
  const actionPrefix = method === "POST" ? "CREATE" :
                       method === "PUT" ? "UPDATE" :
                       method === "PATCH" ? "UPDATE_STATUS" :
                       method === "DELETE" ? "DELETE" : "ACTION";
                       
  return `${actionPrefix}_${resource.toUpperCase()}`;
};

export const auditLogger = async (req, res, next) => {
  // Capture start time
  const start = Date.now();
  
  // We only log mutating actions
  const loggedMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (!loggedMethods.includes(req.method)) {
    return next();
  }

  // Intercept completion of request to log after response is sent
  res.on("finish", async () => {
    // Only log successful or client-directed actions (exclude server error 500 logs if they are not user action success)
    if (res.statusCode >= 400 && res.statusCode !== 403 && res.statusCode !== 400) {
      // Don't log if it's a server failure/timeout to avoid DB lock issues
      return;
    }

    try {
      const userId = req.user?.id || req.user?._id || null;
      const action = getActionName(req.method, req.originalUrl);
      const payload = req.body ? sanitizePayload(req.body) : null;
      const ipAddress = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

      // Asynchronously insert log in the database
      await prisma.auditLog.create({
        data: {
          action,
          method: req.method,
          endpoint: req.originalUrl,
          payload: payload ? JSON.stringify(payload) : null,
          ip_address: typeof ipAddress === "string" ? ipAddress.split(",")[0].trim() : ipAddress,
          user_id: userId,
        }
      });
    } catch (error) {
      console.error("Failed to write audit log to database:", error);
    }
  });

  next();
};
