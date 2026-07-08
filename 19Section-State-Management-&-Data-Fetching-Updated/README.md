# 🌐 State Management & Data Fetching with TanStack Query

When fetching server data manually in a React or Next.js application, developers often fall into a loop of writing repetitive state management patterns. This manual approach introduces massive boilerplate and introduces a problem known as managing **Server State**.

---

## 🛑 The Problem: Manual Server State vs. Client State

Traditional client state management libraries (like Zustand or Redux) are built for managing local UI data (like open modals or dark mode flags). However, server data behaves completely differently—it is asynchronous, can change without the client's knowledge, and requires caching to prevent unnecessary network requests.

Without an abstraction layer, handling server data means repeating this logic across components:

- Writing `fetch()` inside a `useEffect` hook.
- Manually managing separate boolean flags for `isLoading` and `isError`.
- Initializing local `useState` hooks to store the resulting payload.
- Writing custom pollers or listeners to handle background refetching and synchronization.

---

## ⚡ What is TanStack Query?

**TanStack Query** (formerly React Query) is an advanced server-state management library. It removes the need for manual orchestration by providing a robust, declarative cache layer that completely automates data fetching, state updates, error boundaries, and background data synchronization.

### 🌟 When to Use TanStack Query in Next.js

While Next.js handles server-side data fetching seamlessly via Server Components, TanStack Query is the go-to tool for highly dynamic client-side experiences:

- Interactive analytics dashboards requiring live background updates.
- Features like infinite scrolling, real-time filters, and complex pagination.
- Applications requiring instant user interface updates via optimistic UI changes.

---

## 🏗️ Core Architectural Concepts & Terminology

To work effectively with TanStack Query, you must understand its core building blocks:

- **QueryClient:** The centralized powerhouse that acts as the master controller for your application’s data grid. It tracks, updates, and dispatches cache blocks.
- **Query Cache:** An internal memory database that stores your server responses against specific identifiers, ensuring duplicate components instantly hit the local cache instead of making duplicate API calls.
- **Query Key:** A unique, serializable array (e.g., `['users', userId]`) that acts as a primary database key to identify and isolate specific chunks of cached server data.
- **Stale Data:** Cached data that is no longer considered fresh. TanStack Query will serve stale data immediately for speed, but will silently fetch a fresh copy in the background.
- **Invalidation:** The process of explicitly marking a specific query key as stale, telling the engine to immediately drop the current cache or perform a background refresh.

---

## 🎛️ Primary Hooks: Queries vs. Mutations

Data interactions are strictly separated into two fundamental operations:

### 1. `useQuery` (Data Fetching)

Used strictly for read-only operations (`GET` requests). It accepts a unique `queryKey` array and an asynchronous `queryFn` wrapper.

```tsx
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async () => {
  const res = await fetch("/api/users");
  return res.json();
};

export function UsersList() {
  // 🎣 useQuery handles loading states, error fields, and data arrays natively
  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  if (isLoading) return <div>Spinning up records... ⌛</div>;
  if (isError) return <div>Failed to establish backend connection.</div>;

  return (
    <ul>
      {data.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

### 2. `useMutation` (Data Modification)

Used for data write operations (`POST`, `PUT`, `PATCH`, or `DELETE` requests) that alter data on your remote server.

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

const addUser = async (newUser: { name: string }) => {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(newUser),
  }).then((res) => res.json());
};

export function NewUserButton() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      // 🚀 Instantly clear the cache to trigger a clean background refresh of the user list
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return (
    <button onClick={() => mutation.mutate({ name: "Chinmay Kaitade" })}>
      {mutation.isPending ? "Saving..." : "Add Developer ➕"}
    </button>
  );
}
```

---

## 🛠️ Initialization & Context Provider Setup in Next.js

Because Next.js blends server components with client code, you must initialize your `QueryClient` inside a dedicated client provider file to ensure the cache stays persistent across client-side page transitions.

### Step 1: Create the Query Provider Component

```tsx
// app/components/providers.tsx
"use client"; // 🚀 Must be marked as a Client Component for React Context

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // 💡 Using useState ensures that Next.js creates the QueryClient exactly once per session
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
            refetchOnWindowFocus: false, // Turn off automatic refetching on window focus
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
```

### Step 2: Wrap Your Application Root Layout

```tsx
// app/layout.tsx
import Providers from "./components/providers";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* 🏛️ Encapsulate children to make TanStack Query active app-wide */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

# 🎣 The `useQuery` Hook: Declarative Client-Side Fetching

Fetching data in traditional React applications forces developers to imperatively manage the network lifecycle. The `useQuery` hook from TanStack Query transforms this into a declarative experience by abstracting state orchestration and background synchronization away from your component code.

---

## 🛑 The Imperative Approach vs. Declarative `useQuery`

When relying purely on native React hooks, your component becomes cluttered with infrastructure logic instead of focusing on rendering UI.

### The Standard React Boilerplate (`useEffect` + `useState`)

```jsx
// 🛑 The imperative way: Manual state tracking and side-effect synchronization
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((data) => {
      setData(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
}, []);
```

### The TanStack Query Alternative (`useQuery`)

```tsx
// 🚀 The declarative way: Describe WHAT data you need and WHERE to get it
const { data, isLoading, error } = useQuery({
  queryKey: ["users"],
  queryFn: () => fetch("/api/users").then((res) => res.json()),
});
```

---

## ⚙️ How `useQuery` Automates the Fetching Lifecycle

When you invoke `useQuery`, TanStack Query initializes an automated lifecycle manager that handles the heavy lifting behind the scenes:

1. **State Destructuring:** It instantly exposes reactive properties like `isLoading`, `isError`, `error`, and `data` directly to your component layout, eliminating manual state synchronization.
2. **Cache Verification:** Before executing the network request, the engine checks if the explicit `queryKey` matching `["users"]` already exists in its global cache buffer. If it does, it immediately returns the cached copy to ensure an instant UI paint.
3. **Background Validation:** While serving cached data, it checks if the data lifecycle has expired (`isStale`). If stale, it silently fires the `queryFn` in the background, updates the cache, and triggers a clean re-render without causing structural layout shifts.

---

## 🏆 Key Advantages at a Glance

| Architectural Layer       | Traditional React Flow 🛑                       | TanStack Query Architecture ⚡                         |
| ------------------------- | ----------------------------------------------- | ------------------------------------------------------ |
| **Boilerplate Footprint** | Heavy (`useState` + `useEffect` + catch blocks) | Minimal (Single configuration object wrapper)          |
| **Caching Tier**          | None (Triggers network hits on every remount)   | Automated (Shared client-side data cache)              |
| **Tab Synchronization**   | Missing (Stale data persists indefinitely)      | Automatic (Refetches data on window focus)             |
| **Network Resilience**    | Fails instantly on query rejection              | Automatic retry algorithms on dropped network requests |

# ⚡ useMutation in TanStack Query: Mutations, Invalidation & Optimistic UI

While `useQuery` is designed strictly for read-only operations (`GET`), **`useMutation`** is the cornerstone hook for data mutations—operations that create, update, or delete data on the server (`POST`, `PUT`, `PATCH`, `DELETE`).

---

## 🛠️ 1. What is `useMutation`?

`useMutation` focuses on the asynchronous lifecycle of side-effects. Unlike `useQuery`, which executes automatically when a component mounts, a mutation only runs when you explicitly call its execute command: **`mutate()`**.

### 💻 Code Implementation

```tsx
import { useMutation } from "@tanstack/react-query";

const addUser = async (newUserData: { name: string }) => {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(newUserData),
  });
  return res.json();
};

export function CreateUser() {
  const mutation = useMutation({
    mutationFn: addUser,
  });

  return (
    <button
      onClick={() => mutation.mutate({ name: "Alex" })}
      disabled={mutation.isPending}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
    >
      {mutation.isPending ? "Saving user..." : "Add User ➕"}
    </button>
  );
}
```

---

## 🔄 2. Query Invalidation (Cache Synchronization)

When you modify data on the backend, the existing client-side cache managed by `useQuery` instantly becomes outdated (stale). To prevent your app from displaying stale data, use **Query Invalidation** via the `QueryClient`.

By calling `queryClient.invalidateQueries()`, you mark a specific query key as stale, causing TanStack Query to immediately initiate a background refetch for any active components listening to that key.

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function AddTodoForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newTodo: string) =>
      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify({ newTodo }),
      }),

    // 🎯 The onSuccess hook executes immediately after a successful API response
    onSuccess: () => {
      // Instantly forces any component using ['todos'] to poll fresh data
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
}
```

---

## 🚀 3. Optimistic UI Updates

In standard web operations, the interface remains frozen in a loading state while waiting for a server round-trip to complete. This network lag can make applications feel sluggish.

**Optimistic UI** flips this pattern: it updates the user interface _instantly_ assuming the request will succeed, while running the network task silently in the background. If the server approves the modification, the mutation finishes seamlessly. If the backend fails, the UI gracefully rolls back to its exact pre-mutation state.

### 💻 Full Implementation Example (Optimistic Like Button)

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function LikeButton({
  postId,
  initialLikes,
}: {
  postId: string;
  initialLikes: number;
}) {
  const queryClient = useQueryClient();
  const queryKey = ["post", postId];

  const mutation = useMutation({
    mutationFn: () => fetch(`/api/posts/${postId}/like`, { method: "POST" }),

    // 1️⃣ Step 1: Triggered before the network request fires
    onMutate: async () => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic state
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous cache configuration for rollback security
      const previousPostData = queryClient.getQueryData(queryKey);

      // Optimistically update the cache instantly
      queryClient.setQueryData(queryKey, (old: any) => ({
        ...old,
        likes: old.likes + 1,
      }));

      // Return the snapshot object context to pass down to onError
      return { previousPostData };
    },

    // 2️⃣ Step 2: Executes if the backend returns an error payload
    onError: (err, newVariables, context) => {
      // Revert the UI by restoring our snapped cache data structure
      if (context?.previousPostData) {
        queryClient.setQueryData(queryKey, context.previousPostData);
      }
      alert("Network error. Failed to record your like. ❌");
    },

    // 3️⃣ Step 3: Always runs at the end, regardless of success or failure
    onSettled: () => {
      // Sync cache back with the true database state
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return <button onClick={() => mutation.mutate()}>Like ❤️</button>;
}
```

---

## 📊 Summary Lifecycle Reference

| Event State Hook | Execution Timing                                  | Ideal Use Case                                                           |
| ---------------- | ------------------------------------------------- | ------------------------------------------------------------------------ |
| **`onMutate`**   | Fires _before_ the API call runs.                 | Setting up optimistic updates and saving cache layout snapshots.         |
| **`onSuccess`**  | Fires _after_ the API call successfully resolves. | Running cache invalidation or updating local redirection routing states. |
| **`onError`**    | Fires _if_ the API handler rejects.               | Rolling back optimistic changes and feeding error alerts to users.       |
| **`onSettled`**  | Fires _at the very end_ (success or failure).     | Revalidating query structures to ensure accurate sync.                   |

# 🌊 What is Hydration & Caching in Next.js?

## 🛑 The Problem Traditional React Apps Face

In standard client-side React applications (like those built with Vite or Create React App), the server sends an almost completely empty HTML file along with a massive JavaScript bundle. The browser has to download, parse, and execute all that JavaScript before the user can see or interact with anything.

This architecture introduces major bottlenecks:

- 🐌 **Slower First Load:** Users stare at a blank white screen while the JavaScript bundle downloads.
- 📉 **Poor SEO:** Search engine bots often see an empty body tag because they don't wait for client-side JavaScript to execute.

Next.js solves this by pre-rendering the HTML on the server and using **Hydration** and **Smart Caching** to deliver an instant, interactive experience.

---

## ⚡ What is Hydration?

**Hydration** is the process where React attaches event listeners and JavaScript functionality to a static HTML structure that was already pre-rendered on the server.

### 🔄 The Hydration Flow

1. **Server Rendering:** The server compiles your components and outputs fully formed, static HTML markup.
2. **Instant Paint:** The server sends this HTML to the browser. The user can instantly _see_ the layout (text, images, structure).
3. **JS Download:** The browser downloads the dry client-side JavaScript bundles in the background.
4. **Hydration Phase:** React reconciles the DOM, hooks up state, and binds event handlers (`onClick`, `onChange`).
5. **Interactive State:** The page becomes completely usable and interactive.

> 🍜 **Real-Life Analogy:** Think of server pre-rendering as a block of instant noodles. The server prepares and shapes the noodles so they arrive intact. The browser receives the noodles, but you can't eat them yet. **Hydration is adding the hot water**—it brings the static structure to life, making it ready to consume!

### ⚠️ The Infamous "Hydration Error"

A hydration error occurs when **the pre-rendered Server HTML does not match the initial Client HTML**. React expects the text, structures, and tags to line up perfectly. If it catches a discrepancy, it throws a warning or breaks the layout.

**Common Causes:**

- Using browser-only APIs directly in the rendering path (e.g., `window.innerWidth` or `localStorage`).
- Outputting non-deterministic data like `new Date()` or `Math.random()` without isolating it.
- Incorrect HTML tagging nesting (e.g., placing a `<div>` inside a `<p>` tag).

---

## 🗄️ Caching in Next.js

Caching stores previously computed data, database responses, or rendered HTML segments so they can be reused instantly instead of forcing the server to repeat the same work for subsequent visits.

Next.js employs a multi-tiered caching architecture split across four distinct layers:

### 1. Request Memoization (Server-Side)

- **What it is:** Caches specific `fetch` calls by URL and options during a single server render cycle.
- **Why it matters:** If three different components in your layout tree request the exact same data (`fetch('/api/user')`), Next.js automatically deduplicates it so only one actual network call hits your database.

### 2. Data Cache (Server-Side)

- **What it is:** Persists fetched data across multiple user requests and deployments.
- **Why it matters:** It keeps your remote data intact until you explicitly wipe it using revalidation functions (`revalidatePath` or `revalidateTag`).

### 3. Full Route Cache (Server-Side)

- **What it is:** Caches the static HTML markup and React Server Component payload for entire page routes at build time.
- **Why it matters:** When a user requests a static page like `/about`, the server doesn't re-render components—it streams the pre-compiled file directly from memory instantly.

### 4. Router Cache (Client-Side / Browser)

- **What it is:** An in-memory cache running inside the user's browser that stores prefetched page segments.
- **Why it matters:** When navigating between pages using the `<Link>` component, the browser pulls sections from this local cache, creating instant page transitions without making new round-trips to the server.
