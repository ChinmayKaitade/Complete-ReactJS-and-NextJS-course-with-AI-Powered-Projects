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

# 🔍 Exploring Query Parameters

Query parameters are key-value pairs appended to the end of a URL, starting after a question mark (`?`). Multiple parameters are separated from each other using the ampersand (`&`) character.

```text
https://api.example.com/products?page=2&sort=price
                                 ▲      ▲
                      Query Parameters (Key=Value)

```

In this example:

- `page` = `2`
- `sort` = `price`

Query parameters are dynamic and highly useful for sending non-structural configuration data to your routes—such as applying search filters, sorting options, toggle states, and pagination offsets.

---

## 🖥️ Reading Query Params in Server GET API Routes

Since Next.js Route Handlers utilize standard web `Request` objects, accessing query parameters inside a server-side `GET` endpoint is straightforward. You pass the incoming `request.url` into the native **`URL` constructor** to extract a `searchParams` iterator.

### 📂 Directory Setup

```text
app/
└── api/
    └── products/
        └── route.ts     # Endpoint: /api/products?search=laptop&limit=10

```

### 💻 Code Implementation

Here is how you parse, fallback, and read incoming query parameters inside `app/api/products/route.ts`:

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // 1. Instantiate the URL utility with the incoming request URL
  const { searchParams } = new URL(request.url);

  // 2. Safely extract specific query keys using the .get() method
  const searchQuery = searchParams.get("search"); // Returns string or null
  const sortOrder = searchParams.get("sort") || "asc"; // Sets a default fallback
  const limit = parseInt(searchParams.get("limit") || "10", 10); // Parse to number

  // 3. Process data using extracted parameters (e.g., Filtering a DB query)
  return NextResponse.json({
    success: true,
    filtersApplied: {
      searchQuery,
      sortOrder,
      limit,
    },
    message: `Fetched top ${limit} products matching '${searchQuery}' ordered by ${sortOrder}.`,
  });
}
```

---

## 💡 Important Considerations

> ⚠️ **Type Safety:** The `searchParams.get()` helper always returns either a **`string`** or **`null`** (if the parameter is missing from the URL entirely). Always perform type conversions (like `parseInt` or validation checks) before passing these values directly into database queries or computations.

# 📑 Introduction to HTTP Headers in Next.js

HTTP headers act as the vital communication handshake between a client (like your web browser) and a server. They represent the **metadata** attached to an incoming API request or an outgoing API response.

Headers are broadly split into two key phases:

1. **Request Headers 📡:** Sent by the client to give the server essential context (e.g., authentication status, client type, or expected response format).
2. **Response Headers 📥:** Sent back by the server to inform the client how to handle the data being delivered (e.g., caching duration, content layout, or cross-origin access rules).

---

## 🛠️ Reading Request Headers in Next.js Route Handlers

Next.js provides two main approaches to read incoming request headers inside a `route.ts` file.

### Approach 1: Using the Standard `request` Object

You can directly read headers from the incoming standard Web Request argument by initializing a native `Headers` instance:

```typescript
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Pass the incoming request headers to the standard Web Headers constructor
  const requestHeaders = new Headers(request.headers);
  const authorizationToken = requestHeaders.get("Authorization");

  return NextResponse.json({ message: "Headers processed via Request object" });
}
```

### Approach 2: Using `next/headers` (Recommended 🚀)

The cleanest, built-in method provided by Next.js is using the asynchronous `headers()` utility. This is highly dynamic and saves you from drilling the request object into deeply nested logic.

```typescript
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  // Read headers asynchronously using Next.js utilities
  const headerList = await headers();
  const userAgent = headerList.get("user-agent"); // e.g., Mozilla/5.0...
  const acceptLanguage = headerList.get("accept-language");

  return NextResponse.json({
    success: true,
    detectedClient: userAgent,
    language: acceptLanguage,
  });
}
```

---

## 📤 Setting Outgoing Response Headers

When returning data back to the client, you can modify the outgoing metadata manually using the native `Response` or `NextResponse` architecture to set content behaviors, control cookies, or handle security settings.

### Standard Response Layout

```typescript
export async function GET() {
  return new Response(JSON.stringify({ data: "Hello World" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "X-Custom-Framework": "Next.js App Router",
      "Cache-Control": "no-store, max-age=0", // Prevents clients from caching sensitive API responses
    },
  });
}
```

### Using `NextResponse` Layout

```typescript
import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: "Resource provisioned successfully." },
    { status: 201 },
  );

  // Programmatically append headers to the NextResponse instance
  response.headers.set("X-RateLimit-Limit", "100");
  response.headers.set("Access-Control-Allow-Origin", "*"); // Standard CORS configuration

  return response;
}
```

---

## 💡 Summary Reference Matrix

Below is a breakdown of the most common headers you will interact with when building APIs in Next.js:

| Header Category               | Key Header                    | Typical Value / Purpose                                                              |
| ----------------------------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| **Request (Client Context)**  | `Authorization`               | `Bearer eyJhbGciOiJIUzI1Ni...` _(Passes secure JWT login tokens)_                    |
| **Request (Client Context)**  | `User-Agent`                  | `Mozilla/5.0 (Windows NT 10.0; Win64; x64)...` _(Identifies the browser/device)_     |
| **Response (Server Context)** | `Content-Type`                | `application/json` or `text/html; charset=utf-8` _(Tells browser how to parse data)_ |
| **Response (Server Context)** | `Cache-Control`               | `public, max-age=3600` _(Instructs the browser or CDN to cache data for 1 hour)_     |
| **Response (Server Context)** | `Access-Control-Allow-Origin` | `*` or `https://myfrontend.com` _(Manages CORS cross-origin application safety)_     |

# 🍪 Cookies in Next.js Route Handlers

Cookies are small pieces of data that a server sends to a user's web browser. The browser stores these cookies locally and automatically attaches them to future requests sent back to the same server.

Cookies serve three primary purposes:

* 🔐 **Session Management:** Tracking user login states, active sessions, and shopping carts.
* 🎨 **Personalization:** Remembering user-specific preferences, layouts, or dark/light themes.
* 📈 **Tracking:** Recording and analyzing user behaviors or analytics across sessions.

---

## 🛠️ Reading Cookies in Route Handlers

Next.js provides two core approaches to interact with cookies inside your API endpoints.

### Approach 1: Using the Standard `Request` Object

You can parse incoming cookies directly from the standard `Request` parameter using the built-in `request.cookies` utility.

```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // 📥 Read a cookie named "theme" directly from the request object
  const themeCookie = request.cookies.get('theme'); 
  const themeValue = themeCookie ? themeCookie.value : 'light'; // Fallback to 'light'

  return NextResponse.json({ 
    success: true, 
    activeTheme: themeValue 
  });
}

```

### Approach 2: Using the `cookies()` API (Recommended 🚀)

The cleanest and most idiomatic method in Next.js is using the asynchronous `cookies()` utility from `next/headers`. This can be read anywhere within your server logic without passing down the `request` object.

```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  // 🧠 Access the cookie store asynchronously
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme')?.value || 'light';

  return NextResponse.json({ success: true, theme });
}

```

---

## 📤 Setting & Modifying Outgoing Cookies

Modifying or setting a cookie also changes depending on which approach you prefer to structure your server logic.

### Method A: Using the `Set-Cookie` Header (With `NextResponse`)

You can append raw `Set-Cookie` headers directly onto your outgoing response payload:

```typescript
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Theme updated!" });

  // 📝 Setting a cookie using the standard response header approach
  response.headers.set('Set-Cookie', 'theme=dark; Path=/; HttpOnly; Secure; SameSite=Strict');

  return response;
}

```

### Method B: Using the `cookies()` Object Mutations

The `cookies()` utility allows you to seamlessly read, update, and clear values directly using helper methods like `.set()` and `.delete()`.

```typescript
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  const cookieStore = await cookies();

  // 🚀 Set cookie properties securely using standard options
  cookieStore.set('theme', 'dark', {
    path: '/',
    httpOnly: true, // 🔒 Prevents client-side scripts from accessing the cookie
    secure: true,   // 🌐 Requires HTTPS connections
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7 // ⏳ Expires in 1 week (in seconds)
  });

  return NextResponse.json({ success: true, message: "Cookie set via next/headers store." });
}

```

To clear a user's session or delete a cookie entirely, you call `.delete()`:

```typescript
cookieStore.delete('theme');

```