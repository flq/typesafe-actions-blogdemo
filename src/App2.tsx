import React from "react";
import { unionize, ofType, UnionOf } from "unionize";
import { useUnionizeReducer } from "./useUnionizeReducer";

const Actions = unionize({
  increment: {},
  decrement: {},
  reset: {},
  setValue: ofType<{ value: number }>()
});

type State = { counter: number };

const reducer = (s: State, a: UnionOf<typeof Actions>) =>
  Actions.match(a, {
    increment: () => ({ counter: s.counter + 1 }),
    decrement: () => ({ counter: s.counter - 1 }),
    reset: () => ({ counter: 0 }),
    setValue: a => ({ counter: a.value }),
    default: () => s
  });

function App() {
  const [state, actions] = useUnionizeReducer<State, typeof Actions>(reducer, { counter: 0 }, Actions);

  return (
    <>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
      <button onClick={actions.reset}>Reset</button>
      <button onClick={() => actions.setValue({ value: 7 })}>Put in the number 7</button>
      <h2>Counter is {state.counter}</h2>
    </>
  );
}

export default App;
