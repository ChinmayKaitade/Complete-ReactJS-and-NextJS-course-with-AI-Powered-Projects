# 📂 Nested Dynamic Routing in Next.js

Welcome to the guide on **Nested Dynamic Routing** using the Next.js App Router! This repository demonstrates how to handle complex, hierarchical data structures by nesting dynamic route segments.

---

## 🧐 What is a Nested Dynamic Route?

A **Nested Dynamic Route** occurs when you place a dynamic folder inside another dynamic folder. This is incredibly useful for representing hierarchical, relational data (e.g., a specific post belonging to a specific user).

### 🌐 URL Example

```path
/user/42/posts/100

```

- **`42`** ➡️ Dynamic `userId`
- **`100`** ➡️ Dynamic `postId`

---

## 🏗️ Folder Structure

To achieve this in the Next.js `app` directory, you structure your folders like this:

```text
📁 app
 └── 📁 user
      └── 📁 [userId]
           └── 📁 posts
                └── 📁 [postId]
                     └── 📄 page.js

```

---

## 💻 Code Implementation

Inside your `app/user/[userId]/posts/[postId]/page.js` file, you can access both dynamic parameters effortlessly via the `params` prop.

```javascript
// app/user/[userId]/posts/[postId]/page.js

export default async function PostPage({ params }) {
  // Await params in Next.js App Router
  const { userId, postId } = await params;

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>👤 User Profile & 📝 Post Details</h1>
      <hr />
      <p>🆔 **User ID:** {userId}</p>
      <p>📬 **Post ID:** {postId}</p>
    </div>
  );
}
```

---

## 🚀 Key Takeaways

- 📁 **Folder Naming:** Wrap the folder name in square brackets `[param]` to make it dynamic.
- 🔗 **Infinite Nesting:** You can nest these as deeply as your data structures require (e.g., `/user/[userId]/posts/[postId]/comments/[commentId]`).
- ⚡ **Data Fetching:** Use these parameters directly to fetch relational data from your database or API.

# 🌐 Next.js Dynamic Routing: Catch-All & Optional Catch-All Segments

Welcome to the ultimate guide on mastering **Catch-All** and **Optional Catch-All** segments in Next.js! This repository and reference document breaks down how to move past the limitations of traditional dynamic routing and build flexible, scalable URL architectures for your web applications. 🚀

---

## 🛑 Limitations of Standard Dynamic Nested Routes

In Next.js, traditional dynamic nested routes are defined using single square brackets (e.g., `[userId]` or `[postId]`). This allows you to match URLs like `/users/42/posts/100`.

While powerful, standard dynamic routes suffer from two core limitations:

1. **🧱 Fixed Depth:** You must explicitly define every single layer of nesting in your folder hierarchy. If a user visits a path deeper than your folder structure, Next.js throws a `404 Not Found` error.
2. **📐 Rigid Structure:** The route strictly expects a fixed pattern. It cannot dynamically adapt to URL paths that contain a variable number of segments or subdirectories.

---

## 🎣 Catch-All Segments (`[...slug]`)

To eleganty handle routes with varying numbers of path segments, Next.js provides **Catch-All Segments**.

### 🤔 What Is It?

By prefixing your dynamic segment folder with three dots inside the square brackets (e.g., `[...slug]`), you instruct Next.js to capture **all subsequent path segments** and automatically bundle them into a single **array of strings** inside your page parameters.

### 📂 Folder Structure

`````

````text
README.md successfully created!

```text
app/
 └─ docs/
     └─ [...slug]/
         └─ page.jsx

`````

### 🎯 Matching URLs & Parameters

When users navigate to your paths, the `params.slug` will resolve as follows:

| URL Path                                | `params.slug` Value                   | Explanation                                                         |
| --------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| ❌ `/docs`                              | `undefined` (Throws 404)              | Standard catch-all **requires** at least one segment after `/docs`. |
| 📝 `/docs/getting-started`              | `['getting-started']`                 | Array with a single path element.                                   |
| 🛠️ `/docs/getting-started/installation` | `['getting-started', 'installation']` | Array capturing both nested segments.                               |
| 🏗️ `/docs/a/b/c/d`                      | `['a', 'b', 'c', 'd']`                | Dynamically handles deep, multi-level nesting!                      |

---

## ⚡ Optional Catch-All Segments (`[[...slug]]`)

If you want to make the catch-all behavior even more flexible, you can use **Optional Catch-All Segments** by wrapping the parameter in double square brackets: `[[...slug]]`.

### 🤔 What Is the Difference?

The crucial difference is that an **Optional Catch-All segment will match the root route** even if no parameters are passed at all!

### 📂 Folder Structure

```text
app/
 └─ docs/
     └─ [[...slug]]/
         └─ page.jsx

```

### 🎯 Matching URLs & Parameters

With double brackets, the base route no longer throws a 404 error:

| URL Path                                | `params.slug` Value                   | Explanation                                                 |
| --------------------------------------- | ------------------------------------- | ----------------------------------------------------------- |
| 🏠 `/docs`                              | `undefined` (or `{}`)                 | **Matches successfully!** Perfect for a landing/index page. |
| 📝 `/docs/getting-started`              | `['getting-started']`                 | Functions identically to standard catch-all.                |
| 🛠️ `/docs/getting-started/installation` | `['getting-started', 'installation']` | Functions identically to standard catch-all.                |

---

## 💡 Real-World Use Cases

Catch-all and optional catch-all routes are perfect for building dynamic, content-driven experiences:

- **📚 Documentation Hubs:** Structure complex, multi-level guides and user manuals without hardcoding directories.
- **📰 Blogs & CMS Frameworks:** Map categories, subcategories, tags, and publication dates (e.g., `/blog/tech/javascript/nextjs-routing`).
- **🛍️ E-Commerce Product Catalogs:** Handle deep multi-layered filtering arrays for products (e.g., `/shop/clothes/mens/jackets/outerwear`).

---

## 💻 Code Implementation Example

Here is how you can easily handle these parameters inside your Next.js server component (`page.jsx`):

```jsx
export default function DocsPage({ params }) {
  // Safe-guarding if params.slug is undefined (in Optional Catch-All)
  const slug = params.slug || [];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Documentation Reader</h1>
      <p>
        Current Path Segments: <code>{JSON.stringify(slug)}</code>
      </p>

      {slug.length === 0 && (
        <div>
          <h2>🏠 Welcome to the Docs Homepage</h2>
          <p>Select a category from the sidebar to get started.</p>
        </div>
      )}

      {slug[0] === "getting-started" && (
        <div>
          <h2>🚀 Getting Started Guide</h2>
          {slug[1] === "installation" ? (
            <p>
              To install, run: <code>npm install next@latest</code>
            </p>
          ) : (
            <p>Welcome! Please read through our onboarding steps.</p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

💡 _Tip: Use `[[...slug]]` whenever your parent directory (`/docs`) needs to serve as the index page for all nested content!_
"""

# 🌐 Next.js Dynamic Routing: Catch-All & Optional Catch-All Segments

Welcome to the ultimate guide on mastering **Catch-All** and **Optional Catch-All** segments in Next.js! This repository and reference document breaks down how to move past the limitations of traditional dynamic routing and build flexible, scalable URL architectures for your web applications. 🚀

---

## 🛑 Limitations of Standard Dynamic Nested Routes

In Next.js, traditional dynamic nested routes are defined using single square brackets (e.g., `[userId]` or `[postId]`). This allows you to match URLs like `/users/42/posts/100`.

While powerful, standard dynamic routes suffer from two core limitations:

1. **🧱 Fixed Depth:** You must explicitly define every single layer of nesting in your folder hierarchy. If a user visits a path deeper than your folder structure, Next.js throws a `404 Not Found` error.
2. **📐 Rigid Structure:** The route strictly expects a fixed pattern. It cannot dynamically adapt to URL paths that contain a variable number of segments or subdirectories.

---

## 🎣 Catch-All Segments (`[...slug]`)

To eleganty handle routes with varying numbers of path segments, Next.js provides **Catch-All Segments**.

### 🤔 What Is It?

By prefixing your dynamic segment folder with three dots inside the square brackets (e.g., `[...slug]`), you instruct Next.js to capture **all subsequent path segments** and automatically bundle them into a single **array of strings** inside your page parameters.

### 📂 Folder Structure

```text
app/
 └─ docs/
     └─ [...slug]/
         └─ page.jsx

```

### 🎯 Matching URLs & Parameters

When users navigate to your paths, the `params.slug` will resolve as follows:

| URL Path                                | `params.slug` Value                   | Explanation                                                         |
| --------------------------------------- | ------------------------------------- | ------------------------------------------------------------------- |
| ❌ `/docs`                              | `undefined` (Throws 404)              | Standard catch-all **requires** at least one segment after `/docs`. |
| 📝 `/docs/getting-started`              | `['getting-started']`                 | Array with a single path element.                                   |
| 🛠️ `/docs/getting-started/installation` | `['getting-started', 'installation']` | Array capturing both nested segments.                               |
| 🏗️ `/docs/a/b/c/d`                      | `['a', 'b', 'c', 'd']`                | Dynamically handles deep, multi-level nesting!                      |

---

## ⚡ Optional Catch-All Segments (`[[...slug]]`)

If you want to make the catch-all behavior even more flexible, you can use **Optional Catch-All Segments** by wrapping the parameter in double square brackets: `[[...slug]]`.

### 🤔 What Is the Difference?

The crucial difference is that an **Optional Catch-All segment will match the root route** even if no parameters are passed at all!

### 📂 Folder Structure

```text
app/
 └─ docs/
     └─ [[...slug]]/
         └─ page.jsx

```

### 🎯 Matching URLs & Parameters

With double brackets, the base route no longer throws a 404 error:

| URL Path                                | `params.slug` Value                   | Explanation                                                 |
| --------------------------------------- | ------------------------------------- | ----------------------------------------------------------- |
| 🏠 `/docs`                              | `undefined` (or `{}`)                 | **Matches successfully!** Perfect for a landing/index page. |
| 📝 `/docs/getting-started`              | `['getting-started']`                 | Functions identically to standard catch-all.                |
| 🛠️ `/docs/getting-started/installation` | `['getting-started', 'installation']` | Functions identically to standard catch-all.                |

---

## 💡 Real-World Use Cases

Catch-all and optional catch-all routes are perfect for building dynamic, content-driven experiences:

- **📚 Documentation Hubs:** Structure complex, multi-level guides and user manuals without hardcoding directories.
- **📰 Blogs & CMS Frameworks:** Map categories, subcategories, tags, and publication dates (e.g., `/blog/tech/javascript/nextjs-routing`).
- **🛍️ E-Commerce Product Catalogs:** Handle deep multi-layered filtering arrays for products (e.g., `/shop/clothes/mens/jackets/outerwear`).

---

## 💻 Code Implementation Example

Here is how you can easily handle these parameters inside your Next.js server component (`page.jsx`):

```jsx
export default function DocsPage({ params }) {
  // Safe-guarding if params.slug is undefined (in Optional Catch-All)
  const slug = params.slug || [];

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📚 Documentation Reader</h1>
      <p>
        Current Path Segments: <code>{JSON.stringify(slug)}</code>
      </p>

      {slug.length === 0 && (
        <div>
          <h2>🏠 Welcome to the Docs Homepage</h2>
          <p>Select a category from the sidebar to get started.</p>
        </div>
      )}

      {slug[0] === "getting-started" && (
        <div>
          <h2>🚀 Getting Started Guide</h2>
          {slug[1] === "installation" ? (
            <p>
              To install, run: <code>npm install next@latest</code>
            </p>
          ) : (
            <p>Welcome! Please read through our onboarding steps.</p>
          )}
        </div>
      )}
    </div>
  );
}
```

---

💡 _Tip: Use `[[...slug]]` whenever your parent directory (`/docs`) needs to serve as the index page for all nested content!_

Here is the beautifully formatted text version of the README file that you can easily copy and paste into your project:

# 🗺️ Next.js Routing Patterns Cheat Sheet

A quick, visually engaging reference guide for understanding **Dynamic Routes**, **Catch-All Segments**, and **Optional Catch-All Segments** in Next.js.

---

## 🧭 Summary Table

| Routing Type             | Syntax Example             | Fixed Depth? | Variable Depth? | Matches Base Route? |
| :----------------------- | :------------------------- | :----------: | :-------------: | :-----------------: |
| **Dynamic Nested Route** | `[id]` / `[category]/[id]` |    ✅ Yes    |      ❌ No      |        ❌ No        |
| **Catch-All Route**      | `[...slug]`                |    ❌ No     |     ✅ Yes      |        ❌ No        |
| **Optional Catch-All**   | `[[...slug]]`              |    ❌ No     |     ✅ Yes      |       ✅ Yes        |

---

## 🔍 Detailed Breakdown

### 🎯 1. Dynamic Nested Route (`[slug]`)

Best used when you have a **fixed structure** but dynamic IDs or slugs.

- **Fixed depth:** 🛑 **Yes** (Matches a specific number of segments)
- **Variable depth:** ❌ **No**
- **Matches base route:** ❌ **No** (Requires at least one argument)

📦 **Example Matrix:**

- `app/shop/[category]/[id]/page.js`
  - `/shop/electronics/iphone-15` 🟢 **Match** (category=`electronics`, id=`iphone-15`)
  - `/shop/electronics` 🔴 **404 Not Found**
  - `/shop/electronics/phones/iphone-15` 🔴 **404 Not Found**

---

### 🌊 2. Catch-All Route (`[...slug]`)

Best used for **variable depth** structures like documentation categories or nested folders where at least one parameter is required.

- **Fixed depth:** ❌ **No**
- **Variable depth:** 🚀 **Yes** (Matches one or many nested levels)
- **Matches base route:** ❌ **No** (Fails if no arguments are provided)

📦 **Example Matrix:**

- `app/docs/[...slug]/page.js`
  - `/docs/getting-started` 🟢 **Match** (`slug = ['getting-started']`)
  - `/docs/v2/installation/docker` 🟢 **Match** (`slug = ['v2', 'installation', 'docker']`)
  - `/docs` 🔴 **404 Not Found**

---

### 🔮 3. Optional Catch-All Route (`[[...slug]]`)

The most flexible router pattern. It behaves exactly like a Catch-All route, but **also matches the root/base path** without any arguments.

- **Fixed depth:** ❌ **No**
- **Variable depth:** 🚀 **Yes** (Matches zero, one, or many nested levels)
- **Matches base route:** 🎉 **Yes** (Zero parameters allowed!)

📦 **Example Matrix:**

- `app/products/[[...filters]]/page.js`
  - `/products` 🟢 **Match** (`filters = undefined`)
  - `/products/shoes` 🟢 **Match** (`filters = ['shoes']`)
  - `/products/shoes/nike/size-11` 🟢 **Match** (`filters = ['shoes', 'nike', 'size-11']`)

---

## 💡 Quick Cheat Sheet Summary

- **Fixed depth** ➡️ Dynamic nested route (**Yes**), Catch All (**No**), Optional Catch-All (**No**)
- **Variable depth** ➡️ Dynamic nested route (**No**), Catch All (**Yes**), Optional Catch-All (**Yes**)
- **Matches base route** ➡️ Dynamic nested route (**No**), Catch All (**No**), Optional Catch-All (**Yes**)

### Private Folders: Isolating Internal Logic

While Route Groups prevent folders from affecting the URL structure but still expose their inner `page.jsx` files as public routes, **Private Folders** completely opt out of the routing system.

By prefixing a folder name with an underscore `_folderName`, you tell Next.js to completely ignore that folder and all of its sub-directories for routing.

```
app/
- (marketing)/
  - home/
    - page.jsx
  - _components/       <-- Ignored by the router
    - Button.jsx
    - Card.jsx
- ui-lib/
  - _helpers.js        <-- Ignored by the router

```

#### Key Benefits of Private Folders

1. **Colocation of Files:** You can safely store UI components, utility functions, test files, and custom hooks directly inside the route folders they belong to, without accidentally creating public URLs.
2. **Clean Project Architecture:** It helps separate internal implementation details from the public-facing API/page structure.
3. **Future-Proofing:** It prevents naming collisions with future Next.js file conventions.

---

### Summary: Route Groups vs. Private Folders

| Feature                                    | Route Groups `(folder)`         | Private Folders `_folder`                  |
| ------------------------------------------ | ------------------------------- | ------------------------------------------ |
| **Omits folder from URL?**                 | ✅ Yes                          | ✅ Yes                                     |
| **Can contain public routes (`page.js`)?** | ✅ Yes                          | ❌ No (Entirely excluded from routing)     |
| **Primary Use Case**                       | Organizing layouts & clean URLs | Colocating internal components & utilities |

# Intercepting Routes: Same Level and One Level Up 🚀

Intercepting routes allow you to load a new route inside the current layout while masking the URL. Here is how the `(.)` and `(..)` conventions work in practice.

---

### 📍 1. Same Level Interception `(.)`

The `(.)` convention matches a route segment located at the **exact same folder depth** within your project directory.

#### 📁 Directory Structure

```text
app/
├── feed/
│   ├── (.)photo/       <-- Intercepts the photo route on the same level
│   │   └── page.jsx    <-- Renders inside a Modal
│   ├── photo/
│   │   └── page.jsx    <-- Renders as a Full Page on direct refresh
│   └── page.jsx        <-- The main Feed Page

```

#### 🔄 Visual Flow & Behavior

- **Navigating from `/feed` to `/feed/photo`:** Next.js intercepts the request. The URL changes to `/feed/photo`, but `app/feed/(.)photo/page.jsx` pops up as a modal overlay right on top of the existing feed page. Context is perfectly preserved.
- **Hard Refreshing on `/feed/photo`:** The interception breaks. Next.js bypasses the `(.)photo` folder and directly renders the traditional `app/feed/photo/page.jsx` as a dedicated standalone page.

---

### ⬆️ 2. One Level Up Interception `(..)`

The `(..)` convention matches a route segment located **one directory level higher** than the intercepting folder.

> ⚠️ **Note on Route Groups:** The `(..)` matcher checks _route segments_ (URL paths), not file folders. If your folder structure passes through a Route Group like `(marketing)/`, it does **not** count as a segment level.

#### 📁 Directory Structure

```text
app/
├── photo/
│   └── page.jsx        <-- The Full Page target (Root level /photo)
└── gallery/
    ├── (.)photo/       <-- Wrong! This looks for /gallery/photo
    ├── (..)photo/      <-- Correct! Looks one level up for the /photo segment
    │   └── page.jsx    <-- Renders inside a Modal
    └── page.jsx        <-- The Gallery Page (/gallery)

```

#### 🔄 Visual Flow & Behavior

- **Navigating from `/gallery` to `/photo`:** The `(..)` convention intercepts the `/photo` segment from one level above. The user stays visually inside the gallery layout, but a modal displays the content mapped from `app/gallery/(..)photo/page.jsx`.
- **Deep Linking / Bookmarking `/photo`:** If a user clicks a shared link or refreshes the page while the modal is open, they are sent straight to the root-level `app/photo/page.jsx` full page layout.

# Intercepting Routes: Same Level and One Level Up 🚀

Intercepting routes allow you to load a new route inside the current layout while masking the URL. Here is how the `(.)` and `(..)` conventions work in practice.

---

### 📍 1. Same Level Interception `(.)`

The `(.)` convention matches a route segment located at the **exact same folder depth** within your project directory.

#### 📁 Directory Structure

```text
app/
├── feed/
│   ├── (.)photo/       <-- Intercepts the photo route on the same level
│   │   └── page.jsx    <-- Renders inside a Modal
│   ├── photo/
│   │   └── page.jsx    <-- Renders as a Full Page on direct refresh
│   └── page.jsx        <-- The main Feed Page

```

#### 🔄 Visual Flow & Behavior

- **Navigating from `/feed` to `/feed/photo`:** Next.js intercepts the request. The URL changes to `/feed/photo`, but `app/feed/(.)photo/page.jsx` pops up as a modal overlay right on top of the existing feed page. Context is perfectly preserved.
- **Hard Refreshing on `/feed/photo`:** The interception breaks. Next.js bypasses the `(.)photo` folder and directly renders the traditional `app/feed/photo/page.jsx` as a dedicated standalone page.

---

### ⬆️ 2. One Level Up Interception `(..)`

The `(..)` convention matches a route segment located **one directory level higher** than the intercepting folder.

> ⚠️ **Note on Route Groups:** The `(..)` matcher checks _route segments_ (URL paths), not file folders. If your folder structure passes through a Route Group like `(marketing)/`, it does **not** count as a segment level.

#### 📁 Directory Structure

```text
app/
├── photo/
│   └── page.jsx        <-- The Full Page target (Root level /photo)
└── gallery/
    ├── (.)photo/       <-- Wrong! This looks for /gallery/photo
    ├── (..)photo/      <-- Correct! Looks one level up for the /photo segment
    │   └── page.jsx    <-- Renders inside a Modal
    └── page.jsx        <-- The Gallery Page (/gallery)

```

#### 🔄 Visual Flow & Behavior

- **Navigating from `/gallery` to `/photo`:** The `(..)` convention intercepts the `/photo` segment from one level above. The user stays visually inside the gallery layout, but a modal displays the content mapped from `app/gallery/(..)photo/page.jsx`.
- **Deep Linking / Bookmarking `/photo`:** If a user clicks a shared link or refreshes the page while the modal is open, they are sent straight to the root-level `app/photo/page.jsx` full page layout.

# 🔀 Next.js Parallel Routes

Parallel Routes allow you to simultaneously or conditionally render one or more pages within the same layout. They are highly effective for building complex, dynamic sections of an app, such as advanced dashboards and social media feeds.

---

## 📖 Overview

Parallel Routes enable you to render multiple pages in the same layout at the same time or conditionally.
They are perfect for highly dynamic sections of an application, such as complex dashboards and social media feeds.
By utilizing named slots, you can manage independent navigation, loading, and error states for different sections of your user interface seamlessly.

---

## 🏗️ Conventions & Setup

### 🧩 Slots (`@folder`)

Parallel routes are created using **named slots**. Slots are defined using the `@folder` naming convention in your directory structure.

- Slots are passed as props to the shared parent layout.
- They do not affect the URL structure or routing path.

### 📂 Example Folder Structure

```text
app/
├── layout.tsx                # Parent layout containing the slots
├── page.tsx                  # Main page content
├── @analytics/               # Analytics slot
│   └── page.tsx
└── @team/                    # Team management slot
    └── page.tsx

```

### 💻 Usage in Layouts

In your shared parent layout (`app/layout.tsx`), you can accept the slots as props and render them simultaneously alongside the `children` prop:

```tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <main>
      {children}

      <div className="grid grid-cols-2 gap-4">
        {team}
        {analytics}
      </div>
    </main>
  );
}
```

---

## 🌟 Key Use Cases

- 📈 **Dynamic Dashboards**: Split a single dashboard page into independent sections (e.g., user metrics, recent activity, and team lists) that load isolated data.
- 📰 **Social Feeds & Modals**: Render intercepting routes or dedicated feed sections while keeping the underlying page state intact.
- 🔐 **Role-Based UIs**: Conditionally render specific slots based on user authentication status, roles, or permissions.
