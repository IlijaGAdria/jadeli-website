'use client';

import { useMemo, useState } from 'react';

import type { ProductDetailDto } from '@case-couture/types';

import { useCurrency } from './CurrencyContext';
import { useCart } from './CartContext';
import { formatPrice, getPriceForCurrency } from '../lib/currency';

type Props = {
  product: ProductDetailDto;
};

export function ProductPurchasePanel({ product }: Props) {
  const cart = useCart();
  const { currency } = useCurrency();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? '');
  const [added, setAdded] = useState(false);

  const selectedVariant = useMemo(
    () =>
      product.variants.find((variant) => variant.id === selectedVariantId) ??
      product.variants[0] ??
      null,
    [product.variants, selectedVariantId],
  );

  function handleAddToCart() {
    if (!selectedVariant) return;
    cart.addItem({
      variantId: selectedVariant.id,
      name: product.name,
      price: formatPrice(selectedVariant, currency),
      size: `${selectedVariant.deviceModel} · ${selectedVariant.name}`,
      imageSrc: product.imageUrl ?? '/Example 01.jpeg',
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  if (!selectedVariant) return null;

  const availableQuantity = selectedVariant.inventory?.availableQuantity ?? 0;
  const priceStr = formatPrice(selectedVariant, currency);

  return (
    <div className="grid gap-4 p-[18px] rounded-[24px] border border-[rgba(31,23,34,0.08)] bg-gradient-to-b from-[rgba(255,255,255,0.96)] to-[rgba(255,240,247,0.95)]">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <span className="uppercase tracking-[0.14em] text-[0.72rem]">Selected fit</span>
          <strong className="block mt-2 text-[1.02rem]">{selectedVariant.deviceModel}</strong>
        </div>
        <div>
          <span className="uppercase tracking-[0.14em] text-[0.72rem]">Price</span>
          <strong className="block mt-2 text-[1.02rem]">{priceStr}</strong>
        </div>
      </div>

      <label className="uppercase tracking-[0.14em] text-[0.72rem]" htmlFor="variant-select">
        Choose device
      </label>
      <select
        id="variant-select"
        className="min-h-[52px] rounded-[16px] border border-[rgba(31,23,34,0.12)] px-4 bg-white font-[inherit]"
        value={selectedVariant.id}
        onChange={(event) => setSelectedVariantId(event.target.value)}
      >
        {product.variants.map((variant) => {
          const p = getPriceForCurrency(variant, currency);
          const pStr = p ? formatPrice(variant, currency) : '—';
          return (
            <option key={variant.id} value={variant.id}>
              {variant.deviceModel} · {variant.name} · {pStr}
            </option>
          );
        })}
      </select>

      <p className="m-0 text-muted">
        {availableQuantity > 0 ? `${availableQuantity} available now` : 'Currently out of stock'}
      </p>

      <div className="flex gap-3 flex-wrap">
        <button
          type="button"
          className="min-h-[52px] px-6 rounded-full inline-flex items-center justify-center font-[inherit] border-none bg-[#1f1722] text-[#fff8fc] font-bold cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed"
          onClick={handleAddToCart}
          disabled={availableQuantity <= 0}
        >
          {added ? 'Added to cart' : 'Add to cart'}
        </button>
        <a
          href="/checkout"
          className="min-h-[52px] px-6 rounded-full inline-flex items-center justify-center font-[inherit] border border-[rgba(31,23,34,0.12)] bg-[rgba(255,255,255,0.7)] text-[#1f1722] no-underline"
        >
          Checkout
        </a>
      </div>
    </div>
  );
}
