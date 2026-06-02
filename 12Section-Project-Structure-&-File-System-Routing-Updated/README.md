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
