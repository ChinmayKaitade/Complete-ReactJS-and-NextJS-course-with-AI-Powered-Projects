import React from "react";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  // count = count + 1; DO NOT DO THIS

  const [countToSet, setCountToSet] = useState(0);

  // const incrementHandler = (numVal) => {
  //   // setCount(numVal + 1); // shorthand notation
  //   setCount((prev) => prev + numVal + 1);
  //   setCount((prev) => prev + 1);
  //   setCount((prev) => prev + 1);
  // };

  return (
    <>
      <h1>Counter is {count}</h1>

      <div className="card">Counter is {count}</div>

      <div>
        <button onClick={() => setCount(count + 1)} style={{ margin: "0 5px" }}>
          Increase
        </button>

        <button
          onClick={() => setCount((count) => Math.max(count - 1, 0))}
          style={{ margin: "0 5px" }}
        >
          Decrease
        </button>

        <button
          onClick={() => setCount((count) => 0)}
          style={{ margin: "0 5px" }}
        >
          Reset
        </button>
      </div>

      <div style={{ margin: "20px 0" }}>
        <input
          style={{
            width: "100px",
            border: "1px solid white",
            margin: "0 5px",
            padding: "0.6em 1.2em",
          }}
          value={countToSet}
          onChange={(e) => setCountToSet(Number(e.target.value))}
          type="text"
        />
        <button style={{ margin: "0 5px" }} onClick={() => {
          setCount(Number(countToSet))
        }}>
          Set to {countToSet}
        </button>
      </div>
    </>
  );
};

export default App;
