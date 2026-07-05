"use client";
import { updateStatus } from "@/actions/contact";
import React from "react";

const StatusButton = ({ id }) => {
  const actions = updateStatus.bind(null, id);

  return (
    <form action={actions}>
      <button className="bg-green-500 text-white px-3 py-1 mt-2">
        Mark Resolved
      </button>
    </form>
  );
};

export default StatusButton;
