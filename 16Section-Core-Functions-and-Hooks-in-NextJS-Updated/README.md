# 🔗 The `useParams` Hook in Next.js

The `useParams` hook is a **Client Component hook** that allows you to read the dynamic parameters of the current route directly from the URL. It is a powerful way to make your frontend components reactive to URL structures.

---

## 🏗️ Core Usage & Syntax

To use `useParams`, you must opt into the client boundary by adding `"use client"` at the top of your file.

```tsx
"use client";

import { useParams } from "next/navigation";

export default function ProductDetails() {
  // 🚀 Call the hook to pull dynamic parameters from the URL
  const params = useParams();

  // Route: /shop/[category]/[item]
  // URL:   /shop/shoes/nike-air-max
  // Output: { category: "shoes", item: "nike-air-max" }
  console.log(params);

  return (
    <div className="p-6 bg-white rounded-xl shadow border">
      <h1 className="text-xl font-bold capitalize">
        Category: {params.category}
      </h1>
      <p className="text-gray-600">Product: {params.item}</p>
    </div>
  );
}
```

---

## 🛠️ How `useParams` Behaves Across Routes

The hook doesn't accept any parameters itself, but the object it returns changes structure dynamically depending on your `app/` folder naming convention.

| Folder Route Layout | Actual Browser URL | `useParams()` Object Output |
| ------------------- | ------------------ | --------------------------- |

| `app/shop/page.js` <br>

<br>_(Static Route)_ | `/shop` | `{}` _(Empty Object)_ |
| `app/shop/[slug]/page.js` <br>

<br>_(Dynamic Segment)_ | `/shop/electronics` | `{ slug: "electronics" }` |
| `app/shop/[tag]/[item]/page.js` <br>

<br>_(Nested Segments)_ | `/shop/shoes/air-max` | `{ tag: "shoes", item: "air-max" }` |
| `app/shop/[...slug]/page.js` <br>

<br>_(Catch-All Segment)_ | `/shop/clothes/tops/shirts` | `{ slug: ["clothes", "tops", "shirts"] }` |

---

## 💡 Key Considerations & Type Safety

- 📜 **Type Returns:** The values returned inside the parameters object are always **strings** (for standard dynamic segments) or **arrays of strings** (for catch-all segments). If you are processing numeric values (like `/shop/[id]`), remember to parse them using `parseInt()`.
- 🔒 **TypeScript Generics:** You can pass a generic type argument to `useParams` to make your route handling code strict and type-safe:

```tsx
const params = useParams<{ category: string; item: string }>();
```

# 🧭 usePathname Hook

A sleek **Client Component** hook in Next.js that allows you to read the current URL's pathname on the fly. ✨

```jsx
"use client";

import { usePathname } from "next/navigation";

export default function ExampleClientComponent() {
  const pathname = usePathname();
  return <p>📍 Current Pathname: {pathname}</p>;
}
```

---

### 📥 Parameters

`const pathname = usePathname()`

- 🙅‍♂️ `usePathname` does not take any parameters.

---

### 📤 Returns

🔄 Returns a `string` of the current URL's pathname. It strictly grabs the path, meaning search parameters (`?`) and hashes (`#`) are ignored!

| 🌐 URL              | 📄 Returned Value     |
| ------------------- | --------------------- |
| `/`                 | `"/"`                 |
| `/dashboard`        | `"/dashboard"`        |
| `/dashboard?v=2`    | `"/dashboard"`        |
| `/blog/hello-world` | `"/blog/hello-world"` |

# 🔍 useSearchParams Hook

A dynamic **Client Component** hook in Next.js that lets you read the current URL's query string parameters with ease! ⚡

```jsx
"use client";

import { useSearchParams } from "next/navigation";

export default function SearchBar() {
  const searchParams = useSearchParams();

  // URL example: /dashboard?search=my-project
  const search = searchParams.get("search");

  return <p>🔍 Search Term: {search}</p>;
}
```

---

### 📥 Parameters

`const searchParams = useSearchParams()`

- 🙅‍♂️ `useSearchParams` does not take any parameters.

---

### 📤 Returns

⚙️ Returns an instance of the `URLSearchParams` object. You can use its built-in utility methods to read the query string:

- 🪝 **`searchParams.get(key)`**: Returns the first value associated with the given search parameter.
- 📋 **`searchParams.has(key)`**: Returns a boolean checking if the parameter exists.
- 🔄 **`searchParams.entries()`**: Returns an iterator allowing you to loop through all key/value pairs.

| 🌐 URL                         | 🛠️ Code                      | 📄 Returned Value        |
| ------------------------------ | ---------------------------- | ------------------------ |
| `/dashboard?search=my-project` | `searchParams.get('search')` | `"my-project"`           |
| `/dashboard?search=my-project` | `searchParams.get('id')`     | `null`                   |
| `/products?tag=sale&tag=new`   | `searchParams.get('tag')`    | `"sale"` _(first value)_ |
