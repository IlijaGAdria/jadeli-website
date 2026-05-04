'use client';

import { useState } from 'react';
import { PhoneCaseCard } from '../../components/PhoneCaseCard';

interface PhoneModel {
  id: string;
  productName: string;
  productSlug: string;
  imageSrc: string;
}

interface StyleCard {
  id: string;
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  models?: PhoneModel[];
}

export function ShopAllShell({ products }: { products: StyleCard[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-4 gap-6 items-start max-[1100px]:grid-cols-3 max-[720px]:grid-cols-2 max-[720px]:gap-3">
      {products.map((product) => (
        <PhoneCaseCard
          key={product.id}
          name={product.name}
          price={product.price}
          label={product.label}
          imageSrc={product.imageSrc}
          models={product.models}
          isOpen={openId === product.id}
          onOpenChange={(open) => setOpenId(open ? product.id : null)}
        />
      ))}
    </div>
  );
}
