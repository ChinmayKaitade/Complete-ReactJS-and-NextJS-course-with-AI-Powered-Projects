## 🎣 Custom Hooks (Advanced Level)

This section focuses on building **real-world logic using custom hooks**.
You’ll create a **Shopping Cart system** and manage state like a pro. ⚛️

---

## ⚙️ Setting Up Application for Custom Hooks

Start with a clean React setup using:

```bash
npm create vite@latest
```

Use **Vite** for fast development.

Project structure:

```
src/
 ├── components/
 ├── hooks/
 │    └── useCart.js
 ├── App.jsx
```

👉 Keep reusable logic inside the `hooks/` folder.

---

## 🛒 Designing Components for Shopping Cart

Break UI into small components:

```
App
 ├── ProductList
 │    └── ProductCard
 ├── Cart
 │    └── CartItem
```

Each component has a clear role:

- 🛍️ ProductList → Display products
- ➕ Add to Cart → Trigger cart logic
- 🧾 Cart → Display selected items
- ❌ Remove → Delete from cart

---

## 🔄 useEffect Hook for Interviews

`useEffect` is commonly asked in interviews.

It is used for:

- API calls 🌐
- Subscriptions 🔔
- Local storage sync 💾
- Event listeners 🎧

Basic structure:

```jsx
useEffect(() => {
  console.log("Component Mounted");

  return () => {
    console.log("Cleanup");
  };
}, []);
```

Key points for interviews:

- Empty dependency array → runs once
- Dependency change → re-runs
- Cleanup function → prevents memory leaks

---

## 🔁 Sync Across Tabs

To sync cart data across browser tabs:

Use:

- `localStorage`
- `storage` event listener

Example logic inside custom hook:

```js
useEffect(() => {
  function syncCart(event) {
    if (event.key === "cart") {
      setCart(JSON.parse(event.newValue));
    }
  }

  window.addEventListener("storage", syncCart);

  return () => window.removeEventListener("storage", syncCart);
}, []);
```

Now if cart updates in one tab → it updates in others. 🌍

---

## 🛠️ Handling Cart Operations

Inside `useCart.js` custom hook:

```js
function useCart() {
  const [cart, setCart] = useState([]);

  function addItem(product) {
    setCart((prev) => [...prev, product]);
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function clearCart() {
    setCart([]);
  }

  return { cart, addItem, removeItem, clearCart };
}
```

This keeps:

- Business logic separate 🧠
- UI clean 🧩
- Code reusable ♻️

---

## ✨ Finish Up with Custom Hook Features

Benefits of custom hooks:

- Reusable logic 🎣
- Cleaner components 🧹
- Better separation of concerns 🧱
- Scalable architecture 🚀

You can extend cart hook with:

- Total price calculation 💰
- Quantity handling 🔢
- Persistent storage 💾

---

## 🐞 Debugging the Application – Thought Process

When debugging:

1. Check state updates 🧠
2. Check dependency array in `useEffect` 🔍
3. Log before and after state change 📋
4. Verify props and hook return values 📦
5. Use React DevTools 🛠️

Debugging mindset:

```
Problem → Is state updating?
        → Is UI re-rendering?
        → Is effect running?
```

---

## 🎯 What You’ll Master

After this section, you’ll be able to:

- Create powerful custom hooks 🎣
- Use `useEffect` confidently in interviews 🎯
- Build real-world cart logic 🛒
- Sync data across tabs 🌍
- Debug multi-hook applications 🐞
