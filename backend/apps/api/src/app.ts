import { Hono } from "hono";

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
