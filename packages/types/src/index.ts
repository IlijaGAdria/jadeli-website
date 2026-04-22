export type DeviceBrand = "APPLE" | "SAMSUNG";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type CurrencyCode = "EUR";

export interface InventoryDto {
  quantityOnHand: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface ProductVariantDto {
  id: string;
  sku: string;
  deviceBrand: DeviceBrand;
  deviceModel: string;
  color: string | null;
  material: string | null;
  priceInCents: number;
  currency: CurrencyCode;
  inventory: InventoryDto | null;
}

export interface ProductDto {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: ProductStatus;
  variants: ProductVariantDto[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponseDto {
  data: ProductDto[];
}

export interface ProductCardDto {
  name: string;
  subtitle: string;
  price: string;
  label: string;
}
