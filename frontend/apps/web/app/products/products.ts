import { getProducts, toProductCard } from '../../lib/api';
import { getCurrentCurrency } from '../../lib/server-currency';

const STYLE_ORDER = ['Clear', 'MagSafe', 'Leather', 'Rugged'];

const STYLE_IMAGES: Record<string, string> = {
  Clear: '/Example 01.jpeg',
  MagSafe: '/Example 0.3.png',
  Leather: '/Example 0.4.png',
  Rugged: '/Example 0.5.png',
};

export async function getShopAllProducts() {
  const currency = await getCurrentCurrency();
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    return [];
  }

  // Group variants by style name → each style becomes one card
  const styleMap = new Map<string, {
    variantId: string;
    productName: string;
    productSlug: string;
    imageSrc: string;
    price: string;
    prices: { currency: string; amount: number }[];
    label: string;
  }[]>();

  for (const product of products) {
    const card = toProductCard(product, currency);
    for (const variant of product.variants) {
      if (!styleMap.has(variant.name)) styleMap.set(variant.name, []);
      styleMap.get(variant.name)!.push({
        variantId: variant.id,
        productName: product.name,
        productSlug: product.slug,
        imageSrc: product.imageUrl ?? '/Example 01.jpeg',
        price: card.price,
        prices: variant.prices,
        label: card.label ?? 'Available',
      });
    }
  }

  return STYLE_ORDER.filter(s => styleMap.has(s)).map((styleName) => {
    const models = styleMap.get(styleName)!;
    return {
      id: styleName,
      name: styleName,
      price: models[0]?.price ?? '—',
      label: models.some(m => m.label === 'Limited') ? 'Limited' : 'Available',
      imageSrc: STYLE_IMAGES[styleName] ?? '/Example 01.jpeg',
      models: models.map(m => ({
        id: m.variantId,
        productName: m.productName,
        productSlug: m.productSlug,
        imageSrc: m.imageSrc,
        prices: m.prices,
      })),
    };
  });
}
