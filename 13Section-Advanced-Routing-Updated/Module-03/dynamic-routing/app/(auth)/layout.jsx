import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-black text-indigo-500 mb-2">Auth Layout</h1>
      {children}
    </div>
  );
};

export default AuthLayout;
