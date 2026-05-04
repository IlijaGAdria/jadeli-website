'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from './CartContext';

interface PhoneModel {
  id: string;
  productName: string;
  productSlug: string;
  imageSrc: string;
  prices?: { currency: string; amount: number }[];
}

interface PhoneCaseCardProps {
  name: string;
  price: string;
  label?: string;
  imageSrc?: string;
  models?: PhoneModel[];
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PhoneCaseCard({
  name,
  price,
  label,
  imageSrc = '/Example 01.jpeg',
  models = [],
  isOpen,
  onOpenChange,
}: PhoneCaseCardProps) {
  const [selectedModel, setSelectedModel] = useState<PhoneModel | null>(null);
  const controlled = isOpen !== undefined;
  const [localShowModels, setLocalShowModels] = useState(false);
  const open = controlled ? (isOpen ?? false) : localShowModels;

  function setOpen(val: boolean) {
    if (controlled) {
      onOpenChange?.(val);
    } else {
      setLocalShowModels(val);
    }
  }

  const [addedToCart, setAddedToCart] = useState(false);
  const cart = useCart();
  const displayImage = imageSrc;

  function handleChooseModel() {
    setOpen(true);
    setAddedToCart(false);
  }

  function handleModelSelect(model: PhoneModel) {
    setSelectedModel(model);
    setOpen(false);
  }

  function handleAddToCart() {
    if (!selectedModel) return;
    cart.addItem({
      variantId: selectedModel.id,
      name: `${name} — ${selectedModel.productName}`,
      price,
      prices: selectedModel.prices ?? [],
      size: selectedModel.productName,
      imageSrc: imageSrc,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  const btnPrimary = "w-full py-3 bg-[#1f1722] text-white border-none rounded-full text-[0.9rem] font-semibold tracking-[0.04em] cursor-pointer font-[inherit] transition-opacity hover:opacity-85 disabled:opacity-60 disabled:cursor-default";
  const btnSecondary = "w-full py-[10px] bg-transparent text-[#1f1722] border border-[rgba(31,23,34,0.12)] rounded-full text-[0.85rem] font-medium cursor-pointer font-[inherit] transition-colors hover:border-[#1f1722] no-underline flex items-center justify-center";

  return (
    <article className="group flex flex-col bg-white rounded-[24px] overflow-hidden [box-shadow:0_20px_50px_rgba(113,72,96,0.14)] transition-transform duration-200 ease-in-out hover:-translate-y-1" style={{willChange: 'transform'}}>
      <div className="group/photo relative aspect-[3/4] overflow-hidden rounded-t-[24px] bg-[#faf5f8]">
        <Image
          src={displayImage}
          alt={name}
          fill
          className="object-contain transition-transform duration-[350ms] ease-in-out group-hover/photo:scale-[1.04]"
        />
        {/* Hover overlay — always visible, links to selected model or first model */}
        {models[0] && (
          <Link
            href={`/products/${(selectedModel ?? models[0]).productSlug}?style=${encodeURIComponent(name)}`}
            className="absolute inset-0 flex items-end justify-center pb-5 bg-[rgba(31,23,34,0.45)] opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300"
          >
            <span className="text-white text-[0.95rem] font-semibold tracking-[0.06em] uppercase border border-white rounded-full px-5 py-2 backdrop-blur-sm">
              View Details
            </span>
          </Link>
        )}
        {label && (
          <span className="absolute top-[14px] left-[14px] bg-[#1f1722] text-white text-[0.68rem] font-bold tracking-[0.08em] uppercase px-[10px] py-1 rounded-full">
            {label}
          </span>
        )}
      </div>

      <div className="p-[18px] flex flex-col gap-[6px] flex-1 rounded-b-[24px] overflow-visible">
        <h3 className="m-0 text-[1rem] font-semibold text-[#1f1722] tracking-[-0.01em]">{name}</h3>
        <div className="flex items-baseline justify-between gap-2">
          <p className="m-0 text-[0.95rem] text-muted">{price}</p>
          {models[0] && (
            <Link href={`/products/${(selectedModel ?? models[0]).productSlug}?style=${encodeURIComponent(name)}`} className="text-[0.8rem] text-muted underline underline-offset-[3px] hover:text-[#1f1722] transition-colors whitespace-nowrap">
              View details
            </Link>
          )}
        </div>

        {selectedModel && !open && (
          <p className="m-0 text-[0.82rem] text-muted italic">{selectedModel.productName}</p>
        )}

        <div className="relative mt-auto overflow-visible">
          {open && (
            <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-20 bg-white border border-[rgba(31,23,34,0.12)] rounded-[18px] [box-shadow:0_8px_32px_rgba(113,72,96,0.18)] p-2 flex flex-col gap-[2px] max-h-[220px] overflow-y-auto">
              {models.map((model) => (
                <button
                  key={model.id}
            className={`w-full text-left px-3 py-2 rounded-[10px] border-none text-[0.84rem] cursor-pointer transition-colors font-[inherit] ${selectedModel?.id === model.id ? 'bg-[#1f1722] text-white' : 'bg-transparent text-[#1f1722] hover:bg-[#fff1f8]'}`}
                  onClick={() => handleModelSelect(model)}
                >
                  {model.productName}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2 mt-[10px] pt-1">
            {!selectedModel && !open && (
              <button className={btnPrimary} onClick={handleChooseModel}>
                Choose Phone Model
              </button>
            )}

            {open && (
              <button className={btnSecondary} onClick={() => setOpen(false)}>
                Cancel
              </button>
            )}

            {selectedModel && !open && (
              <>
                <button className={btnPrimary} onClick={handleAddToCart} disabled={addedToCart}>
                  {addedToCart ? 'Added!' : 'Add to Cart'}
                </button>
                <button className={btnSecondary} onClick={handleChooseModel}>
                  Change Model
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
