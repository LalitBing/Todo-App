import { useReducer, useState } from "react";
import Todo from "./Todo";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  TOGGLE_TODO: "toggle-todo",
  DELETE_TODO: "delete-todo",
  RESET_TODO: "reset-todo",
};
function App() {
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  function reducer(todos, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...todos, newTodo(action.payload.name)];
      case ACTIONS.TOGGLE_TODO:
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        });
      case ACTIONS.DELETE_TODO:
        return todos.filter((todo) => todo.id !== action.payload.id);

      default:
        return todos;
    }
  }

  function newTodo(name) {
    return { id: Date.now(), name: name, complete: false };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    setName("");
  };

  console.log(todos);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Add</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>

      {todos.map((todo) => {
        return <Todo key={todo.id} todo={todo} dispatch={dispatch} />;
      })}
    </>
  );
}

export default App;
