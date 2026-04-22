import { Hono } from "hono";

import { prisma } from "@case-couture/db";
import type { ProductsResponseDto } from "@case-couture/types";

import { toProductDto } from "../lib/mappers/product.js";

export const productRoutes = new Hono();

productRoutes.get("/products", async (c) => {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          inventory: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const response: ProductsResponseDto = {
    data: products.map(toProductDto),
  };

  return c.json(response);
});
