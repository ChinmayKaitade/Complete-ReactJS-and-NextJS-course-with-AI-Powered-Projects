import Link from "next/link";
import React from "react";

const TeamPage = () => {
  return (
    <div className="bg-indigo-500 h-[50%]">
      <Link href={"/admin-dashboard/team-docs"}>Go To Team Docs Page</Link>
    </div>
  );
};

export default TeamPage;
