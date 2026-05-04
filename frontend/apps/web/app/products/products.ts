import { getProducts, toProductCard } from '../../lib/api';
import { getCurrentCurrency } from '../../lib/server-currency';

const STYLE_ORDER = ['Clear', 'MagSafe', 'Leather', 'Rugged'];

const STYLE_IMAGES: Record<string, string> = {
  Clear: '/Example 01.jpeg',
  MagSafe: '/Example 01.jpeg',
  Leather: '/Example 01.jpeg',
  Rugged: '/Example 01.jpeg',
};

export async function getShopAllProducts() {
  const currency = await getCurrentCurrency();
  const products = await getProducts();

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
