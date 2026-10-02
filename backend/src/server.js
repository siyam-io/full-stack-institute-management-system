import app from "./app.js";
import { ENV } from "./config/env.js";

const PORT = ENV.PORT;

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log("🛡️ Global Error Handler & PBAC Active!");
  console.log("🗄️ Database: SQLite via Prisma");
});
