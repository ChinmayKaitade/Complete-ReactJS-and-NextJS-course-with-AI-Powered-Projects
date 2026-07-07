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
