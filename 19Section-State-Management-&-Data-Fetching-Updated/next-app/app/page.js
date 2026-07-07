"use client";

import { useQuery } from "@tanstack/react-query";

// import { useQueries } from "@tanstack/react-query";

// import { useEffect, useState } from "react";

export default function Home() {
  // const [data, setData] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const fetchUserData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await fetch(
  //       "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10",
  //     );
  //     const data = await res.json();
  //     setData(data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     setError(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["user-data"],
    queryFn: () =>
      fetch(
        "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10",
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
}
