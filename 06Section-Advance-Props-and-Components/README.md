## 🚀 Advance Props and Components

This section takes you deeper into **advanced React concepts** like complex props, Context API, refs, and custom hooks.
Here you move from beginner-level components to **real-world scalable architecture**. ⚛️

---

### 📦 Different Types of Props and Context

In React, props can be:

- 🔢 Primitive props → string, number, boolean
- 📦 Object props → objects with multiple values
- 📋 Array props → list of data
- 🧩 Function props → passing functions to child
- 👶 Children props → JSX inside a component

When passing props deeply across many components, it becomes difficult.
That’s where **Context API** helps. 🧠

---

### ⚙️ Setting Up Vite App for Props in React

You can create a project using:

```bash
npm create vite@latest
```

Use **Vite** for fast development.

Inside the project:

- Create `components/` folder 📁
- Create `hooks/` folder 📁
- Organize reusable logic into **custom hooks** 🎣

---

### 🎨 Design Button Variations with Props

Props allow dynamic styling.

Example:

```jsx
function Button({ variant, children }) {
  const styles = {
    primary: "bg-blue-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return <button className={styles[variant]}>{children}</button>;
}
```

Usage:

```jsx
<Button variant="primary">Save</Button>
<Button variant="danger">Delete</Button>
```

This makes components **flexible and reusable**. ♻️

---

### 👶 Children Props in React

`children` is a special prop that allows nesting.

```jsx
function Card({ children }) {
  return <div className="border p-4">{children}</div>;
}
```

Usage:

```jsx
<Card>
  <h2>Title</h2>
  <p>Description</p>
</Card>
```

This helps in creating **layout wrapper components**. 🧩

---

### 🧠 Complex Props with Complex Data

You can pass objects or arrays:

```jsx
function UserCard({ user }) {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
```

Usage:

```jsx
<UserCard user={{ name: "Chinmay", email: "abc@gmail.com" }} />
```

This is common in **API-driven applications**. 🌐

---

### 🎯 useRef and forwardRef in React

`useRef` is used to:

- Access DOM elements directly
- Store mutable values without re-rendering

Example:

```jsx
import { useRef } from "react";

function InputFocus() {
  const inputRef = useRef();

  return (
    <>
      <input ref={inputRef} />
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  );
}
```

`forwardRef` allows passing ref to child components.

Used in:

- Reusable input components
- UI libraries

---

### 🔁 Context API and Prop Drilling

**Prop drilling** happens when you pass props through multiple levels:

```
App → Parent → Child → GrandChild
```

It becomes messy 😵

Solution: **Context API**

Context allows:

- Global data sharing 🌍
- Avoid unnecessary prop passing
- Cleaner architecture 🧱

---

### 🏗️ Create Your First Context API Provider

```jsx
import { createContext, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState("Chinmay");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
```

Wrap your app:

```jsx
<UserProvider>
  <App />
</UserProvider>
```

---

### 🎣 Create Your First Custom Hook

Custom hooks extract reusable logic.

Example:

```jsx
import { useState } from "react";

function useCounter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return { count, increment };
}
```

Now reuse anywhere:

```jsx
const { count, increment } = useCounter();
```

---

### 🌍 Using Context in Multiple Components

```jsx
import { useContext } from "react";
import { UserContext } from "./UserContext";

function Profile() {
  const { user } = useContext(UserContext);
  return <h2>{user}</h2>;
}
```

Now any component inside the provider can access shared state.

---

## 🎯 What You’ll Master in This Section

By the end, you’ll understand:

- Advanced prop patterns 📦
- Children & reusable components 🧩
- Refs and DOM control 🎯
- Context API & avoiding prop drilling 🔁
- Writing scalable custom hooks 🎣
