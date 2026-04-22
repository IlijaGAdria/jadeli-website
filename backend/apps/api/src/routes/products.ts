import { Hono } from "hono";

import type {
  DeviceBrand,
  ProductDetailDto,
  ProductListFiltersDto,
  ProductResponseDto,
  ProductStatus,
  ProductsResponseDto,
} from "@case-couture/types";

import { getProductBySlug, listProducts } from "../lib/catalog.js";
import { getProductContentBySlug } from "../lib/directus.js";
import { toProductDto } from "../lib/mappers/product.js";

export const productRoutes = new Hono();

productRoutes.get("/products", async (c) => {
  const filters: ProductListFiltersDto = {
    deviceBrand: c.req.query("deviceBrand") as DeviceBrand | undefined,
    deviceModel: c.req.query("deviceModel") || undefined,
    status: (c.req.query("status") as ProductStatus | undefined) || "ACTIVE",
  };

  const products = await listProducts(filters);

  const response: ProductsResponseDto = {
    data: products.map(toProductDto),
  };

  return c.json(response);
});

productRoutes.get("/products/:slug", async (c) => {
  const slug = c.req.param("slug");
  const product = await getProductBySlug(slug);

  if (!product) {
    return c.json({ message: "Product not found." }, 404);
  }

  const content = await getProductContentBySlug(slug).catch(() => null);

  const data: ProductDetailDto = {
    ...toProductDto(product),
    content,
  };

  const response: ProductResponseDto = {
    data,
  };

  return c.json(response);
});
