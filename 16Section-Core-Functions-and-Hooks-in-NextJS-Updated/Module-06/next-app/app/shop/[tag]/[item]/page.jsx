"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const ShopTagItem = () => {
  const params = useParams();
  const pathname = usePathname();

  console.log(params);
  return <div>ShopTagItem {pathname}</div>;
};

export default ShopTagItem;
