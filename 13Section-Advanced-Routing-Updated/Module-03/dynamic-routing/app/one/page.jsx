import Link from "next/link";
import React from "react";

const OnePage = () => {
  return (
    <div className="flex flex-col">
      OnePage
      <Link href={"/one/two"}>Redirect to Two Page</Link>
      <Link href={"/three"}>Redirect to Three Page</Link>
    </div>
  );
};

export default OnePage;
