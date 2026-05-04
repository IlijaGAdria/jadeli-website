import { Hono } from "hono";
import { z } from "zod";

import { prisma } from "@case-couture/db";

import { generateOrderNumber, toOrderDto } from "../lib/mappers/order.js";

export const orderRoutes = new Hono();

const orderInclude = {
  items: {
    include: {
      productVariant: {
        include: { product: true },
      },
    },
  },
} as const;

const CreateOrderSchema = z.object({
  customerId: z.string().optional(),
  email: z.string().email(),
  currency: z.enum(["EUR", "USD", "RSD"]).default("EUR"),
  items: z
    .array(
      z.object({
        variantId: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  shippingAddress: z.object({
    fullName: z.string().min(1),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    postalCode: z.string().min(1),
    countryCode: z.string().length(2),
    phone: z.string().optional(),
  }),
});

orderRoutes.post("/orders", async (c) => {
  const body = await c.req.json().catch(() => null);
  const parsed = CreateOrderSchema.safeParse(body);

  if (!parsed.success) {
    return c.json({ error: "Invalid request body", details: parsed.error.flatten() }, 400);
  }

  const { email, currency, items, shippingAddress, customerId } = parsed.data;

  try {
    const order = await prisma.$transaction(async (tx) => {
      // Validate stock and collect prices inside the transaction
      const lineItems: Array<{
        variantId: string;
        quantity: number;
        unitPriceInCents: number;
      }> = [];

      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: {
            inventory: true,
            prices: true,
          },
        });

        if (!variant) {
          throw new Error("VARIANT_NOT_FOUND", { cause: { variantId: item.variantId } });
        }

        const available =
          (variant.inventory?.quantityOnHand ?? 0) -
          (variant.inventory?.reservedQuantity ?? 0);

        if (available < item.quantity) {
          throw new Error("INSUFFICIENT_STOCK", { cause: { variantId: item.variantId } });
        }

        const price = variant.prices.find((p) => p.currency === currency);

        if (!price) {
          throw new Error("PRICE_NOT_FOUND", { cause: { variantId: item.variantId, currency } });
        }

        lineItems.push({
          variantId: item.variantId,
          quantity: item.quantity,
          unitPriceInCents: price.amount,
        });
      }

      const subtotalInCents = lineItems.reduce(
        (sum, li) => sum + li.unitPriceInCents * li.quantity,
        0,
      );

      const createdOrder = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          status: "PENDING",
          currency,
          subtotalInCents,
          totalInCents: subtotalInCents,
          customerEmail: email,
          customerId: customerId ?? null,
          shippingFullName: shippingAddress.fullName,
          shippingLine1: shippingAddress.line1,
          shippingLine2: shippingAddress.line2 ?? null,
          shippingCity: shippingAddress.city,
          shippingPostalCode: shippingAddress.postalCode,
          shippingCountryCode: shippingAddress.countryCode,
          shippingPhone: shippingAddress.phone ?? null,
          items: {
            create: lineItems.map((li) => ({
              productVariantId: li.variantId,
              quantity: li.quantity,
              unitPriceInCents: li.unitPriceInCents,
              lineTotalInCents: li.unitPriceInCents * li.quantity,
            })),
          },
        },
        include: orderInclude,
      });

      // Decrement inventory for each item
      for (const li of lineItems) {
        await tx.inventoryItem.update({
          where: { variantId: li.variantId },
          data: { quantityOnHand: { decrement: li.quantity } },
        });
      }

      return createdOrder;
    });

    return c.json({ data: toOrderDto(order) }, 201);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === "INSUFFICIENT_STOCK") {
        return c.json({ error: "Insufficient stock", details: err.cause }, 409);
      }
      if (err.message === "VARIANT_NOT_FOUND") {
        return c.json({ error: "Variant not found", details: err.cause }, 404);
      }
      if (err.message === "PRICE_NOT_FOUND") {
        return c.json({ error: "Price not available for currency", details: err.cause }, 422);
      }
    }
    throw err;
  }
});

orderRoutes.get("/orders/:id", async (c) => {
  const id = c.req.param("id");

  const order = await prisma.order.findUnique({
    where: { id },
    include: orderInclude,
  });

  if (!order) {
    return c.json({ error: "Order not found." }, 404);
  }

  return c.json({ data: toOrderDto(order) });
});
