import { Hono } from "hono";

import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { modelRoutes } from "./routes/models.js";
import { orderRoutes } from "./routes/orders.js";
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
app.route("/api/v1", modelRoutes);
app.route("/api/v1", orderRoutes);

if (env.NODE_ENV !== "production") {
  const { devRoutes } = await import("./routes/dev.js");
  app.route("/dev", devRoutes);
}

app.notFound((c) => c.json({ error: "Not found" }, 404));

app.onError((err, c) => {
  console.error(err);
  if (err.message === "INSUFFICIENT_STOCK") {
    return c.json({ error: "Insufficient stock", details: err.cause }, 409);
  }
  return c.json({ error: "Internal server error" }, 500);
});
