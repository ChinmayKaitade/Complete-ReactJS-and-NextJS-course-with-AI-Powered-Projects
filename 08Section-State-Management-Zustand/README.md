## 🧠 State Management – Zustand

In large React applications, managing state across multiple components becomes difficult.
That’s where **state management libraries** help by creating a **centralized store** for your data. ⚛️

---

## 📚 State Management Libraries

Some popular state management libraries in React:

| Library        | Description                         |
| -------------- | ----------------------------------- |
| 🧠 **Zustand** | Lightweight and simple global state |
| 🔄 **Redux**   | Powerful but more complex           |
| ⚡ **Recoil**  | Atom-based state management         |
| 🧩 **Jotai**   | Minimal and flexible                |

👉 **Zustand** is popular because:

- Very simple API
- Less boilerplate
- No provider required

---

## 🏗️ Create Your First Store in Zustand

First install Zustand:

```bash
npm install zustand
```

Create a store file:

```jsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}));

export default useStore;
```

Using the store:

```jsx
function Counter() {
  const { count, increase } = useStore();

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={increase}>Increase</button>
    </div>
  );
}
```

Now the state is **globally accessible**. 🌍

---

## 🎯 Subscribe Only to What You Need

One powerful feature of Zustand is **selective subscription**.

Instead of loading the entire store, you subscribe to **specific values**.

Example:

```jsx
const count = useStore((state) => state.count);
```

Benefits:

- Better performance ⚡
- Avoid unnecessary re-renders 🔄
- Cleaner components 🧹

---

## 🧩 One Store with Multiple Slices

Large apps often divide state into **slices**.

Example store structure:

```jsx
const useStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),

  cart: [],
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),
}));
```

Now your store manages:

- 👤 User data
- 🛒 Cart data

All inside one global store.

---

## 🌐 Async Actions for API Calls

Zustand supports async functions easily.

Example:

```jsx
const useStore = create((set) => ({
  users: [],

  fetchUsers: async () => {
    const res = await fetch("https://api.example.com/users");
    const data = await res.json();

    set({ users: data });
  },
}));
```

Usage:

```jsx
const fetchUsers = useStore((state) => state.fetchUsers);
```

Now API data can be **stored globally**.

---

## 🚀 Why Developers Love Zustand

Advantages:

- Minimal boilerplate 🧹
- Simple learning curve 📚
- No providers required ⚡
- Great performance 🔥
- Works well with React hooks 🎣

---

## 🎯 What You’ll Learn in This Section

By the end you will understand:

- Global state management 🧠
- Zustand store creation 🏗️
- Selective state subscription 🎯
- Managing multiple slices 🧩
- Async API actions 🌐
