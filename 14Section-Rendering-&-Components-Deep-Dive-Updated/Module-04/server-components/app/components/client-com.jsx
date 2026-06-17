"use client";
import React, { useState } from "react";

const ClientComp = () => {
  const [username, setUsername] = useState("Chinmay");

  return (
    <div className="text-3xl">
      {username}
      <button
        className="text-indigo-600 pl-2"
        onClick={() => setUsername("Chinu")}
      >
        Change Name
      </button>
    </div>
  );
};

export default ClientComp;
