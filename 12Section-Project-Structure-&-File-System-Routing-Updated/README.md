# 📁 Project Structure & File-Based Routing

A concise overview of how a Next.js application is organized and how your file system directly drives your application's URLs.

---

## 🏗️ 1. Core Project Structure

When you initialize a new Next.js application using the App Router, your project directory is structured with a few essential root files and folders:

| Folder / File         | Purpose                                                                                                                                                  |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`app/`**            | Contains the application's UI, routing logic, layouts, and pages. This is where you will spend 90% of your development time.                             |
| **`public/`**         | Stores static assets (images, custom fonts, icons, robots.txt) served directly at the root. For example, `public/logo.png` is accessible at `/logo.png`. |
| **`package.json`**    | Manages your project dependencies, metadata, and execution scripts (e.g., `npm run dev`, `npm run build`).                                               |
| **`next.config.mjs`** | The configuration file for Next.js. Used to handle advanced setups like redirects, headers, environment variables, and image domains.                    |

---

## 🗺️ 2. The `app/` Directory Mechanics

Next.js relies heavily on the **App Router** architecture. Under this model, your file system dictates your application's routes through two simple rules:

1. **Folders** inside the `app/` directory define the **URL segments** (the paths).
2. **Special Files** inside those folders define the **UI behavior** and what gets rendered on the screen.

> 📁 **The Routing Formula:** `Folder Name` + `page.js` = `Active Web Route`

### Visualizing the Architecture

```text
app/
├── layout.js              # Root Layout (Shared Global UI like Navbar/Footer)
├── page.js                # Homepage (Matches http://localhost:3000/)
│
├── about/                 # Defines the /about route segment
│   └── page.js            # UI for http://localhost:3000/about
│
└── blogs/                 # Defines the /blogs route segment
    ├── layout.js          # Nested Layout (Applies ONLY to pages inside /blogs)
    └── page.js            # UI for http://localhost:3000/blogs

```

---

## 🛠️ 3. Special Files Summary

To build robust layouts and structures, Next.js reads specific filenames within any given route folder:

### 📄 `page.js` / `page.tsx` / `page.jsx`

- **Role:** The unique UI for a route.
- **Behavior:** Making a folder alone does not create a route. A folder only becomes publicly accessible when a `page.js` file is added inside it to render the core content.

### 📐 `layout.js` / `layout.tsx` / `layout.jsx`

- **Role:** Shared UI across multiple child pages.
- **Behavior:** Used to structure wrappers like headers, footers, or sidebars. When switching between pages in the same folder segment, a layout **does not re-render**, preserving component state (like search inputs or video playback) and boosting performance.

# 📂 Advanced Routing: Types of Folders & Files in Next.js

Next.js provides a robust set of file-system conventions to handle everything from simple static pages to complex, highly dynamic user interfaces. Here is how different folder patterns change your routing behavior:

---

## 🧭 Routing Patterns at a Glance

| Route Type              | Folder Syntax  | Example URL Path              | Best Used For...                                                        |
| :---------------------- | :------------- | :---------------------------- | :---------------------------------------------------------------------- |
| **Static Routes**       | `folder`       | `/about`                      | Standard pages like About, Contact, or Privacy Policy.                  |
| **Dynamic Routes**      | `[id]`         | `/blog/123`                   | Pages where the URL depends on data (e.g., product IDs, blog slugs).    |
| **Catch-All Routes**    | `[...slug]`    | `/shop/clothes/tops/t-shirts` | Deeply nested hierarchies like e-commerce categories or documentation.  |
| **Route Groups**        | `(group_name)` | _Does not affect URL_         | Organizing files by team, feature, or layout without changing the path. |
| **Parallel Routes**     | `@slot`        | _Simultaneous rendering_      | Complex dashboards, splitting a layout into multiple independent views. |
| **Intercepting Routes** | `(.)folder`    | _Context-dependent UI_        | Modals, photo feeds, or expanding cards while keeping a shareable URL.  |

---

## 🛠️ Detailed Breakdown of Advanced Routing

### 1. Static Routes

The simplest form of routing. A hardcoded folder name directly maps to a URL segment.

- **Example:** `app/contact/page.js` matches `example.com/contact`.

### 2. Dynamic Routes

When you don't know the exact segment name ahead of time (like user profiles or product pages), you wrap the folder name in square brackets.

- **Syntax:** `app/blog/[id]/page.js`
- **Example URL:** `/blog/123` or `/blog/hello-world`
- **Accessing Data:** The value (`123`) is passed as a parameter (`params.id`) directly to your page component.

### 3. Catch-All Routes

An advanced extension of dynamic routing that captures all subsequent nested URL paths. You create these by adding an ellipsis (`...`) inside the square brackets.

- **Syntax:** `app/shop/[...slug]/page.js`
- **Example URL:** `/shop/clothes/shoes/sneakers` will match, and the parameters will be passed as an array: `params.slug = ['clothes', 'shoes', 'sneakers']`.
- _Tip:_ Use double brackets `[[...slug]]` for an **Optional Catch-All Route**, which also matches the base path (`/shop`) without any extra segments.

### 4. Route Groups

Sometimes you want to organize your folders cleanly or group pages together under a shared layout _without_ adding extra words to the public URL. Wrapping a folder name in parentheses tells Next.js to ignore it in the URL path.

- **Syntax:** `app/(marketing)/about/page.js`
- **Example URL:** Access it directly at `/about` (the `(marketing)` folder is completely omitted from the web address).

### 5. Parallel Routes

Parallel Routing allows you to render more than one page simultaneously inside the exact same layout. This is incredibly powerful for complex web apps and analytics dashboards. Created using the `@` slot convention.

- **Syntax:** `app/dashboard/@analytics/page.js` and `app/dashboard/@team/page.js`
- **Behavior:** The `app/dashboard/layout.js` can now receive both slots as props (`props.analytics` and `props.team`) and render them side-by-side.

### 6. Intercepting Routes

Intercepting routes allow you to load a new route from another part of your application inside the _current_ layout context. This means you can show a detailed view as a modal or overlay, but if the user Refreshes the page or copies the link, the URL loads as a standalone full-page view.

- **Syntax:** Match relative segments using `(.)` for same-level folders, `(..)` for parent levels, or `(...)` from the root.
- **Common Use Case:** A user clicks a thumbnail in a photo feed; an intercepting route instantly opens it inside an elegant modal overlay without losing the background page context.
