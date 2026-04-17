import type { ReactNode } from 'react';

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
};

export function Button({
  href = '#',
  children,
  variant = 'primary',
}: ButtonProps) {
  const style =
    variant === 'primary'
      ? {
          background: '#1f1722',
          color: '#fff8fc',
          border: '1px solid transparent',
        }
      : {
          background: 'rgba(255, 255, 255, 0.65)',
          color: '#1f1722',
          border: '1px solid rgba(31, 23, 34, 0.12)',
        };

  return (
    <a
      href={href}
      style={{
        ...style,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: variant === 'primary' ? '56px' : '48px',
        padding: variant === 'primary' ? '0 36px' : '0 18px',
        borderRadius: '999px',
        fontWeight: 700,
        fontSize: variant === 'primary' ? '1.1rem' : '0.95rem',
        letterSpacing: variant === 'primary' ? '0.08em' : undefined,
        boxShadow: '0 12px 30px rgba(113, 72, 96, 0.10)',
      }}
    >
      {children}
    </a>
  );
}
