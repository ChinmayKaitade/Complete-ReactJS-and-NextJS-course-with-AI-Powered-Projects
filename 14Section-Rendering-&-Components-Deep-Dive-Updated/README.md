# 🚀 Module-4: Rendering & Components Deep Dive

In the Next.js App Router, components are divided into two primary types based on where they execute: **Server Components** and **Client Components**. Understanding this architecture is key to building highly performant web applications.

---

## 🖥️ Server Components (Default)

By default, every component you create inside the App Router is a **React Server Component (RSC)**. They run exclusively on the server, meaning their code never reaches the browser. They compute the UI on the server side and send the pre-rendered result down to the client.

### 🔑 Key Characteristics

- 🛑 **Zero Client-Side JS:** They do not send their JavaScript bundle to the browser, significantly reducing page size.
- 🔒 **No Browser APIs:** Because they run on the server, they cannot access browser-specific objects like `window`, `document`, or `localStorage`.
- ⚡ **No React Hooks:** State and lifecycle methods such as `useState`, `useReducer`, or `useEffect` cannot be used.
- 🌐 **Direct Async Capabilities:** You can use `async/await` directly in the component body to perform server-side tasks.

```jsx
// 🟢 Valid Server Component: Directly fetches data securely on the server
export default async function ServerComponent() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2>Server Rendered Data:</h2>
      <p>{data.message}</p>
    </div>
  );
}
```

---

## ⚖️ Advantages vs. Limitations

### 🌟 Advantages

- ⏱️ **Fast Initial Load:** They instantly render static parts of your UI, providing users with content without waiting for large JavaScript bundles to parse.
- 📈 **Better Performance & SEO:** Search engine crawlers can easily read the fully rendered HTML markup, boosting SEO rankings out of the box.
- 🛡️ **More Secure:** Since code stays on the server, you can safely query databases or access private API keys without exposing them to the frontend client.
- 📥 **Built for Data Fetching:** Placing data fetching closer to your data source (on the server) reduces the number of round-trips the browser needs to make.

### ⚠️ Limitations

- 🖱️ **No UI Interactivity:** They cannot listen to user interactions like `onClick`, `onChange`, or `onSubmit`.
- 🎣 **No State Management:** Because they lack hydration capabilities for hooks, they cannot maintain live client-side state.

---

## 🗺️ When to Use Server Components?

To build an efficient Next.js application, you should rely on Server Components by default and only opt for Client Components when interactivity is strictly required.

| Feature / Requirement                                       | Server Component 🖥️ | Client Component 💻 |
| ----------------------------------------------------------- | ------------------- | ------------------- |
| **Fetch Data**                                              | ✅ (Recommended)    | ❌                  |
| **Access Backend Resources (Directly)**                     | ✅                  | ❌                  |
| **Keep Sensitive Keys Secure**                              | ✅                  | ❌                  |
| **Reduce Client-side JavaScript**                           | ✅                  | ❌                  |
| **Add Interactivity (`onClick`, `onChange`)**               | ❌                  | ✅                  |
| **Use State and Lifecycle Hooks (`useState`, `useEffect`)** | ❌                  | ✅                  |
| **Use Browser-Only APIs (`window`, `localStorage`)**        | ❌                  | ✅                  |
