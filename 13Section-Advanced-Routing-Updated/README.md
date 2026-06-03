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
