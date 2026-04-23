type HeroCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'default' | 'tall';
  image?: string;
};

export function HeroCard({
  eyebrow,
  title,
  description,
  align = 'default',
  image,
}: HeroCardProps) {
  return (
    <article
      className={[
        'relative overflow-hidden border border-[rgba(31,23,34,0.12)] rounded-[32px] p-5 flex flex-col justify-between [box-shadow:0_20px_50px_rgba(113,72,96,0.14)]',
        !image ? 'bg-gradient-to-b from-[rgba(255,255,255,0.65)] to-[rgba(251,226,239,0.92)]' : '',
        align === 'tall' ? 'min-h-[340px]' : 'min-h-[230px]',
      ].join(' ')}
      style={image ? { backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
    >
      <span
        className="relative z-10 uppercase tracking-[0.12em] text-[0.72rem] text-muted"
        style={image ? { color: 'rgba(31,23,34,0.65)' } : undefined}
      >
        {eyebrow}
      </span>
      {!image && (
        <div className="absolute inset-[18px] rounded-[24px] pointer-events-none"
          style={{ background: 'radial-gradient(circle at 25% 30%, rgba(255,255,255,0.82), transparent 24%), radial-gradient(circle at 70% 68%, rgba(247,179,210,0.7), transparent 32%), linear-gradient(180deg, rgba(255,255,255,0.35), rgba(255,255,255,0.06))' }}
        />
      )}
      <div className="relative z-10 max-w-[24ch]">
        <h3 className="m-0 mb-[10px] text-[2rem] leading-[0.98] tracking-[-0.04em] text-[#1f1722]">{title}</h3>
        <p className="m-0 text-[rgba(31,23,34,0.72)] leading-[1.6]">{description}</p>
      </div>
    </article>
  );
}
