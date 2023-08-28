import { React, useEffect } from "react";
import { useState } from "react";
import { getTodos, addItem, deleteItem } from "../Api";
import CircularProgress from "@mui/material/CircularProgress";


// RIGHT NOW TODOS ARE ONLY BEING UPDATED UPON PAGE RELOAD. FIX THIS LATER
export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState();

  const fetchTodos = async () => {
    const response = await getTodos();
    setTodos(response);
  };

  // fetch todos on intitial page load:
  useEffect(() => {
    fetchTodos();
  }, [todos]);

  const addTodo = () => {
    addItem(todo);
    fetchTodos();
  };

  const deleteTodo = (id) => {
    deleteItem(id);
    fetchTodos();
  };

  return (
    <div className="App">
      <h1>React Todo App</h1>

      <div className="input-wrapper">
        <input
          type="text"
          name="todo"
          placeholder="Create a new todo"
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button className="add-button" onClick={addTodo}>
          Add
        </button>
      </div>

      {!todos ? (
        <CircularProgress />
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <li> {todo.title} </li>

              <button
                className="delete-button"
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
