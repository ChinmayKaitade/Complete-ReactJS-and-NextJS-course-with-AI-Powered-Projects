import { headers, cookies } from "next/headers";
import { userAgent } from "next/server";

// Recommended Approach
export async function GET(request) {
  const reqHeaders = await headers();
  // const username = request.cookies.get("username"); // --> Approach-01
  // console.log(username);

  const cookieStore = await cookies();
  cookieStore.set("theme", "dark");

  const theme = cookieStore.get("theme");
  console.log(theme)

  console.log(reqHeaders.get("Authorization"));
  console.log(reqHeaders.get("user-agent"));
  return new Response("<h1>Hello World!</h1>", {
    headers: {
      "content-type": "text/html",
      "set-cookie": "username=chinu",
    },
  });
}

// // Approach-1
// export async function GET(request) {
//   const reqHeaders = new Headers(request.headers);

//   console.log(reqHeaders.get("Authorization"));

//   return new Response("Hello World!");
// }
