import type {
  CurrencyCode,
  ProductVariantDto,
  ProductVariantPriceDto,
} from '@case-couture/types';

export const SUPPORTED_CURRENCIES: CurrencyCode[] = ['EUR', 'USD', 'RSD'];
export const DEFAULT_CURRENCY: CurrencyCode = 'EUR';
export const CURRENCY_COOKIE = 'currency';

export const COUNTRY_TO_CURRENCY: Record<string, CurrencyCode> = {
  RS: 'RSD',
  US: 'USD',
};

export function isCurrencyCode(value: string | undefined | null): value is CurrencyCode {
  return !!value && (SUPPORTED_CURRENCIES as string[]).includes(value);
}

export function getPriceForCurrency(
  variant: Pick<ProductVariantDto, 'prices'>,
  currency: CurrencyCode,
): ProductVariantPriceDto | null {
  const prices = variant.prices ?? [];
  return (
    prices.find((p) => p.currency === currency) ??
    prices.find((p) => p.currency === DEFAULT_CURRENCY) ??
    prices[0] ??
    null
  );
}

const SYMBOLS: Record<CurrencyCode, string> = {
  EUR: '€',
  USD: '$',
  RSD: 'RSD ',
};

export function formatAmount(amountInMinorUnits: number, currency: CurrencyCode): string {
  if (currency === 'RSD') {
    // RSD typically displayed without decimals
    return `${SYMBOLS[currency]}${Math.round(amountInMinorUnits / 100).toLocaleString('en-US')}`;
  }
  return `${SYMBOLS[currency]}${(amountInMinorUnits / 100).toFixed(2)}`;
}

export function formatPrice(
  variant: Pick<ProductVariantDto, 'prices'>,
  currency: CurrencyCode,
): string {
  const price = getPriceForCurrency(variant, currency);
  if (!price) return '—';
  return formatAmount(price.amount, price.currency);
}
