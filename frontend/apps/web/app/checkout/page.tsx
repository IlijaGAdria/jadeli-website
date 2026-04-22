import { CheckoutClient } from './CheckoutClient';

export const metadata = {
  title: 'Checkout — JADELI',
};

async function fetchCountries(): Promise<string[]> {
  try {
    const res = await fetch('https://www.apicountries.com/countries', {
      next: { revalidate: 86400 }, // cache for 24 h
    });
    if (!res.ok) throw new Error('fetch failed');
    const data: { name: string }[] = await res.json();
    return data
      .map(c => c.name)
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  } catch {
    // Fallback list if the API is unreachable
    return [
      'Australia', 'Canada', 'Croatia', 'Denmark', 'France', 'Germany',
      'Italy', 'Japan', 'Netherlands', 'Norway', 'Serbia', 'Singapore',
      'South Korea', 'Spain', 'Sweden', 'Switzerland', 'United Arab Emirates',
      'United Kingdom', 'United States',
    ];
  }
}

export default async function CheckoutPage() {
  const countries = await fetchCountries();
  return <CheckoutClient countries={countries} />;
}
