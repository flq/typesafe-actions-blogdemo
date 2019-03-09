import React from "react";
import { createAction, getType, createStandardAction, ActionType } from "typesafe-actions";
import "./App.css";
import { useTypesafeReducer } from "./useTypesafeReducer";

const Actions = {
  increment: createAction("INCR"),
  decrement: createAction("DECR"),
  reset: createAction("RESET"),
  setValue: createStandardAction("SET")<number>()
};

type State = { counter: number };

const reducer = (s: State, a: ActionType<typeof Actions>) => {
  switch (a.type) {
    case getType(Actions.increment):
      return { counter: s.counter + 1 };
    case getType(Actions.decrement):
      return { counter: s.counter - 1 };
    case getType(Actions.reset):
      return { counter: 0 };
    case getType(Actions.setValue):
      return { counter: a.payload };
  }
};

function App() {

  const [state, actions] = useTypesafeReducer<State, typeof Actions>(reducer, { counter: 0 }, Actions);

  return (
    <>
      <p>Hello, counter is {state.counter}</p>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={actions.decrement}>Decrement</button>
      <button onClick={actions.reset}>Reset</button>
      <button onClick={() => actions.setValue(7)}>Put in the number 7</button>
    </>
  );
}

export default App;
