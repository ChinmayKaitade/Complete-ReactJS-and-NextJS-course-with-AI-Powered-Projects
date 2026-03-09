## 🧠 JavaScript Refresher – Add On

This section refreshes **core JavaScript concepts** from fundamentals to advanced topics and includes **real-world projects**.
It helps strengthen the **JavaScript foundation required for React and full-stack development**. 🚀

---

# 📜 JavaScript Story – From Console to V8 Engine

JavaScript started as a **simple browser scripting language** but evolved into a powerful programming language.

Today JavaScript runs on:

- Browsers 🌐
- Servers using **Node.js**
- High-performance engines like **V8 JavaScript Engine**

The V8 engine converts JavaScript code into **machine code for fast execution**.

---

# ⚙️ How JavaScript Executes Code (Behind the Scenes)

JavaScript execution happens in phases:

```
Memory Creation Phase
↓
Execution Phase
```

Components involved:

- Call Stack 📚
- Heap Memory 🧠
- Event Queue 📥
- Event Loop 🔄

These components manage how code runs synchronously and asynchronously.

---

# 📦 Datatypes, Variables, and Constants

### Variables

Used to store values.

```javascript
let name = "Chinmay";
const age = 25;
var city = "Nagpur";
```

| Keyword | Behavior             |
| ------- | -------------------- |
| `let`   | Block scoped         |
| `const` | Cannot be reassigned |
| `var`   | Function scoped      |

---

# ➗ Operations in JavaScript

Types of operations:

- Arithmetic ➕ ➖ ✖️ ➗
- Comparison `==`, `===`, `>`, `<`
- Logical `&&`, `||`, `!`
- Assignment `=`, `+=`, `-=`

Example:

```javascript
let total = price * quantity;
```

---

# 🔢 Primitives in JavaScript

Primitive values store **single immutable values**.

Types:

```
string
number
boolean
null
undefined
symbol
bigint
```

Example:

```javascript
let score = 100;
```

---

# 📦 Non-Primitive Datatypes

These store **complex structures**.

Examples:

- Objects
- Arrays
- Functions

Example:

```javascript
let user = {
  name: "Chinmay",
  age: 25,
};
```

---

# 🧠 Condition Challenges

Practice conditions using:

```javascript
if
else
else if
switch
ternary operator
```

Example challenge:

```javascript
let age = 18;

if (age >= 18) {
  console.log("Eligible to vote");
}
```

---

# 📚 Arrays and Methods

Arrays store multiple values.

Example:

```javascript
let numbers = [1, 2, 3, 4];
```

Common methods:

| Method   | Purpose          |
| -------- | ---------------- |
| map()    | transform data   |
| filter() | filter items     |
| reduce() | aggregate values |
| push()   | add item         |
| pop()    | remove item      |

---

# 🔁 Loops in JavaScript

Loops repeat operations.

Types:

```
for
while
do while
for...of
for...in
```

Example:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

---

# 🧩 Functions and Arrow Functions

Functions group reusable logic.

Example:

```javascript
function greet(name) {
  return "Hello " + name;
}
```

Arrow function:

```javascript
const greet = (name) => {
  return "Hello " + name;
};
```

---

# 🎯 `this` and Context

`this` refers to the **current execution context**.

Example:

```javascript
const user = {
  name: "Chinmay",
  greet() {
    console.log(this.name);
  },
};
```

---

# 🧠 Higher Order Functions

Functions that:

- Accept other functions
- Return functions

Example:

```javascript
function calculate(a, b, operation) {
  return operation(a, b);
}
```

Used heavily in React.

---

# 🧬 Prototypes in JavaScript

JavaScript uses **prototype-based inheritance**.

Objects inherit properties from other objects.

Example chain:

```
Object → Prototype → Prototype → null
```

---

# 🏗️ Constructors and Classes

Constructor example:

```javascript
function User(name) {
  this.name = name;
}
```

Modern ES6 class:

```javascript
class User {
  constructor(name) {
    this.name = name;
  }
}
```

---

# 🧩 OOP Concepts in JavaScript

JavaScript supports OOP features:

| Concept       | Meaning                        |
| ------------- | ------------------------------ |
| Encapsulation | Hide internal details          |
| Polymorphism  | Same method different behavior |
| Abstraction   | Hide complexity                |
| Inheritance   | Reuse properties               |

Example:

```javascript
class Animal {
  speak() {
    console.log("Animal sound");
  }
}
```

---

# 🌐 DOM and BOM Basics

DOM = **Document Object Model**

Allows JavaScript to manipulate HTML.

Example:

```javascript
document.getElementById("title");
```

BOM = Browser Object Model

Examples:

```
window
navigator
location
history
```

---

# 🎯 DOM Challenges

Tasks include:

- Changing text
- Adding elements
- Removing nodes
- Handling events
- Updating styles

Example:

```javascript
document.querySelector("button");
```

---

# ⏳ Asynchronous JavaScript

JavaScript handles async operations using:

- Callbacks
- Promises
- Async/Await

Event Loop ensures **non-blocking execution**.

---

# 🔐 Closures

Closure allows function to **remember variables from outer scope**.

Example:

```javascript
function outer() {
  let count = 0;
  return function () {
    count++;
  };
}
```

---

# 🤝 Promises and Chaining

Promise represents **future result**.

Example:

```javascript
fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

# ⏳ Async / Await

Cleaner way to write async code.

```javascript
async function getData() {
  const res = await fetch(url);
  const data = await res.json();
}
```

---

# 🔁 Iterators and Generators

Generators pause execution.

Example:

```javascript
function* generator() {
  yield 1;
  yield 2;
}
```

---

# 📦 Modules in JavaScript

Two module systems:

| System      | Usage                    |
| ----------- | ------------------------ |
| ES6 Modules | `import/export`          |
| CommonJS    | `require/module.exports` |

---

# 🧪 Project 1 – Todo App

Features:

- Add task
- Store tasks in array
- Save data in **localStorage**

Example:

```javascript
localStorage.setItem("tasks", JSON.stringify(tasks));
```

---

# 🌐 Project 2 – API Handling

Learn how to:

- Fetch API data
- Display results
- Handle errors

Example:

```javascript
fetch("https://api.example.com");
```

---

# 🛒 Project 3 – Ecommerce Cart

Features:

- Product list
- Add to cart
- Remove item
- Calculate total price

---

# 💰 Project 4 – Expense Tracker

Features:

- Add expense
- Store in local storage
- Event delegation
- Track total expenses

---

# 🧠 Project 5 – Quiz Application

Features:

- Multiple questions
- Score calculation
- Next question navigation
- Result screen

---

# 🎯 What This Section Builds

By completing this section you will:

- Master **JavaScript fundamentals** 🧠
- Understand **asynchronous behavior** ⏳
- Learn **OOP concepts** 🏗️
- Build **real projects** 🚀
- Strengthen foundation for **React and full-stack development** ⚛️
