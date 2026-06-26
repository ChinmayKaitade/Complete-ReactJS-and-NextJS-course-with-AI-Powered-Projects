"use client";
import { useParams } from "next/navigation";
import React from "react";

const ShopTagItem = () => {
  const params = useParams();
  console.log(params);
  return <div>ShopTagItem</div>;
};

export default ShopTagItem;
