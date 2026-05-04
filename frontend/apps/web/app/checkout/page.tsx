import { CheckoutClient } from './CheckoutClient';

export const metadata = {
  title: 'Checkout — JADELI',
};

interface ApiCountry {
  name: string;
  alpha2Code?: string;
  isoCode?: string;
  code?: string;
}

async function fetchCountries(): Promise<{ name: string; code: string }[]> {
  try {
    const res = await fetch('https://www.apicountries.com/countries', {
      next: { revalidate: 86400 },
    });
    if (!res.ok) throw new Error('fetch failed');
    const data: ApiCountry[] = await res.json();
    return data
      .map(c => ({
        name: c.name,
        code: (c.alpha2Code ?? c.isoCode ?? c.code ?? c.name.slice(0, 2).toUpperCase()),
      }))
      .filter(c => c.name)
      .sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [
      { name: 'Australia', code: 'AU' },
      { name: 'Canada', code: 'CA' },
      { name: 'Croatia', code: 'HR' },
      { name: 'Denmark', code: 'DK' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'Italy', code: 'IT' },
      { name: 'Japan', code: 'JP' },
      { name: 'Netherlands', code: 'NL' },
      { name: 'Norway', code: 'NO' },
      { name: 'Serbia', code: 'RS' },
      { name: 'Singapore', code: 'SG' },
      { name: 'South Korea', code: 'KR' },
      { name: 'Spain', code: 'ES' },
      { name: 'Sweden', code: 'SE' },
      { name: 'Switzerland', code: 'CH' },
      { name: 'United Arab Emirates', code: 'AE' },
      { name: 'United Kingdom', code: 'GB' },
      { name: 'United States', code: 'US' },
    ];
  }
}

export default async function CheckoutPage() {
  const countries = await fetchCountries();
  return <CheckoutClient countries={countries} />;
}
