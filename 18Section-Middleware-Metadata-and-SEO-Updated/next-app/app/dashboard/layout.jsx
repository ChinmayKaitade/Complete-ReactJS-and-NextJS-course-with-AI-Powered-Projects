import React from "react";

export const metadata = {
  title: "Dashboard Layout",
  description:
    "This is the layout for the dashboard layout of our Next.js application.",
};

const DashboardLayout = ({ children }) => {
  return (
    <div>
      Dashboard Layout
      {children}
    </div>
  );
};

export default DashboardLayout;
