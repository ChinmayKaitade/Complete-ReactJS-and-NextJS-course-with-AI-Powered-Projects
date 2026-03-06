import { useCounterStore } from "../store/counterStore.js";

function Counter() {
  const { count, increase, decrease, reset } = useCounterStore();
  return (
    <div>
      <h2>Count : {count}</h2>
      <button onClick={decrease}>-</button>
      <button onClick={increase}>+</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Counter;
