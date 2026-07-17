import stripe from "stripe";

export const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY!);

export const STRIPE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHED_KEY!;

export const STRIPE_PRICE_IDs = {
  premium: "price_1TtTF9LnzE3fCUG5DYOqCZAl",
} as const;
