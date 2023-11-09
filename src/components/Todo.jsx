import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import db from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import {
  ArrowClockwise,
  CheckCircleFill,
  Circle,
  Trash,
} from "react-bootstrap-icons";

function Todo({ todo }) {
  const [hover, setHover] = useState(false);

  const deleteTodo = (todo) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (isConfirmed) {
      const todoRef = doc(db, "todos", todo.id);

      deleteDoc(todoRef)
        .then(() => {
          toast.success("Document successfully deleted!");
        })
        .catch((error) => {
          toast.error("Error deleting document: ", error);
        });
    }
  };
  return (
    <div className="Todo">
      <div
        className="todo-container"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="check-todo">
          {todo.checked ? (
            <span className="checked">
              <CheckCircleFill color="#bebebe" />
            </span>
          ) : (
            <span className="unchecked">
              <Circle color={todo.color} />
            </span>
          )}
        </div>
        <div className="text">
          <p style={{ color: todo.checked ? "#bebebe" : "#000000" }}>
            {todo.text}
          </p>
          <span>
            {todo.time} - {todo.projectName}
          </span>
          <div className={`line ${todo.checked ? "line-through" : ""}`}></div>
        </div>
        <div className="add-to-next-day">
          {todo.checked && (
            <span>
              <ArrowClockwise />
            </span>
          )}
        </div>
        <div className="delete-todo" onClick={() => deleteTodo(todo)}>
          {(todo.checked || hover) && (
            <span>
              <Trash />
            </span>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Todo;
