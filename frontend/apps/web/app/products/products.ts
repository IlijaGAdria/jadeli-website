import { getProducts, toProductCard } from '../../lib/api';

export async function getShopAllProducts() {
  const products = await getProducts();

  return products.map((product) => {
    const card = toProductCard(product);

    return {
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: card.price,
      label: card.label,
      imageSrc: product.imageUrl ?? '/Example 01.jpeg',
      sizes: product.variants.map((variant) => variant.deviceModel),
    };
  });
}
