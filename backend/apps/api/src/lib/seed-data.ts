const PRICES = [
  { currency: "EUR", amount: 5900 },
  { currency: "USD", amount: 7000 },
  { currency: "RSD", amount: 699900 },
];

const STYLES = [
  { name: "Clear", material: "Clear TPU", color: "Clear" },
  { name: "MagSafe", material: "MagSafe TPU", color: "Clear" },
  { name: "Leather", material: "Leather", color: "Black" },
  { name: "Rugged", material: "Rugged TPU", color: "Black" },
];

function makeVariants(deviceBrand: "APPLE" | "SAMSUNG", deviceModel: string, code: string) {
  return STYLES.map((style) => ({
    sku: `${code}-${style.name.toUpperCase().replace(" ", "")}`,
    name: style.name,
    deviceBrand,
    deviceModel,
    color: style.color,
    material: style.material,
    prices: PRICES,
    quantityOnHand: 100,
  }));
}

export const seedProducts = [
  // Apple
  { slug: "iphone-17", name: "iPhone 17", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 17", "IP17") },
  { slug: "iphone-17-pro", name: "iPhone 17 Pro", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 17 Pro", "IP17P") },
  { slug: "iphone-17-pro-max", name: "iPhone 17 Pro Max", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 17 Pro Max", "IP17PM") },
  { slug: "iphone-17-air", name: "iPhone 17 Air", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 17 Air", "IP17A") },
  { slug: "iphone-16", name: "iPhone 16", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 16", "IP16") },
  { slug: "iphone-16-pro", name: "iPhone 16 Pro", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 16 Pro", "IP16P") },
  { slug: "iphone-16-pro-max", name: "iPhone 16 Pro Max", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 16 Pro Max", "IP16PM") },
  { slug: "iphone-16e", name: "iPhone 16e", brand: "APPLE" as const, variants: makeVariants("APPLE", "iPhone 16e", "IP16E") },
  // Samsung
  { slug: "galaxy-s26", name: "Galaxy S26", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S26", "GS26") },
  { slug: "galaxy-s26-plus", name: "Galaxy S26+", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S26+", "GS26P") },
  { slug: "galaxy-s26-ultra", name: "Galaxy S26 Ultra", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S26 Ultra", "GS26U") },
  { slug: "galaxy-s25", name: "Galaxy S25", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S25", "GS25") },
  { slug: "galaxy-s25-plus", name: "Galaxy S25+", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S25+", "GS25P") },
  { slug: "galaxy-s25-ultra", name: "Galaxy S25 Ultra", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S25 Ultra", "GS25U") },
  { slug: "galaxy-s25-edge", name: "Galaxy S25 Edge", brand: "SAMSUNG" as const, variants: makeVariants("SAMSUNG", "Galaxy S25 Edge", "GS25E") },
];
