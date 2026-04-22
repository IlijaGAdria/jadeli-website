import type { ProductCardDto } from "@case-couture/types";

export const promoCards = [
  {
    tag: 'Editorial',
    title: 'Homepage-ready campaign blocks',
    text: 'Use these cards for collection callouts, creator drops, or seasonal banners.',
  },
  {
    tag: 'Curated',
    title: 'Device-first shopping flow',
    text: 'Keep the catalog focused on only the newest phone generations to reduce clutter.',
  },
  {
    tag: 'Starter',
    title: 'Built to evolve into Shopify',
    text: 'This landing page is intentionally simple so you can layer in Storefront API data later.',
  },
];

export const drops: ProductCardDto[] = [
  {
    name: 'Butter Kiss iPhone Case',
    subtitle: 'Gloss finish for iPhone 17 and iPhone 16 family',
    price: '$35',
    label: 'New'
  },
  {
    name: 'Rosé Frame Galaxy Case',
    subtitle: 'Soft pink shell for Galaxy S26 and S25 family',
    price: '$35',
    label: 'Bestseller'
  },
  {
    name: 'Cloud Mirror iPhone Case',
    subtitle: 'Reflective style for the newest iPhone lineup',
    price: '$39',
    label: 'Limited'
  },
  {
    name: 'Ribbon Pop Galaxy Case',
    subtitle: 'Playful shape language for current Galaxy S devices',
    price: '$37',
    label: 'Fresh'
  },
];

export const modelGroups = [
  {
    label: 'Apple',
    title: 'iPhone 17 and iPhone 16 family',
    text: 'Keep your product options concentrated on the newest two iPhone generations so product pages stay easier to browse and manage.',
    models: ['iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone 17', 'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16']
  },
  {
    label: 'Samsung',
    title: 'Galaxy S26 and Galaxy S25 family',
    text: 'Match the same idea for Samsung by offering only the most current Galaxy S generations in your storefront experience.',
    models: ['Galaxy S26 Ultra', 'Galaxy S26+', 'Galaxy S26', 'Galaxy S25 Ultra', 'Galaxy S25+', 'Galaxy S25']
  }
];
