import type { Order, OrderItem, ProductVariant, Product } from "@case-couture/db";
import type { OrderDto } from "@case-couture/types";

type OrderRecord = Order & {
  items: Array<
    OrderItem & {
      productVariant: ProductVariant & { product: Product };
    }
  >;
};

export function toOrderDto(order: OrderRecord): OrderDto {
  return {
    id: order.id,
    orderNumber: order.orderNumber,
    status: order.status as OrderDto["status"],
    currency: order.currency as OrderDto["currency"],
    subtotalInCents: order.subtotalInCents,
    shippingInCents: order.shippingInCents,
    taxInCents: order.taxInCents,
    totalInCents: order.totalInCents,
    customerEmail: order.customerEmail,
    shippingAddress: {
      fullName: order.shippingFullName,
      line1: order.shippingLine1,
      line2: order.shippingLine2,
      city: order.shippingCity,
      postalCode: order.shippingPostalCode,
      countryCode: order.shippingCountryCode,
      phone: order.shippingPhone,
    },
    items: order.items.map((item) => ({
      id: item.id,
      variantId: item.productVariantId,
      productName: item.productVariant.product.name,
      variantName: item.productVariant.name,
      deviceModel: item.productVariant.deviceModel,
      quantity: item.quantity,
      unitPriceInCents: item.unitPriceInCents,
      lineTotalInCents: item.lineTotalInCents,
      currency: order.currency as OrderDto["currency"],
    })),
    createdAt: order.createdAt.toISOString(),
  };
}

export function generateOrderNumber(): string {
  const now = new Date();
  const datePart = now.toISOString().slice(0, 10).replace(/-/g, "");
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
  return `JDL-${datePart}-${random}`;
}
