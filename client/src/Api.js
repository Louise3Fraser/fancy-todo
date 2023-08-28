import axios from "axios";

export async function getTodos() {
  try {
    const response = await axios.get("http://localhost:8800/todo");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem(todo) {
  try {
    const response = await axios.post("http://localhost:8800/todo", {
      title: todo,
      complete: false,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteItem(id) {
  try {
    const response = await axios.delete(`http://localhost:8800/todo/${id}`, {
      id: id,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
