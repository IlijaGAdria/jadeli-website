import type { ProductContentDto } from "@case-couture/types";

import { env } from "../config/env.js";

type DirectusLoginResponse = {
  data?: {
    access_token?: string;
    expires?: number;
  };
};

type DirectusItemsResponse<T> = {
  data?: T[];
};

type DirectusProductContentItem = {
  title: string;
  slug: string;
  tagline: string | null;
  intro: string | null;
  why_its_special: string | null;
  details_heading: string | null;
  details_body: string | null;
  motion_heading: string | null;
  motion_body: string | null;
  lifestyle_heading: string | null;
  lifestyle_body: string | null;
  testimonial_1: string | null;
  testimonial_2: string | null;
  shipping_delivery: string | null;
  shipping_ordering: string | null;
  shipping_availability: string | null;
};

let cachedAccessToken: string | null = null;
let cachedAccessTokenExpiresAt = 0;

async function getDirectusAccessToken() {
  if (cachedAccessToken && Date.now() < cachedAccessTokenExpiresAt) {
    return cachedAccessToken;
  }

  const response = await fetch(`${env.DIRECTUS_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: env.DIRECTUS_EMAIL,
      password: env.DIRECTUS_PASSWORD,
    }),
  });

  if (!response.ok) {
    throw new Error(`Directus login failed with status ${response.status}.`);
  }

  const payload = (await response.json()) as DirectusLoginResponse;
  const accessToken = payload.data?.access_token;

  if (!accessToken) {
    throw new Error("Directus login did not return an access token.");
  }

  cachedAccessToken = accessToken;
  cachedAccessTokenExpiresAt = Date.now() + 14 * 60 * 1000;

  return accessToken;
}

function toProductContentDto(item: DirectusProductContentItem): ProductContentDto {
  return {
    title: item.title,
    slug: item.slug,
    tagline: item.tagline,
    intro: item.intro,
    whyItsSpecial: item.why_its_special,
    detailsHeading: item.details_heading,
    detailsBody: item.details_body,
    motionHeading: item.motion_heading,
    motionBody: item.motion_body,
    lifestyleHeading: item.lifestyle_heading,
    lifestyleBody: item.lifestyle_body,
    testimonial1: item.testimonial_1,
    testimonial2: item.testimonial_2,
    shippingDelivery: item.shipping_delivery,
    shippingOrdering: item.shipping_ordering,
    shippingAvailability: item.shipping_availability,
  };
}

export async function getProductContentBySlug(slug: string) {
  const accessToken = await getDirectusAccessToken();
  const params = new URLSearchParams();

  params.set("limit", "1");
  params.set("filter[slug][_eq]", slug);
  params.set(
    "fields",
    [
      "title",
      "slug",
      "tagline",
      "intro",
      "why_its_special",
      "details_heading",
      "details_body",
      "motion_heading",
      "motion_body",
      "lifestyle_heading",
      "lifestyle_body",
      "testimonial_1",
      "testimonial_2",
      "shipping_delivery",
      "shipping_ordering",
      "shipping_availability",
    ].join(","),
  );

  const response = await fetch(`${env.DIRECTUS_URL}/items/products_content?${params}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Directus content fetch failed with status ${response.status}.`);
  }

  const payload =
    (await response.json()) as DirectusItemsResponse<DirectusProductContentItem>;
  const item = payload.data?.[0];

  return item ? toProductContentDto(item) : null;
}
