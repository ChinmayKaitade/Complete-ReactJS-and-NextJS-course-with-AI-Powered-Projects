# 💳 Payments & Billing: Stripe Integration with Next.js Masterclass

Building a production-ready application requires a reliable way to monetize your product. When choosing a billing infrastructure for modern web applications, developers typically choose between four core platforms depending on their target audience, geographical requirements, and development preferences:

- **Stripe:** The global gold standard for developers, offering comprehensive tooling for global subscriptions, one-time checkouts, and automated tax handling.
- **Razorpay:** The leading payment gateway system for applications targeting the Indian market, optimized heavily for local payment methods like UPI, localized net banking, and local card architectures.
- **Polar:** An open-source, developer-first merchant of record (MoR) and billing platform built explicitly to handle digital products, SaaS models, and open-source funding with zero complex international tax headaches.
- **Clerk Billing:** A fully integrated add-on tier within the Clerk ecosystem that attaches SaaS subscription states seamlessly to your active user session tokens out of the box.

---

## 🏛️ Architecture: How Stripe Interacts with Next.js

A secure Stripe payment architecture relies on split operations: rendering safe client-side collection windows using **Stripe Checkout** or **Stripe Elements**, alongside a server-side route handler to handle automated **Webhooks** that synchronize transaction events with your primary database.

---

## 💻 Step-by-Step Stripe Integration

### Step 1: Install Core Dependencies

Install the server-side Stripe engine library along with the official client-side React wrapper toolkit:

```bash
npm install stripe @stripe/stripe-js

```

### Step 2: Configure Environment Variables (`.env`)

Retrieve your API secret keys directly from your Stripe Developer Dashboard:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_1234...
STRIPE_SECRET_KEY=sk_test_51P...
STRIPE_WEBHOOK_SECRET=whsec_...

```

### Step 3: Initialize the Stripe Instance Singletons

For serverless backend workflows, initialize a persistent Stripe server configuration instance:

```typescript
// lib/stripe.ts
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia", // Enforce strict, predictable API versions
  typescript: true,
});
```

---

## 🛒 1. Creating a Stripe Checkout Session (Server Action)

Instead of setting up boilerplate-heavy REST endpoints, use a **Server Action** to build a secure checkout session URL dynamically and redirect the client to Stripe's hosted processing gateway.

```typescript
// app/actions/stripe.ts
"use server";

import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function createCheckoutSession(priceId: string) {
  const headersList = await headers();
  const origin = headersList.get("origin") || "http://localhost:3000";

  let sessionUrl: string;

  try {
    // 💳 Provision a secure transaction session payload internally
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId, // Stripe Product Price ID token string
          quantity: 1,
        },
      ],
      mode: "subscription", // Use 'payment' for single one-time checkouts
      success_url: `${origin}/dashboard?success=true`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        userId: "chinmay_kaitade_dev_101", // Custom identifier to map your database records
      },
    });

    if (!session.url) {
      throw new Error("Stripe routing engine failed to compute endpoint.");
    }

    sessionUrl = session.url;
  } catch (error) {
    console.error("Stripe session provision crash:", error);
    throw new Error("Failed to initialize payment workflow.");
  }

  // Next.js redirection execution must happen outside try/catch wrappers
  redirect(sessionUrl);
}
```

---

## 📡 2. Constructing the Webhook Router Handler (`app/api/webhooks/stripe/route.ts`)

When a transaction finishes successfully, Stripe fires an asynchronous event payload back to your application. **Never rely on the client success page redirection to update your database permissions.** You must capture the raw payload cryptographically via a dedicated **Route Handler Webhook**.

```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.text(); // Retrieve the raw text stream body directly
  const signature = req.headers.get("stripe-signature") || "";

  let event;

  try {
    // 🔐 Cryptographically verify the event originated genuinely from Stripe servers
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error(`❌ Webhook Signature validation failure: ${err.message}`);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // 🎛️ Handle specific automated transaction event states
  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const userId = session.metadata?.userId;
      const stripeCustomerId = session.customer as string;

      console.log(
        `🚀 Payment verified successfully! Updating access for User: ${userId}`,
      );
      // Execute your ORM update logic here (e.g., prisma.user.update / db.update)
      // Map stripeCustomerId against your account row to handle future subscription updates
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      console.log(
        `⚠️ Subscription billing failed for customer identifier: ${invoice.customer}`,
      );
      // Gracefully lock down application permissions or alert user client-side
      break;
    }
  }

  return new NextResponse("Event captured and tracked smoothly.", {
    status: 200,
  });
}
```

> ⚠️ **Configuration Reminder:** Next.js Route Handlers default to parsing inputs as standard JSON objects. Because Stripe requires verifying the **raw unparsed text body string** to calculate the cryptographic hash signature, ensure you ingest the payload strictly using `req.text()` without applying manual parsing middleware utilities.

---

## ⚖️ Architectural Strategy Matrix

| Integration Tier  | Subscription Caching Strategy                                   | Ideal Platform Target                                                           |
| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Stripe**        | Direct database sync via webhook mapping queries.               | Global software markets, enterprise SaaS SaaS apps.                             |
| **Razorpay**      | Handled over custom backend hooks mirroring local transactions. | India-centric startups prioritizing high-scale UPI workflows.                   |
| **Polar**         | Managed completely externally on their edge structures.         | Open-source packages, independent indie products, individual software products. |
| **Clerk Billing** | Cached state resolves automatically inside auth tokens.         | Rapid application development looking to avoid manual billing setups.           |

---

## 💡 Best Practices for Local Sandbox Testing

> 🛰️ **Stripe CLI Forwarding:** To test incoming serverless webhook actions safely on your local computer machine without deploying your code live, install the official Stripe CLI tool and stream network updates directly using this command:
>
> ```bash
> stripe listen --forward-to localhost:3000/api/webhooks/stripe
>
> ```
>
> Use the temporary `whsec_...` verification string generated by the terminal shell output to populate your local development environment file configs securely.

# 💸 Polar Integration with Next.js & Better Auth

When building modern SaaS applications, scaling internationally requires managing global sales compliance. **Polar** acts as a developer-first **Merchant of Record (MoR)**, meaning they handle international sales tax calculation, collection, and remittance globally on your behalf.

By integrating Polar with **Better Auth** using their dedicated plugin, you can eliminate payment boilerplate code. The system synchronizes the authentication state directly with your billing layer, automatically mapping database users to billing customers.

---

## 🛠️ Step 1: Install Dependencies

Install the core Better Auth server runtime along with the official Polar SDK adapter utilities:

```bash
npm install better-auth @polar-sh/better-auth @polar-sh/sdk

```

---

## 🔑 Step 2: Configure Environment Variables

1. Log into your project dashboard at **Polar.sh**.
2. Navigate to **Settings > Tokens** and create an _Organization Access Token_.
3. Paste these configurations inside your local `.env` setup:

```env
# Polar Billing API Access
POLAR_ACCESS_TOKEN=polar_at_...
POLAR_WEBHOOK_SECRET=whsec_...

# Core Better Auth Endpoint Base
BETTER_AUTH_SECRET=your_super_secure_random_string_here
BETTER_AUTH_URL=http://localhost:3000

```

> 💡 **Development Tip:** For local sandbox testing, toggle the initialization flag to `'sandbox'` inside your Polar connection block.

---

## 🏗️ Step 3: Server Configuration (`lib/auth.ts`)

Initialize the Polar core client engine and attach the structural sub-plugins directly into your centralized Better Auth configuration.

```typescript
// lib/auth.ts
import { betterAuth } from "better-auth";
import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";

// 📡 Initialize the edge-compatible Polar engine instance
const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: process.env.NODE_ENV === "production" ? "production" : "sandbox", // Matches environment target
});

export const auth = betterAuth({
  // Your database adapter setup (Prisma, Drizzle, Mongoose, etc.) goes here

  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true, // 🚀 Automatically generates a matching Polar Customer record on registration!

      // Hook up functional payment primitives
      use: [
        checkout({
          // Map easy slug handles directly to rigid Polar Product UUID strings
          products: [
            {
              productId: "e651f46d-ac20-4f26-b769-ad088b123df2",
              slug: "pro-tier",
            },
          ],
          successUrl: "/dashboard?session_id={CHECKOUT_ID}",
          returnUrl: "/pricing",
          theme: "dark",
        }),
        portal({
          returnUrl: "/dashboard/settings", // Adds a clean back button inside the Polar customer management view
        }),
        webhooks({
          secret: process.env.POLAR_WEBHOOK_SECRET!,
        }),
      ],
    }),
  ],

  // 🔄 Keep lifecycle events clean: Remove customer profiles if accounts are wiped out
  user: {
    deleteUser: {
      enabled: true,
      afterDelete: async (user) => {
        await polarClient.customers.deleteExternal({ externalId: user.id });
      },
    },
  },
});
```

---

## 📡 Step 4: Next.js API Route Handler (`app/api/auth/[...better-auth]/route.ts`)

Expose the dynamic Better Auth endpoints. The attached Polar sub-plugins automatically configure the correct REST routes (e.g., handling checkout redirect triggers and verifying incoming webhook signatures).

```typescript
// app/api/auth/[...better-auth]/route.ts
import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
```

> ⚠️ **Webhook Configuration:** Go to your **Polar Dashboard > Developer Tools > Webhooks** and point your webhook route directly to your absolute endpoint: `[https://yourdomain.com/api/auth/polar/webhooks](https://yourdomain.com/api/auth/polar/webhooks)`.

---

## 💻 Step 5: Setting Up the Client SDK (`lib/auth-client.ts`)

To execute checkouts or list customer data on the frontend, register the client plugin counterpart:

```typescript
// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import { polarClient } from "@polar-sh/better-auth/client";

export const authClient = createAuthClient({
  plugins: [polarClient()],
});
```

---

## 🎨 Frontend Implementation (Checkout & Portal Action Actions)

Use the integrated client SDK hooks directly inside your components. You don't need to manually orchestrate internal endpoint files or manage raw fetch strings.

```tsx
// app/pricing/page.tsx
"use client";

import { authClient } from "@/lib/auth-client";

export default function PricingPage() {
  const handleCheckout = async () => {
    // 💳 Trigger an immediate secure redirect right to the Polar Checkout Server
    await authClient.polar.checkout.create({
      slug: "pro-tier", // Resolves to the specific product token mapped in your server configuration
    });
  };

  const handleManageBilling = async () => {
    // 🛠️ Direct user to their secure self-service portal to update cards or cancel subscriptions
    await authClient.polar.portal.open();
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-slate-900 border border-slate-850 rounded-2xl text-white">
      <h2 className="text-2xl font-black mb-2">Developer Pro Tier</h2>
      <p className="text-slate-400 text-sm mb-6">
        Gain full usage bounds and automated international compliance pipelines.
      </p>

      <div className="space-y-3">
        <button
          onClick={handleCheckout}
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-bold transition"
        >
          Upgrade Now 🚀
        </button>

        <button
          onClick={handleManageBilling}
          className="w-full py-3 bg-slate-800 hover:bg-slate-750 rounded-xl text-xs text-slate-400 transition"
        >
          Manage Existing Subscription
        </button>
      </div>
    </div>
  );
}
```

---

## 📊 Reading Active Subscription State

To secure UI paths or verify active features, read the user's active billing state using the client session context:

```typescript
// Example: Checking permission hooks client-side
const { data: customerState } = await authClient.polar.customer.state();

/* 
  customerState returns:
  - customer: Basic target profile fields
  - subscriptions: Array of active recurring entries
  - benefits: Access permissions granted by Polar configurations
  - meters: Consumption units for metered or usage-based billing balances
*/

const hasProAccess = customerState?.subscriptions.some(
  (sub) => sub.status === "active",
);
```
