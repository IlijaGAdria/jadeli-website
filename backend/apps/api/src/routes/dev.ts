import { Hono } from "hono";

import { prisma } from "@case-couture/db";
import { env } from "../config/env.js";
import { seedProducts } from "../lib/seed-data.js";

export const devRoutes = new Hono();

devRoutes.post("/seed", async (c) => {
  if (env.NODE_ENV === "production") {
    return c.json({ error: "Not found" }, 404);
  }
  // Clear in FK-safe order
  await prisma.inventoryItem.deleteMany();
  await prisma.productVariantPrice.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  for (const product of seedProducts) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        imageUrl: product.imageUrl ?? null,
        status: "ACTIVE",
        variants: {
          create: product.variants.map((variant) => ({
            sku: variant.sku,
            name: variant.name,
            deviceBrand: variant.deviceBrand,
            deviceModel: variant.deviceModel,
            color: variant.color,
            material: variant.material,
            prices: {
              create: variant.prices,
            },
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

  return c.json({ message: "Seed completed.", products: total });
});
