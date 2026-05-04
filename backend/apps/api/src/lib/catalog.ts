import { prisma } from "@case-couture/db";
import type { ProductListFiltersDto } from "@case-couture/types";

const productInclude = {
  variants: {
    include: {
      prices: true,
      inventory: true,
    },
  },
} as const;

export async function listProducts(filters: ProductListFiltersDto = {}) {
  const { brand, model, variantName, inStock, status = "ACTIVE" } = filters;

  return prisma.product.findMany({
    where: {
      status,
      ...(brand ? { brand } : {}),
      ...(model || variantName || inStock
        ? {
            variants: {
              some: {
                ...(model
                  ? { deviceModel: { contains: model, mode: "insensitive" } }
                  : {}),
                ...(variantName
                  ? { name: { contains: variantName, mode: "insensitive" } }
                  : {}),
                ...(inStock
                  ? { inventory: { quantityOnHand: { gt: 0 } } }
                  : {}),
              },
            },
          }
        : {}),
    },
    include: productInclude,
    orderBy: [{ brand: "asc" }, { name: "asc" }],
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}
