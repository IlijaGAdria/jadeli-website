import { Hono } from "hono";

import { prisma } from "@case-couture/db";

export const healthRoutes = new Hono();

healthRoutes.get("/health", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return c.json({
      status: "ok",
      database: "reachable",
    });
  } catch {
    return c.json(
      {
        status: "degraded",
        database: "unreachable",
      },
      503,
    );
  }
});
