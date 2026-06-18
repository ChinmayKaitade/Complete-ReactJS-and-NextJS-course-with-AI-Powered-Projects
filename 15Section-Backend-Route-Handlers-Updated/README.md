# 🌐 Module-05: Backend Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the standard Web Request and Response APIs. Think of them as **built-in backend functions** running inside your Next.js application, eliminating the need for a separate Node.js/Express backend server.

---

## 🛠️ What are Route Handlers?

A Route Handler is defined in a special file named `route.ts` (or `route.js`). It allows you to execute server-only logic, build RESTful APIs, and securely interact with external services.

### 🌟 Key Use Cases

- 📡 **Building Backend APIs:** Create endpoints for mobile apps or third-party integrations.
- 🗄️ **Database Connectivity:** Safely query databases (MongoDB, PostgreSQL, Prisma, etc.) without exposing credentials.
- 🔐 **Authentication:** Manage session validations, tokens, and user access control.
- 📝 **Form Submissions & Webhooks:** Receive data payloads from webhooks (like Stripe or GitHub) or client-side forms.

---

## 📂 File Conventions & Setup

To create an API endpoint, you structure your folders inside the `app/` directory just like standard pages, but you use a `route.ts` file instead of a `page.tsx` file.

> ⚠️ **Crucial Rule:** You cannot have a `route.ts` and a `page.tsx` file at the exact same route segment level (e.g., `app/dashboard/route.ts` and `app/dashboard/page.tsx` will conflict). Keep your API paths organized, typically under an `api/` directory.

### 📁 Directory Structure Example

```text
app/
└── api/
    └── users/
        └── route.ts     # Accessible via: http://localhost:3000/api/users

```

---

## 🚂 Supported HTTP Methods

Next.js supports standard HTTP methods. You export a named `async function` corresponding to the HTTP verb you want to handle:

- 🟢 `GET` – Fetches data or resources.
- 🔵 `POST` – Submits or creates new resources.
- 🟡 `PUT` – Updates an entire resource structure.
- 🟠 `PATCH` – Partials updates to a resource.
- 🔴 `DELETE` – Removes a resource.
- ⚪ `HEAD` & `OPTIONS` – Fetches headers or returns allowed communication options.

> 🚫 **Fallback Behavior:** If a client attempts to hit your route handler using an unsupported HTTP method, Next.js automatically responds with a **`405 Method Not Allowed`** status.

---

## 💻 Writing your first GET Endpoint

Here is how you write a basic `GET` endpoint inside `app/api/users/route.ts` to return a structured JSON response using the native `Response` web API.

```typescript
import { NextResponse } from "next/server";

// 🚀 Named export matching the HTTP GET method
export async function GET(request: Request) {
  try {
    // Simulated data fetching (e.g., from a database)
    const users = [
      { id: 1, name: "Chinmay Kaitade", role: "Full Stack Developer" },
      { id: 2, name: "Palak", role: "Collaborator" },
    ];

    // Return a clean JSON response along with a 200 OK status
    return NextResponse.json({ success: true, data: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
```
