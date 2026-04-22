import { Hono } from "hono";
import { cors } from "hono/cors";

import { env } from "./config/env.js";
import { devRoutes } from "./routes/dev.js";
import { healthRoutes } from "./routes/health.js";
import { productRoutes } from "./routes/products.js";

export const app = new Hono();

app.use(
  "*",
  cors({
    origin: env.FRONTEND_ORIGIN,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) =>
  c.json({
    service: "case-couture-api",
    status: "ok",
    version: "0.1.0",
  }),
);

app.route("/", healthRoutes);
app.route("/api/v1", productRoutes);
app.route("/api/dev", devRoutes);
