import type { InventoryItem, Product, ProductVariant } from "@case-couture/db";
import type { ProductDto } from "@case-couture/types";

type ProductRecord = Product & {
  variants: Array<
    ProductVariant & {
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
    status: product.status,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    variants: product.variants.map((variant) => ({
      id: variant.id,
      sku: variant.sku,
      deviceBrand: variant.deviceBrand,
      deviceModel: variant.deviceModel,
      color: variant.color,
      material: variant.material,
      priceInCents: variant.priceInCents,
      currency: variant.currency as ProductDto["variants"][number]["currency"],
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
