// import React, { useState } from "react";
import React from "react";

const HomePage = async () => {
  // const [name, setName] = useState("Chinmay");
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/");
  const res = await data.json();
  console.log(data);

  return (
    <div>
      {/* <button>Click Me {name}</button> */}
      <button>Click Me</button>
      {JSON.stringify(res)}
    </div>
  );
};

export default HomePage;
