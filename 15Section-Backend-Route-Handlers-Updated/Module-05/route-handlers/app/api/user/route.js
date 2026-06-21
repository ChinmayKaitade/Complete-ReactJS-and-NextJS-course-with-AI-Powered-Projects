import { headers } from "next/headers";
import { userAgent } from "next/server";

// Recommended Approach
export async function GET(request) {
  const reqHeaders = await headers();

  console.log(reqHeaders.get("Authorization"));
  console.log(reqHeaders.get("user-agent"));
  return new Response("<h1>Hello World!</h1>", {
    headers: {
      "content-type": "text/html",
    },
  });
}

// // Approach-1
// export async function GET(request) {
//   const reqHeaders = new Headers(request.headers);

//   console.log(reqHeaders.get("Authorization"));

//   return new Response("Hello World!");
// }
