'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';

interface Variant {
  id: string;
  deviceModel: string;
  name: string;
}

interface PhoneCaseCardProps {
  slug: string;
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  variants?: Variant[];
}

export function PhoneCaseCard({
  slug,
  name,
  price,
  label,
  imageSrc = '/Example 01.jpeg',
  variants = [],
}: PhoneCaseCardProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const cart = useCart();

  function handleChooseSize() {
    setShowSizes(true);
    setAddedToCart(false);
  }

  function handleSizeSelect(size: string) {
    setSelectedSize(size);
    setShowSizes(false);
  }

  function handleAddToCart() {
    if (!selectedSize) return;
    const variant = variants.find((v) => v.name === selectedSize);
    if (!variant) return;
    cart.addItem({ variantId: variant.id, name, price, size: selectedSize, imageSrc });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const btnPrimary = "w-full py-3 bg-[#1f1722] text-white border-none rounded-full text-[0.9rem] font-semibold tracking-[0.04em] cursor-pointer font-[inherit] transition-opacity hover:opacity-85 disabled:opacity-60 disabled:cursor-default";
  const btnSecondary = "w-full py-[10px] bg-transparent text-[#1f1722] border border-[rgba(31,23,34,0.12)] rounded-full text-[0.85rem] font-medium cursor-pointer font-[inherit] transition-colors hover:border-[#1f1722] no-underline flex items-center justify-center";

  return (
    <article className="group flex flex-col bg-white rounded-[24px] overflow-hidden [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] transition-transform duration-200 ease-in-out hover:-translate-y-1" style={{willChange: 'transform'}}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-t-[24px]">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover block transition-transform duration-[350ms] ease-in-out group-hover:scale-[1.04]"
        />
        {/* Hover overlay */}
        <Link
          href={`/products/${slug}`}
          className="absolute inset-0 flex items-end justify-center pb-5 bg-[rgba(31,23,34,0.45)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-white text-[0.95rem] font-semibold tracking-[0.06em] uppercase border border-white rounded-full px-5 py-2 backdrop-blur-sm">
            View Details
          </span>
        </Link>
        {label && (
          <span className="absolute top-[14px] left-[14px] bg-[#1f1722] text-white text-[0.68rem] font-bold tracking-[0.08em] uppercase px-[10px] py-1 rounded-full">
            {label}
          </span>
        )}
      </div>

      <div className="p-[18px] flex flex-col gap-[6px] flex-1 rounded-b-[24px] overflow-visible">
        <h3 className="m-0 text-[1rem] font-semibold text-[#1f1722] tracking-[-0.01em]">{name}</h3>
        <p className="m-0 text-[0.95rem] text-muted">{price}</p>

        {selectedSize && !showSizes && (
          <p className="m-0 text-[0.82rem] text-muted italic">{selectedSize}</p>
        )}

        <div className="relative mt-auto overflow-visible">
          {showSizes && (
            <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-20 bg-white border border-[rgba(31,23,34,0.12)] rounded-[18px] [box-shadow:0_8px_32px_rgba(113,72,96,0.18)] p-2 flex flex-col gap-[2px] max-h-[220px] overflow-y-auto">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  className={`w-full text-left px-3 py-2 rounded-[10px] border-none text-[0.84rem] cursor-pointer transition-colors font-[inherit] ${selectedSize === variant.name ? 'bg-[#1f1722] text-white' : 'bg-transparent text-[#1f1722] hover:bg-[#fff1f8]'}`}
                  onClick={() => handleSizeSelect(variant.name)}
                >
                  {variant.name}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 mt-[10px] pt-1">
            {!selectedSize && !showSizes && (
              <>
                <button className={btnPrimary} onClick={handleChooseSize}>
                  Choose Size
                </button>
                <Link href={`/products/${slug}`} className={btnSecondary}>
                  View Details
                </Link>
              </>
            )}

            {showSizes && (
              <button className={btnSecondary} onClick={() => setShowSizes(false)}>
                Cancel
              </button>
            )}

            {selectedSize && !showSizes && (
              <>
                <button className={btnPrimary} onClick={handleAddToCart} disabled={addedToCart}>
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>
                <button className={btnSecondary} onClick={handleChooseSize}>
                  Change Size
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
