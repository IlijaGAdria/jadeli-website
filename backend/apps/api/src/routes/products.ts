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
  const inStockParam = c.req.query("inStock");

  const filters: ProductListFiltersDto = {
    brand: c.req.query("brand") as DeviceBrand | undefined,
    model: c.req.query("model") || undefined,
    variantName: c.req.query("variantName") || undefined,
    inStock: inStockParam === "true" ? true : inStockParam === "false" ? false : undefined,
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
