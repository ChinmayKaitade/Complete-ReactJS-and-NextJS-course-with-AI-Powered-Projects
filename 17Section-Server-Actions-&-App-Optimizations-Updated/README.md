# ⚡ Server Actions & App Optimizations

**Server Actions** are asynchronous functions that run exclusively on the server and can be called directly from both Server and Client React components. They allow you to execute server-side operations—such as database queries, cache revalidation, authentication, and form management—without the architectural overhead of writing standalone REST API endpoints.

---

## 🆚 Server Actions vs. API Routes

Before Server Actions, updating data in a Next.js application required a multi-step networking lifecycle:

With Server Actions, Next.js abstracts this network boundary. You call the server function directly from your component, and Next.js handles the underlying secure RPC (Remote Procedure Call) tunnel:

---

## 🛠️ The `"use server"` Directive

Server Actions are defined using the `"use server";` directive, which marks the boundaries of your server-only execution environments. It can be applied in two distinct ways:

### 1. File-Level Boundary

Placing the directive at the very top of a separate file marks **all exported functions** within that file as Server Actions. This is ideal when importing actions into Client Components.

```typescript
// app/actions.ts
"use server";

import { connectToDatabase } from "@/lib/db";
import { Note } from "@/lib/models/Note";

export async function deleteNote(id: string) {
  await connectToDatabase();
  await Note.findByIdAndDelete(id);
}
```

### 2. Inline Function Boundary

Placing the directive at the top of an inner scoping brackets blocks code execution inside an `async` function. This works exclusively inside **Server Components**.

```tsx
// app/page.tsx (Server Component)
export default function Page() {
  async function inlineAction() {
    "use server";
    // Runs securely on the server environment
  }
}
```

---

## 📝 Integration with HTML Forms

The most frequent use case for Server Actions is handling form submissions. Next.js extends the standard HTML `<form>` element's `action` attribute to accept these asynchronous server functions.

```tsx
import { revalidatePath } from "next/cache";

export default function TodoPage() {
  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title");

    if (!title) return;

    // Execute secure server logic (e.g., db.todo.create({ title }))
    console.log(`Saving to Database: ${title}`);

    // Purge the cached data route layer instantly to refresh client UI
    revalidatePath("/todos");
  }

  return (
    <form action={addTodo} className="p-6 bg-white rounded-xl shadow space-y-4">
      <input
        name="title"
        type="text"
        className="w-full p-2 border rounded"
        placeholder="New task..."
      />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">
        Add Todo ➕
      </button>
    </form>
  );
}
```

### ⚙️ What Happens Internally?

1. **Event Interception:** The user clicks submit, and Next.js intercepts the native browser submission event.
2. **RPC Transmission:** Next.js sends an automated HTTP `POST` request behind the scenes, encoding the form fields safely.
3. **Server Execution:** The backend engine runs the corresponding function body securely on the host platform.
4. **UI Reconciliation:** The server can stream route updates or data mutations back down, allowing the UI to adapt dynamically without a full browser reload.

---

## 📋 Architectural Decision Matrix

When should you use a Server Action versus a standard Backend Route Handler (`route.ts`)? Use this decision matrix to plan your application architecture:

| Scenario / Architecture Target                        | Server Action ⚡ | API Route Handler 🌐            |
| ----------------------------------------------------- | ---------------- | ------------------------------- |
| **Standard Form Submissions**                         | ✅ **Yes**       | ❌ _Excessive_                  |
| **Internal Data Mutations (CRUD)**                    | ✅ **Yes**       | ❌ _Excessive_                  |
| **On-Demand Cache Revalidation (`revalidatePath`)**   | ✅ **Yes**       | ⚠️ _Requires API configuration_ |
| **Public API Endpoints (Third-Party Integrations)**   | ❌ **No**        | ✅ **Yes**                      |
| **Incoming External Webhooks (Stripe, GitHub, etc.)** | ❌ **No**        | ✅ **Yes**                      |
| **Heavy-Duty Server Operations (Long-running tasks)** | ❌ **No**        | ✅ **Yes**                      |
| **Serving Non-JSON Payloads**                         | ❌ **No**        | ✅ **Yes**                      |

# 🔤 Mastering Fonts in Next.js: Google & Local Made Easy

Next.js includes **built-in font optimization** via the `next/font` module. It automatically downloads Google Fonts at build time and hosts them self-hosted from your own deployment. This eliminates external network requests in the browser, ensuring **zero Layout Shift (CLS)** and improved performance.

---

## 🌍 1. Global Fonts (App-Wide Setup)

To apply a font globally across your entire application, import it inside your root layout (`app/layout.tsx`) and attach it to the HTML `<body>` tag.

### 💻 Code Implementation

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
import "./globals.css";

// 🚀 Initialize the font with required configurations
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents invisible text during loading
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## 📄 2. File-Level Fonts (Scoped Components)

If you only need a specific font on a single landing page or a standalone component, you can import and apply it directly within that specific file instead of bundling it globally.

### 💻 Code Implementation

```tsx
// app/blog/page.tsx
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

export default function BlogPage() {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* 🎯 This heading is uniquely styled with Playfair Display */}
      <h1 className={`${playfair.className} text-4xl font-serif text-gray-900`}>
        Deep Dive into Architecture
      </h1>
      <p className="mt-4 text-gray-600">
        Standard global body text continues here...
      </p>
    </div>
  );
}
```

---

## 💻 3. Local Fonts (`next/font/local`)

For custom premium assets, brand fonts, or downloaded `.woff2` files that aren't available on Google Fonts, use the `next/font/local` utility.

### 📂 Directory Structure

Place your asset files inside a folder like `public/fonts/`:

```text
public/
└── fonts/
    ├── CustomSans-Regular.woff2
    └── CustomSans-Bold.woff2

```

### 💻 Code Implementation

```tsx
// app/layout.tsx
import localFont from "next/font/local";

// 🏗️ Configure local font files and map weights
const myCustomFont = localFont({
  src: [
    {
      path: "../public/fonts/CustomSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/CustomSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-custom-sans", // Useful for Tailwind integration
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={myCustomFont.className}>{children}</body>
    </html>
  );
}
```

---

## 🔀 4. Managing Multiple Fonts (Tailwind CSS Integration)

When combining a primary layout font (Sans-serif), a heading font (Serif), and a code font (Monospace), the cleanest approach is utilizing **CSS Variables** integrated with Tailwind CSS.

### Step 1: Initialize Fonts with CSS Variables

```tsx
// app/layout.tsx
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Defines the custom CSS variable
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-white text-gray-900">{children}</body>
    </html>
  );
}
```

### Step 2: Extend Tailwind Configuration

Extend your `tailwind.config.js` or map your utilities using standard CSS variables:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Link Tailwind classes directly to your Next.js variables
        sans: ["var(--font-sans)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
```

### Step 3: Use Clean Tailwind Classes Anywhere

```tsx
export default function Page() {
  return (
    <div className="p-10 space-y-4">
      {/* Uses Playfair Display via font-serif */}
      <h1 className="font-serif text-5xl font-bold">Elegant Heading</h1>

      {/* Uses Inter via font-sans */}
      <p className="font-sans text-base text-gray-700">
        {" "}
        Readable body description.
      </p>
    </div>
  );
}
```

# 📝 Forms in Next.js: Prefetching, Navigation & Server Actions

The `<Form>` component in Next.js is an enhanced extension of the standard HTML `<form>` element. It integrates tightly with the App Router, client-side navigation, and Server Actions to manage both data mutations and search routing with minimal boilerplate.

---

## 🎯 Why Next.js Introduced the `<Form>` Component

In traditional React and Next.js setups, capturing and submitting data required setting up manual local states, preventing default browser submission behaviors, and writing manual `fetch` lifecycle hooks:

```jsx
// 🛑 The old, boilerplate-heavy way
const handleSubmit = async (e) => {
  e.preventDefault();
  await fetch("/api/data", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
};
```

The Next.js App Router eliminates this friction. By linking forms directly to server-executed functions or specialized search routes, you no longer need to write intermediate API route layers just to pass payload payloads from front to back.

---

## ⚙️ How `<Form>` Works: The Two Core Modalities

The behavior, HTTP method, and network lifecycle of the `<Form>` component are completely determined by whether you pass a **String URL** or a **Function Reference** into its `action` prop.

### 1. When `action` is a String URL (`action="/search"`)

When you supply a string path, the form acts as a high-performance **search or filter controller**.

- **HTTP Method:** Uses `GET`.
- **State Mapping:** Automatically takes the `name` attributes of all inner inputs and serializes them into URL search parameters.
- **Navigation:** Performs a smooth **client-side navigation** to the target route (e.g., `/search?query=react`) without triggering a full page reload, keeping layouts mounted and state intact.

```tsx
import Form from "next/form";

export default function SearchBar() {
  return (
    // 🔍 Submitting this routes to: /search?query=[user-input]
    <Form action="/search" className="flex gap-2">
      <input
        name="query"
        type="text"
        placeholder="Search documentation..."
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded">
        Search
      </button>
    </Form>
  );
}
```

### 2. When `action` is a Function Reference (`action={createPost}`)

When you supply a pointer to a server-side function, the component serves as a **data mutation channel**.

- **HTTP Method:** Safely tunnels payloads via an automated `POST` request.
- **Endpoint Requirement:** Zero. No custom API route handlers (`route.ts`) are required.
- **Payload Handling:** The target Server Action function automatically receives a native `FormData` object containing the form's inputs.

```tsx
// app/posts/page.tsx
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
  async function createPost(formData: FormData) {
    "use server";
    const title = formData.get("title");
    // Securely persist to database here...

    revalidatePath("/posts");
  }

  return (
    <form action={createPost} className="space-y-4">
      <input
        name="title"
        type="text"
        className="border p-2 w-full"
        placeholder="Post Title"
      />
      <button type="submit" className="bg-black text-white p-2 rounded">
        Publish
      </button>
    </form>
  );
}
```

---

## 🌟 Strategic Benefits of Using Next.js Forms

- 📉 **Drastic Boilerplate Reduction:** Eliminates repetitive state setups, click listeners, and explicit data-fetching lines.
- ⚡ **Optimized Client Navigation:** For search pages, the target page is prefetched as soon as the form enters the viewport, resulting in near-instant transitions when submitted.
- 🔄 **Preserved UI State:** Because transitions happen over client-side routers rather than native browser reloads, sidebars, video plays, and local component states stay continuous.
- 🎛️ **Built-in Search Engine Optimization:** Standard query strings (`?key=value`) are generated naturally, making your application filter results bookmarkable and deeply shareable.

# 🔗 The Next.js `<Link>` Component

The `<Link>` component is a built-in React component that handles navigation between routes in a Next.js application. It extends the standard HTML `<a>` element to provide client-side navigation, route prefetching, and an incredibly fast user experience.

---

## 🏗️ Core Definition & Syntax

To navigate between pages, import `Link` from `next/link` and supply the target route to the `href` attribute.

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <nav className="p-6 bg-gray-50 border-b flex gap-4">
      {/* 🚀 Seamless client-side navigation */}
      <Link href="/" className="text-blue-600 hover:underline">
        Home
      </Link>
      <Link href="/dashboard" className="text-blue-600 hover:underline">
        Dashboard
      </Link>
    </nav>
  );
}
```

---

## ⚔️ `<Link>` vs. Standard HTML `<a>` Tag

Understanding the underlying network differences between standard anchors and the Next.js Link router is essential for optimization:

- 🛑 **Standard `<a>` Tag:** Forces the browser to perform a **full page reload**. The browser destroys the current state, drops loaded scripts, breaks layout caching, and requests a completely new HTML document from the server.
- ⚡ **Next.js `<Link>` Component:** Performs **Client-Side Navigation**. It intercepts the browser click, updates only the changing layout elements via React state transitions, and avoids a full browser refresh.

---

## 🌟 Key Features

### 1. Automatic Prefetching

Next.js automatically prefetches the code and data for the linked page in the background **as soon as the `<Link>` component enters the user's viewport** (using an Intersection Observer).

### 2. Layout Preservation

Because navigation occurs completely inside a client-side routing environment, shared parent layouts (like consistent sidebars, video components, or input states) stay completely mounted. Only the specific page route child changes.

### 3. SEO Friendly

Behind the scenes, Next.js renders the `<Link>` component as a fully formed semantic HTML `<a>` tag with a valid `href` attribute. This guarantees that search engine bots (like Googlebot) can seamlessly crawl your site map and index pages correctly.

---

## 🎛️ Advanced Control Props

You can pass specific optimization flags to modify how a link behaves:

```tsx
// 1. Disable prefetching for rarely used pages (like a logout button)
<Link href="/logout" prefetch={false}>Log Out</Link>

// 2. Replace the history state instead of adding a new entry
<Link href="/settings" replace>Settings</Link>

// 3. Scroll to top on navigation (Default is true)
<Link href="/profile" scroll={false}>View Profile (keeps scroll position)</Link>

```

# ⚡ Next.js `<Script>` Component

The `<Script>` component (`next/script`) is a built-in optimization utility designed to load third-party JavaScript files efficiently. It extends the native HTML `<script>` element, allowing developers to control the exact loading priority and execution timing of external scripts to drastically improve page speed and **Core Web Vitals**.

---

## 🛑 The Problem with Native `<script>` Tags

Using a standard HTML `<script>` tag inside a modern framework can block the browser's HTML parser, delaying page rendering and decreasing performance scores (like First Contentful Paint and Largest Contentful Paint).

Next.js solves this by offering fine-grained execution strategies, allowing you to relegate non-critical tracking, analytics, or widgets to background threads or idle browser execution cycles.

---

## 🎛️ Script Loading Strategies

You can explicitly direct Next.js on when to fetch and execute your script by modifying the `strategy` prop.

### 1. `beforeInteractive`

- **Behavior:** Loads and executes before any Next.js code and before the main page hydration occurs.
- **Best Used For:** Critical foundational scripts that the entire site depends on (e.g., bot detection software, security headers, cookie consent managers).

```tsx
<Script src="https://example.com/security.js" strategy="beforeInteractive" />
```

### 2. `afterInteractive` (Default ⚙️)

- **Behavior:** Loads immediately _after_ the page becomes interactive. Next.js injects this client-side after hydration completes.
- **Best Used For:** Standard third-party integrations that require immediate page analytics or user tracking (e.g., Google Analytics, Tag Manager).

```tsx
<Script src="https://example.com/analytics.js" strategy="afterInteractive" />
```

### 3. `lazyOnload`

- **Behavior:** Delays execution until the browser enters an idle period, ensuring no main-thread competition during early layouts.
- **Best Used For:** Low-priority background utilities that are not required for core operations (e.g., live support chat widgets, social media embed scripts).

```tsx
<Script src="https://example.com/chat-widget.js" strategy="lazyOnload" />
```

---

## ⚙️ Essential Props & Event Hooks

The component includes lifecycle event callbacks, enabling components to react to a script's loading states:

| Prop           | Type                  | Purpose                                                                                             |
| -------------- | --------------------- | --------------------------------------------------------------------------------------------------- |
| **`src`**      | `string` _(Required)_ | The external URL path of the script asset.                                                          |
| **`strategy`** | `string`              | The loading priority scheme (`beforeInteractive`, `afterInteractive`, `lazyOnload`, `worker`).      |
| **`onLoad`**   | `function`            | Fires **exactly once** immediately after the script finishes loading. _(Requires Client Component)_ |
| **`onReady`**  | `function`            | Fires on load, and additionally **every single time** the hosting component mounts or updates.      |
| **`onError`**  | `function`            | Executes a fallback routine if the script fails to resolve or download.                             |

---

## 💻 Implementation Example

Here is how you handle lifecycle hooks to safely initialize a library once it successfully downloads:

```tsx
"use client";

import Script from "next/script";

export default function AnalyticsDashboard() {
  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h2 className="text-xl font-bold mb-2">Integration Panel</h2>
      <p className="text-gray-600 text-sm">
        Monitoring external script attachments...
      </p>

      {/* 🚀 Loading an external script with interactive callbacks */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.21/lodash.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("✅ Lodash script has finished executing and is ready.");
        }}
        onError={(err) => {
          console.error("❌ Failed to resolve the specified script:", err);
        }}
      />
    </div>
  );
}
```

# 🖼️ Optimized Images in Next.js: The `<Image>` Component

The Next.js `<Image>` component (`next/image`) is an advanced extension of the native HTML `<img>` element. It includes **automatic image optimization** engine features that modify image dimensions, formats, and compression schemes on-the-fly to protect your application from bloated image payloads and layout distortions.

---

## ⚡ Why Use `<Image>` Over Native `<img>`?

Using a standard `<img>` tag forces browsers to download uncompressed, un-resized image formats, resulting in poor mobile performance and shifting text blocks. Next.js fixes this by shipping standard, production-ready optimizations automatically:

- 📉 **Modern Formats:** Automatically converts images into ultra-lightweight next-gen web formats like **WebP** or **AVIF** depending on browser compatibility.
- 📏 **Preventing Cumulative Layout Shift (CLS):** Forces you to define strict proportional parameters, ensuring the browser allocates spatial containers _before_ the image asset loads.
- 💤 **Native Lazy Loading:** Postpones downloading images until they move close to the user's viewport, cutting initial bundle load footprints.
- 📱 **Dynamic Sizing:** Generates multiple internal responsive source files (`srcset`) behind the scenes so mobile devices never download a 4K desktop file.

---

## 📂 1. Working with Local Images

Images placed within your project's `/public` directory are served directly from your application's root URL path.

### 💻 Code Implementation

```tsx
import Image from "next/image";

export default function ProfileView() {
  return (
    <div className="p-4 max-w-sm mx-auto bg-white border rounded-xl shadow">
      {/* 🚀 Next.js extracts dimensions automatically if you statically import it, 
          or you provide manual coordinates for root strings */}
      <Image
        src="/profile.png"
        width={500}
        height={500}
        alt="User profile representation avatar"
        className="rounded-full"
      />
    </div>
  );
}
```

---

## 🌐 2. Working with Remote Images

When loading assets from third-party servers, cloud buckets, or databases, you **must explicitly declare** the `width` and `height` dimensions since Next.js cannot read remote metadata paths during build configurations.

```tsx
<Image
  src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
  width={800}
  height={600}
  alt="Abstract colorful gradient background artwork"
/>
```

---

## 🔐 3. Whitelisting Domains with `remotePatterns`

To prevent cross-site scripting vulnerabilities and malicious bandwidth sniffing attacks, **Next.js blocks all third-party external image URLs by default.** You must explicitly whitelist trusted domains inside your configuration file using structural pattern rules.

### ⚙️ Configuration Setup (`next.config.ts` or `next.config.js`)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 🧱 Whitelist explicit sources with wildcards using structural properties
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s3.amazonaws.com",
        port: "",
        pathname: "/my-production-bucket/**", // Allowed subfolder path pattern
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Matches any path string on this host
      },
    ],
  },
};

export default nextConfig;
```

---

## 🎛️ Summary of Essential Configuration Fields

When constructing your security whitelist configuration arrays, map keys according to these matching parameters:

| Configuration Field | Purpose / Match Rule                                                | Example Value           |
| ------------------- | ------------------------------------------------------------------- | ----------------------- |
| **`protocol`**      | Match strict connection schemes (`http` vs `https`).                | `'https'`               |
| **`hostname`**      | The specific root domain endpoint target.                           | `'images.unsplash.com'` |
| **`port`**          | Optional unique listening parameters (leave empty for defaults).    | `''`                    |
| **`pathname`**      | Restrict access to deep directories using glob match syntax (`**`). | `'/my-bucket/**'`       |

# 📧 Contact Form Project: Architecture, Setup & Database Connection
