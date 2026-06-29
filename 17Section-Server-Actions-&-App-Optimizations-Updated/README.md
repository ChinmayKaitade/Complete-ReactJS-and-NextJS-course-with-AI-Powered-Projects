# ⚡ Server Actions & App Optimizations

**Server Actions** are asynchronous functions that run exclusively on the server and can be called directly from both Server and Client React components. They allow you to execute server-side operations—such as database queries, cache revalidation, authentication, and form management—without the architectural overhead of writing standalone REST API endpoints.

---

## 🆚 Server Actions vs. API Routes

Before Server Actions, updating data in a Next.js application required a multi-step networking lifecycle:

With Server Actions, Next.js abstracts this network boundary. You call the server function directly from your component, and Next.js handles the underlying secure RPC (Remote Procedure Call) tunnel:

---

## 🛠️ The `"use server"` Directive

Server Actions are defined using the `"use server";` directive, which marks the boundaries of your server-only execution environments. It can be applied in two distinct ways:

### 1. File-Level Boundary

Placing the directive at the very top of a separate file marks **all exported functions** within that file as Server Actions. This is ideal when importing actions into Client Components.

```typescript
// app/actions.ts
"use server";

import { connectToDatabase } from "@/lib/db";
import { Note } from "@/lib/models/Note";

export async function deleteNote(id: string) {
  await connectToDatabase();
  await Note.findByIdAndDelete(id);
}
```

### 2. Inline Function Boundary

Placing the directive at the top of an inner scoping brackets blocks code execution inside an `async` function. This works exclusively inside **Server Components**.

```tsx
// app/page.tsx (Server Component)
export default function Page() {
  async function inlineAction() {
    "use server";
    // Runs securely on the server environment
  }
}
```

---

## 📝 Integration with HTML Forms

The most frequent use case for Server Actions is handling form submissions. Next.js extends the standard HTML `<form>` element's `action` attribute to accept these asynchronous server functions.

```tsx
import { revalidatePath } from "next/cache";

export default function TodoPage() {
  async function addTodo(formData: FormData) {
    "use server";
    const title = formData.get("title");

    if (!title) return;

    // Execute secure server logic (e.g., db.todo.create({ title }))
    console.log(`Saving to Database: ${title}`);

    // Purge the cached data route layer instantly to refresh client UI
    revalidatePath("/todos");
  }

  return (
    <form action={addTodo} className="p-6 bg-white rounded-xl shadow space-y-4">
      <input
        name="title"
        type="text"
        className="w-full p-2 border rounded"
        placeholder="New task..."
      />
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">
        Add Todo ➕
      </button>
    </form>
  );
}
```

### ⚙️ What Happens Internally?

1. **Event Interception:** The user clicks submit, and Next.js intercepts the native browser submission event.
2. **RPC Transmission:** Next.js sends an automated HTTP `POST` request behind the scenes, encoding the form fields safely.
3. **Server Execution:** The backend engine runs the corresponding function body securely on the host platform.
4. **UI Reconciliation:** The server can stream route updates or data mutations back down, allowing the UI to adapt dynamically without a full browser reload.

---

## 📋 Architectural Decision Matrix

When should you use a Server Action versus a standard Backend Route Handler (`route.ts`)? Use this decision matrix to plan your application architecture:

| Scenario / Architecture Target                        | Server Action ⚡ | API Route Handler 🌐            |
| ----------------------------------------------------- | ---------------- | ------------------------------- |
| **Standard Form Submissions**                         | ✅ **Yes**       | ❌ _Excessive_                  |
| **Internal Data Mutations (CRUD)**                    | ✅ **Yes**       | ❌ _Excessive_                  |
| **On-Demand Cache Revalidation (`revalidatePath`)**   | ✅ **Yes**       | ⚠️ _Requires API configuration_ |
| **Public API Endpoints (Third-Party Integrations)**   | ❌ **No**        | ✅ **Yes**                      |
| **Incoming External Webhooks (Stripe, GitHub, etc.)** | ❌ **No**        | ✅ **Yes**                      |
| **Heavy-Duty Server Operations (Long-running tasks)** | ❌ **No**        | ✅ **Yes**                      |
| **Serving Non-JSON Payloads**                         | ❌ **No**        | ✅ **Yes**                      |
