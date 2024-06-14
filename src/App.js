import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  // For Creating a List Of Todos
  const handlesubmit = (e) => {
    e.preventDefault();
    //**For Editing and Updating in input Todo Important**
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updateTodo = todos.map((t) =>
        t.id === editTodo.id ? { id: t.id, todo } : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodo);
      setEditId(0);
      setTodo("");
      return;
    }
    //**For Creating a List Of Todos**
    if (todo !== "") {
      setTodos([{ id: ` ${todo.id}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  // For Deleting a List Of Todos
  const handledelete = (id) => {
    const deltodos = todos.filter((to) => to.id !== id);
    setTodos([...deltodos]);
  };

  // For Editing a List Of Todos
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Todo-List-App</h1>

        {/* todo */}
        <form className="todoForm" onSubmit={handlesubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <button type="submit">{editId ? "Edit" : "Go"}</button>
        </form>

        {/* todos */}
        <ul className="allTodos">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="TodoText">{t.todo}</span>
              <button onClick={() => handleEdit(t.id)}>Edit</button>
              <button onClick={() => handledelete(t.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
