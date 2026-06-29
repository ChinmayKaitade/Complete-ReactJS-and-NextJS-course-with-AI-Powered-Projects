"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const ShopPage = () => {
  const params = useParams();
  const pathname = usePathname();

  console.log(params);
  return <div>ShopPage {pathname}</div>;
};

export default ShopPage;
