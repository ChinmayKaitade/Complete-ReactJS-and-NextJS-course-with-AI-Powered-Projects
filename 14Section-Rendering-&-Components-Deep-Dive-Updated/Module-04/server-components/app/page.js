import React from "react";
import ClientComp from "./components/client-com";

const HomePage = () => {
  return (
    <div>
      <h1>Hello from Server</h1>
      <ClientComp />
    </div>
  );
};

export default HomePage;
