import { getProducts, toProductCard } from '../../lib/api';
import { getCurrentCurrency } from '../../lib/server-currency';

export async function getShopAllProducts() {
  const currency = await getCurrentCurrency();
  const products = await getProducts();

  return products.map((product) => {
    const card = toProductCard(product, currency);

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: card.price,
      label: card.label,
      imageSrc: product.imageUrl ?? '/Example 01.jpeg',
      variants: product.variants.map((v) => ({ id: v.id, deviceModel: v.deviceModel, name: v.name })),
    };
  });
}
