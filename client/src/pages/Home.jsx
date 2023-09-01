import { React, useEffect } from "react";
import { useState } from "react";
import { getTodos, addItem, deleteItem } from "../Api";
import { TextField, CircularProgress, Button, Typography } from "@mui/material";

// RIGHT NOW TODOS ARE ONLY BEING UPDATED UPON PAGE RELOAD. FIX THIS LATER
export default function Home() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState();
  const [success, setSuccess] = useState(false);

  const fetchTodos = async (success) => {
    if (success) {
      const data = await getTodos();
      setTodos(data);
    }
    setSuccess(false);
  };

  useEffect(() => {
    fetchTodos(true);
  }, []);

  // fetch todos on intitial page load:
  useEffect(() => {
    fetchTodos(success);
  }, [success, setSuccess]);

  const addTodo = () => {
    setSuccess(addItem(todo));
  };

  const deleteTodo = (id) => {
    setSuccess(deleteItem(id));
  };

  return (
    <div className="App">
      <div className="todo-content">
        <Typography variant="h3" sx={{color: "#3b3b3b"}}>React Todo App</Typography>

        <div className="input-wrapper">
          <TextField
            fullWidth
            type="text"
            name="todo"
            size="small"
            placeholder="Create a new todo"
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <Button
            sx={{ width: "30%" }}
            variant="outlined"
            className="add-button"
            onClick={addTodo}
          >
            Add
          </Button>
        </div>
        {!todos ? (
          <CircularProgress />
        ) : (
          <div className="todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="todo">
                <div className="list">
                  <div className="todo-item">
                    <Typography sx={{width: "70%"}}>{todo.title}</Typography>
                    <Button
                      sx={{ width: "30%" }}
                      className="delete-button"
                      variant="outlined"
                      onClick={() => {
                        deleteTodo(todo.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
