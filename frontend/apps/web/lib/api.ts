import type {
  CreateOrderInput,
  CurrencyCode,
  OrderResponseDto,
  ProductDetailDto,
  ProductDto,
  ProductResponseDto,
  ProductsResponseDto,
} from '@case-couture/types';

import { formatPrice, getPriceForCurrency } from './currency';
import { env } from './env';

function getApiUrl() {
  return env.API_URL;
}

function getHeaders(extra?: HeadersInit) {
  const headers = new Headers(extra);
  if (env.API_KEY) {
    headers.set('Authorization', `Bearer ${env.API_KEY}`);
  }
  return headers;
}

export async function getProducts() {
  const res = await fetch(`${getApiUrl()}/products`, {
    headers: getHeaders(),
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  const payload = (await res.json()) as ProductsResponseDto;
  return payload.data;
}

export async function getProduct(slug: string) {
  const res = await fetch(`${getApiUrl()}/products/${slug}`, {
    headers: getHeaders(),
    next: { revalidate: 30 },
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch product ${slug}: ${res.status}`);
  }
  const payload = (await res.json()) as ProductResponseDto;
  return payload.data;
}

export function toProductCard(product: ProductDto, currency: CurrencyCode) {
  const amounts = product.variants
    .map((v) => getPriceForCurrency(v, currency)?.amount ?? Number.POSITIVE_INFINITY)
    .filter((n) => Number.isFinite(n));
  const lowest = amounts.length ? Math.min(...amounts) : 0;
  const lowStock = product.variants.some(
    (variant) =>
      (variant.inventory?.availableQuantity ?? 0) > 0 &&
      (variant.inventory?.availableQuantity ?? 0) <= 3,
  );
  const cheapest = product.variants.find(
    (v) => getPriceForCurrency(v, currency)?.amount === lowest,
  );

  return {
    slug: product.slug,
    name: product.name,
    subtitle: product.description ?? 'Premium croc texture. Signature gold logo.',
    price: cheapest ? formatPrice(cheapest, currency) : '—',
    label: lowStock ? 'Limited' : 'Available',
    imageUrl: product.imageUrl ?? null,
  };
}

export function getPrimaryVariant(product: ProductDetailDto) {
  return product.variants[0] ?? null;
}

export async function createOrder(input: CreateOrderInput) {
  // POST through the Next.js API route so the backend URL & key stay server-side only.
  const res = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
    cache: 'no-store',
  });

  if (res.status === 409) {
    const payload = (await res.json().catch(() => ({}))) as { error?: string };
    const err = new Error(payload.error ?? 'Insufficient stock') as Error & { code?: string };
    err.code = 'INSUFFICIENT_STOCK';
    throw err;
  }
  if (!res.ok) {
    throw new Error(`Failed to create order: ${res.status}`);
  }

  const payload = (await res.json()) as OrderResponseDto;
  return payload.data;
}

export async function getOrder(id: string) {
  const res = await fetch(`${getApiUrl()}/orders/${id}`, {
    headers: getHeaders(),
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch order ${id}: ${res.status}`);
  }
  const payload = (await res.json()) as OrderResponseDto;
  return payload.data;
}
