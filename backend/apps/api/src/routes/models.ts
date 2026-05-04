import { Hono } from "hono";

import { prisma } from "@case-couture/db";

import type { ModelsResponseDto } from "@case-couture/types";

export const modelRoutes = new Hono();

modelRoutes.get("/models", async (c) => {
  const products = await prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { name: true, brand: true },
    orderBy: [{ brand: "asc" }, { name: "asc" }],
  });

  const response: ModelsResponseDto = { apple: [], samsung: [] };

  for (const p of products) {
    if (p.brand === "APPLE") response.apple.push(p.name);
    else response.samsung.push(p.name);
  }

  return c.json(response);
});
