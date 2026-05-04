'use client';

import { PhoneCaseCard } from '../../components/PhoneCaseCard';

interface Variant {
  id: string;
  deviceModel: string;
  name: string;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  variants?: Variant[];
}

export function ShopAllShell({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-4 gap-6 items-start max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-3">
      {products.map((product) => (
        <PhoneCaseCard
          key={product.id}
          slug={product.slug}
          name={product.name}
          price={product.price}
          label={product.label}
          imageSrc={product.imageSrc}
          variants={product.variants}
        />
      ))}
    </div>
  );
}
