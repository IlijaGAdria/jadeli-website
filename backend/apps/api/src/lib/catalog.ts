import { prisma } from "@case-couture/db";
import type { DeviceBrand, ProductStatus } from "@case-couture/types";

const productInclude = {
  variants: {
    include: {
      inventory: true,
    },
  },
} as const;

type CatalogFilters = {
  deviceBrand?: DeviceBrand;
  deviceModel?: string;
  status?: ProductStatus;
};

export async function listProducts(filters: CatalogFilters = {}) {
  const { deviceBrand, deviceModel, status = "ACTIVE" } = filters;

  return prisma.product.findMany({
    where: {
      status,
      ...(deviceBrand || deviceModel
        ? {
            variants: {
              some: {
                ...(deviceBrand ? { deviceBrand } : {}),
                ...(deviceModel
                  ? {
                      deviceModel: {
                        equals: deviceModel,
                        mode: "insensitive",
                      },
                    }
                  : {}),
              },
            },
          }
        : {}),
    },
    include: productInclude,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: productInclude,
  });
}
