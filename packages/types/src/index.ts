export type DeviceBrand = "APPLE" | "SAMSUNG";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type CurrencyCode = "EUR" | "USD" | "RSD";

export type OrderStatus = "PENDING" | "PAID" | "FULFILLED" | "CANCELLED" | "REFUNDED";

export interface InventoryDto {
  quantityOnHand: number;
  reservedQuantity: number;
  availableQuantity: number;
}

export interface ProductVariantPriceDto {
  currency: CurrencyCode;
  amount: number;
}

export interface ProductVariantDto {
  id: string;
  sku: string;
  name: string;
  deviceBrand: DeviceBrand;
  deviceModel: string;
  color: string | null;
  material: string | null;
  prices: ProductVariantPriceDto[];
  inventory: InventoryDto | null;
}

export interface ProductDto {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  brand: DeviceBrand;
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
  brand?: DeviceBrand;
  model?: string;
  variantName?: string;
  inStock?: boolean;
  status?: ProductStatus;
}

export interface ProductCardDto {
  slug?: string;
  name: string;
  subtitle: string;
  price: string;
  label: string;
}

export interface ModelsResponseDto {
  apple: string[];
  samsung: string[];
}

export interface OrderItemDto {
  id: string;
  variantId: string;
  productName: string;
  variantName: string;
  deviceModel: string;
  quantity: number;
  unitPriceInCents: number;
  lineTotalInCents: number;
  currency: CurrencyCode;
}

export interface OrderShippingAddressDto {
  fullName: string;
  line1: string;
  line2: string | null;
  city: string;
  postalCode: string;
  countryCode: string;
  phone: string | null;
}

export interface OrderDto {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  currency: CurrencyCode;
  subtotalInCents: number;
  shippingInCents: number;
  taxInCents: number;
  totalInCents: number;
  customerEmail: string;
  shippingAddress: OrderShippingAddressDto;
  items: OrderItemDto[];
  createdAt: string;
}

export interface OrderResponseDto {
  data: OrderDto;
}

export interface CreateOrderItemInput {
  variantId: string;
  quantity: number;
}

export interface CreateOrderShippingInput {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  countryCode: string;
  phone?: string;
}

export interface CreateOrderInput {
  customerId?: string;
  email: string;
  currency: CurrencyCode;
  items: CreateOrderItemInput[];
  shippingAddress: CreateOrderShippingInput;
}
