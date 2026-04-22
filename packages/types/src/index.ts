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

export interface ProductContentDto {
  title: string;
  slug: string;
  tagline: string | null;
  intro: string | null;
  whyItsSpecial: string | null;
  detailsHeading: string | null;
  detailsBody: string | null;
  motionHeading: string | null;
  motionBody: string | null;
  lifestyleHeading: string | null;
  lifestyleBody: string | null;
  testimonial1: string | null;
  testimonial2: string | null;
  shippingDelivery: string | null;
  shippingOrdering: string | null;
  shippingAvailability: string | null;
}

export interface ProductDetailDto extends ProductDto {
  content: ProductContentDto | null;
}

export interface ProductsResponseDto {
  data: ProductDto[];
}

export interface ProductResponseDto {
  data: ProductDetailDto;
}

export interface ProductListFiltersDto {
  deviceBrand?: DeviceBrand;
  deviceModel?: string;
  status?: ProductStatus;
}

export interface ProductCardDto {
  slug?: string;
  name: string;
  subtitle: string;
  price: string;
  label: string;
}
