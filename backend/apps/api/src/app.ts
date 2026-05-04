import { Hono } from "hono";

import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { productRoutes } from "./routes/products.js";

export const app = new Hono();

app.get("/", (c) =>
  c.json({
    service: "case-couture-api",
    status: "ok",
    version: "0.1.0",
  }),
);

app.route("/", healthRoutes);
app.route("/api/v1", productRoutes);

if (env.NODE_ENV !== "production") {
  const { devRoutes } = await import("./routes/dev.js");
  app.route("/dev", devRoutes);
}
