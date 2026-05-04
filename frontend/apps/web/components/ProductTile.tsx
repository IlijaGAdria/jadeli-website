import Link from 'next/link';

import type { ProductCardDto } from "@case-couture/types";

interface ProductTileProps extends ProductCardDto {
  imageUrl?: string | null;
}

export function ProductTile({ name, subtitle, price, label, slug, imageUrl }: ProductTileProps) {
  const href = slug ? `/products/${slug}` : '#';

  return (
    <article className="overflow-hidden rounded-[24px] border border-[rgba(31,23,34,0.12)] bg-[rgba(255,255,255,0.85)] [box-shadow:0_20px_50px_rgba(113,72,96,0.14)]">
      <div className="relative aspect-[4/5]">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.9), transparent 22%), radial-gradient(circle at 70% 70%, rgba(248,195,219,0.78), transparent 26%), linear-gradient(160deg, #f8cddd, #fff0f6)' }}
          />
        )}
        <span className="absolute top-3 left-3 inline-flex px-3 py-2 rounded-full bg-[rgba(255,255,255,0.78)] border border-[rgba(31,23,34,0.08)] text-[0.74rem] uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>
      <div className="p-[18px]">
        <h3 className="m-0 mb-2 text-[1.06rem]">{name}</h3>
        <p className="m-0 text-muted leading-[1.55] min-h-[48px]">{subtitle}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <strong>{price}</strong>
          <Link href={href} className="text-muted text-[0.9rem] no-underline">View product</Link>
        </div>
      </div>
    </article>
  );
}
