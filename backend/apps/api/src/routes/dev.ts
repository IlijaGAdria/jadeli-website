import { Hono } from "hono";

import { prisma } from "@case-couture/db";

import { seedProducts } from "../lib/seed-data.js";

export const devRoutes = new Hono();

devRoutes.post("/seed", async (c) => {
  const existing = await prisma.product.count();

  if (existing > 0) {
    return c.json(
      {
        message: "Seed skipped because products already exist.",
        products: existing,
      },
      409,
    );
  }

  for (const product of seedProducts) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        imageUrl: product.imageUrl,
        status: product.status,
        variants: {
          create: product.variants.map((variant) => ({
            sku: variant.sku,
            deviceBrand: variant.deviceBrand,
            deviceModel: variant.deviceModel,
            color: variant.color,
            material: variant.material,
            priceInCents: variant.priceInCents,
            inventory: {
              create: {
                quantityOnHand: variant.quantityOnHand,
                reservedQuantity: 0,
              },
            },
          })),
        },
      },
    });
  }

  const total = await prisma.product.count();

  return c.json({
    message: "Seed completed.",
    products: total,
  });
});
