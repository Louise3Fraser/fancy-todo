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
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteItem(id) {
  try {
    const response = await axios.delete(`http://localhost:8800/todo/${id}`, {
      id: id,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
