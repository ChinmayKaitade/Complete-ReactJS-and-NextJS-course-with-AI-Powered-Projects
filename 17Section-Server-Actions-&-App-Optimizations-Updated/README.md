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
