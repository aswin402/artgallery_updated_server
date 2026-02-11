import { Hono } from "hono";
import { logger as httpLogger } from "hono/logger";
import { cors } from "hono/cors";

import { logger } from "./utils/logger";
import { globalErrorHandler } from "./middleware/error";
import { serveStatic } from "hono/bun";
import path from "path";
import artRouter from "./routes/art.route";

const app = new Hono();

const PORT = process.env.PORT || 5000;

/**
 * Middlewares
 */
app.use("*", httpLogger());
app.use(
  "*",
  cors({
    origin: "*",
    allowHeaders: ['*'],
    allowMethods: ['*'],
    exposeHeaders: ['*'],
    credentials: true,
  })
);

/**
 * Routes
 */
app.get("/", (c) => {
  logger.info("Root route hit");
  return c.text(`running on ${PORT}`);
});

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});



app.use(
  "/uploads/*",
  serveStatic({
    path: path.join(process.cwd(), "uploads"),
  })
);

app.route("/arts", artRouter);
 // 404 handler
app.notFound((c) =>
  c.json({ message: "Route not found" }, 404)
);

// Global error handler (MUST be last)
app.onError(globalErrorHandler);


 // Server start log
logger.info(`Server initialized on port ${PORT}`);

export default {
  port: PORT,
  fetch: app.fetch,
};