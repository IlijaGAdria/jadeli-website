import type {
  ProductDetailDto,
  ProductDto,
  ProductResponseDto,
  ProductsResponseDto,
} from '@case-couture/types';

function getApiUrl() {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL is not configured for the frontend.');
  }

  return apiUrl;
}

function getHeaders() {
  const headers = new Headers();

  if (process.env.API_KEY) {
    headers.set('Authorization', `Bearer ${process.env.API_KEY}`);
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

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${slug}: ${res.status}`);
  }

  const payload = (await res.json()) as ProductResponseDto;
  return payload.data;
}

export function toProductCard(product: ProductDto) {
  const prices = product.variants.map((variant) => variant.priceInCents);
  const lowestPrice = prices.length ? Math.min(...prices) : 0;
  const lowStock = product.variants.some(
    (variant) =>
      (variant.inventory?.availableQuantity ?? 0) > 0 &&
      (variant.inventory?.availableQuantity ?? 0) <= 3,
  );

  return {
    slug: product.slug,
    name: product.name,
    subtitle:
      product.description ??
      product.variants
        .slice(0, 2)
        .map((variant) => variant.deviceModel)
        .join(' / '),
    price: `EUR ${(lowestPrice / 100).toFixed(2)}`,
    label: lowStock ? 'Limited' : 'Available',
  };
}

export function getPrimaryVariant(product: ProductDetailDto) {
  return product.variants[0] ?? null;
}
