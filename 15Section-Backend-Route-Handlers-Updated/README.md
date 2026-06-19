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

# 🔧 Creating PUT, PATCH & DELETE Endpoints in Next.js

Beyond fetching data with `GET` and creating resources with `POST`, building a complete RESTful API requires handling resource updates and deletions. Next.js Route Handlers map these requirements directly to standard HTTP methods: `PUT`, `PATCH`, and `DELETE`.

---

## 🏎️ PUT vs. PATCH: What’s the Difference?

When modifying existing backend data, choosing the right method ensures your API follows standard REST practices:

- 🔄 **`PUT` (Full Replacement):** Replaces the **entire** target resource with the new request payload. If any fields are omitted from the request, they are typically overwritten or reset to default values.
- 🩹 **`PATCH` (Partial Update):** Updates **only the specific fields** provided in the request payload. All other untouched properties of the resource remain exactly as they were.

---

## 📂 Implementation Example

Here is a complete, real-world example of how to implement `PUT`, `PATCH`, and `DELETE` methods inside a single `app/api/users/route.ts` file.

```typescript
import { NextResponse } from "next/server";

// Mock Database Item
let mockUser = {
  id: 1,
  name: "Chinmay Kaitade",
  role: "Full Stack Developer Intern",
  status: "Active",
};

/**
 * 🔄 1. PUT Endpoint - Full Resource Replacement
 * URL: /api/users
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // PUT expects the complete payload structure
    if (!body.name || !body.role || !body.status) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields for full replacement.",
        },
        { status: 400 },
      );
    }

    mockUser = {
      id: mockUser.id, // Retain ID
      name: body.name,
      role: body.role,
      status: body.status,
    };

    return NextResponse.json({
      success: true,
      message: "Resource completely updated.",
      data: mockUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}

/**
 * 🩹 2. PATCH Endpoint - Partial Resource Modification
 * URL: /api/users
 */
export async function PATCH(request: Request) {
  try {
    const body = await request.json();

    // Dynamically update only the fields provided in the request body
    mockUser = {
      ...mockUser,
      ...body, // Merges new changes into the existing object
    };

    return NextResponse.json({
      success: true,
      message: "Resource partially modified.",
      data: mockUser,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Invalid JSON payload" },
      { status: 400 },
    );
  }
}

/**
 * 🔴 3. DELETE Endpoint - Resource Removal
 * URL: /api/users
 */
export async function DELETE(request: Request) {
  try {
    // Perform deletion logic here (e.g., db.user.delete())
    return NextResponse.json(
      {
        success: true,
        message: `User with ID ${mockUser.id} has been successfully deleted.`,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete resource" },
      { status: 500 },
    );
  }
}
```

---

## 💡 Best Practices for Mutation Handlers

> 📌 **Data Validation:** Always validate incoming payloads inside `PUT` and `PATCH` methods using validation libraries like **Zod** before sending data to your database to secure your app from malicious input.
> 🔀 **Dynamic IDs:** For target-specific updates (e.g., deleting a specific user by ID), you will typically move these handlers into dynamic directories like `app/api/users/[id]/route.ts` and read `params.id` directly from the function argument.
