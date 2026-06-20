export async function GET(request) {
  const url = new URL(request.url);
  const { searchParams } = url;

  // console.log(searchParams);

  const apiUrl = new URL("https://jsonplaceholder.typicode.com/todos");

  searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value);
  });

  const res = await fetch(apiUrl);
  const data = await res.json();
  console.log(data);

  return Response.json({ data });

  // const res = await fetch(
  //   "https://jsonplaceholder.typicode.com/todos?q=delectus&_limit=5",
  // );
  // const data = await res.json();

  // return Response.json({
  //   message: data,
  // });
}
