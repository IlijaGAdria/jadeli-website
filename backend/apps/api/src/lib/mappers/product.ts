import type { InventoryItem, Product, ProductVariant, ProductVariantPrice } from "@case-couture/db";
import type { ProductDto } from "@case-couture/types";

type ProductRecord = Product & {
  variants: Array<
    ProductVariant & {
      prices: ProductVariantPrice[];
      inventory: InventoryItem | null;
    }
  >;
};

export function toProductDto(product: ProductRecord): ProductDto {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    description: product.description,
    imageUrl: product.imageUrl,
    brand: product.brand as ProductDto["brand"],
    status: product.status,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      name: variant.name,
      deviceBrand: variant.deviceBrand as ProductDto["brand"],
      deviceModel: variant.deviceModel,
      color: variant.color,
      material: variant.material,
      prices: variant.prices.map((p) => ({
        currency: p.currency as ProductDto["variants"][number]["prices"][number]["currency"],
        amount: p.amount,
      })),
      inventory: variant.inventory
        ? {
            quantityOnHand: variant.inventory.quantityOnHand,
            reservedQuantity: variant.inventory.reservedQuantity,
            availableQuantity:
              variant.inventory.quantityOnHand - variant.inventory.reservedQuantity,
          }
        : null,
    })),
  };
}
