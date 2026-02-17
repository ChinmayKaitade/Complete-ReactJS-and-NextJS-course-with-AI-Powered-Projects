## 🧪 Your First React Project with State

### 🔢 Introduction to Counter Project with Forms

The **counter project** is a classic beginner React app.

It helps you understand:

- How **state changes the UI** 🔄
- How user actions trigger updates 🖱️
- How React re-renders components automatically ⚡

Example idea:

- A counter that increases or decreases
- A form where users can enter values
- UI updates instantly when state changes

---

### 🧠 JavaScript Runtime – Node and Bun for React

To run React projects locally, you need a **JavaScript runtime**.

Popular runtimes:

| Runtime    | Description                        |
| ---------- | ---------------------------------- |
| 🟢 Node.js | Most popular JavaScript runtime    |
| ⚡ Bun     | Very fast modern runtime           |
| 🧪 Deno    | Secure, modern alternative to Node |

Common choice:

- **Node.js** is the standard for React development.

---

### 📝 Writing HTML Elements and Forms in React

In React, you write HTML using **JSX**.

Example:

```jsx
function FormExample() {
  return (
    <form>
      <input type="text" placeholder="Enter name" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Key differences from HTML:

- `class` → `className`
- `for` → `htmlFor`
- Events use **camelCase** (e.g., `onClick`)

---

### ⚙️ Behind the Scenes of React State

**State** is data that changes over time and controls the UI.

How it works:

1. State stores data inside a component 🧠
2. When state changes, React **re-renders** the component 🔄
3. The UI updates automatically ⚡

Example concept:

```
State changes → React re-renders → UI updates
```

---

### 🎣 What are Hooks in React?

**Hooks** are special functions that let you:

- Use state
- Use lifecycle features
- Manage logic inside functional components

Common hooks:

- `useState` – manage state
- `useEffect` – handle side effects
- `useRef` – reference DOM elements

---

### 🔍 Going In-Depth with the useState Hook

`useState` is the most important hook for beginners.

Example:

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

Explanation:

- `count` → current state value
- `setCount` → function to update state
- `useState(0)` → initial value is 0

---

### 🧾 Handling Forms in React

React forms use **controlled components**.

This means:

- Form data is stored in **state**
- Input value is controlled by React

Example:

```jsx
import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("Hello " + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Flow:

```
User types → onChange updates state → UI reflects state
```

---

### 🚀 What You’ll Achieve in This Section

By the end, you’ll be able to:

- Create interactive components ⚛️
- Use `useState` for dynamic UI 🔄
- Handle forms and user input 📝
- Understand how React updates the interface ⚡
