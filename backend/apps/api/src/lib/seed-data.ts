export const seedProducts = [
  {
    slug: "butter-kiss-case",
    name: "Butter Kiss Case",
    description: "Gloss finish with a soft luxury palette for the newest iPhone lineup.",
    status: "ACTIVE",
    variants: [
      { sku: "BK-IP17PM", deviceBrand: "APPLE", deviceModel: "iPhone 17 Pro Max", color: "Butter", material: "Gloss TPU", priceInCents: 3500, quantityOnHand: 8 },
      { sku: "BK-IP17P", deviceBrand: "APPLE", deviceModel: "iPhone 17 Pro", color: "Butter", material: "Gloss TPU", priceInCents: 3500, quantityOnHand: 10 },
      { sku: "BK-IP16PM", deviceBrand: "APPLE", deviceModel: "iPhone 16 Pro Max", color: "Butter", material: "Gloss TPU", priceInCents: 3500, quantityOnHand: 6 },
    ],
  },
  {
    slug: "rose-frame-case",
    name: "Rose Frame Case",
    description: "Soft pink frame case built for the newest Galaxy devices.",
    status: "ACTIVE",
    variants: [
      { sku: "RF-S26U", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S26 Ultra", color: "Rose", material: "Silicone", priceInCents: 3500, quantityOnHand: 7 },
      { sku: "RF-S26", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S26", color: "Rose", material: "Silicone", priceInCents: 3500, quantityOnHand: 9 },
      { sku: "RF-S25U", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S25 Ultra", color: "Rose", material: "Silicone", priceInCents: 3500, quantityOnHand: 5 },
    ],
  },
  {
    slug: "cloud-mirror-case",
    name: "Cloud Mirror Case",
    description: "Reflective finish for statement looks and current iPhone models.",
    status: "ACTIVE",
    variants: [
      { sku: "CM-IP17", deviceBrand: "APPLE", deviceModel: "iPhone 17", color: "Silver", material: "Mirror Acrylic", priceInCents: 3900, quantityOnHand: 4 },
      { sku: "CM-IP16P", deviceBrand: "APPLE", deviceModel: "iPhone 16 Pro", color: "Silver", material: "Mirror Acrylic", priceInCents: 3900, quantityOnHand: 8 },
    ],
  },
  {
    slug: "ribbon-pop-case",
    name: "Ribbon Pop Case",
    description: "Playful silhouette for the newest Samsung flagships.",
    status: "ACTIVE",
    variants: [
      { sku: "RP-S25", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S25", color: "Pink", material: "Soft Touch TPU", priceInCents: 3700, quantityOnHand: 11 },
      { sku: "RP-S25P", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S25+", color: "Pink", material: "Soft Touch TPU", priceInCents: 3700, quantityOnHand: 8 },
      { sku: "RP-S26P", deviceBrand: "SAMSUNG", deviceModel: "Galaxy S26+", color: "Pink", material: "Soft Touch TPU", priceInCents: 3700, quantityOnHand: 6 },
    ],
  },
] as const;
