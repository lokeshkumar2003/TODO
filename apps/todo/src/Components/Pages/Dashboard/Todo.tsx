import React, { useState } from "react";
// import { db } from "apps/todo/src/firebase-config";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface Props {
  todo: Todo;
  toggleComplete: (todo: Todo) => void;
  handleDelete: (id: string) => void;
  handleEdit: (todo: Todo, title: string) => void;
}

const Todo: React.FC<Props> = ({ todo, toggleComplete, handleDelete, handleEdit}) => {
  const [newTitle, setNewTitle] = useState(todo.title);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (todo.completed) {
      setNewTitle(todo.title);
    } else {
      todo.title = "";
      setNewTitle(e.target.value);
    }
  };

  return (
    <div className="todo">
      <input
        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        type="text"
        value={todo.title === "" ? newTitle : todo.title}
        className="list"
        onChange={handleChange}
      />
      <div>
        <button
          className="button-complete"
          onClick={() => toggleComplete(todo)}
        >
          <button id="i" >checked</button>
        </button>
        <button
          className="button-edit"
          onClick={() => handleEdit(todo, newTitle)}
        >
          <button id="i" >Edit</button>
        </button>
        <button className="button-delete" onClick={() => handleDelete(todo.id)}>
          <button id="i" >Delete</button>
        </button>
      </div>
    </div>
  );
};

export default Todo;
